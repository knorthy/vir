import { Resend } from "resend";
import { connection } from "next/server";
import { guard } from "@/lib/guard";
import { clientKey, rateLimited } from "@/lib/rateLimit";
import { checkToken, issueToken, looksLikeSpam } from "@/lib/spam";

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
// Single-line fields go into the email subject: strip line breaks so they can't inject headers.
const line = (v: unknown, max: number) => clip(v, max).replace(/[\r\n\t]+/g, " ");

// A fresh signed form token, fetched when the RFI form loads.
export async function GET(request: Request) {
  await connection();
  if (rateLimited(clientKey(request, "rfi-token"), 30, 10 * 60 * 1000)) {
    return Response.json({ error: "rate-limited" }, { status: 429 });
  }
  return Response.json({ token: issueToken() }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RFI_TO_EMAIL;
  if (!apiKey || !to) return Response.json({ error: "not-configured" }, { status: 503 });

  // 5 RFIs per visitor per hour; 50 per day site-wide.
  const body = await guard(request, {
    scope: "rfi",
    maxBytes: 12_000,
    perClient: [5, 60 * 60 * 1000],
    global: [50, 24 * 60 * 60 * 1000],
  });
  if (body instanceof Response) return body;

  // Honeypot: real visitors never see or fill this field. Bots get a fake success.
  if (clip(body.website, 200)) return Response.json({ ok: true });

  const token = checkToken(body.token);
  if (token === "invalid") return Response.json({ error: "forbidden" }, { status: 403 });
  if (token === "too-fast") return Response.json({ ok: true });
  if (token === "expired") return Response.json({ error: "expired" }, { status: 409 });

  const name = line(body.name, 120);
  const email = line(body.email, 200);
  const org = line(body.org, 160);
  const subject = line(body.subject, 80) || "General question";
  const message = clip(body.message, 4000);
  if (!name || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || message.length < 10) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const spam = looksLikeSpam({ name, email, org, message });
  if (spam) {
    console.warn("rfi rejected as spam:", spam);
    return Response.json({ ok: true });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.RFI_FROM_EMAIL || "Portfolio RFI <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `RFI: ${subject} — ${name}${org ? ` (${org})` : ""}`,
    text: `${message}\n\n— ${name}${org ? `, ${org}` : ""}\n${email}\n\nSent from the RFI form on your portfolio. Reply to this email to answer.`,
  });
  if (error) {
    console.error("rfi send failed", error);
    return Response.json({ error: "send-failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
