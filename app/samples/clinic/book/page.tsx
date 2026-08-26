import type { Metadata } from "next";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleLeadForm } from "@/components/samples/SampleLeadForm";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { clinic } from "@/lib/samples/clinic";

export const metadata: Metadata = {
  title: "Book | Meridian",
  description:
    "Request an appointment at Meridian Family Clinic. Confirmed on WhatsApp within a few hours.",
};

const serviceOptions = clinic.services.items.map((item) => item.name);

export default async function ClinicBookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = params.service;
  const requested = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : "";
  const matched = serviceOptions.find(
    (name) => name.toLowerCase() === requested?.toLowerCase(),
  );
  const defaultValues = matched ? { service: matched } : undefined;

  return (
    <main id="main">
      <SampleSection>
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <SampleEyebrow>{clinic.bookPage.eyebrow}</SampleEyebrow>
            <h1 className="s-display mt-4 text-[2.25rem] font-semibold tracking-[-0.02em] sm:text-[2.75rem]">
              {clinic.bookPage.heading}
            </h1>
            <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.75] text-[var(--s-grey)]">
              {clinic.bookPage.sub}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div
              className="mt-10 rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6 sm:p-8"
              style={{ boxShadow: "var(--s-shadow)" }}
            >
              <SampleLeadForm
                submitLabel={clinic.booking.submit}
                successTitle={clinic.booking.successTitle}
                successBody={clinic.booking.successBody}
                note={clinic.booking.note}
                defaultValues={defaultValues}
                fields={[
                  {
                    kind: "text",
                    name: "name",
                    label: "Patient name",
                    placeholder: "Full name",
                    required: true,
                  },
                  {
                    kind: "tel",
                    name: "phone",
                    label: "Phone",
                    placeholder: "10-digit mobile",
                    required: true,
                  },
                  {
                    kind: "select",
                    name: "service",
                    label: "Service",
                    required: true,
                    options: serviceOptions,
                    full: true,
                  },
                  {
                    kind: "date",
                    name: "date",
                    label: "Preferred date",
                  },
                  {
                    kind: "select",
                    name: "slot",
                    label: "Preferred time",
                    options: [
                      "Morning (9 AM – 1 PM)",
                      "Evening (5 PM – 9 PM)",
                      "Saturday morning",
                    ],
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
