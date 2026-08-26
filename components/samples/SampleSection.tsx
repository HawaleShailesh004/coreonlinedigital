import { cn } from "@/lib/cn";

type Tone = "bg" | "surface" | "ink";
type Size = "tight" | "default" | "loose";

const tones: Record<Tone, string> = {
  bg: "bg-[var(--s-bg)]",
  surface: "bg-[var(--s-surface)]",
  ink: "bg-[var(--s-ink)] text-[var(--s-bg)]",
};

const sizes: Record<Size, string> = {
  tight: "py-14 md:py-20",
  default: "py-20 md:py-28",
  // Gallery pacing, for the verticals sold on whitespace.
  loose: "py-24 md:py-40",
};

export function SampleContainer({
  className,
  children,
  wide,
}: {
  className?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        wide ? "max-w-[85rem]" : "max-w-6xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SampleSection({
  id,
  tone = "bg",
  size = "default",
  bordered,
  wide,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  tone?: Tone;
  size?: Size;
  bordered?: boolean;
  wide?: boolean;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        tones[tone],
        sizes[size],
        bordered && "border-t border-[var(--s-hair)]",
        className,
      )}
    >
      <SampleContainer wide={wide} className={containerClassName}>
        {children}
      </SampleContainer>
    </section>
  );
}
