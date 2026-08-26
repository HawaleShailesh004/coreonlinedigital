import type { Metadata } from "next";
import Image from "next/image";
import {
  AutomationFlowDiagram,
  FeaturedGrid,
} from "@/components/samples/TraderStore";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { trader } from "@/lib/samples/trader";
import { traderMedia } from "@/lib/samples/media";

export const metadata: Metadata = {
  title: "Sample: Online Home Goods Store",
  description:
    "Concept build for a small D2C brand - working cart and checkout, WhatsApp order automation, and a live AI assistant answering stock, shipping and returns.",
};

const heading =
  "s-display text-[1.875rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.25rem]";

const BASE = "/samples/trader";

export default function TraderHomePage() {
  return (
    <main id="main">
      <section className="border-b border-[var(--s-hair)]">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <span
              className="hero-step inline-block bg-[var(--s-surface)] px-3 py-1.5 text-[0.75rem] font-medium text-[var(--s-ink)]"
              style={{ "--step-delay": "0ms" } as React.CSSProperties}
            >
              {trader.hero.eyebrow}
            </span>

            <h1
              className="hero-step s-display mt-6 max-w-lg text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[3rem]"
              style={{ "--step-delay": "80ms" } as React.CSSProperties}
            >
              {trader.hero.headline}
            </h1>

            <p
              className="hero-step mt-5 max-w-lg leading-[1.7] text-[var(--s-grey)]"
              style={{ "--step-delay": "160ms" } as React.CSSProperties}
            >
              {trader.hero.sub}
            </p>

            <div
              className="hero-step mt-8 flex flex-wrap gap-3"
              style={{ "--step-delay": "240ms" } as React.CSSProperties}
            >
              <SampleButton href={`${BASE}/shop`}>
                {trader.hero.primaryCta}
              </SampleButton>
              <SampleButton data-open-chat variant="outline">
                {trader.hero.chatCta}
              </SampleButton>
            </div>

            <ul
              className="hero-step mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-[var(--s-grey)]"
              style={{ "--step-delay": "320ms" } as React.CSSProperties}
            >
              {["Tracked delivery", "7-day returns", "COD available"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <Tick />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div
            className="hero-step relative aspect-[4/3] overflow-hidden bg-[var(--s-surface)]"
            style={{ "--step-delay": "200ms" } as React.CSSProperties}
          >
            <Image
              src={traderMedia.hero.src}
              alt={traderMedia.hero.alt}
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <SampleSection size="tight">
        <Reveal>
          <SampleEyebrow>{trader.shop.eyebrow}</SampleEyebrow>
          <h2 className={`${heading} mt-3 max-w-xl`}>
            {trader.shop.homeHeading}
          </h2>
          <p className="mt-3 max-w-lg text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
            {trader.shop.homeSub}
          </p>
        </Reveal>
        <FeaturedGrid limit={4} />
        <div className="mt-10">
          <SampleButton href={`${BASE}/shop`} variant="outline">
            Browse full collection
          </SampleButton>
        </div>
      </SampleSection>

      <SampleSection tone="surface" size="tight">
        <Reveal>
          <SampleEyebrow>{trader.why.eyebrow}</SampleEyebrow>
          <h2 className={`${heading} mt-3`}>{trader.why.heading}</h2>
        </Reveal>

        <ul className="mt-9 grid gap-8 md:grid-cols-3">
          {trader.why.points.map((point, index) => (
            <Reveal as="li" key={point.title} delay={index * 80}>
              <div className="flex size-9 items-center justify-center bg-[var(--s-primary)]/12">
                <Tick />
              </div>
              <h3 className="s-display mt-4 text-[1rem] font-semibold">
                {point.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                {point.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </SampleSection>

      <SampleSection id="flow" className="scroll-mt-20">
        <Reveal>
          <SampleEyebrow>{trader.flow.eyebrow}</SampleEyebrow>
          <h2 className={`${heading} mt-3 max-w-2xl`}>{trader.flow.heading}</h2>
          <p className="mt-4 max-w-xl leading-[1.7] text-[var(--s-grey)]">
            {trader.flow.sub}
          </p>
        </Reveal>
        <AutomationFlowDiagram />
      </SampleSection>

      <SampleSection size="tight" bordered>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <Reveal>
            <SampleEyebrow>{trader.about.eyebrow}</SampleEyebrow>
            <h2 className={`${heading} mt-3`}>{trader.about.heading}</h2>
            <p className="mt-5 max-w-xl leading-[1.75] text-[var(--s-grey)]">
              {trader.about.paragraphs[0]}
            </p>
            <SampleButton
              href={`${BASE}/about`}
              variant="outline"
              size="sm"
              className="mt-7"
            >
              {trader.about.teaserCta}
            </SampleButton>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--s-surface)]">
              <Image
                src={traderMedia.lifestyle.src}
                alt={traderMedia.lifestyle.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </SampleSection>

      <SampleSection size="tight">
        <Reveal>
          <div className="bg-[var(--s-ink)] px-6 py-14 text-center sm:px-12">
            <h2 className="s-display mx-auto max-w-xl text-[1.625rem] font-semibold leading-[1.25] text-[var(--s-bg)] sm:text-[2rem]">
              {trader.bottomCta.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[var(--s-bg)]/70">
              {trader.bottomCta.body}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <SampleButton
                href={trader.help.whatsappHref}
                external
                variant="accent"
              >
                {trader.bottomCta.cta}
              </SampleButton>
              <SampleButton href={`${BASE}/shop`} variant="solid">
                {trader.hero.primaryCta}
              </SampleButton>
            </div>
          </div>
        </Reveal>
      </SampleSection>
    </main>
  );
}

function Tick() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4 shrink-0 text-[var(--s-primary)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8.5 6.2 11.7 13 5" />
    </svg>
  );
}
