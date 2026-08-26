import type { Metadata } from "next";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleMap } from "@/components/samples/SampleMap";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { clinic } from "@/lib/samples/clinic";

export const metadata: Metadata = {
  title: "Contact | Meridian",
  description:
    "Find Meridian Family Clinic in Naupada, Thane - address, phone, WhatsApp, and clinic hours.",
};

export default function ClinicContactPage() {
  return (
    <main id="main">
      <SampleSection>
        <Reveal>
          <SampleEyebrow>{clinic.contactPage.eyebrow}</SampleEyebrow>
          <h1 className="s-display mt-4 max-w-2xl text-[2.25rem] font-semibold tracking-[-0.02em] sm:text-[2.75rem]">
            {clinic.contactPage.heading}
          </h1>
          <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.75] text-[var(--s-grey)]">
            {clinic.contactPage.sub}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <Reveal>
            <div
              className="rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6 sm:p-8"
              style={{ boxShadow: "var(--s-shadow)" }}
            >
              <h2 className="s-display text-[1.25rem] font-semibold">
                {clinic.visit.heading}
              </h2>

              <address className="mt-6 not-italic leading-[1.8] text-[var(--s-grey)]">
                {clinic.visit.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <div className="mt-6 flex flex-wrap gap-3">
                <SampleButton href={clinic.visit.phoneHref} size="sm">
                  {clinic.visit.phoneLabel}
                </SampleButton>
                <SampleButton
                  href={clinic.visit.whatsappHref}
                  external
                  size="sm"
                  variant="outline"
                >
                  {clinic.visit.whatsappLabel}
                </SampleButton>
              </div>

              <table className="mt-10 w-full text-sm">
                <caption className="mb-3 text-left text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-grey)]">
                  Clinic hours
                </caption>
                <tbody>
                  {clinic.visit.hours.map((row) => (
                    <tr
                      key={row.day}
                      className="border-b border-[var(--s-hair)] last:border-0"
                    >
                      <th scope="row" className="py-3.5 text-left font-medium">
                        {row.day}
                      </th>
                      <td className="py-3.5 text-right text-[var(--s-grey)]">
                        {row.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-8">
                <SampleButton href="/samples/clinic/book">
                  Book an appointment
                </SampleButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SampleMap
              lat={clinic.visit.coords.lat}
              lon={clinic.visit.coords.lon}
              label="Meridian Family Clinic, Naupada, Thane"
              className="h-[28rem] min-h-80"
            />
          </Reveal>
        </div>
      </SampleSection>
    </main>
  );
}
