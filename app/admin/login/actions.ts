"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import type { LoginState } from "@/app/admin/login/state";
import { checkPassword, createSessionToken, sessionMaxAgeSeconds, SESSION_COOKIE } from "@/lib/adminAuth";
import { checkRateLimit } from "@/lib/rate-limit";

/** A real admin mistypes a couple of times; anything past that is a guess. */
const LOGIN_RULES = [{ limit: 6, windowMs: 10 * 60_000 }];

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  const forwarded = (await headers()).get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
  const limited = checkRateLimit(`admin-login:${ip}`, LOGIN_RULES);
  if (!limited.ok) {
    return { status: "error", message: "Too many attempts - wait a few minutes and try again." };
  }

  if (!checkPassword(password)) {
    return { status: "error", message: "That's not it." };
  }

  const token = createSessionToken();
  if (!token) {
    // ADMIN_PASSWORD is unset or too short - a config problem, not a wrong
    // guess, and worth saying plainly since it means no password can work.
    return {
      status: "error",
      message: "Admin login isn't configured yet - set ADMIN_PASSWORD in the environment.",
    };
  }

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: sessionMaxAgeSeconds,
  });

  // Thrown by Next internally to perform the navigation - must not be caught,
  // so nothing above wraps this call in a try/catch.
  redirect("/admin");
}
