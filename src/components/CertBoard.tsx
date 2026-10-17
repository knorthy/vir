"use client";

import { useEffect, useRef } from "react";
import { isPlaceholder, unbracket } from "@/data/portfolio";

type Cert = { name: string; issuer: string; year: string };

/* Certifications as sticky notes pinned to the sheet and tied together with
   redline thread. Notes drag with pointer or arrow keys; the threads follow.
   Drag offsets live in CSS custom properties, so moving a note never
   re-renders React. */
export function CertBoard({ certs }: { certs: Cert[] }) {
  const board = useRef<HTMLDivElement>(null);
  const threads = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const el = board.current;
    if (!el) return;
    const notes = Array.from(el.querySelectorAll<HTMLElement>(".sticky"));
    const offsets = notes.map(() => ({ x: 0, y: 0 }));
    let z = notes.length;
    let frame = 0;

    // Pins are the notes' top-centre points; each thread sags like real string.
    const draw = () => {
      frame = 0;
      const o = el.getBoundingClientRect();
      const pins = notes.map((n) => {
        const r = n.getBoundingClientRect();
        return { x: r.left + r.width / 2 - o.left, y: r.top + 14 - o.top };
      });
      threads.current.forEach((path, i) => {
        if (!path) return;
        const a = pins[i];
        const b = pins[(i + 1) % pins.length];
        const sag = Math.hypot(b.x - a.x, b.y - a.y) * 0.16;
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2 + sag;
        path.setAttribute("d", `M${a.x} ${a.y}Q${mx} ${my} ${b.x} ${b.y}`);
      });
    };
    const redraw = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const place = (i: number, x: number, y: number) => {
      const n = notes[i];
      const o = el.getBoundingClientRect();
      // Keep the note on the board: limits are relative to its resting spot.
      const restLeft = n.offsetLeft;
      const restTop = n.offsetTop;
      const cx = Math.min(Math.max(x, -restLeft), o.width - restLeft - n.offsetWidth);
      const cy = Math.min(Math.max(y, -restTop), o.height - restTop - n.offsetHeight);
      offsets[i] = { x: cx, y: cy };
      n.style.setProperty("--dx", `${cx}px`);
      n.style.setProperty("--dy", `${cy}px`);
      redraw();
    };

    const cleanups = notes.map((n, i) => {
      let start: { px: number; py: number; x: number; y: number } | null = null;

      const down = (e: PointerEvent) => {
        if (e.button !== 0) return;
        n.setPointerCapture(e.pointerId);
        start = { px: e.clientX, py: e.clientY, ...offsets[i] };
        n.style.zIndex = String(++z);
        n.dataset.dragging = "";
        window.dispatchEvent(new Event("cert:drag"));
      };
      const moveTo = (e: PointerEvent) => {
        if (!start) return;
        place(i, start.x + e.clientX - start.px, start.y + e.clientY - start.py);
      };
      const up = () => {
        start = null;
        delete n.dataset.dragging;
      };
      const key = (e: KeyboardEvent) => {
        const step = e.shiftKey ? 48 : 16;
        const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
        if (!d) return;
        e.preventDefault();
        n.style.zIndex = String(++z);
        place(i, offsets[i].x + d[0], offsets[i].y + d[1]);
        window.dispatchEvent(new Event("cert:drag"));
      };

      n.addEventListener("pointerdown", down);
      n.addEventListener("pointermove", moveTo);
      n.addEventListener("pointerup", up);
      n.addEventListener("pointercancel", up);
      n.addEventListener("keydown", key);
      return () => {
        n.removeEventListener("pointerdown", down);
        n.removeEventListener("pointermove", moveTo);
        n.removeEventListener("pointerup", up);
        n.removeEventListener("pointercancel", up);
        n.removeEventListener("keydown", key);
      };
    });

    // Pin the notes when the board scrolls into view; the threads follow the
    // notes every frame while they land, then draw themselves in (CSS).
    let follow = 0;
    const reveal = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.pinned = "";
        reveal.disconnect();
        const until = performance.now() + 2000;
        const tick = () => {
          draw();
          if (performance.now() < until) follow = requestAnimationFrame(tick);
        };
        follow = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    reveal.observe(el);

    const resize = new ResizeObserver(redraw);
    resize.observe(el);
    draw();

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(follow);
      cleanups.forEach((c) => c());
      reveal.disconnect();
      resize.disconnect();
    };
  }, []);

  return (
    <div className="cert-board" ref={board}>
      <svg className="threads" aria-hidden="true">
        {certs.map((c, i) => (
          <path key={c.name} ref={(p) => { threads.current[i] = p; }} pathLength={1} />
        ))}
      </svg>
      {certs.map((c, i) => {
        const title = c.name.replace(/ NC II$/, "");
        return (
          <article
            key={c.name}
            className="sticky"
            style={{ "--i": i } as React.CSSProperties}
            tabIndex={0}
            aria-label={`${c.name}, ${c.issuer}. Drag, or use arrow keys, to move this note.`}
          >
            <span className="sticky-pin" aria-hidden="true" />
            <p className="sticky-level">NC II</p>
            <h3 className="sticky-title">{title}</h3>
            <p className="sticky-issuer">
              {c.issuer} · <span className="nowrap">National Certificate II</span>
            </p>
            <p className="sticky-year">
              {isPlaceholder(c.year) ? <span className="tbd">{unbracket(c.year)}</span> : c.year}
            </p>
          </article>
        );
      })}
      <p className="board-hint" aria-hidden="true">
        drag the notes around
      </p>
    </div>
  );
}
