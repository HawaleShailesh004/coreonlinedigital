import Link from "next/link";
import { SampleContainer } from "@/components/samples/SampleSection";
import { cn } from "@/lib/cn";

export type FooterColumn = {
  title: string;
  items: { label: string; href?: string }[];
};

type FooterVariant = "default" | "centered" | "stacked" | "compact";

/**
 * Shared footer for the sample sites.
 *
 * The "Built by Coreline Digital" credit is the only place a sample is allowed
 * to reference us - every brief is explicit that the rest of the page must look
 * like the client's own site, not ours.
 */
export function SampleFooter({
  brand,
  blurb,
  columns = [],
  legal,
  variant = "default",
}: {
  brand: string;
  blurb: string;
  columns?: FooterColumn[];
  legal?: string;
  variant?: FooterVariant;
}) {
  const centered = variant === "centered";
  const stacked = variant === "stacked";
  const compact = variant === "compact";

  return (
    <footer
      className={cn(
        "mt-auto border-t border-[var(--s-hair)] bg-[var(--s-bg)]",
        compact ? "py-10" : "py-14",
      )}
    >
      <SampleContainer>
        <div
          className={cn(
            "grid gap-10",
            centered
              ? "text-center md:grid-cols-1"
              : stacked
                ? "md:grid-cols-[minmax(0,1.1fr)_repeat(auto-fit,minmax(0,1fr))]"
                : "md:grid-cols-[1.4fr_repeat(auto-fit,minmax(0,1fr))]",
          )}
        >
          <div className={cn(centered && "mx-auto max-w-md")}>
            <p className={cn("s-display text-lg font-semibold", centered && "text-center")}>
              {brand}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--s-grey)]">
              {blurb}
            </p>
          </div>

          {columns.map((column) => (
            <div
              key={column.title}
              className={cn(
                stacked && "border-t border-[var(--s-hair)] pt-5 md:border-0 md:pt-0",
                centered && "text-center",
              )}
            >
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--s-grey)]">
                {column.title}
              </p>
              <ul
                className={cn(
                  "mt-4 space-y-2.5 text-sm",
                  centered && "flex flex-col items-center",
                )}
              >
                {column.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="transition-opacity hover:opacity-70"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-[var(--s-grey)]">{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className={cn(
            "mt-12 flex flex-col gap-3 border-t border-[var(--s-hair)] pt-6 text-xs text-[var(--s-grey)]",
            centered
              ? "items-center text-center"
              : "sm:flex-row sm:items-center sm:justify-between",
          )}
        >
          <p>
            © {new Date().getFullYear()} {brand}.{legal ? ` ${legal}` : ""}
          </p>
          <p>
            Built by{" "}
            <Link
              href="/"
              className="underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Coreline Digital
            </Link>
          </p>
        </div>
      </SampleContainer>
    </footer>
  );
}
