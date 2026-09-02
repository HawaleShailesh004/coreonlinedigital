"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { process } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Node positions along the connector, matching the three column origins. */
const NODE_AT = [0, 1 / 3, 2 / 3];

/**
 * The scroll-linked connector.
 *
 * Two things this deliberately does NOT do, both of which the first version did:
 *
 *  1. Read getBoundingClientRect() on every animation frame. The element's
 *     position in the document and its height do not change while you scroll -
 *     only the viewport does - so the geometry is measured once and refreshed
 *     on resize. Reading a rect mid-scroll forces a synchronous layout on every
 *     single frame.
 *
 *  2. Push the continuous progress value through React state. That re-rendered
 *     this whole subtree ~60 times a second during a scroll, to move one line.
 *     The line is now driven by a --progress custom property written straight to
 *     the DOM node and consumed by a compositor-only scaleX, so scrolling costs
 *     no React work at all. React state now tracks only how many nodes have
 *     been passed, which changes at most three times.
 */
export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    // Reduced motion gets the finished state, not a blank line. The node
    // states are derived from reducedMotion below rather than pushed into
    // state here, so this only has to set the line.
    if (reducedMotion) {
      node.style.setProperty("--progress", "1");
      return;
    }

    let top = 0;
    let height = 1;
    let viewportHeight = window.innerHeight;
    let frame = 0;
    let lastReached = -1;

    const remeasure = () => {
      const rect = node.getBoundingClientRect();
      top = rect.top + window.scrollY;
      height = Math.max(rect.height, 1);
      viewportHeight = window.innerHeight;
    };

    const update = () => {
      frame = 0;
      const viewportTop = top - window.scrollY;
      const raw = (viewportHeight * 0.7 - viewportTop) / height;
      const progress = Math.min(1, Math.max(0, raw));

      node.style.setProperty("--progress", progress.toFixed(4));

      const count = NODE_AT.filter((at) => progress >= at - 0.01).length;
      if (count !== lastReached) {
        lastReached = count;
        setReached(count);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const onResize = () => {
      remeasure();
      onScroll();
    };

    remeasure();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Fonts and images landing late change this block's height.
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(node);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  const isReached = (index: number) => reducedMotion || index < reached;

  return (
    <Section bordered>
      <div ref={sectionRef}>
        <Eyebrow>{process.eyebrow}</Eyebrow>

        {/* Desktop: horizontal connector filling left to right with scroll. */}
        <div className="relative mt-16 hidden h-px w-full bg-hairline lg:block">
          <div
            className="absolute inset-0 origin-left bg-accent"
            style={{ transform: "scaleX(var(--progress, 0))" }}
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

        <div className="relative mt-10 lg:mt-12">
          {/* Mobile and tablet: the same connector, run down the left edge. */}
          <div
            className="absolute inset-y-0 left-0 w-px bg-hairline lg:hidden"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 origin-top bg-accent"
              style={{ transform: "scaleY(var(--progress, 0))" }}
            />
          </div>

          <ol className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {process.steps.map((item, index) => (
              <li key={item.number} className="relative pl-8 lg:pl-0 lg:pr-8">
                <span
                  className={cn(
                    "absolute left-0 top-1.5 size-[9px] -translate-x-1/2 rounded-full border transition-colors duration-300 ease-out lg:hidden",
                    isReached(index)
                      ? "border-accent bg-accent"
                      : "border-grey bg-paper",
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
                <h3 className="mt-4 font-display text-h3 font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 text-small text-grey">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
