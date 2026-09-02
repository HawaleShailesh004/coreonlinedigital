import { FinalCta } from "@/components/FinalCta";
import { Pricing } from "@/components/Pricing";
import { FocusStrip } from "@/components/home/FocusStrip";
import { Founder } from "@/components/home/Founder";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { ServicePillars } from "@/components/home/ServicePillars";
import { WorkTeaser } from "@/components/home/WorkTeaser";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/content";
import { defaultDescription, pageMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Website Design in Thane",
    description: defaultDescription,
    path: "/",
  }),
  title: {
    absolute: `Website Design in Thane | ${site.legalName}`,
  },
};

export default function HomePage() {
  return (
    <>
      {/* No BreadcrumbList here - home is the root of every trail, so a
          single-item crumb would say nothing. */}
      <JsonLd
        data={webPageJsonLd({
          title: "Website Design in Thane",
          description: defaultDescription,
          path: "/",
        })}
      />
      <Hero />
      <FocusStrip />
      <ServicePillars />
      <Process />
      <Pricing />
      <WorkTeaser />
      <Founder />
      <FinalCta />
    </>
  );
}
