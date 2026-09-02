import type { Metadata } from "next";
import { site } from "@/lib/content";

export const siteUrl = site.url;

/**
 * Brand suffix for every title - `Page Name | Coreline Digital`.
 *
 * The registered name, not the `coreline.` wordmark. The lowercase mark is the
 * visual brand and stays everywhere it is drawn, but a title is a matching
 * string: someone searching "Coreline Digital Thane" was being matched against
 * a suffix that never contained those words. Nothing on the page changes.
 */
export const titleSuffix = site.legalName;

/**
 * Primary meta description (≤155 chars).
 *
 * Written in the words the buyer searches in, not the words an agency uses
 * about itself: price, place, and what it does. "Bespoke web architecture" was
 * invisible to someone typing "website for my clinic in thane".
 */
export const defaultDescription = `Websites for Thane and Mumbai businesses that bring you customers. From ${site.priceFrom}, live in ${site.deliveryShort}, half paid only when it goes live.`;

export const seoKeywords = [
  "Coreline Digital",
  "website designer Thane",
  "website design Thane price",
  "small business website Thane",
  "website development company Thane",
  "affordable website design Mumbai",
  "clinic website design India",
  "gym website design Thane",
  "coaching class website",
  "jewellery shop website",
  "WhatsApp booking website",
  "AI chatbot for business website",
  "Google Business Profile setup Thane",
  "local SEO Thane Mumbai",
  "Wagle Estate web designer",
] as const;

type PageSeoInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

/**
 * Nested `openGraph` / `twitter` replace the parent object entirely (Next.js
 * shallow merge). Every page that sets a title or canonical URL must spread
 * this, or WhatsApp/social cards lose the 1200×630 image from
 * `app/opengraph-image.tsx`.
 */
export const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.legalName} - websites for Thane businesses`,
} as const;

/** Page-level metadata - titles render as `Page | coreline.` via root template. */
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
      type: "website",
      locale: "en_IN",
      siteName: site.legalName,
      title: fullTitle,
      description,
      url,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage.url],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Local web design business - mirrors the GBP service categories. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organization`,
    name: site.legalName,
    alternateName: [site.name, "Coreline Digital Thane"],
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo-mark.png`,
      width: 508,
      height: 506,
    },
    image: {
      "@type": "ImageObject",
      url: `${siteUrl}/opengraph-image`,
      width: 1200,
      height: 630,
      caption: "Coreline Digital - websites for Thane businesses",
    },
    founder: { "@id": `${siteUrl}/#person` },
    description: defaultDescription,
    email: site.email,
    telephone: site.phone,
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
    // Omitted entirely while site.profiles is empty - an empty sameAs array is
    // a weaker signal than no sameAs at all. Fill site.profiles to switch on.
    ...(site.profiles.length > 0
      ? { sameAs: site.profiles.map((profile) => profile.href) }
      : {}),
    /**
     * Hours, so Maps and the local pack can show "Open now" rather than
     * nothing. These back the contact page's "same day if you reach out before
     * 6pm" promise - if the real hours change, change them here too, because
     * wrong hours in schema surface on Maps and cost you calls.
     */
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
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
      "Website design",
      "Website development",
      "Small business websites",
      "Online appointment booking",
      "Website chat assistants",
      "WhatsApp enquiry handling",
      "Google Business Profile",
      "Local SEO",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Coreline service lines",
      itemListElement: [
        {
          "@type": "Offer",
          // The one published number, so rich results can carry it too.
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "INR",
            minPrice: 15000,
            maxPrice: 35000,
          },
          itemOffered: {
            "@type": "Service",
            name: "Business website design and development",
            description:
              "A custom website that brings you customers - fast on mobile, set up on Google, with one clear action on every page.",
            areaServed: "Thane, Mumbai, Maharashtra",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website assistant and booking",
            description:
              "An assistant on your website that answers common questions instantly, sends enquiries to your WhatsApp, and takes booking requests.",
            areaServed: "Thane, Mumbai, Maharashtra",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Monthly upkeep",
            description:
              "Optional monthly plan: Google Business Profile, review requests, new photos and offers, and monitoring.",
            areaServed: "Thane, Mumbai, Maharashtra",
          },
        },
      ],
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: site.founderName,
    givenName: site.founderGiven,
    familyName: site.founderFamily,
    jobTitle: site.jobTitle,
    worksFor: { "@id": `${siteUrl}/#organization` },
    url: siteUrl,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Wagle Estate",
      addressLocality: "Thane",
      addressRegion: "Maharashtra",
      postalCode: "400604",
      addressCountry: "IN",
    },
  };
}

/** One Service node per vertical landing page. */
export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}${path}#service`,
    name,
    description,
    url: `${siteUrl}${path}`,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: [
      { "@type": "City", name: "Thane" },
      { "@type": "City", name: "Mumbai" },
    ],
    offers: {
      "@type": "Offer",
      url: `${siteUrl}${path}`,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "INR",
        minPrice: 15000,
        maxPrice: 35000,
      },
    },
  };
}

export function faqJsonLd(
  faqs: readonly { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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

/**
 * The page-level entity, tying a URL to the organization behind it.
 *
 * Until now every page emitted the same organization graph and nothing about
 * itself, so Google had no typed entity for `/contact` or `/services` - only a
 * repeated business card. `isPartOf` and `about` are what connect the two, and
 * `primaryImageOfPage` gives the share card an owner.
 *
 * `type` narrows the page for the templates Google treats specially:
 * ContactPage for reach-us pages, AboutPage for the business story,
 * CollectionPage for an index of other things.
 */
export function webPageJsonLd({
  title,
  description,
  path = "",
  type = "WebPage",
  breadcrumbId,
}: {
  title: string;
  description: string;
  path?: string;
  type?: "WebPage" | "ContactPage" | "AboutPage" | "CollectionPage";
  breadcrumbId?: string;
}) {
  const url = `${siteUrl}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: `${title} | ${titleSuffix}`,
    description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#organization` },
    primaryImageOfPage: `${siteUrl}/opengraph-image`,
    inLanguage: "en-IN",
    ...(breadcrumbId ? { breadcrumb: { "@id": breadcrumbId } } : {}),
  };
}

/**
 * Breadcrumb trail for a page.
 *
 * Pass the trail without Home - it is prepended here, so every crumb list
 * starts from the same node and the positions stay 1-indexed.
 */
export function breadcrumbJsonLd(
  trail: readonly { name: string; path: string }[],
) {
  const crumbs = [{ name: "Home", path: "" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}${trail.at(-1)?.path ?? ""}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path}`,
    })),
  };
}
