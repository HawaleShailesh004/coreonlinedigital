import { upsertConversation } from "@/lib/conversationStore";
import { checkRateLimit, clientKey } from "@/lib/rate-limit";

/**
 * Where every chat-assistant conversation gets saved for Shailesh to actually
 * read later - "I should get to know the chats, what and who talked".
 *
 * The client calls this at each step of the scripted flow (see
 * components/chat/SiteAssistant.tsx), not just at the end, so a visitor who
 * chats for a while and then closes the tab without leaving a number is still
 * visible in /admin - just marked incomplete. Each call is a full snapshot
 * of what is known so far, upserted by session id, so it is safe to call
 * repeatedly and the admin view always reflects the latest state.
 *
 * This never blocks or fails the widget: unlike /api/lead, nothing here is
 * required for the visitor's own experience, so every failure mode below
 * returns 200 rather than surfacing an error the client would have to handle.
 */

const LIMITS = {
  maxIdChars: 64,
  maxFieldChars: 300,
  maxTranscriptChars: 6_000,
};

/** One real conversation calls this maybe 6-8 times; this covers several. */
const PER_IP_RULES = [
  { limit: 10, windowMs: 30_000 },
  { limit: 60, windowMs: 10 * 60_000 },
];

function field(value: unknown, max = LIMITS.maxFieldChars): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.replace(/\s+/g, " ").trim().slice(0, max);
  return trimmed || undefined;
}

/** Transcript lines carry newlines on purpose - collapsing them would defeat
 *  the point of storing a readable transcript - so this only caps length. */
function transcriptField(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim().slice(0, LIMITS.maxTranscriptChars);
  return trimmed || undefined;
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
  const id =
    typeof input.id === "string" ? input.id.slice(0, LIMITS.maxIdChars) : "";

  // The id comes from crypto.randomUUID() on the client; anything that does
  // not look like one is not a conversation this route needs to save.
  if (!/^[a-z0-9-]{8,64}$/i.test(id)) {
    return Response.json({ error: "Invalid id." }, { status: 400 });
  }

  const ip = clientKey(request);
  const limited = checkRateLimit(`chat-log:${ip}`, PER_IP_RULES);
  if (!limited.ok) {
    // Silent no-op, not an error: this is a background sync, and the widget
    // never surfaces its outcome to the visitor either way.
    return Response.json({ ok: true }, { status: 202 });
  }

  try {
    await upsertConversation(id, {
      completed: input.completed === true,
      name: field(input.name),
      business: field(input.business),
      vertical: field(input.vertical, 40),
      problem: field(input.problem),
      frequency: field(input.frequency, 40),
      website: field(input.website, 40),
      path: field(input.path, 20),
      goal: field(input.goal, 60),
      obstacle: field(input.obstacle, 60),
      fit: field(input.fit, 20),
      transcript: transcriptField(input.transcript),
    });
  } catch (error) {
    console.error("[chat-log] save failed:", error);
  }

  return Response.json({ ok: true }, { status: 200 });
}

export async function GET() {
  return Response.json({ error: "Use POST." }, { status: 405, headers: { Allow: "POST" } });
}
