"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WorkCard } from "@/components/WorkCard";
import { cn } from "@/lib/cn";
import { workSamples, type Industry } from "@/lib/content";

type Filter = "All" | Industry;

type ScrollRail = {
  scrollable: boolean;
  thumbWidth: number;
  thumbLeft: number;
  canScrollLeft: boolean;
  canScrollRight: boolean;
};

function tabId(filter: Filter) {
  return `work-tab-${filter.replace(/[^a-z0-9]+/gi, "-").replace(/-+$/g, "")}`;
}

const initialRail: ScrollRail = {
  scrollable: false,
  thumbWidth: 100,
  thumbLeft: 0,
  canScrollLeft: false,
  canScrollRight: false,
};

export function WorkGrid() {
  const filters = useMemo<Filter[]>(() => {
    const industries = Array.from(new Set(workSamples.map((s) => s.industry)));
    return ["All", ...industries];
  }, []);

  const [active, setActive] = useState<Filter>("All");
  const tabsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startScrollLeft: number } | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [rail, setRail] = useState<ScrollRail>(initialRail);

  const syncTabs = useCallback(() => {
    const container = tabsRef.current;
    if (!container) return;

    const current = container.querySelector<HTMLElement>('[data-active="true"]');
    if (current) {
      setIndicator({ left: current.offsetLeft, width: current.offsetWidth });
    }

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const scrollable = scrollWidth > clientWidth + 1;
    const thumbWidth = scrollable ? (clientWidth / scrollWidth) * 100 : 100;
    const maxTravel = 100 - thumbWidth;
    const scrollRatio = scrollable
      ? scrollLeft / Math.max(1, scrollWidth - clientWidth)
      : 0;

    setRail({
      scrollable,
      thumbWidth,
      thumbLeft: scrollRatio * maxTravel,
      canScrollLeft: scrollLeft > 4,
      canScrollRight: scrollLeft < scrollWidth - clientWidth - 4,
    });
  }, []);

  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;

    syncTabs();
    container.addEventListener("scroll", syncTabs, { passive: true });
    window.addEventListener("resize", syncTabs);

    const observer = new ResizeObserver(syncTabs);
    observer.observe(container);
    const inner = container.firstElementChild;
    if (inner) observer.observe(inner);

    return () => {
      container.removeEventListener("scroll", syncTabs);
      window.removeEventListener("resize", syncTabs);
      observer.disconnect();
    };
  }, [active, filters, syncTabs]);

  const scrollTabs = useCallback((delta: number) => {
    tabsRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  const scrollToRatio = useCallback((ratio: number) => {
    const container = tabsRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    container.scrollLeft = Math.max(0, Math.min(maxScroll, ratio * maxScroll));
  }, []);

  const onWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    const container = tabsRef.current;
    if (!container || container.scrollWidth <= container.clientWidth + 1) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

    event.preventDefault();
    container.scrollLeft += event.deltaY;
  }, []);

  const onTrackPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const track = trackRef.current;
      const container = tabsRef.current;
      if (!track || !container || !rail.scrollable) return;

      const rect = track.getBoundingClientRect();
      const ratio = (event.clientX - rect.left) / rect.width;
      scrollToRatio(ratio);

      dragRef.current = {
        startX: event.clientX,
        startScrollLeft: container.scrollLeft,
      };
      track.setPointerCapture(event.pointerId);
    },
    [rail.scrollable, scrollToRatio],
  );

  const onTrackPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      const track = trackRef.current;
      const container = tabsRef.current;
      if (!drag || !track || !container) return;

      const rect = track.getBoundingClientRect();
      const deltaX = event.clientX - drag.startX;
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollLeft =
        drag.startScrollLeft + (deltaX / rect.width) * maxScroll;
    },
    [],
  );

  const onTrackPointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    trackRef.current?.releasePointerCapture(event.pointerId);
  }, []);

  const visible =
    active === "All"
      ? workSamples
      : workSamples.filter((sample) => sample.industry === active);

  return (
    <div>
      <h2 className="sr-only">All sample sites</h2>
      <div className="relative border-b border-hairline">
        <div className="relative flex items-stretch">
          {rail.canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollTabs(-160)}
              aria-label="Scroll filters left"
              className="absolute left-0 top-0 z-20 flex h-full w-8 items-center justify-start bg-gradient-to-r from-paper via-paper/90 to-transparent pl-0 text-grey transition-colors hover:text-ink"
            >
              <Chevron dir="left" />
            </button>
          )}

          {rail.canScrollRight && (
            <button
              type="button"
              onClick={() => scrollTabs(160)}
              aria-label="Scroll filters right"
              className="absolute right-0 top-0 z-20 flex h-full w-8 items-center justify-end bg-gradient-to-l from-paper via-paper/90 to-transparent pr-0 text-grey transition-colors hover:text-ink"
            >
              <Chevron dir="right" />
            </button>
          )}

          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Filter samples by industry"
            onWheel={onWheel}
            className="scroll-hidden-x min-w-0 flex-1 overflow-x-auto overscroll-x-contain"
          >
            <div className="relative flex w-max min-w-full gap-8 pb-3">
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

              <span
                className="absolute bottom-0 left-0 h-0.5 w-px origin-left bg-accent transition-transform duration-200 ease-out"
                style={{
                  transform: `translateX(${indicator.left}px) scaleX(${indicator.width})`,
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {rail.scrollable && (
          <div
            ref={trackRef}
            role="presentation"
            onPointerDown={onTrackPointerDown}
            onPointerMove={onTrackPointerMove}
            onPointerUp={onTrackPointerUp}
            onPointerCancel={onTrackPointerUp}
            className="relative mt-1 h-px cursor-pointer bg-hairline touch-none"
            aria-hidden="true"
          >
            <span
              className="absolute top-0 h-px bg-body transition-[left,width] duration-150 ease-out"
              style={{
                left: `${rail.thumbLeft}%`,
                width: `${rail.thumbWidth}%`,
              }}
            />
          </div>
        )}
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

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dir === "left" ? (
        <path d="M10 3 5 8l5 5" />
      ) : (
        <path d="M6 3l5 5-5 5" />
      )}
    </svg>
  );
}
