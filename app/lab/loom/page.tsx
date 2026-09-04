"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const beats = [
  {
    step: "01",
    title: "You're invisible online",
    body: "Someone searches. A competitor shows up. The enquiry never existed for you.",
  },
  {
    step: "02",
    title: "Enquiries die in WhatsApp",
    body: "Fees, timings, “are you open?” — answered late or not at all while you’re busy.",
  },
  {
    step: "03",
    title: "We build the catch",
    body: "A site that finds you. An assistant that answers. Automations that follow up.",
  },
  {
    step: "04",
    title: "You get booked",
    body: "WhatsApp arrives warm — with context. You close. The system keeps running.",
  },
];

const work = [
  { src: "/lab/mockups/clinic-mockup.png", name: "Clinic", tag: "Bookings" },
  { src: "/lab/mockups/gym-mockup.png", name: "Gym", tag: "Trials" },
  { src: "/lab/mockups/trader-mockup.png", name: "Trader", tag: "Orders" },
  { src: "/lab/mockups/realty-mockup.png", name: "Realty", tag: "Visits" },
  { src: "/lab/mockups/travel-mockup.png", name: "Travel", tag: "Itineraries" },
];

export default function LoomConceptPage() {
  const storyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = storyRef.current;
    if (!root) return;
    const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-beat]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = Number((visible.target as HTMLElement).dataset.beat);
        if (!Number.isNaN(idx)) setActive(idx);
      },
      { root: null, threshold: [0.45, 0.6] },
    );
    panels.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lab-grain relative min-h-dvh overflow-x-hidden bg-[#0a0b0a]">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-white/5 bg-[#0a0b0a]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <Link href="/lab" className="lab-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--lab-mute)]">
            ← Lab
          </Link>
          <p className="lab-display text-sm font-semibold">coreline.</p>
          <a href="https://wa.me/919082308732" className="text-sm text-[var(--lab-accent)]">
            Message
          </a>
        </div>
      </header>

      <main className="pt-20">
        {/* Manifesto hero */}
        <section className="mx-auto max-w-4xl px-6 py-24 text-center md:px-10 md:py-32">
          <p className="lab-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[var(--lab-mute)]">
            Concept C · Loom · Craft story
          </p>
          <h1 className="lab-display mt-8 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] md:text-6xl lg:text-7xl">
            From invisible
            <br />
            to <em className="not-italic text-[var(--lab-accent)]">booked.</em>
          </h1>
          <p className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-[var(--lab-mute)]">
            Coreline builds the online layer serious local businesses actually need — presence, proof, and something that
            answers when the owner can&apos;t.
          </p>
        </section>

        {/* Sticky scrollytelling */}
        <section className="border-y border-white/5 bg-[#0e100f]">
          <div className="mx-auto grid max-w-6xl md:grid-cols-2">
            <div className="sticky top-20 hidden h-[calc(100dvh-5rem)] flex-col justify-center border-r border-white/5 p-12 md:flex">
              <p className="lab-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--lab-accent)]">
                The arc
              </p>
              <p className="lab-display mt-6 text-5xl font-semibold tracking-tight">
                {beats[active]?.step}
              </p>
              <h2 className="lab-display mt-4 text-3xl font-semibold leading-tight">{beats[active]?.title}</h2>
              <p className="mt-5 max-w-sm text-[var(--lab-mute)]">{beats[active]?.body}</p>
              <div className="mt-10 flex gap-2">
                {beats.map((_, i) => (
                  <span
                    key={i}
                    className="h-1 flex-1 rounded-full transition-colors"
                    style={{ background: i === active ? "var(--lab-accent)" : "rgba(255,255,255,0.1)" }}
                  />
                ))}
              </div>
            </div>

            <div ref={storyRef} className="md:min-h-[200vh]">
              {beats.map((beat, i) => (
                <article
                  key={beat.step}
                  data-beat={i}
                  className="flex min-h-[70dvh] flex-col justify-center border-b border-white/5 px-6 py-16 md:px-12"
                >
                  <p className="lab-mono text-[0.6875rem] text-[var(--lab-mute)] md:hidden">{beat.step}</p>
                  <h3 className="lab-display mt-3 text-3xl font-semibold md:hidden">{beat.title}</h3>
                  <p className="mt-4 text-[var(--lab-mute)] md:hidden">{beat.body}</p>
                  <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 md:mt-0">
                    <Image
                      src={work[i % work.length]!.src}
                      alt={work[i % work.length]!.name}
                      fill
                      className="object-cover transition duration-700"
                      style={{ opacity: active === i ? 1 : 0.55, transform: active === i ? "scale(1)" : "scale(1.04)" }}
                      sizes="(min-width:768px) 45vw, 100vw"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Horizontal work rail */}
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <p className="lab-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--lab-accent)]">Work</p>
            <h2 className="lab-display mt-4 text-3xl font-semibold md:text-5xl">Built to be clicked through.</h2>
          </div>
          <div className="mt-12 flex gap-5 overflow-x-auto px-6 pb-4 md:px-10" style={{ scrollbarWidth: "thin" }}>
            {work.map((item) => (
              <figure
                key={item.name}
                className="w-[min(20rem,80vw)] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[var(--lab-surface)]"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={item.src} alt={item.name} fill className="object-cover" sizes="320px" />
                </div>
                <figcaption className="flex items-center justify-between px-5 py-4">
                  <span className="lab-display font-semibold">{item.name}</span>
                  <span className="lab-mono text-[0.625rem] uppercase tracking-[0.14em] text-[var(--lab-mute)]">
                    {item.tag}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Services whisper */}
        <section className="mx-auto max-w-3xl px-6 py-20 text-center md:px-10">
          <p className="lab-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--lab-mute)]">Also</p>
          <p className="lab-display mt-6 text-2xl font-medium leading-snug text-[var(--lab-ink)] md:text-3xl">
            Apps · SEO · CRM · Chatbots · Automations · Brand &amp; UI
          </p>
          <p className="mt-5 text-[var(--lab-mute)]">
            One full-stack builder. Not a handoff between five freelancers.
          </p>
        </section>

        <section className="border-t border-white/5 px-6 py-24 text-center">
          <h2 className="lab-display text-3xl font-semibold md:text-5xl">Let&apos;s make you impossible to miss.</h2>
          <a
            href="https://wa.me/919082308732"
            className="mt-10 inline-flex rounded-full border border-[var(--lab-accent)] px-8 py-3.5 text-[var(--lab-accent)] transition hover:bg-[var(--lab-accent)] hover:text-[var(--lab-void)]"
          >
            Open WhatsApp
          </a>
          <p className="lab-mono mt-10 text-[0.625rem] uppercase tracking-[0.16em] text-[var(--lab-mute)]">
            Concept C · Loom · After Estrela + Flammini
          </p>
        </section>
      </main>
    </div>
  );
}
