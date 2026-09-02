import type { Metadata } from "next";
import { LoginForm } from "@/app/admin/login/LoginForm";

/** Kept out of search results twice over - see app/robots.ts for the other. */
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <p className="font-mono text-label uppercase text-grey">Coreline</p>
        <h1 className="mt-2 font-display text-h3 font-semibold text-ink">
          Conversations
        </h1>
        <p className="mt-3 text-[0.9375rem] text-grey">
          Password-protected - this is where every site-assistant chat ends up.
        </p>
        <div className="mt-10">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
