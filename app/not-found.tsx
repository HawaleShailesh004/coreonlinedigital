import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import "./(site)/site-theme.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * Has to live at the app root: that is the only place Next.js reads for
 * unmatched URLs across the whole app. Deliberately self-contained rather
 * than importing Nav/Footer/ChatWidget - Next.js serialises the root
 * not-found into every page's payload as the fallback boundary, so pulling
 * the full Coreline chrome in here would ship it into every /samples page
 * too. It imports the new theme stylesheet directly instead.
 */
export default function NotFound() {
  return (
    <div className="v3 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <Link href="/" className="flex items-center gap-2.5">
        <LogoMark className="size-7 text-[var(--emerald)]" />
        <span className="v3-display text-lg font-semibold">Coreline Digital</span>
      </Link>

      <h1 className="v3-display mt-16 text-[clamp(2rem,6vw,3.5rem)] leading-[0.98] tracking-[-0.03em]">
        THIS PAGE
        <br />
        IS MISSING TOO.
      </h1>
      <p className="mt-6 max-w-md text-[15px] opacity-70">
        The page you asked for isn&apos;t here. Everything else still is.
      </p>

      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <Link href="/" className="v3-pill v3-pill--primary">
          Back to home
        </Link>
        <Link href="/work" className="v3-pill v3-pill--outline">
          See the work
        </Link>
      </div>
    </div>
  );
}
