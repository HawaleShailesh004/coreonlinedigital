import type { Metadata } from "next";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleSection } from "@/components/samples/SampleSection";
import { InView } from "@/components/samples/InView";
import { Reveal } from "@/components/ui/Reveal";
import { coaching } from "@/lib/samples/coaching";

export const metadata: Metadata = {
  title: "Courses | Summit Prep",
  description:
    "JEE, NEET and Class 11–12 board batches at Summit Prep, Thane — schedules, duration and transparent fees.",
};

const heading =
  "s-display text-[2rem] font-semibold tracking-[-0.02em] sm:text-[2.75rem]";

export default function CoachingCoursesPage() {
  return (
    <main id="main">
      <SampleSection size="tight">
        <Reveal>
          <SampleEyebrow>{coaching.courses.eyebrow}</SampleEyebrow>
          <h1 className={`${heading} mt-4 max-w-3xl`}>
            {coaching.courses.pageHeading}
          </h1>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-[1.75] text-[var(--s-grey)]">
            {coaching.courses.pageSub}
          </p>
        </Reveal>

        <ul className="mt-14 space-y-8">
          {coaching.courses.items.map((course, index) => (
            <Reveal as="li" key={course.slug} delay={index * 50}>
              <article
                id={course.slug}
                className="scroll-mt-28 rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6 sm:p-8"
                style={{ boxShadow: "var(--s-shadow)" }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-2xl">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-accent)]">
                      {course.target}
                    </p>
                    <h2 className="s-display mt-2 text-[1.375rem] font-semibold tracking-[-0.015em]">
                      {course.name}
                    </h2>
                    <p className="mt-2 text-sm text-[var(--s-grey)]">
                      {course.duration}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="s-display text-[1.75rem] font-semibold leading-none text-[var(--s-primary)]">
                      {course.fee}
                    </p>
                    <p className="mt-2 text-xs text-[var(--s-grey)]">
                      {course.feeNote}
                    </p>
                  </div>
                </div>

                <p className="mt-5 max-w-3xl leading-[1.75] text-[var(--s-grey)]">
                  {course.body}
                </p>

                <div className="mt-8 overflow-hidden rounded-[var(--s-radius)] border border-[var(--s-hair)]">
                  <table className="w-full text-sm">
                    <caption className="border-b border-[var(--s-hair)] bg-[var(--s-surface)] px-4 py-3 text-left text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-grey)]">
                      Weekly schedule
                    </caption>
                    <tbody>
                      {course.schedule.map((row, rowIndex) => (
                        <InView
                          as="tr"
                          key={`${course.slug}-${row.day}`}
                          delay={rowIndex * 40}
                          className="border-b border-[var(--s-hair)] last:border-0"
                        >
                          <th
                            scope="row"
                            className="px-4 py-3.5 text-left font-medium"
                          >
                            {row.day}
                          </th>
                          <td className="px-4 py-3.5 text-right text-[var(--s-grey)]">
                            {row.time}
                          </td>
                        </InView>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-7">
                  <SampleButton
                    href={`/samples/coaching/enroll?course=${encodeURIComponent(course.name)}`}
                    size="sm"
                  >
                    Book a demo class
                  </SampleButton>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </SampleSection>
    </main>
  );
}
