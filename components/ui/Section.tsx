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
}: SectionProps) {
  return (
    <section
      id={id}
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
