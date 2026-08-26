import { Manrope } from "next/font/google";
import { ChatWidget } from "@/components/samples/ChatWidget";
import { SampleFooter } from "@/components/samples/SampleFooter";
import { SampleFrame } from "@/components/samples/SampleFrame";
import { SampleNav } from "@/components/samples/SampleNav";
import { CartButton, StoreProvider } from "@/components/samples/TraderStore";
import { personas } from "@/lib/samples/chat-personas";
import { trader } from "@/lib/samples/trader";

/** Geometric, unfussy, and legible at card sizes - e-commerce trust is clarity. */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const BASE = "/samples/trader";

export default function TraderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SampleFrame sample="trader" fontClass={manrope.variable}>
      <StoreProvider>
        <span id="top" />
        <SampleNav
          brand={trader.business}
          brandNote={trader.brandNote}
          links={trader.nav.links}
          cta={trader.nav.cta}
          homeHref={BASE}
          extra={<CartButton />}
        />

        {children}

        <SampleFooter
          brand="Nilaya Home"
          blurb={trader.footer.blurb}
          legal={trader.footer.legal}
          variant="compact"
          columns={[
            {
              title: "Shop",
              items: [
                { label: "All products", href: `${BASE}/shop` },
                { label: "Cart", href: `${BASE}/cart` },
                { label: "About Nilaya", href: `${BASE}/about` },
              ],
            },
            {
              title: "Help",
              items: [
                {
                  label: trader.help.email,
                  href: `mailto:${trader.help.email}`,
                },
                { label: trader.help.phoneLabel, href: trader.help.phoneHref },
                { label: "Contact & FAQ", href: `${BASE}/contact` },
              ],
            },
          ]}
        />

        <ChatWidget persona={personas.trader} />
      </StoreProvider>
    </SampleFrame>
  );
}
