import { DisplayHeading } from "@/components/v3/DisplayHeading";
import { WhatsAppButton } from "@/components/v3/CtaButtons";
import { site } from "@/lib/site-content";
import { contactPanelCopy } from "@/lib/site-content";

/**
 * Emerald closing block on every page. Sticky sheet so it pins under the
 * stack gap (rounded corners visible) while the footer slides over it.
 */
export function ContactPanel() {
  return (
    <div className="v3-contact-stack">
      <section className="v3-contact-pin v3-panel v3-panel--emerald v3-panel--rounded">
        <div className="v3-container flex min-h-[calc(100svh-var(--v3-stack-gap))] flex-col items-center justify-center py-28 text-center sm:py-36">
          <DisplayHeading
            as="h2"
            width={90}
            weight={600}
            className="text-[clamp(2rem,5.5vw,3.5rem)]"
          >
            {contactPanelCopy.heading}
          </DisplayHeading>
          <p className="mt-5 max-w-md text-lg opacity-80">{contactPanelCopy.sub}</p>

          <div className="mt-10">
            <WhatsAppButton
              context="the contact panel"
              magnetic
              variant="on-emerald"
              className="px-10! py-4! text-base"
            />
          </div>

          <p className="mt-5 text-sm opacity-70">
            or call{" "}
            <a href={site.phoneHref} className="underline underline-offset-4">
              {site.phone}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
