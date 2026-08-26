import type { Metadata } from "next";
import { CountUp } from "@/components/samples/CountUp";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleSection } from "@/components/samples/SampleSection";
import { InView } from "@/components/samples/InView";
import { Reveal } from "@/components/ui/Reveal";
import { coaching } from "@/lib/samples/coaching";

export const metadata: Metadata = {
  title: "Results | Summit Prep",
  description:
    "Batch clearing rates, year-by-year outcomes and named student results from Summit Prep coaching in Thane.",
};

const heading =
  "s-display text-[2rem] font-semibold tracking-[-0.02em] sm:text-[2.75rem]";

export default function CoachingResultsPage() {
  return (
    <main id="main">
      {/* --- Headline stats ------------------------------------------------- */}
      <SampleSection size="tight">
        <Reveal>
          <SampleEyebrow tone="accent">
            {coaching.results.eyebrow}
          </SampleEyebrow>
          <h1 className={`${heading} mt-4 max-w-3xl`}>
            {coaching.results.pageHeading}
          </h1>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-[1.75] text-[var(--s-grey)]">
            {coaching.results.pageSub}
          </p>
        </Reveal>

        <dl className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coaching.results.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 70}>
              <div className="relative overflow-hidden rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-ink)] px-5 py-7 text-[var(--s-bg)]">
                <div
                  className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-[var(--s-primary)]/30"
                  aria-hidden
                />
                <dt className="relative text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white/55">
                  {stat.label}
                </dt>
                <dd className="s-display relative mt-3 text-[2.85rem] font-semibold leading-none tracking-[-0.03em]">
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={1200}
                  />
                </dd>
                <p className="relative mt-3 text-sm leading-snug text-white/55">
                  {stat.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </dl>
      </SampleSection>

      {/* --- Year / batch table --------------------------------------------- */}
      <SampleSection tone="surface" size="tight">
        <Reveal>
          <SampleEyebrow>{coaching.results.table.eyebrow}</SampleEyebrow>
          <h2 className={`${heading} mt-4`}>
            {coaching.results.table.heading}
          </h2>
        </Reveal>

        <div className="mt-10 overflow-x-auto rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)]">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--s-hair)] bg-[var(--s-surface)] text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--s-grey)]">
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Year
                </th>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Batch
                </th>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Enrolled
                </th>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Cleared / Passed
                </th>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Top outcome
                </th>
              </tr>
            </thead>
            <tbody>
              {coaching.results.table.rows.map((row, index) => (
                <InView
                  as="tr"
                  key={`${row.year}-${row.batch}`}
                  delay={index * 45}
                  className="border-b border-[var(--s-hair)] last:border-0"
                >
                  <td className="px-5 py-4 font-semibold text-[var(--s-primary)]">
                    {row.year}
                  </td>
                  <td className="px-5 py-4">{row.batch}</td>
                  <td className="px-5 py-4 tabular-nums text-[var(--s-grey)]">
                    {row.enrolled}
                  </td>
                  <td className="px-5 py-4">
                    <span className="s-display font-semibold tabular-nums">
                      {row.cleared}
                    </span>
                    <span className="text-[var(--s-grey)]">
                      {" "}
                      / {row.enrolled}
                    </span>
                    <span className="ml-2 text-xs text-[var(--s-accent)]">
                      {Math.round((row.cleared / row.enrolled) * 100)}%
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium">{row.topPercentile}</td>
                </InView>
              ))}
            </tbody>
          </table>
        </div>
      </SampleSection>

      {/* --- Student callouts ----------------------------------------------- */}
      <SampleSection size="tight">
        <Reveal>
          <SampleEyebrow>{coaching.results.callouts.eyebrow}</SampleEyebrow>
          <h2 className={`${heading} mt-4 max-w-2xl`}>
            {coaching.results.callouts.heading}
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {coaching.results.callouts.items.map((item, index) => (
            <Reveal as="li" key={item.name} delay={index * 55}>
              <article
                className="h-full rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] border-l-4 border-l-[var(--s-accent)] bg-[var(--s-bg)] p-6"
                style={{ boxShadow: "var(--s-shadow)" }}
              >
                <p className="s-display text-lg font-semibold">{item.name}</p>
                <p className="mt-1.5 text-sm font-semibold text-[var(--s-primary)]">
                  {item.achievement}
                </p>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                  {item.line}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </SampleSection>

      {/* --- Toppers list --------------------------------------------------- */}
      <SampleSection tone="surface" size="tight">
        <Reveal>
          <SampleEyebrow>{coaching.results.toppers.eyebrow}</SampleEyebrow>
          <h2 className={`${heading} mt-4`}>
            {coaching.results.toppers.heading}
          </h2>
        </Reveal>

        <ol className="mt-10 divide-y divide-[var(--s-hair)] border-y border-[var(--s-hair)]">
          {coaching.results.toppers.items.map((item, index) => (
            <Reveal as="li" key={`${item.year}-${item.name}`} delay={index * 40}>
              <div className="grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 py-5 sm:grid-cols-[4.5rem_1fr_auto] sm:gap-8">
                <span className="s-display text-sm font-semibold text-[var(--s-accent)]">
                  {item.year}
                </span>
                <span className="s-display font-semibold">{item.name}</span>
                <span className="text-right text-sm font-medium text-[var(--s-primary)]">
                  {item.result}
                </span>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={200}>
          <div className="mt-12">
            <SampleButton href="/samples/coaching/enroll" size="lg">
              Book a free demo class
            </SampleButton>
          </div>
        </Reveal>
      </SampleSection>
    </main>
  );
}
