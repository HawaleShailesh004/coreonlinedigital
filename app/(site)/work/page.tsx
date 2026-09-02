import Link from "next/link";
import { FinalCta } from "@/components/FinalCta";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkGrid } from "@/components/work/WorkGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { verticalIndex, verticalPages, workPage } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const title = "Sample Websites for Thane Businesses";
const description =
  "Ten sample websites - clinic, school, gym, jeweller, trader, coaching class. Not client sites. Click into any of them and use it.";

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
        <div className="mb-16 border-b border-hairline pb-16">
          <p className="font-mono text-label uppercase text-grey">
            {verticalIndex.eyebrow}
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-h2 font-semibold">
            {verticalIndex.heading}
          </h2>
          <p className="mt-5 max-w-2xl text-small text-body">{verticalIndex.sub}</p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {verticalPages.map((page) => (
              <li key={page.slug}>
                <Link
                  href={page.path}
                  className="group inline-flex items-center gap-2 font-display text-base font-medium"
                >
                  {page.title}
                  <span className="inline-block h-px w-6 origin-left bg-accent transition-transform duration-200 ease-out group-hover:scale-x-150" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <WorkGrid />
        <p className="mt-10 font-mono text-label uppercase text-grey">
          {workPage.note}
        </p>
      </Section>

      <FinalCta heading={workPage.bottomHeading} body={workPage.bottomBody} />
    </>
  );
}
