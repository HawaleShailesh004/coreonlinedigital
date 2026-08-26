import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { SampleFooter } from "@/components/samples/SampleFooter";
import { SampleFrame } from "@/components/samples/SampleFrame";
import { SampleNav } from "@/components/samples/SampleNav";
import { coaching } from "@/lib/samples/coaching";

/** Punchy geometric sans - achievement-focused without looking childish. */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sample: Coaching Classes",
  description:
    "Concept build for a competitive exam coaching institute - transparent batch fees, faculty bios, and a results page built around measurable outcomes.",
};

export default function CoachingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SampleFrame sample="coaching" fontClass={spaceGrotesk.variable}>
      <SampleNav
        brand={coaching.business}
        brandNote={coaching.brandNote}
        links={coaching.nav.links}
        cta={coaching.nav.cta}
        homeHref="/samples/coaching"
      />

      {children}

      <SampleFooter
        brand="Summit Prep"
        blurb={coaching.footer.blurb}
        legal={coaching.footer.legal}
        variant="stacked"
        columns={[
          {
            title: "Explore",
            items: [
              { label: "Courses", href: "/samples/coaching/courses" },
              { label: "Results", href: "/samples/coaching/results" },
              { label: "Faculty", href: "/samples/coaching/faculty" },
              { label: "Book a free demo", href: "/samples/coaching/enroll" },
              { label: "Contact", href: "/samples/coaching/contact" },
            ],
          },
          {
            title: "Visit",
            items: [
              { label: coaching.contact.address.join(", ") },
              {
                label: coaching.contact.phoneLabel,
                href: coaching.contact.phoneHref,
              },
              {
                label: coaching.contact.whatsappLabel,
                href: coaching.contact.whatsappHref,
              },
            ],
          },
        ]}
      />
    </SampleFrame>
  );
}
