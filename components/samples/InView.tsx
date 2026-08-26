"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Tag = "div" | "span" | "li" | "p" | "section" | "article";

/**
 * Flips `data-visible` once its subject scrolls into view, and exposes the
 * stagger as `--s-delay`. The sample motion classes in samples.css
 * (s-pin, s-pop, s-connector, s-check) key off both.
 *
 * Distinct from components/ui/Reveal, which is hardwired to the Coreline
 * fade-up. This one carries whatever motion class the sample asks for.
 */
export function InView({
  as: Tag = "div",
  className,
  delay = 0,
  threshold = 0.2,
  children,
  ...rest
}: {
  as?: Tag;
  className?: string;
  delay?: number;
  threshold?: number;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setEntered(true);
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, threshold]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn(className)}
      data-visible={reducedMotion || entered}
      style={{ "--s-delay": `${delay}ms` } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
