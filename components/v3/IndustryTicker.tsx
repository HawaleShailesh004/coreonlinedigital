"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { industryTicker } from "@/lib/site-content";

/**
 * Scroll-velocity-reactive marquee (brief §6 / coreline-i-kinetic.html).
 * Content is duplicated once for a seamless loop; speed = base + a factor
 * of how fast the page scrolled since the last frame.
 */
export function IndustryTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let lastY = window.scrollY;
    let frame = 0;
    let half = track.scrollWidth / 2;

    const measure = () => {
      half = track.scrollWidth / 2;
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    const tick = () => {
      const y = window.scrollY;
      const velocity = Math.min(Math.abs(y - lastY), 40);
      lastY = y;
      x -= 0.6 + velocity * 0.09;
      if (-x > half && half > 0) x += half;
      track.style.transform = `translateX(${x}px)`;
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [reducedMotion]);

  const items = [...industryTicker, ...industryTicker];

  return (
    <div className="v3-hairline-t v3-hairline-b relative z-10 overflow-hidden py-4" style={{ backgroundColor: "var(--ink)" }}>
      <div ref={trackRef} className="v3-ticker-track">
        {items.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap px-4 text-sm uppercase tracking-[0.1em] opacity-70">
            {item}
            <span className="ml-4" style={{ color: "var(--emerald)" }}>
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
