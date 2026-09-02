import { WhatsAppButton } from "@/components/WhatsAppLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { pricing, site } from "@/lib/content";

/**
 * The published price, on the home page and again on services.
 *
 * This sits in the slot the old "Templates are rented. Systems are owned."
 * section used to hold. That section argued about a category the buyer does not
 * think in, and it insulted the buyer who currently has a template. Same visual
 * weight, infinitely more useful: a cautious buyer's first two questions are
 * how much and how long, and answering them unprompted is the whole move.
 */
export function Pricing({ bordered = true }: { bordered?: boolean }) {
  return (
    <Section id="pricing" bordered={bordered}>
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Eyebrow>{pricing.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-h2 font-semibold">
            {pricing.heading}
          </h2>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="text-lead text-body">{pricing.body}</p>
        </div>
      </div>

      <Reveal className="mt-16 border-t border-hairline">
        <dl className="grid md:grid-cols-2">
          {pricing.terms.map((term, index) => (
            <div
              key={term.label}
              className={
                // A hairline grid rather than four cards: the restraint is the
                // premium signal, and boxes would make four small claims look
                // like a feature table.
                "flex flex-col gap-3 border-b border-hairline p-8 md:gap-4 md:p-10" +
                (index % 2 === 0 ? " md:border-r" : "")
              }
            >
              <dt className="font-mono text-label uppercase text-grey">
                {term.label}
              </dt>
              <dd className="text-small text-body">
                {term.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
        <WhatsAppButton>
          {site.primaryCta}
        </WhatsAppButton>
        <p className="text-small text-grey">
          Tell me what your business does and I&apos;ll give you the number.
        </p>
      </div>
    </Section>
  );
}
