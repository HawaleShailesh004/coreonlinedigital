"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Counts an integer up to `value` the first time it scrolls into view.
 *
 * Written for the gym's pricing table, where the brief asks for the numbers to
 * animate in. Renders the final value on the server and under reduced motion,
 * so the price is never missing or wrong for anyone.
 */
export function CountUp({
  value,
  duration = 900,
  prefix = "",
  className,
}: {
  value: number;
  duration?: number;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (reducedMotion) {
      setShown(value);
      return;
    }

    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          // Ease-out: the number decelerates into its final value.
          const eased = 1 - (1 - progress) ** 3;
          setShown(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };

        setShown(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [duration, reducedMotion, value]);

  return (
    <span ref={ref} className={className}>
      {/* Tabular figures keep the column from jittering while it counts. */}
      <span className="tabular-nums">
        {prefix}
        {shown.toLocaleString("en-IN")}
      </span>
    </span>
  );
}
