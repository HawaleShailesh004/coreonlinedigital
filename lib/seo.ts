import type { Metadata } from "next";
import { site } from "@/lib/content";

export const siteUrl = site.url;

export const defaultDescription =
  "Coreline Digital builds high-converting digital storefronts for clinics, schools, traders, and local businesses in Thane and Mumbai. Strategy, design, and AI that drive revenue — not just traffic.";

export const seoKeywords = [
  "Coreline Digital",
  "digital storefront Thane",
  "website design Thane",
  "website design Mumbai",
  "clinic website India",
  "school website design",
  "business website Maharashtra",
  "WhatsApp booking website",
  "AI chatbot for business",
  "digital infrastructure Thane",
  "Wagle Estate web agency",
] as const;

type PageSeoInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

/** Page-level metadata that inherits root openGraph/twitter defaults. */
export function pageMetadata({
  title,
  description,
  path = "",
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.legalName}`,
      description,
      url,
    },
    twitter: {
      title: `${title} | ${site.legalName}`,
      description,
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: siteUrl,
    logo: `${siteUrl}/logo-mark.png`,
    image: `${siteUrl}/logo-lockup.png`,
    description: defaultDescription,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Thane",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
      streetAddress: "Wagle Estate",
    },
    areaServed: [
      { "@type": "City", name: "Thane" },
      { "@type": "City", name: "Mumbai" },
      { "@type": "State", name: "Maharashtra" },
    ],
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "sales",
      availableLanguage: ["English", "Hindi", "Marathi"],
      areaServed: "IN",
    },
    knowsAbout: [
      "Digital storefronts",
      "Website design",
      "WhatsApp commerce",
      "AI chat assistants",
      "Local business websites",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: site.legalName,
    url: siteUrl,
    description: defaultDescription,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en-IN",
  };
}
