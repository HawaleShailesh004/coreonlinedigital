import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/content";
import {
  defaultDescription,
  organizationJsonLd,
  personJsonLd,
  seoKeywords,
  shareImage,
  siteUrl,
  titleSuffix,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const defaultTitle = `Website Design in Thane, From ${site.priceFrom} | ${titleSuffix}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${titleSuffix}`,
  },
  description: defaultDescription,
  keywords: [...seoKeywords],
  authors: [{ name: site.founderName, url: siteUrl }],
  creator: site.founderName,
  publisher: site.legalName,
  applicationName: site.legalName,
  category: "Business",
  // No site-wide canonical. Metadata inherits down the tree, so `canonical: "/"`
  // here was not a default - it was a claim that every page which forgets to
  // override it is a duplicate of the homepage. The six public pages each set
  // their own through pageMetadata(); the sample pages deliberately set none,
  // and were the ones inheriting this and pointing at the homepage.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: site.legalName,
    title: defaultTitle,
    description: defaultDescription,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [shareImage.url],
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f7f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <head>
        {/* Reveal animations are JS-driven; without JS the content must still render. */}
        <noscript>
          <style>{`.reveal,.hero-step{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(), personJsonLd()]} />
        {children}
      </body>
    </html>
  );
}
