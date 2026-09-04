import Link from "next/link";
import { cn } from "@/lib/cn";
import { cta, site, whatsappHref } from "@/lib/site-content";
import { Magnetic } from "@/components/effects/Magnetic";
import { CallIcon, WhatsAppIcon } from "@/components/v3/icons";

/** Primary: emerald filled pill, `WhatsApp us`, identical label site-wide. */
export function WhatsAppButton({
  context,
  className,
  magnetic = false,
  variant = "primary",
}: {
  context: string;
  className?: string;
  magnetic?: boolean;
  variant?: "primary" | "on-emerald";
}) {
  const button = (
    <a
      href={whatsappHref(context)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "v3-pill",
        variant === "primary" ? "v3-pill--primary" : "v3-pill--on-emerald",
        className,
      )}
    >
      <WhatsAppIcon className="size-4" />
      {cta.primary}
    </a>
  );
  return magnetic ? <Magnetic>{button}</Magnetic> : button;
}

/** Secondary: outline pill, `Call us`. */
export function CallButton({ className }: { className?: string }) {
  return (
    <a href={site.phoneHref} className={cn("v3-pill v3-pill--outline", className)}>
      <CallIcon className="size-4 shrink-0" aria-hidden />
      <span className="tracking-normal">{cta.secondary}</span>
    </a>
  );
}

export function ViewLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 v3-display text-sm font-semibold underline decoration-[var(--line)] underline-offset-4 transition hover:decoration-current",
        className,
      )}
    >
      {children}
    </Link>
  );
}
