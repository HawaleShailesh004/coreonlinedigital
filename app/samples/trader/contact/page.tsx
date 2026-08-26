import type { Metadata } from "next";
import { FaqAccordion } from "@/components/samples/TraderStore";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleLeadForm } from "@/components/samples/SampleLeadForm";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { trader } from "@/lib/samples/trader";

export const metadata: Metadata = {
  title: "Contact · Nilaya Home",
  description:
    "WhatsApp support, email, shipping FAQs, and a short contact form for Nilaya Home.",
};

const heading =
  "s-display text-[1.875rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.25rem]";

export default function TraderContactPage() {
  return (
    <main id="main">
      <SampleSection size="tight">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SampleEyebrow>{trader.help.eyebrow}</SampleEyebrow>
            <h1 className={`${heading} mt-3`}>{trader.help.heading}</h1>
            <p className="mt-4 max-w-sm leading-[1.7] text-[var(--s-grey)]">
              {trader.help.sub}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <SampleButton href={trader.help.whatsappHref} external size="sm">
                {trader.help.whatsappLabel}
              </SampleButton>
              <SampleButton data-open-chat variant="outline" size="sm">
                Ask the assistant
              </SampleButton>
            </div>

            <dl className="mt-8 space-y-2 text-[0.875rem]">
              <div className="flex gap-3">
                <dt className="w-16 shrink-0 text-[var(--s-grey)]">Phone</dt>
                <dd>
                  <a
                    href={trader.help.phoneHref}
                    className="underline underline-offset-4 hover:opacity-70"
                  >
                    {trader.help.phoneLabel}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-16 shrink-0 text-[var(--s-grey)]">Email</dt>
                <dd>
                  <a
                    href={`mailto:${trader.help.email}`}
                    className="underline underline-offset-4 hover:opacity-70"
                  >
                    {trader.help.email}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="s-display text-[1.125rem] font-semibold">
              Send a message
            </h2>
            <div className="mt-5">
              <SampleLeadForm
                columns={1}
                submitLabel={trader.help.form.submitLabel}
                successTitle={trader.help.form.successTitle}
                successBody={trader.help.form.successBody}
                note={trader.help.form.note}
                fields={[
                  {
                    kind: "text",
                    name: "name",
                    label: "Name",
                    required: true,
                    full: true,
                  },
                  {
                    kind: "email",
                    name: "email",
                    label: "Email",
                    required: true,
                    full: true,
                  },
                  {
                    kind: "select",
                    name: "topic",
                    label: "Topic",
                    options: [
                      "Order status",
                      "Shipping",
                      "Returns",
                      "Product question",
                      "Something else",
                    ],
                    required: true,
                    full: true,
                  },
                  {
                    kind: "textarea",
                    name: "message",
                    label: "Message",
                    placeholder: "Order number, product name, or your question…",
                    rows: 4,
                    required: true,
                    full: true,
                  },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </SampleSection>

      <SampleSection tone="surface" size="tight">
        <Reveal>
          <SampleEyebrow>FAQ</SampleEyebrow>
          <h2 className={`${heading} mt-3`}>Shipping, returns, payment</h2>
        </Reveal>
        <div className="mt-8 max-w-2xl">
          <FaqAccordion faqs={trader.help.faqs} />
        </div>
      </SampleSection>
    </main>
  );
}
