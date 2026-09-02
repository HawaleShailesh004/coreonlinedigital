import { FinalCta } from "@/components/FinalCta";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkGrid } from "@/components/work/WorkGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { workPage } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const title = "Sample Websites";
const description =
  "Ten sample websites for Thane businesses - clinic, school, gym, jeweller, trader, coaching class. Not live client sites. Click into any of them and use it.";

export const metadata = pageMetadata({ title, description, path: "/work" });

const crumbs = breadcrumbJsonLd([{ name: "Sample Websites", path: "/work" }]);

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={[
          // CollectionPage rather than WebPage: this page exists to index the
          // ten sample builds, not to be read on its own.
          webPageJsonLd({
            title,
            description,
            path: "/work",
            type: "CollectionPage",
            breadcrumbId: crumbs["@id"],
          }),
          crumbs,
        ]}
      />
      <PageHeader
        eyebrow={workPage.eyebrow}
        heading={workPage.heading}
        sub={workPage.sub}
      />

      <Section size="tight">
        <WorkGrid />
      </Section>

      <FinalCta heading={workPage.bottomHeading} />
    </>
  );
}
