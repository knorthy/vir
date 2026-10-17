import { Resend } from "resend";
import { clientKey, rateLimited } from "@/lib/rateLimit";

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RFI_TO_EMAIL;
  if (!apiKey || !to) return Response.json({ error: "not-configured" }, { status: 503 });

  if (rateLimited(clientKey(request, "rfi"), 5, 60 * 60 * 1000)) {
    return Response.json({ error: "rate-limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad-request" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (clip(body.website, 200)) return Response.json({ ok: true });

  const name = clip(body.name, 120);
  const email = clip(body.email, 200);
  const org = clip(body.org, 160);
  const subject = clip(body.subject, 80) || "General question";
  const message = clip(body.message, 4000);
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10) {
    return Response.json({ error: "invalid" }, { status: 400 });
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
