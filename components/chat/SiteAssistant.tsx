"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { chatIcons } from "@/components/chat/ChatIcons";
import { trustFacts } from "@/lib/chat/facts";
import {
  buildSummary,
  budgetSpent,
  classifyFrequency,
  classifyIntent,
  classifyWebsite,
  closingAsk,
  diagnosis,
  emptyProfile,
  extractPhone,
  formatPhone,
  frequencyChips,
  frequencyLabel,
  intentAcknowledgement,
  intentChips,
  intentLabel,
  looksLikeQuestion,
  looksLikeSocial,
  matchVertical,
  pendingQuestion,
  postFlowReplies,
  problemAcknowledgement,
  reopenAsk,
  stageNote,
  stepOrder,
  verticalChips,
  verticals,
  websiteChips,
  websiteLabel,
  websiteReply,
  whatsappHref,
  type Frequency,
  type IconKey,
  type Intent,
  type Profile,
  type Step,
  type VerticalId,
  type WebsiteState,
} from "@/lib/chat/flow";
import { corelinePersona } from "@/lib/chat/persona";
import { pageWhatsappHref, site } from "@/lib/content";

/**
 * The assistant on Coreline's own site.
 *
 * This is deliberately not the sample widget with a different endpoint. The
 * sample bots answer questions about a fictional gym; this one runs a fixed
 * qualifying sequence for a real business, in the Coreline design language
 * (square corners, ink and paper, emerald only where something is clickable),
 * and it is the live proof of the second thing Shailesh sells - "something that
 * answers when you can't". A visitor who watches it work has used the product
 * instead of reading about it, so it has to be the good version.
 *
 * HOW IT BEHAVES
 * - The four questions are scripted and render locally, so they are instant and
 *   cannot misquote the price. See lib/chat/flow.ts for the sequence itself.
 * - Anything typed off-script goes to the model, which answers and hands back.
 * - Chips are offered at every step, so typing is never required.
 * - The phone number is asked last, after the diagnosis and the numbers have
 *   been given. Asking first is what spam bots do.
 * - Skipping the number is always allowed and always visible.
 *
 * LIMITS
 * - Six model answers per session; after that it says so and hands off. This is
 *   a product decision as much as a cost one - past six questions, the honest
 *   answer is "talk to him".
 * - The server enforces its own caps independently (app/api/chat/route.ts).
 */

/* -------------------------------------------------------------------------- */
/* Types and constants                                                         */
/* -------------------------------------------------------------------------- */

type Card = "facts" | "handoff" | "contactPrompt";

type Message =
  | { role: "bot"; kind: "text"; text: string }
  | { role: "bot"; kind: Card }
  | { role: "user"; kind: "text"; text: string };

type TextMessage = Extract<Message, { kind: "text" }>;

/** Array.filter does not narrow a union, so the transcript builders need this. */
function isText(message: Message): message is TextMessage {
  return message.kind === "text";
}

/**
 * A tappable answer. Deliberately plain data rather than a bound callback:
 * the chip list is computed during render, and data cannot reach into refs.
 */
type Chip = {
  label: string;
  /** Sent instead of the label, when the label is a UI phrase. */
  send?: string;
  icon?: IconKey;
  vertical?: VerticalId;
  website?: WebsiteState;
  frequency?: Frequency;
  intent?: Intent;
  skip?: boolean;
};

/** Queued bot output, drained one item at a time with a typing pause. */
type Outgoing = { kind: "text"; text: string } | { kind: Card };

type Saved = {
  id: string;
  messages: Message[];
  step: Step;
  profile: Profile;
  aiUsed: number;
};

/**
 * Bumped from v2: adds a session id used to upsert one conversation record
 * for /admin (see syncConversation, below). A v2 blob without one just gets a
 * fresh id generated for it - harmless, not worth a hard migration for.
 */
const STORAGE_KEY = "coreline-chat-v3";
const TEASER_KEY = "coreline-chat-teaser-v1";

/** Matches the server's per-message cap so the UI stops you first. */
const MAX_CHARS = 500;
/** Model answers per session. Past this, the honest answer is "talk to him". */
const MAX_AI_ANSWERS = 6;
/** Turns sent upstream. The server caps total length again on its side. */
const HISTORY_TURNS = 8;
const TEASER_DELAY_MS = 12_000;

const GREETING: Outgoing[] = [
  {
    kind: "text",
    text: "Hi - I'm the assistant on Shailesh's site. What kind of business do you run?",
  },
];

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export function SiteAssistant() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [queue, setQueue] = useState<Outgoing[]>([]);
  const [step, setStep] = useState<Step>("business");
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [aiUsed, setAiUsed] = useState(0);
  const [aiPending, setAiPending] = useState(false);

  const [draft, setDraft] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [teaser, setTeaser] = useState(false);
  const [nearCta, setNearCta] = useState(false);
  const [keyboardInset, setKeyboardInset] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hydrated = useRef(false);
  const leadSent = useRef(false);
  /** True once a handoff or budget-spent ending has been shown this pass. */
  const endingShown = useRef(false);
  /** Mirrors aiUsed so the budget check never reads a stale render. */
  const aiUsedRef = useRef(0);
  /** True once the opening messages exist, restored or freshly queued. */
  const greeted = useRef(false);
  /** Stable per-tab id, generated once, used to upsert one conversation record. */
  const sessionId = useRef<string>("");
  /** Always holds the latest state, so the pagehide handler never closes over a stale render. */
  const latest = useRef({ messages, profile, step });
  // Written in an effect (runs after render), not during render - a ref write
  // while rendering is running is exactly the tear a concurrent render can
  // expose. Runs after every render, deliberately with no dependency array.
  useEffect(() => {
    latest.current = { messages, profile, step };
  });

  const pathname = usePathname();

  const busy = queue.length > 0 || aiPending;

  /* ---------------------------------------------------------------------- */
  /* Environment                                                             */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 639px)");
    const sync = () => {
      setReduceMotion(motion.matches);
      setCompact(narrow.matches);
    };
    sync();
    motion.addEventListener("change", sync);
    narrow.addEventListener("change", sync);

    // Restore the conversation, so moving between pages does not wipe it.
    //
    // This has to happen in an effect rather than a lazy useState initialiser:
    // localStorage does not exist while rendering on the server, so seeding
    // state from it would make the first client render disagree with the
    // server HTML and break hydration. One extra render on mount, behind a
    // closed panel, is the cheaper side of that trade.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Saved;
        if (Array.isArray(saved.messages) && saved.messages.length > 0) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- see above
          setMessages(saved.messages);
          setStep(saved.step ?? "business");
          setProfile({ ...emptyProfile, ...saved.profile });
          setAiUsed(saved.aiUsed ?? 0);
          aiUsedRef.current = saved.aiUsed ?? 0;
          greeted.current = true;
          if (saved.profile?.phone) leadSent.current = true;
          if (saved.step === "done") endingShown.current = true;
          if (saved.id) sessionId.current = saved.id;
        }
      }
    } catch {
      // A blocked or corrupt store is not a reason to withhold the assistant.
    }
    if (!sessionId.current) {
      sessionId.current =
        typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
    hydrated.current = true;

    return () => {
      motion.removeEventListener("change", sync);
      narrow.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!hydrated.current || messages.length === 0) return;
    try {
      const saved: Saved = { id: sessionId.current, messages, step, profile, aiUsed };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch {
      // Full or blocked storage: the session still works, it just won't persist.
    }
  }, [messages, step, profile, aiUsed]);

  /* ---------------------------------------------------------------------- */
  /* Visibility - every conversation gets saved, not just completed leads    */
  /* ---------------------------------------------------------------------- */

  /**
   * "I should get to know the chats - what and who talked": every
   * conversation, not just the ones that end in a phone number, gets synced
   * to /api/chat-log at each meaningful step (see submit(), below) and shows
   * up at /admin. Fires maybe six or seven times per real conversation, which
   * the endpoint's rate limit is sized around - not on every keystroke.
   */
  const syncConversation = useCallback((next: Profile, log: Message[], completed: boolean) => {
    if (!sessionId.current) return;
    const vertical = next.vertical ? verticals[next.vertical].label : "";
    const transcript = log
      .filter(isText)
      .map((m) => `${m.role === "user" ? "Them" : "Bot"}: ${m.text}`)
      .join("\n");

    void fetch("/api/chat-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: sessionId.current,
        completed,
        name: next.name,
        business: next.businessText,
        vertical,
        problem: next.problemText,
        frequency: next.frequency ? frequencyLabel[next.frequency] : "",
        website: next.website ? websiteLabel[next.website] : "",
        intent: next.intent ? intentLabel[next.intent] : "",
        transcript,
      }),
    }).catch(() => {
      // Best-effort visibility, never something the widget's own flow waits on.
    });
  }, []);

  /**
   * Catches the conversation that ends mid-typing: someone answers two or
   * three questions and just closes the tab. sendBeacon fires even as the
   * page is unloading, which a normal fetch is not guaranteed to survive.
   */
  useEffect(() => {
    function onHide() {
      const { messages: currentMessages, profile: currentProfile, step: currentStep } = latest.current;
      if (!sessionId.current || currentMessages.length < 3 || currentStep === "done") return;
      const transcript = currentMessages
        .filter(isText)
        .map((m) => `${m.role === "user" ? "Them" : "Bot"}: ${m.text}`)
        .join("\n");
      const vertical = currentProfile.vertical ? verticals[currentProfile.vertical].label : "";
      const body = JSON.stringify({
        id: sessionId.current,
        completed: false,
        name: currentProfile.name,
        business: currentProfile.businessText,
        vertical,
        problem: currentProfile.problemText,
        frequency: currentProfile.frequency ? frequencyLabel[currentProfile.frequency] : "",
        website: currentProfile.website ? websiteLabel[currentProfile.website] : "",
        intent: currentProfile.intent ? intentLabel[currentProfile.intent] : "",
        transcript,
      });
      navigator.sendBeacon?.("/api/chat-log", new Blob([body], { type: "application/json" }));
    }
    document.addEventListener("pagehide", onHide);
    return () => document.removeEventListener("pagehide", onHide);
  }, []);

  /* ---------------------------------------------------------------------- */
  /* Scripted output, drained with a human pause                             */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (queue.length === 0) return;
    const [next, ...rest] = queue;

    const length = next.kind === "text" ? next.text.length : 90;
    const wait = reduceMotion ? 60 : Math.min(1_100, 380 + length * 8);

    const timer = setTimeout(() => {
      setMessages((current) => [
        ...current,
        next.kind === "text"
          ? { role: "bot", kind: "text", text: next.text }
          : { role: "bot", kind: next.kind },
      ]);
      setQueue(rest);
    }, wait);

    return () => clearTimeout(timer);
  }, [queue, reduceMotion]);

  const say = useCallback((items: Outgoing[]) => {
    setQueue((current) => [...current, ...items]);
  }, []);

  // Keep the newest message in view as the conversation grows.
  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTo({ top: node.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages, aiPending, queue.length, reduceMotion]);

  /* ---------------------------------------------------------------------- */
  /* Open / close                                                            */
  /* ---------------------------------------------------------------------- */

  const openPanel = useCallback(() => {
    setOpen(true);
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "seen");
    } catch {
      /* ignore */
    }
  }, []);

  // First open seeds the greeting; reopening does not greet you again.
  useEffect(() => {
    if (!open || greeted.current) return;
    greeted.current = true;
    say(GREETING);
  }, [open, say]);

  useEffect(() => {
    if (!open) return;
    // Focusing the input on a phone throws the keyboard up over the answer
    // chips, which are the easier way to reply. Desktop gets the caret.
    if (!compact) inputRef.current?.focus();
    else panelRef.current?.focus();
  }, [open, compact]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus({ preventScroll: true });
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // A full-height sheet behind a scrolling page is disorienting on a phone.
  useEffect(() => {
    if (!open || !compact) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, compact]);

  useEffect(() => {
    if (!open || !compact) {
      // Genuinely needed, not just convenient: without this, a keyboard inset
      // measured during a previous mobile session would linger and wrongly
      // pad the desktop panel the next time `compact` flips false.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setKeyboardInset(0);
      return;
    }
    const viewport = window.visualViewport;
    if (!viewport) return;
    const sync = () => {
      const inset = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
      setKeyboardInset(inset);
    };
    sync();
    viewport.addEventListener("resize", sync);
    viewport.addEventListener("scroll", sync);
    return () => {
      viewport.removeEventListener("resize", sync);
      viewport.removeEventListener("scroll", sync);
    };
  }, [open, compact]);

  // Anything on the page marked `data-open-chat` opens the assistant.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const trigger = (event.target as HTMLElement | null)?.closest("[data-open-chat]");
      if (!trigger) return;
      event.preventDefault();
      openPanel();
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [openPanel]);

  // The launcher must never sit on top of the closing WhatsApp CTA - or, on a
  // page that has no closing band (contact), on top of the footer.
  //
  // One selector covers both: querySelector returns the first match in document
  // order, and the CTA band always precedes the footer on pages that have one.
  useEffect(() => {
    const band = document.querySelector("[data-cta-band], footer");
    if (!band) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearCta(entry?.isIntersecting ?? false),
      { threshold: 0.2 },
    );
    observer.observe(band);

    // Resetting on the way out matters: cleanup runs before the next route's
    // effect, so a page with no CTA band clears the flag instead of inheriting
    // "hidden" from the previous page and stranding the launcher off-screen.
    return () => {
      observer.disconnect();
      setNearCta(false);
    };
    // Re-queried per route: the band is a different node on each page, and
    // some pages do not have one at all.
  }, [pathname]);

  // The teaser, once per session, and only if they never opened it.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(TEASER_KEY)) return;
    } catch {
      return;
    }
    const timer = setTimeout(() => {
      if (!greeted.current) setTeaser(true);
    }, TEASER_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function dismissTeaser() {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "seen");
    } catch {
      /* ignore */
    }
  }

  function restart() {
    setMessages([]);
    setQueue([]);
    setStep("business");
    setProfile(emptyProfile);
    setAiUsed(0);
    aiUsedRef.current = 0;
    setNotice(null);
    leadSent.current = false;
    endingShown.current = false;
    greeted.current = true;
    sessionId.current =
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    say(GREETING);
  }

  /* ---------------------------------------------------------------------- */
  /* Lead capture - done here, not by the model                              */
  /* ---------------------------------------------------------------------- */

  const sendLead = useCallback(
    (next: Profile, log: Message[]) => {
      if (leadSent.current || !next.phone) return;
      leadSent.current = true;

      const summary = buildSummary(next);
      const transcript = log
        .filter(isText)
        .map((message) => `${message.role === "user" ? "Them" : "Bot"}: ${message.text}`)
        .join("\n");

      void fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: sessionId.current,
          phone: summary.phone,
          name: summary.name,
          business: summary.business,
          websiteState: summary.website,
          problem: summary.problem,
          transcript,
        }),
      }).then((response) => {
        if (!response.ok) throw new Error("lead failed");
      }).catch(() => {
        say([
          {
            kind: "text",
            text: "If you don't hear back, tap WhatsApp below - that reaches him directly.",
          },
        ]);
      });
    },
    [say],
  );

  /* ---------------------------------------------------------------------- */
  /* The model sidecar                                                       */
  /* ---------------------------------------------------------------------- */

  const askModel = useCallback(
    async (log: Message[], currentStep: Step, currentProfile: Profile) => {
      if (aiUsedRef.current >= MAX_AI_ANSWERS) {
        if (endingShown.current) return;
        endingShown.current = true;
        setStep("done");
        say([{ kind: "text", text: budgetSpent }, { kind: "handoff" }]);
        return;
      }

      setAiPending(true);

      const history = log
        .filter(isText)
        .slice(-HISTORY_TURNS)
        .map((message) => ({
          role: message.role === "user" ? ("user" as const) : ("assistant" as const),
          content: message.text.slice(0, MAX_CHARS),
        }));

      // The server requires the last turn to be from the visitor.
      while (history.length > 0 && history[0]!.role === "assistant" && history.length > HISTORY_TURNS - 1) {
        history.shift();
      }

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history,
            stage: stageNote(currentStep, currentProfile),
          }),
        });

        const data = (await response.json().catch(() => ({}))) as {
          reply?: string;
          error?: string;
        };

        if (response.status === 429) {
          say([
            {
              kind: "text",
              text: data.error ?? "You're sending messages a bit fast - give it a second, then ask again.",
            },
          ]);
          return;
        }

        if (!response.ok) {
          say([{ kind: "text", text: corelinePersona.fallback }]);
          return;
        }

        aiUsedRef.current += 1;
        setAiUsed(aiUsedRef.current);
        say([{ kind: "text", text: data.reply ?? corelinePersona.fallback }]);
      } catch {
        say([{ kind: "text", text: corelinePersona.fallback }]);
      } finally {
        setAiPending(false);
      }
    },
    [say],
  );

  /* ---------------------------------------------------------------------- */
  /* The flow                                                                */
  /* ---------------------------------------------------------------------- */

  const submit = useCallback(
    (text: string, chip?: Chip) => {
      const content = text.trim().slice(0, MAX_CHARS);
      if (!content || busy) return;

      // Some chips answer the current question; others are just a prefilled
      // question the visitor could have typed. Only the first kind skips the
      // "is this a question?" check.
      const answers = Boolean(
        chip?.vertical || chip?.website || chip?.frequency || chip?.intent || chip?.skip,
      );

      setNotice(null);
      setDraft("");

      const log: Message[] = [...messages, { role: "user", kind: "text", text: content }];
      setMessages(log);

      // Skipping the number is always allowed. Hiding that exit would only
      // trade a warm WhatsApp conversation for an abandoned widget.
      if (chip?.skip) {
        if (step === "name") {
          setStep("contact");
          syncConversation(profile, log, false);
          const leadIn =
            profile.website === "fine"
              ? "If it does turn out to be worth building something, this is what it costs:"
              : "Here's what fixing that costs, before you have to ask:";
          say([
            { kind: "text", text: `${diagnosis(profile)} ${leadIn}` },
            { kind: "facts" },
            { kind: "text", text: closingAsk(profile.intent) },
          ]);
          return;
        }
        setStep("done");
        endingShown.current = true;
        syncConversation(profile, log, true);
        say([
          {
            kind: "text",
            text: "No problem at all - here's everything from this chat, ready to send. Nothing else needed from you.",
          },
          { kind: "handoff" },
        ]);
        return;
      }

      /* --- They kept talking after a handoff -------------------------------- */

      if (step === "done" || endingShown.current) {
        const canned = postFlowReplies[content];
        if (canned) {
          say([{ kind: "text", text: canned }]);
          return;
        }

        endingShown.current = false;
        aiUsedRef.current = 0;
        setAiUsed(0);
        leadSent.current = false;

        const id = chip?.vertical ?? matchVertical(content);
        const namedBusiness =
          Boolean(chip?.vertical) ||
          (id !== "other" &&
            !looksLikeQuestion(content) &&
            !looksLikeSocial(content));

        if (namedBusiness) {
          const vertical = verticals[id];
          const next = { ...emptyProfile, vertical: id, businessText: content };
          setProfile(next);
          setStep("problem");
          syncConversation(next, log, false);
          say([
            {
              kind: "text",
              text: id === "other" ? "Got it." : `Right, ${vertical.trade}.`,
            },
            { kind: "text", text: vertical.question },
          ]);
          return;
        }

        setProfile(emptyProfile);
        setStep("business");
        syncConversation(emptyProfile, log, false);
        say([{ kind: "text", text: reopenAsk }]);
        return;
      }

      /* --- Last step: the number ------------------------------------------ */

      if (step === "contact") {
        const phone = extractPhone(content);
        if (phone) {
          const next = { ...profile, phone };
          setProfile(next);
          setStep("done");
          endingShown.current = true;
          sendLead(next, log);
          syncConversation(next, log, true);
          say([
            {
              kind: "text",
              text: `Got it${next.name ? `, ${next.name.split(" ")[0]}` : ""} - ${formatPhone(phone)}. Shailesh will look at how you show up on Google and message you himself, usually within a few hours. If you don't hear back, tap WhatsApp below.`,
            },
            { kind: "handoff" },
          ]);
          return;
        }

        // A short run of letters at this point is almost always their name.
        if (/^[A-Za-z][A-Za-z .'-]{1,40}$/.test(content) && !looksLikeQuestion(content)) {
          setProfile((current) => ({ ...current, name: content }));
          say([
            {
              kind: "text",
              text: `Thanks ${content.split(" ")[0]}. And the number Shailesh should message you on?`,
            },
          ]);
          return;
        }

        if (looksLikeQuestion(content)) {
          void askModel(log, step, profile);
          return;
        }

        say([
          {
            kind: "text",
            text: "That doesn't look like a 10-digit mobile number. Type it however you like - or skip it and message him on WhatsApp instead.",
          },
        ]);
        return;
      }

      /* --- A question at any other point goes to the model ---------------- */

      if (!answers && looksLikeQuestion(content)) {
        void askModel(log, step, profile);
        return;
      }

      /* --- Otherwise it answers whatever was asked ------------------------ */

      if (step === "business") {
        const id = chip?.vertical ?? matchVertical(content);
        const vertical = verticals[id];
        const next = { ...profile, vertical: id, businessText: content };
        setProfile(next);
        setStep("problem");
        syncConversation(next, log, false);
        say([
          { kind: "text", text: id === "other" ? "Got it." : `Right, ${vertical.trade}.` },
          { kind: "text", text: vertical.question },
        ]);
        return;
      }

      if (step === "problem") {
        const next = { ...profile, problemText: content };
        setProfile(next);
        setStep("impact");
        syncConversation(next, log, false);
        say([
          { kind: "text", text: problemAcknowledgement },
          { kind: "text", text: pendingQuestion("impact", profile) },
        ]);
        return;
      }

      if (step === "impact") {
        const frequency = chip?.frequency ?? classifyFrequency(content);
        if (!frequency) {
          void askModel(log, step, profile);
          return;
        }
        const next = { ...profile, frequency };
        setProfile(next);
        setStep("website");
        syncConversation(next, log, false);
        say([{ kind: "text", text: pendingQuestion("website", next) }]);
        return;
      }

      if (step === "website") {
        const state = chip?.website ?? classifyWebsite(content);
        if (!state) {
          void askModel(log, step, profile);
          return;
        }

        const next = { ...profile, website: state };
        const vertical = verticals[next.vertical ?? "other"];
        setProfile(next);
        setStep("intent");
        syncConversation(next, log, false);
        say([
          { kind: "text", text: websiteReply(state, vertical) },
          { kind: "text", text: pendingQuestion("intent", next) },
        ]);
        return;
      }

      if (step === "intent") {
        const intent = chip?.intent ?? classifyIntent(content);
        if (!intent) {
          void askModel(log, step, profile);
          return;
        }
        const next = { ...profile, intent };
        setProfile(next);
        setStep("name");
        syncConversation(next, log, false);
        say([
          { kind: "text", text: intentAcknowledgement(intent) },
          { kind: "contactPrompt" },
          { kind: "text", text: pendingQuestion("name", next) },
        ]);
        return;
      }

      if (step === "name") {
        if (/^[A-Za-z][A-Za-z .'-]{1,40}$/.test(content) && !looksLikeQuestion(content)) {
          const next = { ...profile, name: content };
          setProfile(next);
          setStep("contact");
          syncConversation(next, log, false);
          const leadIn =
            next.website === "fine"
              ? "If it does turn out to be worth building something, this is what it costs:"
              : "Here's what fixing that costs, before you have to ask:";
          say([
            { kind: "text", text: `${diagnosis(next)} ${leadIn}` },
            { kind: "facts" },
            { kind: "text", text: closingAsk(next.intent) },
          ]);
          return;
        }
        if (looksLikeQuestion(content)) {
          void askModel(log, step, profile);
          return;
        }
        say([{ kind: "text", text: "Just a first name is enough - or skip it." }]);
        return;
      }

      // Past the sequence: everything is a question for the model.
      if (step === "done" || endingShown.current) return;
      void askModel(log, step, profile);
    },
    [busy, messages, profile, say, sendLead, step, askModel, syncConversation],
  );

  /* ---------------------------------------------------------------------- */
  /* Derived view state                                                      */
  /* ---------------------------------------------------------------------- */

  const chips: Chip[] | null = useMemo(() => {
    if (busy || messages.length === 0) return null;

    if (step === "business") {
      return verticalChips.map((id) => ({ label: verticals[id].label, vertical: id, icon: id }));
    }

    if (step === "problem" && profile.vertical) {
      return verticals[profile.vertical].answers.map((answer) => ({ label: answer }));
    }

    if (step === "impact") {
      return frequencyChips.map((option) => ({
        label: option.label,
        frequency: option.id,
        icon: option.icon,
      }));
    }

    if (step === "website") {
      return websiteChips.map((option) => ({
        label: option.label,
        website: option.id,
        icon: option.icon,
      }));
    }

    if (step === "intent") {
      return intentChips.map((option) => ({
        label: option.label,
        intent: option.id,
        icon: option.icon,
      }));
    }

    if (step === "name") {
      return [
        {
          label: "Skip - just take my number",
          send: "Skip my name",
          skip: true,
          icon: "skip" as IconKey,
        },
      ];
    }

    if (step === "contact") {
      // The exit is always visible. Cornering someone into giving a number
      // trades a warm WhatsApp conversation for an abandoned widget.
      return [
        {
          label: "Skip - I'll message on WhatsApp",
          send: "I'll message on WhatsApp instead",
          skip: true,
          icon: "skip" as IconKey,
        },
      ];
    }

    return [
      { label: "What if I don't need a website?", icon: "question" as IconKey },
      { label: "Can I see your samples?", icon: "images" as IconKey },
      { label: "How does payment work?", icon: "rupee" as IconKey },
    ];
  }, [busy, messages.length, profile.vertical, step]);

  const progress = step === "done" ? stepOrder.length : stepOrder.indexOf(step);
  const askingForName = step === "name";
  const askingForPhone = step === "contact";
  const summary = useMemo(() => buildSummary(profile), [profile]);

  /* ---------------------------------------------------------------------- */
  /* Render                                                                  */
  /* ---------------------------------------------------------------------- */

  return (
    <>
      {/* Teaser - shown once, after twelve seconds, never auto-opening. */}
      {teaser && !open && !nearCta && (
        <div className="chat-teaser-in fixed right-5 z-[60] flex max-w-[16rem] items-start gap-2 border border-hairline bg-paper p-3 bottom-16 sm:bottom-24 sm:right-6">
          <button
            type="button"
            onClick={openPanel}
            className="text-left text-[0.8125rem] leading-snug text-body hover:text-accent"
          >
            Want an honest opinion on your business? Ask me.
          </button>
          <button
            type="button"
            onClick={dismissTeaser}
            aria-label="Dismiss"
            className="-mr-1 -mt-1 flex size-6 shrink-0 items-center justify-center text-grey transition-opacity hover:opacity-60"
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? setOpen(false) : openPanel())}
        aria-expanded={open}
        aria-label="Open the site assistant"
        className={cn(
          "line-hover chat-launcher-in group fixed bottom-5 right-5 z-[60] hidden items-center gap-2.5 border border-ink bg-ink px-5 py-3.5 font-display text-[0.8125rem] font-medium text-paper transition-[background-color,border-color,opacity,transform] duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent sm:bottom-6 sm:right-6 sm:flex",
          open && "pointer-events-none opacity-0",
          nearCta && !open && "sm:right-auto sm:left-6",
        )}
      >
        <span className="breathe size-1.5 shrink-0 rounded-full bg-accent-soft group-hover:bg-paper" aria-hidden="true" />
        <span className="hidden sm:inline">Ask about your business</span>
        <span className="sm:hidden">Ask a question</span>
      </button>

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-label="Coreline site assistant"
        aria-modal={compact}
        hidden={!open}
        style={keyboardInset ? { paddingBottom: keyboardInset } : undefined}
        className={cn(
          "fixed z-[70] flex flex-col overflow-hidden border border-hairline bg-paper outline-none",
          "border border-hairline",
          // Phone: a sheet off the bottom edge. Desktop: a panel by the launcher.
          // The safe-area pad keeps the composer clear of the home indicator.
          "inset-x-0 bottom-0 max-h-[88dvh] pb-[env(safe-area-inset-bottom)]",
          "sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-h-[min(38rem,calc(100dvh-6rem))] sm:w-[23.5rem]",
          open && (compact ? "chat-sheet-in" : "chat-panel-in"),
        )}
      >
        {/* pb-2.5 keeps the progress rail's nodes inside the ink band; flush
            against the edge they overlap whatever has scrolled up behind. */}
        <header className="shrink-0 bg-ink px-4 pb-2.5 pt-3.5 text-paper">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <Mark />
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold leading-tight">
                  {corelinePersona.title}
                </p>
                <p className="mt-1 flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-widest text-paper/55">
                  <span className="breathe size-1 rounded-full bg-accent-soft" aria-hidden="true" />
                  On this page
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={restart}
                  className="px-2 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-paper/50 transition-colors hover:text-paper"
                >
                  Start over
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  launcherRef.current?.focus({ preventScroll: true });
                }}
                aria-label="Close assistant"
                className="-mr-1 flex size-8 items-center justify-center text-paper/60 transition-opacity hover:opacity-100"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* The brand's line-and-node motif, doing an actual job: how far
              through the four questions you are. */}
          <div className="relative mt-3 h-px w-full bg-hairline-inverse" aria-hidden="true">
            <span
              className="absolute inset-y-0 left-0 origin-left bg-accent-soft transition-transform duration-500 ease-line"
              style={{
                width: "100%",
                transform: `scaleX(${progress / stepOrder.length})`,
              }}
            />
            {stepOrder.map((name, index) => (
              <span
                key={name}
                data-filled={index < progress}
                className={cn(
                  "chat-node absolute top-1/2 block size-1.25 -translate-x-1/2 -translate-y-1/2 rounded-full",
                  index < progress ? "bg-accent-soft" : "bg-paper/25",
                )}
                style={{ left: `${((index + 1) / stepOrder.length) * 100}%` }}
              />
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            {progress < stepOrder.length
              ? `Question ${progress + 1} of ${stepOrder.length}`
              : "All questions answered"}
          </p>
        </header>

        {/* Log */}
        <div
          ref={scrollRef}
          className="chat-scroll flex-1 space-y-3 overflow-y-auto px-4 py-4"
          aria-live="polite"
          aria-atomic="false"
        >
          {/* Narrowed positively (kind === "text" first) rather than by
              elimination - `kind: Card` is one union member, so the negative
              branch would not narrow down to the text variants. */}
          {messages.map((message, index) =>
            message.kind === "text" ? (
              message.role === "bot" ? (
                <BotBubble key={index} text={message.text} />
              ) : (
                <p
                  key={index}
                  className="chat-in ml-auto w-fit max-w-[88%] bg-ink px-3.5 py-2.5 text-[0.8125rem] leading-[1.65] text-paper"
                >
                  {message.text}
                </p>
              )
            ) : message.kind === "facts" ? (
              <FactsCard key={index} />
            ) : message.kind === "contactPrompt" ? (
              <ContactPromptCard key={index} />
            ) : (
              <HandoffCard key={index} href={whatsappHref(site.whatsapp, summary)} />
            ),
          )}

          {busy && (
            <div className="flex w-fit gap-1 border border-hairline bg-[#fdfdfc] px-3.5 py-3">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="breathe size-1.5 rounded-full bg-grey"
                  style={{ animationDelay: `${dot * 160}ms` }}
                />
              ))}
              <span className="sr-only">Typing</span>
            </div>
          )}

          {chips && (
            <div className="flex flex-wrap gap-2 pt-1">
              {chips.map((chip, index) => {
                const Icon = chip.icon ? chatIcons[chip.icon] : null;
                return (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => submit(chip.send ?? chip.label, chip)}
                    style={{ ["--chat-delay" as string]: `${index * 45}ms` }}
                    className="chat-in flex items-center gap-1.5 border border-hairline px-3 py-1.5 text-[0.75rem] text-body transition-colors duration-150 hover:border-accent hover:text-accent"
                  >
                    {Icon && <Icon className="size-3.5 shrink-0 text-grey" />}
                    {chip.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {notice && (
          <p className="shrink-0 border-t border-hairline bg-[#fdfdfc] px-4 py-2 text-[0.75rem] text-grey">
            {notice}
          </p>
        )}

        {/* Composer */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit(draft);
          }}
          className="flex shrink-0 items-center gap-2 border-t border-hairline px-3 py-2.5"
        >
          <label htmlFor="coreline-chat-input" className="sr-only">
            {askingForName ? "Your name" : askingForPhone ? "Your phone number" : "Your message"}
          </label>
          {/* A quiet icon prefix at exactly the two info-collecting steps -
              the moment "proper UX for collecting info" matters most - rather
              than on every turn, where it would just be noise. */}
          {(askingForName || askingForPhone) && (
            <span className="flex size-5 shrink-0 items-center justify-center text-grey">
              {askingForName ? <chatIcons.person className="size-4" /> : <chatIcons.phone className="size-4" />}
            </span>
          )}
          <input
            ref={inputRef}
            id="coreline-chat-input"
            value={draft}
            onChange={(event) => setDraft(event.target.value.slice(0, MAX_CHARS))}
            maxLength={MAX_CHARS}
            autoComplete={askingForPhone ? "tel" : askingForName ? "given-name" : "off"}
            inputMode={askingForPhone ? "tel" : "text"}
            type={askingForPhone ? "tel" : "text"}
            placeholder={
              askingForPhone
                ? "10-digit mobile number"
                : askingForName
                  ? "Your name…"
                  : "Type your answer, or just ask…"
            }
            className="min-w-0 flex-1 bg-transparent px-1.5 py-2 text-[0.8125rem] text-ink outline-none placeholder:text-grey/70"
          />
          <button
            type="submit"
            disabled={busy || !draft.trim()}
            aria-label="Send"
            className="flex size-9 shrink-0 items-center justify-center bg-ink text-paper transition-colors duration-150 hover:bg-accent disabled:opacity-30 disabled:hover:bg-ink"
          >
            <SendIcon />
          </button>
        </form>

        <p className="shrink-0 border-t border-hairline px-4 py-2 text-center font-mono text-[0.5625rem] uppercase tracking-widest text-grey">
          Automated assistant · Shailesh replies personally
        </p>
      </div>

      {compact && !open && (
        <div className="fixed inset-x-0 bottom-0 z-[65] border-t border-hairline bg-paper pb-[env(safe-area-inset-bottom)] sm:hidden">
          <div className="flex h-12">
            <a
              href={pageWhatsappHref(pathname)}
              target="_blank"
              rel="noreferrer noopener"
              className="flex flex-1 items-center justify-center bg-ink font-display text-[0.8125rem] font-medium text-paper"
            >
              {site.primaryCta}
            </a>
            <button
              type="button"
              onClick={openPanel}
              className="flex flex-1 items-center justify-center font-display text-[0.8125rem] font-medium text-ink"
            >
              Ask
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Bot copy                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * URLs in model replies used to render as dead text (often wrapped in
 * <angle brackets> or backticks). Split them into real links, and if the
 * reply points at a page on this site, put a button under the bubble so
 * nobody has to copy-paste.
 */
const PAGE_ACTIONS: { pattern: RegExp; href: string; label: string }[] = [
  { pattern: /\/work\b|sample sites?|portfolio|example sites?/i, href: "/work", label: "See sample sites" },
  { pattern: /\/services\b/i, href: "/services", label: "See services" },
  { pattern: /\/contact\b/i, href: "/contact", label: "Talk to Shailesh" },
  { pattern: /\/about\b/i, href: "/about", label: "About Coreline" },
];

const URL_TOKEN =
  /(?:`?<)(https?:\/\/[^>\s]+)>`?|`?(https?:\/\/[^\s`<]+)`?|(?<![\w/])(\/(?:work|services|contact|about)(?:\/[^\s.,;:!?]*)?)/gi;

function pageAction(text: string): { href: string; label: string } | null {
  return PAGE_ACTIONS.find((action) => action.pattern.test(text)) ?? null;
}

function resolveHref(raw: string): { href: string; internal: boolean } {
  const cleaned = raw.replace(/^[<`]+|[>`]+$/g, "").trim();
  if (cleaned.startsWith("/")) {
    return { href: cleaned, internal: true };
  }
  try {
    const url = new URL(cleaned.startsWith("www.") ? `https://${cleaned}` : cleaned);
    const internal = /(^|\.)corelinedigital\.in$/i.test(url.hostname);
    return {
      href: internal ? `${url.pathname}${url.search}` || "/" : url.href,
      internal,
    };
  } catch {
    return { href: cleaned, internal: false };
  }
}

function linkedText(text: string) {
  const parts: ReactNode[] = [];
  const pattern = new RegExp(URL_TOKEN.source, "gi");
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const raw = match[1] ?? match[2] ?? match[3] ?? match[0];
    const { href, internal } = resolveHref(raw);
    const className = "text-accent underline-offset-2 hover:underline";
    const label =
      href === "/work"
        ? "sample sites"
        : href === "/services"
          ? "services"
          : href === "/contact"
            ? "contact"
            : href === "/about"
              ? "about"
              : internal
                ? href
                : href.replace(/^https?:\/\//, "");
    parts.push(
      internal ? (
        <Link key={key++} href={href} className={className}>
          {label}
        </Link>
      ) : (
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={className}
        >
          {label}
        </a>
      ),
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length > 0 ? parts : text;
}

function BotBubble({ text }: { text: string }) {
  const action = pageAction(text);
  return (
    <div className="chat-in w-fit max-w-[88%]">
      <p className="border border-hairline bg-[#fdfdfc] px-3.5 py-2.5 text-[0.8125rem] leading-[1.65] text-body">
        {linkedText(text)}
      </p>
      {action && (
        <Link
          href={action.href}
          className="mt-2 inline-flex border border-accent px-3 py-1.5 font-display text-[0.75rem] font-medium text-accent transition-colors duration-150 hover:bg-accent hover:text-paper"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Cards                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Price, time and terms, given before the number is asked for. Same three facts
 * as the hero trust line, on purpose - the visitor should have already read
 * them once and recognise them here.
 */
function FactsCard() {
  return (
    <div className="chat-in bg-ink px-4 py-3.5 text-paper">
      <p className="flex items-center gap-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-paper/45">
        <chatIcons.rupee className="size-3" />
        What it costs
      </p>
      <dl className="mt-2.5 space-y-2.5">
        {trustFacts.map((fact) => (
          <div key={fact.label} className="border-t border-hairline-inverse pt-2.5 first:border-0 first:pt-0">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="font-mono text-[0.625rem] uppercase tracking-widest text-paper/50">
                {fact.label}
              </dt>
              <dd className="font-display text-[0.875rem] font-semibold">{fact.value}</dd>
            </div>
            <p className="mt-0.5 text-[0.6875rem] leading-snug text-paper/50">{fact.note}</p>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Shown once, right as the assistant is about to ask for a name and a number -
 * "proper UX for collecting info" means saying what this is for and where it
 * goes before asking, not just dropping an input box in the middle of a chat.
 */
function ContactPromptCard() {
  return (
    <div className="chat-in flex items-start gap-3 border border-hairline bg-[#fdfdfc] p-3.5">
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center border border-hairline text-accent">
        <chatIcons.person className="size-3.5" />
      </span>
      <p className="text-[0.8125rem] leading-relaxed text-body">
        Just a name and a number - Shailesh replies personally, and it&apos;s never shared or sold.
      </p>
    </div>
  );
}

/** The exit. Everything said in the chat is already written into the message. */
function HandoffCard({ href }: { href: string }) {
  return (
    <div className="chat-in chat-ring-once border border-accent bg-accent/4 p-3.5">
      <p className="text-[0.8125rem] leading-relaxed text-body">
        Everything from this chat is already written into the message - just hit send.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-3 flex w-full items-center justify-center gap-2 bg-accent px-4 py-3 font-display text-[0.8125rem] font-medium text-paper transition-opacity hover:opacity-85"
      >
        <WhatsAppIcon />
        Open WhatsApp
      </a>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Glyphs                                                                      */
/* -------------------------------------------------------------------------- */

/** The line-and-node mark, small enough for a header. */
function Mark() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0" fill="none" aria-hidden="true">
      <path d="M4 12h16" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.2" />
      <circle cx="5.5" cy="12" r="2" fill="currentColor" fillOpacity="0.4" />
      <circle cx="18.5" cy="12" r="2.5" className="fill-accent-soft" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3Z" />
    </svg>
  );
}
