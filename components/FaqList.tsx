"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

type Faq = {
  question: string;
  answer: string;
};

/**
 * One-open-at-a-time FAQ. Height is animated with grid-template-rows so
 * both open and close ease; native details cannot do that on close.
 * Answers stay in the DOM for crawlers.
 */
export function FaqList({ faqs }: { faqs: readonly Faq[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const baseId = useId();

  return (
    <div className="mt-12 border-t border-hairline">
      {faqs.map((faq, index) => {
        const isOpen = open === faq.question;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-btn-${index}`;

        return (
          <div key={faq.question} className="border-b border-hairline">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : faq.question)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left font-display text-lg font-medium"
              >
                {faq.question}
                <span
                  className={cn(
                    "mb-1 size-2 shrink-0 border-b border-r transition-[transform,border-color] duration-300 ease-out",
                    isOpen
                      ? "rotate-[-135deg] border-accent"
                      : "rotate-45 border-grey",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    "max-w-2xl pb-8 text-small text-body transition-opacity duration-300 ease-out",
                    isOpen ? "opacity-100" : "opacity-0",
                  )}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
