"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Word-by-word reading highlight (brief §6.5 / coreline-i-kinetic.html).
 * `emeraldWords` land in emerald once lit; every other word lights bone.
 * Reduced motion: every word renders pre-lit, no listener attached.
 */
export function ReadingHighlight({
  text,
  emeraldWords = [],
  className,
}: {
  text: string;
  emeraldWords?: readonly string[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const words = text.split(/(\s+)/).filter((w) => w.length > 0);
  const emeraldSet = new Set(emeraldWords.map((w) => w.toLowerCase().replace(/[^a-z]/g, "")));

  useEffect(() => {
    if (reducedMotion) return;
    const node = ref.current;
    if (!node) return;
    const wordEls = Array.from(node.querySelectorAll<HTMLSpanElement>("[data-word]"));
    let frame = 0;

    const tick = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const progress =
        (window.innerHeight * 0.72 - rect.top) / (rect.height + window.innerHeight * 0.4);
      const clamped = Math.max(0, Math.min(1, progress));
      const litCount = Math.round(clamped * wordEls.length);
      wordEls.forEach((el, i) => {
        el.dataset.lit = i < litCount ? "true" : "false";
      });
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
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        if (/^\s+$/.test(word)) return word;
        const key = emeraldSet.has(word.toLowerCase().replace(/[^a-z]/g, ""));
        return (
          <span
            key={i}
            data-word
            data-key={key}
            data-lit={reducedMotion ? "true" : "false"}
            className="v3-rhw"
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}
