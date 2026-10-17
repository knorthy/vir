// Small in-memory sliding-window limiter. It is per server instance, which is
// enough to stop casual abuse of the chat and RFI endpoints on a portfolio.
const hits = new Map<string, number[]>();

export function rateLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > limit;
}

export function clientKey(request: Request, scope: string) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
  return `${scope}:${ip}`;
}
