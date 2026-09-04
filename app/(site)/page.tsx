import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero, HeroIncoming } from "@/components/v3/Hero";
import { IndustryTicker } from "@/components/v3/IndustryTicker";
import { ReadingHighlight } from "@/components/v3/ReadingHighlight";
import { Panel } from "@/components/v3/Panel";
import { ServiceSlab } from "@/components/v3/ServiceSlab";
import { ApertureReveal } from "@/components/v3/ApertureReveal";
import { DemoCard } from "@/components/v3/DemoCard";
import { ProcessSteps } from "@/components/v3/ProcessSteps";
import { TeamGrid } from "@/components/v3/TeamCard";
import { FAQAccordion } from "@/components/v3/FAQAccordion";
import { ContactPanel } from "@/components/v3/ContactPanel";
import { Reveal } from "@/components/v3/Reveal";
import { defaultDescription, faqJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { demos, homeCopy, homeDemoSlugs, services, team } from "@/lib/site-content";

export const metadata = {
  ...pageMetadata({
    title: "Websites, AI Agents & Automations in Thane",
    description: defaultDescription,
    path: "/",
  }),
};

export default function HomePage() {
  const homeDemos = homeDemoSlugs.map((slug) => demos.find((d) => d.slug === slug)!);

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: "Websites, AI Agents & Automations in Thane",
            description: defaultDescription,
            path: "/",
          }),
          faqJsonLd(homeCopy.faq),
        ]}
      />

      <Hero>
        <HeroIncoming>
          <IndustryTicker />
        </HeroIncoming>
      </Hero>

      {/* Statement - motion moment 2: reading highlight */}
      <section className="py-28 sm:py-40">
        <div className="v3-container">
          <ReadingHighlight
            text={homeCopy.statement.text}
            emeraldWords={homeCopy.statement.emerald}
            className="v3-display max-w-[20ch] text-[clamp(1.6rem,4vw,2.75rem)] leading-[1.15] tracking-[-0.02em]"
          />
        </div>
      </section>

      {/* Services - tall panel: sheet corners, no CSS sticky */}
      <Panel variant="forest" stack id="services" className="py-24 sm:py-32">
        <div className="v3-container">
          <p className="text-xs uppercase tracking-[0.14em] opacity-60">{homeCopy.services.eyebrow}</p>
          <h2 className="v3-display mt-3 max-w-2xl text-[clamp(1.6rem,3.8vw,2.5rem)] leading-[1.1] tracking-[-0.02em]">
            {homeCopy.services.heading}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] opacity-70">{homeCopy.services.sub}</p>

          <div className="mt-12">
            {services.map((service, i) => (
              <ServiceSlab key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </Panel>

      {/* Aperture - motion moment 3 */}
      <ApertureReveal>
        <h2 className="v3-display text-[clamp(1.6rem,4.5vw,2.75rem)] leading-[1.1] tracking-[-0.02em]">
          {homeCopy.aperture.heading}
        </h2>
        <p className="mt-5 text-[15px] opacity-70">{homeCopy.aperture.sub}</p>
      </ApertureReveal>

      {/* Demos - stacked sheet over ink */}
      <Panel variant="bone" stack className="py-24 sm:py-32">
        <div className="v3-container">
          <p className="text-xs uppercase tracking-[0.14em] opacity-60">{homeCopy.demos.eyebrow}</p>
          <h2 className="v3-display mt-3 max-w-2xl text-[clamp(1.6rem,3.8vw,2.5rem)] leading-[1.1] tracking-[-0.02em]">
            {homeCopy.demos.heading}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] opacity-70">{homeCopy.demos.sub}</p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {homeDemos.map((demo, i) => (
              <Reveal key={demo.slug} delay={i * 80}>
                <DemoCard demo={demo} />
              </Reveal>
            ))}
          </div>

          <Link
            href="/work"
            className="mt-10 inline-flex items-center gap-2 v3-display text-sm font-semibold underline underline-offset-4"
          >
            {homeCopy.demos.link} →
          </Link>
        </div>
      </Panel>

      <ProcessSteps heading={homeCopy.process.heading} steps={homeCopy.process.steps} />

      {/* Team */}
      <section className="py-24 sm:py-32">
        <div className="v3-container">
          <h2 className="v3-display max-w-xl text-[clamp(1.45rem,3.2vw,1.9rem)] leading-[1.15]">
            {homeCopy.team.heading}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] opacity-70">{homeCopy.team.sub}</p>

          <div className="mt-12">
            <TeamGrid members={team} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 sm:py-32">
        <div className="v3-container max-w-2xl">
          <h2 className="v3-display text-[clamp(1.45rem,3.2vw,1.9rem)]">Questions</h2>
          <div className="mt-8">
            <FAQAccordion items={homeCopy.faq} firstOpen />
          </div>
        </div>
      </section>

      <ContactPanel />
    </>
  );
}
