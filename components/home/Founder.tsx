import { LogoMark } from "@/components/LogoMark";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { founder } from "@/lib/content";

/** Deliberately still - no motion beyond the block-level fade-up. */
export function Founder() {
  return (
    <Section bordered className="relative overflow-hidden">
      {/* The mark, rendered large and faint as a static backdrop. */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-end pr-5 text-ink opacity-[0.06] md:pr-12"
        aria-hidden="true"
      >
        <LogoMark className="h-56 w-auto md:h-72" />
      </div>

      <Reveal className="relative max-w-2xl">
        <Eyebrow>{founder.eyebrow}</Eyebrow>
        <h2 className="mt-5 font-display text-h2 font-semibold">
          {founder.heading}
        </h2>
        {founder.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-8 text-lead text-body">
            {paragraph}
          </p>
        ))}
      </Reveal>
    </Section>
  );
}
