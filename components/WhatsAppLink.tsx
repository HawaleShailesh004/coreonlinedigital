"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { pageWhatsappHref, site } from "@/lib/content";

type ButtonVariant = "primary" | "secondary" | "ink" | "inverse";
type ButtonSize = "sm" | "md";

/**
 * Marketing WhatsApp control. Prefills from the current path so the first
 * message is not a blank chat.
 */
export function WhatsAppButton({
  variant,
  size,
  className,
  children,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <Button
      href={pageWhatsappHref(path)}
      external
      variant={variant}
      size={size}
      className={className}
    >
      {children ?? site.primaryCta}
    </Button>
  );
}

export function WhatsAppAnchor({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <a
      href={pageWhatsappHref(path)}
      target="_blank"
      rel="noreferrer noopener"
      className={className}
    >
      {children}
    </a>
  );
}
