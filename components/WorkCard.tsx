import Link from "next/link";
import type { WorkSample } from "@/lib/content";

/**
 * No client screenshots exist yet, so the thumbnail is an abstract wireframe
 * built from the line-and-node motif rather than a stock mockup.
 */
function Wireframe() {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-2.5 px-8"
      aria-hidden="true"
    >
      <span className="h-px w-10 bg-accent" />
      <span className="h-2 w-3/5 bg-ink/10" />
      <span className="h-2 w-2/5 bg-ink/10" />
      <span className="mt-3 flex gap-2">
        <span className="h-6 w-16 bg-ink/10" />
        <span className="h-6 w-10 border border-hairline" />
      </span>
    </div>
  );
}

export function WorkCard({ sample }: { sample: WorkSample }) {
  return (
    <Link
      href={sample.href}
      className="group flex h-full flex-col border border-hairline transition-transform duration-200 ease-out hover:-translate-y-[3px]"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-hairline bg-card">
        <Wireframe />
        <span className="absolute inset-x-0 bottom-0 translate-y-full bg-ink px-6 py-3 font-mono text-label uppercase text-paper transition-transform duration-200 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0">
          View →
        </span>
      </div>

      <div className="flex flex-1 flex-col p-8">
        <p className="font-mono text-label uppercase text-accent">
          {sample.industry}
        </p>
        <h3 className="mt-4 font-display text-h3 font-semibold">{sample.name}</h3>
        <p className="mt-3 flex-1 text-[0.9375rem] leading-[1.65] text-grey">
          {sample.summary}
        </p>
        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-label uppercase text-grey">
          {sample.tags.map((tag, index) => (
            <span key={tag} className="flex items-center gap-3">
              {index > 0 && (
                <span className="size-1 rounded-full bg-hairline" aria-hidden="true" />
              )}
              {tag}
            </span>
          ))}
        </p>
      </div>
    </Link>
  );
}
