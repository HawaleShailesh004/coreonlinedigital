import { pillars, site, verticalPages } from "@/lib/content";
import { siteUrl } from "@/lib/seo";

/**
 * llms.txt - not a citation lever (no evidence any AI product reads it as
 * ranking or retrieval input) and ignored entirely by Google. Shipped anyway
 * because it's a few lines of true, already-published facts and some tools do
 * consume it. Built from lib/content.ts rather than hand-written so it can't
 * drift from the price or the pages it links to.
 */
export async function GET() {
  const lines = [
    `# ${site.legalName}`,
    "",
    `> ${site.tagline}`,
    "",
    `${site.legalName} designs and builds websites for local businesses in Thane and Mumbai, with booking and enquiry handling and optional monthly upkeep. Based in ${site.location}, ${site.region}, India.`,
    "",
    "## Pages",
    "",
    `- [Home](${siteUrl}/): overview of the three service lines`,
    `- [Services](${siteUrl}/services): what's included in each, pricing from ${site.priceFrom}, FAQs`,
    ...verticalPages.map(
      (page) => `- [${page.title}](${siteUrl}${page.path}): ${page.description}`,
    ),
    `- [Work](${siteUrl}/work): sample sites by vertical - not live client work`,
    `- [About](${siteUrl}/about): the business, the terms, and why the offer stays narrow`,
    `- [Contact](${siteUrl}/contact): phone, WhatsApp, email, address`,
    "",
    "## Services",
    "",
    ...pillars.map((p) => `- **${p.title}** (${p.role}): ${p.tagline}`),
    "",
    "## Facts",
    "",
    `- Price: ${site.priceFrom}-${site.priceCeiling}, fixed before work begins`,
    `- Delivery: ${site.deliveryPromise}`,
    `- Payment: ${site.paymentTerms}`,
    `- Location: ${site.location}, ${site.region}, India`,
    `- Contact: ${site.phone} / ${site.email}`,
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
