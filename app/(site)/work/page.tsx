import { JsonLd } from "@/components/seo/JsonLd";
import { Panel } from "@/components/v3/Panel";
import { DemoCard } from "@/components/v3/DemoCard";
import { Reveal } from "@/components/v3/Reveal";
import { StepRow } from "@/components/v3/StepRow";
import { ContactPanel } from "@/components/v3/ContactPanel";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";
import { demos, workPageCopy } from "@/lib/site-content";

const TITLE = "Work - Sites for Thane & Mumbai Businesses";
const DESCRIPTION =
  "Nine complete builds, one per trade - jewellers, clinics, gyms, real estate, schools, CAs, interior designers, travel agencies and traders. Open one on your phone.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/work" });

export default function WorkPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ title: TITLE, description: DESCRIPTION, path: "/work", type: "CollectionPage" })} />

      <Panel variant="bone" className="flex min-h-[55vh] flex-col justify-center pt-28 pb-20 sm:pt-36">
        <div className="v3-container max-w-3xl">
          <h1 className="v3-display text-[clamp(1.85rem,5vw,3rem)] leading-[1.02] tracking-[-0.03em]">
            {workPageCopy.hero.lines[0]}
            <br />
            {workPageCopy.hero.lines[1]}
          </h1>
          <p className="mt-6 max-w-xl text-[15px] opacity-70">{workPageCopy.hero.sub}</p>
        </div>
      </Panel>

      <div style={{ backgroundColor: "var(--bone-panel)", color: "var(--ink)" }} className="pb-16">
        <div className="v3-container max-w-3xl border-t pt-8 text-sm opacity-70" style={{ borderColor: "rgba(6,10,8,.12)" }}>
          {workPageCopy.honesty}
        </div>
      </div>

      <Panel variant="bone" className="py-24 sm:py-32">
        <div className="v3-container">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {demos.map((demo, i) => (
              <Reveal key={demo.slug} delay={(i % 3) * 90}>
                <DemoCard demo={demo} />
              </Reveal>
            ))}
          </div>
        </div>
      </Panel>

      <section className="py-24 sm:py-32">
        <div className="v3-container flex flex-col gap-16">
          {demos.map((demo) => (
            <div key={demo.slug} className="v3-hairline-t grid gap-4 pt-10 lg:grid-cols-[220px_1fr] lg:gap-12">
              <div>
                <p className="text-xs uppercase tracking-[0.1em] opacity-50">{demo.trade}</p>
                <p className="v3-display mt-1 text-xl">{demo.business}</p>
                <span
                  className="mt-2 inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]"
                  style={
                    demo.status === "Live"
                      ? { backgroundColor: "var(--emerald)", color: "var(--emerald-ink)" }
                      : { backgroundColor: "var(--raised)", color: "var(--bone)" }
                  }
                >
                  {demo.status}
                </span>
              </div>
              <div>
                <p className="max-w-2xl text-[15px] leading-[1.7] opacity-80">{demo.caseDetail}</p>
                {demo.demoHref && (
                  <a
                    href={demo.demoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="v3-display mt-4 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
                  >
                    Open the build →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Panel variant="ink" className="py-24 sm:py-32">
        <div className="v3-container">
          <h2 className="v3-display text-[clamp(1.5rem,3.5vw,2rem)]">{workPageCopy.buildForYou.heading}</h2>
          <div className="mt-8 max-w-xl">
            {workPageCopy.buildForYou.steps.map((step, i) => (
              <StepRow key={step} index={i} title={step} body="" />
            ))}
          </div>
        </div>
      </Panel>

      <ContactPanel />
    </>
  );
}
