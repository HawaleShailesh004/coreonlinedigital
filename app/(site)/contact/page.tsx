import { JsonLd } from "@/components/seo/JsonLd";
import { DisplayHeading } from "@/components/v3/DisplayHeading";
import { WhatsAppButton } from "@/components/v3/CtaButtons";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";
import { contactPageCopy, site } from "@/lib/site-content";

const TITLE = "Contact Coreline Digital - Wagle Estate, Thane";
const DESCRIPTION = "WhatsApp us or call - no forms. Wagle Estate, Thane, serving Thane and Mumbai.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/contact" });

/**
 * Single full-viewport emerald panel — heading, sub, WhatsApp + Call only.
 * No address block, hours, socials, or map (those live in the footer).
 */
export default function ContactPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ title: TITLE, description: DESCRIPTION, path: "/contact", type: "ContactPage" })} />

      <section
        className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center py-24 text-center"
        style={{ backgroundColor: "var(--emerald)", color: "var(--emerald-ink)" }}
      >
        <div className="v3-container flex flex-col items-center">
          <DisplayHeading as="h1" width={90} weight={600} className="text-[clamp(2.25rem,7vw,4.5rem)]">
            {contactPageCopy.heading}
          </DisplayHeading>
          <p className="mt-5 max-w-md text-lg opacity-80">{contactPageCopy.sub}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <WhatsAppButton context="the contact page" magnetic variant="on-emerald" className="px-10! py-4! text-base" />
            <a href={site.phoneHref} className="v3-pill v3-pill--outline border-[var(--emerald-ink)]! px-8! py-4! text-base">
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
