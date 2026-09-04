"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const stack = [
  { title: "Sites that convert", body: "Fast pages that turn searches and WhatsApp into bookings." },
  { title: "Assistants that answer", body: "Qualify leads when you’re busy — the live proof is on this domain." },
  { title: "Systems that run", body: "CRM hooks, automations, SEO — so growth isn’t a one-off launch." },
];

export default function SignalConceptPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="lab-grain relative min-h-dvh overflow-x-hidden">
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[50rem] -translate-x-1/2 blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(47,143,114,0.28), transparent 60%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-[30%] h-72 w-72 rounded-full blur-3xl"
        style={{ background: "rgba(47,143,114,0.12)" }}
        aria-hidden
      />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <Link href="/lab" className="lab-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--lab-mute)]">
          ← Lab
        </Link>
        <p className="lab-display text-sm font-semibold tracking-tight">coreline.</p>
        <a
          href="https://wa.me/919082308732"
          className="lab-mono rounded-full bg-[var(--lab-accent)] px-4 py-2 text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--lab-void)]"
        >
          Talk
        </a>
      </header>

      <main className="relative z-10">
        {/* Hero — AuthKit/Resend: product as artifact */}
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-10 text-center md:px-10 md:pt-16">
          <p
            className={`lab-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[var(--lab-accent)] ${mounted ? "lab-fade" : "opacity-0"}`}
          >
            Concept A · Signal · Mumbai / Thane
          </p>
          <h1
            className={`lab-display mx-auto mt-8 max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] md:text-7xl lg:text-8xl ${mounted ? "lab-fade" : "opacity-0"}`}
            style={{ animationDelay: "80ms" }}
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #fff 20%, rgba(255,255,255,0.55) 100%)",
                textShadow: "0 0 80px rgba(47,143,114,0.35)",
              }}
            >
              Growth
            </span>
            <br />
            <span className="text-[var(--lab-ink)]">systems.</span>
          </h1>
          <p
            className={`mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[var(--lab-mute)] ${mounted ? "lab-fade" : "opacity-0"}`}
            style={{ animationDelay: "160ms" }}
          >
            Websites, assistants, and automations that bring customers — and answer when you can&apos;t. Built by one
            full-stack studio, not five vendors.
          </p>
          <div
            className={`mt-10 flex flex-wrap items-center justify-center gap-4 ${mounted ? "lab-fade" : "opacity-0"}`}
            style={{ animationDelay: "220ms" }}
          >
            <a
              href="https://wa.me/919082308732?text=Hi%20Shailesh%20%E2%80%94%20saw%20the%20Signal%20concept"
              className="rounded-full bg-[var(--lab-ink)] px-8 py-3.5 font-medium text-[var(--lab-void)] transition hover:bg-[var(--lab-accent)]"
            >
              Start on WhatsApp
            </a>
            <Link
              href="/work"
              className="rounded-full border border-[var(--lab-line)] px-8 py-3.5 text-[var(--lab-mute)] transition hover:border-[var(--lab-accent)] hover:text-[var(--lab-ink)]"
            >
              See samples
            </Link>
          </div>

          {/* Floating glass product stack */}
          <div
            className={`relative mx-auto mt-20 h-[22rem] max-w-3xl md:h-[26rem] ${mounted ? "lab-fade" : "opacity-0"}`}
            style={{ animationDelay: "320ms" }}
          >
            <div
              className="lab-float-anim absolute left-[8%] top-6 hidden w-[42%] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-[0_0_60px_rgba(47,143,114,0.2)] backdrop-blur-xl md:block"
              style={{ animation: "lab-float 7s ease-in-out infinite", transform: "rotate(-6deg)" }}
            >
              <Image
                src="/lab/mockups/gym-mockup.png"
                alt="Gym website sample"
                width={640}
                height={400}
                className="rounded-xl object-cover"
              />
            </div>
            <div
              className="absolute left-1/2 top-0 z-10 w-[78%] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/15 bg-[var(--lab-panel)]/80 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl md:w-[52%]"
              style={{ boxShadow: "0 0 0 1px rgba(47,143,114,0.25), 0 25px 80px rgba(0,0,0,0.55)" }}
            >
              <Image
                src="/lab/mockups/clinic-mockup.png"
                alt="Clinic website sample"
                width={720}
                height={480}
                className="rounded-xl object-cover"
                priority
              />
            </div>
            <div
              className="lab-float-anim absolute bottom-2 right-[6%] w-[46%] rounded-2xl border border-white/10 bg-black/50 p-4 text-left shadow-[0_0_50px_rgba(47,143,114,0.25)] backdrop-blur-xl md:w-[36%]"
              style={{ animation: "lab-float 6s ease-in-out infinite 0.8s", transform: "rotate(4deg)" }}
            >
              <p className="lab-mono text-[0.625rem] uppercase tracking-[0.14em] text-[var(--lab-accent)]">
                Live assistant
              </p>
              <p className="mt-2 text-sm leading-snug text-[var(--lab-ink)]">
                Qualifies the lead. Surfaces the pain. Hands you WhatsApp with everything filled in.
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-[var(--lab-accent)]" style={{ animation: "lab-glow-pulse 2.4s ease-in-out infinite" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-y border-[var(--lab-line)] bg-[var(--lab-surface)]/60">
          <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-[var(--lab-line)] md:grid-cols-3 md:divide-x md:divide-y-0">
            {["From ₹15,000", "10 working days", "Half only when live"].map((t) => (
              <p key={t} className="lab-mono px-6 py-5 text-center text-[0.75rem] uppercase tracking-[0.16em] text-[var(--lab-mute)]">
                {t}
              </p>
            ))}
          </div>
        </section>

        {/* Stack */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <p className="lab-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--lab-accent)]">The stack</p>
          <h2 className="lab-display mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.02em] md:text-5xl">
            Not a brochure site. An online machine.
          </h2>
          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {stack.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-[var(--lab-line)] bg-gradient-to-b from-white/[0.04] to-transparent p-7 transition hover:border-[var(--lab-accent)]"
              >
                <h3 className="lab-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--lab-mute)]">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Close */}
        <section className="mx-auto max-w-6xl px-6 pb-28 text-center md:px-10">
          <div className="rounded-3xl border border-[var(--lab-line)] bg-[var(--lab-panel)] px-8 py-16"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 80px rgba(47,143,114,0.12)" }}
          >
            <h2 className="lab-display text-3xl font-semibold tracking-tight md:text-5xl">
              Ready when you are.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[var(--lab-mute)]">
              Message Shailesh. He builds it himself — websites, bots, automations, the lot.
            </p>
            <a
              href="https://wa.me/919082308732"
              className="mt-8 inline-flex rounded-full bg-[var(--lab-accent)] px-8 py-3.5 font-medium text-[var(--lab-void)]"
            >
              WhatsApp Coreline
            </a>
          </div>
          <p className="lab-mono mt-10 text-[0.625rem] uppercase tracking-[0.16em] text-[var(--lab-mute)]">
            Concept only · Not the live homepage
          </p>
        </section>
      </main>
    </div>
  );
}
