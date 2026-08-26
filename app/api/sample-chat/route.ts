import { getPersona } from "@/lib/samples/chat-personas";
import { checkRateLimit, clientKey } from "@/lib/rate-limit";

/**
 * Chat endpoint for the two sample sites that carry a live AI assistant
 * (/samples/gym and /samples/trader), backed by Groq.
 *
 * These widgets are public and spend a real API key, so the handler is written
 * defensively rather than minimally:
 *
 *   - the key never leaves the server; the client only ever sees text
 *   - the client cannot send a system message, so it cannot rewrite the persona
 *   - every request is capped on turns, per-message length and total length
 *   - replies are capped by max_tokens AND hard-truncated, so a runaway
 *     generation can't stream a wall of text into the widget
 *   - two rate-limit rules per IP plus a global ceiling protecting the key
 *   - upstream errors are logged server-side but never forwarded to the client
 *
 * Missing key is treated as a soft failure: the widget falls back to a scripted
 * line so a live demo degrades instead of breaking.
 */

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

/**
 * Groq retired the Llama chat models, so this defaults to a current production
 * model and falls back if the primary is ever decommissioned too. Override with
 * GROQ_MODEL without touching code.
 */
const PRIMARY_MODEL = process.env.GROQ_MODEL ?? "openai/gpt-oss-20b";
const FALLBACK_MODEL = "openai/gpt-oss-120b";

const LIMITS = {
  /** Turns of history accepted from the client. */
  maxMessages: 16,
  maxCharsPerMessage: 500,
  maxTotalChars: 6_000,
  /** Hard ceiling on the reply, independent of max_tokens. */
  maxReplyChars: 700,
  upstreamTimeoutMs: 15_000,
};

const PER_IP_RULES = [
  { limit: 6, windowMs: 20_000 },
  { limit: 40, windowMs: 10 * 60_000 },
];

/** Backstop on total spend if a sample page gets scraped or shared widely. */
const GLOBAL_RULES = [{ limit: 400, windowMs: 60 * 60_000 }];

type ClientMessage = { role: "user" | "assistant"; content: string };

function json(body: unknown, status: number, headers?: HeadersInit) {
  return Response.json(body, { status, headers });
}

/** Trims to the last sentence boundary so a cut reply doesn't end mid-word. */
function capReply(text: string) {
  const collapsed = text.replace(/\s+/g, " ").trim();
  if (collapsed.length <= LIMITS.maxReplyChars) return collapsed;

  const clipped = collapsed.slice(0, LIMITS.maxReplyChars);
  const lastStop = Math.max(
    clipped.lastIndexOf(". "),
    clipped.lastIndexOf("! "),
    clipped.lastIndexOf("? "),
  );
  return lastStop > 200 ? clipped.slice(0, lastStop + 1) : `${clipped.trim()}…`;
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

  const { persona: personaId, messages: rawMessages } = (payload ??
    {}) as Record<string, unknown>;

  const persona = typeof personaId === "string" ? getPersona(personaId) : null;
  if (!persona) {
    return json({ error: "Unknown assistant." }, 400);
  }

  const parsed = parseMessages(rawMessages);
  if (typeof parsed === "string") {
    return json({ error: parsed }, 400);
  }

  const ip = clientKey(request);
  const perIp = checkRateLimit(`chat:${persona.id}:${ip}`, PER_IP_RULES);
  if (!perIp.ok) {
    return json(
      { error: "You're sending messages a bit fast - give it a moment." },
      429,
      { "Retry-After": String(perIp.retryAfterSeconds) },
    );
  }

  const global = checkRateLimit("chat:global", GLOBAL_RULES);
  if (!global.ok) {
    return json({ error: "unconfigured", reply: persona.fallback }, 503);
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    // Soft failure so a live demo still says something sensible.
    console.warn("[sample-chat] GROQ_API_KEY is not set; serving fallback.");
    return json({ error: "unconfigured", reply: persona.fallback }, 503);
  }

  const body = {
    messages: [{ role: "system", content: persona.systemPrompt }, ...parsed],
    temperature: 0.3,
    max_tokens: persona.maxTokens,
    top_p: 0.9,
    stream: false,
  };

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    LIMITS.upstreamTimeoutMs,
  );

  try {
    let response = await callGroq(
      apiKey,
      PRIMARY_MODEL,
      body,
      controller.signal,
    );

    // A decommissioned model comes back as a 4xx; try the fallback once.
    if (!response.ok && response.status >= 400 && response.status < 500) {
      const detail = await response.text();
      const modelGone = /model|decommission|not.?found/i.test(detail);
      if (modelGone && PRIMARY_MODEL !== FALLBACK_MODEL) {
        console.warn(
          `[sample-chat] ${PRIMARY_MODEL} rejected, retrying with ${FALLBACK_MODEL}.`,
        );
        response = await callGroq(
          apiKey,
          FALLBACK_MODEL,
          body,
          controller.signal,
        );
      } else {
        console.error(`[sample-chat] Groq ${response.status}: ${detail}`);
        return json({ error: "upstream", reply: persona.fallback }, 502);
      }
    }

    if (!response.ok) {
      console.error(
        `[sample-chat] Groq ${response.status}: ${await response.text()}`,
      );
      return json({ error: "upstream", reply: persona.fallback }, 502);
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = data.choices?.[0]?.message?.content;

    if (!reply || !reply.trim()) {
      return json({ error: "empty", reply: persona.fallback }, 502);
    }

    return json({ reply: capReply(reply) }, 200);
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";
    console.error(
      `[sample-chat] ${aborted ? "upstream timed out" : "request failed"}:`,
      error,
    );
    return json(
      { error: aborted ? "timeout" : "failed", reply: persona.fallback },
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
