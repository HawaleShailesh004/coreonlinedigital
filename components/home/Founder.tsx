import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { founder } from "@/lib/content";

/** Deliberately still - no motion beyond the block-level fade-up. */
export function Founder() {
  return (
    <Section bordered className="relative overflow-hidden">
      {/* The motif, rendered large and faint as a static backdrop. */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 flex w-1/2 items-center justify-end opacity-[0.06]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 40" className="h-40 w-full" role="presentation">
          <line
            x1="0"
            y1="20"
            x2="176"
            y2="20"
            stroke="var(--color-ink)"
            strokeWidth="4"
          />
          <circle cx="184" cy="20" r="12" fill="var(--color-ink)" />
        </svg>
      </div>

      <Reveal className="relative max-w-2xl">
        <Eyebrow>{founder.eyebrow}</Eyebrow>
        <h2 className="mt-5 font-display text-h2 font-semibold">
          {founder.heading}
        </h2>
        <p className="mt-8 text-lead text-body">{founder.body}</p>
      </Reveal>
    </Section>
  );
}
