import type { Metadata } from "next";
import Image from "next/image";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { coaching } from "@/lib/samples/coaching";
import { coachingMedia } from "@/lib/samples/media";

export const metadata: Metadata = {
  title: "Faculty | Summit Prep",
  description:
    "Subject specialists for JEE, NEET and board coaching at Summit Prep, Thane - qualifications, years teaching and credibility.",
};

const heading =
  "s-display text-[2rem] font-semibold tracking-[-0.02em] sm:text-[2.75rem]";

export default function CoachingFacultyPage() {
  return (
    <main id="main">
      <SampleSection size="tight">
        <Reveal>
          <SampleEyebrow>{coaching.faculty.eyebrow}</SampleEyebrow>
          <h1 className={`${heading} mt-4 max-w-3xl`}>
            {coaching.faculty.pageHeading}
          </h1>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-[1.75] text-[var(--s-grey)]">
            {coaching.faculty.pageSub}
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coaching.faculty.people.map((person, index) => (
            <Reveal as="li" key={person.name} delay={index * 60}>
              <article
                className="flex h-full flex-col overflow-hidden rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)]"
                style={{ boxShadow: "var(--s-shadow)" }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--s-surface)]">
                  <Image
                    src={coachingMedia.faculty[index]!.src}
                    alt={coachingMedia.faculty[index]!.alt}
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h2 className="s-display text-lg font-semibold">
                    {person.name}
                  </h2>
                  <p className="mt-1.5 text-sm font-medium text-[var(--s-primary)]">
                    {person.subject}
                  </p>
                  <p className="mt-3 text-sm text-[var(--s-grey)]">
                    {person.qualification}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--s-accent)]">
                    {person.years} years teaching
                  </p>
                  <p className="mt-4 flex-1 border-t border-[var(--s-hair)] pt-4 text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                    {person.credibility}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200}>
          <div className="mt-12 flex flex-wrap gap-3">
            <SampleButton href="/samples/coaching/enroll">
              Book a free demo
            </SampleButton>
            <SampleButton href="/samples/coaching/results" variant="outline">
              See their results
            </SampleButton>
          </div>
        </Reveal>
      </SampleSection>
    </main>
  );
}
