// Every stroked element carries pathLength=1 so CSS can "plot" it with
// stroke-dasharray/offset regardless of its real length.
const L = { pathLength: 1 } as const;

const svgBase = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/* Cover sheet: utility -> meter -> transformer -> main -> switchboard, with
   one feeder per section. Feeders are the section links. */
export function OneLine({ feeders }: { feeders: { id: string; number: string; title: string }[] }) {
  // Feeders spread evenly along SWBD-1; labels run vertically, as on a real one-line.
  const step = 290 / Math.max(1, feeders.length - 1);
  const xs = feeders.map((_, i) => Math.round(42 + i * step));
  return (
    <svg viewBox="0 0 364 500" className="oneline plot" aria-labelledby="oneline-title" role="group" {...svgBase}>
      <title id="oneline-title">One-line diagram of this portfolio. Each feeder links to a section.</title>
      <g strokeWidth="1.5">
        <circle {...L} cx="182" cy="30" r="18" />
        <path {...L} d="M170 30q6-9 12 0t12 0" />
        <path {...L} d="M182 48v26" />
        <circle {...L} cx="182" cy="88" r="14" />
        <path {...L} d="M182 102v22" />
        <circle {...L} cx="182" cy="144" r="20" />
        <circle {...L} cx="182" cy="172" r="20" />
        <path {...L} d="M175 151l7-11 7 11z" />
        <path {...L} d="M182 176v8M182 176l-7-5M182 176l7-5" />
        <path {...L} d="M182 192v24" />
        <circle {...L} cx="182" cy="219" r="3" />
        <path {...L} d="M182 252l0-30" />
        <circle {...L} cx="182" cy="255" r="3" />
        <path {...L} d="M182 258v20" />
        <path {...L} d="M4 280h332" strokeWidth="4" />
        <circle cx="8" cy="280" r="0.5" stroke="none" data-swbd-tap />
      </g>
      <g className="dwg-text">
        <text x="210" y="34">UTILITY</text>
        <text x="182" y="92" textAnchor="middle">M</text>
        <text x="210" y="162">T-1</text>
        <text x="196" y="242">MAIN</text>
        <text x="28" y="270">SWBD-1</text>
      </g>
      {feeders.map((f, i) => {
        const x = xs[i];
        return (
          <a key={f.id} href={`#${f.id}`} className="feeder" data-feeder={f.id}>
            <rect x={x - step / 2} y="282" width={step} height="216" fill="transparent" stroke="none" />
            <g strokeWidth="1.5">
              <path {...L} d={`M${x} 282v22`} className="feeder-line" />
              <circle {...L} cx={x} cy="307" r="3" />
              <path {...L} d={`M${x} 340l0-30`} className="blade" style={{ transformOrigin: `${x}px 343px` }} />
              <circle {...L} cx={x} cy="343" r="3" />
              <path {...L} d={`M${x} 346v34`} className="feeder-line" />
              <path {...L} d={`M${x - 5} 374l5 8 5-8`} />
            </g>
            <text transform={`translate(${x} 392) rotate(90)`} dominantBaseline="central" className="feeder-text">
              <tspan className="dwg-text feeder-num">{f.number}</tspan>
              <tspan dx="7" className="dwg-label">{f.title}</tspan>
            </text>
          </a>
        );
      })}
    </svg>
  );
}

/* Horizontal breaker used on every section's feeder. */
export function Breaker() {
  return (
    <svg viewBox="0 0 120 24" className="breaker" aria-hidden="true" {...svgBase} strokeWidth="1.5">
      <path d="M0 12h50" className="feeder-line" />
      <circle cx="53" cy="12" r="3" />
      <path d="M56 12h26" className="blade" style={{ transformOrigin: "53px 12px" }} />
      <circle cx="85" cy="12" r="3" />
      <path d="M88 12h32" className="feeder-line" />
    </svg>
  );
}

export function Ground() {
  return (
    <svg viewBox="0 0 40 40" className="ground" aria-hidden="true" {...svgBase} strokeWidth="1.5">
      <path d="M20 0v18M6 18h28M11 25h18M16 32h8" />
    </svg>
  );
}

export function Delta({ n }: { n: number }) {
  return (
    <svg viewBox="0 0 44 40" className="delta" aria-hidden="true" {...svgBase} strokeWidth="1.5">
      <path {...L} d="M22 3l19 34H3z" />
      <text x="22" y="31" textAnchor="middle" className="delta-num" stroke="none" fill="currentColor">
        {n}
      </text>
    </svg>
  );
}

/* Personal mark: J and V routed as PCB traces ending in hollow pads (vias). */
export function Logo() {
  return (
    <svg viewBox="0 0 48 48" className="logo" aria-hidden="true" {...svgBase} strokeWidth="2.25">
      <rect x="1.5" y="1.5" width="45" height="45" strokeWidth="1.25" />
      <path d="M17 11v18a8 8 0 0 1-8 8" />
      <path d="M26 11l7.5 25L41 11" />
      <circle cx="17" cy="11" r="3" className="pad" />
      <circle cx="9" cy="37" r="3" className="pad" />
      <circle cx="26" cy="11" r="3" className="pad" />
      <circle cx="41" cy="11" r="3" className="pad" />
      <circle cx="33.5" cy="36" r="2.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* Sheet index: a stack of drawing sheets with a title-block corner. */
export function IndexIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true" {...svgBase} strokeWidth="1.5">
      <path d="M7 3h13v15" />
      <rect x="4" y="6" width="13" height="15" />
      <path d="M11 21v-4h6M7 10h7M7 13h5" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true" {...svgBase} strokeWidth="1.5">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function Arrow({ dir = "right" }: { dir?: "right" | "down" }) {
  return (
    <svg viewBox="0 0 16 16" className="arrow" aria-hidden="true" {...svgBase} strokeWidth="1.5">
      {dir === "right" ? <path d="M2 8h11M9 4l4 4-4 4" /> : <path d="M8 2v11M4 9l4 4 4-4" />}
    </svg>
  );
}
