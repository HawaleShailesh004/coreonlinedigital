import type { Metadata } from "next";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleMap } from "@/components/samples/SampleMap";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { coaching } from "@/lib/samples/coaching";

export const metadata: Metadata = {
  title: "Contact | Summit Prep",
  description:
    "Visit Summit Prep in Naupada, Thane - address, phone, WhatsApp, office hours and batch timing overview.",
};

const heading =
  "s-display text-[2rem] font-semibold tracking-[-0.02em] sm:text-[2.75rem]";

export default function CoachingContactPage() {
  return (
    <main id="main">
      <SampleSection size="tight">
        <Reveal>
          <SampleEyebrow>{coaching.contact.eyebrow}</SampleEyebrow>
          <h1 className={`${heading} mt-4 max-w-2xl`}>
            {coaching.contact.heading}
          </h1>
          <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.75] text-[var(--s-grey)]">
            {coaching.contact.sub}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <Reveal>
            <div
              className="rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6 sm:p-8"
              style={{ boxShadow: "var(--s-shadow)" }}
            >
              <h2 className="s-display text-[1.25rem] font-semibold">
                Summit Prep
              </h2>

              <address className="mt-6 not-italic leading-[1.8] text-[var(--s-grey)]">
                {coaching.contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <div className="mt-6 flex flex-wrap gap-3">
                <SampleButton href={coaching.contact.phoneHref} size="sm">
                  {coaching.contact.phoneLabel}
                </SampleButton>
                <SampleButton
                  href={coaching.contact.whatsappHref}
                  external
                  size="sm"
                  variant="outline"
                >
                  {coaching.contact.whatsappLabel}
                </SampleButton>
              </div>

              <table className="mt-10 w-full text-sm">
                <caption className="mb-3 text-left text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-grey)]">
                  Office hours
                </caption>
                <tbody>
                  {coaching.contact.officeHours.map((row) => (
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

              <div className="mt-10">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-grey)]">
                  Batch timing overview
                </p>
                <ul className="mt-4 space-y-4">
                  {coaching.contact.batchOverview.map((block) => (
                    <li
                      key={block.label}
                      className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-b border-[var(--s-hair)] pb-4 last:border-0 last:pb-0"
                    >
                      <span className="font-medium">{block.label}</span>
                      <span className="text-right tabular-nums text-[var(--s-primary)]">
                        {block.time}
                      </span>
                      <span className="col-span-2 text-sm text-[var(--s-grey)]">
                        {block.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <SampleButton href="/samples/coaching/enroll">
                  Book a free demo
                </SampleButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SampleMap
              lat={coaching.contact.coords.lat}
              lon={coaching.contact.coords.lon}
              label="Summit Prep, Naupada, Thane"
              className="h-[28rem] min-h-80 md:h-full"
            />
          </Reveal>
        </div>
      </SampleSection>
    </main>
  );
}
