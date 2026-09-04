import type { Metadata } from "next";
import { IBM_Plex_Mono, Schibsted_Grotesk } from "next/font/google";
import "./thread.css";

/**
 * A warm, slightly humanist grotesque — this concept is a conversation, and
 * Inter-style neutrality would make it read as a product UI instead.
 */
const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--th-font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--th-font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thread — Coreline concept B",
  robots: { index: false, follow: false },
};

export default function ThreadLayout({ children }: { children: React.ReactNode }) {
  return <div className={`th ${sans.variable} ${mono.variable}`}>{children}</div>;
}
