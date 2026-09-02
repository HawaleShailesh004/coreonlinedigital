"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/app/admin/login/actions";
import { initialLoginState } from "@/app/admin/login/state";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-ink px-6 py-3.5 font-display text-sm font-medium text-paper transition-opacity duration-150 hover:opacity-85 disabled:opacity-50"
    >
      {pending ? "Checking…" : "Sign in"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(login, initialLoginState);

  return (
    <form action={formAction} className="w-full max-w-sm">
      <label htmlFor="admin-password" className="font-mono text-label uppercase text-grey">
        Password
      </label>
      <input
        id="admin-password"
        name="password"
        type="password"
        autoComplete="current-password"
        autoFocus
        required
        className="mt-2 w-full border-0 border-b border-hairline bg-transparent py-3 font-body text-base text-ink outline-none focus:border-accent"
      />
      {state.status === "error" && (
        <p className="mt-3 text-[0.8125rem] text-accent">{state.message}</p>
      )}
      <div className="mt-8">
        <SubmitButton />
      </div>
    </form>
  );
}
