import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  tone = "accent",
  className,
}: {
  children: React.ReactNode;
  tone?: "accent" | "grey" | "paper";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-label uppercase tracking-[0.12em]",
        tone === "accent" && "text-accent",
        tone === "grey" && "text-grey",
        tone === "paper" && "text-paper/70",
        className,
      )}
    >
      {children}
    </p>
  );
}
