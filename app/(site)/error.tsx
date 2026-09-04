"use client";

import { useEffect } from "react";
import { WhatsAppButton } from "@/components/v3/CtaButtons";

export default function SiteError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[site] render failed");
  }, []);

  return (
    <section className="flex min-h-[70vh] flex-col items-start justify-center py-24">
      <div className="v3-container">
        <p className="text-xs uppercase tracking-[0.14em] opacity-60">Something broke</p>
        <h1 className="v3-display mt-4 max-w-2xl text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.05] tracking-[-0.02em]">
          That page didn&apos;t load.
        </h1>
        <p className="mt-6 max-w-xl text-[15px] opacity-70">
          Try again, or message us on WhatsApp and we&apos;ll sort it.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button type="button" onClick={reset} className="v3-pill v3-pill--outline">
            Try again
          </button>
          <WhatsAppButton context="the error page" />
        </div>
      </div>
    </section>
  );
}
