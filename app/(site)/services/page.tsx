import { JsonLd } from "@/components/seo/JsonLd";
import { Panel } from "@/components/v3/Panel";
import { ServicesScrolly } from "@/components/v3/ServicesScrolly";
import { Reveal } from "@/components/v3/Reveal";
import { DemoCard } from "@/components/v3/DemoCard";
import { FAQAccordion } from "@/components/v3/FAQAccordion";
import { ContactPanel } from "@/components/v3/ContactPanel";
import { faqJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { bundles, demos, servicesPageCopy } from "@/lib/site-content";

const TITLE = "Web Design, AI Agents & Automation Services in Thane";
const DESCRIPTION =
  "Websites, AI agents, automations, local search, apps, CRM & software, branding and social content - one team, no handoffs.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/services" });

export default function ServicesPage() {
  const strip = [demos[0], demos[1], demos[2]];

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ title: TITLE, description: DESCRIPTION, path: "/services" }),
          faqJsonLd(servicesPageCopy.faq),
        ]}
      />

      <section className="pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="v3-container max-w-3xl">
          <h1 className="v3-display text-[clamp(1.85rem,5vw,3rem)] leading-[1.02] tracking-[-0.03em]">
            {servicesPageCopy.hero.lines[0]}
            <br />
            {servicesPageCopy.hero.lines[1]}
          </h1>
          <p className="mt-6 max-w-xl text-[15px] opacity-70">{servicesPageCopy.hero.sub}</p>
        </div>
      </section>

      {/* Motion moment 1: sticky index + stacked detail cards */}
      <ServicesScrolly />

      {/* Bundles - forest panel */}
      <Panel variant="forest" stack className="py-24 sm:py-32">
        <div className="v3-container">
          <h2 className="v3-display max-w-xl text-[clamp(1.45rem,3.2vw,2.1rem)] leading-[1.15]">
            {servicesPageCopy.bundles.heading}
          </h2>
          <p className="mt-3 opacity-70">{servicesPageCopy.bundles.sub}</p>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {bundles.map((bundle, i) => (
              <Reveal key={bundle.name} delay={i * 150} className="v3-hairline-t flex flex-col gap-3 pt-6">
                <p className="v3-display text-xl">{bundle.name}</p>
                <p className="text-xs uppercase tracking-[0.08em]" style={{ color: "var(--emerald)" }}>
                  {bundle.parts}
                </p>
                <p className="text-sm opacity-80">{bundle.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Panel>

      {/* Statement - static */}
      <section className="py-24 sm:py-32">
        <div className="v3-container max-w-2xl">
          <p className="v3-display text-[clamp(1.2rem,2.8vw,1.65rem)] leading-[1.35]">
            {servicesPageCopy.statement}
          </p>
        </div>
      </section>

      {/* Demos strip - bone panel */}
      <Panel variant="bone" stack className="py-24 sm:py-32">
        <div className="v3-container">
          <h2 className="v3-display text-[clamp(1.45rem,3.2vw,1.9rem)]">{servicesPageCopy.demosStrip.heading}</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {strip.map((demo) => (
              <DemoCard key={demo.slug} demo={demo} />
            ))}
          </div>
        </div>
      </Panel>

      <section className="py-24 sm:py-32">
        <div className="v3-container max-w-2xl">
          <h2 className="v3-display text-[clamp(1.45rem,3.2vw,1.9rem)]">Questions</h2>
          <div className="mt-8">
            <FAQAccordion items={servicesPageCopy.faq} />
          </div>
        </div>
      </section>

      <ContactPanel />
    </>
  );
}
