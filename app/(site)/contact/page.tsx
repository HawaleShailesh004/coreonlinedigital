import { ContactForm } from "@/components/contact/ContactForm";
import { LineNode } from "@/components/LineNode";
import { WhatsAppAnchor } from "@/components/WhatsAppLink";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { contactPage, site } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const title = "Talk to Me in Thane";
const description =
  "WhatsApp, phone, or leave your number and I'll call back - same day if you reach out before 6pm. Coreline Digital, Wagle Estate, Thane.";

export const metadata = pageMetadata({ title, description, path: "/contact" });

const crumbs = breadcrumbJsonLd([{ name: "Contact", path: "/contact" }]);

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title,
            description,
            path: "/contact",
            type: "ContactPage",
            breadcrumbId: crumbs["@id"],
          }),
          crumbs,
        ]}
      />
      <PageHeader heading={contactPage.heading} sub={contactPage.sub} />

      <Container className="pb-16 md:pb-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            {/* The page had an h1 and nothing else - no landmark between the
                headline and a bare definition list. These two headings are what
                a screen reader tabs between, and what Google pulls when someone
                asks for the phone number or the address directly. */}
            <h2 className="sr-only">Reach me directly</h2>

            <WhatsAppAnchor className="group flex items-center justify-between gap-4 border border-hairline p-6 transition-colors duration-150 ease-linear hover:border-accent">
              <span className="font-display text-base font-medium">
                Message me on WhatsApp
              </span>
              {/* Soft pulsing ring: suggests a live, responsive channel. */}
              <span className="ring-pulse relative flex size-2.5 shrink-0 items-center justify-center rounded-full bg-accent" />
            </WhatsAppAnchor>

            <dl className="mt-10 border-t border-hairline">
              <div className="border-b border-hairline py-6">
                <dt className="font-mono text-label uppercase text-grey">
                  Phone
                </dt>
                <dd className="mt-2">
                  <a
                    href={site.phoneHref}
                    className="font-display text-lg font-medium transition-colors duration-150 ease-linear hover:text-accent"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div className="border-b border-hairline py-6">
                <dt className="font-mono text-label uppercase text-grey">
                  Email
                </dt>
                <dd className="mt-2">
                  <a
                    href={site.emailHref}
                    className="font-display text-lg font-medium break-all transition-colors duration-150 ease-linear hover:text-accent"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="border-b border-hairline py-6">
                <dt className="font-mono text-label uppercase text-grey">
                  Location
                </dt>
                <dd className="mt-2 font-display text-lg font-medium">
                  {site.location}
                  <span className="text-grey">, {site.region}</span>
                </dd>
              </div>
            </dl>

            <div className="mt-10 w-24">
              <LineNode nodes={[100]} tone="hairline" />
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <h2 className="sr-only">Request a call back</h2>
            <ContactForm />
          </div>
        </div>
      </Container>
    </>
  );
}
