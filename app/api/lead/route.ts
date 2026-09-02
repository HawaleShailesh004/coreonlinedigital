import { extractPhone } from "@/lib/chat/flow";
import { upsertConversation } from "@/lib/conversationStore";
import { deliverLead } from "@/lib/leads";
import { checkRateLimit, clientKey } from "@/lib/rate-limit";

/**
 * Lead capture for the site assistant.
 *
 * The lead is extracted and posted by the client's scripted flow, not by the
 * model. That matters: a model asked to "remember the phone number and report
 * it" will sometimes not, and a dropped lead is the single most expensive bug
 * this site can have. The flow knows the number the moment it validates one, so
 * it sends it directly.
 *
 * Everything here is treated as hostile input - it is an unauthenticated public
 * endpoint - so fields are length-capped, the phone is re-validated server side,
 * and it is rate limited hard. Nothing is echoed back to the client.
 */

const LIMITS = {
  maxFieldChars: 300,
  maxTranscriptChars: 4_000,
};

/** A real visitor submits one number, maybe two if they mistyped. */
const PER_IP_RULES = [
  { limit: 3, windowMs: 10 * 60_000 },
  { limit: 8, windowMs: 24 * 60 * 60_000 },
];

function field(value: unknown, max = LIMITS.maxFieldChars): string {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Expected application/json." }, { status: 415 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const input = (payload ?? {}) as Record<string, unknown>;

  // Re-validated here rather than trusted: the client check is a convenience,
  // this one is the rule.
  const phone = extractPhone(field(input.phone, 40));
  if (!phone) {
    return Response.json({ error: "Invalid phone number." }, { status: 400 });
  }

  const ip = clientKey(request);
  const limited = checkRateLimit(`lead:${ip}`, PER_IP_RULES);
  if (!limited.ok) {
    // The widget shows the WhatsApp handoff regardless, so a throttled lead
    // still reaches a human - it just does not page anyone twice.
    return Response.json({ ok: true }, { status: 202 });
  }

  const id =
    typeof input.id === "string" && /^[a-z0-9-]{8,64}$/i.test(input.id)
      ? input.id
      : null;

  try {
    await deliverLead({
      source: "chat",
      phone,
      name: field(input.name, 80),
      business: field(input.business),
      websiteState: field(input.websiteState, 60),
      problem: field(input.problem),
      transcript: field(input.transcript, LIMITS.maxTranscriptChars),
    });
  } catch (error) {
    console.error("[lead] delivery failed:", error);
    // Still a 200: the visitor has done their part and the handoff is what
    // actually converts. Failing loudly here would only break the widget.
  }

  // Marks the SAME conversation record /api/chat-log has been building up as
  // a completed, hot lead with a real phone number - the admin list's
  // clearest signal - rather than creating a second, disconnected record.
  if (id) {
    await upsertConversation(id, {
      completed: true,
      hasPhone: true,
      phone,
      name: field(input.name, 80),
      business: field(input.business),
      website: field(input.websiteState, 60),
      problem: field(input.problem),
      transcript: field(input.transcript, LIMITS.maxTranscriptChars),
    });
  }

  return Response.json({ ok: true }, { status: 200 });
}

export async function GET() {
  return Response.json({ error: "Use POST." }, { status: 405, headers: { Allow: "POST" } });
}
