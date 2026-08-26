import { Fraunces } from "next/font/google";
import { SampleFooter } from "@/components/samples/SampleFooter";
import { SampleFrame } from "@/components/samples/SampleFrame";
import { SampleNav } from "@/components/samples/SampleNav";
import { jeweller } from "@/lib/samples/jeweller";

/** High-contrast serif. Luxury is the one category where a serif earns its
 *  place - and it is used here for the hero and section headings only. */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export default function JewellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SampleFrame sample="jeweller" fontClass={fraunces.variable}>
      <span id="top" />
      <SampleNav
        brand={jeweller.business}
        brandNote={jeweller.brandNote}
        links={jeweller.nav.links}
        cta={jeweller.nav.cta}
        homeHref="/samples/jeweller"
      />
      {children}
      <SampleFooter
        brand={jeweller.business}
        blurb={jeweller.footer.blurb}
        legal={jeweller.footer.legal}
        variant="compact"
        columns={[
          {
            title: "Showroom",
            items: [
              {
                label: "Collections",
                href: "/samples/jeweller/collections",
              },
              {
                label: "Craftsmanship",
                href: "/samples/jeweller/craftsmanship",
              },
              { label: "Custom design", href: "/samples/jeweller/custom" },
              { label: "Visit", href: "/samples/jeweller/contact" },
            ],
          },
          {
            title: "Visit",
            items: [
              { label: jeweller.visit.address.join(", ") },
              {
                label: jeweller.visit.phoneLabel,
                href: jeweller.visit.phoneHref,
              },
              {
                label: jeweller.visit.whatsappLabel,
                href: jeweller.visit.whatsappHref,
              },
            ],
          },
        ]}
      />
    </SampleFrame>
  );
}
