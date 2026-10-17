"use client";

import { useSyncExternalStore } from "react";

type Theme = "blue" | "light";

/* Blueprint (blue) or whiteprint (light). The theme lives on html[data-theme]
   (set before paint from localStorage), so this reads it from the DOM rather
   than keeping a second copy in React state. */
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};
const getTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "blue");
const getServerTheme = (): Theme => "blue";

export function ThemeSwitch() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  function toggle() {
    const next: Theme = theme === "light" ? "blue" : "light";
    const apply = () => {
      if (next === "light") document.documentElement.dataset.theme = "light";
      else delete document.documentElement.dataset.theme;
    };
    try {
      localStorage.setItem("theme", next);
    } catch {}

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && document.startViewTransition) document.startViewTransition(apply);
    else apply();
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "light"}
      aria-label="Light mode"
      className="theme-switch"
      onClick={toggle}
    >
      <span className="theme-name theme-name-blue" aria-hidden="true">
        Blue
      </span>
      <span className="theme-track" aria-hidden="true">
        <span className="theme-knob" />
      </span>
      <span className="theme-name theme-name-light" aria-hidden="true">
        Light
      </span>
    </button>
  );
}
