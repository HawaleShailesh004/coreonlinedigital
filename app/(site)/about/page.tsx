import { FinalCta } from "@/components/FinalCta";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { aboutPage } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const title = "About";
const description =
  "Coreline Digital is one person in Wagle Estate, Thane - Shailesh. I build websites for local businesses. Not affiliated with other companies using a similar name.";

// Just "About" - the `| Coreline Digital` suffix supplies the brand, so a
// title of "About Coreline Digital" rendered it twice in the tab and the share
// card. The location lives in the description and the h1.
export const metadata = pageMetadata({ title, description, path: "/about" });

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
        ]}
      />
      <PageHeader heading={aboutPage.heading} sub={aboutPage.sub} />
      <Container className="pb-16 md:pb-32">
        <div className="max-w-2xl">
          {aboutPage.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-8 text-lead text-body first:mt-0">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
      <FinalCta />
    </>
  );
}
