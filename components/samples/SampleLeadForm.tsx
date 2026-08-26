"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { SampleButton } from "@/components/samples/SampleButton";

export type LeadField =
  | {
      kind: "text" | "tel" | "email" | "date" | "time";
      name: string;
      label: string;
      placeholder?: string;
      required?: boolean;
      /** Spans both columns in a two-column form. */
      full?: boolean;
    }
  | {
      kind: "select";
      name: string;
      label: string;
      options: string[];
      required?: boolean;
      full?: boolean;
    }
  | {
      kind: "textarea";
      name: string;
      label: string;
      placeholder?: string;
      rows?: number;
      required?: boolean;
      full?: boolean;
    };

const controlClasses =
  "w-full rounded-[var(--s-radius)] border border-[var(--s-hair)] bg-[var(--s-bg)] px-3.5 py-3 text-sm text-[var(--s-ink)] outline-none transition-colors placeholder:text-[var(--s-grey)]/70 focus:border-[var(--s-primary)]";

/**
 * Lead capture for the sample sites.
 *
 * Demo-only: submissions are held in component state and echoed back, so the
 * form can be filled in live on a call without a backend. A real build wires
 * this to a server action, as app/(site)/contact does.
 */
export function SampleLeadForm({
  fields,
  submitLabel,
  successTitle,
  successBody,
  note,
  columns = 2,
  variant = "primary",
}: {
  fields: LeadField[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
  note?: string;
  columns?: 1 | 2;
  variant?: "primary" | "accent";
}) {
  const formId = useId();
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(
    null,
  );
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const entries: Record<string, string> = {};
    for (const field of fields) {
      const value = data.get(field.name);
      if (typeof value === "string" && value.trim()) {
        entries[field.label] = value.trim();
      }
    }

    setPending(true);
    // Stands in for the round trip, so the success state doesn't snap in.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setPending(false);
    setSubmitted(entries);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-[var(--s-radius-lg)] border border-[var(--s-primary)]/30 bg-[var(--s-surface)] p-6 sm:p-8"
      >
        <p className="s-display text-lg font-semibold text-[var(--s-ink)]">
          {successTitle}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--s-grey)]">
          {successBody}
        </p>

        <dl className="mt-6 space-y-2 border-t border-[var(--s-hair)] pt-5 text-sm">
          {Object.entries(submitted).map(([label, value]) => (
            <div key={label} className="flex justify-between gap-6">
              <dt className="text-[var(--s-grey)]">{label}</dt>
              <dd className="text-right font-medium text-[var(--s-ink)]">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <button
          type="button"
          onClick={() => setSubmitted(null)}
          className="mt-6 text-sm text-[var(--s-primary)] underline underline-offset-4"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "grid gap-4",
        columns === 2 ? "sm:grid-cols-2" : "grid-cols-1",
      )}
    >
      {fields.map((field) => {
        const id = `${formId}-${field.name}`;
        return (
          <div
            key={field.name}
            className={cn(
              "flex flex-col gap-1.5",
              (field.full || columns === 1) && "sm:col-span-2",
            )}
          >
            <label
              htmlFor={id}
              className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-grey)]"
            >
              {field.label}
              {field.required && <span aria-hidden="true"> *</span>}
            </label>

            {field.kind === "select" ? (
              <select
                id={id}
                name={field.name}
                required={field.required}
                defaultValue=""
                className={controlClasses}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.kind === "textarea" ? (
              <textarea
                id={id}
                name={field.name}
                rows={field.rows ?? 4}
                required={field.required}
                placeholder={field.placeholder}
                className={cn(controlClasses, "resize-y")}
              />
            ) : (
              <input
                id={id}
                type={field.kind}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                className={controlClasses}
              />
            )}
          </div>
        );
      })}

      <div className={cn(columns === 2 && "sm:col-span-2")}>
        <SampleButton
          type="submit"
          variant={variant}
          disabled={pending}
          className="w-full"
        >
          {pending ? "Sending…" : submitLabel}
        </SampleButton>
        {note && (
          <p className="mt-3 text-xs leading-relaxed text-[var(--s-grey)]">
            {note}
          </p>
        )}
      </div>
    </form>
  );
}
