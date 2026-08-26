import type { Metadata } from "next";
import Image from "next/image";
import { Fraunces } from "next/font/google";
import { InView } from "@/components/samples/InView";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleFooter } from "@/components/samples/SampleFooter";
import { SampleFrame } from "@/components/samples/SampleFrame";
import { SampleMap } from "@/components/samples/SampleMap";
import { SampleNav } from "@/components/samples/SampleNav";
import {
  SampleContainer,
  SampleSection,
} from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { jeweller } from "@/lib/samples/jeweller";
import { jewellerMedia } from "@/lib/samples/media";

/** High-contrast serif. Luxury is the one category where a serif earns its
 *  place - and it is used here for the hero and section headings only. */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sample: Jeweller",
  description:
    "Concept build for a Thane jewellery showroom - collections online, no prices, every enquiry routed to WhatsApp.",
};

/** Gold hairline gradients and photo scrims, built from palette variables so
 *  no colour is written into the markup. */
const heroScrim = {
  backgroundImage:
    "linear-gradient(to top, var(--s-bg) 4%, color-mix(in srgb, var(--s-bg) 55%, transparent) 48%, color-mix(in srgb, var(--s-bg) 30%, transparent) 100%)",
};

export default function JewellerSample() {
  return (
    <SampleFrame sample="jeweller" fontClass={fraunces.variable}>
      <span id="top" />
      <SampleNav
        brand={jeweller.business}
        brandNote={jeweller.brandNote}
        links={jeweller.nav.links}
        cta={jeweller.nav.cta}
        overlay
      />

      <main id="main">
        {/* --- Hero: photography first, text second ------------------------- */}
        <section className="relative isolate flex min-h-[620px] items-end pb-16 pt-32 md:min-h-[760px] md:pb-24">
          {/* Pulled above the section so the photo runs under the transparent
              nav bar without disturbing document flow. */}
          <div className="absolute inset-x-0 -top-28 bottom-0 z-0 overflow-hidden">
            <Image
              src={jewellerMedia.hero.src}
              alt={jewellerMedia.hero.alt}
              fill
              priority
              sizes="100vw"
              className="s-settle object-cover"
            />
            <div className="absolute inset-0" style={heroScrim} aria-hidden="true" />
          </div>

          <SampleContainer className="relative z-10">
            <div
              className="hero-step"
              style={{ "--step-delay": "120ms" } as React.CSSProperties}
            >
              <SampleEyebrow tone="accent" className="tracking-[0.3em]">
                {jeweller.hero.eyebrow}
              </SampleEyebrow>
            </div>

            <h1
              className="hero-step s-display mt-7 max-w-3xl text-[2.5rem] font-normal leading-[1.08] tracking-[-0.01em] sm:text-[3.5rem] lg:text-[4.25rem]"
              style={{ "--step-delay": "260ms" } as React.CSSProperties}
            >
              {jeweller.hero.headlineBefore}
              <em className="s-shimmer not-italic">
                {jeweller.hero.headlineAccent}
              </em>
              {jeweller.hero.headlineAfter}
            </h1>

            <p
              className="hero-step mt-8 max-w-xl text-[1.0625rem] font-light leading-[1.85] text-[var(--s-ink)]/75"
              style={{ "--step-delay": "440ms" } as React.CSSProperties}
            >
              {jeweller.hero.sub}
            </p>

            <div
              className="hero-step mt-10 flex flex-wrap gap-4"
              style={{ "--step-delay": "620ms" } as React.CSSProperties}
            >
              <SampleButton href="#collections" size="lg">
                {jeweller.hero.primaryCta}
              </SampleButton>
              <SampleButton
                href="#visit"
                size="lg"
                variant="outline"
                className="border-[var(--s-ink)]/35"
              >
                {jeweller.hero.secondaryCta}
              </SampleButton>
            </div>
          </SampleContainer>
        </section>

        {/* --- Collections -------------------------------------------------- */}
        <SampleSection
          id="collections"
          wide
          className="scroll-mt-24"
          size="default"
        >
          <Reveal>
            <SampleEyebrow tone="accent" className="tracking-[0.3em]">
              {jeweller.collections.eyebrow}
            </SampleEyebrow>
            <h2 className="s-display mt-5 max-w-xl text-[2rem] font-normal leading-[1.15] sm:text-[2.75rem]">
              {jeweller.collections.heading}
            </h2>
            <p className="mt-5 max-w-lg font-light leading-[1.85] text-[var(--s-grey)]">
              {jeweller.collections.sub}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {jeweller.collections.items.map((item, index) => (
              <InView
                as="article"
                key={item.name}
                className="s-settle s-zoom group"
                delay={index * 160}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--s-radius-lg)]">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover brightness-[0.92] group-hover:brightness-105"
                  />
                </div>

                <h3 className="mt-6 text-[0.8125rem] font-medium uppercase tracking-[0.2em] text-[var(--s-accent)]">
                  {item.name}
                </h3>
                <span
                  className="mt-3 block h-px w-10 bg-[var(--s-accent)] transition-[width] duration-500 group-hover:w-20"
                  aria-hidden="true"
                />
                <p className="mt-4 text-[0.9375rem] font-light leading-[1.75] text-[var(--s-grey)]">
                  {item.line}
                </p>
              </InView>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-16 flex flex-col items-start gap-6 border-t border-[var(--s-hair)] pt-10 md:flex-row md:items-center md:justify-between">
              <p className="max-w-xl text-[0.9375rem] font-light leading-[1.8] text-[var(--s-grey)]">
                {jeweller.collections.note}
              </p>
              <SampleButton
                href={jeweller.visit.whatsappHref}
                external
                size="md"
                className="shrink-0"
              >
                {jeweller.nav.cta.label}
              </SampleButton>
            </div>
          </Reveal>
        </SampleSection>

        {/* --- Craftsmanship: the one warm-ivory break in the page ---------- */}
        <SampleSection
          id="craftsmanship"
          tone="surface"
          className="scroll-mt-24 text-[var(--s-bg)]"
        >
          <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1fr] lg:gap-20">
            <Reveal>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--s-radius-lg)]">
                  <Image
                    src={jewellerMedia.craft.src}
                    alt={jewellerMedia.craft.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--s-bg)]/55">
                  {jeweller.craft.detailCaption}
                </p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <SampleEyebrow tone="inverse" className="tracking-[0.3em]">
                {jeweller.craft.eyebrow}
              </SampleEyebrow>
              <h2 className="s-display mt-5 max-w-xl text-[2rem] font-normal leading-[1.18] sm:text-[2.5rem]">
                {jeweller.craft.heading}
              </h2>

              {jeweller.craft.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-6 max-w-xl font-light leading-[1.9] text-[var(--s-bg)]/75"
                >
                  {paragraph}
                </p>
              ))}

              <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {jeweller.craft.marks.map((mark) => (
                  <div
                    key={mark.label}
                    className="border-t border-[var(--s-bg)]/15 pt-4"
                  >
                    <dt className="text-[0.8125rem] font-medium uppercase tracking-[0.18em]">
                      {mark.label}
                    </dt>
                    <dd className="mt-2 text-[0.9375rem] font-light leading-[1.7] text-[var(--s-bg)]/65">
                      {mark.note}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </SampleSection>

        {/* --- Custom design, routed to WhatsApp ---------------------------- */}
        <SampleSection id="custom" className="scroll-mt-24">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SampleEyebrow tone="accent" className="tracking-[0.3em]">
                {jeweller.custom.eyebrow}
              </SampleEyebrow>
              <h2 className="s-display mt-5 text-[2rem] font-normal leading-[1.18] sm:text-[2.75rem]">
                {jeweller.custom.heading}
              </h2>
              <p className="mt-6 max-w-lg font-light leading-[1.9] text-[var(--s-grey)]">
                {jeweller.custom.body}
              </p>

              <ol className="mt-10 space-y-5">
                {jeweller.custom.steps.map((step, index) => (
                  <li key={step} className="flex gap-5">
                    <span
                      className="w-6 shrink-0 pt-0.5 text-[0.75rem] tracking-[0.14em] text-[var(--s-accent)]"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.9375rem] font-light leading-[1.7]">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-11 flex flex-wrap items-center gap-5">
                <SampleButton
                  href={jeweller.visit.whatsappHref}
                  external
                  size="lg"
                >
                  {jeweller.custom.cta}
                </SampleButton>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--s-grey)]">
                  {jeweller.custom.ctaNote}
                </p>
              </div>
            </Reveal>

            <InView className="s-settle s-zoom" delay={120}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--s-radius-lg)]">
                <Image
                  src={jewellerMedia.solitaire.src}
                  alt={jewellerMedia.solitaire.alt}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
            </InView>
          </div>
        </SampleSection>

        {/* --- Visit us ----------------------------------------------------- */}
        <SampleSection id="visit" bordered className="scroll-mt-24">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <Reveal>
              <SampleEyebrow tone="accent" className="tracking-[0.3em]">
                {jeweller.visit.eyebrow}
              </SampleEyebrow>
              <h2 className="s-display mt-5 text-[2rem] font-normal leading-[1.18] sm:text-[2.5rem]">
                {jeweller.visit.heading}
              </h2>
              <p className="mt-5 max-w-md font-light leading-[1.85] text-[var(--s-grey)]">
                {jeweller.visit.sub}
              </p>

              <address className="mt-9 not-italic font-light leading-[1.9] text-[var(--s-grey)]">
                {jeweller.visit.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <div className="mt-7 flex flex-wrap gap-3">
                <SampleButton href={jeweller.visit.phoneHref} size="sm">
                  {jeweller.visit.phoneLabel}
                </SampleButton>
                <SampleButton
                  href={jeweller.visit.whatsappHref}
                  external
                  size="sm"
                  variant="outline"
                >
                  {jeweller.visit.whatsappLabel}
                </SampleButton>
              </div>

              <p className="mt-8 max-w-md text-[0.875rem] font-light leading-[1.8] text-[var(--s-grey)]">
                {jeweller.visit.appointmentNote}
              </p>
            </Reveal>

            <Reveal delay={140}>
              <table className="w-full text-sm">
                <caption className="mb-4 text-left text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-[var(--s-accent)]">
                  Showroom hours
                </caption>
                <tbody>
                  {jeweller.visit.hours.map((row) => (
                    <tr
                      key={row.day}
                      className="border-b border-[var(--s-hair)] last:border-0"
                    >
                      <th scope="row" className="py-3.5 text-left font-normal">
                        {row.day}
                      </th>
                      <td className="py-3.5 text-right font-light text-[var(--s-grey)]">
                        {row.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <SampleMap
                lat={jeweller.visit.coords.lat}
                lon={jeweller.visit.coords.lon}
                label="Vasant & Sons, Ram Maruti Road, Thane"
                dark
                className="mt-9 h-72"
              />
            </Reveal>
          </div>
        </SampleSection>

        {/* --- Closing ------------------------------------------------------ */}
        <section className="pb-24 pt-4">
          <SampleContainer>
            <Reveal>
              <div className="rounded-[var(--s-radius-lg)] border border-[var(--s-primary)]/35 px-6 py-16 text-center sm:px-14">
                <h2 className="s-display mx-auto max-w-2xl text-[1.875rem] font-normal leading-[1.2] sm:text-[2.5rem]">
                  {jeweller.bottomCta.heading}
                </h2>
                <p className="mx-auto mt-5 max-w-lg font-light leading-[1.85] text-[var(--s-grey)]">
                  {jeweller.bottomCta.body}
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <SampleButton href="#visit" size="lg">
                    {jeweller.bottomCta.primaryCta}
                  </SampleButton>
                  <SampleButton
                    href={jeweller.visit.whatsappHref}
                    external
                    size="lg"
                    variant="outline"
                    className="border-[var(--s-ink)]/35"
                  >
                    {jeweller.bottomCta.secondaryCta}
                  </SampleButton>
                </div>
              </div>
            </Reveal>
          </SampleContainer>
        </section>
      </main>

      <SampleFooter
        brand={jeweller.business}
        blurb={jeweller.footer.blurb}
        legal={jeweller.footer.legal}
        variant="centered"
        columns={[
          {
            title: "Showroom",
            items: [
              { label: "Collections", href: "#collections" },
              { label: "Craftsmanship", href: "#craftsmanship" },
              { label: "Custom design", href: "#custom" },
            ],
          },
          {
            title: "Visit",
            items: [
              { label: jeweller.visit.address.join(", ") },
              {
                label: jeweller.visit.phoneLabel,
                href: jeweller.visit.phoneHref,
              },
              {
                label: jeweller.visit.whatsappLabel,
                href: jeweller.visit.whatsappHref,
              },
            ],
          },
        ]}
      />
    </SampleFrame>
  );
}
