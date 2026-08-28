import type { Metadata } from "next";
import { site } from "@/lib/content";

export const siteUrl = site.url;

/** Brand suffix for every title — matches `Page Name | coreline.` */
export const titleSuffix = site.name;

/** Primary meta description (≤155 chars). Anti-commodity positioning. */
export const defaultDescription =
  "We engineer bespoke web architecture, automated booking systems, and AI triage for professionals who have outgrown templates.";

export const seoKeywords = [
  "Coreline Digital",
  "digital infrastructure Thane",
  "bespoke website design Thane",
  "website development company Thane",
  "clinic booking system India",
  "medical clinic website design",
  "school admission website Maharashtra",
  "jewellery e-commerce architecture",
  "WhatsApp booking website",
  "AI chatbot for business",
  "automated appointment booking",
  "local SEO Thane Mumbai",
  "Wagle Estate digital agency",
  "custom business website not template",
] as const;

type PageSeoInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

/** Page-level metadata — titles render as `Page | coreline.` via root template. */
export function pageMetadata({
  title,
  description,
  path = "",
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = `${siteUrl}${path}`;
  const fullTitle = `${title} | ${titleSuffix}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
    },
    twitter: {
      title: fullTitle,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Local tech infrastructure firm — mirrors GBP service categories. */
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
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Wagle Estate",
      addressLocality: "Thane",
      addressRegion: "Maharashtra",
      postalCode: "400604",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.1929,
      longitude: 72.9614,
    },
    areaServed: [
      { "@type": "City", name: "Thane" },
      { "@type": "AdministrativeArea", name: "Thane West" },
      { "@type": "City", name: "Mumbai" },
      { "@type": "State", name: "Maharashtra" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      email: site.email,
      contactType: "sales",
      availableLanguage: ["English", "Hindi", "Marathi"],
      areaServed: ["Thane", "Mumbai", "Maharashtra", "IN"],
    },
    knowsAbout: [
      "Digital infrastructure",
      "Bespoke web architecture",
      "Medical clinic booking systems",
      "School admission funnels",
      "Jewellery e-commerce architecture",
      "AI triage and chat assistants",
      "WhatsApp lead acquisition",
      "Local SEO",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Coreline service lines",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Storefronts",
            description:
              "Bespoke websites and landing pages engineered for conversion, not brochureware.",
            areaServed: "Thane, Mumbai, Maharashtra",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Medical Clinic Booking Systems",
            description:
              "Automated appointment booking, WhatsApp confirmation, and follow-up for clinics and practices.",
            areaServed: "Thane, Mumbai, Maharashtra",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Client Acquisition Systems",
            description:
              "AI triage, enquiry routing, and WhatsApp flows that catch leads before they go cold.",
            areaServed: "Thane, Mumbai, Maharashtra",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Jewellery E-Commerce Architecture",
            description:
              "Editorial catalogue and enquiry flows for showrooms that close in person, not on price.",
            areaServed: "Thane, Mumbai, Maharashtra",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Growth & Operations",
            description:
              "Local SEO, Google Business Profile, and monthly systems maintenance.",
            areaServed: "Thane, Mumbai, Maharashtra",
          },
        },
      ],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: site.legalName,
    alternateName: site.name,
    url: siteUrl,
    description: defaultDescription,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en-IN",
  };
}
