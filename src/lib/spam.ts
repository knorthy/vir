import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/* Anti-spam for the RFI form.
   1. Form tokens: the page fetches a server-signed timestamp when the form
      loads. A submission needs a valid token that is at least MIN_AGE old
      (humans take time to type) and at most MAX_AGE old. Bots that post
      straight to the API, or fill the form instantly, fail here.
   2. Content heuristics: link stuffing, spam phrases, disposable email
      domains, URLs in the name, shouting, repeated messages. */

const MIN_AGE = 3_000;
const MAX_AGE = 2 * 60 * 60 * 1000;

// Signing key: an explicit RFI_SECRET if set, otherwise derived from the
// Resend key so it is server-only and stable without extra setup.
const secret = () =>
  process.env.RFI_SECRET || createHash("sha256").update(`rfi-token:${process.env.RESEND_API_KEY ?? ""}`).digest("hex");

const sign = (issued: string) => createHmac("sha256", secret()).update(issued).digest("base64url");

export function issueToken() {
  const issued = String(Date.now());
  return `${issued}.${sign(issued)}`;
}

export function checkToken(token: unknown): "ok" | "invalid" | "too-fast" | "expired" {
  if (typeof token !== "string" || !token.includes(".")) return "invalid";
  const [issued, mac] = token.split(".");
  const expected = Buffer.from(sign(issued));
  const given = Buffer.from(mac ?? "");
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return "invalid";
  const age = Date.now() - Number(issued);
  if (!Number.isFinite(age) || age < 0) return "invalid";
  if (age < MIN_AGE) return "too-fast";
  if (age > MAX_AGE) return "expired";
  return "ok";
}

const spamPhrases = [
  "crypto", "bitcoin", "forex", "casino", "betting", "viagra", "cialis", "loan offer",
  "backlink", "seo service", "rank your website", "first page of google", "guest post",
  "web traffic", "increase your sales", "dear sir/madam", "investment opportunity",
  "click here", "act now", "limited time offer", "earn money", "work from home",
  "telegram", "whatsapp me", "100% free", "risk-free", "nft", "onlyfans",
];

const disposableDomains = [
  "mailinator.com", "guerrillamail.com", "10minutemail.com", "tempmail.com", "temp-mail.org",
  "yopmail.com", "trashmail.com", "sharklasers.com", "getnada.com", "dispostable.com",
  "maildrop.cc", "throwawaymail.com", "fakeinbox.com", "moakt.com", "emailondeck.com",
];

const recent = new Map<string, number>();
const DUPLICATE_WINDOW = 24 * 60 * 60 * 1000;

export function looksLikeSpam(f: { name: string; email: string; org: string; message: string }) {
  const text = `${f.name} ${f.org} ${f.message}`.toLowerCase();
  const links = (f.message.match(/https?:\/\/|www\.|\[url|<a\s/gi) ?? []).length;
  if (links > 2) return "links";
  if (/https?:\/\/|www\.|\.(com|net|ru|xyz)\b/i.test(f.name)) return "name-link";
  if (spamPhrases.some((p) => text.includes(p))) return "phrase";

  const domain = f.email.split("@")[1]?.toLowerCase() ?? "";
  if (disposableDomains.some((d) => domain === d || domain.endsWith(`.${d}`))) return "disposable";

  const letters = f.message.replace(/[^a-z]/gi, "");
  if (letters.length > 30 && letters === letters.toUpperCase()) return "shouting";
  if (letters.length < f.message.length * 0.4) return "gibberish";

  // Same message twice within a day (from anyone) is a blast, not a question.
  const now = Date.now();
  for (const [k, t] of recent) if (now - t > DUPLICATE_WINDOW) recent.delete(k);
  const fingerprint = createHash("sha256").update(f.message.replace(/\s+/g, " ").trim().toLowerCase()).digest("hex");
  if (recent.has(fingerprint)) return "duplicate";
  recent.set(fingerprint, now);

  return null;
}
