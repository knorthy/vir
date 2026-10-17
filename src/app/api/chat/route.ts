import { GoogleGenAI } from "@google/genai";
import { systemInstruction } from "@/lib/knowledge";
import { clientKey, rateLimited } from "@/lib/rateLimit";

type Message = { role: "user" | "model"; text: string };

const MAX_TURNS = 12;
const MAX_CHARS = 600;

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return Response.json({ error: "not-configured" }, { status: 503 });

  if (rateLimited(clientKey(request, "chat"), 30, 10 * 60 * 1000)) {
    return Response.json({ error: "rate-limited" }, { status: 429 });
  }

  let messages: Message[];
  try {
    const body = await request.json();
    messages = (Array.isArray(body?.messages) ? body.messages : [])
      .filter((m: Message) => (m?.role === "user" || m?.role === "model") && typeof m?.text === "string")
      .slice(-MAX_TURNS)
      .map((m: Message) => ({ role: m.role, text: m.text.slice(0, MAX_CHARS) }));
  } catch {
    return Response.json({ error: "bad-request" }, { status: 400 });
  }
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
      config: { systemInstruction, maxOutputTokens: 300, temperature: 0.6 },
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
