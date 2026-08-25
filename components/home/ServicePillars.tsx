import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { pillars, servicesPage } from "@/lib/content";

export function ServicePillars() {
  return (
    <Section id="services">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <Eyebrow>{servicesPage.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-h2 font-semibold">
            {servicesPage.heading}
          </h2>
        </div>
        <Link
          href="/services"
          className="group inline-flex items-center gap-2 font-display text-sm font-medium text-accent"
        >
          All services
          <span className="inline-block h-px w-6 bg-accent transition-all duration-200 ease-out group-hover:w-9" />
        </Link>
      </div>

      <ul className="mt-16 grid border-t border-hairline md:grid-cols-3">
        {pillars.map((pillar, index) => (
          <Reveal as="li" key={pillar.id} delay={index * 80}>
            <Link
              href={`/services#${pillar.id}`}
              className="line-hover group relative flex h-full flex-col border-b border-hairline p-8 transition-colors duration-200 ease-out hover:bg-card md:border-r md:last:border-r-0"
            >
              <span className="font-mono text-label uppercase text-accent">
                {pillar.number}
              </span>
              <h3 className="mt-6 font-display text-h3 font-semibold">
                {pillar.title}
              </h3>
              <p className="mt-3 font-display text-sm font-medium text-accent">
                {pillar.tagline}
              </p>
              <p className="mt-4 text-[0.9375rem] leading-[1.65] text-grey">
                {pillar.teaser}
              </p>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
