import type { Metadata } from "next";
import { Archivo, Space_Mono } from "next/font/google";
import "./switchboard.css";

/** Industrial grotesque plus a drafting-table mono. The page is a drawing. */
const sans = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--sw-font-sans",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--sw-font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Switchboard — Coreline concept C",
  robots: { index: false, follow: false },
};

export default function SwitchboardLayout({ children }: { children: React.ReactNode }) {
  return <div className={`sw ${sans.variable} ${mono.variable}`}>{children}</div>;
}
