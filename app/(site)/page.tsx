import { FinalCta } from "@/components/FinalCta";
import { FocusStrip } from "@/components/home/FocusStrip";
import { Founder } from "@/components/home/Founder";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { ServicePillars } from "@/components/home/ServicePillars";
import { WhyNotTemplate } from "@/components/home/WhyNotTemplate";
import { WorkTeaser } from "@/components/home/WorkTeaser";
import { site } from "@/lib/content";
import { defaultDescription, pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: `${site.legalName} | Digital Storefronts that Drive Revenue`,
    description: defaultDescription,
    path: "/",
  }),
  title: {
    absolute: `${site.legalName} | Digital Storefronts that Drive Revenue`,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FocusStrip />
      <ServicePillars />
      <Process />
      <WhyNotTemplate />
      <WorkTeaser />
      <Founder />
      <FinalCta />
    </>
  );
}
