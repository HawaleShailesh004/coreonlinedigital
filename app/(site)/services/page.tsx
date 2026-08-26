import { FinalCta } from "@/components/FinalCta";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { pillars, servicesPage } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Digital storefronts, client acquisition systems, and growth retainers for clinics, CAs, schools, and local businesses in Thane and Mumbai.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow={servicesPage.eyebrow}
        heading={servicesPage.heading}
        sub={servicesPage.sub}
      />

      {pillars.map((pillar) => (
        <Section key={pillar.id} id={pillar.id} bordered size="tight">
          <Reveal className="grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <p className="font-mono text-label uppercase text-accent">
                {pillar.number}
              </p>
              <h2 className="mt-6 font-display text-h2 font-semibold">
                {pillar.title}
              </h2>
              <p className="mt-4 font-display text-lg font-medium text-accent">
                {pillar.tagline}
              </p>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <p className="text-lead text-body">{pillar.body}</p>

              <p className="mt-10 font-mono text-label uppercase text-grey">
                Includes
              </p>
              <ul className="mt-5 border-t border-hairline">
                {pillar.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 border-b border-hairline py-4 text-[0.9375rem] leading-[1.6]"
                  >
                    <span
                      className="mt-2.5 h-px w-4 shrink-0 bg-accent"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <Button href="/contact" variant="secondary" className="mt-10">
                Get a quote →
              </Button>
            </div>
          </Reveal>
        </Section>
      ))}

      <FinalCta
        heading={servicesPage.bottomHeading}
        body={servicesPage.bottomBody}
      />
    </>
  );
}
