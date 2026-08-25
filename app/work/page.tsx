import type { Metadata } from "next";
import { FinalCta } from "@/components/FinalCta";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkGrid } from "@/components/work/WorkGrid";
import { workPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: workPage.sub,
};

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
