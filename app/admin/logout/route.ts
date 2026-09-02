import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/adminAuth";

/**
 * next/navigation's redirect() is for Server Components and Server Actions -
 * it works by throwing, which a Route Handler has no boundary to catch. A
 * plain redirect Response is the correct tool here.
 */
export async function POST(request: Request) {
  (await cookies()).delete(SESSION_COOKIE);
  return Response.redirect(new URL("/admin/login", request.url));
}
