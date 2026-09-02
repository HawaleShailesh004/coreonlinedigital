"use client";

import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useReveal } from "@/lib/useReveal";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger within a group, in ms. */
  delay?: number;
  as?: "div" | "li" | "section" | "article" | "header";
  className?: string;
  /** Anchor target, so a revealed block can be linked to directly. */
  id?: string;
};

/**
 * Fade-up on entry. Fires once - never replays on scroll-back.
 *
 * The observer itself lives in lib/useReveal.ts and is shared by every instance
 * on the page; this component is just the element and the class.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
  id,
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const { ref, entered } = useReveal<HTMLElement>(reducedMotion);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      id={id}
      className={cn("reveal", className)}
      data-visible={reducedMotion || entered}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
