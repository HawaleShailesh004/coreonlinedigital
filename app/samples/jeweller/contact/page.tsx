import type { Metadata } from "next";
import Image from "next/image";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleLeadForm } from "@/components/samples/SampleLeadForm";
import { SampleMap } from "@/components/samples/SampleMap";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { jeweller } from "@/lib/samples/jeweller";

export const metadata: Metadata = {
  title: "Visit · Vasant & Sons",
  description:
    "Book a private viewing at Vasant & Sons on Ram Maruti Road, Thane - hours, map, WhatsApp and call.",
};

export default function JewellerContactPage() {
  const page = jeweller.contactPage;

  return (
    <main id="main">
      <SampleSection size="tight">
        <Reveal>
          <SampleEyebrow tone="accent" className="tracking-[0.3em]">
            {page.eyebrow}
          </SampleEyebrow>
          <h1 className="s-display mt-5 max-w-2xl text-[2.25rem] font-normal leading-[1.12] sm:text-[3rem]">
            {page.heading}
          </h1>
          <p className="mt-5 max-w-xl font-light leading-[1.85] text-[var(--s-grey)]">
            {page.sub}
          </p>
        </Reveal>
      </SampleSection>

      <SampleSection size="default">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--s-radius-lg)]">
              <Image
                src={jeweller.visit.showroomImage.src}
                alt={jeweller.visit.showroomImage.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--s-grey)]">
              {jeweller.visit.showroomCaption}
            </p>

            <h2 className="s-display mt-10 text-[1.5rem] font-normal">
              {jeweller.visit.heading}
            </h2>
            <p className="mt-4 max-w-md font-light leading-[1.85] text-[var(--s-grey)]">
              {jeweller.visit.sub}
            </p>

            <address className="mt-8 not-italic font-light leading-[1.9] text-[var(--s-grey)]">
              {jeweller.visit.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>

            <div className="mt-7 flex flex-wrap gap-3">
              <SampleButton href={jeweller.visit.phoneHref} size="sm">
                {jeweller.visit.phoneLabel}
              </SampleButton>
              <SampleButton
                href={jeweller.visit.whatsappHref}
                external
                size="sm"
                variant="outline"
              >
                {jeweller.visit.whatsappLabel}
              </SampleButton>
            </div>

            <p className="mt-8 max-w-md text-[0.875rem] font-light leading-[1.8] text-[var(--s-grey)]">
              {jeweller.visit.appointmentNote}
            </p>

            <table className="mt-10 w-full text-sm">
              <caption className="mb-4 text-left text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-[var(--s-accent)]">
                Showroom hours
              </caption>
              <tbody>
                {jeweller.visit.hours.map((row) => (
                  <tr
                    key={row.day}
                    className="border-b border-[var(--s-hair)] last:border-0"
                  >
                    <th scope="row" className="py-3.5 text-left font-normal">
                      {row.day}
                    </th>
                    <td className="py-3.5 text-right font-light text-[var(--s-grey)]">
                      {row.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <div className="flex flex-col gap-10">
            <Reveal delay={100}>
              <SampleMap
                lat={jeweller.visit.coords.lat}
                lon={jeweller.visit.coords.lon}
                label="Vasant & Sons, Ram Maruti Road, Thane"
                dark
                className="h-72 sm:h-80"
              />
            </Reveal>

            <Reveal delay={160}>
              <div className="rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] p-6 sm:p-8">
                <h2 className="s-display text-[1.375rem] font-normal">
                  {page.formHeading}
                </h2>
                <p className="mt-3 max-w-md text-[0.9375rem] font-light leading-[1.8] text-[var(--s-grey)]">
                  {page.formSub}
                </p>
                <div className="mt-8">
                  <SampleLeadForm
                    submitLabel={page.submit}
                    successTitle={page.successTitle}
                    successBody={page.successBody}
                    note={page.note}
                    fields={[
                      {
                        kind: "text",
                        name: "name",
                        label: page.fields.name.label,
                        placeholder: page.fields.name.placeholder,
                        required: true,
                      },
                      {
                        kind: "tel",
                        name: "phone",
                        label: page.fields.phone.label,
                        placeholder: page.fields.phone.placeholder,
                        required: true,
                      },
                      {
                        kind: "date",
                        name: "date",
                        label: page.fields.date.label,
                        required: true,
                        full: true,
                      },
                    ]}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </SampleSection>
    </main>
  );
}
