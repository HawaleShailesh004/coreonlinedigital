import Link from "next/link";
import { WorkCard } from "@/components/WorkCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { workSamples, workTeaser } from "@/lib/content";

export function WorkTeaser() {
  return (
    <Section bordered>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>{workTeaser.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-h2 font-semibold">
            {workTeaser.heading}
          </h2>
        </div>
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 font-display text-sm font-medium text-accent"
        >
          {workTeaser.cta}
          <span className="inline-block h-px w-6 bg-accent transition-all duration-200 ease-out group-hover:w-9" />
        </Link>
      </div>

      <ul className="mt-16 grid gap-8 md:grid-cols-3">
        {workSamples.slice(0, 3).map((sample, index) => (
          <Reveal as="li" key={sample.slug} delay={index * 80}>
            <WorkCard sample={sample} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
