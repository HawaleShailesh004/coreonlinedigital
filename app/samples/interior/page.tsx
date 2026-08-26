import type { Metadata } from "next";
import Image from "next/image";
import { Fraunces } from "next/font/google";
import { InView } from "@/components/samples/InView";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
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
import { interior } from "@/lib/samples/interior";
import { interiorMedia } from "@/lib/samples/media";

/** Used at light weights only - this should read as a design magazine, never a
 *  corporate brochure. */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sample: Interior Designer",
  description:
    "Concept build for a Mumbai interior design studio - a photography-led project portfolio, a four-stage process and a qualified enquiry form.",
};

export default function InteriorSample() {
  return (
    <SampleFrame sample="interior" fontClass={fraunces.variable}>
      <span id="top" />
      <SampleNav
        brand={interior.business}
        brandNote={interior.brandNote}
        links={interior.nav.links}
        cta={interior.nav.cta}
      />

      <main id="main">
        {/* --- Hero ---------------------------------------------------------
            Text first and short, then one large uninterrupted photograph. The
            image is the argument; the copy only introduces it. */}
        <section className="bg-[var(--s-bg)] pt-20 md:pt-28">
          <SampleContainer>
            <div className="max-w-3xl">
              <SampleEyebrow tone="grey" className="hero-step">
                {interior.hero.eyebrow}
              </SampleEyebrow>

              <h1
                className="hero-step s-display mt-7 text-[2.375rem] font-light leading-[1.14] tracking-[-0.015em] sm:text-[3.25rem] lg:text-[3.75rem]"
                style={{ "--step-delay": "80ms" } as React.CSSProperties}
              >
                {interior.hero.headline}
              </h1>

              <p
                className="hero-step mt-8 max-w-xl text-[1.0625rem] font-light leading-[1.85] text-[var(--s-grey)]"
                style={{ "--step-delay": "160ms" } as React.CSSProperties}
              >
                {interior.hero.sub}
              </p>

              <div
                className="hero-step mt-10 flex flex-wrap gap-3"
                style={{ "--step-delay": "240ms" } as React.CSSProperties}
              >
                <SampleButton href="#portfolio" size="lg">
                  {interior.hero.primaryCta}
                </SampleButton>
                <SampleButton href="#contact" size="lg" variant="outline">
                  {interior.hero.secondaryCta}
                </SampleButton>
              </div>
            </div>
          </SampleContainer>

          <div
            className="hero-step mt-16 md:mt-24"
            style={{ "--step-delay": "320ms" } as React.CSSProperties}
          >
            <div className="relative aspect-[16/9] w-full lg:aspect-[21/9]">
              <Image
                src={interiorMedia.hero.src}
                alt={interiorMedia.hero.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <SampleContainer>
              <p className="mt-4 text-[0.625rem] uppercase tracking-[0.28em] text-[var(--s-grey)]">
                {interior.hero.caption}
              </p>
            </SampleContainer>
          </div>
        </section>

        {/* --- Portfolio ----------------------------------------------------
            Gallery pacing: the first project runs the full width, the rest sit
            two up with a lot of air between rows. Captions stay visible; the
            hover overlay only repeats them, so nothing is hover-only. */}
        <SampleSection id="portfolio" size="loose" wide>
          <Reveal>
            <SampleEyebrow tone="grey">
              {interior.portfolio.eyebrow}
            </SampleEyebrow>
            <h2 className="s-display mt-5 max-w-xl text-[1.75rem] font-light leading-[1.2] tracking-[-0.01em] sm:text-[2.25rem]">
              {interior.portfolio.heading}
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-x-8 gap-y-20 md:mt-24 md:gap-y-28 lg:grid-cols-2">
            {interior.portfolio.items.map((project, index) => {
              const photo = interiorMedia.projects[index];
              const feature = index === 0;
              return (
                <Reveal
                  key={project.name}
                  delay={feature ? 0 : (index % 2) * 120}
                  className={feature ? "lg:col-span-2" : undefined}
                >
                  <figure className="s-zoom group">
                    <div
                      className={`relative w-full overflow-hidden ${
                        feature ? "aspect-[16/9] lg:aspect-[21/9]" : "aspect-[4/3]"
                      }`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes={
                          feature
                            ? "(min-width: 1024px) 82vw, 100vw"
                            : "(min-width: 1024px) 40vw, 100vw"
                        }
                        className="object-cover group-hover:brightness-[1.07]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 flex items-end bg-gradient-to-t from-[var(--s-ink)]/70 via-[var(--s-ink)]/10 to-transparent p-7 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-10"
                      >
                        <div>
                          <p className="text-[0.625rem] uppercase tracking-[0.28em] text-white/70">
                            {project.label}
                          </p>
                          <p className="s-display mt-2.5 text-[1.375rem] font-light text-white">
                            {project.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    <figcaption className="mt-6">
                      <p className="text-[0.625rem] uppercase tracking-[0.28em] text-[var(--s-grey)]">
                        {project.label}
                      </p>
                      <h3 className="s-display mt-2.5 text-[1.25rem] font-light tracking-[-0.005em]">
                        {project.name}
                      </h3>
                      <p className="mt-3 max-w-lg text-[0.9375rem] font-light leading-[1.8] text-[var(--s-grey)]">
                        {project.concept}
                      </p>
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>
        </SampleSection>

        {/* --- Process ------------------------------------------------------
            The shared connector motif, drawn as a single hairline in taupe. */}
        <SampleSection id="process" tone="surface" size="loose">
          <Reveal>
            <SampleEyebrow tone="grey">
              {interior.process.eyebrow}
            </SampleEyebrow>
            <h2 className="s-display mt-5 max-w-xl text-[1.75rem] font-light leading-[1.2] tracking-[-0.01em] sm:text-[2.25rem]">
              {interior.process.heading}
            </h2>
            <p className="mt-5 max-w-lg font-light leading-[1.85] text-[var(--s-grey)]">
              {interior.process.sub}
            </p>
          </Reveal>

          <div className="relative mt-16 md:mt-20">
            <InView
              as="span"
              aria-hidden="true"
              className="s-connector absolute left-0 top-0 hidden h-px w-full bg-[var(--s-primary)]/45 md:block"
            />

            <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
              {interior.process.steps.map((step, index) => (
                <Reveal
                  as="li"
                  key={step.title}
                  delay={index * 120}
                  className="relative md:pt-10"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 hidden h-6 w-px bg-[var(--s-primary)]/45 md:block"
                  />
                  <p className="s-display text-[1.75rem] font-light leading-none text-[var(--s-primary)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="s-display mt-5 text-[1.0625rem] font-normal">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[0.625rem] uppercase tracking-[0.28em] text-[var(--s-grey)]">
                    {step.note}
                  </p>
                  <p className="mt-4 text-[0.9375rem] font-light leading-[1.8] text-[var(--s-grey)]">
                    {step.body}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </SampleSection>

        {/* --- Services ----------------------------------------------------- */}
        <SampleSection id="services">
          <Reveal>
            <SampleEyebrow tone="grey">
              {interior.services.eyebrow}
            </SampleEyebrow>
            <h2 className="s-display mt-5 max-w-xl text-[1.75rem] font-light leading-[1.2] tracking-[-0.01em] sm:text-[2.25rem]">
              {interior.services.heading}
            </h2>
          </Reveal>

          <dl className="mt-14 border-t border-[var(--s-hair)]">
            {interior.services.items.map((service, index) => (
              <Reveal key={service.name} delay={index * 90}>
                <div className="grid gap-3 border-b border-[var(--s-hair)] py-8 md:grid-cols-[0.8fr_1.2fr] md:gap-10 md:py-10">
                  <dt className="s-display text-[1.1875rem] font-light">
                    {service.name}
                  </dt>
                  <dd className="max-w-xl text-[0.9375rem] font-light leading-[1.8] text-[var(--s-grey)]">
                    {service.body}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </SampleSection>

        {/* --- Material interlude ------------------------------------------- */}
        <section className="bg-[var(--s-bg)] pb-6">
          <Reveal>
            <div className="relative aspect-[16/9] w-full lg:aspect-[21/9]">
              <Image
                src={interiorMedia.detail.src}
                alt={interiorMedia.detail.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <SampleContainer>
              <p className="mt-4 text-[0.625rem] uppercase tracking-[0.28em] text-[var(--s-grey)]">
                {interior.about.detailCaption}
              </p>
            </SampleContainer>
          </Reveal>
        </section>

        {/* --- About -------------------------------------------------------- */}
        <SampleSection id="about" size="loose">
          <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={interiorMedia.designer.src}
                  alt={interiorMedia.designer.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <SampleEyebrow tone="grey">
                {interior.about.eyebrow}
              </SampleEyebrow>
              <h2 className="s-display mt-5 text-[1.75rem] font-light leading-[1.2] tracking-[-0.01em] sm:text-[2.25rem]">
                {interior.about.heading}
              </h2>

              {interior.about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-6 max-w-xl font-light leading-[1.9] text-[var(--s-grey)]"
                >
                  {paragraph}
                </p>
              ))}

              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--s-hair)] pt-7">
                {interior.about.facts.map((fact) => (
                  <li
                    key={fact}
                    className="text-[0.625rem] uppercase tracking-[0.28em] text-[var(--s-grey)]"
                  >
                    {fact}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </SampleSection>

        {/* --- Contact ------------------------------------------------------ */}
        <SampleSection id="contact" tone="surface" size="loose">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <Reveal>
              <SampleEyebrow tone="grey">
                {interior.contact.eyebrow}
              </SampleEyebrow>
              <h2 className="s-display mt-5 text-[1.75rem] font-light leading-[1.2] tracking-[-0.01em] sm:text-[2.25rem]">
                {interior.contact.heading}
              </h2>
              <p className="mt-5 max-w-md font-light leading-[1.85] text-[var(--s-grey)]">
                {interior.contact.sub}
              </p>

              <div className="mt-10">
                <SampleLeadForm
                  submitLabel={interior.contact.submit}
                  successTitle={interior.contact.successTitle}
                  successBody={interior.contact.successBody}
                  note={interior.contact.note}
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
                      name: "project",
                      label: "Project type",
                      required: true,
                      options: interior.contact.projectTypes,
                    },
                    {
                      kind: "select",
                      name: "budget",
                      label: "Budget range (optional)",
                      options: interior.contact.budgets,
                    },
                  ]}
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <SampleEyebrow tone="grey">
                {interior.contact.studioEyebrow}
              </SampleEyebrow>

              <address className="mt-6 block font-light not-italic leading-[1.9] text-[var(--s-grey)]">
                {interior.contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <p className="mt-3 text-[0.625rem] uppercase tracking-[0.28em] text-[var(--s-grey)]">
                {interior.contact.hours}
              </p>

              <div className="mt-8 space-y-4 border-t border-[var(--s-hair)] pt-8">
                <p>
                  <a
                    href={interior.contact.phoneHref}
                    className="s-display text-[1.125rem] font-light text-[var(--s-ink)] underline-offset-4 hover:underline"
                  >
                    {interior.contact.phoneLabel}
                  </a>
                </p>
                <p>
                  <a
                    href={interior.contact.whatsappHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[0.9375rem] font-light text-[var(--s-primary)] underline-offset-4 hover:underline"
                  >
                    {interior.contact.whatsappLabel}
                  </a>
                </p>
                <div>
                  <a
                    href={interior.contact.instagramHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[0.9375rem] font-light text-[var(--s-accent)] underline-offset-4 hover:underline"
                  >
                    {interior.contact.instagramLabel}
                  </a>
                  <p className="mt-1.5 max-w-xs text-[0.8125rem] font-light leading-[1.7] text-[var(--s-grey)]">
                    {interior.contact.instagramNote}
                  </p>
                </div>
              </div>

              <SampleMap
                lat={interior.contact.coords.lat}
                lon={interior.contact.coords.lon}
                label={interior.contact.mapLabel}
                className="mt-10 h-56"
              />
            </Reveal>
          </div>
        </SampleSection>

        {/* --- Closing CTA -------------------------------------------------- */}
        <section className="bg-[var(--s-bg)] pb-28 pt-24 md:pb-36 md:pt-32">
          <SampleContainer>
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="s-display text-[1.625rem] font-light leading-[1.25] tracking-[-0.01em] sm:text-[2.125rem]">
                  {interior.bottomCta.heading}
                </h2>
                <div className="mt-9 flex justify-center">
                  <SampleButton href="#contact" variant="accent" size="lg">
                    {interior.bottomCta.cta}
                  </SampleButton>
                </div>
              </div>
            </Reveal>
          </SampleContainer>
        </section>
      </main>

      <SampleFooter
        brand={interior.business}
        blurb={interior.footer.blurb}
        legal={interior.footer.legal}
        variant="centered"
        columns={[
          {
            title: "Studio",
            items: [
              { label: "Portfolio", href: "#portfolio" },
              { label: "Process", href: "#process" },
              { label: "Services", href: "#services" },
              { label: "About Aarti Kadam", href: "#about" },
            ],
          },
          {
            title: "Contact",
            items: [
              { label: interior.contact.address.join(", ") },
              {
                label: interior.contact.phoneLabel,
                href: interior.contact.phoneHref,
              },
              {
                label: interior.contact.instagramLabel,
                href: interior.contact.instagramHref,
              },
            ],
          },
        ]}
      />
    </SampleFrame>
  );
}
