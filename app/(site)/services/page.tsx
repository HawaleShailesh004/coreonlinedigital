import { FinalCta } from "@/components/FinalCta";
import { Pricing } from "@/components/Pricing";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { pillars, servicesPage, site } from "@/lib/content";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";

const title = "Website Design in Thane";
const description =
  "Websites for Thane businesses from ₹15,000, live in 10 working days, half paid only when it goes live. Plus an assistant that answers when you can't.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/services",
});

const crumbs = breadcrumbJsonLd([{ name: "Services", path: "/services" }]);

/**
 * These three are a menu, not a sequence.
 *
 * The old page rendered all three identically in a 5/6 split, numbered
 * 01/02/03, each closing with the same "Get a quote" button. That implied you
 * had to buy them in order, gave the eye no hierarchy, and put three competing
 * primary buttons on one page - so none of them won.
 *
 * Now the front-door offer is full width and dominant, the two add-ons sit
 * beneath it at smaller scale, and only the first one carries a button.
 */
const [primary, ...secondary] = pillars;

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title,
            description,
            path: "/services",
            breadcrumbId: crumbs["@id"],
          }),
          crumbs,
          faqJsonLd(servicesPage.faqs),
        ]}
      />
      <PageHeader
        eyebrow={servicesPage.eyebrow}
        heading={servicesPage.heading}
        sub={servicesPage.sub}
      />

      <Section id={primary.id} bordered size="tight">
        <Reveal>
          <p className="font-mono text-label uppercase text-accent">
            {primary.role}
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[2.5rem]">
            {primary.title}
          </h2>
          <p className="mt-4 font-display text-lg font-medium text-accent">
            {primary.tagline}
          </p>

          <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <p className="text-lead text-body">{primary.body}</p>

              <p className="mt-10 font-mono text-label uppercase text-grey">
                From {site.priceFrom}
              </p>
              <Button href={site.whatsapp} external className="mt-5">
                {site.primaryCta}
              </Button>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <p className="font-mono text-label uppercase text-grey">Includes</p>
              <ul className="mt-5 border-t border-hairline">
                {primary.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 border-b border-hairline py-4 text-small"
                  >
                    <span
                      className="mt-2.5 h-px w-4 shrink-0 bg-accent"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section bordered size="tight">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          {secondary.map((pillar, index) => (
            <Reveal
              as="article"
              key={pillar.id}
              id={pillar.id}
              delay={index * 80}
              // h-full + mt-auto on the link: the two include lists are
              // different lengths, so without this the two "Ask about this"
              // links sit at different heights and the pair looks unfinished.
              className="flex h-full flex-col scroll-mt-24"
            >
              <p className="font-mono text-label uppercase text-grey">
                {pillar.role}
              </p>
              <h2 className="mt-5 font-display text-h3 font-semibold">
                {pillar.title}
              </h2>
              <p className="mt-3 font-display text-sm font-medium text-accent">
                {pillar.tagline}
              </p>
              <p className="mt-5 text-small text-body">
                {pillar.body}
              </p>

              <ul className="mt-8 border-t border-hairline">
                {pillar.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 border-b border-hairline py-3.5 text-[0.875rem] leading-[1.6] text-grey"
                  >
                    <span
                      className="mt-2.5 h-px w-3 shrink-0 bg-accent"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* A plain link, not a button. Three primary buttons on one page
                  compete with each other and none of them wins. */}
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="group mt-auto inline-flex items-center gap-2 self-start pt-8 font-display text-sm font-medium text-accent"
              >
                Ask about this
                {/* scaleX, not width: transition-all on a layout property reflows
                the line on every frame of the hover. */}
              <span className="inline-block h-px w-6 origin-left bg-accent transition-transform duration-200 ease-out group-hover:scale-x-150" />
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <Pricing />

      <Section bordered size="tight">
        <Reveal>
          <p className="font-mono text-label uppercase text-grey">Questions</p>
          <h2 className="mt-5 max-w-3xl font-display text-h2 font-semibold">
            Straight answers before you message.
          </h2>
          <dl className="mt-12 border-t border-hairline">
            {servicesPage.faqs.map((faq) => (
              <div key={faq.question} className="border-b border-hairline py-8">
                <dt className="font-display text-lg font-medium">{faq.question}</dt>
                <dd className="mt-3 max-w-2xl text-small text-body">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      <FinalCta
        heading={servicesPage.bottomHeading}
        body={servicesPage.bottomBody}
      />
    </>
  );
}
