import type { Metadata } from "next";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleFooter } from "@/components/samples/SampleFooter";
import { SampleFrame } from "@/components/samples/SampleFrame";
import { SampleLeadForm } from "@/components/samples/SampleLeadForm";
import { SampleMap } from "@/components/samples/SampleMap";
import { SampleNav } from "@/components/samples/SampleNav";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { clinic } from "@/lib/samples/clinic";
import { clinicMedia } from "@/lib/samples/media";

/** Rounded terminals are an asset here - this is the one vertical where
 *  "friendly" outranks "engineered". */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sample: Family Clinic",
  description:
    "Concept build for a family clinic - same-day booking, WhatsApp confirmations and automatic follow-up reminders.",
};

export default function ClinicSample() {
  return (
    <SampleFrame sample="clinic" fontClass={poppins.variable}>
      <span id="top" />
      <SampleNav
        brand={clinic.business}
        brandNote={clinic.brandNote}
        links={clinic.nav.links}
        cta={clinic.nav.cta}
      />

      <main id="main">
        {/* --- Hero --------------------------------------------------------- */}
        <section className="overflow-hidden bg-[var(--s-bg)] pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div>
              <span
                className="hero-step inline-flex items-center gap-2 rounded-[var(--s-radius-pill)] bg-[var(--s-primary)]/10 px-3.5 py-1.5 text-xs font-medium text-[var(--s-primary-2)]"
                style={{ "--step-delay": "0ms" } as React.CSSProperties}
              >
                <span className="breathe size-1.5 rounded-full bg-[var(--s-primary)]" />
                {clinic.hero.eyebrow}
              </span>

              <h1
                className="hero-step s-display mt-6 text-[2.5rem] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[3.25rem]"
                style={{ "--step-delay": "80ms" } as React.CSSProperties}
              >
                {clinic.hero.headline}
              </h1>

              <p
                className="hero-step mt-6 max-w-xl text-[1.0625rem] leading-[1.75] text-[var(--s-grey)]"
                style={{ "--step-delay": "160ms" } as React.CSSProperties}
              >
                {clinic.hero.sub}
              </p>

              <div
                className="hero-step mt-9 flex flex-wrap gap-3"
                style={{ "--step-delay": "240ms" } as React.CSSProperties}
              >
                <SampleButton href="#book" size="lg" className="s-glow">
                  {clinic.hero.primaryCta}
                </SampleButton>
                <SampleButton
                  href={clinic.visit.phoneHref}
                  size="lg"
                  variant="outline"
                >
                  {clinic.hero.secondaryCta}
                </SampleButton>
              </div>

              <ul
                className="hero-step mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--s-grey)]"
                style={{ "--step-delay": "320ms" } as React.CSSProperties}
              >
                {clinic.hero.reassurance.map((item) => (
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
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-[var(--s-radius-lg)]"
                style={{ boxShadow: "var(--s-shadow)" }}
              >
                <Image
                  src={clinicMedia.waiting.src}
                  alt={clinicMedia.waiting.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Opening hours sit on the hero because it's the question most
                  patients arrive with. */}
              <div
                className="mt-4 rounded-[var(--s-radius)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-5 sm:absolute sm:-bottom-8 sm:-left-6 sm:mt-0 sm:w-64"
                style={{ boxShadow: "var(--s-shadow)" }}
              >
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-grey)]">
                  Open today
                </p>
                <p className="s-display mt-2 text-lg font-semibold">
                  9:00 AM – 9:00 PM
                </p>
                <p className="mt-1 text-sm text-[var(--s-grey)]">
                  Closed 1:00 – 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Services ----------------------------------------------------- */}
        <SampleSection id="services" tone="surface">
          <Reveal>
            <SampleEyebrow>{clinic.services.eyebrow}</SampleEyebrow>
            <h2 className="s-display mt-4 max-w-2xl text-[1.875rem] font-semibold tracking-[-0.015em] sm:text-[2.25rem]">
              {clinic.services.heading}
            </h2>
            <p className="mt-4 max-w-xl text-[var(--s-grey)]">
              {clinic.services.sub}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {clinic.services.items.map((service, index) => (
              <Reveal key={service.name} delay={index * 70}>
                <article
                  className="h-full rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1"
                  style={{ boxShadow: "var(--s-shadow)" }}
                >
                  <h3 className="s-display text-[1.0625rem] font-semibold">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                    {service.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </SampleSection>

        {/* --- The doctor --------------------------------------------------- */}
        <SampleSection id="doctor">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
            <Reveal>
              <div className="relative">
                <div
                  className="relative aspect-[4/5] overflow-hidden rounded-[var(--s-radius-lg)]"
                  style={{ boxShadow: "var(--s-shadow)" }}
                >
                  <Image
                    src={clinicMedia.doctor.src}
                    alt={clinicMedia.doctor.alt}
                    fill
                    sizes="(min-width: 1024px) 36vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div
                  className="absolute -bottom-6 -right-4 hidden w-40 overflow-hidden rounded-[var(--s-radius)] border-4 border-[var(--s-bg)] sm:block"
                  style={{ boxShadow: "var(--s-shadow)" }}
                >
                  <Image
                    src={clinicMedia.consult.src}
                    alt={clinicMedia.consult.alt}
                    width={320}
                    height={240}
                    sizes="160px"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <SampleEyebrow>{clinic.doctor.eyebrow}</SampleEyebrow>
              <h2 className="s-display mt-4 text-[1.875rem] font-semibold tracking-[-0.015em] sm:text-[2.25rem]">
                {clinic.doctor.heading}
              </h2>
              <p className="mt-2 text-sm font-medium text-[var(--s-primary)]">
                {clinic.doctor.credentials}
              </p>

              {clinic.doctor.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-5 max-w-xl leading-[1.75] text-[var(--s-grey)]"
                >
                  {paragraph}
                </p>
              ))}

              <dl className="mt-9 grid max-w-md grid-cols-3 gap-4">
                {clinic.doctor.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[var(--s-radius)] bg-[var(--s-surface)] px-4 py-3.5"
                  >
                    <dt className="s-display text-lg font-semibold">
                      {stat.value}
                    </dt>
                    <dd className="mt-0.5 text-xs text-[var(--s-grey)]">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </SampleSection>

        {/* --- Why book online ---------------------------------------------- */}
        <SampleSection tone="surface" size="tight">
          <Reveal>
            <SampleEyebrow>{clinic.why.eyebrow}</SampleEyebrow>
            <h2 className="s-display mt-4 text-[1.625rem] font-semibold tracking-[-0.015em] sm:text-[2rem]">
              {clinic.why.heading}
            </h2>
          </Reveal>

          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {clinic.why.points.map((point, index) => (
              <Reveal as="li" key={point.title} delay={index * 90}>
                <div className="flex size-9 items-center justify-center rounded-full bg-[var(--s-primary)]/12">
                  <Tick />
                </div>
                <h3 className="s-display mt-4 text-[1.0625rem] font-semibold">
                  {point.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                  {point.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </SampleSection>

        {/* --- Booking + location ------------------------------------------- */}
        <SampleSection id="visit" tone="surface">
          <div className="grid gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
            <Reveal>
              <div
                id="book"
                className="scroll-mt-28 rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6 sm:p-8"
                style={{ boxShadow: "var(--s-shadow)" }}
              >
                <SampleEyebrow>{clinic.booking.eyebrow}</SampleEyebrow>
                <h2 className="s-display mt-4 text-[1.875rem] font-semibold tracking-[-0.015em]">
                  {clinic.booking.heading}
                </h2>
                <p className="mt-3 max-w-md text-[var(--s-grey)]">
                  {clinic.booking.sub}
                </p>

                <ul className="mt-6 grid gap-3 border-y border-[var(--s-hair)] py-4 text-[0.8125rem] text-[var(--s-grey)] sm:grid-cols-3">
                  {clinic.why.points.map((point) => (
                    <li key={point.title} className="flex items-start gap-2">
                      <Tick />
                      <span>{point.title}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <SampleLeadForm
                    submitLabel={clinic.booking.submit}
                    successTitle={clinic.booking.successTitle}
                    successBody={clinic.booking.successBody}
                    note={clinic.booking.note}
                    fields={[
                      {
                        kind: "text",
                        name: "name",
                        label: "Patient name",
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
                        name: "reason",
                        label: "Reason for visit",
                        required: true,
                        options: [
                          "General consultation",
                          "Follow-up visit",
                          "Preventive health check",
                          "Vaccination",
                          "Lab test",
                          "Something else",
                        ],
                      },
                      {
                        kind: "select",
                        name: "who",
                        label: "Visit is for",
                        options: [
                          "Myself",
                          "My child",
                          "A parent",
                          "Someone else",
                        ],
                      },
                      { kind: "date", name: "date", label: "Preferred date" },
                      {
                        kind: "select",
                        name: "slot",
                        label: "Preferred time",
                        options: [
                          "Morning (9 AM – 1 PM)",
                          "Evening (5 PM – 9 PM)",
                        ],
                      },
                    ]}
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div
                className="rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6 sm:p-8"
                style={{ boxShadow: "var(--s-shadow)" }}
              >
              <SampleEyebrow>{clinic.visit.eyebrow}</SampleEyebrow>
              <h2 className="s-display mt-4 text-[1.875rem] font-semibold tracking-[-0.015em]">
                {clinic.visit.heading}
              </h2>

              <address className="mt-6 not-italic leading-[1.8] text-[var(--s-grey)]">
                {clinic.visit.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <div className="mt-5 flex flex-wrap gap-3">
                <SampleButton href={clinic.visit.phoneHref} size="sm">
                  {clinic.visit.phoneLabel}
                </SampleButton>
                <SampleButton
                  href={clinic.visit.whatsappHref}
                  external
                  size="sm"
                  variant="outline"
                >
                  {clinic.visit.whatsappLabel}
                </SampleButton>
              </div>

              <table className="mt-8 w-full text-sm">
                <caption className="mb-3 text-left text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-grey)]">
                  Clinic hours
                </caption>
                <tbody>
                  {clinic.visit.hours.map((row) => (
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
                lat={clinic.visit.coords.lat}
                lon={clinic.visit.coords.lon}
                label="Meridian Family Clinic, Naupada, Thane"
                className="mt-8 h-64"
              />
              </div>
            </Reveal>
          </div>
        </SampleSection>

        {/* --- Closing CTA -------------------------------------------------- */}
        <section className="bg-[var(--s-bg)] pb-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <Reveal>
              <div className="rounded-[var(--s-radius-lg)] bg-[var(--s-primary)] px-6 py-14 text-center sm:px-12">
                <h2 className="s-display mx-auto max-w-xl text-[1.75rem] font-semibold leading-[1.2] text-white sm:text-[2.125rem]">
                  {clinic.bottomCta.heading}
                </h2>
                <p className="mx-auto mt-4 max-w-md text-white/80">
                  {clinic.bottomCta.body}
                </p>
                <div className="mt-8 flex justify-center">
                  <SampleButton href="#book" variant="accent" size="lg">
                    {clinic.bottomCta.cta}
                  </SampleButton>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SampleFooter
        brand="Meridian Family Clinic"
        blurb={clinic.footer.blurb}
        legal={clinic.footer.legal}
        variant="stacked"
        columns={[
          {
            title: "Clinic",
            items: [
              { label: "Services", href: "#services" },
              { label: "Dr. Aditya Rao", href: "#doctor" },
              { label: "Book an appointment", href: "#book" },
            ],
          },
          {
            title: "Visit",
            items: [
              { label: clinic.visit.address.join(", ") },
              { label: clinic.visit.phoneLabel, href: clinic.visit.phoneHref },
            ],
          },
        ]}
      />
    </SampleFrame>
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
