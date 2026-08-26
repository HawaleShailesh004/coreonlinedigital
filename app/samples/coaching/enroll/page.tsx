import type { Metadata } from "next";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleLeadForm } from "@/components/samples/SampleLeadForm";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { coaching, coachingCourseOptions } from "@/lib/samples/coaching";

export const metadata: Metadata = {
  title: "Enroll | Summit Prep",
  description:
    "Book a free demo class at Summit Prep, Thane - student details, preferred batch and demo date.",
};

const heading =
  "s-display text-[2rem] font-semibold tracking-[-0.02em] sm:text-[2.75rem]";

type SearchParams = Promise<{
  course?: string | string[];
}>;

function one(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function CoachingEnrollPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const requested = one(params.course) ?? "";
  const matched = coachingCourseOptions.find(
    (name) => name.toLowerCase() === requested.toLowerCase(),
  );
  const defaultValues = matched ? { course: matched } : undefined;

  return (
    <main id="main">
      <SampleSection size="tight">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <Reveal>
              <SampleEyebrow>{coaching.enroll.eyebrow}</SampleEyebrow>
              <h1 className={`${heading} mt-4`}>{coaching.enroll.heading}</h1>
              <p className="mt-4 max-w-md text-[1.0625rem] leading-[1.75] text-[var(--s-grey)]">
                {coaching.enroll.sub}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-10">
                <SampleEyebrow>{coaching.enroll.process.eyebrow}</SampleEyebrow>
                <h2 className="s-display mt-3 text-xl font-semibold">
                  {coaching.enroll.process.heading}
                </h2>
                <ol className="mt-8 space-y-6">
                  {coaching.enroll.process.steps.map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="s-display flex size-9 shrink-0 items-center justify-center rounded-[var(--s-radius)] bg-[var(--s-primary)] text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <div>
                        <p className="s-display font-semibold">{step.title}</p>
                        <p className="mt-1.5 text-sm leading-[1.7] text-[var(--s-grey)]">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div
              className="rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6 sm:p-8"
              style={{ boxShadow: "var(--s-shadow)" }}
            >
              {matched && (
                <p className="mb-6 rounded-[var(--s-radius)] border border-[var(--s-accent)]/40 bg-[var(--s-accent)]/10 px-4 py-3 text-sm text-[var(--s-ink)]">
                  Demo requested for{" "}
                  <span className="font-semibold">{matched}</span>
                </p>
              )}

              <SampleLeadForm
                submitLabel={coaching.enroll.form.submit}
                successTitle={coaching.enroll.form.successTitle}
                successBody={coaching.enroll.form.successBody}
                note={coaching.enroll.form.note}
                defaultValues={defaultValues}
                fields={[
                  {
                    kind: "text",
                    name: "student",
                    label: "Student name",
                    placeholder: "Full name",
                    required: true,
                  },
                  {
                    kind: "text",
                    name: "parent",
                    label: "Parent name",
                    placeholder: "If student is under 18",
                  },
                  {
                    kind: "tel",
                    name: "phone",
                    label: "Phone",
                    placeholder: "10-digit mobile",
                    required: true,
                    full: true,
                  },
                  {
                    kind: "select",
                    name: "course",
                    label: "Course / batch",
                    required: true,
                    options: coachingCourseOptions,
                    full: true,
                  },
                  {
                    kind: "date",
                    name: "demoDate",
                    label: "Preferred demo date",
                    required: true,
                    full: true,
                  },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </SampleSection>
    </main>
  );
}
