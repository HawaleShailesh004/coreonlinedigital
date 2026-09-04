"use client";

import { useCallback, useRef } from "react";
import { WorkCard } from "@/components/WorkCard";
import { Reveal } from "@/components/ui/Reveal";
import type { WorkSample } from "@/lib/content";

/**
 * Horizontal sample rail for the homepage. Cards stay full height; the track
 * peeks the next card so it reads as a live strip, not a static 3-up grid.
 * Vertical wheel scrolls horizontally when the rail overflows.
 */
export function WorkTeaserRail({ samples }: { samples: WorkSample[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const onWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    if (track.scrollWidth <= track.clientWidth + 1) return;

    // Prefer horizontal intent; otherwise map vertical wheel to sideways scroll.
    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (delta === 0) return;

    const atStart = track.scrollLeft <= 0;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;

    event.preventDefault();
    track.scrollLeft += delta;
  }, []);

  return (
    <div
      ref={trackRef}
      onWheel={onWheel}
      className="scroll-hidden-x mt-16 -mx-5 overflow-x-auto px-5 md:-mx-8 md:px-8"
    >
      <ul className="flex w-max gap-6 pb-1 md:gap-8">
        {samples.map((sample, index) => (
          <Reveal as="li" key={sample.slug} delay={index * 80} className="w-[min(20rem,78vw)] shrink-0 md:w-[22rem]">
            <WorkCard sample={sample} />
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
