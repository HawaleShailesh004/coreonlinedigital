import type { Metadata } from "next";
import Image from "next/image";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { clinic } from "@/lib/samples/clinic";
import { clinicMedia } from "@/lib/samples/media";

export const metadata: Metadata = {
  title: "Doctor | Meridian",
  description:
    "Meet Dr. Aditya Rao - MBBS, MD General Medicine - at Meridian Family Clinic in Thane.",
};

export default function ClinicDoctorPage() {
  return (
    <main id="main">
      <SampleSection>
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-16">
          <Reveal>
            <div className="relative">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-[var(--s-radius-lg)]"
                style={{ boxShadow: "var(--s-shadow)" }}
              >
                <Image
                  src={clinicMedia.doctor.src}
                  alt={clinicMedia.doctor.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div
                className="absolute -bottom-6 -right-4 hidden w-44 overflow-hidden rounded-[var(--s-radius)] border-4 border-[var(--s-bg)] sm:block"
                style={{ boxShadow: "var(--s-shadow)" }}
              >
                <Image
                  src={clinicMedia.consult.src}
                  alt={clinicMedia.consult.alt}
                  width={352}
                  height={264}
                  sizes="176px"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SampleEyebrow>{clinic.doctorPage.eyebrow}</SampleEyebrow>
              <h1 className="s-display mt-4 text-[2.25rem] font-semibold tracking-[-0.02em] sm:text-[2.75rem]">
                {clinic.doctorPage.heading}
              </h1>
              <p className="mt-2 text-sm font-medium text-[var(--s-primary)]">
                {clinic.doctor.credentials}
              </p>
              <p className="mt-4 max-w-xl text-[var(--s-grey)]">
                {clinic.doctorPage.sub}
              </p>

              {clinic.doctor.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-5 max-w-xl leading-[1.75] text-[var(--s-grey)]"
                >
                  {paragraph}
                </p>
              ))}

              <dl className="mt-9 grid max-w-md grid-cols-3 gap-4">
                {clinic.doctor.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[var(--s-radius)] bg-[var(--s-surface)] px-4 py-3.5"
                  >
                    <dt className="s-display text-lg font-semibold">
                      {stat.value}
                    </dt>
                    <dd className="mt-0.5 text-xs text-[var(--s-grey)]">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={200}>
              <blockquote className="mt-10 rounded-[var(--s-radius-lg)] bg-[var(--s-surface)] px-6 py-7 sm:px-8">
                <p className="s-display text-[1.125rem] font-medium italic leading-[1.65] text-[var(--s-ink)] sm:text-[1.25rem]">
                  “{clinic.doctor.quote}”
                </p>
                <footer className="mt-4 text-sm text-[var(--s-grey)]">
                  — Dr. Aditya Rao
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-10">
                <SampleButton href="/samples/clinic/book" size="lg">
                  Book with Dr. Rao
                </SampleButton>
              </div>
            </Reveal>
          </div>
        </div>
      </SampleSection>
    </main>
  );
}
