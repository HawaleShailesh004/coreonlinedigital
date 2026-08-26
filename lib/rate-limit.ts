/**
 * Fixed-memory sliding-window rate limiter.
 *
 * Deliberately dependency-free and in-process. That is the right trade for the
 * sample chat demos, but be clear about the limit: counters live in one server
 * instance's memory, so on a scaled or serverless deployment each instance
 * counts separately and the effective ceiling is per-instance. If these widgets
 * ever carry real traffic, move this to a shared store (Redis / Upstash) and
 * keep the same interface.
 */

export type RateRule = {
  /** Requests allowed inside the window. */
  limit: number;
  windowMs: number;
};

export type RateResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfterSeconds: number };

/** Guards against unbounded growth if a lot of distinct IPs show up. */
const MAX_KEYS = 5_000;

const hits = new Map<string, number[]>();

function prune(timestamps: number[], now: number, longestWindow: number) {
  const cutoff = now - longestWindow;
  let index = 0;
  while (index < timestamps.length && timestamps[index] <= cutoff) index += 1;
  return index > 0 ? timestamps.slice(index) : timestamps;
}

/**
 * Records a hit against `key` and reports whether every rule still holds.
 * Rules are evaluated together, so you can combine a burst rule with a
 * longer-horizon rule (e.g. 8/30s and 40/10min).
 */
export function checkRateLimit(key: string, rules: RateRule[]): RateResult {
  const now = Date.now();
  const longestWindow = Math.max(...rules.map((rule) => rule.windowMs));

  // Cheap eviction: drop the oldest-inserted keys once the map gets large.
  if (hits.size > MAX_KEYS) {
    const excess = hits.size - MAX_KEYS;
    let removed = 0;
    for (const existing of hits.keys()) {
      hits.delete(existing);
      removed += 1;
      if (removed >= excess) break;
    }
  }

  const timestamps = prune(hits.get(key) ?? [], now, longestWindow);

  for (const rule of rules) {
    const windowStart = now - rule.windowMs;
    const inWindow = timestamps.reduce(
      (count, stamp) => (stamp > windowStart ? count + 1 : count),
      0,
    );

    if (inWindow >= rule.limit) {
      hits.set(key, timestamps);
      const oldestInWindow =
        timestamps.find((stamp) => stamp > windowStart) ?? now;
      const retryAfterMs = oldestInWindow + rule.windowMs - now;
      return {
        ok: false,
        retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
      };
    }
  }

  timestamps.push(now);
  hits.set(key, timestamps);

  const tightest = rules.reduce((acc, rule) => {
    const windowStart = now - rule.windowMs;
    const inWindow = timestamps.reduce(
      (count, stamp) => (stamp > windowStart ? count + 1 : count),
      0,
    );
    return Math.min(acc, rule.limit - inWindow);
  }, Number.POSITIVE_INFINITY);

  return { ok: true, remaining: Math.max(0, tightest) };
}

/** Best-effort client identity. Trusts proxy headers, so it is a speed bump. */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}
