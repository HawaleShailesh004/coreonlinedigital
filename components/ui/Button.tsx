import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ink" | "inverse";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 font-display font-medium transition-[background-color,border-color,color,opacity] duration-150 ease-linear disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-paper hover:opacity-85",
  secondary:
    "border border-hairline bg-transparent text-ink hover:border-accent hover:text-accent",
  ink: "bg-ink text-paper hover:bg-accent",
  inverse: "bg-paper text-ink hover:bg-accent hover:text-paper",
};

const sizes: Record<Size, string> = {
  sm: "px-6 py-3 text-[0.8125rem]",
  md: "px-8 py-4 text-sm",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

function classesFor(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  if (props.href !== undefined) {
    const { href, external, variant, size, className, children } = props;
    const classes = classesFor(variant, size, className);

    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noreferrer noopener">
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
