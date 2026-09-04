"use client";

import { LineNode } from "@/components/LineNode";
import { Magnetic } from "@/components/effects/Magnetic";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { hero, pageWhatsappHref } from "@/lib/content";

/**
 * One-time "curtain up" on load. Delays are CSS-driven so the sequence never
 * replays on scroll-back, and the whole thing lands under 1.5s.
 */
const STEP = {
  headline: 520,
  subhead: 780,
  trust: 940,
  ctas: 1100,
};

function step(delay: number) {
  return { "--step-delay": `${delay}ms` } as React.CSSProperties;
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-28 md:pb-28">
      <div className="hero-wash" aria-hidden="true" />

      <Container className="relative flex flex-col items-center text-center">
        <div className="mb-10 w-32">
          <LineNode animate tone="accent" />
        </div>

        {/* Whole headline in ink. The old build coloured one phrase emerald;
            that is a generic treatment and this sentence does not need it. */}
        <h1 className="max-w-3xl font-display text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[3rem] lg:text-[4rem] lg:leading-[1.08]">
          {hero.headline.map((line, index) => (
            <span
              key={line}
              className="hero-step block"
              style={step(STEP.headline + index * 60)}
            >
              {line}
            </span>
          ))}
        </h1>

        <p
          className="hero-step mt-8 max-w-xl text-lead text-body"
          style={step(STEP.subhead)}
        >
          {hero.subhead}
        </p>

        <ul
          className="hero-step mt-10 flex flex-col items-center gap-4 font-mono text-label uppercase text-grey sm:flex-row sm:gap-12"
          style={step(STEP.trust)}
        >
          {hero.trustLine.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>

        <div
          className="hero-step mt-12 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center"
          style={step(STEP.ctas)}
        >
          {hero.ctas.map((cta) => {
            const href =
              "external" in cta && cta.external ? pageWhatsappHref("/") : cta.href;
            const button = (
              <Button
                href={href}
                variant={cta.variant}
                external={"external" in cta ? cta.external : undefined}
              >
                {cta.label}
              </Button>
            );

            // Magnetic pull only on the primary WhatsApp CTA - one moment of
            // presence, not every control chasing the cursor.
            if (cta.variant === "primary") {
              return <Magnetic key={cta.href}>{button}</Magnetic>;
            }

            return <span key={cta.href}>{button}</span>;
          })}
        </div>
        <button
          type="button"
          data-open-chat
          className="hero-step mt-5 font-display text-sm font-medium text-grey underline-offset-4 transition-colors hover:text-accent hover:underline"
          style={step(STEP.ctas + 80)}
        >
          Or ask if you need a website
        </button>
      </Container>
    </section>
  );
}
