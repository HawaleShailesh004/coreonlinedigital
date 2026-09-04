import { chatFallback, chatSummaryPrompt } from "@/lib/chat-prompt";
import { checkRateLimit, clientKey } from "@/lib/rate-limit";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.GROQ_MODEL ?? "openai/gpt-oss-20b";

type ClientMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  const ip = clientKey(request);
  const limited = checkRateLimit(`coreline-chat-summary:${ip}`, [
    { limit: 10, windowMs: 60 * 60_000 },
  ]);
  if (!limited.ok) {
    return Response.json({ summary: "Hi, saw your website — want to talk about a website for my business." });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ summary: "Hi, saw your website — want to talk about a website for my business." });
  }

  const raw = (payload as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) {
    return Response.json({ summary: "Hi, saw your website — want to talk about a website for my business." });
  }

  const transcript = raw
    .slice(-10)
    .filter((entry): entry is ClientMessage => {
      if (typeof entry !== "object" || entry === null) return false;
      const row = entry as Record<string, unknown>;
      return (
        (row.role === "user" || row.role === "assistant") &&
        typeof row.content === "string"
      );
    })
    .map((row) => `${row.role === "user" ? "Visitor" : "Bot"}: ${row.content.slice(0, 500)}`)
    .join("\n")
    .slice(0, 3_000);

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json({ summary: "Hi, saw your website — want to talk about a website for my business." });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        /*
         * gpt-oss models stream hidden reasoning tokens before any content,
         * and that thinking is billed against max_tokens. At 80 with default
         * effort the budget was gone before the summary itself started, so
         * this returned empty essentially every time and every handoff fell
         * back to the generic "saw your website" line - dropping the trade,
         * area and problem that make the WhatsApp message worth receiving.
         */
        reasoning_effort: "low",
        max_tokens: 200,
        messages: [
          { role: "system", content: chatSummaryPrompt() },
          { role: "user", content: transcript || "They opened chat and want to talk." },
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return Response.json({ summary: "Hi, saw your website — want to talk about a website for my business." });
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const summary = data.choices?.[0]?.message?.content?.trim().replace(/^["']|["']$/g, "") ?? "";
    return Response.json({
      summary: (
        summary || "Hi, saw your website — want to talk about a website for my business."
      ).slice(0, 300),
    });
  } catch {
    return Response.json({ summary: "Hi, saw your website — want to talk about a website for my business." });
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET() {
  return Response.json({ error: "Use POST.", reply: chatFallback }, { status: 405 });
}
