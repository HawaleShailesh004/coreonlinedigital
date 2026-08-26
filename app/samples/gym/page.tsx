import type { Metadata } from "next";
import Image from "next/image";
import { Anton } from "next/font/google";
import { ChatWidget } from "@/components/samples/ChatWidget";
import { CountUp } from "@/components/samples/CountUp";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleFooter } from "@/components/samples/SampleFooter";
import { SampleFrame } from "@/components/samples/SampleFrame";
import { SampleLeadForm } from "@/components/samples/SampleLeadForm";
import { SampleMap } from "@/components/samples/SampleMap";
import { SampleNav } from "@/components/samples/SampleNav";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { personas } from "@/lib/samples/chat-personas";
import { gym } from "@/lib/samples/gym";
import { gymMedia } from "@/lib/samples/media";

/** Anton only ships one weight, which is the point: it's loud at every size. */
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sample: Gym & Strength Studio",
  description:
    "Concept build for a gym - transparent membership pricing, free-trial booking and a live AI assistant that answers class timings and books trials.",
};

/** Headings here are set in a condensed display face, so they read as shouted. */
const heading =
  "s-display text-[2rem] uppercase leading-[0.95] tracking-[0.01em] sm:text-[2.75rem]";

/** Height of SampleNav, so the hero can sit under the transparent overlay bar. */
const NAV_H = "74px";

export default function GymSample() {
  return (
    <SampleFrame sample="gym" fontClass={anton.variable}>
      <span id="top" />
      <SampleNav
        brand={gym.business}
        brandNote={gym.brandNote}
        links={gym.nav.links}
        cta={gym.nav.cta}
        overlay
      />

      <main id="main">
        {/* --- Hero: full-bleed action shot, dark-graded ---------------------- */}
        <section
          className="relative isolate flex min-h-[38rem] items-end overflow-hidden pb-16 pt-40 md:min-h-[42rem]"
          style={{ marginTop: `calc(-1 * ${NAV_H})` }}
        >
          <Image
            src={gymMedia.hero.src}
            alt={gymMedia.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Two stacked scrims: one flattens the photo, one anchors the type. */}
          <div className="absolute inset-0 bg-[#101010]/55" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#101010] via-[#101010]/70 to-transparent" />

          <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
            <span
              className="hero-step inline-flex items-center gap-2 border border-[var(--s-accent)]/50 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--s-accent)]"
              style={{ "--step-delay": "0ms" } as React.CSSProperties}
            >
              {gym.hero.eyebrow}
            </span>

            <h1
              className="hero-step s-display mt-6 max-w-3xl text-[2.75rem] uppercase leading-[0.92] tracking-[0.01em] text-[var(--s-ink)] sm:text-[4.5rem]"
              style={{ "--step-delay": "80ms" } as React.CSSProperties}
            >
              {gym.hero.headline.map((line, index) => (
                <span key={line} className="block">
                  {/* The imperative lands in red - it's the only word that matters. */}
                  {index === gym.hero.headline.length - 1 ? (
                    <span className="text-[var(--s-primary)]">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            <p
              className="hero-step mt-6 max-w-xl leading-[1.7] text-[var(--s-grey)]"
              style={{ "--step-delay": "160ms" } as React.CSSProperties}
            >
              {gym.hero.sub}
            </p>

            <div
              className="hero-step mt-9 flex flex-wrap gap-3"
              style={{ "--step-delay": "240ms" } as React.CSSProperties}
            >
              {/* The brief's one intentional looping animation in this sample. */}
              <SampleButton href="#trial" size="lg" className="s-pulse">
                {gym.hero.primaryCta}
              </SampleButton>
              {/* Picked up by ChatWidget's document-level data-open-chat listener. */}
              <SampleButton data-open-chat variant="outline" size="lg">
                {gym.hero.chatCta}
              </SampleButton>
            </div>

            <dl
              className="hero-step mt-12 flex flex-wrap gap-x-12 gap-y-5 border-t border-[var(--s-hair)] pt-7"
              style={{ "--step-delay": "320ms" } as React.CSSProperties}
            >
              {gym.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="s-display text-[1.75rem] uppercase leading-none text-[var(--s-ink)]">
                    {stat.value}
                  </dt>
                  <dd className="mt-1.5 text-xs uppercase tracking-[0.14em] text-[var(--s-grey)]">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* --- Programs ------------------------------------------------------ */}
        <SampleSection id="programs" size="tight" className="scroll-mt-20">
          <Reveal>
            <SampleEyebrow tone="accent">
              {gym.programs.eyebrow}
            </SampleEyebrow>
            <h2 className={`${heading} mt-4 max-w-xl`}>
              {gym.programs.heading}
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gym.programs.items.map((program, index) => (
              <Reveal key={program.name} delay={index * 60}>
                {/* 120ms lift, faster than every other sample - brief's call. */}
                <article className="s-zoom group h-full border border-[var(--s-hair)] bg-[#161616] transition-transform duration-[120ms] hover:-translate-y-1">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={gymMedia.programs[index]!.src}
                      alt={gymMedia.programs[index]!.alt}
                      fill
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
                      className="object-cover brightness-[0.72] contrast-[1.1] grayscale-[0.35] transition-[filter] duration-300 group-hover:brightness-90 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="s-display text-lg uppercase tracking-[0.01em]">
                      {program.name}
                    </h3>
                    <p className="mt-2.5 text-[0.875rem] leading-[1.65] text-[var(--s-grey)]">
                      {program.body}
                    </p>
                    <p className="s-mono mt-4 text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--s-accent)]">
                      {program.timing}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </SampleSection>

        {/* --- Schedule ------------------------------------------------------ */}
        <SampleSection size="tight" bordered>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <SampleEyebrow tone="accent">
                {gym.schedule.eyebrow}
              </SampleEyebrow>
              <h2 className={`${heading} mt-4`}>{gym.schedule.heading}</h2>
              <p className="mt-4 max-w-sm text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                {gym.schedule.sub}
              </p>
              <button
                type="button"
                data-open-chat
                className="s-mono mt-5 text-[0.75rem] uppercase tracking-[0.12em] text-[var(--s-accent)] underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                Ask the assistant
              </button>
            </Reveal>

            <Reveal delay={100}>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--s-hair)]">
                    <th
                      scope="col"
                      className="pb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-grey)]"
                    >
                      Class
                    </th>
                    <th
                      scope="col"
                      className="pb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-grey)]"
                    >
                      Days
                    </th>
                    <th
                      scope="col"
                      className="pb-3 text-right text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-grey)]"
                    >
                      Times
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {gym.schedule.slots.map((slot) => (
                    <tr
                      key={slot.name}
                      className="border-b border-[var(--s-hair)] last:border-0"
                    >
                      <th
                        scope="row"
                        className="s-display py-4 pr-4 text-[0.9375rem] uppercase tracking-[0.02em] font-normal"
                      >
                        {slot.name}
                      </th>
                      <td className="py-4 pr-4 text-sm text-[var(--s-grey)]">
                        {slot.days}
                      </td>
                      <td className="s-mono py-4 text-right text-[0.8125rem] text-[var(--s-ink)]">
                        {slot.times}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </SampleSection>

        {/* --- Membership ----------------------------------------------------
            Pricing is public here on purpose: in this category, hiding the
            number reads as a trap, not as premium. */}
        <SampleSection id="membership" className="scroll-mt-20" bordered>
          <Reveal>
            <SampleEyebrow tone="accent">
              {gym.membership.eyebrow}
            </SampleEyebrow>
            <h2 className={`${heading} mt-4 max-w-2xl`}>
              {gym.membership.heading}
            </h2>
            <p className="mt-4 max-w-lg text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
              {gym.membership.sub}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {gym.membership.plans.map((plan, index) => (
              <Reveal key={plan.name} delay={index * 80}>
                <article
                  className={
                    plan.featured
                      ? "relative h-full border-2 border-[var(--s-primary)] bg-[#171313] p-7 lg:-mt-4 lg:pb-11"
                      : "h-full border border-[var(--s-hair)] bg-[#161616] p-7"
                  }
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-7 bg-[var(--s-accent)] px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-[var(--s-on-accent)]">
                      Most popular
                    </span>
                  )}

                  <h3 className="s-display text-lg uppercase tracking-[0.06em] text-[var(--s-grey)]">
                    {plan.name}
                  </h3>

                  <p className="mt-3 flex items-baseline gap-1.5">
                    <CountUp
                      value={plan.price}
                      prefix="₹"
                      className="s-display text-[2.75rem] leading-none text-[var(--s-ink)]"
                    />
                    <span className="text-xs uppercase tracking-[0.12em] text-[var(--s-grey)]">
                      {plan.cadence}
                    </span>
                  </p>

                  <p className="mt-4 text-[0.875rem] leading-[1.6] text-[var(--s-grey)]">
                    {plan.summary}
                  </p>

                  <ul className="mt-6 space-y-3 border-t border-[var(--s-hair)] pt-6">
                    {plan.includes.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-[0.875rem] leading-[1.55] text-[var(--s-ink)]"
                      >
                        <Tick />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <SampleButton
                    href="#trial"
                    variant={plan.featured ? "primary" : "outline"}
                    className="mt-7 w-full"
                  >
                    Start with a free trial
                  </SampleButton>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={240}>
            <p className="s-mono mt-8 text-[0.75rem] uppercase tracking-[0.1em] text-[var(--s-grey)]">
              {gym.membership.note}
            </p>
          </Reveal>
        </SampleSection>

        {/* --- Why train here: the one light break in the page --------------- */}
        <SampleSection
          tone="surface"
          size="tight"
          className="text-[var(--s-bg)]"
        >
          <Reveal>
            <SampleEyebrow>{gym.why.eyebrow}</SampleEyebrow>
            <h2 className={`${heading} mt-4 max-w-xl`}>{gym.why.heading}</h2>
          </Reveal>

          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {gym.why.points.map((point, index) => (
              <Reveal as="li" key={point.title} delay={index * 80}>
                <span className="s-display block text-[0.8125rem] tracking-[0.2em] text-[var(--s-primary)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="s-display mt-3 text-[1.125rem] uppercase leading-tight">
                  {point.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-[#101010]/65">
                  {point.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </SampleSection>

        {/* --- Trainers ------------------------------------------------------ */}
        <SampleSection id="trainers" size="tight" className="scroll-mt-20">
          <Reveal>
            <SampleEyebrow tone="accent">
              {gym.trainers.eyebrow}
            </SampleEyebrow>
            <h2 className={`${heading} mt-4`}>{gym.trainers.heading}</h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {gym.trainers.people.map((person, index) => (
              <Reveal key={person.name} delay={index * 60}>
                <figure className="s-zoom group">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={gymMedia.trainers[index]!.src}
                      alt={gymMedia.trainers[index]!.alt}
                      fill
                      sizes="(min-width: 1024px) 24vw, 48vw"
                      className="object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                    />
                  </div>
                  <figcaption className="mt-3.5">
                    <p className="s-display text-[0.9375rem] uppercase tracking-[0.02em]">
                      {person.name}
                    </p>
                    <p className="mt-1 text-[0.8125rem] text-[var(--s-grey)]">
                      {person.role}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </SampleSection>

        {/* --- Contact + free trial booking ---------------------------------- */}
        <SampleSection id="contact" className="scroll-mt-20" bordered>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div
                id="trial"
                className="scroll-mt-24 border border-[var(--s-hair)] bg-[#161616] p-6 sm:p-8"
              >
                <SampleEyebrow tone="accent">
                  {gym.contact.eyebrow}
                </SampleEyebrow>
                <h2 className={`${heading} mt-4`}>{gym.contact.heading}</h2>
                <p className="mt-4 max-w-md text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                  {gym.contact.sub}
                </p>

                <div className="mt-6 flex flex-wrap gap-3 border-y border-[var(--s-hair)] py-4">
                  <SampleButton data-open-chat variant="outline" size="sm">
                    Ask the assistant
                  </SampleButton>
                  <p className="max-w-xs text-[0.8125rem] leading-[1.6] text-[var(--s-grey)]">
                    Best for timings, membership questions, and booking the right trial slot.
                  </p>
                </div>

                <div className="mt-8">
                  <SampleLeadForm
                    columns={1}
                    submitLabel={gym.trial.submit}
                    successTitle={gym.trial.successTitle}
                    successBody={gym.trial.successBody}
                    note={gym.trial.note}
                    fields={[
                      {
                        kind: "text",
                        name: "name",
                        label: "Name",
                        placeholder: "Your name",
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
                        name: "slot",
                        label: "Preferred time",
                        required: true,
                        options: [
                          "Early morning (6 – 8 AM)",
                          "Morning (8 – 11 AM)",
                          "Afternoon (11 AM – 4 PM)",
                          "Evening (4 – 7 PM)",
                          "Night (7 – 10 PM)",
                        ],
                      },
                      {
                        kind: "select",
                        name: "goal",
                        label: "What are you training for",
                        options: [
                          "Get stronger",
                          "Lose weight",
                          "Build muscle",
                          "General fitness",
                          "Sport-specific",
                        ],
                      },
                    ]}
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="border border-[var(--s-hair)] bg-[#161616] p-6 sm:p-8">
              <SampleEyebrow tone="accent">Visit</SampleEyebrow>
              <h2 className={`${heading} mt-4`}>Walk in or message first.</h2>
              <address className="not-italic leading-[1.9] text-[var(--s-grey)]">
                {gym.contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <div className="mt-5 flex flex-wrap gap-3">
                <SampleButton href={gym.contact.phoneHref} size="sm">
                  {gym.contact.phoneLabel}
                </SampleButton>
                <SampleButton
                  href={gym.contact.whatsappHref}
                  external
                  size="sm"
                  variant="outline"
                >
                  {gym.contact.whatsappLabel}
                </SampleButton>
              </div>

              <table className="mt-8 w-full text-sm">
                <caption className="mb-3 text-left text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-grey)]">
                  Opening hours
                </caption>
                <tbody>
                  {gym.contact.hours.map((row) => (
                    <tr
                      key={row.day}
                      className="border-b border-[var(--s-hair)] last:border-0"
                    >
                      <th scope="row" className="py-3 text-left font-medium">
                        {row.day}
                      </th>
                      <td className="s-mono py-3 text-right text-[var(--s-grey)]">
                        {row.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <SampleMap
                lat={gym.contact.coords.lat}
                lon={gym.contact.coords.lon}
                label="Forge Strength Co., Wagle Estate, Thane"
                dark
                className="mt-8 h-56"
              />
              </div>
            </Reveal>
          </div>
        </SampleSection>

        {/* --- Closing CTA over the deadlift shot ---------------------------- */}
        <section className="relative overflow-hidden">
          <Image
            src={gymMedia.action.src}
            alt={gymMedia.action.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#101010]/78" />
          <div className="relative mx-auto w-full max-w-6xl px-5 py-24 text-center sm:px-8 md:py-32">
            <Reveal>
              <h2 className="s-display mx-auto max-w-2xl text-[2rem] uppercase leading-[0.95] text-[var(--s-ink)] sm:text-[3rem]">
                {gym.bottomCta.heading}
              </h2>
              <p className="mx-auto mt-5 max-w-md text-[var(--s-grey)]">
                {gym.bottomCta.body}
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <SampleButton href="#trial" size="lg" className="s-pulse">
                  {gym.bottomCta.cta}
                </SampleButton>
                <SampleButton data-open-chat variant="outline" size="lg">
                  {gym.hero.chatCta}
                </SampleButton>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SampleFooter
        brand="Forge Strength Co."
        blurb={gym.footer.blurb}
        legal={gym.footer.legal}
        variant="compact"
        columns={[
          {
            title: "Train",
            items: [
              { label: "Programs", href: "#programs" },
              { label: "Membership", href: "#membership" },
              { label: "Book a free trial", href: "#trial" },
            ],
          },
          {
            title: "Visit",
            items: [
              { label: gym.contact.address.join(", ") },
              { label: gym.contact.phoneLabel, href: gym.contact.phoneHref },
            ],
          },
        ]}
      />

      <ChatWidget persona={personas.gym} />
    </SampleFrame>
  );
}

function Tick() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="mt-[0.3rem] size-3.5 shrink-0 text-[var(--s-accent)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8.5 6.2 11.7 13 5" />
    </svg>
  );
}
