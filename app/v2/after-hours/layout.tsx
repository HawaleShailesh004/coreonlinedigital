import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./after-hours.css";

/**
 * A serif on a night-blue ground, not a grotesque on black. The subject is the
 * hours a business is unattended, which is a human problem before it is a
 * technical one — the display face is chosen to say that.
 */
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--ah-font-serif",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ah-font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--ah-font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "After Hours — Coreline concept A",
  robots: { index: false, follow: false },
};

export default function AfterHoursLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`ah ah-grain ${serif.variable} ${sans.variable} ${mono.variable}`}>
      {children}
    </div>
  );
}
