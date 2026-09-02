import type { Metadata } from "next";
import Image from "next/image";
import { Manrope } from "next/font/google";
import { InView } from "@/components/samples/InView";
import { SampleBadge, SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleFooter } from "@/components/samples/SampleFooter";
import { SampleFrame } from "@/components/samples/SampleFrame";
import { SampleLeadForm } from "@/components/samples/SampleLeadForm";
import { SampleMap } from "@/components/samples/SampleMap";
import { SampleNav } from "@/components/samples/SampleNav";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { school } from "@/lib/samples/school";
import { schoolMedia } from "@/lib/samples/media";

/** Friendly but structured. A parent should read "organised", never "childish". */
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brightfield Academy",
  description:
    "Concept build for a Thane CBSE school - academics by stage, a campus walk-through and a four-step admissions process with visit booking.",
};

export default function SchoolSample() {
  return (
    <SampleFrame sample="school" fontClass={manrope.variable}>
      <span id="top" />
      <SampleNav
        brand={school.business}
        brandNote={school.brandNote}
        links={school.nav.links}
        cta={school.nav.cta}
      />

      <main id="main">
        {/* --- Hero ---------------------------------------------------------- */}
        <section className="overflow-hidden bg-[var(--s-bg)] pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div>
              <SampleBadge tone="accent" className="hero-step">
                {school.hero.eyebrow}
              </SampleBadge>

              <h1
                className="hero-step s-display mt-6 text-[2.5rem] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[3.25rem]"
                style={{ "--step-delay": "80ms" } as React.CSSProperties}
              >
                {school.hero.headline}
              </h1>

              <p
                className="hero-step mt-6 max-w-xl text-[1.0625rem] leading-[1.8] text-[var(--s-grey)]"
                style={{ "--step-delay": "160ms" } as React.CSSProperties}
              >
                {school.hero.sub}
              </p>

              <div
                className="hero-step mt-9 flex flex-wrap gap-3"
                style={{ "--step-delay": "240ms" } as React.CSSProperties}
              >
                <SampleButton href="#visit" size="lg">
                  {school.hero.primaryCta}
                </SampleButton>
                <SampleButton href="#admissions" size="lg" variant="outline">
                  {school.hero.secondaryCta}
                </SampleButton>
              </div>

              <ul
                className="hero-step mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--s-grey)]"
                style={{ "--step-delay": "320ms" } as React.CSSProperties}
              >
                {school.hero.reassurance.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Tick />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="hero-step relative"
              style={{ "--step-delay": "200ms" } as React.CSSProperties}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--s-radius-lg)]">
                <Image
                  src={schoolMedia.hero.src}
                  alt={schoolMedia.hero.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Class size is the first question at every enquiry, so it sits
                  on the hero rather than three sections down. */}
              <div className="mt-4 rounded-[var(--s-radius)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-5 sm:absolute sm:-bottom-10 sm:-left-6 sm:mt-0 sm:w-64">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-grey)]">
                  {school.hero.card.label}
                </p>
                <p className="s-display mt-2 text-2xl font-bold text-[var(--s-primary)]">
                  {school.hero.card.value}
                </p>
                <p className="mt-1 text-[0.8125rem] leading-[1.6] text-[var(--s-grey)]">
                  {school.hero.card.note}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Academics ------------------------------------------------------ */}
        <SampleSection id="academics" tone="surface">
          <Reveal>
            <SampleEyebrow>{school.academics.eyebrow}</SampleEyebrow>
            <h2 className="s-display mt-4 max-w-2xl text-[1.875rem] font-bold tracking-[-0.015em] sm:text-[2.25rem]">
              {school.academics.heading}
            </h2>
            <p className="mt-4 max-w-2xl leading-[1.8] text-[var(--s-grey)]">
              {school.academics.sub}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {school.academics.items.map((item, index) => (
              <Reveal
                as="article"
                key={item.name}
                delay={index * 80}
                className="flex h-full flex-col rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-7"
              >
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-accent)]">
                  {item.stage}
                </p>
                <h3 className="s-display mt-2 text-[1.25rem] font-bold">
                  {item.name}
                </h3>
                <p className="mt-3 leading-[1.8] text-[var(--s-grey)]">
                  {item.body}
                </p>
                <p className="mt-5 flex items-start gap-2 border-t border-[var(--s-hair)] pt-4 text-[0.875rem] font-medium text-[var(--s-primary)]">
                  <Tick />
                  {item.detail}
                </p>
              </Reveal>
            ))}
          </div>
        </SampleSection>

        {/* --- Why parents choose us ------------------------------------------ */}
        <SampleSection size="tight">
          <Reveal>
            <SampleEyebrow>{school.why.eyebrow}</SampleEyebrow>
            <h2 className="s-display mt-4 text-[1.625rem] font-bold tracking-[-0.015em] sm:text-[2rem]">
              {school.why.heading}
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {school.why.points.map((point, index) => (
              <Reveal as="li" key={point.title} delay={index * 80}>
                <div className="flex size-10 items-center justify-center rounded-full bg-[var(--s-primary)]/12">
                  <Tick className="size-[1.125rem]" />
                </div>
                <h3 className="s-display mt-4 text-[1.0625rem] font-bold leading-snug">
                  {point.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.75] text-[var(--s-grey)]">
                  {point.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </SampleSection>

        {/* --- Campus --------------------------------------------------------- */}
        <SampleSection id="campus" tone="ink">
          <Reveal>
            <SampleEyebrow tone="inverse">{school.campus.eyebrow}</SampleEyebrow>
            <h2 className="s-display mt-4 max-w-2xl text-[1.875rem] font-bold tracking-[-0.015em] sm:text-[2.25rem]">
              {school.campus.heading}
            </h2>
            <p className="mt-4 max-w-xl leading-[1.8] text-[var(--s-bg)]/70">
              {school.campus.sub}
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {school.campus.items.map((item, index) => {
              const photo = schoolMedia[item.media];
              return (
                <Reveal as="li" key={item.media} delay={index * 70}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--s-radius-lg)]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-3.5 text-[0.9375rem] leading-[1.6] text-[var(--s-bg)]/80">
                    {item.caption}
                  </p>
                </Reveal>
              );
            })}
          </ul>
        </SampleSection>

        {/* --- Admissions process --------------------------------------------
            The stepper mirrors the clarity the process itself promises: the
            line draws through and each number lights in order. */}
        <SampleSection id="admissions">
          <Reveal>
            <SampleEyebrow>{school.admissions.eyebrow}</SampleEyebrow>
            <h2 className="s-display mt-4 max-w-3xl text-[1.875rem] font-bold tracking-[-0.015em] sm:text-[2.25rem]">
              {school.admissions.heading}
            </h2>
            <p className="mt-4 max-w-2xl leading-[1.8] text-[var(--s-grey)]">
              {school.admissions.sub}
            </p>
          </Reveal>

          <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
            {school.admissions.steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.title}
                delay={index * 90}
                className="relative"
              >
                {index < school.admissions.steps.length - 1 && (
                  <InView
                    aria-hidden="true"
                    delay={index * 180 + 200}
                    className="s-connector absolute -right-8 left-[3.25rem] top-5 hidden h-px bg-[var(--s-primary)]/30 md:block"
                  />
                )}

                <InView
                  as="span"
                  delay={index * 180}
                  className="s-pop relative z-10 flex size-10 items-center justify-center rounded-full bg-[var(--s-primary)] text-[0.9375rem] font-bold text-[var(--s-on-primary)] ring-4 ring-[var(--s-bg)]"
                >
                  <span className="s-display">{index + 1}</span>
                </InView>

                <p className="mt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-accent)]">
                  {step.meta}
                </p>
                <h3 className="s-display mt-1.5 text-[1.125rem] font-bold">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.75] text-[var(--s-grey)]">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>

          {/* Fees: stated plainly, deliberately not the headline. */}
          <Reveal delay={120}>
            <div className="mt-14 flex flex-col gap-6 rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-surface)] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <p className="max-w-2xl leading-[1.8] text-[var(--s-grey)]">
                {school.admissions.feeNote}
              </p>
              <SampleButton href="#visit" variant="outline" size="sm">
                {school.admissions.brochureCta}
              </SampleButton>
            </div>
          </Reveal>
        </SampleSection>

        {/* --- Contact / enquiry ---------------------------------------------- */}
        <SampleSection id="contact" tone="surface">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <Reveal>
              <div
                id="visit"
                className="scroll-mt-28 rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6 sm:p-8"
              >
                <SampleEyebrow>{school.contact.eyebrow}</SampleEyebrow>
                <h2 className="s-display mt-4 text-[1.875rem] font-bold tracking-[-0.015em]">
                  {school.contact.heading}
                </h2>
                <p className="mt-3 max-w-md leading-[1.8] text-[var(--s-grey)]">
                  {school.contact.sub}
                </p>

                <ul className="mt-6 grid gap-3 border-y border-[var(--s-hair)] py-4 text-[0.8125rem] text-[var(--s-grey)] sm:grid-cols-3">
                  <li>Small-group campus tour</li>
                  <li>Classroom visit included</li>
                  <li>Fee sheet shared after walk-through</li>
                </ul>

                <div className="mt-8">
                  <SampleLeadForm
                    submitLabel={school.contact.form.submit}
                    successTitle={school.contact.form.successTitle}
                    successBody={school.contact.form.successBody}
                    note={school.contact.form.note}
                    fields={[
                      {
                        kind: "text",
                        name: "parent",
                        label: "Parent name",
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
                        name: "grade",
                        label: "Applying for",
                        required: true,
                        options: [
                          "Nursery (age 3)",
                          "Jr. KG (age 4)",
                          "Sr. KG (age 5)",
                          "Grades 1 – 5",
                          "Grades 6 – 8",
                          "Grades 9 – 10",
                        ],
                      },
                      {
                        kind: "select",
                        name: "slot",
                        label: "Preferred visit time",
                        required: true,
                        options: [
                          "Weekday morning (8 – 11 AM)",
                          "Weekday afternoon (1 – 4 PM)",
                          "Saturday morning (9 AM – 12 PM)",
                        ],
                      },
                      {
                        kind: "textarea",
                        name: "notes",
                        label: "Anything we should know",
                        placeholder:
                          "Current school, or a question you'd like answered on the visit",
                        rows: 3,
                        full: true,
                      },
                    ]}
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6 sm:p-8">
              <SampleEyebrow>Campus</SampleEyebrow>
              <h2 className="s-display mt-4 text-[1.875rem] font-bold tracking-[-0.015em]">
                Where to find us.
              </h2>

              <address className="mt-6 not-italic leading-[1.9] text-[var(--s-grey)]">
                {school.contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <div className="mt-5 flex flex-wrap gap-3">
                <SampleButton href={school.contact.phoneHref} size="sm">
                  {school.contact.phoneLabel}
                </SampleButton>
                <SampleButton
                  href={school.contact.whatsappHref}
                  external
                  size="sm"
                  variant="outline"
                >
                  {school.contact.whatsappLabel}
                </SampleButton>
              </div>

              <table className="mt-8 w-full text-sm">
                <caption className="mb-3 text-left text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-grey)]">
                  Office hours
                </caption>
                <tbody>
                  {school.contact.hours.map((row) => (
                    <tr
                      key={row.day}
                      className="border-b border-[var(--s-hair)] last:border-0"
                    >
                      <th scope="row" className="py-3 text-left font-medium">
                        {row.day}
                      </th>
                      <td className="py-3 text-right text-[var(--s-grey)]">
                        {row.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <SampleMap
                lat={school.contact.coords.lat}
                lon={school.contact.coords.lon}
                label={school.contact.mapLabel}
                className="mt-8 h-64"
              />
              </div>
            </Reveal>
          </div>
        </SampleSection>

        {/* --- Closing CTA ------------------------------------------------------ */}
        <section className="bg-[var(--s-bg)] py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <Reveal>
              <div className="rounded-[var(--s-radius-lg)] bg-[var(--s-primary)] px-6 py-14 text-center sm:px-12">
                <h2 className="s-display mx-auto max-w-xl text-[1.75rem] font-bold leading-[1.2] text-[var(--s-bg)] sm:text-[2.125rem]">
                  {school.bottomCta.heading}
                </h2>
                <p className="mx-auto mt-4 max-w-md leading-[1.8] text-[var(--s-bg)]/80">
                  {school.bottomCta.body}
                </p>
                <div className="mt-8 flex justify-center">
                  <SampleButton href="#visit" variant="accent" size="lg">
                    {school.bottomCta.cta}
                  </SampleButton>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <SampleSection size="tight">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-surface)] p-6 sm:p-8">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-accent)]">
                  Admissions desk
                </p>
                <h2 className="s-display mt-3 text-[1.5rem] font-bold tracking-[-0.015em]">
                  What parents get on the visit.
                </h2>
                <ul className="mt-6 grid gap-3 text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                  <li>Working-day classroom walk-through, not an empty campus tour.</li>
                  <li>Seat availability for your child&rsquo;s grade, stated clearly.</li>
                  <li>Full annual fee sheet shared in writing on the visit.</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6 sm:p-8">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-grey)]">
                  Office hours
                </p>
                <table className="mt-4 w-full text-sm">
                  <tbody>
                    {school.contact.hours.map((row) => (
                      <tr
                        key={row.day}
                        className="border-b border-[var(--s-hair)] last:border-0"
                      >
                        <th scope="row" className="py-3 text-left font-medium">
                          {row.day}
                        </th>
                        <td className="py-3 text-right text-[var(--s-grey)]">
                          {row.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-5 flex flex-wrap gap-3">
                  <SampleButton href={school.contact.phoneHref} size="sm">
                    {school.contact.phoneLabel}
                  </SampleButton>
                  <SampleButton
                    href={school.contact.whatsappHref}
                    external
                    size="sm"
                    variant="outline"
                  >
                    {school.contact.whatsappLabel}
                  </SampleButton>
                </div>
              </div>
            </Reveal>
          </div>
        </SampleSection>
      </main>

      <SampleFooter
        brand="Brightfield Academy"
        blurb={school.footer.blurb}
        legal={school.footer.legal}
        variant="centered"
        columns={[
          {
            title: "School",
            items: [
              { label: "Academics", href: "#academics" },
              { label: "Campus", href: "#campus" },
              { label: "Admissions process", href: "#admissions" },
            ],
          },
          {
            title: "Office",
            items: [
              { label: school.contact.address.join(", ") },
              {
                label: school.contact.phoneLabel,
                href: school.contact.phoneHref,
              },
            ],
          },
        ]}
      />
    </SampleFrame>
  );
}

function Tick({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`${className} shrink-0 text-[var(--s-primary)]`}
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
