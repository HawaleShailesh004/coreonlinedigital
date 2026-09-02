import Image from "next/image";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { FinalCta } from "@/components/FinalCta";
import { LineNode } from "@/components/LineNode";
import { Pricing } from "@/components/Pricing";
import { JsonLd } from "@/components/seo/JsonLd";
import { WhatsAppButton } from "@/components/WhatsAppLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { pillars, serviceMenu, servicesPage, site } from "@/lib/content";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";

const title = "Website Design Company in Thane";
const description =
  "What I build for Thane businesses: a website that brings customers, an assistant that answers when you can't, and optional monthly upkeep. From ₹15,000.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/services",
});

const crumbs = breadcrumbJsonLd([{ name: "Services", path: "/services" }]);

/**
 * These three are a menu, not a sequence.
 *
 * Pillar 1 is the visual front door: a real sample on one side, the offer
 * on the other. Pillars 2 and 3 sit beneath it. Only the assistant gets a
 * second picture - monthly upkeep has nothing honest to photograph.
 */
const [primary, assistant, monthly] = pillars;

function ProofFrame({
  src,
  alt,
  caption,
  href,
  priority = false,
}: {
  src: string;
  alt: string;
  caption: string;
  href: string;
  priority?: boolean;
}) {
  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden border border-hairline bg-card">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 55vw, 100vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <p className="mt-4 font-mono text-label uppercase text-grey">{caption}</p>
    </Link>
  );
}

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
      <header className="pt-16 pb-16 md:pt-24 md:pb-24">
        <Container>
          <div className="mb-10 w-24">
            <LineNode animate tone="accent" />
          </div>
          <div className="grid items-start gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <Eyebrow>{servicesPage.eyebrow}</Eyebrow>
              <h1 className="mt-5 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[2.75rem] lg:text-h1">
                {servicesPage.heading}
              </h1>
              <p className="mt-8 text-lead text-body">{servicesPage.sub}</p>
            </div>
            <div className="md:col-span-7">
              <ProofFrame
                src={servicesPage.proof.website.src}
                alt={servicesPage.proof.website.alt}
                caption={servicesPage.proof.website.caption}
                href={servicesPage.proof.website.href}
                priority
              />
            </div>
          </div>
        </Container>
      </header>

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

          <div className="mt-12 grid items-start gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <p className="text-lead text-body">{primary.body}</p>
              <p className="mt-10 font-mono text-label uppercase text-grey">
                From {site.priceFrom}
              </p>
              <WhatsAppButton className="mt-5">
                {site.primaryCta}
              </WhatsAppButton>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <p className="font-mono text-label uppercase text-grey">Includes</p>
              <ul className="mt-5 border-t border-hairline">
                {primary.includes.map((item) => (
                  <li
                    key={item.title}
                    className="border-b border-hairline py-3"
                  >
                    <h3 className="font-display text-base font-medium">
                      {item.title}
                    </h3>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section bordered size="tight">
        <Reveal className="max-w-xl">
          <ProofFrame
            src={servicesPage.proof.assistant.src}
            alt={servicesPage.proof.assistant.alt}
            caption={servicesPage.proof.assistant.caption}
            href={servicesPage.proof.assistant.href}
          />
        </Reveal>

        <div className="mt-16 grid items-start gap-16 md:grid-cols-2 md:gap-8">
          <Reveal
            as="article"
            id={assistant.id}
            className="scroll-mt-24"
          >
            <p className="font-mono text-label uppercase text-grey">
              {assistant.role}
            </p>
            <h2 className="mt-5 font-display text-h3 font-semibold">
              {assistant.title}
            </h2>
            <p className="mt-3 font-display text-sm font-medium text-accent">
              {assistant.tagline}
            </p>
            <p className="mt-5 text-small text-body">{assistant.body}</p>
            <ul className="mt-8 border-t border-hairline">
              {assistant.includes.map((item) => (
                <li key={item.title} className="border-b border-hairline py-3">
                  <h3 className="font-display text-sm font-medium">
                    {item.title}
                  </h3>
                </li>
              ))}
            </ul>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 pt-8 font-display text-sm font-medium text-accent"
            >
              Ask about this
              <span className="inline-block h-px w-6 origin-left bg-accent transition-transform duration-200 ease-out group-hover:scale-x-150" />
            </a>
          </Reveal>

          <Reveal
            as="article"
            id={monthly.id}
            delay={80}
            className="scroll-mt-24"
          >
            <p className="font-mono text-label uppercase text-grey">
              {monthly.role}
            </p>
            <h2 className="mt-5 font-display text-h3 font-semibold">
              {monthly.title}
            </h2>
            <p className="mt-3 font-display text-sm font-medium text-accent">
              {monthly.tagline}
            </p>
            <p className="mt-5 text-small text-body">{monthly.body}</p>
            <ul className="mt-8 border-t border-hairline">
              {monthly.includes.map((item) => (
                <li key={item.title} className="border-b border-hairline py-3">
                  <h3 className="font-display text-sm font-medium">
                    {item.title}
                  </h3>
                </li>
              ))}
            </ul>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 pt-8 font-display text-sm font-medium text-accent"
            >
              Ask about this
              <span className="inline-block h-px w-6 origin-left bg-accent transition-transform duration-200 ease-out group-hover:scale-x-150" />
            </a>
          </Reveal>
        </div>
      </Section>

      <Section bordered size="tight">
        <Reveal>
          <p className="font-mono text-label uppercase text-grey">
            {servicesPage.namedEyebrow}
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-h2 font-semibold">
            {servicesPage.namedHeading}
          </h2>
          <div className="mt-12">
            {serviceMenu.map((group) => (
              <div key={group.role} className="mt-10 first:mt-0">
                <p className="font-mono text-label uppercase text-accent">
                  {group.role}
                </p>
                <h3 className="sr-only">{group.title}</h3>
                <ul className="mt-4 border-t border-hairline">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="grid gap-1 border-b border-hairline py-3 md:grid-cols-12 md:items-baseline md:gap-8"
                    >
                      <p className="font-display text-base font-medium md:col-span-4">
                        {item.name}
                      </p>
                      <p className="font-mono text-label uppercase text-grey md:col-span-2">
                        {item.price}
                      </p>
                      <p className="mt-2 text-small text-body md:col-span-6 md:mt-0">
                        {item.line}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Pricing />

      <Section bordered size="tight">
        <Reveal>
          <p className="font-mono text-label uppercase text-grey">Questions</p>
          <h2 className="mt-5 max-w-3xl font-display text-h2 font-semibold">
            Straight answers before you message.
          </h2>
          <FaqList faqs={servicesPage.faqs} />
        </Reveal>
      </Section>

      <FinalCta
        heading={servicesPage.bottomHeading}
        body={servicesPage.bottomBody}
      />
    </>
  );
}
