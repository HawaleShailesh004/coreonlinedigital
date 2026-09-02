import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./samples.css";

/**
 * Body font for every sample. Each sample page loads its own display face on
 * top of this, so a visitor only downloads the two families that page uses.
 */
const interSamples = Inter({
  subsets: ["latin"],
  variable: "--font-inter-s",
  display: "swap",
});

export const metadata: Metadata = {
  // The businesses in these builds are fictional, so they stay out of search.
  // The indexed /work page is what describes the samples publicly.
  //
  // `follow` is true on purpose: /work links to all ten samples, and with
  // `follow: false` every one of those links was a dead end that trapped the
  // link equity /work had accumulated. Following them costs nothing - the pages
  // still never get indexed - and lets that equity flow back to /work and
  // /contact through the sample navigation.
  robots: { index: false, follow: true, nocache: true },
  // No canonical here on purpose. A canonical pointing at /work claimed these
  // pages were duplicates of it, which they are not - and pairing `noindex`
  // with a canonical to a different URL sends Google two contradictory
  // instructions about the same page. `noindex` alone is the unambiguous one.
};

export default function SamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${interSamples.variable} flex flex-1 flex-col`}>
      {children}
    </div>
  );
}
