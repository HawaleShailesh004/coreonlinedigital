import { FinalCta } from "@/components/FinalCta";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkGrid } from "@/components/work/WorkGrid";
import { workPage } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Ten concept digital storefronts and acquisition systems — clinics, schools, traders, gyms, coaching, and more — showing how Coreline builds for local businesses.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow={workPage.eyebrow}
        heading={workPage.heading}
        sub={workPage.sub}
      />

      <Section size="tight">
        <WorkGrid />
      </Section>

      <FinalCta heading={workPage.bottomHeading} body="" />
    </>
  );
}
