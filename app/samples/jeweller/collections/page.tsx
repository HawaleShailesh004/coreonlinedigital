import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InView } from "@/components/samples/InView";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { jeweller } from "@/lib/samples/jeweller";

export const metadata: Metadata = {
  title: "Collections · Vasant & Sons",
  description:
    "Bridal, traditional gold, diamond and custom design - editorial collections with no prices online.",
};

export default function JewellerCollectionsPage() {
  return (
    <main id="main">
      <SampleSection size="tight">
        <Reveal>
          <SampleEyebrow tone="accent" className="tracking-[0.3em]">
            {jeweller.collections.eyebrow}
          </SampleEyebrow>
          <h1 className="s-display mt-5 max-w-2xl text-[2.25rem] font-normal leading-[1.12] sm:text-[3rem]">
            {jeweller.collections.pageHeading}
          </h1>
          <p className="mt-5 max-w-xl font-light leading-[1.85] text-[var(--s-grey)]">
            {jeweller.collections.pageSub}
          </p>
        </Reveal>
      </SampleSection>

      {jeweller.collections.items.map((item, index) => {
        const reverse = index % 2 === 1;
        const isCustom = Boolean(item.href);

        return (
          <SampleSection
            key={item.slug}
            id={item.slug}
            bordered
            size="default"
            className="scroll-mt-24"
          >
            <InView className="s-settle" delay={40} threshold={0.15}>
              <div
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="s-zoom relative aspect-[4/5] overflow-hidden rounded-[var(--s-radius-lg)] sm:aspect-[3/4]">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <Reveal delay={180}>
                  <p className="text-[0.8125rem] font-medium uppercase tracking-[0.2em] text-[var(--s-accent)]">
                    {item.name}
                  </p>
                  <span
                    className="mt-4 block h-px w-12 bg-[var(--s-accent)]"
                    aria-hidden="true"
                  />
                  <p className="mt-6 max-w-md text-[1.125rem] font-light leading-[1.75] text-[var(--s-ink)]">
                    {item.line}
                  </p>
                  <p className="mt-5 max-w-md font-light leading-[1.9] text-[var(--s-grey)]">
                    {item.body}
                  </p>

                  <div className="mt-10 flex flex-wrap gap-4">
                    {isCustom ? (
                      <SampleButton href={item.href!} size="lg">
                        Start a custom order
                      </SampleButton>
                    ) : (
                      <SampleButton
                        href={jeweller.visit.whatsappHref}
                        external
                        size="lg"
                      >
                        {jeweller.collections.enquireCta}
                      </SampleButton>
                    )}
                    {!isCustom && (
                      <SampleButton
                        href="/samples/jeweller/contact"
                        size="lg"
                        variant="outline"
                        className="border-[var(--s-ink)]/35"
                      >
                        Book a visit
                      </SampleButton>
                    )}
                  </div>
                </Reveal>
              </div>
            </InView>
          </SampleSection>
        );
      })}

      <SampleSection size="tight">
        <Reveal>
          <div className="flex flex-col items-start gap-6 border-t border-[var(--s-hair)] pt-10 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl text-[0.9375rem] font-light leading-[1.8] text-[var(--s-grey)]">
              {jeweller.collections.note}
            </p>
            <div className="flex flex-wrap gap-3">
              <SampleButton
                href={jeweller.visit.whatsappHref}
                external
                size="md"
              >
                {jeweller.collections.enquireCta}
              </SampleButton>
              <SampleButton href="/samples/jeweller/custom" size="md" variant="outline">
                Custom design
              </SampleButton>
            </div>
          </div>
        </Reveal>
        <p className="mt-10 text-sm font-light text-[var(--s-grey)]">
          Looking for craftsmanship detail?{" "}
          <Link
            href="/samples/jeweller/craftsmanship"
            className="text-[var(--s-accent)] underline-offset-4 hover:underline"
          >
            Read our story
          </Link>
          .
        </p>
      </SampleSection>
    </main>
  );
}
