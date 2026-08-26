import { cn } from "@/lib/cn";

/** Small uppercase label above a heading. */
export function SampleEyebrow({
  tone = "primary",
  className,
  children,
}: {
  tone?: "primary" | "accent" | "grey" | "inverse";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-[0.6875rem] font-medium uppercase tracking-[0.16em]",
        tone === "primary" && "text-[var(--s-primary)]",
        tone === "accent" && "text-[var(--s-accent)]",
        tone === "grey" && "text-[var(--s-grey)]",
        tone === "inverse" && "text-[var(--s-bg)]/70",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Pill badge. Used for package tags, admissions status, sale flags. */
export function SampleBadge({
  tone = "accent",
  className,
  children,
}: {
  tone?: "accent" | "primary" | "outline";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em]",
        "rounded-[var(--s-radius-pill,0px)]",
        tone === "accent" && "bg-[var(--s-accent)] text-[var(--s-on-accent)]",
        tone === "primary" && "bg-[var(--s-primary)] text-[var(--s-on-primary)]",
        tone === "outline" &&
          "border border-[var(--s-hair)] text-[var(--s-grey)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
