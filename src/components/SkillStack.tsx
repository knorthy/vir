"use client";

import { useEffect, useRef, useState } from "react";
import type { skills as SkillList } from "@/data/portfolio";

type Group = (typeof SkillList)[number];

/* Skills as an exploded isometric stack, after the reference chip drawing:
   one plate per skill group, labels alternating left and right at each
   plate's height. The stack separates when it scrolls into view. Hovering a
   label or a plate lifts the plate and draws a leader line between them. */
const W = 150; // half-width of a plate's top face
const H = 75; // half-height (2:1 isometric)
const T = 10; // plate thickness
const GAP = 104;
const CX = 200;
const TOP = 92;
const VIEW_H = TOP + 4 * GAP + H + T + 20;

const ns = { vectorEffect: "non-scaling-stroke" } as const;

// Etched detail per plate, drawn on a flat 100x100 square (-50..50) that is
// projected onto the plate's top face.
const etchings: React.ReactNode[] = [
  // Electrical systems & installation: a panelboard of breakers on a bus.
  <>
    <rect x="-42" y="-42" width="84" height="84" {...ns} />
    <path d="M0 -38V38" {...ns} strokeWidth="2" />
    {[0, 1, 2, 3, 4].map((r) => (
      <g key={r}>
        <rect x="-34" y={-34 + r * 14} width="26" height="8" {...ns} />
        <rect x="8" y={-34 + r * 14} width="26" height="8" {...ns} />
      </g>
    ))}
  </>,
  // Circuit design & analysis: traces with vias.
  <>
    <rect x="-42" y="-42" width="84" height="84" {...ns} />
    <path d="M-38 -24H-10L4 -10H38M-38 0H-20L-6 14H22L36 28M-38 22H-28L-14 36M-24 -38V-30L-12 -18M20 -38V-22L30 -12" {...ns} />
    {[[-10, -24], [4, -10], [-20, 0], [22, 14], [-28, 22], [-12, -18], [30, -12]].map(([x, y]) => (
      <circle key={`${x}${y}`} cx={x} cy={y} r="2.4" {...ns} />
    ))}
  </>,
  // Programming & engineering tools: a microcontroller die.
  <>
    <rect x="-42" y="-42" width="84" height="84" {...ns} />
    <rect x="-20" y="-20" width="40" height="40" {...ns} />
    <path
      d="M-14 -20V-27M-7 -20V-27M0 -20V-27M7 -20V-27M14 -20V-27M-14 20V27M-7 20V27M0 20V27M7 20V27M14 20V27M-20 -14H-27M-20 -7H-27M-20 0H-27M-20 7H-27M-20 14H-27M20 -14H27M20 -7H27M20 0H27M20 7H27M20 14H27"
      {...ns}
    />
    <text x="0" y="2" textAnchor="middle" className="stack-chip-text">
      ARDUINO
    </text>
  </>,
  // Illustration & design: a drafting grid with a compass circle and set square.
  <>
    <rect x="-42" y="-42" width="84" height="84" {...ns} />
    {Array.from({ length: 7 }, (_, i) => -36 + i * 12).flatMap((x) =>
      Array.from({ length: 7 }, (_, j) => -36 + j * 12).map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r="0.9" className="stack-dot" />),
    )}
    <circle cx="-12" cy="-8" r="18" {...ns} />
    <path d="M6 30L34 30L34 2Z" {...ns} />
  </>,
  // Creative digital: a sketch curve on a base with edge contacts.
  <>
    <rect x="-42" y="-42" width="84" height="84" {...ns} />
    <path d="M-34 20C-24 -18 -6 30 6 -6S28 -30 34 -20" {...ns} />
    <path
      d="M-36 -50V-46M-24 -50V-46M-12 -50V-46M0 -50V-46M12 -50V-46M24 -50V-46M36 -50V-46M50 -36H46M50 -24H46M50 -12H46M50 0H46M50 12H46M50 24H46M50 36H46"
      {...ns}
    />
  </>,
];

function Plate({ i }: { i: number }) {
  const cy = TOP + i * GAP;
  const top = `${CX},${cy - H} ${CX + W},${cy} ${CX},${cy + H} ${CX - W},${cy}`;
  const left = `${CX - W},${cy} ${CX},${cy + H} ${CX},${cy + H + T} ${CX - W},${cy + T}`;
  const right = `${CX + W},${cy} ${CX},${cy + H} ${CX},${cy + H + T} ${CX + W},${cy + T}`;
  return (
    <>
      <polygon points={left} className="stack-side" />
      <polygon points={right} className="stack-side stack-side-r" />
      <polygon points={top} className="stack-top" />
      <g transform={`matrix(${W / 100} ${H / 100} ${-W / 100} ${H / 100} ${CX} ${cy})`} className="stack-etch">
        {etchings[i % etchings.length]}
      </g>
    </>
  );
}

export function SkillStack({ groups }: { groups: Group[] }) {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const leaders = useRef<(SVGPathElement | null)[]>([]);
  const dots = useRef<(SVGCircleElement | null)[]>([]);
  const [hover, setHover] = useState<number | null>(null);

  // Leader lines run from each label's inner edge to its plate's outer corner.
  useEffect(() => {
    const el = root.current;
    const art = svg.current;
    if (!el || !art) return;
    const draw = () => {
      const o = el.getBoundingClientRect();
      const a = art.getBoundingClientRect();
      const k = a.width / 400;
      el.querySelectorAll<HTMLElement>(".stack-label").forEach((label, i) => {
        const path = leaders.current[i];
        const dot = dots.current[i];
        if (!path || !dot) return;
        const left = label.dataset.side === "left";
        const r = label.getBoundingClientRect();
        // Plate's outer corner (left or right vertex of its top face).
        const px = a.left - o.left + (CX + (left ? -W : W)) * k;
        const py = a.top - o.top + (TOP + i * GAP) * k;
        const lx = (left ? r.right + 12 : r.left - 12) - o.left;
        const ly = r.top - o.top + 11;
        const elbow = left ? Math.min(lx + 28, px - 10) : Math.max(lx - 28, px + 10);
        path.setAttribute("d", `M${lx} ${ly}H${elbow}L${px} ${py}`);
        dot.setAttribute("cx", String(px));
        dot.setAttribute("cy", String(py));
      });
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.open = "";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const mid = (groups.length - 1) / 2;

  return (
    <div className="stack" ref={root} data-hover={hover ?? undefined}>
      <svg className="stack-leaders" aria-hidden="true">
        {groups.map((g, i) => (
          <g key={g.name} data-on={hover === i ? "" : undefined}>
            <path ref={(p) => { leaders.current[i] = p; }} pathLength={1} />
            <circle ref={(c) => { dots.current[i] = c; }} r="3.5" />
          </g>
        ))}
      </svg>

      <svg ref={svg} viewBox={`0 0 400 ${VIEW_H}`} className="stack-svg" aria-hidden="true">
        {/* Bottom plate first so upper plates overlap it. */}
        {groups
          .map((g, i) => (
            <g
              key={g.name}
              className="stack-layer"
              data-on={hover === i ? "" : undefined}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              style={{ "--collapse": `${(mid - i) * (GAP - 18)}px`, "--i": i } as React.CSSProperties}
            >
              <Plate i={i} />
            </g>
          ))
          .reverse()}
      </svg>

      <ol className="stack-labels">
        {groups.map((g, i) => (
          <li
            key={g.name}
            className="stack-label"
            data-side={i % 2 === 0 ? "left" : "right"}
            data-on={hover === i ? "" : undefined}
            style={{ "--y": `${((TOP + i * GAP) / VIEW_H) * 100}%` } as React.CSSProperties}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            tabIndex={0}
          >
            <span className="stack-name">{g.name}</span>
            {g.note && <span className="stack-qualifier"> ({g.note.toLowerCase()})</span>}
            <span className="stack-items"> - {g.items.join(", ")}.</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
