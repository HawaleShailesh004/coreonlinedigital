import Link from "next/link";
import { ArrowIcon } from "@/components/v3/icons";
import type { Service } from "@/lib/site-content";

/**
 * Full-width row. Name expands from condensed to extended Archivo on hover.
 */
export function ServiceSlab({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/services#${service.id}`}
      className="group v3-hairline-b flex flex-col gap-2 py-6 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-8"
    >
      <span className="flex items-baseline gap-4">
        <span className="text-sm opacity-50">{String(index + 1).padStart(2, "0")}</span>
        <span
          className="v3-display text-2xl transition-[font-variation-settings,color] duration-300 ease-out group-hover:text-[var(--emerald)] sm:text-3xl"
          style={{ fontVariationSettings: "'wdth' 100, 'wght' 600" }}
        >
          <span className="inline-block transition-[font-variation-settings] duration-300 ease-out group-hover:[font-variation-settings:'wdth'_100,'wght'_800]">
            {service.name}
          </span>
        </span>
      </span>
      <span className="flex items-center gap-3 pl-9 opacity-70 sm:max-w-sm sm:pl-0 sm:text-right">
        <span className="text-sm">{service.promise}</span>
        <ArrowIcon className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
