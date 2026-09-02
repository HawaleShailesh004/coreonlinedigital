import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { VerticalLanding } from "@/components/verticals/VerticalLanding";
import { getVerticalPage, verticalPages } from "@/lib/content";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  pageMetadata,
  serviceJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return verticalPages.map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = getVerticalPage(slug);
  if (!page) return {};
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}

export default async function VerticalPageRoute({ params }: Props) {
  const { slug } = await params;
  const page = getVerticalPage(slug);
  if (!page) notFound();

  const crumbs = breadcrumbJsonLd([{ name: page.crumb, path: page.path }]);

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: page.title,
            description: page.description,
            path: page.path,
            breadcrumbId: crumbs["@id"],
          }),
          crumbs,
          serviceJsonLd({
            name: page.title,
            description: page.description,
            path: page.path,
          }),
          faqJsonLd(page.faqs),
        ]}
      />
      <VerticalLanding page={page} />
    </>
  );
}
