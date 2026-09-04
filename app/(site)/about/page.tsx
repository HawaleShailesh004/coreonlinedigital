import { JsonLd } from "@/components/seo/JsonLd";
import { Panel } from "@/components/v3/Panel";
import { ReadingHighlight } from "@/components/v3/ReadingHighlight";
import { TeamGrid } from "@/components/v3/TeamCard";
import { ProcessSteps } from "@/components/v3/ProcessSteps";
import { ContactPanel } from "@/components/v3/ContactPanel";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";
import { aboutPageCopy, homeCopy, team } from "@/lib/site-content";

const TITLE = "About Coreline Digital - Thane";
const DESCRIPTION =
  "One person, no handoffs. Design, code, search and automation for Thane and Mumbai businesses, done by the same person who answers the phone.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ title: TITLE, description: DESCRIPTION, path: "/about", type: "AboutPage" })} />

      <section className="pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="v3-container">
          <h1 className="v3-display text-[clamp(1.85rem,5vw,3rem)] leading-[1.02] tracking-[-0.03em]">
            {aboutPageCopy.hero.lines[0]}
            <br />
            {aboutPageCopy.hero.lines[1]}
          </h1>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="v3-container max-w-2xl">
          {aboutPageCopy.origin.map((paragraph, i) => (
            <ReadingHighlight
              key={i}
              text={paragraph}
              className="mt-6 text-lg leading-[1.7] first:mt-0"
            />
          ))}
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="v3-container">
          <h2 className="v3-display text-[clamp(1.45rem,3.2vw,1.9rem)]">The team</h2>
          <div className="mt-10">
            <TeamGrid members={team} />
          </div>
        </div>
      </section>

      <Panel variant="forest" stack>
        <ProcessSteps heading={homeCopy.process.heading} steps={homeCopy.process.steps} />
      </Panel>

      <section className="py-24 sm:py-32">
        <div className="v3-container max-w-xl">
          <h2 className="v3-display text-[clamp(1.45rem,3.2vw,1.9rem)]">What we won&apos;t do</h2>
          <div className="mt-8 flex flex-col gap-1">
            {aboutPageCopy.wontDo.map((line) => (
              <p key={line} className="v3-hairline-t py-4 text-[15px] opacity-75">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <ContactPanel />
    </>
  );
}
