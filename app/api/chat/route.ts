import { corelinePersona, corelineSystemPrompt } from "@/lib/chat/persona";
import { checkRateLimit, clientKey } from "@/lib/rate-limit";

/**
 * Chat endpoint for the assistant on Coreline's own site.
 *
 * Structurally the same defensive handler as /api/sample-chat - the key never
 * leaves the server, the client cannot send a system message, every request is
 * capped on turns and length, replies are capped independently of max_tokens,
 * there are two per-IP rules plus a global ceiling on the key, and a missing
 * key is a soft failure rather than a broken widget.
 *
 * Two differences, both deliberate:
 *
 *   1. The client sends a `stage` string describing where the scripted flow is.
 *      It is untrusted text, so it is length-capped and embedded as context,
 *      never as instructions - the prompt tells the model it is a note about
 *      the conversation, and the guardrail block already treats everything
 *      downstream of it as data.
 *   2. Replies are capped harder (420 chars). This assistant is meant to answer
 *      in two sentences and hand back to the scripted question; a long reply is
 *      a failure even when it is correct.
 */

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const PRIMARY_MODEL = process.env.GROQ_MODEL ?? "openai/gpt-oss-20b";
const FALLBACK_MODEL = "openai/gpt-oss-120b";

const LIMITS = {
  /** Turns of history accepted from the client. */
  maxMessages: 14,
  maxCharsPerMessage: 500,
  maxTotalChars: 5_000,
  /** Untrusted flow context from the client. */
  maxStageChars: 700,
  /** Hard ceiling on the reply, independent of max_tokens. */
  maxReplyChars: 420,
  // Raised from 15s: an empty completion can now cost up to two extra
  // sequential calls (see the retry cascade in POST), and all of them share
  // one AbortController, so the budget has to cover the worst case, not the
  // common one.
  upstreamTimeoutMs: 25_000,
};

const PER_IP_RULES = [
  { limit: 5, windowMs: 20_000 },
  { limit: 30, windowMs: 10 * 60_000 },
];

/** Backstop on total spend if the site gets scraped or shared widely. */
const GLOBAL_RULES = [{ limit: 300, windowMs: 60 * 60_000 }];

type ClientMessage = { role: "user" | "assistant"; content: string };

function json(body: unknown, status: number, headers?: HeadersInit) {
  return Response.json(body, { status, headers });
}

/** Trims to the last sentence boundary so a cut reply does not end mid-word. */
function capReply(text: string) {
  const collapsed = text.replace(/\s+/g, " ").trim();
  if (collapsed.length <= LIMITS.maxReplyChars) return collapsed;

  const clipped = collapsed.slice(0, LIMITS.maxReplyChars);
  const lastStop = Math.max(
    clipped.lastIndexOf(". "),
    clipped.lastIndexOf("! "),
    clipped.lastIndexOf("? "),
  );
  return lastStop > 140 ? clipped.slice(0, lastStop + 1) : `${clipped.trim()}…`;
}

function parseMessages(input: unknown): ClientMessage[] | string {
  if (!Array.isArray(input)) return "messages must be an array";
  if (input.length === 0) return "messages must not be empty";
  if (input.length > LIMITS.maxMessages) return "too many messages";

  const messages: ClientMessage[] = [];
  let total = 0;

  for (const entry of input) {
    if (typeof entry !== "object" || entry === null) return "malformed message";
    const { role, content } = entry as Record<string, unknown>;

    // Only these two roles: accepting "system" would let a visitor rewrite the
    // persona and its guardrails from the client.
    if (role !== "user" && role !== "assistant") return "invalid role";
    if (typeof content !== "string") return "invalid content";

    const trimmed = content.trim();
    if (!trimmed) return "empty content";
    if (trimmed.length > LIMITS.maxCharsPerMessage) return "message too long";

    total += trimmed.length;
    if (total > LIMITS.maxTotalChars) return "conversation too long";

    messages.push({ role, content: trimmed });
  }

  if (messages.at(-1)?.role !== "user") return "last message must be from user";
  return messages;
}

async function callGroq(
  apiKey: string,
  model: string,
  body: Record<string, unknown>,
  signal: AbortSignal,
) {
  return fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ ...body, model }),
    signal,
  });
}

type ModelResult =
  | { ok: true; reply: string | null }
  | { ok: false; status: number; detail: string };

/**
 * Catches the failure mode an empty-completion check misses entirely: a
 * non-empty reply that stops mid-thought, like "Shail" or "...it looks
 * unique, loads" - observed live, not hypothetical. Short and unpunctuated is
 * the signature of a generation that was cut off rather than one that
 * finished; a genuinely short reply ("Not sure, ask on WhatsApp.") still ends
 * cleanly, and a genuinely long one gets a pass here even without trailing
 * punctuation, since capReply() downstream will already be trimming it to a
 * sentence boundary regardless.
 */
function looksIncomplete(reply: string): boolean {
  const trimmed = reply.trim();
  if (trimmed.length < 20) return true;
  if (trimmed.length >= 300) return false;
  return !/[.!?"'…)]\s*$/.test(trimmed);
}

/**
 * Calls one model and reports what happened, without deciding what to do
 * about it - that decision (retry with the other model, or give up) depends
 * on what the caller has already tried, so it lives in POST below.
 */
async function tryModel(
  apiKey: string,
  model: string,
  body: Record<string, unknown>,
  signal: AbortSignal,
): Promise<ModelResult> {
  const response = await callGroq(apiKey, model, body, signal);

  if (!response.ok) {
    return { ok: false, status: response.status, detail: await response.text() };
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const reply = data.choices?.[0]?.message?.content?.trim();
  return { ok: true, reply: reply || null };
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "Expected application/json." }, 415);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const { messages: rawMessages, stage: rawStage } = (payload ?? {}) as Record<
    string,
    unknown
  >;

  const parsed = parseMessages(rawMessages);
  if (typeof parsed === "string") {
    return json({ error: parsed }, 400);
  }

  const stage =
    typeof rawStage === "string"
      ? rawStage.replace(/\s+/g, " ").trim().slice(0, LIMITS.maxStageChars)
      : "";

  const ip = clientKey(request);
  const perIp = checkRateLimit(`coreline-chat:${ip}`, PER_IP_RULES);
  if (!perIp.ok) {
    return json(
      { error: "You're sending messages a bit fast - give it a moment." },
      429,
      { "Retry-After": String(perIp.retryAfterSeconds) },
    );
  }

  const global = checkRateLimit("coreline-chat:global", GLOBAL_RULES);
  if (!global.ok) {
    return json({ error: "busy", reply: corelinePersona.fallback }, 503);
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.warn("[chat] GROQ_API_KEY is not set; serving fallback.");
    return json({ error: "unconfigured", reply: corelinePersona.fallback }, 503);
  }

  const body = {
    messages: [
      { role: "system", content: corelineSystemPrompt(stage) },
      ...parsed,
    ],
    temperature: 0.25,
    max_tokens: corelinePersona.maxTokens,
    top_p: 0.9,
    stream: false,
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), LIMITS.upstreamTimeoutMs);

  try {
    /**
     * Up to three attempts, in order: primary, primary again, fallback. Two
     * distinct failure modes drive this, both observed happening live and
     * repeatedly with the very same prompt on separate requests:
     *
     *   1. The primary model is decommissioned - a 4xx naming the model. No
     *      point retrying the same model for this one; go straight to the
     *      fallback.
     *   2. The primary model returns 200 OK with an EMPTY completion. This is
     *      not a decommission and the model is clearly reachable - it showed
     *      up on a real fraction of ordinary multi-part questions, and on one
     *      prompt roughly one attempt in five, non-deterministically: calling
     *      the exact same model with the exact same prompt again sometimes
     *      just works. So an empty reply gets one same-model retry first,
     *      which is fast and often enough on its own, before spending a call
     *      on the larger, slower fallback model.
     *
     * A visibly incomplete reply (looksIncomplete, above) gets the same
     * retry treatment as an empty one - a bare "Shail" is no more useful to a
     * visitor than nothing at all, just harder to notice as a failure.
     */
    let result = await tryModel(apiKey, PRIMARY_MODEL, body, controller.signal);

    const isModelGone = (r: ModelResult) =>
      !r.ok && r.status >= 400 && r.status < 500 && /model|decommission|not.?found/i.test(r.detail);
    const needsRetry = (r: ModelResult) => r.ok && (!r.reply || looksIncomplete(r.reply));

    if (needsRetry(result)) {
      console.warn(`[chat] ${PRIMARY_MODEL} returned an empty or incomplete reply, retrying the same model once.`);
      result = await tryModel(apiKey, PRIMARY_MODEL, body, controller.signal);
    }

    if ((isModelGone(result) || needsRetry(result)) && PRIMARY_MODEL !== FALLBACK_MODEL) {
      console.warn(
        `[chat] ${PRIMARY_MODEL} ${needsRetry(result) ? "still returning empty or incomplete replies" : "rejected"}, falling back to ${FALLBACK_MODEL}.`,
      );
      result = await tryModel(apiKey, FALLBACK_MODEL, body, controller.signal);
    }

    if (!result.ok) {
      console.error(`[chat] Groq ${result.status}: ${result.detail}`);
      return json({ error: "upstream", reply: corelinePersona.fallback }, 502);
    }

    if (!result.reply) {
      console.error("[chat] every attempt returned an empty completion");
      return json({ error: "empty", reply: corelinePersona.fallback }, 502);
    }

    // The retry cascade above already tried twice to get a clean finish; a
    // reply that is STILL short and unpunctuated at this point is more
    // useful to the visitor than a third round-trip, so it is returned as-is
    // rather than retried again or discarded for a generic fallback line.

    return json({ reply: capReply(result.reply) }, 200);
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";
    console.error(
      `[chat] ${aborted ? "upstream timed out" : "request failed"}:`,
      error,
    );
    return json(
      { error: aborted ? "timeout" : "failed", reply: corelinePersona.fallback },
      504,
    );
  } finally {
    clearTimeout(timeout);
  }
}

/** Anything other than POST is a mistake worth naming explicitly. */
export async function GET() {
  return json({ error: "Use POST." }, 405, { Allow: "POST" });
}
