import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { finalCta, site } from "@/lib/content";

/**
 * Shared closing band. `heading` and `body` are overridable so the Services and
 * Work pages can close with their own line without duplicating the layout.
 */
export function FinalCta({
  heading = finalCta.heading,
  body = finalCta.body,
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <Section tone="ink" size="tight">
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-16">
        <div className="max-w-2xl">
          <h2 className="flex items-start gap-4 font-display text-h2 font-semibold">
            {/* System status light: on, not urgent. */}
            <span
              className="breathe mt-4 size-2 shrink-0 rounded-full bg-accent-soft"
              aria-hidden="true"
            />
            {heading}
          </h2>
          {body && <p className="mt-6 text-lead text-paper/70 md:pl-6">{body}</p>}
        </div>

        <Button href="/contact" variant="inverse" className="shrink-0">
          {site.primaryCta}
        </Button>
      </div>
    </Section>
  );
}
