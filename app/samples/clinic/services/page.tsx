import type { Metadata } from "next";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { clinic } from "@/lib/samples/clinic";

export const metadata: Metadata = {
  title: "Services | Meridian",
  description:
    "General consultation, diagnostics, follow-up care, and preventive checks at Meridian Family Clinic.",
};

export default function ClinicServicesPage() {
  return (
    <main id="main">
      <SampleSection>
        <Reveal>
          <SampleEyebrow>{clinic.servicesPage.eyebrow}</SampleEyebrow>
          <h1 className="s-display mt-4 max-w-2xl text-[2.25rem] font-semibold tracking-[-0.02em] sm:text-[2.75rem]">
            {clinic.servicesPage.heading}
          </h1>
          <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.75] text-[var(--s-grey)]">
            {clinic.servicesPage.sub}
          </p>
        </Reveal>

        <ul className="mt-14 space-y-8">
          {clinic.services.items.map((service, index) => (
            <Reveal as="li" key={service.slug} delay={index * 60}>
              <article
                id={service.slug}
                className="scroll-mt-28 rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6 sm:p-8"
                style={{ boxShadow: "var(--s-shadow)" }}
              >
                <h2 className="s-display text-[1.375rem] font-semibold tracking-[-0.01em]">
                  {service.name}
                </h2>
                <p className="mt-4 max-w-3xl leading-[1.75] text-[var(--s-grey)]">
                  {service.body}
                </p>
                <div className="mt-6 rounded-[var(--s-radius)] bg-[var(--s-surface)] px-5 py-4">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-grey)]">
                    What to expect
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-[1.7] text-[var(--s-ink)]">
                    {service.expect}
                  </p>
                </div>
                <div className="mt-6">
                  <SampleButton
                    href={`/samples/clinic/book?service=${encodeURIComponent(service.name)}`}
                    size="sm"
                  >
                    Book this service
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
