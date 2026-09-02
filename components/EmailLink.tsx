"use client";

import { usePathname } from "next/navigation";
import { pageEmailHref, site } from "@/lib/content";

/**
 * Footer/contact email. Opens Gmail with subject and body already filled,
 * including which page they left - same job as WhatsAppAnchor.
 */
export function EmailAnchor({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <a
      href={pageEmailHref(path)}
      target="_blank"
      rel="noreferrer noopener"
      className={className}
    >
      {children ?? site.email}
    </a>
  );
}
