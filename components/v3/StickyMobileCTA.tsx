"use client";

import { useEffect, useState } from "react";
import { site, whatsappHref, cta } from "@/lib/site-content";
import { CallIcon, WhatsAppIcon } from "@/components/v3/icons";

/**
 * Mobile-only, appears once the visitor scrolls past the hero (brief §5).
 * Desktop relies on in-page CTAs; this bar is mobile-only.
 */
export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight * 0.7);
        frame = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    // `inert` (not just aria-hidden) while off-screen: aria-hidden alone
    // still leaves the two links focusable, which fails the
    // aria-hidden-focus a11y rule and lets keyboard users tab into a bar
    // that's translated out of view.
    <div className="v3-sticky-cta sm:hidden" data-visible={visible} aria-hidden={!visible} inert={!visible}>
      <a href={site.phoneHref} className="flex items-center justify-center gap-2 py-4 v3-display text-sm font-semibold">
        <CallIcon className="size-4" />
        {cta.secondary}
      </a>
      <a
        href={whatsappHref("the mobile bar")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-4 v3-display text-sm font-semibold"
        style={{ backgroundColor: "var(--emerald)", color: "var(--emerald-ink)" }}
      >
        <WhatsAppIcon className="size-4" />
        {cta.primary}
      </a>
    </div>
  );
}
