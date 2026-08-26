import type { Metadata } from "next";
import Image from "next/image";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { gym } from "@/lib/samples/gym";
import { gymMedia } from "@/lib/samples/media";

export const metadata: Metadata = {
  title: "Trainers · Forge Strength Co.",
  description:
    "Meet the certified coaches at Forge Strength Co. in Thane — strength, group classes, personal training and nutrition.",
};

const heading =
  "s-display text-[2rem] uppercase leading-[0.95] tracking-[0.01em] sm:text-[2.75rem]";

export default function GymTrainersPage() {
  return (
    <main id="main">
      <SampleSection size="tight">
        <Reveal>
          <SampleEyebrow tone="accent">{gym.trainers.eyebrow}</SampleEyebrow>
          <h1 className={`${heading} mt-4 max-w-2xl`}>
            {gym.trainers.heading}
          </h1>
          <p className="mt-4 max-w-lg text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
            {gym.trainers.pageSub}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {gym.trainers.people.map((person, index) => (
            <Reveal key={person.name} delay={index * 70}>
              <article className="s-zoom group flex h-full flex-col border border-[var(--s-hair)] bg-[#161616] transition-transform duration-[120ms] hover:-translate-y-1">
                <div className="relative aspect-[5/4] overflow-hidden sm:aspect-square lg:aspect-[5/4]">
                  <Image
                    src={gymMedia.trainers[index]!.src}
                    alt={gymMedia.trainers[index]!.alt}
                    fill
                    sizes="(min-width: 640px) 45vw, 100vw"
                    className="object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h2 className="s-display text-xl uppercase tracking-[0.02em]">
                    {person.name}
                  </h2>
                  <p className="mt-1.5 text-[0.8125rem] uppercase tracking-[0.12em] text-[var(--s-accent)]">
                    {person.specialization}
                  </p>
                  <p className="mt-4 flex-1 text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                    {person.bio}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {person.certifications.map((cert) => (
                      <li
                        key={cert}
                        className="border border-[var(--s-hair)] px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.1em] text-[var(--s-grey)]"
                      >
                        {cert}
                      </li>
                    ))}
                  </ul>
                  <SampleButton
                    href={`/samples/gym/contact?trainer=${encodeURIComponent(person.name)}`}
                    variant="outline"
                    className="mt-7 w-full"
                  >
                    Book a session with {person.name.split(" ")[0]}
                  </SampleButton>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </SampleSection>
    </main>
  );
}
