/**
 * Cookie-based auth for /admin - just enough to keep conversation transcripts
 * (real people's names and phone numbers) away from anyone who does not know
 * the password, without adding a dependency or a real user-account system for
 * what is, so far, one person's own dashboard.
 *
 * The session token is a plain expiry timestamp plus an HMAC over it, keyed
 * on ADMIN_PASSWORD itself - so there is exactly one secret to set, and the
 * token cannot be forged without knowing it. This is proportionate to what is
 * being protected (an internal tool on a small business site), not a
 * general-purpose auth system - if /admin ever grows past a single
 * shared password, replace this file, not the pages that call it.
 */

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "coreline_admin_session";
const SESSION_HOURS = 12;

function secret(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  return password && password.length >= 8 ? password : null;
}

function sign(expiresAt: number, key: string): string {
  return createHmac("sha256", key).update(String(expiresAt)).digest("hex");
}

/** Set on the response after a correct password. */
export function createSessionToken(): string | null {
  const key = secret();
  if (!key) return null;
  const expiresAt = Date.now() + SESSION_HOURS * 60 * 60_000;
  return `${expiresAt}.${sign(expiresAt, key)}`;
}

/** True password check, timing-safe so response time cannot leak a match. */
export function checkPassword(candidate: string): boolean {
  const key = secret();
  if (!key || !candidate) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(key);
  // Buffers of different length would throw in timingSafeEqual - a length
  // mismatch already means "wrong password", just checked cheaply first.
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function verifyToken(token: string): boolean {
  const key = secret();
  if (!key) return false;
  const [expiresAtRaw, signature] = token.split(".");
  if (!expiresAtRaw || !signature) return false;
  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

  const expected = sign(expiresAt, key);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Server Components only - reads the incoming request's cookie jar. */
export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  return token ? verifyToken(token) : false;
}

export const sessionMaxAgeSeconds = SESSION_HOURS * 60 * 60;
