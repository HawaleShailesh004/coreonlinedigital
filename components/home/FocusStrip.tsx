"use client";

import { Container } from "@/components/ui/Container";
import { focusStrip } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * The one intentional infinite loop on the site - reads as a live ticker.
 * The track holds two identical halves so the -50% translate loops seamlessly.
 */
export function FocusStrip() {
  const reducedMotion = useReducedMotion();
  const lane = reducedMotion
    ? focusStrip.items
    : [...focusStrip.items, ...focusStrip.items];

  return (
    <div className="border-y border-hairline py-6">
      <Container className="flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
        <p className="shrink-0 font-mono text-label uppercase text-grey">
          {focusStrip.eyebrow}
        </p>

        {reducedMotion ? (
          <ul className="flex min-w-0 flex-1 flex-wrap items-center gap-x-8 gap-y-2">
            {focusStrip.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-8 font-display text-sm font-medium"
              >
                {item}
                <span
                  className="size-1 rounded-full bg-accent"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="marquee-shell relative min-w-0 flex-1 overflow-hidden">
            <div className="marquee-track flex w-max items-center">
              {lane.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="flex shrink-0 items-center gap-8 pr-8 font-display text-sm font-medium whitespace-nowrap"
                  aria-hidden={index >= focusStrip.items.length}
                >
                  {item}
                  <span
                    className="size-1 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                </span>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
