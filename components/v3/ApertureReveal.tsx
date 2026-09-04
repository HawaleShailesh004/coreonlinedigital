"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Sticky section, circular mask opening on scroll progress (brief §6.10 /
 * coreline-g-aperture.html). A solid ink cover sits over `children`; the
 * mask punches a growing hole as the section scrolls through its sticky
 * range, with a thin emerald ring tracing the hole's edge.
 *
 * Reduced motion: cover is skipped entirely, content renders plainly.
 */
export function ApertureReveal({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const cover = coverRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!section || !cover || !ring || !glow) return;

    let frame = 0;
    const maxRadius = () => Math.hypot(window.innerWidth, window.innerHeight) * 0.62;

    const tick = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? -rect.top / scrollable : 0;
      const clamped = Math.max(0, Math.min(1, progress));
      const radius = clamped * maxRadius();
      const r = `${radius}px`;
      cover.style.setProperty("--v3-r", r);
      ring.style.setProperty("--v3-r", r);
      glow.style.setProperty("--v3-r", r);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <div ref={sectionRef} className="relative" style={{ height: reducedMotion ? undefined : "250vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden" style={{ backgroundColor: "var(--ink)" }}>
        <div className="v3-container relative z-0 max-w-2xl text-center">{children}</div>
        {!reducedMotion && (
          <>
            <div
              ref={coverRef}
              className="v3-aperture-mask absolute inset-0 z-10"
              style={{ backgroundColor: "var(--ink)" }}
              aria-hidden="true"
            />
            <div ref={glowRef} className="v3-aperture-glow z-20" aria-hidden="true" />
            <div ref={ringRef} className="v3-aperture-ring z-20" aria-hidden="true" />
          </>
        )}
      </div>
    </div>
  );
}
