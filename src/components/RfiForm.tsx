"use client";

import { useState } from "react";
import { Arrow } from "./drawings";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const subjects = ["A full-time role", "A project or contract", "Something else"];

export function RfiForm({ to }: { to: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const next: Errors = {};
    if (!get("name")) next.name = "Add your name so Jasmine knows who is asking.";
    if (!/^\S+@\S+\.\S+$/.test(get("email"))) next.email = "Enter an email address she can reply to.";
    if (get("message").length < 10) next.message = "Describe the role or project in a sentence or two.";
    setErrors(next);
    if (Object.keys(next).length) {
      e.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    const org = get("org");
    const subject = `RFI: ${get("subject")}${org ? ` (${org})` : ""}`;
    const body = `${get("message")}\n\n${get("name")}${org ? `, ${org}` : ""}\n${get("email")}`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const err = (f: Field) =>
    errors[f] ? (
      <p id={`${f}-error`} className="field-error">
        {errors[f]}
      </p>
    ) : null;

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

      <div className="rfi-foot">
        <button type="submit" className="btn btn-primary">
          Issue RFI <Arrow />
        </button>
        <p className="rfi-status" role="status">
          {sent ? `Your email app should open with the RFI drafted. If it didn't, write to ${to}.` : "Opens your email app with the RFI filled in."}
        </p>
      </div>
    </form>
  );
}
