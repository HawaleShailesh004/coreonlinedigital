import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./lab.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--lab-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--lab-body",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--lab-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lab — Coreline concepts",
  robots: { index: false, follow: false },
};

/**
 * Isolated playground for dark revamp concepts. Does not use the main site
 * chrome (Nav / Footer / SiteAssistant) so each sample can invent its own.
 */
export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`lab-root ${syne.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      {children}
    </div>
  );
}
