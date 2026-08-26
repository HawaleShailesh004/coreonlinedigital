import type { Metadata } from "next";
import { CartPage } from "@/components/samples/TraderStore";
import { SampleSection } from "@/components/samples/SampleSection";

export const metadata: Metadata = {
  title: "Cart · Nilaya Home",
  description: "Review your Nilaya Home cart and proceed to demo checkout.",
};

export default function TraderCartPage() {
  return (
    <main id="main">
      <SampleSection size="tight">
        <CartPage />
      </SampleSection>
    </main>
  );
}
