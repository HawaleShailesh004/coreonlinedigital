import type { Metadata } from "next";
import Image from "next/image";
import { InView } from "@/components/samples/InView";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { jeweller } from "@/lib/samples/jeweller";

export const metadata: Metadata = {
  title: "Craftsmanship · Vasant & Sons",
  description:
    "Three generations on Ram Maruti Road - in-house workshop, hallmarked gold, certified stones.",
};

export default function JewellerCraftsmanshipPage() {
  return (
    <main id="main">
      <SampleSection size="tight">
        <Reveal>
          <SampleEyebrow tone="accent" className="tracking-[0.3em]">
            {jeweller.craft.eyebrow}
          </SampleEyebrow>
          <h1 className="s-display mt-5 max-w-3xl text-[2.25rem] font-normal leading-[1.12] sm:text-[3rem]">
            {jeweller.craft.heading}
          </h1>
          <p className="mt-6 max-w-xl font-light leading-[1.9] text-[var(--s-grey)]">
            {jeweller.craft.paragraphs[0]}
          </p>
        </Reveal>

        <dl className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {jeweller.craft.marks.map((mark, index) => (
            <Reveal key={mark.label} delay={index * 80}>
              <div className="border-t border-[var(--s-hair)] pt-4">
                <dt className="text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-[var(--s-accent)]">
                  {mark.label}
                </dt>
                <dd className="mt-2 text-[0.9375rem] font-light leading-[1.7] text-[var(--s-grey)]">
                  {mark.note}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </SampleSection>

      {jeweller.craft.stories.map((story, index) => {
        const reverse = index % 2 === 1;

        return (
          <SampleSection
            key={story.title}
            bordered={index === 0}
            size="default"
            className={index > 0 ? "border-t border-[var(--s-hair)]" : undefined}
          >
            <div
              className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <InView className="s-settle s-zoom" threshold={0.2}>
                <div className="relative">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--s-radius-lg)]">
                    <Image
                      src={story.image.src}
                      alt={story.image.alt}
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  {story.caption && (
                    <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--s-grey)]">
                      {story.caption}
                    </p>
                  )}
                </div>
              </InView>

              <Reveal delay={180}>
                <h2 className="s-display max-w-md text-[1.75rem] font-normal leading-[1.2] sm:text-[2.25rem]">
                  {story.title}
                </h2>
                <p className="mt-6 max-w-md font-light leading-[1.9] text-[var(--s-grey)]">
                  {story.body}
                </p>
              </Reveal>
            </div>
          </SampleSection>
        );
      })}

      <SampleSection size="tight" bordered>
        <Reveal>
          <div className="rounded-[var(--s-radius-lg)] border border-[var(--s-primary)]/35 px-6 py-14 text-center sm:px-12">
            <h2 className="s-display mx-auto max-w-xl text-[1.75rem] font-normal leading-[1.2] sm:text-[2.25rem]">
              See the work in person.
            </h2>
            <p className="mx-auto mt-5 max-w-md font-light leading-[1.85] text-[var(--s-grey)]">
              The workshop is one floor up. The best pieces still look different
              under showroom light than they do on a screen.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <SampleButton href="/samples/jeweller/contact" size="lg">
                Book a visit
              </SampleButton>
              <SampleButton
                href={jeweller.visit.whatsappHref}
                external
                size="lg"
                variant="outline"
                className="border-[var(--s-ink)]/35"
              >
                {jeweller.visit.whatsappLabel}
              </SampleButton>
            </div>
          </div>
        </Reveal>
      </SampleSection>
    </main>
  );
}
