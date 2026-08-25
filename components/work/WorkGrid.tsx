"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { WorkCard } from "@/components/WorkCard";
import { cn } from "@/lib/cn";
import { workSamples, type Industry } from "@/lib/content";

type Filter = "All" | Industry;

export function WorkGrid() {
  const filters = useMemo<Filter[]>(() => {
    const industries = Array.from(new Set(workSamples.map((s) => s.industry)));
    return ["All", ...industries];
  }, []);

  const [active, setActive] = useState<Filter>("All");
  const tabsRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;

    const sync = () => {
      const current = container.querySelector<HTMLElement>(
        '[data-active="true"]',
      );
      if (!current) return;
      setIndicator({ left: current.offsetLeft, width: current.offsetWidth });
    };

    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [active, filters]);

  const visible =
    active === "All"
      ? workSamples
      : workSamples.filter((sample) => sample.industry === active);

  return (
    <div>
      <div className="relative border-b border-hairline">
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Filter samples by industry"
          className="flex gap-8 overflow-x-auto pb-4"
        >
          {filters.map((filter) => {
            const isActive = filter === active;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-active={isActive}
                onClick={() => setActive(filter)}
                className={cn(
                  "shrink-0 font-mono text-label uppercase transition-colors duration-150 ease-linear",
                  isActive ? "text-accent" : "text-grey hover:text-ink",
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>
        {/* Sliding underline - same interaction language as the nav. */}
        <span
          className="absolute -bottom-px h-0.5 bg-accent transition-[left,width] duration-200 ease-out"
          style={{ left: indicator.left, width: indicator.width }}
          aria-hidden="true"
        />
      </div>

      <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((sample) => (
          <li key={sample.slug}>
            <WorkCard sample={sample} />
          </li>
        ))}
      </ul>
    </div>
  );
}
