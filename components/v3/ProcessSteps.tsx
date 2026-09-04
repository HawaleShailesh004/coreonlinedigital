"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

type Step = { title: string; body: string };

/**
 * How we work — scroll-driven reveal. Sticky stage; as you scroll, steps
 * activate one by one with a progress rail (no blink / pulse).
 */
export function ProcessSteps({ heading, steps }: { heading: string; steps: readonly Step[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setActive(steps.length - 1);
      return;
    }
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const tick = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) {
        setActive(steps.length - 1);
        return;
      }
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      const index = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActive(index);
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
  }, [reducedMotion, steps.length]);

  const fill = reducedMotion ? 1 : (active + 1) / steps.length;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: reducedMotion ? undefined : `${steps.length * 70}vh` }}
      aria-label={heading}
    >
      <div className="sticky top-0 flex min-h-svh items-center py-24">
        <div className="v3-container w-full">
          <h2 className="v3-display text-[clamp(1.45rem,3.2vw,1.9rem)]">{heading}</h2>

          <div className="mt-12 grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
            {/* Progress rail */}
            <div className="hidden lg:flex flex-col items-center pt-2" aria-hidden="true">
              <div className="v3-process-rail">
                <i style={{ transform: `scaleY(${fill})` }} />
              </div>
            </div>

            <ol className="flex flex-col gap-0">
              {steps.map((step, i) => {
                const state = i < active ? "done" : i === active ? "active" : "idle";
                return (
                  <li
                    key={step.title}
                    className={cn("v3-process-row", `v3-process-row--${state}`)}
                  >
                    <span className="v3-process-row__num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="v3-display text-[clamp(1.35rem,2.8vw,1.85rem)] tracking-[-0.02em]">
                        {step.title}
                      </p>
                      <p className="v3-process-row__body mt-2 max-w-md text-[15px] leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
