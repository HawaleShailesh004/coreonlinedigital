import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  /** Generous vertical rhythm is part of the "engineered" signal - don't compress. */
  size?: "default" | "tight" | "flush";
  tone?: "paper" | "ink";
  bordered?: boolean;
  className?: string;
  containerClassName?: string;
  /**
   * Lets a caller tag a band for something outside the section to find - the
   * site assistant watches [data-cta-band] so its launcher can move out of the
   * way of the closing CTA.
   */
  "data-cta-band"?: boolean;
};

const sizes: Record<NonNullable<SectionProps["size"]>, string> = {
  default: "py-16 md:py-32",
  tight: "py-16 md:py-24",
  flush: "py-0",
};

export function Section({
  children,
  id,
  size = "default",
  tone = "paper",
  bordered = false,
  className,
  containerClassName,
  "data-cta-band": ctaBand,
}: SectionProps) {
  return (
    <section
      id={id}
      data-cta-band={ctaBand ? "" : undefined}
      className={cn(
        sizes[size],
        tone === "ink" && "bg-ink text-paper",
        bordered && "border-t border-hairline",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
