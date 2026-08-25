import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { whyNotTemplate } from "@/lib/content";

const { panels } = whyNotTemplate;

export function WhyNotTemplate() {
  return (
    <Section bordered>
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Eyebrow>{whyNotTemplate.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-h2 font-semibold">
            {whyNotTemplate.headline}
          </h2>
        </div>
        <p className="text-lead text-body md:col-span-6 md:col-start-7">
          {whyNotTemplate.body}
        </p>
      </div>

      <Reveal className="mt-16 grid border border-hairline md:grid-cols-2">
        <div className="flex flex-col gap-8 border-b border-hairline p-8 md:border-b-0 md:border-r md:p-12">
          <p className="font-mono text-label uppercase text-grey">
            {panels.template.label}
          </p>
          {/* Deliberately motionless - the stillness is the point. */}
          <div className="h-16 w-full" aria-hidden="true">
            <svg
              viewBox="0 0 320 60"
              preserveAspectRatio="none"
              className="h-full w-full"
              role="presentation"
            >
              <line
                x1="0"
                y1="30"
                x2="320"
                y2="30"
                stroke="var(--color-grey)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
          <div className="text-[0.9375rem] leading-[1.65] text-grey">
            {panels.template.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8 p-8 md:p-12">
          <p className="font-mono text-label uppercase text-accent">
            {panels.system.label}
          </p>
          {/* Intentional infinite loop #2 - ambient "alive", not urgent. */}
          <div className="h-16 w-full" aria-hidden="true">
            <svg
              viewBox="0 0 320 60"
              preserveAspectRatio="none"
              className="h-full w-full"
              role="presentation"
            >
              <path
                d="M0 30 Q 20 8 40 30 T 80 30 T 120 30 T 160 30 T 200 30 T 240 30 T 280 30 T 320 30"
                fill="none"
                stroke="var(--color-hairline)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                className="pulse-path"
                d="M0 30 Q 20 8 40 30 T 80 30 T 120 30 T 160 30 T 200 30 T 240 30 T 280 30 T 320 30"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
          <div className="text-[0.9375rem] leading-[1.65] text-ink">
            {panels.system.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
