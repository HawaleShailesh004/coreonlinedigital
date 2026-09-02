"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One IntersectionObserver for every reveal on the page.
 *
 * Each <Reveal> used to construct its own observer, so a page with a dozen of
 * them created a dozen observers watching a dozen single-element sets. One
 * shared observer does the same job for one allocation and one callback, and
 * the browser batches its work instead of interleaving twelve of them.
 *
 * The observer is created lazily on first use and torn down when the last
 * element unregisters, so it never outlives the components that need it.
 */

type Callback = () => void;

const OPTIONS: IntersectionObserverInit = {
  threshold: 0.15,
  rootMargin: "0px 0px -10% 0px",
};

let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, Callback>();
let watched = 0;

function ensureObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      // The second clause is the important one. A fast flick-scroll can carry
      // an element from below the fold to above it between two frames, so it
      // never reports as intersecting - and a plain isIntersecting check would
      // leave that section invisible for the rest of the session. Anything
      // that has ended up above the viewport has been scrolled past, so it
      // gets revealed too.
      const scrolledPast = entry.boundingClientRect.bottom < 0;
      if (!entry.isIntersecting && !scrolledPast) continue;

      const onSeen = callbacks.get(entry.target);
      // Reveals fire once and never replay, so stop watching immediately.
      unobserve(entry.target);
      onSeen?.();
    }
  }, OPTIONS);
  return observer;
}

function unobserve(element: Element) {
  if (!observer || !callbacks.has(element)) return;
  observer.unobserve(element);
  callbacks.delete(element);
  watched -= 1;
  if (watched === 0) {
    observer.disconnect();
    observer = null;
  }
}

/**
 * Returns a ref to attach and whether the element has entered the viewport.
 * Reduced motion resolves to "entered" without ever touching the observer.
 */
export function useReveal<T extends HTMLElement>(reducedMotion: boolean) {
  const ref = useRef<T>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    const element = ref.current;
    if (!element) return;

    callbacks.set(element, () => setEntered(true));
    watched += 1;
    ensureObserver().observe(element);

    return () => unobserve(element);
  }, [reducedMotion]);

  return { ref, entered };
}
