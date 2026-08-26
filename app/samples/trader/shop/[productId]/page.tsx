import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/samples/TraderStore";
import { SampleSection } from "@/components/samples/SampleSection";
import { getProduct, products } from "@/lib/samples/trader";

type Props = { params: Promise<{ productId: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ productId: product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const product = getProduct(productId);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} · Nilaya Home`,
    description: product.blurb,
  };
}

export default async function TraderProductPage({ params }: Props) {
  const { productId } = await params;
  const product = getProduct(productId);
  if (!product) notFound();

  return (
    <main id="main">
      <SampleSection size="tight">
        <ProductDetail product={product} />
      </SampleSection>
    </main>
  );
}
