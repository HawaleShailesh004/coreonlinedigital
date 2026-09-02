"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Persona } from "@/lib/samples/chat-personas";

/**
 * Chat widget for the two samples that carry a live AI assistant.
 *
 * Talks to /api/sample-chat, which holds the key and the persona. The client
 * only ever sends user/assistant turns, so nothing here can change the
 * assistant's instructions.
 *
 * Opened either by its own launcher or by any element on the page with
 * `data-open-chat` - that is how the hero CTA in each brief triggers it.
 */

type Turn = { role: "user" | "assistant"; content: string };

/** Matches the server's per-message cap so the UI can stop you earlier. */
const MAX_CHARS = 500;

export function ChatWidget({ persona }: { persona: Persona }) {
  const surfaceText =
    "text-[color-mix(in_srgb,var(--s-ink)_20%,black)]";

  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const panelId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Any `data-open-chat` element on the page opens the widget.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const trigger = (event.target as HTMLElement | null)?.closest(
        "[data-open-chat]",
      );
      if (!trigger) return;
      event.preventDefault();
      setOpen(true);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else launcherRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Keep the newest message in view as the conversation grows.
  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [turns, pending]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || pending) return;

    const next: Turn[] = [...turns, { role: "user", content }];
    setTurns(next);
    setDraft("");
    setNotice(null);
    setPending(true);

    try {
      const response = await fetch("/api/sample-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ persona: persona.id, messages: next }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };

      if (data.reply) {
        setTurns((current) => [
          ...current,
          { role: "assistant", content: data.reply as string },
        ]);
        return;
      }

      if (response.status === 429) {
        setNotice(data.error ?? "Too many messages - give it a second.");
        return;
      }

      setTurns((current) => [
        ...current,
        { role: "assistant", content: persona.fallback },
      ]);
    } catch {
      setTurns((current) => [
        ...current,
        { role: "assistant", content: persona.fallback },
      ]);
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  }

  const conversation: Turn[] = [
    { role: "assistant", content: persona.greeting },
    ...turns,
  ];

  return (
    <>
      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          "fixed bottom-5 right-5 z-[60] flex items-center gap-2.5 rounded-[var(--s-radius-pill,999px)] px-5 py-3.5 text-sm font-semibold shadow-lg transition-transform duration-200 hover:-translate-y-0.5",
          "bg-[var(--s-primary)] text-[var(--s-on-primary)]",
          open && "hidden",
        )}
      >
        <ChatIcon />
        Chat with us
      </button>

      {/* Panel */}
      <div
        id={panelId}
        role="dialog"
        aria-label={`Chat with ${persona.title}`}
        aria-modal="false"
        hidden={!open}
        className="fixed bottom-5 right-5 z-[60] flex max-h-[min(34rem,calc(100dvh-2.5rem))] w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] shadow-2xl sm:w-[23rem]"
      >
        <header className="flex items-center justify-between gap-3 border-b border-[var(--s-hair)] bg-[var(--s-surface)] px-4 py-3">
          <div className="min-w-0">
            <p className={cn("s-display truncate text-sm font-semibold", surfaceText)}>
              {persona.title}
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[0.6875rem] text-[var(--s-grey)]">
              <span className="breathe size-1.5 rounded-full bg-[var(--s-primary)]" />
              {persona.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="-mr-1 flex size-8 shrink-0 items-center justify-center text-[var(--s-grey)] transition-opacity hover:opacity-60"
          >
            <svg
              viewBox="0 0 16 16"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </header>

        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          aria-live="polite"
          aria-atomic="false"
        >
          {conversation.map((turn, index) => (
            <div
              key={`${turn.role}-${index}`}
              className={cn(
                "max-w-[85%] rounded-[var(--s-radius)] px-3.5 py-2.5 text-[0.8125rem] leading-relaxed",
                turn.role === "user"
                  ? "ml-auto bg-[var(--s-primary)] text-[var(--s-on-primary)]"
                  : cn("bg-[var(--s-surface)]", surfaceText),
              )}
            >
              {turn.content}
            </div>
          ))}

          {pending && (
            <div className="flex w-fit gap-1 rounded-[var(--s-radius)] bg-[var(--s-surface)] px-3.5 py-3">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="breathe size-1.5 rounded-full bg-[var(--s-grey)]"
                  style={{ animationDelay: `${dot * 160}ms` }}
                />
              ))}
              <span className="sr-only">Assistant is typing</span>
            </div>
          )}

          {/* Seed questions, so nobody has to invent one mid-call. */}
          {turns.length === 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {persona.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => send(suggestion)}
                  className="rounded-[var(--s-radius-pill,999px)] border border-[var(--s-hair)] px-3 py-1.5 text-[0.75rem] text-[var(--s-grey)] transition-colors hover:border-[var(--s-primary)] hover:text-[var(--s-primary)]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {notice && (
          <p className="border-t border-[var(--s-hair)] bg-[var(--s-surface)] px-4 py-2 text-[0.75rem] text-[var(--s-grey)]">
            {notice}
          </p>
        )}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void send(draft);
          }}
          className="flex items-center gap-2 border-t border-[var(--s-hair)] px-3 py-3"
        >
          <label htmlFor={`${panelId}-input`} className="sr-only">
            Your message
          </label>
          <input
            ref={inputRef}
            id={`${panelId}-input`}
            value={draft}
            onChange={(event) =>
              setDraft(event.target.value.slice(0, MAX_CHARS))
            }
            maxLength={MAX_CHARS}
            autoComplete="off"
            placeholder="Ask a question…"
            className="min-w-0 flex-1 bg-transparent px-1.5 py-2 text-[0.8125rem] text-[var(--s-ink)] outline-none placeholder:text-[var(--s-grey)]/70"
          />
          <button
            type="submit"
            disabled={pending || !draft.trim()}
            aria-label="Send message"
            className="flex size-9 shrink-0 items-center justify-center rounded-[var(--s-radius)] bg-[var(--s-primary)] text-[var(--s-on-primary)] transition-opacity disabled:opacity-40"
          >
            <svg
              viewBox="0 0 16 16"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
            </svg>
          </button>
        </form>

        <p className="border-t border-[var(--s-hair)] px-4 py-2 text-center text-[0.6875rem] text-[var(--s-grey)]">
          AI replies · {persona.title}
        </p>
      </div>
    </>
  );
}

function ChatIcon() {
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
      <path d="M14 7.5c0 2.9-2.7 5.2-6 5.2-.7 0-1.4-.1-2-.3L3 13.5l.6-2.2A5 5 0 0 1 2 7.5C2 4.6 4.7 2.3 8 2.3s6 2.3 6 5.2Z" />
    </svg>
  );
}
