"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  initialContactState,
  requestCallback,
} from "@/app/(site)/contact/actions";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { contactPage } from "@/lib/content";

const fieldWrap = "group block";
const labelText = "font-mono text-label uppercase text-grey";
const control =
  "w-full appearance-none border-0 border-b border-hairline bg-transparent py-3 font-body text-base text-ink outline-none focus:outline-none";
/** The center-out underline is the visible focus indicator for these controls. */
const underline =
  "pointer-events-none absolute inset-x-0 bottom-0 h-px origin-center scale-x-0 bg-accent transition-transform duration-200 ease-out group-focus-within:scale-x-100";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="mt-10 w-full sm:w-auto">
      {pending ? "Sending…" : contactPage.formSubmit}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(requestCallback, initialContactState);
  const businessTypeLabelId = useId();
  const [businessType, setBusinessType] = useState("");
  const otherRef = useRef<HTMLInputElement>(null);
  const showOther = businessType === "Other";

  useEffect(() => {
    if (showOther) otherRef.current?.focus();
  }, [showOther]);

  if (state.status === "success") {
    return (
      <div className="border border-hairline p-8 md:p-10">
        <p className="font-mono text-label uppercase text-accent">Request received</p>
        <p className="mt-5 font-display text-h3 font-semibold">
          We&apos;ll call you back.
        </p>
        <p className="mt-4 text-[0.9375rem] leading-[1.65] text-grey">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="border border-hairline p-8 md:p-10">
      <div className="flex flex-col gap-8">
        <label className={fieldWrap}>
          <span className={labelText}>Name</span>
          <span className="relative mt-2 block">
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-invalid={Boolean(state.errors?.name)}
              className={control}
            />
            <span className={underline} aria-hidden="true" />
          </span>
          {state.errors?.name && (
            <span className="mt-2 block font-mono text-label uppercase text-accent">
              {state.errors.name}
            </span>
          )}
        </label>

        {/* Not a <label>: the trigger is a button, so it's linked by id instead. */}
        <div className={fieldWrap}>
          <span id={businessTypeLabelId} className={labelText}>
            Business type
          </span>
          <div className="mt-2">
            <Select
              name="businessType"
              options={contactPage.businessTypes}
              labelledBy={businessTypeLabelId}
              invalid={Boolean(state.errors?.businessType)}
              onChange={setBusinessType}
            />
          </div>
          {state.errors?.businessType && (
            <span className="mt-2 block font-mono text-label uppercase text-accent">
              {state.errors.businessType}
            </span>
          )}
        </div>

        {showOther && (
          <label className={fieldWrap}>
            <span className={labelText}>What kind of business?</span>
            <span className="relative mt-2 block">
              <input
                ref={otherRef}
                name="otherBusinessType"
                type="text"
                autoComplete="organization-title"
                placeholder="e.g. Pharmacy, salon, logistics"
                required
                aria-invalid={Boolean(state.errors?.otherBusinessType)}
                className={control}
              />
              <span className={underline} aria-hidden="true" />
            </span>
            {state.errors?.otherBusinessType && (
              <span className="mt-2 block font-mono text-label uppercase text-accent">
                {state.errors.otherBusinessType}
              </span>
            )}
          </label>
        )}

        <label className={fieldWrap}>
          <span className={labelText}>Phone number</span>
          <span className="relative mt-2 block">
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              aria-invalid={Boolean(state.errors?.phone)}
              className={control}
            />
            <span className={underline} aria-hidden="true" />
          </span>
          {state.errors?.phone && (
            <span className="mt-2 block font-mono text-label uppercase text-accent">
              {state.errors.phone}
            </span>
          )}
        </label>
      </div>

      <SubmitButton />

      <p className="mt-6 text-sm leading-[1.6] text-grey">{contactPage.microCopy}</p>
    </form>
  );
}
