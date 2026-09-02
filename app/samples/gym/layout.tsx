import type { Metadata } from "next";
import { Anton } from "next/font/google";
import { ChatWidget } from "@/components/samples/ChatWidget";
import { SampleFooter } from "@/components/samples/SampleFooter";
import { SampleFrame } from "@/components/samples/SampleFrame";
import { SampleNav } from "@/components/samples/SampleNav";
import { personas } from "@/lib/samples/chat-personas";
import { gym } from "@/lib/samples/gym";

/** Anton only ships one weight, which is the point: it's loud at every size. */
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Forge Strength Co.",
  description:
    "Concept build for a gym - transparent membership pricing, free-trial booking and a live AI assistant that answers class timings and books trials.",
};

export default function GymLayout({ children }: { children: React.ReactNode }) {
  return (
    <SampleFrame sample="gym" fontClass={anton.variable}>
      <SampleNav
        brand={gym.business}
        brandNote={gym.brandNote}
        links={gym.nav.links}
        cta={gym.nav.cta}
        homeHref="/samples/gym"
      />

      {children}

      <SampleFooter
        brand="Forge Strength Co."
        blurb={gym.footer.blurb}
        legal={gym.footer.legal}
        variant="compact"
        columns={[
          {
            title: "Train",
            items: [
              { label: "Programs", href: "/samples/gym/programs" },
              { label: "Membership", href: "/samples/gym/membership" },
              { label: "Trainers", href: "/samples/gym/trainers" },
              { label: "Book a free trial", href: "/samples/gym/contact" },
            ],
          },
          {
            title: "Visit",
            items: [
              { label: gym.contact.address.join(", ") },
              { label: gym.contact.phoneLabel, href: gym.contact.phoneHref },
              {
                label: gym.contact.whatsappLabel,
                href: gym.contact.whatsappHref,
              },
            ],
          },
        ]}
      />

      <ChatWidget persona={personas.gym} />
    </SampleFrame>
  );
}
