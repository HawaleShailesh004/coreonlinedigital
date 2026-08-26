import type { Metadata } from "next";
import Image from "next/image";
import { InView } from "@/components/samples/InView";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { gym } from "@/lib/samples/gym";
import { gymMedia } from "@/lib/samples/media";

export const metadata: Metadata = {
  title: "Programs · Forge Strength Co.",
  description:
    "Strength training, group classes, personal training and nutrition coaching at Forge in Thane.",
};

const heading =
  "s-display text-[2rem] uppercase leading-[0.95] tracking-[0.01em] sm:text-[2.75rem]";

export default function GymProgramsPage() {
  return (
    <main id="main">
      <SampleSection size="tight">
        <Reveal>
          <SampleEyebrow tone="accent">{gym.programs.eyebrow}</SampleEyebrow>
          <h1 className={`${heading} mt-4 max-w-3xl`}>
            {gym.programs.pageHeading}
          </h1>
          <p className="mt-4 max-w-xl text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
            {gym.programs.pageSub}
          </p>
        </Reveal>
      </SampleSection>

      {gym.programs.items.map((program, index) => {
        const isClasses = program.name === "Group Classes";
        const trialHref = `/samples/gym/contact?program=${encodeURIComponent(program.name)}`;

        return (
          <SampleSection
            key={program.name}
            bordered
            size="tight"
            className="scroll-mt-20"
          >
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
              <Reveal>
                <div className="relative aspect-[4/3] overflow-hidden border border-[var(--s-hair)]">
                  <Image
                    src={gymMedia.programs[index]!.src}
                    alt={gymMedia.programs[index]!.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover brightness-[0.75] contrast-[1.1] grayscale-[0.25]"
                  />
                </div>
              </Reveal>

              <Reveal delay={80}>
                <p className="s-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--s-accent)]">
                  {String(index + 1).padStart(2, "0")} · {program.timing}
                </p>
                <h2 className={`${heading} mt-3`}>{program.name}</h2>
                <p className="mt-5 text-[0.9375rem] leading-[1.75] text-[var(--s-grey)]">
                  {program.body}
                </p>
                <SampleButton href={trialHref} className="mt-8">
                  Book a trial for this program
                </SampleButton>
              </Reveal>
            </div>

            {isClasses && (
              <div className="mt-14 grid gap-10 border-t border-[var(--s-hair)] pt-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
                <Reveal>
                  <SampleEyebrow tone="accent">
                    {gym.schedule.eyebrow}
                  </SampleEyebrow>
                  <h3 className={`${heading} mt-4 text-[1.75rem] sm:text-[2.25rem]`}>
                    {gym.schedule.heading}
                  </h3>
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
                    {gym.schedule.slots.map((slot, rowIndex) => (
                      <InView
                        as="tr"
                        key={slot.name}
                        delay={rowIndex * 70}
                        className="s-pop border-b border-[var(--s-hair)] last:border-0"
                      >
                        <th
                          scope="row"
                          className="s-display py-4 pr-4 text-[0.9375rem] font-normal uppercase tracking-[0.02em]"
                        >
                          {slot.name}
                        </th>
                        <td className="py-4 pr-4 text-sm text-[var(--s-grey)]">
                          {slot.days}
                        </td>
                        <td className="s-mono py-4 text-right text-[0.8125rem] text-[var(--s-ink)]">
                          {slot.times}
                        </td>
                      </InView>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SampleSection>
        );
      })}
    </main>
  );
}
