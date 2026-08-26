import type { Metadata } from "next";
import Image from "next/image";
import { InView } from "@/components/samples/InView";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleLeadForm } from "@/components/samples/SampleLeadForm";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { jeweller } from "@/lib/samples/jeweller";
import { jewellerMedia } from "@/lib/samples/media";

export const metadata: Metadata = {
  title: "Custom Design · Vasant & Sons",
  description:
    "Share an idea, approve a wax model, leave with a hand-finished piece - custom jewellery in Thane.",
};

export default function JewellerCustomPage() {
  const form = jeweller.custom.form;

  return (
    <main id="main">
      <SampleSection size="tight">
        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <SampleEyebrow tone="accent" className="tracking-[0.3em]">
              {jeweller.custom.eyebrow}
            </SampleEyebrow>
            <h1 className="s-display mt-5 max-w-2xl text-[2.25rem] font-normal leading-[1.12] sm:text-[3rem]">
              {jeweller.custom.pageHeading}
            </h1>
            <p className="mt-6 max-w-xl font-light leading-[1.9] text-[var(--s-grey)]">
              {jeweller.custom.pageSub}
            </p>
          </Reveal>

          <InView className="s-settle s-zoom" delay={100}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--s-radius-lg)]">
              <Image
                src={jewellerMedia.custom.src}
                alt={jewellerMedia.custom.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </InView>
        </div>
      </SampleSection>

      {/* Process with gold connector */}
      <SampleSection bordered size="default">
        <Reveal>
          <SampleEyebrow tone="accent" className="tracking-[0.3em]">
            The process
          </SampleEyebrow>
          <h2 className="s-display mt-5 max-w-xl text-[1.75rem] font-normal leading-[1.2] sm:text-[2.25rem]">
            Four steps, nothing cast until you approve.
          </h2>
        </Reveal>

        <div className="relative mt-16 md:mt-20">
          <InView
            as="span"
            aria-hidden="true"
            className="s-connector absolute left-0 top-0 hidden h-px w-full bg-[var(--s-primary)]/50 md:block"
          />

          <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
            {jeweller.custom.steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.title}
                delay={index * 140}
                className="relative md:pt-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 hidden size-2 rounded-full bg-[var(--s-primary)] md:block"
                />
                <p className="text-[0.75rem] tracking-[0.14em] text-[var(--s-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="s-display mt-4 text-[1.125rem] font-normal">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[0.625rem] uppercase tracking-[0.28em] text-[var(--s-grey)]">
                  {step.note}
                </p>
                <p className="mt-4 text-[0.9375rem] font-light leading-[1.8] text-[var(--s-grey)]">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </SampleSection>

      {/* Enquiry form */}
      <SampleSection size="default">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <SampleEyebrow tone="accent" className="tracking-[0.3em]">
              {form.eyebrow}
            </SampleEyebrow>
            <h2 className="s-display mt-5 text-[1.75rem] font-normal leading-[1.2] sm:text-[2.25rem]">
              {form.heading}
            </h2>
            <p className="mt-5 max-w-md font-light leading-[1.85] text-[var(--s-grey)]">
              {form.sub}
            </p>
            <p className="mt-8 text-xs uppercase tracking-[0.18em] text-[var(--s-grey)]">
              Prefer WhatsApp?
            </p>
            <SampleButton
              href={jeweller.visit.whatsappHref}
              external
              size="md"
              variant="outline"
              className="mt-4 border-[var(--s-ink)]/35"
            >
              {jeweller.visit.whatsappLabel}
            </SampleButton>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-[var(--s-radius-lg)] border border-[var(--s-hair)] bg-[var(--s-bg)] p-6 sm:p-8">
              <SampleLeadForm
                submitLabel={form.submit}
                successTitle={form.successTitle}
                successBody={form.successBody}
                note={form.note}
                fields={[
                  {
                    kind: "text",
                    name: "name",
                    label: form.fields.name.label,
                    placeholder: form.fields.name.placeholder,
                    required: true,
                  },
                  {
                    kind: "tel",
                    name: "phone",
                    label: form.fields.phone.label,
                    placeholder: form.fields.phone.placeholder,
                    required: true,
                  },
                  {
                    kind: "textarea",
                    name: "idea",
                    label: form.fields.idea.label,
                    placeholder: form.fields.idea.placeholder,
                    rows: 5,
                    required: true,
                    full: true,
                  },
                  {
                    kind: "file",
                    name: "attachment",
                    label: form.fields.attachment.label,
                    hint: form.fields.attachment.hint,
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
