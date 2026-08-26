import Image from "next/image";
import Link from "next/link";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { gym } from "@/lib/samples/gym";
import { gymMedia } from "@/lib/samples/media";

/** Headings here are set in a condensed display face, so they read as shouted. */
const heading =
  "s-display text-[2rem] uppercase leading-[0.95] tracking-[0.01em] sm:text-[2.75rem]";

export default function GymHomePage() {
  return (
    <main id="main">
      {/* --- Hero: full-bleed action shot below the solid nav ---------------- */}
      <section className="relative isolate flex min-h-[38rem] items-end overflow-hidden pb-16 pt-16 md:min-h-[42rem] md:pt-20">
        <Image
          src={gymMedia.hero.src}
          alt={gymMedia.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
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
            <SampleButton
              href="/samples/gym/contact"
              size="lg"
              className="s-pulse"
            >
              {gym.hero.primaryCta}
            </SampleButton>
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

      {/* --- Programs teaser ------------------------------------------------- */}
      <SampleSection size="tight">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SampleEyebrow tone="accent">{gym.programs.eyebrow}</SampleEyebrow>
              <h2 className={`${heading} mt-4 max-w-xl`}>
                {gym.programs.heading}
              </h2>
            </div>
            <Link
              href="/samples/gym/programs"
              className="s-mono text-[0.75rem] uppercase tracking-[0.12em] text-[var(--s-accent)] underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              See all programs
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gym.programs.items.map((program, index) => (
            <Reveal key={program.name} delay={index * 60}>
              <Link
                href="/samples/gym/programs"
                className="s-zoom group block h-full border border-[var(--s-hair)] bg-[#161616] transition-transform duration-[120ms] hover:-translate-y-1"
              >
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
                    {program.teaser}
                  </p>
                  <p className="s-mono mt-4 text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--s-accent)]">
                    {program.timing}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </SampleSection>

      {/* --- Why train here -------------------------------------------------- */}
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

      {/* --- Trainers teaser ------------------------------------------------- */}
      <SampleSection size="tight">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SampleEyebrow tone="accent">
                {gym.trainers.eyebrow}
              </SampleEyebrow>
              <h2 className={`${heading} mt-4`}>{gym.trainers.heading}</h2>
            </div>
            <Link
              href="/samples/gym/trainers"
              className="s-mono text-[0.75rem] uppercase tracking-[0.12em] text-[var(--s-accent)] underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Meet the team
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {gym.trainers.people.slice(0, 3).map((person, index) => (
            <Reveal key={person.name} delay={index * 60}>
              <Link href="/samples/gym/trainers" className="s-zoom group block">
                <figure>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={gymMedia.trainers[index]!.src}
                      alt={gymMedia.trainers[index]!.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, 48vw"
                      className="object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                    />
                  </div>
                  <figcaption className="mt-3.5">
                    <p className="s-display text-[0.9375rem] uppercase tracking-[0.02em]">
                      {person.name}
                    </p>
                    <p className="mt-1 text-[0.8125rem] text-[var(--s-grey)]">
                      {person.specialization}
                    </p>
                  </figcaption>
                </figure>
              </Link>
            </Reveal>
          ))}
        </div>
      </SampleSection>

      {/* --- Closing CTA ----------------------------------------------------- */}
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
              <SampleButton
                href="/samples/gym/contact"
                size="lg"
                className="s-pulse"
              >
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
  );
}
