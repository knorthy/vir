import { GoogleGenAI } from "@google/genai";
import { systemInstruction } from "@/lib/knowledge";
import { guard } from "@/lib/guard";

type Message = { role: "user" | "model"; text: string };

const MAX_TURNS = 12;
const MAX_CHARS = 600;

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return Response.json({ error: "not-configured" }, { status: 503 });

  // 30 questions per visitor per 10 minutes; 300 per hour site-wide caps spend.
  const body = await guard(request, {
    scope: "chat",
    maxBytes: 16_000,
    perClient: [30, 10 * 60 * 1000],
    global: [300, 60 * 60 * 1000],
  });
  if (body instanceof Response) return body;

  const messages: Message[] = (Array.isArray(body.messages) ? body.messages : [])
    .filter((m: Message) => (m?.role === "user" || m?.role === "model") && typeof m?.text === "string")
    .slice(-MAX_TURNS)
    .map((m: Message) => ({ role: m.role, text: m.text.slice(0, MAX_CHARS) }));
  // Gemini expects the conversation to start with, and end on, a user turn.
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user" || !messages.at(-1)!.text.trim()) {
    return Response.json({ error: "bad-request" }, { status: 400 });
  }

  const ai = new GoogleGenAI({ apiKey });
  try {
    const stream = await ai.models.generateContentStream({
      model: process.env.GEMINI_MODEL || "gemini-flash-latest",
      contents: messages.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
      // Room for the model's internal reasoning; the instructions keep replies to 1-3 sentences.
      config: { systemInstruction, maxOutputTokens: 2048, temperature: 0.6 },
    });

    const encoder = new TextEncoder();
    const body = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.text) controller.enqueue(encoder.encode(chunk.text));
          }
        } catch (err) {
          console.error("chat stream failed", err);
        } finally {
          controller.close();
        }
      },
    });
    return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("chat request failed", err);
    return Response.json({ error: "upstream" }, { status: 502 });
  }
}
