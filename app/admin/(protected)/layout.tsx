import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/adminAuth";

export const metadata: Metadata = {
  title: { template: "%s | Coreline Admin", default: "Conversations | Coreline Admin" },
  robots: { index: false, follow: false },
};

/**
 * Everything under here requires the cookie set by app/admin/login/actions.ts.
 * Checked server-side, on every request - there is no client-side gate to
 * bypass, since the data being protected (real names and phone numbers) is
 * fetched in these Server Components, not sent to an unauthenticated client
 * and hidden with CSS.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <header className="border-b border-hairline">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-5">
          <div>
            <p className="font-mono text-label uppercase text-grey">Coreline</p>
            <p className="font-display text-sm font-semibold">Conversations</p>
          </div>
          <form action="/admin/logout" method="post">
            <button
              type="submit"
              className="font-mono text-label uppercase text-grey transition-colors hover:text-accent"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
