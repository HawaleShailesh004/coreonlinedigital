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
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { realty } from "@/lib/samples/realty";
import { realtyMedia } from "@/lib/samples/media";

/** Geometric weight without the corporate-broker gloss - the brief wants
 *  considered-architecture branding, not another navy template. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Keystone Properties",
  description:
    "Concept build for a Thane brokerage - verified listings with real prices, area-by-area rates and a budget-qualified enquiry form.",
};

export default function RealtySample() {
  return (
    <SampleFrame sample="realty" fontClass={archivo.variable}>
      <span id="top" />
      <SampleNav
        brand={realty.business}
        brandNote={realty.brandNote}
        links={realty.nav.links}
        cta={realty.nav.cta}
      />

      <main id="main">
        {/* --- Hero ---------------------------------------------------------
            Full-bleed photography: in this vertical the picture does the
            selling and the copy only has to stay out of its way. */}
        <section className="relative isolate flex min-h-[30rem] items-end overflow-hidden md:min-h-[38rem]">
          <Image
            src={realtyMedia.hero.src}
            alt={realtyMedia.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[var(--s-ink)]/55"
          />

          <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-24 sm:px-8 md:pb-20 md:pt-40">
            <SampleEyebrow tone="inverse" className="hero-step">
              {realty.hero.eyebrow}
            </SampleEyebrow>

            <h1
              className="hero-step s-display mt-5 max-w-3xl text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--s-bg)] sm:text-[3.25rem]"
              style={{ "--step-delay": "80ms" } as React.CSSProperties}
            >
              {realty.hero.headline}
            </h1>

            <p
              className="hero-step mt-5 max-w-xl text-[1.0625rem] leading-[1.7] text-[var(--s-bg)]/80"
              style={{ "--step-delay": "160ms" } as React.CSSProperties}
            >
              {realty.hero.sub}
            </p>

            <div
              className="hero-step mt-8 flex flex-wrap gap-3"
              style={{ "--step-delay": "240ms" } as React.CSSProperties}
            >
              <SampleButton href="#listings" variant="accent" size="lg">
                {realty.hero.primaryCta}
              </SampleButton>
              <SampleButton href="#enquire" size="lg">
                {realty.hero.secondaryCta}
              </SampleButton>
            </div>

            <dl
              className="hero-step mt-12 flex flex-wrap gap-x-12 gap-y-5 border-t border-[var(--s-bg)]/20 pt-7"
              style={{ "--step-delay": "320ms" } as React.CSSProperties}
            >
              {realty.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="s-mono text-[1.375rem] font-medium text-[var(--s-bg)]">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-[0.8125rem] text-[var(--s-bg)]/70">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* --- Featured listings -------------------------------------------- */}
        <SampleSection id="listings">
          <Reveal>
            <SampleEyebrow>{realty.listings.eyebrow}</SampleEyebrow>
            <h2 className="s-display mt-4 max-w-2xl text-[1.875rem] font-semibold tracking-[-0.015em] sm:text-[2.25rem]">
              {realty.listings.heading}
            </h2>
            <p className="mt-4 max-w-2xl leading-[1.7] text-[var(--s-grey)]">
              {realty.listings.sub}
            </p>
          </Reveal>

          {/* Generous gutters on purpose: a tight grid here reads as classifieds. */}
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {realty.listings.items.map((listing, index) => {
              const photo = realtyMedia.listings[listing.image];
              return (
                <Reveal
                  as="article"
                  key={listing.name}
                  delay={index * 80}
                  className="s-zoom flex h-full flex-col overflow-hidden rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                      className="object-cover"
                    />
                    <SampleBadge
                      tone="primary"
                      className="absolute left-4 top-4"
                    >
                      {listing.badge}
                    </SampleBadge>
                  </div>

                  <Reveal
                    delay={index * 80 + 140}
                    className="flex flex-1 flex-col p-6"
                  >
                    {/* Price leads the card. In this vertical burying it reads
                        as evasive, which is the one thing a buyer punishes. */}
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <p className="s-display text-[1.5rem] font-semibold leading-none text-[var(--s-accent)]">
                        {listing.price}
                      </p>
                      <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-[var(--s-grey)]">
                        {listing.priceNote}
                      </p>
                    </div>

                    <h3 className="s-display mt-3.5 text-[1.0625rem] font-semibold leading-snug">
                      {listing.name}
                    </h3>
                    <p className="mt-1.5 flex items-start gap-1.5 text-[0.8125rem] leading-snug text-[var(--s-grey)]">
                      <Pin className="mt-0.5 size-3.5 shrink-0" />
                      {listing.area}
                    </p>

                    <ul className="s-mono mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 border-y border-[var(--s-hair)] py-3 text-[0.8125rem] text-[var(--s-ink)]">
                      {listing.specs.map((spec, specIndex) => (
                        <li key={spec} className="flex items-center gap-2.5">
                          {specIndex > 0 && (
                            <span
                              aria-hidden="true"
                              className="text-[var(--s-grey)]"
                            >
                              ·
                            </span>
                          )}
                          {spec}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-4 text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                      {listing.note}
                    </p>

                    <div className="mt-auto pt-6">
                      <SampleButton
                        href="#enquire"
                        size="sm"
                        variant="outline"
                        className="w-full"
                      >
                        {realty.listings.enquire}
                      </SampleButton>
                    </div>
                  </Reveal>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <p className="mt-8 text-[0.8125rem] text-[var(--s-grey)]">
              {realty.listings.specNote}
            </p>
          </Reveal>
        </SampleSection>

        {/* --- Areas we serve ----------------------------------------------- */}
        <SampleSection id="areas" tone="surface">
          <Reveal>
            <SampleEyebrow>{realty.areas.eyebrow}</SampleEyebrow>
            <h2 className="s-display mt-4 max-w-2xl text-[1.875rem] font-semibold tracking-[-0.015em] sm:text-[2.25rem]">
              {realty.areas.heading}
            </h2>
            <p className="mt-4 max-w-2xl leading-[1.7] text-[var(--s-grey)]">
              {realty.areas.sub}
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {realty.areas.items.map((area, index) => (
              <Reveal
                as="li"
                key={area.name}
                delay={index * 60}
                className="flex gap-4 rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-5"
              >
                {/* The one playful beat on this page: markers drop in, once. */}
                <InView
                  as="span"
                  className="s-pin flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--s-primary)]/12"
                  delay={index * 90}
                >
                  <Pin className="size-4 text-[var(--s-primary)]" />
                </InView>
                <div>
                  <h3 className="s-display text-[1.0625rem] font-semibold">
                    {area.name}
                  </h3>
                  <p className="s-mono mt-1.5 text-[0.8125rem] text-[var(--s-primary-2)]">
                    {area.rate}
                  </p>
                  <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-[var(--s-grey)]">
                    {area.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <p className="mt-8 text-[0.8125rem] text-[var(--s-grey)]">
              {realty.areas.footnote}
            </p>
          </Reveal>
        </SampleSection>

        {/* --- Why work with us --------------------------------------------- */}
        <SampleSection size="tight">
          <Reveal>
            <SampleEyebrow>{realty.why.eyebrow}</SampleEyebrow>
            <h2 className="s-display mt-4 text-[1.625rem] font-semibold tracking-[-0.015em] sm:text-[2rem]">
              {realty.why.heading}
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {realty.why.points.map((point, index) => (
              <Reveal as="li" key={point.title} delay={index * 90}>
                <p className="s-mono text-[0.8125rem] text-[var(--s-primary)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="s-display mt-3 border-t border-[var(--s-hair)] pt-4 text-[1.125rem] font-semibold">
                  {point.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.75] text-[var(--s-grey)]">
                  {point.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </SampleSection>

        {/* --- About the agent ---------------------------------------------- */}
        <SampleSection id="about" tone="ink">
          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--s-radius-lg)]">
                <Image
                  src={realtyMedia.agent.src}
                  alt={realtyMedia.agent.alt}
                  fill
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <SampleEyebrow tone="inverse">
                {realty.about.eyebrow}
              </SampleEyebrow>
              <h2 className="s-display mt-4 text-[1.875rem] font-semibold tracking-[-0.015em] sm:text-[2.25rem]">
                {realty.about.heading}
              </h2>
              <p className="s-mono mt-3 text-[0.8125rem] text-[var(--s-accent)]">
                {realty.about.role}
              </p>

              {realty.about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-5 max-w-xl leading-[1.8] text-[var(--s-bg)]/75"
                >
                  {paragraph}
                </p>
              ))}

              <blockquote className="s-display mt-9 max-w-lg border-l-2 border-[var(--s-accent)] pl-5 text-[1.125rem] font-medium leading-[1.6]">
                “{realty.about.quote}”
              </blockquote>
            </Reveal>
          </div>
        </SampleSection>

        {/* --- Contact ------------------------------------------------------- */}
        <SampleSection id="contact" tone="surface">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <Reveal>
              <div
                id="enquire"
                className="scroll-mt-28 rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6 sm:p-8"
              >
                <SampleEyebrow>{realty.contact.eyebrow}</SampleEyebrow>
                <h2 className="s-display mt-4 text-[1.875rem] font-semibold tracking-[-0.015em]">
                  {realty.contact.heading}
                </h2>
                <p className="mt-3 max-w-md leading-[1.7] text-[var(--s-grey)]">
                  {realty.contact.sub}
                </p>

                <div className="mt-6 grid gap-3 border-y border-[var(--s-hair)] py-4 text-[0.75rem] uppercase tracking-[0.12em] text-[var(--s-grey)] sm:grid-cols-3">
                  <p>Buy side filtering</p>
                  <p>Budget-qualified leads</p>
                  <p>Area-first shortlist</p>
                </div>

                <div className="mt-8">
                  <SampleLeadForm
                    submitLabel={realty.contact.form.submit}
                    successTitle={realty.contact.form.successTitle}
                    successBody={realty.contact.form.successBody}
                    note={realty.contact.form.note}
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
                        label: "Phone",
                        placeholder: "10-digit mobile",
                        required: true,
                      },
                      {
                        kind: "select",
                        name: "intent",
                        label: "I'm looking to",
                        required: true,
                        options: ["Buy", "Sell", "Rent", "Just exploring"],
                      },
                      {
                        kind: "select",
                        name: "budget",
                        label: "Budget range",
                        options: [
                          "Under ₹1 Cr",
                          "₹1 – 2 Cr",
                          "₹2 – 4 Cr",
                          "₹4 Cr and above",
                          "Rental - under ₹50,000 / month",
                          "Rental - ₹50,000+ / month",
                        ],
                      },
                      {
                        kind: "select",
                        name: "area",
                        label: "Preferred area",
                        full: true,
                        options: [
                          ...realty.areas.items.map((area) => area.name),
                          "Open to suggestions",
                        ],
                      },
                    ]}
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6 sm:p-8">
              <SampleEyebrow>Office</SampleEyebrow>
              <h2 className="s-display mt-4 text-[1.875rem] font-semibold tracking-[-0.015em]">
                Where to find us.
              </h2>

              <address className="mt-6 not-italic leading-[1.8] text-[var(--s-grey)]">
                {realty.contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <div className="mt-5 flex flex-wrap gap-3">
                <SampleButton href={realty.contact.phoneHref} size="sm">
                  {realty.contact.phoneLabel}
                </SampleButton>
                <SampleButton
                  href={realty.contact.whatsappHref}
                  external
                  size="sm"
                  variant="outline"
                >
                  {realty.contact.whatsappLabel}
                </SampleButton>
              </div>

              <table className="mt-8 w-full text-sm">
                <caption className="mb-3 text-left text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-grey)]">
                  Office hours
                </caption>
                <tbody>
                  {realty.contact.hours.map((row) => (
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
                lat={realty.contact.coords.lat}
                lon={realty.contact.coords.lon}
                label={realty.contact.mapLabel}
                className="mt-8 h-64"
              />
              </div>
            </Reveal>
          </div>
        </SampleSection>

        {/* --- Closing CTA --------------------------------------------------- */}
        <section className="bg-[var(--s-bg)] pb-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <Reveal>
              <div className="rounded-[var(--s-radius-lg)] bg-[var(--s-primary)] px-6 py-14 text-center sm:px-12">
                <h2 className="s-display mx-auto max-w-2xl text-[1.75rem] font-semibold leading-[1.2] text-[var(--s-bg)] sm:text-[2.125rem]">
                  {realty.bottomCta.heading}
                </h2>
                <p className="mx-auto mt-4 max-w-md text-[var(--s-bg)]/80">
                  {realty.bottomCta.body}
                </p>
                <div className="mt-8 flex justify-center">
                  <SampleButton href="#enquire" variant="accent" size="lg">
                    {realty.bottomCta.cta}
                  </SampleButton>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <SampleSection tone="surface" size="tight">
          <div className="grid gap-6 md:grid-cols-3">
            <Reveal>
              <div className="rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6">
                <p className="s-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--s-grey)]">
                  Coverage
                </p>
                <p className="s-display mt-3 text-[1.5rem] font-semibold">
                  6 micro-markets
                </p>
                <p className="mt-2 text-[0.875rem] leading-[1.7] text-[var(--s-grey)]">
                  Hiranandani Estate, Ghodbunder Road, Kolshet, Pokhran Road 2, Vartak Nagar, and Majiwada.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6">
                <p className="s-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--s-grey)]">
                  Response
                </p>
                <p className="s-display mt-3 text-[1.5rem] font-semibold">
                  Same working day
                </p>
                <p className="mt-2 text-[0.875rem] leading-[1.7] text-[var(--s-grey)]">
                  Budget in, shortlist back. The goal is fewer site visits, not more listings in your inbox.
                </p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6">
                <p className="s-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--s-grey)]">
                  Sunday rule
                </p>
                <p className="s-display mt-3 text-[1.5rem] font-semibold">
                  4 worth seeing
                </p>
                <p className="mt-2 text-[0.875rem] leading-[1.7] text-[var(--s-grey)]">
                  Enough to compare properly, not so many that the whole day disappears into bad fits.
                </p>
              </div>
            </Reveal>
          </div>
        </SampleSection>
      </main>

      <SampleFooter
        brand="Keystone Properties"
        blurb={realty.footer.blurb}
        legal={realty.footer.legal}
        variant="stacked"
        columns={[
          {
            title: "Browse",
            items: [
              { label: "Featured listings", href: "#listings" },
              { label: "Areas we serve", href: "#areas" },
              { label: "About Rohan Deshpande", href: "#about" },
            ],
          },
          {
            title: "Office",
            items: [
              { label: realty.contact.address.join(", ") },
              {
                label: realty.contact.phoneLabel,
                href: realty.contact.phoneHref,
              },
            ],
          },
        ]}
      />
    </SampleFrame>
  );
}

function Pin({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 14.5s5-4.4 5-8a5 5 0 0 0-10 0c0 3.6 5 8 5 8Z" />
      <circle cx="8" cy="6.5" r="1.75" />
    </svg>
  );
}
