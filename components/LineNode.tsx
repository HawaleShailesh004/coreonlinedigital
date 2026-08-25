import { cn } from "@/lib/cn";

type LineNodeProps = {
  /** Node positions along the line, as percentages (0–100). */
  nodes?: number[];
  orientation?: "horizontal" | "vertical";
  tone?: "hairline" | "accent" | "grey" | "inverse";
  /** Draws the line in on first paint (used in the hero and logo). */
  animate?: boolean;
  className?: string;
};

const lineTone: Record<NonNullable<LineNodeProps["tone"]>, string> = {
  hairline: "bg-hairline",
  accent: "bg-accent",
  grey: "bg-grey",
  inverse: "bg-hairline-inverse",
};

const nodeTone: Record<NonNullable<LineNodeProps["tone"]>, string> = {
  hairline: "bg-accent",
  accent: "bg-accent",
  grey: "bg-grey",
  inverse: "bg-paper",
};

/**
 * The brand motif: a line that connects two points. Reused as the logo mark,
 * section divider, process connector and hero rule - never redrawn per section.
 */
export function LineNode({
  nodes = [],
  orientation = "horizontal",
  tone = "hairline",
  animate = false,
  className,
}: LineNodeProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative",
        isHorizontal ? "h-px w-full" : "h-full w-px",
        lineTone[tone],
        animate && (isHorizontal ? "hero-rule" : ""),
        className,
      )}
    >
      {nodes.map((position) => (
        <span
          key={`${orientation}-${position}`}
          className={cn(
            "absolute block size-[7px] rounded-full",
            nodeTone[tone],
            isHorizontal
              ? "top-1/2 -translate-y-1/2 -translate-x-1/2"
              : "left-1/2 -translate-x-1/2 -translate-y-1/2",
          )}
          style={
            isHorizontal ? { left: `${position}%` } : { top: `${position}%` }
          }
        />
      ))}
    </div>
  );
}
