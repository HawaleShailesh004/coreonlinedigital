import { cn } from "@/lib/cn";
import type { SampleSlug } from "@/lib/samples";

/**
 * Root wrapper for a sample site. The `data-sample` attribute selects the
 * palette block in app/samples/samples.css; `fontClass` carries the display
 * face that page loaded via next/font.
 */
export function SampleFrame({
  sample,
  fontClass,
  children,
}: {
  sample: SampleSlug;
  fontClass?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-sample={sample}
      className={cn("sample-root flex flex-1 flex-col", fontClass)}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-[var(--s-ink)] focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-widest focus:text-[var(--s-bg)]"
      >
        Skip to content
      </a>
      {children}
    </div>
  );
}
