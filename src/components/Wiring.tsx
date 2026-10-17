"use client";

import { useEffect } from "react";

/* One scroll listener drives the whole drawing set:
   - --energized on the circuit: how far down the bus the highlighter has reached
   - data-live on each sheet (and its cover feeder) once the bus reaches it
   - data-plotted on drawings once they scroll into view
   - aria-current on the sheet index */
export function Wiring() {
  useEffect(() => {
    const root = document.documentElement;
    const circuit = document.querySelector<HTMLElement>("[data-circuit]");
    const sheets = Array.from(document.querySelectorAll<HTMLElement>("[data-sheet]"));
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-index-link]"));
    const set = document.querySelector<HTMLElement>(".drawing-set");
    const tap = document.querySelector<SVGElement>("[data-swbd-tap]");
    const diagram = document.querySelector<HTMLElement>(".cover-diagram");
    const feed = document.querySelector<SVGPathElement>("[data-feed]");
    const bus = document.querySelector<HTMLElement>(".bus");
    const name = document.querySelector<HTMLElement>(".name");
    const nameWidth = document.querySelector<HTMLElement>("[data-name-width]");
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const probe = vh * 0.6;

      if (circuit) {
        const rect = circuit.getBoundingClientRect();
        const reach = Math.max(0, Math.min(rect.height, probe - rect.top));
        circuit.style.setProperty("--energized", `${reach}px`);
      }

      feed?.toggleAttribute("data-live", !!sheets[1] && sheets[1].getBoundingClientRect().top < probe);

      let active = sheets[0]?.id;
      for (const sheet of sheets) {
        const top = sheet.getBoundingClientRect().top;
        const live = top < probe;
        if (sheet.id !== "cover") {
          sheet.toggleAttribute("data-live", live);
          document
            .querySelectorAll(`[data-feeder="${sheet.id}"]`)
            .forEach((f) => f.toggleAttribute("data-live", live));
        }
        if (top < vh * 0.4) active = sheet.id;
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        active = sheets[sheets.length - 1]?.id;
      }

      for (const link of links) {
        const on = link.getAttribute("href") === `#${active}`;
        if (on) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      }
    };

    // Layout-only work: route the feeder from SWBD-1 down to the head of the
    // bus, and dimension the name with its real rendered width.
    const layout = () => {
      if (set && tap && diagram && feed && bus) {
        const o = set.getBoundingClientRect();
        const t = tap.getBoundingClientRect();
        const d = diagram.getBoundingClientRect();
        const b = bus.getBoundingClientRect();
        const x0 = t.left + t.width / 2 - o.left;
        const y0 = t.top + t.height / 2 - o.top;
        const run = d.bottom - o.top + 20;
        const x1 = b.left + b.width / 2 - o.left;
        feed.setAttribute("d", `M${x0} ${y0}V${run}H${x1}V${b.top - o.top}`);
      }
      if (name && nameWidth) nameWidth.textContent = `${Math.round(name.getBoundingClientRect().width)} px`;
      update();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const plotter = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-plotted", "");
            plotter.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    document.querySelectorAll("[data-plot]").forEach((el) => plotter.observe(el));

    // Close the sheet index drawer after choosing a sheet.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("[popover] a");
      link?.closest<HTMLElement>("[popover]")?.hidePopover();
    };

    root.classList.add("wired");
    layout();
    document.fonts?.ready.then(layout);
    const resize = new ResizeObserver(layout);
    if (set) resize.observe(set);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(frame);
      plotter.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}

export function SkipLoader() {
  useEffect(() => {
    const done = () => document.documentElement.classList.add("loaded");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && done();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <button
      type="button"
      className="loader-skip"
      onClick={() => document.documentElement.classList.add("loaded")}
    >
      Skip
    </button>
  );
}
