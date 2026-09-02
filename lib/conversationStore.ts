/**
 * Persistence for every chat-assistant conversation - not just the ones that
 * end in a phone number.
 *
 * Before this, a visitor who chatted at length and then closed the tab
 * without leaving a number was invisible to Shailesh entirely: `lib/leads.ts`
 * only ever fired when a valid phone was captured. That is exactly backwards
 * for "I should get to know the chats - what and who talked" - engagement
 * without a conversion is still worth seeing, if only to notice a question
 * the bot keeps fumbling or a vertical it has no good answer for.
 *
 * Every conversation gets a stable id (generated client-side once, per tab)
 * and is upserted here at each meaningful step, so the admin view always
 * shows the latest state of an in-progress chat, not just a snapshot from
 * whenever it happened to end.
 *
 * STORAGE, AND ITS LIMITS
 * This writes to a JSON file on local disk (data/conversations.json). That is
 * genuinely persistent on a traditional server or a VPS with a real disk, and
 * it is enough to build and test the whole feature against today without
 * requiring a database or an email-provider API key this project does not
 * have configured. It is NOT reliable on a serverless host (Vercel, Netlify
 * functions) - the filesystem there is ephemeral per invocation, so writes
 * can vanish. If this ends up deployed serverless, swap the three functions
 * below for a real store (Postgres, Turso, even a Google Sheet via webhook)
 * and nothing outside this file has to change - the admin page and the API
 * route both go through this module only.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type Conversation = {
  id: string;
  startedAt: string;
  updatedAt: string;
  /** Reached the end of the flow and either gave a number or explicitly skipped. */
  completed: boolean;
  /** True once a valid phone number was captured - the signal for "hot lead". */
  hasPhone: boolean;
  name: string;
  phone: string;
  business: string;
  vertical: string;
  problem: string;
  frequency: string;
  website: string;
  intent: string;
  /** "Them: …" / "Bot: …" lines, newline-joined - the full transcript. */
  transcript: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "conversations.json");

/** In-memory cache so a burst of upserts in one request cycle does not each
 *  hit disk; reloaded from disk lazily, once, on first use per process. */
let cache: Map<string, Conversation> | null = null;

/** Serialises writes so two concurrent upserts cannot interleave and corrupt
 *  the file - a plain promise chain is enough for a single Node process. */
let writeQueue: Promise<void> = Promise.resolve();

async function load(): Promise<Map<string, Conversation>> {
  if (cache) return cache;
  try {
    const raw = await readFile(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Conversation[];
    cache = new Map(parsed.map((c) => [c.id, c]));
  } catch {
    // Missing file on first run, or a corrupt one - either way, start empty
    // rather than failing every chat in the widget over it.
    cache = new Map();
  }
  return cache;
}

async function persist(map: Map<string, Conversation>): Promise<void> {
  writeQueue = writeQueue.then(async () => {
    await mkdir(DATA_DIR, { recursive: true });
    const list = [...map.values()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    await writeFile(STORE_PATH, JSON.stringify(list, null, 2), "utf-8");
  });
  await writeQueue;
}

/**
 * Merges the given fields into whatever is already stored under `id`, or
 * creates a new entry. Called repeatedly across one visitor's conversation as
 * they move through the flow, so later calls only need to send what changed -
 * `undefined` fields leave the existing value alone.
 */
export async function upsertConversation(
  id: string,
  patch: Partial<Omit<Conversation, "id" | "startedAt">>,
): Promise<void> {
  try {
    const map = await load();
    const now = new Date().toISOString();
    const existing = map.get(id);

    /**
     * The client fires one of these per step, in order - but the requests
     * race over the network, and nothing guarantees they arrive in that
     * order. Confirmed live: the "name" step's call (completed: false) took
     * long enough that it landed AFTER the phone-capture call (completed:
     * true) that followed it nine seconds later on the client, silently
     * un-marking a just-captured hot lead as incomplete.
     *
     * `completed` and `hasPhone` only ever move forward in a real
     * conversation, so they are merged with OR - once true, an
     * out-of-order earlier patch can no longer revert them. The text fields
     * take whichever side is non-empty rather than blindly trusting
     * whichever request happened to arrive last, and the transcript keeps
     * whichever version is longer, since in every real conversation it only
     * grows.
     */
    const next: Conversation = {
      id,
      startedAt: existing?.startedAt ?? now,
      updatedAt: now,
      completed: Boolean(patch.completed) || Boolean(existing?.completed),
      hasPhone: Boolean(patch.hasPhone) || Boolean(existing?.hasPhone),
      name: patch.name || existing?.name || "",
      phone: patch.phone || existing?.phone || "",
      business: patch.business || existing?.business || "",
      vertical: patch.vertical || existing?.vertical || "",
      problem: patch.problem || existing?.problem || "",
      frequency: patch.frequency || existing?.frequency || "",
      website: patch.website || existing?.website || "",
      intent: patch.intent || existing?.intent || "",
      transcript:
        (patch.transcript?.length ?? 0) >= (existing?.transcript?.length ?? 0)
          ? (patch.transcript ?? "")
          : (existing?.transcript ?? ""),
    };

    map.set(id, next);
    await persist(map);
  } catch (error) {
    // A conversation that fails to save is a visibility problem, not a
    // visitor-facing one - the widget's own flow never depends on this.
    console.error("[conversationStore] upsert failed:", error);
  }
}

/** Most recently updated first - what the admin list shows. */
export async function listConversations(): Promise<Conversation[]> {
  const map = await load();
  return [...map.values()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getConversation(id: string): Promise<Conversation | null> {
  const map = await load();
  return map.get(id) ?? null;
}
