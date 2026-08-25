import { cn } from "@/lib/cn";

/**
 * Vector version of the bracket mark, traced from assets/logos/icon_logo.png
 * (44 unit strokes, 194 unit arms, a 119 unit node on a 508x506 field).
 * Used where the mark has to scale or take its colour from the surface;
 * the full lockup uses the supplied raster in <Logo />.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 508 506"
      fill="currentColor"
      className={cn("block", className)}
      aria-hidden="true"
      role="presentation"
    >
      <path d="M0 0h194v44H44v418h150v44H0z" />
      <path d="M508 0H314v44h150v418H314v44h194z" />
      <rect x="194" y="193" width="119" height="119" />
    </svg>
  );
}
