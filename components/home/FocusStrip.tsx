"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { focusStrip, type FocusStripItem } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * The one intentional infinite loop on the site - reads as a live ticker.
 * The track holds two identical halves so the -50% translate loops seamlessly.
 * Four of the labels are real pages; the rest stay text until they earn a URL.
 */
function StripLabel({
  item,
  inert = false,
}: {
  item: FocusStripItem;
  inert?: boolean;
}) {
  const className = "font-display text-sm font-medium";

  if (item.href) {
    return (
      <Link
        href={item.href}
        tabIndex={inert ? -1 : undefined}
        className={`${className} transition-colors duration-150 ease-linear hover:text-accent`}
      >
        {item.label}
      </Link>
    );
  }

  return <span className={className}>{item.label}</span>;
}

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
                key={item.label}
                className="flex items-center gap-8"
              >
                <StripLabel item={item} />
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
                  key={`${item.label}-${index}`}
                  className="flex shrink-0 items-center gap-8 pr-8 whitespace-nowrap"
                  aria-hidden={index >= focusStrip.items.length}
                >
                  <StripLabel
                    item={item}
                    inert={index >= focusStrip.items.length}
                  />
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
