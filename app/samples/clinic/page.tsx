import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { clinic } from "@/lib/samples/clinic";
import { clinicMedia } from "@/lib/samples/media";

export const metadata: Metadata = {
  title: "Meridian Family Clinic",
  description:
    "Family clinic in Thane - same-day appointments, online booking, and clear follow-up.",
};

const homeServices = clinic.services.items.slice(0, 4);

export default function ClinicHomePage() {
  return (
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
              <SampleButton
                href="/samples/clinic/book"
                size="lg"
                className="s-glow"
              >
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

      {/* --- Services teaser ---------------------------------------------- */}
      <SampleSection tone="surface">
        <Reveal>
          <SampleEyebrow>{clinic.services.eyebrow}</SampleEyebrow>
          <h2 className="s-display mt-4 max-w-2xl text-[1.875rem] font-semibold tracking-[-0.015em] sm:text-[2.25rem]">
            {clinic.services.heading}
          </h2>
          <p className="mt-4 max-w-xl text-[var(--s-grey)]">
            {clinic.services.sub}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {homeServices.map((service, index) => (
            <Reveal key={service.slug} delay={index * 70}>
              <article
                className="flex h-full flex-col rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1"
                style={{ boxShadow: "var(--s-shadow)" }}
              >
                <h3 className="s-display text-[1.0625rem] font-semibold">
                  {service.name}
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                  {service.teaser}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  <Link
                    href="/samples/clinic/services"
                    className="font-medium text-[var(--s-primary)] transition-opacity hover:opacity-70"
                  >
                    View services
                  </Link>
                  <Link
                    href={`/samples/clinic/book?service=${encodeURIComponent(service.name)}`}
                    className="font-medium text-[var(--s-ink)] transition-opacity hover:opacity-70"
                  >
                    Book this
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10">
            <SampleButton href="/samples/clinic/services" variant="outline">
              See all services
            </SampleButton>
          </div>
        </Reveal>
      </SampleSection>

      {/* --- Why book online ---------------------------------------------- */}
      <SampleSection size="tight">
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

      {/* --- Doctor teaser ------------------------------------------------ */}
      <SampleSection tone="surface">
        <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1fr] lg:gap-14">
          <Reveal>
            <div
              className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-[var(--s-radius-lg)]"
              style={{ boxShadow: "var(--s-shadow)" }}
            >
              <Image
                src={clinicMedia.doctor.src}
                alt={clinicMedia.doctor.alt}
                fill
                sizes="(min-width: 1024px) 28vw, 80vw"
                className="object-cover"
              />
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
            <p className="mt-5 max-w-xl leading-[1.75] text-[var(--s-grey)]">
              {clinic.doctor.paragraphs[0]}
            </p>
            <div className="mt-8">
              <SampleButton href="/samples/clinic/doctor" variant="outline">
                About Dr. Rao
              </SampleButton>
            </div>
          </Reveal>
        </div>
      </SampleSection>

      {/* --- Closing CTA -------------------------------------------------- */}
      <section className="bg-[var(--s-bg)] pb-24 pt-8">
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
                <SampleButton
                  href="/samples/clinic/book"
                  variant="accent"
                  size="lg"
                >
                  {clinic.bottomCta.cta}
                </SampleButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
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
