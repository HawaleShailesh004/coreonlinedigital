import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Archivo display heading. `width` maps to the variable font's `wdth` axis.
 */
export function DisplayHeading({
  as: Tag = "h2",
  width = 100,
  weight = 800,
  className,
  children,
}: {
  as?: ElementType;
  width?: number;
  weight?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn("v3-display leading-[0.95] tracking-[-0.02em]", className)}
      style={{ fontVariationSettings: `'wdth' ${width}, 'wght' ${weight}` }}
    >
      {children}
    </Tag>
  );
}
