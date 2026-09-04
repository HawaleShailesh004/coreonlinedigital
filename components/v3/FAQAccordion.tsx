"use client";

import { useState } from "react";
import { ChevronIcon } from "@/components/v3/icons";
import { cn } from "@/lib/cn";

export type Faq = { question: string; answer: string };

export function FAQAccordion({ items, firstOpen = false }: { items: readonly Faq[]; firstOpen?: boolean }) {
  const [open, setOpen] = useState<number | null>(firstOpen ? 0 : null);

  return (
    <div>
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.question} className="v3-hairline-t last:v3-hairline-b">
            <button
              type="button"
              onClick={() => setOpen(expanded ? null : i)}
              aria-expanded={expanded}
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
            >
              <span className="v3-display text-base font-semibold sm:text-lg">{item.question}</span>
              <ChevronIcon className={cn("size-5 shrink-0 transition-transform", expanded && "rotate-180")} />
            </button>
            <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out", expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 text-sm opacity-70">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
