import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const VARIANTS = {
  ink: "v3-panel--ink",
  forest: "v3-panel--forest",
  bone: "v3-panel--bone",
  emerald: "v3-panel--emerald",
} as const;

/**
 * Full-screen section wrapper (brief §6.6). `stack` adds the sheet treatment
 * (rounded top + shadow + a small gap so corners stay visible). We do not use
 * position:sticky here — that buried homepage sections under pinned panels.
 */
export function Panel({
  variant,
  stack = false,
  className,
  children,
  as: Tag = "section",
  id,
}: {
  variant: keyof typeof VARIANTS;
  stack?: boolean;
  className?: string;
  children: ReactNode;
  as?: "section" | "div";
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "v3-panel",
        VARIANTS[variant],
        stack && "v3-panel--sticky v3-panel--rounded",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
