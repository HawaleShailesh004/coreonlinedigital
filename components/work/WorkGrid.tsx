"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { WorkCard } from "@/components/WorkCard";
import { cn } from "@/lib/cn";
import { workSamples, type Industry } from "@/lib/content";

type Filter = "All" | Industry;

function tabId(filter: Filter) {
  return `work-tab-${filter.replace(/[^a-z0-9]+/gi, "-").replace(/-+$/g, "")}`;
}

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
      <h2 className="sr-only">All sample sites</h2>
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
                id={tabId(filter)}
                aria-controls="work-sample-panel"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                data-active={isActive}
                onClick={() => setActive(filter)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                  event.preventDefault();
                  const index = filters.indexOf(filter);
                  const next =
                    event.key === "ArrowRight"
                      ? (index + 1) % filters.length
                      : (index - 1 + filters.length) % filters.length;
                  setActive(filters[next]!);
                  tabsRef.current
                    ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
                    [next]?.focus();
                }}
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
        {/*
          Sliding underline - same interaction language as the nav.

          Driven by transform, not left/width. Those are layout properties, so
          transitioning them ran layout and paint on every frame of the slide;
          translate and scale are composited and cost nothing. The bar is 1px
          wide and scaled up to the tab width, which is why scaleX takes the
          raw pixel value.
        */}
        <span
          className="absolute -bottom-px left-0 h-0.5 w-px origin-left bg-accent transition-transform duration-200 ease-out"
          style={{
            transform: `translateX(${indicator.left}px) scaleX(${indicator.width})`,
          }}
          aria-hidden="true"
        />
      </div>

      <ul
        id="work-sample-panel"
        role="tabpanel"
        aria-labelledby={tabId(active)}
        className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((sample) => (
          <li key={sample.slug}>
            <WorkCard sample={sample} />
          </li>
        ))}
      </ul>
    </div>
  );
}
