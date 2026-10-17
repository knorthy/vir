"use client";

import { useEffect, useRef, useState } from "react";
import { assistant } from "@/data/portfolio";
import { CloseIcon } from "./drawings";
import { Dog } from "./Dog";

type Message = { role: "user" | "model"; text: string };

const failures: Record<string, string> = {
  "not-configured": "My brain (Gemini) isn't plugged in yet. Until it is, the RFI form at the bottom of the page reaches Jasmine directly.",
  "rate-limited": "Woof, that's a lot of questions! Give me a minute to catch my breath.",
  default: "I couldn't fetch an answer just now. Try again, or send Jasmine an RFI below.",
};

/* The site assistant's chat, answered by Gemini through /api/chat. Lives
   inside the #assistant popover opened from the dog. */
export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  // Focus the input whenever the popover opens.
  useEffect(() => {
    const pop = document.getElementById("assistant");
    const onToggle = (e: Event) => {
      if ((e as ToggleEvent).newState === "open") input.current?.focus();
    };
    pop?.addEventListener("toggle", onToggle);
    return () => pop?.removeEventListener("toggle", onToggle);
  }, []);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [messages]);

  async function ask(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const history: Message[] = [...messages, { role: "user", text: question }];
    setMessages([...history, { role: "model", text: "" }]);
    setDraft("");
    setBusy(true);

    const reply = (t: string) =>
      setMessages((m) => [...m.slice(0, -1), { role: "model", text: t }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) {
        const code = await res.json().then((j) => j.error).catch(() => "default");
        reply(failures[code] ?? failures.default);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        reply(answer);
      }
      if (!answer.trim()) reply(failures.default);
    } catch {
      reply(failures.default);
    } finally {
      setBusy(false);
      input.current?.focus();
    }
  }

  return (
    <div className="chat">
      <div className="chat-head">
        <Dog className="dog dog-sm" />
        <div>
          <p className="chat-title">{assistant.name}</p>
          <p className="chat-status">{assistant.subtitle}</p>
        </div>
        <button type="button" popoverTarget="assistant" popoverTargetAction="hide" className="chat-close" aria-label="Close chat">
          <CloseIcon />
        </button>
      </div>

      <div className="chat-log" ref={log} aria-live="polite">
        <p className="msg msg-model">{assistant.greeting}</p>
        {messages.length === 0 && (
          <div className="chat-chips">
            {assistant.suggestions.map((s) => (
              <button key={s} type="button" className="chip" onClick={() => ask(s)}>
                {s}
              </button>
            ))}
          </div>
        )}
        {messages.map((m, i) => (
          <p key={i} className={`msg msg-${m.role}`} data-pending={m.role === "model" && !m.text ? "" : undefined}>
            {m.text || (
              <span className="typing" aria-label={`${assistant.name} is typing`}>
                <span />
                <span />
                <span />
              </span>
            )}
          </p>
        ))}
      </div>

      <form
        className="chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          ask(draft);
        }}
      >
        <input
          ref={input}
          className="chat-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask about Jasmine…"
          aria-label={`Ask ${assistant.name} about Jasmine`}
          maxLength={600}
          autoComplete="off"
        />
        <button type="submit" className="chat-send" aria-label="Send" disabled={busy || !draft.trim()}>
          <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" />
          </svg>
        </button>
      </form>
      <p className="chat-disclaimer">
        AI answers by Google Gemini from Jasmine&apos;s portfolio. They can be wrong, and chats may be reviewed by Google, so skip anything private.
      </p>
    </div>
  );
}
