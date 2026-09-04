import { chatFallback, corelineChatPrompt, pageLabel } from "@/lib/chat-prompt";
import { checkRateLimit, clientKey } from "@/lib/rate-limit";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
/*
 * 120b leads because it follows the conversation rules noticeably better than
 * 20b - staying on the trade-specific opening, linking the right demo, and
 * honouring the per-situation instructions rather than defaulting to "what
 * business do you run". Measured at ~330ms to full reply, so the larger model
 * costs nothing the visitor can feel. 20b stays as the fallback.
 */
const PRIMARY_MODEL = process.env.GROQ_MODEL ?? "openai/gpt-oss-120b";
const FALLBACK_MODEL = process.env.GROQ_FALLBACK_MODEL ?? "openai/gpt-oss-20b";

const LIMITS = {
  maxMessages: 10,
  maxCharsPerMessage: 500,
  maxTotalChars: 4_000,
  maxStageChars: 700,
  upstreamTimeoutMs: 15_000,
};

/*
 * The per-minute rule is the abuse guard; the hourly one only exists to stop
 * a single address grinding through the key all day. 20/hour was low enough
 * to cut off a genuinely engaged buyer mid-conversation - the exact visitor
 * this widget exists for - so the ceiling is higher while the burst limit
 * does the real work. The global rule still caps total spend.
 */
const PER_IP_RULES = [
  { limit: 8, windowMs: 60_000 },
  { limit: 60, windowMs: 60 * 60_000 },
];

const GLOBAL_RULES = [{ limit: 400, windowMs: 60 * 60_000 }];

type ClientMessage = { role: "user" | "assistant"; content: string };

function json(body: unknown, status: number, headers?: HeadersInit) {
  return Response.json(body, { status, headers });
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

async function groqStream(
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
    body: JSON.stringify({ ...body, model, stream: true }),
    signal,
  });
}

/**
 * Server clock, not the client's - a visitor's device timezone/clock is
 * neither trustworthy nor necessarily set to IST, and lying about it only
 * costs a wrong tone, not anything worth validating harder for.
 */
function withinBusinessHours(): boolean {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    hour12: false,
    weekday: "short",
  }).formatToParts(new Date());

  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  return weekday !== "Sun" && hour >= 9 && hour < 18;
}

function sseToText(upstream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  let leftover = "";
  return upstream.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        leftover += decoder.decode(chunk, { stream: true });
        const lines = leftover.split("\n");
        leftover = lines.pop() ?? "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const data = trimmed.slice(5).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data) as {
              choices?: { delta?: { content?: string } }[];
            };
            const token = parsed.choices?.[0]?.delta?.content;
            if (token) controller.enqueue(new TextEncoder().encode(token));
          } catch {
            /* skip a broken SSE line */
          }
        }
      },
    }),
  );
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "Expected application/json.", reply: chatFallback }, 415);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON body.", reply: chatFallback }, 400);
  }

  const {
    messages: rawMessages,
    shownChips: rawShown,
    path: rawPath,
  } = (payload ?? {}) as Record<string, unknown>;

  const parsed = parseMessages(rawMessages);
  if (typeof parsed === "string") {
    return json({ error: parsed, reply: chatFallback }, 400);
  }

  const shownChips = Array.isArray(rawShown)
    ? rawShown
        .filter((entry): entry is string => typeof entry === "string")
        .map((entry) => entry.trim().slice(0, 80))
        .filter(Boolean)
        .slice(0, 24)
    : [];

  // A bare path only - not trusted for anything beyond a human label in the
  // prompt, so a malformed value just falls back to "the homepage" rather
  // than being rejected.
  const path =
    typeof rawPath === "string" && /^\/[a-z0-9/_-]{0,80}$/i.test(rawPath) ? rawPath : "/";

  const ip = clientKey(request);
  const perIp = checkRateLimit(`coreline-chat:${ip}`, PER_IP_RULES);
  if (!perIp.ok) {
    return json(
      {
        error: "rate",
        reply: "You're sending messages a bit fast — give it a moment, then try again.",
      },
      429,
      { "Retry-After": String(perIp.retryAfterSeconds) },
    );
  }

  const global = checkRateLimit("coreline-chat:global", GLOBAL_RULES);
  if (!global.ok) {
    return json({ error: "busy", reply: chatFallback }, 503);
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.warn("[chat] GROQ_API_KEY is not set; serving fallback.");
    return json({ error: "unconfigured", reply: chatFallback }, 503);
  }

  const body = {
    messages: [
      {
        role: "system",
        content: corelineChatPrompt({
          shownChips,
          page: pageLabel(path),
          withinHours: withinBusinessHours(),
        }),
      },
      ...parsed,
    ],
    temperature: 0.7,
    /*
     * Both configured models are gpt-oss reasoning models: they stream hidden
     * `reasoning` deltas before any `content`, and that thinking is billed
     * against max_tokens. At the previous 400 with default effort, reasoning
     * regularly ran 800+ characters and the budget was gone before the answer
     * started - measured empty or mid-sentence-truncated replies on roughly
     * two of every three requests, which the widget then surfaced as
     * "Something's gone wrong on my end."
     *
     * `reasoning_effort: low` cuts thinking to ~60-80 characters, and the
     * larger budget leaves room for a full reply plus the chip line.
     */
    reasoning_effort: "low",
    max_tokens: 700,
    top_p: 0.9,
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), LIMITS.upstreamTimeoutMs);

  try {
    let response = await groqStream(apiKey, PRIMARY_MODEL, body, controller.signal);
    if (!response.ok || !response.body) {
      console.warn(`[chat] ${PRIMARY_MODEL} ${response.status}, trying fallback.`);
      response = await groqStream(apiKey, FALLBACK_MODEL, body, controller.signal);
    }

    if (!response.ok || !response.body) {
      console.error(`[chat] Groq ${response.status}: ${await response.text()}`);
      return json({ error: "upstream", reply: chatFallback }, 502);
    }

    return new Response(sseToText(response.body), {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";
    console.error(`[chat] ${aborted ? "timeout" : "failed"}:`, error);
    return json({ error: aborted ? "timeout" : "failed", reply: chatFallback }, 504);
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET() {
  return json({ error: "Use POST." }, 405, { Allow: "POST" });
}
