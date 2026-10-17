import type { Drawing, Symbol } from "@/data/portfolio";

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

const symbols: Record<Symbol, React.ReactNode> = {
  // duplex receptacle on a wall run
  wiring: (
    <>
      <path {...L} d="M2 34h44" />
      <circle {...L} cx="24" cy="20" r="10" />
      <path {...L} d="M24 30v4M20 15v10M28 15v10" />
    </>
  ),
  resistor: (
    <>
      <path {...L} d="M2 24h8l3-8 5 16 5-16 5 16 5-16 5 16 3-8h8" />
    </>
  ),
  chip: (
    <>
      <rect {...L} x="12" y="8" width="24" height="32" />
      <path {...L} d="M6 14h6M6 21h6M6 28h6M6 35h6M36 14h6M36 21h6M36 28h6M36 35h6" />
      <path {...L} d="M21 8a3 3 0 0 0 6 0" />
    </>
  ),
  cad: (
    <>
      <path {...L} d="M24 4v40M4 24h40" />
      <rect {...L} x="18" y="18" width="12" height="12" />
    </>
  ),
  // drafting pencil over a sketched curve
  pen: (
    <>
      <path {...L} d="M30 6l12 12-22 22H8V28z" />
      <path {...L} d="M26 10l12 12M8 40l6-6" />
      <path {...L} d="M4 46c8-4 14 2 22-2" />
    </>
  ),
};

export function LegendSymbol({ symbol }: { symbol: Symbol }) {
  return (
    <svg viewBox="0 0 48 48" className="legend-symbol" aria-hidden="true" {...svgBase} strokeWidth="1.5">
      {symbols[symbol]}
    </svg>
  );
}

const details: Record<Drawing, React.ReactNode> = {
  // Generator, step-up transformer, breaker 52 tripped by relay 50/51, bus, two loads.
  power: (
    <>
      <circle {...L} cx="56" cy="130" r="24" />
      <path {...L} d="M80 130h30" />
      <circle {...L} cx="128" cy="130" r="18" />
      <circle {...L} cx="152" cy="130" r="18" />
      <path {...L} d="M170 130h34" />
      <rect {...L} x="204" y="120" width="20" height="20" />
      <path {...L} d="M224 130h36" />
      <path {...L} d="M240 122a8 8 0 0 1 0 16" />
      <path {...L} d="M240 140v34" strokeDasharray="4 4" />
      <circle {...L} cx="240" cy="194" r="20" />
      <path {...L} d="M220 194h-6v-54" strokeDasharray="4 4" />
      <path {...L} d="M260 40v190" strokeWidth="4" />
      <path {...L} d="M260 80h120M260 180h120" />
      <path {...L} d="M372 74l12 6-12 6M372 174l12 6-12 6" />
    </>
  ),
  // Room with door swing, receptacles, troffers, home run to panel LP-1.
  plan: (
    <>
      <path {...L} d="M40 40h260v190H160M120 230H40V40" strokeWidth="4" />
      <path {...L} d="M120 230a40 40 0 0 1 40-40" />
      <path {...L} d="M160 230v-40" />
      <rect {...L} x="90" y="90" width="48" height="24" />
      <path {...L} d="M90 90l48 24M138 90l-48 24" />
      <rect {...L} x="200" y="90" width="48" height="24" />
      <path {...L} d="M200 90l48 24M248 90l-48 24" />
      <circle {...L} cx="40" cy="150" r="9" />
      <path {...L} d="M44 145v10M48 145v10" />
      <circle {...L} cx="300" cy="150" r="9" />
      <path {...L} d="M292 145v10M296 145v10" />
      <circle {...L} cx="220" cy="40" r="9" />
      <path {...L} d="M215 44h10M215 48h10" />
      <path {...L} d="M300 159q40 30 80-29" strokeDasharray="6 5" />
      <path {...L} d="M370 136l10-6 2 12" />
      <rect {...L} x="384" y="96" width="44" height="80" />
      <path {...L} d="M384 112h44" />
    </>
  ),
  // Inverting op-amp stage with feedback resistor and output filter.
  circuit: (
    <>
      <path {...L} d="M20 120h40l6-12 10 24 10-24 10 24 10-24 6 12h40" />
      <path {...L} d="M162 120v-60h40l6-12 10 24 10-24 10 24 10-24 6 12h40v80" />
      <path {...L} d="M182 90v120l100-60z" />
      <path {...L} d="M162 120h20M162 180h20" />
      <path {...L} d="M188 120h8M188 180h8M192 176v8" />
      <path {...L} d="M162 180v40M146 220h32M152 228h20M158 236h8" />
      <path {...L} d="M282 150h60" />
      <path {...L} d="M342 150v24M326 174h32M326 184h32M342 184v24M330 208h24M335 215h14M339 222h6" />
      <path {...L} d="M342 150h80" />
      <circle {...L} cx="20" cy="120" r="4" />
      <circle {...L} cx="426" cy="150" r="4" />
    </>
  ),
  // MCU with pins, I2C sensor, status LED, clock waveform.
  embedded: (
    <>
      <rect {...L} x="180" y="40" width="120" height="150" />
      <path {...L} d="M164 64h16M164 92h16M164 120h16M164 148h16M164 176h16M300 64h16M300 92h16M300 120h16M300 148h16M300 176h16" />
      <path {...L} d="M233 40a7 7 0 0 0 14 0" />
      <rect {...L} x="30" y="70" width="80" height="70" />
      <path {...L} d="M110 92h54M110 120h54" />
      <path {...L} d="M316 92h40" />
      <path {...L} d="M356 78v28l24-14z" />
      <path {...L} d="M380 78v28" />
      <path {...L} d="M372 70l10-12M384 74l10-12" />
      <path {...L} d="M380 92h40v40M408 132h24M413 140h14M418 148h4" />
      <path {...L} d="M30 250h30v-24h30v24h30v-24h30v24h30v-24h30v24h30v-24h30v24h30v-24h30v24h30" />
    </>
  ),
};

const detailLabels: Record<Drawing, [number, number, string][]> = {
  power: [[56, 135, "G"], [204, 112, "52"], [240, 199, "50/51"], [392, 84, "LOAD A"], [392, 184, "LOAD B"], [266, 32, "BUS"]],
  plan: [[170, 160, "RM 101"], [406, 92, "LP-1"], [326, 196, "HOME RUN"]],
  circuit: [[20, 106, "VIN"], [416, 136, "VOUT"], [210, 40, "RF"], [86, 104, "RIN"]],
  embedded: [[240, 120, "MCU"], [70, 110, "SENSOR"], [124, 86, "SDA"], [124, 114, "SCL"], [30, 216, "CLK"]],
};

export function DetailDrawing({ drawing }: { drawing: Drawing }) {
  return (
    <svg viewBox="0 0 460 270" className="detail-drawing plot" aria-hidden="true" {...svgBase} strokeWidth="1.5">
      {details[drawing]}
      <g className="dwg-text" stroke="none" fill="currentColor">
        {detailLabels[drawing].map(([x, y, t]) => (
          <text key={t} x={x} y={y} textAnchor={["G", "SENSOR", "MCU", "50/51"].includes(t) ? "middle" : undefined}>
            {t}
          </text>
        ))}
      </g>
    </svg>
  );
}
