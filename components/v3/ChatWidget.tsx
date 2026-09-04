"use client";

import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChatBubbleIcon, CloseIcon, WhatsAppIcon } from "@/components/v3/icons";
import {
  chatFallback,
  chatOpener,
  chatOpenerChips,
  parseChips,
} from "@/lib/chat-prompt";
import { chatCopy, site } from "@/lib/site-content";

/*
 * Same pattern and validation as lib/chat/flow.ts's extractPhone - kept as
 * its own tiny copy rather than an import so this widget doesn't pull in
 * that module's ~1000 lines of unrelated scripted-flow logic (and its own
 * import chain) just for one regex.
 */
const PHONE_PATTERN = /(?<!\d)(?:\+?91[\s-]?)?([6-9]\d{4}[\s-]?\d{5})(?!\d)/g;

function extractPhone(text: string): string | null {
  for (const match of text.matchAll(PHONE_PATTERN)) {
    const candidate = match[1]!.replace(/[\s-]/g, "");
    if (/^[6-9]\d{9}$/.test(candidate)) return candidate;
  }
  return null;
}

const DISMISS_KEY = "v3-chat-dismissed";
const AUTO_OPEN_MS = 20_000;
const MAX_CHARS = 500;
const HISTORY_TURNS = 10;

type Turn = { role: "user" | "bot"; text: string };

const SAMPLE_LABEL: Record<string, string> = {
  gym: "see the gym demo",
  clinic: "see the clinic demo",
  jeweller: "see the jeweller demo",
  trader: "see the trader demo",
  school: "see the school demo",
  ca: "see the CA demo",
  realty: "see the real estate demo",
  interior: "see the interior demo",
  travel: "see the travel demo",
};

/** Topic labels, matching the chip style the model is told to produce. */
const FALLBACK_CHIPS = ["See the work", "What it costs", "Talk to Shailesh"];
const HANDOFF_CHIPS = ["Talk to Shailesh", "Call now"];

function wa(text: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

function wantsHandoff(text: string) {
  return /^(yes[,.]?\s*)?(open\s+)?whatsapp\b|talk to (a human|shailesh|someone|you)|speak to (someone|shailesh)|baat karni|message (karo|shailesh)/i.test(
    text.trim(),
  );
}

function wantsCall(text: string) {
  return /^call now\b|\bcall (me|shailesh|you)\b|^call\b/i.test(text.trim());
}

function safeHref(href: string): string | null {
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  try {
    const url = new URL(href);
    if (url.protocol !== "http:" && url.protocol !== "https:" && url.protocol !== "tel:") {
      return null;
    }
    const host = url.hostname;
    if (
      !host ||
      host === "www.corelinedigital.in" ||
      host === "corelinedigital.in" ||
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "wa.me"
    ) {
      return href;
    }
  } catch {
    return null;
  }
  return null;
}

function linkLabelForPath(path: string): string {
  const slug = path.replace(/^\/samples\//, "");
  return SAMPLE_LABEL[slug] ?? "see the demo";
}

function renderBotText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const md = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+|tel:[^\s)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  const pushPlain = (chunk: string) => {
    if (!chunk) return;
    const pieces = chunk.split(/(\/samples\/[a-z0-9-]+|https?:\/\/[^\s]+)/g);
    for (const piece of pieces) {
      if (!piece) continue;
      const href =
        piece.startsWith("/samples/") || piece.startsWith("http")
          ? safeHref(piece.replace(/[.,;:!?)]+$/, ""))
          : null;
      if (href) {
        const label = href.startsWith("/samples/") ? linkLabelForPath(href) : href;
        nodes.push(
          <a key={`l-${key++}`} href={href} target="_blank" rel="noopener noreferrer" className="v3-chat-link">
            {label}
          </a>,
        );
      } else {
        const lines = piece.split("\n");
        lines.forEach((line, i) => {
          if (i > 0) nodes.push(<br key={`br-${key++}`} />);
          if (line) nodes.push(<Fragment key={`t-${key++}`}>{line}</Fragment>);
        });
      }
    }
  };

  while ((match = md.exec(text))) {
    pushPlain(text.slice(last, match.index));
    const href = safeHref(match[2]);
    if (href) {
      const external = href.startsWith("http") || href.startsWith("/");
      nodes.push(
        <a
          key={`m-${key++}`}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="v3-chat-link"
        >
          {match[1]}
        </a>,
      );
    } else {
      pushPlain(match[0]);
    }
    last = match.index + match[0].length;
  }
  pushPlain(text.slice(last));
  return nodes;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(1);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [chips, setChips] = useState<string[]>([]);
  const [shownChips, setShownChips] = useState<string[]>([...chatOpenerChips]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [booting, setBooting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const dismissed = useRef(false);
  const sessionId = useRef("");
  const abortRef = useRef<AbortController | null>(null);
  const handedOff = useRef(false);
  const openedOnce = useRef(false);
  const capturedPhones = useRef<Set<string>>(new Set());

  useEffect(() => {
    sessionId.current =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    try {
      dismissed.current = sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      dismissed.current = false;
    }
    if (dismissed.current) return;

    const timer = window.setTimeout(() => setOpen(true), AUTO_OPEN_MS);
    const services = document.getElementById("services");
    const io = services
      ? new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) setOpen(true);
        })
      : null;
    if (services && io) io.observe(services);
    return () => {
      window.clearTimeout(timer);
      io?.disconnect();
    };
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [turns, pending, open, chips]);

  useEffect(() => {
    if (!open) return;
    if (window.matchMedia("(max-width: 560px)").matches) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open || openedOnce.current) return;
    openedOnce.current = true;
    setBooting(true);
    const timer = window.setTimeout(() => {
      setTurns([{ role: "bot", text: chatOpener }]);
      setChips([...chatOpenerChips]);
      setBooting(false);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [open]);

  const logChat = useCallback((next: Turn[], handoff: boolean) => {
    const transcript = next
      .map((turn) => `${turn.role === "user" ? "Them" : "Bot"}: ${turn.text}`)
      .join("\n");
    void fetch("/api/chat-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: sessionId.current,
        transcript,
        handoff,
        path: typeof window !== "undefined" ? window.location.pathname : "/",
      }),
    });
  }, []);

  /**
   * The safety net for the callback path: fires whenever a valid number
   * shows up in anything the visitor types, whether the model asked for one,
   * the visitor volunteered it unprompted, or they typed it before the model
   * even replied. One check here covers every route into a lead rather than
   * threading capture logic through each place a number could appear.
   *
   * Deliberately best-effort on the name: strip the number and the common
   * punctuation around it, and if a short word or two is left over, use it -
   * "Rahul, 98765 43210" leaves "Rahul". Anything longer is left for
   * Shailesh to read straight out of the transcript, which is sent either
   * way, rather than guessed at wrong. Same reasoning for email: not
   * extracted separately - if they typed one, it is already in the
   * transcript this posts alongside the number.
   */
  const captureLead = useCallback((phone: string, messageText: string, history: Turn[]) => {
    if (capturedPhones.current.has(phone)) return;
    capturedPhones.current.add(phone);

    // "Priya, 9876543210" and "Priya - 9876543210" are the common shapes;
    // take only what's before the number (or a comma/dash before it) rather
    // than everything left after stripping digits, which also happily keeps
    // trailing words like "...please call" as if they were part of the name.
    const beforeNumber = messageText.split(PHONE_PATTERN)[0] ?? "";
    const guessedName = beforeNumber
      .split(/[,\-–—]/)[0]
      ?.replace(/[^a-zA-Z\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const name = guessedName && guessedName.length > 0 && guessedName.length <= 30 ? guessedName : "";

    const transcript = history
      .map((turn) => `${turn.role === "user" ? "Them" : "Bot"}: ${turn.text}`)
      .join("\n");

    void fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: sessionId.current,
        phone,
        name,
        transcript,
        path: typeof window !== "undefined" ? window.location.pathname : "/",
      }),
    });
  }, []);

  function close() {
    setOpen(false);
    dismissed.current = true;
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  async function openWhatsApp(history: Turn[]) {
    handedOff.current = true;
    let summary = "Hi, saw your website — want to talk about a website for my business.";

    /*
     * The tab is opened synchronously, inside the click, and only pointed at
     * WhatsApp once the summary comes back. Calling window.open() after the
     * await instead means the popup blocker sees a call with no user gesture
     * behind it and silently swallows it - which kills the one thing this
     * widget exists to do. If the blocker stops even this, fall back to
     * navigating the current tab rather than losing the handoff.
     */
    const tab = window.open("", "_blank", "noopener,noreferrer");

    try {
      const response = await fetch("/api/chat/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((turn) => ({
            role: turn.role === "bot" ? "assistant" : "user",
            content: turn.text,
          })),
        }),
      });
      const data = (await response.json()) as { summary?: string };
      if (data.summary) summary = data.summary;
    } catch {
      /* keep fallback */
    }

    logChat(history, true);
    const href = wa(summary);
    if (tab && !tab.closed) {
      tab.location.assign(href);
    } else {
      // assign(), not `.href =`: same navigation, but the compiler's
      // immutability lint reads the property write as mutating an external.
      window.location.assign(href);
    }
  }

  /**
   * One request/stream cycle. Returns the raw accumulated reply, or "" when
   * the model produced nothing usable, so the caller can retry.
   */
  async function requestReply(
    history: Turn[],
    usedChips: string[],
    signal: AbortSignal,
    live: boolean,
  ): Promise<string> {
    let acc = "";
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shownChips: usedChips,
        path: typeof window !== "undefined" ? window.location.pathname : "/",
        messages: history.slice(-HISTORY_TURNS).map((turn) => ({
          role: turn.role === "bot" ? "assistant" : "user",
          content: turn.text.slice(0, MAX_CHARS),
        })),
      }),
      signal,
    });

    const type = response.headers.get("content-type") ?? "";
    if (!response.ok || type.includes("application/json")) {
      const data = (await response.json().catch(() => ({}))) as { reply?: string };
      return data.reply?.trim() ? data.reply : "";
    }
    if (!response.body) return "";

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      acc += decoder.decode(value, { stream: true });
      if (!live) continue;
      const { text } = parseChips(acc);
      setTurns((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: "bot", text };
        return copy;
      });
    }
    return acc;
  }

  async function streamReply(history: Turn[], usedChips: string[]) {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setPending(true);
    setChips([]);

    let acc = "";
    setTurns((prev) => [...prev, { role: "bot", text: "" }]);

    try {
      acc = await requestReply(history, usedChips, controller.signal, true);
      /*
       * An empty reply is a real upstream outcome, not just a network fault:
       * the model can spend its whole budget on hidden reasoning and stream
       * no content at all. Retrying once quietly recovers it far more often
       * than not, and is a much better answer than showing the visitor an
       * error for something they'd never understand or act on.
       */
      if (!acc.trim() && !controller.signal.aborted) {
        acc = await requestReply(history, usedChips, controller.signal, false);
      }
    } catch {
      acc = "";
    }

    if (controller.signal.aborted) return;

    const { text, chips: nextChips } = parseChips(acc);
    const failed = !text.trim();
    const finalText = failed ? chatFallback : text;
    const resolvedChips = failed
      ? HANDOFF_CHIPS
      : nextChips.length > 0
        ? nextChips
        : FALLBACK_CHIPS;

    setTurns((prev) => {
      const copy = [...prev];
      copy[copy.length - 1] = { role: "bot", text: finalText };
      logChat(copy, handedOff.current);
      return copy;
    });
    setChips(resolvedChips);
    setShownChips((prev) => [...prev, ...resolvedChips]);
    setPending(false);
  }

  async function send(text: string) {
    const content = text.trim().slice(0, MAX_CHARS);
    if (!content || pending || booting) return;
    setDraft("");
    setShownChips((prev) => (prev.includes(content) ? prev : [...prev, content]));

    const history: Turn[] = [...turns, { role: "user", text: content }];
    setTurns(history);
    setChips([]);

    const phone = extractPhone(content);
    if (phone) captureLead(phone, content, history);

    if (wantsCall(content) && !/whatsapp/i.test(content)) {
      handedOff.current = true;
      logChat(history, true);
      window.location.assign(site.phoneHref);
      setTurns((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Opening your phone dialler. If nothing happens, call us on the number in the header.",
        },
      ]);
      setChips(["Talk to someone", "Show me your work"]);
      return;
    }

    if (wantsHandoff(content)) {
      setTurns((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Opening WhatsApp now, with a short summary of what we talked about so you don't have to repeat it. If it doesn't open, use Talk to Shailesh at the top of this window, or call instead.",
        },
      ]);
      setChips(["Call now", "Our services", "See the work"]);
      await openWhatsApp(history);
      return;
    }

    await streamReply(history, [...shownChips, content]);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && open) close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {!open && (
        <button
          type="button"
          className="v3-chat-launcher"
          aria-label={unread ? `Open chat, ${unread} new message` : "Open chat"}
          onClick={() => {
            setOpen(true);
            setUnread(0);
          }}
        >
          <ChatBubbleIcon className="size-[23px]" />
          {unread > 0 ? <span className="v3-chat-badge" aria-hidden="true" /> : null}
        </button>
      )}

      {open && (
        <div className="v3-chat-panel" role="dialog" aria-label="Chat with Coreline">
          <header className="v3-chat-head">
            <div className="v3-chat-head-top">
              <p className="v3-chat-title">
                <span className="v3-chat-live" aria-hidden="true" />
                {chatCopy.header}
              </p>
              <div className="v3-chat-head-btns">
                <button
                  type="button"
                  className="v3-chat-head-wa"
                  onClick={() => void openWhatsApp(turns)}
                >
                  <WhatsAppIcon className="size-3.5" />
                  Talk to Shailesh
                </button>
                <button type="button" onClick={close} aria-label="Close chat" className="v3-chat-close">
                  <CloseIcon className="size-[17px]" />
                </button>
              </div>
            </div>
            <p className="v3-chat-sub">{chatCopy.proof}</p>
          </header>

          <div ref={logRef} className="v3-chat-log" aria-live="polite">
            {booting && turns.length === 0 ? (
              <p className="v3-chat-bot v3-chat-typing" aria-live="polite">
                <span />
                <span />
                <span />
              </p>
            ) : null}

            {turns.map((turn, i) =>
              turn.text ? (
                turn.role === "user" ? (
                  <p key={`u-${i}`} className="v3-chat-user">
                    {turn.text}
                  </p>
                ) : (
                  <div key={`b-${i}`} className="v3-chat-bot">
                    {renderBotText(turn.text)}
                  </div>
                )
              ) : (
                <p key={`p-${i}`} className="v3-chat-bot v3-chat-typing" aria-live="polite">
                  <span />
                  <span />
                  <span />
                </p>
              ),
            )}
          </div>

          {!pending && chips.length > 0 ? (
            <div className="v3-chat-chips">
              {chips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="v3-chat-chip"
                  disabled={pending}
                  onClick={() => void send(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          ) : null}

          <form
            className="v3-chat-composer"
            onSubmit={(event) => {
              event.preventDefault();
              void send(draft);
            }}
          >
            <label htmlFor="v3-chat-input" className="sr-only">
              Your message
            </label>
            <input
              id="v3-chat-input"
              ref={inputRef}
              value={draft}
              maxLength={MAX_CHARS}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type here — Hindi or English is fine"
              autoComplete="off"
            />
            <button type="submit" className="v3-chat-send" disabled={pending || booting || !draft.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
