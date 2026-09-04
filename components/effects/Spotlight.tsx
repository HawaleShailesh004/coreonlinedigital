"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Cursor spotlight for the ink CTA band only. A soft emerald wash follows the
 * pointer on fine-pointer devices; touch and reduced-motion get a static wash.
 */
export function Spotlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const node = ref.current;
      if (!node) return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      node.style.setProperty("--spot-x", `${x}%`);
      node.style.setProperty("--spot-y", `${y}%`);
      node.dataset.active = "true";
    },
    [reducedMotion],
  );

  const onLeave = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    node.dataset.active = "false";
  }, []);

  return (
    <div
      ref={ref}
      className={cn("cta-spotlight", className)}
      data-active="false"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
