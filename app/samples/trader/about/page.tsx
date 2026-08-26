import type { Metadata } from "next";
import Image from "next/image";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { trader } from "@/lib/samples/trader";
import { traderMedia } from "@/lib/samples/media";

export const metadata: Metadata = {
  title: "About · Nilaya Home",
  description:
    "How Nilaya Home started - four Indian workshops, clear prices, shipped from Thane.",
};

const heading =
  "s-display text-[1.875rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.25rem]";

const BASE = "/samples/trader";

export default function TraderAboutPage() {
  return (
    <main id="main">
      <SampleSection size="tight">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal>
            <SampleEyebrow>{trader.about.eyebrow}</SampleEyebrow>
            <h1 className={`${heading} mt-3`}>{trader.about.heading}</h1>

            {trader.about.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-5 max-w-xl leading-[1.75] text-[var(--s-grey)]"
              >
                {paragraph}
              </p>
            ))}

            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-5">
              {trader.about.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="s-display text-[1.5rem] font-semibold tabular-nums">
                    {stat.value}
                  </dt>
                  <dd className="mt-0.5 text-[0.75rem] uppercase tracking-[0.12em] text-[var(--s-grey)]">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>

            <SampleButton href={`${BASE}/shop`} className="mt-10">
              {trader.hero.primaryCta}
            </SampleButton>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--s-surface)] lg:aspect-[4/3]">
                <Image
                  src={traderMedia.founder.src}
                  alt={traderMedia.founder.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 47vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--s-surface)] lg:aspect-[16/9]">
                <Image
                  src={traderMedia.lifestyle.src}
                  alt={traderMedia.lifestyle.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 47vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </SampleSection>
    </main>
  );
}
