import { Nav } from "@/components/Nav";
import { SiteAssistant } from "@/components/chat/SiteAssistant";
import { Footer } from "@/components/Footer";

/**
 * The Coreline-branded shell. Sample vertical sites under /samples sit outside
 * this group so none of this chrome leaks into them.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-label focus:uppercase focus:text-paper"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="flex-1 pb-[calc(3rem+env(safe-area-inset-bottom))] sm:pb-0">
        {children}
      </main>
      <Footer />
      <SiteAssistant />
    </>
  );
}
