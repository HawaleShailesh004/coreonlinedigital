import { ContactForm } from "@/components/contact/ContactForm";
import { EmailAnchor } from "@/components/EmailLink";
import { FaqList } from "@/components/FaqList";
import { LineNode } from "@/components/LineNode";
import { WhatsAppAnchor } from "@/components/WhatsAppLink";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { contactPage, site } from "@/lib/content";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";

const title = "Talk to a Web Developer in Thane";
const description =
  "WhatsApp, phone, or leave your number and I'll call back - same day if you reach out before 6pm. Coreline Digital, Wagle Estate, Thane.";

export const metadata = pageMetadata({ title, description, path: "/contact" });

const crumbs = breadcrumbJsonLd([{ name: "Contact", path: "/contact" }]);

export default function ContactPage() {
  const [whatsapp, call, place, next] = contactPage.sections;

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
          faqJsonLd(contactPage.faqs),
        ]}
      />
      <PageHeader heading={contactPage.heading} sub={contactPage.sub} />

      <Container className="pb-16 md:pb-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <section>
              <h2 className="font-display text-lg font-semibold">{whatsapp.heading}</h2>
              <p className="mt-3 text-small text-body">{whatsapp.body}</p>
              <WhatsAppAnchor className="group mt-6 flex items-center justify-between gap-4 border border-hairline p-6 transition-colors duration-150 ease-linear hover:border-accent">
                <span className="font-display text-base font-medium">
                  {site.primaryCta}
                </span>
                <span className="ring-pulse relative flex size-2.5 shrink-0 items-center justify-center rounded-full bg-accent" />
              </WhatsAppAnchor>
            </section>

            <section className="mt-10 border-t border-hairline pt-10">
              <h2 className="font-display text-lg font-semibold">{call.heading}</h2>
              <p className="mt-3 text-small text-body">{call.body}</p>
              <a
                href={site.phoneHref}
                className="mt-4 inline-block font-display text-lg font-medium transition-colors duration-150 ease-linear hover:text-accent"
              >
                {site.phone}
              </a>
              <p className="mt-4">
                <EmailAnchor className="font-display text-sm font-medium break-all transition-colors duration-150 ease-linear hover:text-accent" />
              </p>
            </section>

            <section className="mt-10 border-t border-hairline pt-10">
              <h2 className="font-display text-lg font-semibold">{place.heading}</h2>
              <p className="mt-3 text-small text-body">{place.body}</p>
            </section>

            <section className="mt-10 border-t border-hairline pt-10">
              <h2 className="font-display text-lg font-semibold">{next.heading}</h2>
              <p className="mt-3 text-small text-body">{next.body}</p>
            </section>

            <div className="mt-10 w-24">
              <LineNode nodes={[100]} tone="hairline" />
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <h2 className="font-display text-lg font-semibold">
              {contactPage.formHeading}
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>

        <Reveal className="mt-16 border-t border-hairline pt-16 md:mt-24 md:pt-24">
          <p className="font-mono text-label uppercase text-grey">Questions</p>
          <h2 className="mt-5 max-w-3xl font-display text-h2 font-semibold">
            Straight answers before you message.
          </h2>
          <FaqList faqs={contactPage.faqs} />
        </Reveal>
      </Container>
    </>
  );
}
