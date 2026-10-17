"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "./drawings";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "failed" | "expired";

const subjects = ["A full-time role", "An internship or OJT", "A project or contract", "Something else"];

/* RFI form: posts to /api/rfi, which emails Jasmine through Resend. If the
   mail service isn't configured yet, it falls back to the visitor's email app. */
export function RfiForm({ to }: { to: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const token = useRef("");

  // A signed, timestamped token proves the form was loaded by a person on this
  // page; the server rejects submissions without one.
  const refreshToken = () =>
    fetch("/api/rfi", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => {
        token.current = j.token ?? "";
      })
      .catch(() => {});

  useEffect(() => {
    refreshToken();
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const next: Errors = {};
    if (!get("name")) next.name = "Add your name so Jasmine knows who is asking.";
    if (!/^\S+@\S+\.\S+$/.test(get("email"))) next.email = "Enter an email address she can reply to.";
    if (get("message").length < 10) next.message = "Describe the role or project in a sentence or two.";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    const payload = {
      name: get("name"),
      email: get("email"),
      org: get("org"),
      subject: get("subject"),
      message: get("message"),
      website: get("website"),
      token: token.current,
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/rfi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        refreshToken();
        return;
      }
      const { error } = await res.json().catch(() => ({ error: "" }));
      if (error === "expired" || error === "forbidden") {
        await refreshToken();
        setStatus("expired");
        return;
      }
      if (error === "not-configured") {
        // No mail service yet: hand the RFI to the visitor's email app instead.
        const subject = `RFI: ${payload.subject}${payload.org ? ` (${payload.org})` : ""}`;
        const body = `${payload.message}\n\n${payload.name}${payload.org ? `, ${payload.org}` : ""}\n${payload.email}`;
        window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setStatus("idle");
        return;
      }
      setStatus("failed");
    } catch {
      setStatus("failed");
    }
  }

  const err = (f: Field) =>
    errors[f] ? (
      <p id={`${f}-error`} className="field-error">
        {errors[f]}
      </p>
    ) : null;

  const statusText = {
    idle: "Goes straight to Jasmine's inbox.",
    sending: "Sending…",
    sent: "RFI issued. Jasmine will reply by email.",
    failed: "That didn't send. Please try again in a moment.",
    expired: "This form was open a while. Press Issue RFI once more to send.",
  }[status];

  return (
    <form className="rfi" onSubmit={submit} noValidate>
      <div className="rfi-head">
        <span>RFI No. 001</span>
        <span>To: Jasmine Vir</span>
      </div>

      <label className="field">
        <span>From</span>
        <input name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
        {err("name")}
      </label>

      <div className="field-row">
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
          {err("email")}
        </label>
        <label className="field">
          <span>
            Company <em>optional</em>
          </span>
          <input name="org" autoComplete="organization" />
        </label>
      </div>

      <label className="field">
        <span>Regarding</span>
        <select name="subject" defaultValue={subjects[0]}>
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Question</span>
        <textarea name="message" rows={3} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
        {err("message")}
      </label>

      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

      <div className="rfi-foot">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending" : "Issue RFI"} <Arrow />
        </button>
        <p className="rfi-status" role="status" data-status={status}>
          {statusText}
        </p>
      </div>
    </form>
  );
}
