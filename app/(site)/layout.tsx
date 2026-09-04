import type { Viewport } from "next";
import { Archivo, Inter_Tight } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/v3/StickyMobileCTA";
import { ChatWidget } from "@/components/v3/ChatWidget";
import "./site-theme.css";

/**
 * Display: Archivo (300 / 400 / 600 / 800). Body: Inter Tight (400 / 500).
 * Weights match `app/coreline-hero-scroll-effects.html`.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  weight: "variable",
  variable: "--font-archivo",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#060a08",
  width: "device-width",
  initialScale: 1,
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`v3 ${archivo.variable} ${interTight.variable}`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:px-4 focus:py-2 v3-display focus:text-xs focus:uppercase"
        style={{ backgroundColor: "var(--emerald)", color: "var(--emerald-ink)" }}
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="pb-[calc(3.5rem+env(safe-area-inset-bottom))] sm:pb-0">
        {children}
      </main>
      <Footer />
      <StickyMobileCTA />
      <ChatWidget />
    </div>
  );
}
