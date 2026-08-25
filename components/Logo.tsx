import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/content";

/** Dimensions are explicit so the raster never scales unevenly or shifts layout. */
const sizes = {
  sm: { width: 120, height: 26 },
  md: { width: 157, height: 34 },
} as const;

export function Logo({
  animate = false,
  size = "sm",
  className,
}: {
  /** Draws in left to right; only true on the very first page load. */
  animate?: boolean;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const { width, height } = sizes[size];

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center", className)}
      aria-label={`${site.legalName} — home`}
    >
      <Image
        src="/logo-lockup.png"
        alt=""
        width={width}
        height={height}
        priority
        className={animate ? "logo-reveal" : undefined}
      />
    </Link>
  );
}
