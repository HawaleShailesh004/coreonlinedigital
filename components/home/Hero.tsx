import { LineNode } from "@/components/LineNode";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { hero } from "@/lib/content";

/**
 * One-time "curtain up" on load. Delays are CSS-driven so the sequence never
 * replays on scroll-back, and the whole thing lands under 1.5s.
 */
const STEP = {
  headline: 400,
  subhead: 670,
  ctas: 820,
};

function step(delay: number) {
  return { "--step-delay": `${delay}ms` } as React.CSSProperties;
}

export function Hero() {
  return (
    <section className="pt-16 pb-20 md:pt-28 md:pb-28">
      <Container className="flex flex-col items-center text-center">
        <div className="mb-10 w-24">
          <LineNode animate tone="accent" />
        </div>

        <h1 className="max-w-3xl font-display text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[3rem] lg:text-[4rem] lg:leading-[1.08]">
          {hero.headline.map((line, lineIndex) => (
            <span
              key={lineIndex}
              className="hero-step block"
              style={step(STEP.headline + lineIndex * 60)}
            >
              {line.map((part, partIndex) => (
                <span
                  key={partIndex}
                  className={
                    part.tone === "accent"
                      ? "text-accent"
                      : part.tone === "muted"
                        ? "text-grey"
                        : undefined
                  }
                >
                  {part.text}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p
          className="hero-step mt-8 max-w-xl text-lead text-body"
          style={step(STEP.subhead)}
        >
          {hero.subhead}
        </p>

        <div
          className="hero-step mt-12 flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
          style={step(STEP.ctas)}
        >
          {hero.ctas.map((cta) => (
            <Button key={cta.href} href={cta.href} variant={cta.variant}>
              {cta.label}
            </Button>
          ))}
        </div>
      </Container>
    </section>
  );
}
