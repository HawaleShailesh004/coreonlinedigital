import { FinalCta } from "@/components/FinalCta";
import { FaqList } from "@/components/FaqList";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { aboutPage } from "@/lib/content";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";

const title = "About Shailesh Hawale - Coreline Digital";
const description =
  "Shailesh Hawale runs Coreline Digital from Wagle Estate, Thane, building websites for local businesses. Fixed price, fixed date, half paid only when live.";

export const metadata = {
  ...pageMetadata({ title, description, path: "/about" }),
  // Absolute so this does not render as "About Shailesh Hawale - Coreline Digital | Coreline Digital".
  title: { absolute: title },
};

const crumbs = breadcrumbJsonLd([{ name: "About", path: "/about" }]);

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title,
            description,
            path: "/about",
            type: "AboutPage",
            breadcrumbId: crumbs["@id"],
          }),
          crumbs,
          faqJsonLd(aboutPage.faqs),
        ]}
      />
      <PageHeader heading={aboutPage.heading} sub={aboutPage.sub} />
      <Container className="pb-16 md:pb-32">
        <div className="max-w-2xl">
          {aboutPage.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mt-8 text-lead text-body first:mt-0"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
      <Section bordered size="tight">
        <Reveal>
          <p className="font-mono text-label uppercase text-grey">Questions</p>
          <h2 className="mt-5 max-w-3xl font-display text-h2 font-semibold">
            Straight answers before you message.
          </h2>
          <FaqList faqs={aboutPage.faqs} />
        </Reveal>
      </Section>
      <FinalCta heading={aboutPage.ctaHeading} body={aboutPage.ctaBody} />
    </>
  );
}
