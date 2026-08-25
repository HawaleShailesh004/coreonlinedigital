"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { process } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Node positions along the connector, matching the three column origins. */
const NODE_AT = [0, 1 / 3, 2 / 3];

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(0);
  // Reduced motion gets the finished state, not a blank line.
  const progress = reducedMotion ? 1 : scrolled;

  useEffect(() => {
    if (reducedMotion) return;

    const node = sectionRef.current;
    if (!node) return;

    let frame = 0;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      const trigger = window.innerHeight * 0.7;
      const raw = (trigger - rect.top) / Math.max(rect.height, 1);
      setScrolled(Math.min(1, Math.max(0, raw)));
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  const isReached = (index: number) => progress >= NODE_AT[index] - 0.01;

  return (
    <Section bordered>
      <div ref={sectionRef}>
        <Eyebrow>{process.eyebrow}</Eyebrow>

        {/* Desktop: horizontal connector filling left to right with scroll. */}
        <div className="relative mt-16 hidden h-px w-full bg-hairline md:block">
          <div
            className="absolute inset-y-0 left-0 bg-accent"
            style={{ width: `${progress * 100}%` }}
          />
          {NODE_AT.map((position, index) => (
            <span
              key={position}
              className={cn(
                "absolute top-1/2 size-[9px] -translate-y-1/2 rounded-full border transition-colors duration-300 ease-out",
                isReached(index)
                  ? "border-accent bg-accent"
                  : "border-grey bg-paper",
              )}
              style={{ left: `${position * 100}%` }}
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="relative mt-10 md:mt-12">
          {/* Mobile: the same connector, rotated to run down the left edge. */}
          <div className="absolute inset-y-0 left-0 w-px bg-hairline md:hidden" aria-hidden="true">
            <div
              className="absolute inset-x-0 top-0 bg-accent"
              style={{ height: `${progress * 100}%` }}
            />
          </div>

          <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
            {process.steps.map((item, index) => (
              <li key={item.number} className="relative pl-8 md:pl-0 md:pr-8">
                <span
                  className={cn(
                    "absolute left-0 top-1.5 size-[9px] -translate-x-1/2 rounded-full border transition-colors duration-300 ease-out md:hidden",
                    isReached(index) ? "border-accent bg-accent" : "border-grey bg-paper",
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "font-mono text-label uppercase transition-colors duration-300 ease-out",
                    isReached(index) ? "text-accent" : "text-grey",
                  )}
                >
                  {item.number}
                </span>
                <h3 className="mt-4 font-display text-h3 font-semibold">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.65] text-grey">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
