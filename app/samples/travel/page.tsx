import type { Metadata } from "next";
import Image from "next/image";
import { Archivo } from "next/font/google";
import { InView } from "@/components/samples/InView";
import { SampleBadge, SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleFooter } from "@/components/samples/SampleFooter";
import { SampleFrame } from "@/components/samples/SampleFrame";
import { SampleLeadForm } from "@/components/samples/SampleLeadForm";
import { SampleMap } from "@/components/samples/SampleMap";
import { SampleNav } from "@/components/samples/SampleNav";
import {
  SampleContainer,
  SampleSection,
} from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { travel } from "@/lib/samples/travel";
import { travelMedia } from "@/lib/samples/media";

/** Wide, confident sans - it has to hold its own on top of a full-bleed photo. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sample: Travel Agency",
  description:
    "Concept build for a Pune tour operator - package pricing, a four-step booking path and custom trip enquiries routed to WhatsApp.",
};

/** Height of SampleNav, so the hero can sit under the transparent overlay bar. */
const NAV_H = "74px";

export default function TravelSample() {
  return (
    <SampleFrame sample="travel" fontClass={archivo.variable}>
      <span id="top" />
      <SampleNav
        brand={travel.business}
        brandNote={travel.brandNote}
        links={travel.nav.links}
        cta={travel.nav.cta}
        overlay
      />

      <main id="main">
        {/* --- Hero ---------------------------------------------------------
            Full-bleed photography with the one intentional ambient loop in the
            portfolio. The negative top margin pulls the photo up behind the
            overlay nav, which is sticky rather than fixed. */}
        <section
          className="relative isolate flex min-h-[36rem] items-end overflow-hidden pb-14 pt-40 md:min-h-[44rem] md:pb-20"
          style={{ marginTop: `calc(-1 * ${NAV_H})` }}
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src={travelMedia.hero.src}
              alt={travelMedia.hero.alt}
              fill
              priority
              sizes="100vw"
              className="s-ken-burns object-cover"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/45 to-black/40"
          />

          <SampleContainer>
            <span
              className="hero-step inline-flex items-center gap-2 rounded-[var(--s-radius-pill)] border border-white/25 bg-black/25 px-3.5 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-white backdrop-blur"
              style={{ "--step-delay": "0ms" } as React.CSSProperties}
            >
              <span className="breathe size-1.5 rounded-full bg-[var(--s-accent)]" />
              {travel.hero.eyebrow}
            </span>

            <h1
              className="hero-step s-display mt-6 max-w-3xl text-[2.5rem] font-bold leading-[1.06] tracking-[-0.025em] text-white sm:text-[3.5rem] lg:text-[4rem]"
              style={{ "--step-delay": "80ms" } as React.CSSProperties}
            >
              {travel.hero.headline}
            </h1>

            <p
              className="hero-step mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-white/85"
              style={{ "--step-delay": "160ms" } as React.CSSProperties}
            >
              {travel.hero.sub}
            </p>

            <div
              className="hero-step mt-9 flex flex-wrap gap-3"
              style={{ "--step-delay": "240ms" } as React.CSSProperties}
            >
              <SampleButton href="#packages" variant="accent" size="lg">
                {travel.hero.primaryCta}
              </SampleButton>
              <SampleButton
                href="#contact"
                size="lg"
                className="border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20"
              >
                {travel.hero.secondaryCta}
              </SampleButton>
            </div>

            <ul
              className="hero-step mt-10 flex flex-wrap gap-x-7 gap-y-2 text-sm text-white/80"
              style={{ "--step-delay": "320ms" } as React.CSSProperties}
            >
              {travel.hero.trust.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Tick className="text-[var(--s-accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </SampleContainer>
        </section>

        {/* --- Featured packages -------------------------------------------- */}
        <SampleSection id="packages" wide>
          <Reveal>
            <SampleEyebrow>{travel.packages.eyebrow}</SampleEyebrow>
            <h2 className="s-display mt-4 max-w-2xl text-[1.875rem] font-bold tracking-[-0.02em] sm:text-[2.375rem]">
              {travel.packages.heading}
            </h2>
            <p className="mt-4 max-w-xl leading-[1.7] text-[var(--s-grey)]">
              {travel.packages.sub}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {travel.packages.items.map((pkg, index) => {
              const photo = travelMedia.packages[index];
              return (
                <Reveal
                  key={pkg.name}
                  delay={(index % 3) * 80}
                  className="lg:[&:nth-child(3n+2)]:mt-10"
                >
                  <article className="s-zoom group flex h-full flex-col overflow-hidden rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] transition-transform duration-300 hover:-translate-y-1">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw"
                        className="object-cover"
                      />
                      <InView
                        as="span"
                        className="s-pop absolute left-4 top-4 inline-flex rounded-[var(--s-radius-pill)] bg-black/45 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur"
                        delay={120}
                      >
                        {pkg.duration}
                      </InView>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="s-display text-[1.1875rem] font-bold leading-[1.25] tracking-[-0.01em]">
                        {pkg.name}
                      </h3>
                      <p className="mt-3 text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                        {pkg.blurb}
                      </p>

                      <ul className="mb-6 mt-5 flex flex-wrap gap-2">
                        {pkg.tags.map((tag, tagIndex) => (
                          <InView
                            as="li"
                            key={tag}
                            className="s-pop"
                            delay={160 + tagIndex * 70}
                          >
                            <SampleBadge tone="accent">{tag}</SampleBadge>
                          </InView>
                        ))}
                      </ul>

                      <div className="mt-auto flex items-end justify-between gap-4 border-t border-[var(--s-hair)] pt-5">
                        <p>
                          <span className="block text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[var(--s-grey)]">
                            {travel.packages.priceNote}
                          </span>
                          <span className="s-display mt-1 block text-[1.375rem] font-bold tracking-[-0.01em]">
                            {pkg.price}
                          </span>
                          <span className="text-xs text-[var(--s-grey)]">
                            per person
                          </span>
                        </p>
                        <span className="inline-flex items-center gap-1.5 pb-1 text-[0.8125rem] font-medium text-[var(--s-primary)]">
                          {travel.packages.ctaLabel}
                          <Arrow />
                        </span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </SampleSection>

        {/* --- How it works -------------------------------------------------
            The shared connector motif, styled in the Horizon palette. */}
        <SampleSection id="how" tone="surface">
          <Reveal>
            <SampleEyebrow>{travel.how.eyebrow}</SampleEyebrow>
            <h2 className="s-display mt-4 text-[1.75rem] font-bold tracking-[-0.02em] sm:text-[2.125rem]">
              {travel.how.heading}
            </h2>
            <p className="mt-4 text-[var(--s-grey)]">{travel.how.sub}</p>
          </Reveal>

          <div className="relative mt-14">
            <InView
              as="span"
              aria-hidden="true"
              className="s-connector absolute left-6 top-6 hidden h-px bg-[var(--s-primary)]/35 md:block md:w-[calc(100%-3rem)]"
            />

            <ol className="relative grid gap-10 md:grid-cols-4 md:gap-7">
              {travel.how.steps.map((step, index) => (
                <Reveal as="li" key={step.title} delay={index * 100}>
                  <span className="s-mono relative z-10 flex size-12 items-center justify-center rounded-full bg-[var(--s-primary)] text-sm font-semibold text-[var(--s-on-primary)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="s-display mt-5 text-[1.0625rem] font-bold">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                    {step.body}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </SampleSection>

        {/* --- Why book with us --------------------------------------------- */}
        <SampleSection id="why" size="tight">
          <Reveal>
            <SampleEyebrow>{travel.why.eyebrow}</SampleEyebrow>
            <h2 className="s-display mt-4 max-w-2xl text-[1.625rem] font-bold tracking-[-0.02em] sm:text-[2rem]">
              {travel.why.heading}
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
            {travel.why.points.map((point, index) => (
              <Reveal as="li" key={point.title} delay={index * 90}>
                <div className="flex size-10 items-center justify-center rounded-full bg-[var(--s-primary)]/10">
                  <Tick className="text-[var(--s-primary)]" />
                </div>
                <h3 className="s-display mt-4 text-[1.0625rem] font-bold">
                  {point.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                  {point.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </SampleSection>

        {/* --- Custom trip CTA ---------------------------------------------- */}
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image
              src={travelMedia.planner.src}
              alt={travelMedia.planner.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/60 to-black/35"
          />

          <SampleContainer className="py-24 md:py-32">
            <Reveal>
              <div className="max-w-xl">
                <SampleEyebrow tone="accent">
                  {travel.planner.eyebrow}
                </SampleEyebrow>
                <h2 className="s-display mt-4 text-[1.875rem] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-[2.5rem]">
                  {travel.planner.heading}
                </h2>
                <p className="mt-5 leading-[1.75] text-white/85">
                  {travel.planner.body}
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-5">
                  <SampleButton href="#contact" variant="accent" size="lg">
                    {travel.planner.cta}
                  </SampleButton>
                  <p className="max-w-[15rem] text-[0.8125rem] leading-[1.6] text-white/70">
                    {travel.planner.note}
                  </p>
                </div>
              </div>
            </Reveal>
          </SampleContainer>
        </section>

        {/* --- Contact ------------------------------------------------------ */}
        <SampleSection id="contact">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <Reveal>
              <SampleEyebrow>{travel.contact.eyebrow}</SampleEyebrow>
              <h2 className="s-display mt-4 text-[1.875rem] font-bold tracking-[-0.02em]">
                {travel.contact.heading}
              </h2>
              <p className="mt-3 max-w-md leading-[1.7] text-[var(--s-grey)]">
                {travel.contact.sub}
              </p>

              <div className="mt-8">
                <SampleLeadForm
                  submitLabel={travel.contact.submit}
                  successTitle={travel.contact.successTitle}
                  successBody={travel.contact.successBody}
                  note={travel.contact.note}
                  variant="accent"
                  fields={[
                    {
                      kind: "text",
                      name: "name",
                      label: "Your name",
                      placeholder: "Full name",
                      required: true,
                    },
                    {
                      kind: "tel",
                      name: "phone",
                      label: "WhatsApp number",
                      placeholder: "10-digit mobile",
                      required: true,
                    },
                    {
                      kind: "select",
                      name: "destination",
                      label: "Destination interest",
                      required: true,
                      full: true,
                      options: travel.contact.destinations,
                    },
                    {
                      kind: "text",
                      name: "dates",
                      label: "Approximate dates",
                      placeholder: "e.g. mid-October, 5 nights",
                      full: true,
                    },
                  ]}
                />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-surface)] p-7 sm:p-8">
                <SampleEyebrow tone="grey">
                  {travel.contact.reachEyebrow}
                </SampleEyebrow>
                <h3 className="s-display mt-3 text-[1.375rem] font-bold tracking-[-0.01em]">
                  {travel.contact.reachHeading}
                </h3>

                <div className="mt-6 space-y-4">
                  <div>
                    <SampleButton
                      href={travel.contact.whatsappHref}
                      external
                      variant="accent"
                    >
                      {travel.contact.whatsappLabel}
                    </SampleButton>
                    <p className="mt-2 text-[0.8125rem] text-[var(--s-grey)]">
                      {travel.contact.whatsappNote}
                    </p>
                  </div>

                  <div className="border-t border-[var(--s-hair)] pt-4">
                    <a
                      href={travel.contact.phoneHref}
                      className="s-display text-[1.0625rem] font-bold text-[var(--s-primary)] underline-offset-4 hover:underline"
                    >
                      {travel.contact.phoneLabel}
                    </a>
                    <p className="mt-1 text-[0.8125rem] text-[var(--s-grey)]">
                      {travel.contact.phoneNote}
                    </p>
                  </div>

                  <address className="block border-t border-[var(--s-hair)] pt-4 text-[0.9375rem] not-italic leading-[1.8] text-[var(--s-grey)]">
                    {travel.contact.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>

                <SampleMap
                  lat={travel.contact.coords.lat}
                  lon={travel.contact.coords.lon}
                  label={travel.contact.mapLabel}
                  className="mt-6 h-56"
                />
              </div>
            </Reveal>
          </div>
        </SampleSection>

        {/* --- Closing CTA -------------------------------------------------- */}
        <section className="bg-[var(--s-bg)] pb-24">
          <SampleContainer>
            <Reveal>
              <div className="rounded-[var(--s-radius-lg)] bg-[var(--s-primary)] px-6 py-14 text-center sm:px-12">
                <h2 className="s-display mx-auto max-w-2xl text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-[2.25rem]">
                  {travel.bottomCta.heading}
                </h2>
                <p className="mx-auto mt-4 max-w-md text-white/80">
                  {travel.bottomCta.body}
                </p>
                <div className="mt-8 flex justify-center">
                  <SampleButton href="#contact" variant="accent" size="lg">
                    {travel.bottomCta.cta}
                  </SampleButton>
                </div>
              </div>
            </Reveal>
          </SampleContainer>
        </section>
      </main>

      <SampleFooter
        brand={travel.business}
        blurb={travel.footer.blurb}
        legal={travel.footer.legal}
        variant="centered"
        columns={[
          {
            title: "Trips",
            items: [
              { label: "Featured packages", href: "#packages" },
              { label: "How it works", href: "#how" },
              { label: "Custom trips", href: "#contact" },
            ],
          },
          {
            title: "Contact",
            items: [
              { label: travel.contact.address.join(", ") },
              {
                label: travel.contact.phoneLabel,
                href: travel.contact.phoneHref,
              },
              {
                label: travel.contact.whatsappLabel,
                href: travel.contact.whatsappHref,
              },
            ],
          },
        ]}
      />
    </SampleFrame>
  );
}

function Tick({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`size-4 shrink-0 ${className ?? ""}`}
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

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 8h11M9.5 4l4 4-4 4" />
    </svg>
  );
}
