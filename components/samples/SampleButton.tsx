import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "outline" | "solid" | "quiet";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-[background-color,border-color,color,opacity,transform] duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--s-primary)] text-[var(--s-on-primary)] hover:bg-[var(--s-primary-2)]",
  accent: "bg-[var(--s-accent)] text-[var(--s-on-accent)] hover:opacity-90",
  outline:
    "border border-[var(--s-hair)] bg-transparent text-[var(--s-ink)] hover:border-[var(--s-primary)] hover:text-[var(--s-primary)]",
  /** Reverses out of the page - for use on photography or ink sections. */
  solid: "bg-[var(--s-ink)] text-[var(--s-bg)] hover:opacity-90",
  quiet: "text-[var(--s-primary)] underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5 text-[0.8125rem]",
  md: "px-6 py-3.5 text-sm",
  lg: "px-8 py-4 text-[0.9375rem]",
};

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type AsLink = Common & { href: string; external?: boolean };
type AsButton = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
    /**
     * Marks the button as a chat launcher. React only allows arbitrary data-*
     * attributes on intrinsic elements, so it has to be declared to survive the
     * spread onto <button>. ChatWidget listens for it document-wide.
     */
    "data-open-chat"?: boolean;
  };

function classesFor(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string,
) {
  return cn(
    base,
    variants[variant],
    sizes[size],
    // Radius follows the palette, so the clinic reads warm and the CA reads formal.
    variant !== "quiet" && "rounded-[var(--s-radius)]",
    className,
  );
}

export function SampleButton(props: AsLink | AsButton) {
  if (props.href !== undefined) {
    const { href, external, variant, size, className, children } = props;
    const classes = classesFor(variant, size, className);

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noreferrer noopener"
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant, size, className, children, ...rest } = props;
  return (
    <button className={classesFor(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
