"use client";

import { useCallback, useRef, type ReactElement, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Soft magnetic pull on desktop only. Caps at a few pixels so the CTA feels
 * alive without floating around the page. Touch and reduced-motion get a
 * normal static child.
 */
export function Magnetic({
  children,
  strength = 0.28,
  max = 4,
}: {
  children: ReactElement<{ className?: string; style?: React.CSSProperties }>;
  /** How strongly the pointer pulls the element (0–1). */
  strength?: number;
  /** Max translate in px in any direction. */
  max?: number;
}) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      if (reducedMotion) return;
      const node = ref.current;
      if (!node) return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * strength;
      const y = (event.clientY - rect.top - rect.height / 2) * strength;
      const clampedX = Math.max(-max, Math.min(max, x));
      const clampedY = Math.max(-max, Math.min(max, y));
      node.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
    },
    [max, reducedMotion, strength],
  );

  const onLeave = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "translate3d(0, 0, 0)";
  }, []);

  if (reducedMotion) return children as ReactNode;

  return (
    <span
      ref={ref}
      className="magnetic inline-flex will-change-transform"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </span>
  );
}
