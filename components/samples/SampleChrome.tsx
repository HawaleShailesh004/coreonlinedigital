"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { pageWhatsappHref, site } from "@/lib/content";
import type { SampleSlug } from "@/lib/samples";

/**
 * The one place a sample is allowed to say it is a Coreline concept build.
 * In-world forms and footers stay in character; this bar is the exit.
 */
export function SampleChrome({ sample }: { sample: SampleSlug }) {
  const [sheet, setSheet] = useState<"whatsapp" | "phone" | null>(null);
  const titleId = useId();
  const realWhatsapp = pageWhatsappHref(`/samples/${sample}`);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (!href) return;

      const isWhatsapp = href.includes("wa.me/");
      const isPhone = href.startsWith("tel:");
      if (!isWhatsapp && !isPhone) return;
      if (href.includes(site.whatsappNumber)) return;

      event.preventDefault();
      setSheet(isWhatsapp ? "whatsapp" : "phone");
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!sheet) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setSheet(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheet]);

  return (
    <>
      <div className="sample-chrome sticky top-0 z-[80] flex h-9 items-center justify-between gap-4 border-b border-[#d5d8d4] bg-[#f6f7f5] px-4 text-[#1a1f1c] sm:px-8">
        <p className="min-w-0 truncate font-mono text-[0.625rem] uppercase tracking-[0.14em]">
          Concept build by Coreline Digital
        </p>
        <Link
          href="/work"
          className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-[#2f6b57] underline-offset-4 hover:underline"
        >
          Back to samples
        </Link>
      </div>

      {sheet && (
        <div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-[#1a1f1c]/40 p-4 sm:items-center"
          onClick={() => setSheet(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-md border border-[#d5d8d4] bg-[#f6f7f5] p-6 text-[#1a1f1c] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <p id={titleId} className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-[#6b726e]">
              This is a sample site
            </p>
            <p className="mt-4 text-base leading-relaxed">
              {sheet === "whatsapp"
                ? "That WhatsApp number belongs to the fictional business on this page. Message Shailesh if you want a site like this."
                : "That phone number is part of the sample. Message Shailesh on WhatsApp if you want a site like this."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={realWhatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center bg-[#1a1f1c] px-6 py-3 text-sm font-medium text-[#f6f7f5]"
              >
                {site.primaryCta}
              </a>
              <button
                type="button"
                onClick={() => setSheet(null)}
                className="inline-flex items-center justify-center border border-[#d5d8d4] px-6 py-3 text-sm font-medium"
              >
                Stay on the sample
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
