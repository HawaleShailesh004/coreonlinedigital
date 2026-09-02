import { FinalCta } from "@/components/FinalCta";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { privacyPage } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const title = "Privacy";
const description =
  "How I handle the name and phone number you send from the site. Your number stays with me. I don't sell it.";

export const metadata = pageMetadata({ title, description, path: "/privacy" });

const crumbs = breadcrumbJsonLd([{ name: "Privacy", path: "/privacy" }]);

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title,
            description,
            path: "/privacy",
            breadcrumbId: crumbs["@id"],
          }),
          crumbs,
        ]}
      />
      <PageHeader heading={privacyPage.heading} sub={privacyPage.sub} />
      <Container className="pb-16 md:pb-32">
        <div className="max-w-2xl">
          {privacyPage.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-8 text-lead text-body first:mt-0">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
      <FinalCta heading={privacyPage.ctaHeading} body={privacyPage.ctaBody} />
    </>
  );
}
