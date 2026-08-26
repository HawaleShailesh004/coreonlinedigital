import { Poppins } from "next/font/google";
import { SampleFooter } from "@/components/samples/SampleFooter";
import { SampleFrame } from "@/components/samples/SampleFrame";
import { SampleNav } from "@/components/samples/SampleNav";
import { clinic } from "@/lib/samples/clinic";

/** Rounded terminals are an asset here - this is the one vertical where
 *  "friendly" outranks "engineered". */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export default function ClinicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SampleFrame sample="clinic" fontClass={poppins.variable}>
      <span id="top" />
      <SampleNav
        brand={clinic.business}
        brandNote={clinic.brandNote}
        links={clinic.nav.links}
        cta={clinic.nav.cta}
        homeHref="/samples/clinic"
        soft
      />
      {children}
      <SampleFooter
        brand="Meridian Family Clinic"
        blurb={clinic.footer.blurb}
        legal={clinic.footer.legal}
        variant="stacked"
        columns={[
          {
            title: "Clinic",
            items: [
              { label: "Services", href: "/samples/clinic/services" },
              { label: "Dr. Aditya Rao", href: "/samples/clinic/doctor" },
              { label: "Book an appointment", href: "/samples/clinic/book" },
              { label: "Contact", href: "/samples/clinic/contact" },
            ],
          },
          {
            title: "Visit",
            items: [
              { label: clinic.visit.address.join(", ") },
              { label: clinic.visit.phoneLabel, href: clinic.visit.phoneHref },
            ],
          },
        ]}
      />
    </SampleFrame>
  );
}
