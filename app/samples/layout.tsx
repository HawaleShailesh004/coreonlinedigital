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
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: "/work" },
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
