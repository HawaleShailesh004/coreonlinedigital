import type { Metadata } from "next";
import { ShopGrid } from "@/components/samples/TraderStore";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { trader } from "@/lib/samples/trader";

export const metadata: Metadata = {
  title: "Shop · Nilaya Home",
  description: "Browse the full Nilaya Home collection — tableware, textiles, decor and bath.",
};

const heading =
  "s-display text-[1.875rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.25rem]";

export default function TraderShopPage() {
  return (
    <main id="main">
      <SampleSection size="tight">
        <Reveal>
          <SampleEyebrow>{trader.shop.eyebrow}</SampleEyebrow>
          <h1 className={`${heading} mt-3 max-w-xl`}>{trader.shop.heading}</h1>
        </Reveal>
        <ShopGrid />
      </SampleSection>
    </main>
  );
}
