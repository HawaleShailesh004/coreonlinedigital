import type { Metadata } from "next";
import Image from "next/image";
import { InView } from "@/components/samples/InView";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
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
import { ca } from "@/lib/samples/ca";
import { caMedia } from "@/lib/samples/media";

/**
 * No display face is loaded on purpose. The brief is explicit that a CA site
 * with a "designed" typeface undermines the thing it is selling, so this page
 * runs entirely on the Inter the samples layout already provides.
 */

export const metadata: Metadata = {
  title: "Sample: CA / Professional Services",
  description:
    "Concept build for a Mumbai chartered accountancy practice - service-routed intake, compliance calendar and automatic deadline reminders.",
};

export default function CaSample() {
  return (
    <SampleFrame sample="ca">
      <span id="top" />
      <SampleNav
        brand={ca.business}
        brandNote={ca.brandNote}
        links={ca.nav.links}
        cta={ca.nav.cta}
      />

      <main id="main">
        {/* --- Hero --------------------------------------------------------- */}
        <section className="border-b border-[var(--s-hair)] bg-[var(--s-bg)] py-14 md:py-20">
          <SampleContainer>
            <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
              <div>
                <div
                  className="hero-step"
                  style={{ "--step-delay": "0ms" } as React.CSSProperties}
                >
                  <SampleEyebrow>{ca.hero.eyebrow}</SampleEyebrow>
                </div>

                <h1
                  className="hero-step mt-5 max-w-[36rem] text-[2rem] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[2.5rem]"
                  style={{ "--step-delay": "70ms" } as React.CSSProperties}
                >
                  {ca.hero.headline}
                </h1>

                <p
                  className="hero-step mt-6 max-w-xl leading-[1.7] text-[var(--s-grey)]"
                  style={{ "--step-delay": "140ms" } as React.CSSProperties}
                >
                  {ca.hero.sub}
                </p>

                <div
                  className="hero-step mt-8 flex flex-wrap items-center gap-3"
                  style={{ "--step-delay": "210ms" } as React.CSSProperties}
                >
                  <SampleButton href="#contact" size="md">
                    {ca.hero.primaryCta}
                  </SampleButton>
                  <SampleButton href="#services" size="md" variant="outline">
                    {ca.hero.secondaryCta}
                  </SampleButton>
                </div>

                {/* The only gold on the page: a credential mark. */}
                <p
                  className="hero-step mt-8 inline-flex items-center gap-2 border border-[var(--s-accent)]/45 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-accent)]"
                  style={{ "--step-delay": "280ms" } as React.CSSProperties}
                >
                  <Seal />
                  {ca.hero.credential}
                </p>
              </div>

              {/* Proving the product - organisation - beats decorating around it. */}
              <div
                className="hero-step self-start border border-[var(--s-hair)] bg-[var(--s-bg)]"
                style={{ "--step-delay": "180ms" } as React.CSSProperties}
              >
                <div className="border-b border-[var(--s-hair)] bg-[var(--s-surface)] px-5 py-4">
                  <h2 className="text-[0.8125rem] font-bold uppercase tracking-[0.12em]">
                    {ca.deadlines.title}
                  </h2>
                </div>

                <ul>
                  {ca.deadlines.items.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-baseline gap-4 border-b border-[var(--s-hair)] px-5 py-4 last:border-0"
                    >
                      <span className="w-16 shrink-0 text-sm font-bold text-[var(--s-primary)]">
                        {item.date}
                      </span>
                      <span className="flex-1 text-sm font-semibold">
                        {item.label}
                      </span>
                      <span className="text-right text-[0.8125rem] text-[var(--s-grey)]">
                        {item.who}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="border-t border-[var(--s-hair)] bg-[var(--s-surface)] px-5 py-4 text-xs leading-[1.6] text-[var(--s-grey)]">
                  {ca.deadlines.note}
                </p>
              </div>
            </div>

            <dl
              className="hero-step mt-12 grid grid-cols-2 gap-6 border-t border-[var(--s-hair)] pt-6 sm:grid-cols-4"
              style={{ "--step-delay": "340ms" } as React.CSSProperties}
            >
              {ca.hero.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--s-grey)]">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-xl font-bold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </SampleContainer>
        </section>

        {/* --- Services: a list, not a card grid ---------------------------- */}
        <SampleSection id="services" size="tight" className="scroll-mt-24">
          <Reveal>
            <SampleEyebrow>{ca.services.eyebrow}</SampleEyebrow>
            <h2 className="mt-4 max-w-2xl text-[1.625rem] font-bold leading-[1.25] tracking-[-0.015em] sm:text-[2rem]">
              {ca.services.heading}
            </h2>
            <p className="mt-4 max-w-2xl leading-[1.7] text-[var(--s-grey)]">
              {ca.services.sub}
            </p>
          </Reveal>

          <ul className="mt-10 border-t border-[var(--s-hair)]">
            {ca.services.items.map((service, index) => (
              <Reveal as="li" key={service.name} delay={index * 60}>
                <div className="grid gap-5 border-b border-[var(--s-hair)] py-8 md:grid-cols-[1fr_1.5fr] md:gap-10">
                  <div className="flex gap-4">
                    <span
                      className="pt-1 text-[0.75rem] font-semibold tracking-[0.1em] text-[var(--s-grey)]"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[1.125rem] font-bold leading-snug">
                        {service.name}
                      </h3>
                      <p className="mt-2 text-[0.8125rem] font-semibold text-[var(--s-primary)]">
                        {service.fee}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="leading-[1.7] text-[var(--s-grey)]">
                      {service.body}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-[0.9375rem] leading-[1.6]"
                        >
                          <span
                            className="mt-[0.6em] h-px w-3 shrink-0 bg-[var(--s-primary)]"
                            aria-hidden="true"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </SampleSection>

        {/* --- Why us: the page's one animation ----------------------------- */}
        <SampleSection tone="surface" size="tight">
          <Reveal>
            <SampleEyebrow>{ca.why.eyebrow}</SampleEyebrow>
            <h2 className="mt-4 text-[1.625rem] font-bold leading-[1.25] tracking-[-0.015em] sm:text-[2rem]">
              {ca.why.heading}
            </h2>
          </Reveal>

          <ul className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {ca.why.points.map((point, index) => (
              <Reveal as="li" key={point.title} delay={index * 80}>
                <InView
                  className="s-check flex size-8 items-center justify-center border border-[var(--s-hair)] bg-[var(--s-bg)]"
                  delay={index * 260}
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="size-4 text-[var(--s-primary)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    aria-hidden="true"
                  >
                    <path d="M3 8.5 6.2 11.7 13 5" />
                  </svg>
                </InView>

                <h3 className="mt-4 text-[1.0625rem] font-bold leading-snug">
                  {point.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                  {point.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </SampleSection>

        {/* --- Compliance calendar ------------------------------------------ */}
        <SampleSection id="calendar" size="tight" className="scroll-mt-24">
          <Reveal>
            <SampleEyebrow>{ca.calendar.eyebrow}</SampleEyebrow>
            <h2 className="mt-4 text-[1.625rem] font-bold leading-[1.25] tracking-[-0.015em] sm:text-[2rem]">
              {ca.calendar.heading}
            </h2>
            <p className="mt-4 max-w-2xl leading-[1.7] text-[var(--s-grey)]">
              {ca.calendar.sub}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-9 overflow-x-auto border border-[var(--s-hair)]">
              <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Statutory compliance calendar for FY 2025-26
                </caption>
                <thead>
                  <tr className="bg-[var(--s-surface)]">
                    <th
                      scope="col"
                      className="border-b border-[var(--s-hair)] px-4 py-3.5 text-[0.6875rem] font-bold uppercase tracking-[0.12em]"
                    >
                      Due
                    </th>
                    <th
                      scope="col"
                      className="border-b border-[var(--s-hair)] px-4 py-3.5 text-[0.6875rem] font-bold uppercase tracking-[0.12em]"
                    >
                      Filing
                    </th>
                    <th
                      scope="col"
                      className="border-b border-[var(--s-hair)] px-4 py-3.5 text-[0.6875rem] font-bold uppercase tracking-[0.12em]"
                    >
                      What it covers
                    </th>
                    <th
                      scope="col"
                      className="border-b border-[var(--s-hair)] px-4 py-3.5 text-[0.6875rem] font-bold uppercase tracking-[0.12em]"
                    >
                      Applies to
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ca.calendar.rows.map((row) => (
                    <tr
                      key={`${row.item}-${row.due}`}
                      className="border-b border-[var(--s-hair)] last:border-0"
                    >
                      <td className="whitespace-nowrap px-4 py-3.5 font-semibold text-[var(--s-primary)]">
                        {row.due}
                      </td>
                      <th
                        scope="row"
                        className="px-4 py-3.5 text-left font-semibold"
                      >
                        {row.item}
                      </th>
                      <td className="px-4 py-3.5 text-[var(--s-grey)]">
                        {row.detail}
                      </td>
                      <td className="px-4 py-3.5 text-[var(--s-grey)]">
                        {row.who}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </SampleSection>

        {/* --- About the partner -------------------------------------------- */}
        <SampleSection
          id="about"
          tone="surface"
          size="tight"
          className="scroll-mt-24"
        >
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:gap-16">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden border border-[var(--s-hair)]">
                <Image
                  src={caMedia.partner.src}
                  alt={caMedia.partner.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={80}>
              <SampleEyebrow>{ca.about.eyebrow}</SampleEyebrow>
              <h2 className="mt-4 text-[1.625rem] font-bold leading-[1.25] tracking-[-0.015em] sm:text-[2rem]">
                {ca.about.heading}
              </h2>
              <p className="mt-3 text-sm font-semibold text-[var(--s-primary)]">
                {ca.about.credentials}
              </p>

              {ca.about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-5 max-w-2xl leading-[1.7] text-[var(--s-grey)]"
                >
                  {paragraph}
                </p>
              ))}

              <h3 className="mt-9 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[var(--s-grey)]">
                Memberships
              </h3>
              <ul className="mt-4 border-t border-[var(--s-hair)]">
                {ca.about.memberships.map((item) => (
                  <li
                    key={item}
                    className="border-b border-[var(--s-hair)] py-3 text-[0.9375rem]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </SampleSection>

        {/* --- Contact ------------------------------------------------------ */}
        <SampleSection id="contact" size="tight" className="scroll-mt-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SampleEyebrow>{ca.contact.eyebrow}</SampleEyebrow>
              <h2 className="mt-4 text-[1.625rem] font-bold leading-[1.25] tracking-[-0.015em] sm:text-[2rem]">
                {ca.contact.heading}
              </h2>
              <p className="mt-4 max-w-md leading-[1.7] text-[var(--s-grey)]">
                {ca.contact.sub}
              </p>

              <div className="mt-8 border border-[var(--s-hair)] p-6 sm:p-7">
                <div className="mb-6 grid gap-3 border-b border-[var(--s-hair)] pb-5 text-[0.75rem] uppercase tracking-[0.12em] text-[var(--s-grey)] sm:grid-cols-3">
                  <p>Service-routed intake</p>
                  <p>Same-day call back</p>
                  <p>Documents on WhatsApp</p>
                </div>
                <SampleLeadForm
                  submitLabel={ca.contact.submit}
                  successTitle={ca.contact.successTitle}
                  successBody={ca.contact.successBody}
                  note={ca.contact.note}
                  fields={[
                    {
                      kind: "text",
                      name: "name",
                      label: "Name",
                      placeholder: "Full name",
                      required: true,
                    },
                    {
                      kind: "tel",
                      name: "phone",
                      label: "Phone",
                      placeholder: "10-digit mobile",
                      required: true,
                    },
                    {
                      kind: "select",
                      name: "service",
                      label: "Service needed",
                      required: true,
                      full: true,
                      options: ca.contact.serviceOptions,
                    },
                    {
                      kind: "textarea",
                      name: "detail",
                      label: "Anything we should know",
                      placeholder:
                        "Assessment year, turnover, or the notice you have received",
                      rows: 3,
                      full: true,
                    },
                  ]}
                />
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="border border-[var(--s-hair)] p-6 sm:p-7">
              <SampleEyebrow>{ca.office.eyebrow}</SampleEyebrow>
              <h2 className="mt-4 text-[1.625rem] font-bold leading-[1.25] tracking-[-0.015em] sm:text-[2rem]">
                {ca.office.heading}
              </h2>

              <div className="relative mt-6 aspect-[16/9] overflow-hidden border border-[var(--s-hair)]">
                <Image
                  src={caMedia.office.src}
                  alt={caMedia.office.alt}
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="mt-7 grid gap-7 sm:grid-cols-[0.85fr_1fr]">
                <div>
                  <h3 className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[var(--s-grey)]">
                    Office
                  </h3>
                  <address className="mt-3 not-italic leading-[1.7] text-[var(--s-grey)]">
                    {ca.office.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <ul className="mt-3 space-y-1.5 text-[0.9375rem]">
                    <li>
                      <a
                        href={ca.office.phoneHref}
                        className="font-semibold text-[var(--s-primary)] underline-offset-4 hover:underline"
                      >
                        {ca.office.phoneLabel}
                      </a>
                    </li>
                    <li>
                      <a
                        href={ca.office.emailHref}
                        className="text-[var(--s-primary)] underline-offset-4 hover:underline"
                      >
                        {ca.office.emailLabel}
                      </a>
                    </li>
                    <li>
                      <a
                        href={ca.office.whatsappHref}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-[var(--s-primary)] underline-offset-4 hover:underline"
                      >
                        {ca.office.whatsappLabel}
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[var(--s-grey)]">
                    Office hours
                  </h3>
                  <table className="mt-3 w-full text-[0.9375rem]">
                    <tbody>
                      {ca.office.hours.map((row) => (
                        <tr
                          key={row.day}
                          className="border-b border-[var(--s-hair)] last:border-0"
                        >
                          <th
                            scope="row"
                            className="whitespace-nowrap py-2.5 text-left font-medium"
                          >
                            {row.day}
                          </th>
                          <td className="whitespace-nowrap py-2.5 text-right text-[var(--s-grey)]">
                            {row.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-4 text-[0.8125rem] leading-[1.6] text-[var(--s-grey)]">
                    {ca.office.parkingNote}
                  </p>
                </div>
              </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <SampleMap
              lat={ca.office.coords.lat}
              lon={ca.office.coords.lon}
              label="Deshmukh & Associates, Dadar East, Mumbai"
              className="mt-12 h-64"
            />
          </Reveal>
        </SampleSection>

        {/* --- Closing ------------------------------------------------------ */}
        <SampleSection tone="ink" size="tight">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="max-w-xl text-[1.5rem] font-bold leading-[1.25] tracking-[-0.015em] sm:text-[1.875rem]">
                {ca.bottomCta.heading}
              </h2>
              <p className="mt-3 max-w-xl leading-[1.7] text-[var(--s-bg)]/70">
                {ca.bottomCta.body}
              </p>
            </div>
            <SampleButton
              href="#contact"
              size="lg"
              className="shrink-0 self-start border border-[var(--s-bg)]/45 md:self-auto"
            >
              {ca.bottomCta.cta}
            </SampleButton>
          </div>
        </SampleSection>
      </main>

      <SampleFooter
        brand={ca.business}
        blurb={ca.footer.blurb}
        legal={ca.footer.legal}
        variant="compact"
        columns={[
          {
            title: "Practice",
            items: [
              { label: "Services", href: "#services" },
              { label: "Compliance calendar", href: "#calendar" },
              { label: "About the partner", href: "#about" },
            ],
          },
          {
            title: "Office",
            items: [
              { label: ca.office.address.join(", ") },
              { label: ca.office.phoneLabel, href: ca.office.phoneHref },
              { label: ca.office.emailLabel, href: ca.office.emailHref },
            ],
          },
        ]}
      />
    </SampleFrame>
  );
}

/** Credential seal outline. Decorative - the text beside it carries the meaning. */
function Seal() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="8" cy="6.5" r="4.5" />
      <path d="M5.5 10.5 4.5 15l3.5-2 3.5 2-1-4.5" />
    </svg>
  );
}
