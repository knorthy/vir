"use client";

import { useEffect, useRef, useState } from "react";
import type { projects as ProjectList } from "@/data/portfolio";
import { Arrow, CloseIcon } from "./drawings";
import { T } from "./T";

type Project = (typeof ProjectList)[number];

/* Projects as drawing sheets lying on a table. Hover (mouse), tap (touch), or
   focus (keyboard) lifts a sheet flat toward the viewer, blurs everything
   else, and slides the project's details in on the right. */
export function ProjectDesk({ projects, sheet }: { projects: Project[]; sheet: string }) {
  const [active, setActive] = useState<number | null>(null);
  const [shown, setShown] = useState(0); // last opened, so the panel keeps content while it slides out
  const closeTimer = useRef(0);

  const open = (i: number) => {
    window.clearTimeout(closeTimer.current);
    setActive(i);
    setShown(i);
  };
  const close = (delay = 0) => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActive(null), delay);
  };
  const hold = () => window.clearTimeout(closeTimer.current);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const p = projects[shown];

  return (
    <div className="desk" data-active={active !== null ? "" : undefined}>
      <div className="desk-blur" aria-hidden="true" onClick={() => close()} />

      <div className="desk-surface">
        {projects.map((proj, i) => (
          <div
            key={i}
            className="desk-slot"
            data-on={active === i ? "" : undefined}
            role="button"
            tabIndex={0}
            aria-expanded={active === i}
            aria-controls="project-panel"
            onPointerEnter={(e) => e.pointerType === "mouse" && open(i)}
            onPointerLeave={(e) => e.pointerType === "mouse" && close(160)}
            onClick={() => open(i)}
            onFocus={() => open(i)}
            onBlur={(e) => {
              if (!(e.relatedTarget as HTMLElement | null)?.closest?.(".project-panel")) close(120);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (active === i) close();
                else open(i);
              }
            }}
          >
            <div className="paper" data-print={i % 2 === 1 ? "white" : "blue"}>
              <div className="paper-frame">
                <div className="paper-plate">
                  {proj.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={proj.image} alt="" />
                  ) : (
                    <svg viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M0 0L160 100M160 0L0 100" vectorEffect="non-scaling-stroke" />
                    </svg>
                  )}
                </div>
                <div className="paper-tb">
                  <span className="paper-num">
                    {sheet}.{i + 1}
                  </span>
                  <span className="paper-title">
                    <T>{proj.title}</T>
                  </span>
                  <span className="paper-kind">{proj.kind}</span>
                </div>
              </div>
            </div>
            <span className="sr-only">
              {proj.kind}. {proj.summary}
            </span>
          </div>
        ))}
        <p className="desk-hint" aria-hidden="true">
          hover a sheet to pick it up
        </p>
      </div>

      <aside
        id="project-panel"
        className="project-panel"
        aria-label="Project details"
        data-open={active !== null ? "" : undefined}
        onPointerEnter={hold}
        onPointerLeave={(e) => e.pointerType === "mouse" && close(160)}
      >
        <div className="pp-head">
          <span className="pp-num">
            {sheet}.{shown + 1}
          </span>
          <span className="pp-kind">{p.kind}</span>
          <button type="button" className="pp-close" aria-label="Close project details" onClick={() => close()}>
            <CloseIcon />
          </button>
        </div>
        <h3 className="pp-title">
          <T>{p.title}</T>
        </h3>
        <dl className="pp-rows">
          <div>
            <dt>Year</dt>
            <dd>
              <T>{p.year}</T>
            </dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>
              <T>{p.role}</T>
            </dd>
          </div>
          <div>
            <dt>Tools</dt>
            <dd>
              {p.tags.map((t, j) => (
                <span key={t}>
                  {j > 0 && " · "}
                  <T>{t}</T>
                </span>
              ))}
            </dd>
          </div>
        </dl>
        <p className="pp-summary">
          <T>{p.summary}</T>
        </p>
        {p.link ? (
          <a href={p.link} className="pp-link" target="_blank" rel="noreferrer">
            View project <Arrow />
          </a>
        ) : (
          <span className="pp-link">
            <span className="tbd">Link to add</span>
          </span>
        )}
      </aside>
    </div>
  );
}
