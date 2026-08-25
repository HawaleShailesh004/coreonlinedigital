import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/content";

/**
 * Wordmark = the motif itself: a line ending in a node, then `coreline.`
 * `animate` is only true on the very first page load, never on route changes.
 */
export function Logo({
  animate = false,
  tone = "ink",
  className,
}: {
  animate?: boolean;
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2.5 font-display text-[1.1875rem] font-semibold tracking-[-0.01em]",
        tone === "paper" ? "text-paper" : "text-ink",
        className,
      )}
      aria-label={`${site.legalName} - home`}
    >
      <span className="flex items-center" aria-hidden="true">
        <span
          className={cn("block h-0.5 w-4 bg-accent", animate && "logo-rule")}
        />
        <span className="-ml-px block size-1.5 rounded-full bg-accent" />
      </span>
      <span>
        coreline<span className="text-accent">.</span>
      </span>
    </Link>
  );
}
