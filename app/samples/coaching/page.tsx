import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/samples/CountUp";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { coaching } from "@/lib/samples/coaching";
import { coachingMedia } from "@/lib/samples/media";

export const metadata: Metadata = {
  title: "Summit Prep · Thane",
  description:
    "JEE, NEET and Class 11–12 board coaching in Thane — measurable results, transparent fees, free demo class.",
};

const heading =
  "s-display text-[1.875rem] font-semibold tracking-[-0.02em] sm:text-[2.35rem]";

const homeCourses = coaching.courses.items.slice(0, 3);
const homeFaculty = coaching.faculty.people.slice(0, 3);
const homeStats = coaching.results.stats.slice(0, 3);

export default function CoachingHomePage() {
  return (
    <main id="main">
      {/* --- Hero ----------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={coachingMedia.hero.src}
            alt={coachingMedia.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(34,27,46,0.92)_0%,rgba(34,27,46,0.78)_48%,rgba(91,58,142,0.45)_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[34rem] w-full max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 md:min-h-[38rem] md:pb-20 md:pt-32">
          <span
            className="hero-step inline-flex w-fit items-center gap-2 rounded-[var(--s-radius)] border border-[var(--s-accent)]/40 bg-[var(--s-accent)]/15 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--s-accent)]"
            style={{ "--step-delay": "0ms" } as React.CSSProperties}
          >
            {coaching.hero.eyebrow}
          </span>

          <h1
            className="hero-step s-display mt-6 max-w-3xl text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.025em] text-white sm:text-[3.5rem]"
            style={{ "--step-delay": "80ms" } as React.CSSProperties}
          >
            {coaching.hero.headline}
          </h1>

          <p
            className="hero-step mt-5 max-w-xl text-[1.0625rem] leading-[1.75] text-white/75"
            style={{ "--step-delay": "160ms" } as React.CSSProperties}
          >
            {coaching.hero.sub}
          </p>

          <div
            className="hero-step mt-9 flex flex-wrap gap-3"
            style={{ "--step-delay": "240ms" } as React.CSSProperties}
          >
            <SampleButton href="/samples/coaching/results" size="lg">
              {coaching.hero.primaryCta}
            </SampleButton>
            <SampleButton
              href="/samples/coaching/enroll"
              size="lg"
              variant="outline"
              className="border-white/35 text-white hover:bg-white/10"
            >
              {coaching.hero.secondaryCta}
            </SampleButton>
          </div>
        </div>
      </section>

      {/* --- Courses teaser ------------------------------------------------- */}
      <SampleSection size="tight">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SampleEyebrow>{coaching.courses.eyebrow}</SampleEyebrow>
              <h2 className={`${heading} mt-4 max-w-2xl`}>
                {coaching.courses.heading}
              </h2>
            </div>
            <Link
              href="/samples/coaching/courses"
              className="text-sm font-medium text-[var(--s-primary)] underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              All courses
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {homeCourses.map((course, index) => (
            <Reveal key={course.slug} delay={index * 70}>
              <article
                className="flex h-full flex-col rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6"
                style={{ boxShadow: "var(--s-shadow)" }}
              >
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-accent)]">
                  {course.target}
                </p>
                <h3 className="s-display mt-3 text-[1.0625rem] font-semibold leading-snug">
                  {course.name}
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                  {course.teaser}
                </p>
                <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-[var(--s-hair)] pt-4">
                  <span className="s-display text-lg font-semibold text-[var(--s-primary)]">
                    {course.fee}
                  </span>
                  <span className="text-xs text-[var(--s-grey)]">
                    {course.duration}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </SampleSection>

      {/* --- Results teaser ------------------------------------------------- */}
      <SampleSection tone="surface" size="tight">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SampleEyebrow tone="accent">
                {coaching.results.eyebrow}
              </SampleEyebrow>
              <h2 className={`${heading} mt-4 max-w-xl`}>
                {coaching.results.heading}
              </h2>
            </div>
            <Link
              href="/samples/coaching/results"
              className="text-sm font-medium text-[var(--s-primary)] underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Full results
            </Link>
          </div>
        </Reveal>

        <dl className="mt-12 grid gap-6 sm:grid-cols-3">
          {homeStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 80}>
              <div className="rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] px-6 py-7">
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-grey)]">
                  {stat.label}
                </dt>
                <dd className="s-display mt-3 text-[2.75rem] font-semibold leading-none tracking-[-0.03em] text-[var(--s-ink)]">
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={1100}
                  />
                </dd>
                <p className="mt-3 text-sm leading-snug text-[var(--s-grey)]">
                  {stat.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </dl>
      </SampleSection>

      {/* --- Faculty teaser ------------------------------------------------- */}
      <SampleSection size="tight">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SampleEyebrow>{coaching.faculty.eyebrow}</SampleEyebrow>
              <h2 className={`${heading} mt-4 max-w-xl`}>
                {coaching.faculty.heading}
              </h2>
            </div>
            <Link
              href="/samples/coaching/faculty"
              className="text-sm font-medium text-[var(--s-primary)] underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Meet faculty
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {homeFaculty.map((person, index) => (
            <Reveal key={person.name} delay={index * 60}>
              <Link
                href="/samples/coaching/faculty"
                className="group block overflow-hidden rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={coachingMedia.faculty[index]!.src}
                    alt={coachingMedia.faculty[index]!.alt}
                    fill
                    sizes="(min-width: 640px) 30vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <p className="s-display font-semibold">{person.name}</p>
                  <p className="mt-1 text-sm text-[var(--s-primary)]">
                    {person.subject}
                  </p>
                  <p className="mt-2 text-xs text-[var(--s-grey)]">
                    {person.years} years teaching
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </SampleSection>

      {/* --- Closing CTA ---------------------------------------------------- */}
      <section className="relative overflow-hidden">
        <Image
          src={coachingMedia.lecture.src}
          alt={coachingMedia.lecture.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#221B2E]/82" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-20 text-center sm:px-8 md:py-28">
          <Reveal>
            <h2 className="s-display mx-auto max-w-2xl text-[1.875rem] font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-[2.5rem]">
              {coaching.bottomCta.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-md text-white/70">
              {coaching.bottomCta.body}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <SampleButton href="/samples/coaching/results" size="lg">
                {coaching.bottomCta.primaryCta}
              </SampleButton>
              <SampleButton
                href="/samples/coaching/enroll"
                size="lg"
                variant="outline"
                className="border-white/35 text-white hover:bg-white/10"
              >
                {coaching.bottomCta.secondaryCta}
              </SampleButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
