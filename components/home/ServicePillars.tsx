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
          {/* scaleX, not width: transition-all on a layout property reflows
                the line on every frame of the hover. */}
              <span className="inline-block h-px w-6 origin-left bg-accent transition-transform duration-200 ease-out group-hover:scale-x-150" />
        </Link>
      </div>

      {/* lg, not md: at 768px three columns dropped the body copy to about
          25 characters a line. Measure beats column count. */}
      <ul className="mt-16 grid border-t border-hairline lg:grid-cols-3">
        {pillars.map((pillar, index) => (
          // The dividers belong on the grid item, not the link inside it.
          // On the link, `last:` matched every card - each Link is the only
          // child of its own li, so every one of them is a :last-child - which
          // zeroed all three right borders and the column rules never drew.
          <Reveal
            as="li"
            key={pillar.id}
            delay={index * 80}
            className="border-b border-hairline lg:border-r lg:last:border-r-0"
          >
            <Link
              href={`/services#${pillar.id}`}
              className="line-hover group relative flex h-full flex-col p-8 transition-colors duration-200 ease-out hover:bg-card"
            >
              {/* What it is and when you'd buy it - not 01/02/03, which
                  implied you had to buy them in order. */}
              <span className="font-mono text-label uppercase text-grey">
                {pillar.role}
              </span>
              <h3 className="mt-4 font-display text-h3 font-semibold">
                {pillar.title}
              </h3>
              <p className="mt-3 font-display text-sm font-medium text-ink">
                {pillar.tagline}
              </p>
              <p className="mt-4 text-small text-grey">
                {pillar.teaser}
              </p>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
