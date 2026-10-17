import { clientKey, rateLimited } from "./rateLimit";

type Limits = {
  scope: string;
  maxBytes: number;
  perClient: [limit: number, windowMs: number];
  global: [limit: number, windowMs: number];
};

const json = (error: string, status: number) => Response.json({ error }, { status });

/* Front door for the API routes. Rejects anything that isn't a small JSON POST
   from this site's own pages before any paid service (Gemini, Resend) is
   touched, then applies per-visitor and site-wide rate limits.
   Returns the parsed body, or a Response to send back. */
export async function guard(request: Request, limits: Limits): Promise<Record<string, unknown> | Response> {
  // Same-origin only: other sites can't spend this site's API quota.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  let sameOrigin = false;
  try {
    sameOrigin = !!origin && !!host && new URL(origin).host === host;
  } catch {}
  if (!sameOrigin) return json("forbidden", 403);

  if (!request.headers.get("content-type")?.includes("application/json")) return json("unsupported", 415);

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > limits.maxBytes) return json("too-large", 413);

  if (rateLimited(`${limits.scope}:all`, ...limits.global)) return json("busy", 503);
  if (rateLimited(clientKey(request, limits.scope), ...limits.perClient)) return json("rate-limited", 429);

  // Read with a hard cap, even if content-length lied.
  const reader = request.body?.getReader();
  if (!reader) return json("bad-request", 400);
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limits.maxBytes) {
      await reader.cancel();
      return json("too-large", 413);
    }
    chunks.push(value);
  }
  try {
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    return body && typeof body === "object" && !Array.isArray(body) ? body : json("bad-request", 400);
  } catch {
    return json("bad-request", 400);
  }
}
