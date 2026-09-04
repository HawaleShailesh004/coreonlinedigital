import Link from "next/link";
import { WorkTeaserRail } from "@/components/home/WorkTeaserRail";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { workSamples, workTeaser } from "@/lib/content";

export function WorkTeaser() {
  return (
    <Section bordered containerClassName="overflow-visible">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>{workTeaser.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-h2 font-semibold">
            {workTeaser.heading}
          </h2>
          <p className="mt-5 max-w-2xl text-small text-body">
            {workTeaser.sub}
          </p>
        </div>
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 font-display text-sm font-medium text-accent"
        >
          {workTeaser.cta}
          <span className="inline-block h-px w-6 origin-left bg-accent transition-transform duration-200 ease-out group-hover:scale-x-150" />
        </Link>
      </div>

      <WorkTeaserRail samples={workSamples.slice(0, 4)} />
    </Section>
  );
}
