"use client";

import { useRef, useState } from "react";
import type { CircuitKind } from "@/data/portfolio";

/* Interactive schematics for the Details sheet. Every circuit runs from a
   24 V DC source; closing the contacts lights the conductors and drives the
   load (a solenoid plunger or an LED).
   - solenoid-maintained: hover/focus/tap closes S1; the solenoid pumps continuously.
   - solenoid-momentary: hover/focus/tap presses PB1; one pump, then it springs open.
   - led-startstop: START (NO) + STOP (NC) with a CR-1 latch, like a motor station.
   - led-toggle: one push-on / push-off button. */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Source() {
  return (
    <g>
      <path d="M50 60V128M50 164V230" />
      <path d="M30 128H70M40 140H60M30 152H70M40 164H60" />
      <text x="76" y="136" className="cx-label">+</text>
      <text x="76" y="150" className="cx-label">24 V DC</text>
    </g>
  );
}

function Resistor({ x }: { x: number }) {
  return <path d={`M${x} 60l5-8 10 16 10-16 10 16 10-16 10 16 5-8`} />;
}

function Led({ on }: { on: boolean }) {
  return (
    <g className="cx-led" data-on={on ? "" : undefined}>
      <circle cx="380" cy="111" r="26" className="cx-glow" />
      <path d="M368 100H392L380 122Z" className="cx-led-body" />
      <path d="M368 122H392" />
      <path d="M398 104L410 92M404 92H410V98M398 116L410 104M404 104H410V110" className="cx-rays" />
      <text x="400" y="146" className="cx-label">LED1</text>
    </g>
  );
}

function Solenoid({ mode }: { mode: "hold" | "pulse" | "" }) {
  return (
    <g>
      <path d="M330 60V80c16 0 16 16 0 16c16 0 16 16 0 16c16 0 16 16 0 16c16 0 16 16 0 16c16 0 16 16 0 16V230H50" />
      <g className="cx-plunger" data-mode={mode || undefined}>
        <rect x="346" y="104" width="16" height="64" />
        <path d="M354 168V200M340 200H368" />
      </g>
      <text x="376" y="94" className="cx-label">SOL-1</text>
    </g>
  );
}

/* A pushbutton symbol that is itself the control: click, tap, Enter, or Space. */
function SymbolButton({
  x1,
  x2,
  label,
  onPress,
  pressed,
  children,
}: {
  x1: number;
  x2: number;
  label: string;
  onPress?: () => void;
  pressed?: boolean;
  children: React.ReactNode;
}) {
  if (!onPress) return <g>{children}</g>;
  return (
    <g
      className="cx-btn"
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={pressed}
      onClick={onPress}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPress();
        }
      }}
    >
      <rect x={x1 - 14} y="8" width={x2 - x1 + 28} height="66" rx="6" className="cx-hit" />
      {children}
    </g>
  );
}

/* Normally-open pushbutton at terminals x1..x2 on the y=60 rail. */
function PushNO({
  x1,
  x2,
  pressed,
  label,
  onPress,
  ariaLabel,
  ariaPressed,
}: {
  x1: number;
  x2: number;
  pressed: boolean;
  label: string;
  onPress?: () => void;
  ariaLabel?: string;
  ariaPressed?: boolean;
}) {
  const mid = (x1 + x2) / 2;
  return (
    <SymbolButton x1={x1} x2={x2} label={ariaLabel ?? label} onPress={onPress} pressed={ariaPressed}>
      <circle cx={x1} cy="60" r="3" />
      <circle cx={x2} cy="60" r="3" />
      <g className="cx-push" data-pressed={pressed ? "" : undefined}>
        <path d={`M${x1 - 4} 48H${x2 + 4}M${mid} 48V32M${mid - 12} 32H${mid + 12}`} />
      </g>
      <text x={mid} y="20" textAnchor="middle" className="cx-label">
        {label}
      </text>
    </SymbolButton>
  );
}

export function Circuit({ kind }: { kind: CircuitKind }) {
  const [on, setOn] = useState(false); // load energized
  const [pulse, setPulse] = useState(false); // momentary solenoid stroke
  const [pressed, setPressed] = useState<"" | "start" | "stop">("");
  const pulseTimer = useRef(0);
  const pressTimer = useRef(0);

  const solenoid = kind === "solenoid-maintained" || kind === "solenoid-momentary";

  // Momentary: one stroke per approach; contacts spring open after it.
  const firePulse = () => {
    if (pulse) return;
    setPulse(true);
    window.clearTimeout(pulseTimer.current);
    pulseTimer.current = window.setTimeout(() => setPulse(false), 750);
  };

  const engage = () => (kind === "solenoid-maintained" ? setOn(true) : firePulse());
  const release = () => kind === "solenoid-maintained" && setOn(false);

  const tap = (which: "start" | "stop") => {
    setPressed(which);
    window.clearTimeout(pressTimer.current);
    pressTimer.current = window.setTimeout(() => setPressed(""), 180);
    setOn(which === "start");
  };

  const live = solenoid ? on || pulse : on;

  const status = {
    "solenoid-maintained": on ? "S1 closed: SOL-1 energized, plunger pumping." : "S1 open: SOL-1 de-energized.",
    "solenoid-momentary": pulse ? "PB1 pressed: SOL-1 single stroke." : "PB1 released: SOL-1 at rest.",
    "led-startstop": on ? "Latched by CR-1: LED1 on." : "Circuit open: LED1 off.",
    "led-toggle": on ? "PB1 latched: LED1 on." : "PB1 released: LED1 off.",
  }[kind];

  const hint = {
    "solenoid-maintained": "hover to close S1",
    "solenoid-momentary": "hover to press PB1",
    "led-startstop": "click START, then STOP",
    "led-toggle": "click PB1 to toggle LED1",
  }[kind];

  const flow = {
    "solenoid-maintained": "M50 60H150M200 60H330V80M330 160V230H50V164M50 128V60",
    "solenoid-momentary": "M50 60H150M200 60H330V80M330 160V230H50V164M50 128V60",
    "led-toggle": "M50 60H200M250 60H380V100M380 122V230H50V164M50 128V60",
    "led-startstop": "M50 60H180M220 60H240V110H265M275 110H300V60H380V100M380 122V230H50V164M50 128V60",
  }[kind];

  const hoverProps = solenoid
    ? {
        tabIndex: 0,
        onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && engage(),
        onPointerLeave: (e: React.PointerEvent) => e.pointerType === "mouse" && release(),
        onClick: () => (kind === "solenoid-maintained" ? setOn((v) => !v) : firePulse()),
        onFocus: engage,
        onBlur: release,
      }
    : {};

  return (
    <figure className="cx" data-live={live ? "" : undefined} {...hoverProps} aria-label={`Interactive circuit. ${hint}.`}>
      <svg viewBox="0 0 460 250" className="cx-svg" aria-hidden="true" {...stroke}>
        <Source />

        {kind === "solenoid-maintained" && (
          <>
            <path d="M50 60H150M200 60H330" />
            <circle cx="150" cy="60" r="3" />
            <circle cx="200" cy="60" r="3" />
            <path d="M153 60H197" className="cx-blade" data-closed={on ? "" : undefined} />
            <text x="175" y="92" textAnchor="middle" className="cx-label">S1 · MAINTAINED</text>
            <Solenoid mode={on ? "hold" : ""} />
          </>
        )}

        {kind === "solenoid-momentary" && (
          <>
            <path d="M50 60H150M200 60H330" />
            <PushNO x1={150} x2={200} pressed={pulse} label="PB1" />
            <text x="175" y="92" textAnchor="middle" className="cx-label">MOMENTARY</text>
            <Solenoid mode={pulse ? "pulse" : ""} />
          </>
        )}

        {kind === "led-toggle" && (
          <>
            <path d="M50 60H90M150 60H200M250 60H380V100M380 122V230H50" />
            <Resistor x={90} />
            <text x="120" y="40" textAnchor="middle" className="cx-label">R1</text>
            <PushNO
              x1={200}
              x2={250}
              pressed={on}
              label="PB1"
              ariaLabel="PB1: toggle LED1"
              ariaPressed={on}
              onPress={() => setOn((v) => !v)}
            />
            <text x="225" y="92" textAnchor="middle" className="cx-label">PUSH ON / PUSH OFF</text>
            <Led on={on} />
          </>
        )}

        {kind === "led-startstop" && (
          <>
            <path d="M50 60H80M140 60H180M220 60H250M290 60H380V100M380 122V230H50" />
            <Resistor x={80} />
            <text x="110" y="40" textAnchor="middle" className="cx-label">R1</text>
            {/* STOP: normally closed, the bar rests on the rail and lifts when pressed. */}
            <SymbolButton x1={180} x2={220} label="Stop: turn LED1 off" onPress={() => tap("stop")}>
              <circle cx="180" cy="60" r="3" />
              <circle cx="220" cy="60" r="3" />
              <g className="cx-push cx-push-nc" data-pressed={pressed === "stop" ? "" : undefined}>
                <path d="M176 64H224M200 64V44M188 44H212" />
              </g>
              <text x="200" y="30" textAnchor="middle" className="cx-label">STOP</text>
            </SymbolButton>
            <PushNO
              x1={250}
              x2={290}
              pressed={pressed === "start"}
              label="START"
              ariaLabel="Start: turn LED1 on"
              onPress={() => tap("start")}
            />
            {/* CR-1 latch in parallel with START. */}
            <path d="M240 60V110H262M278 110H300V60" />
            <circle cx="240" cy="60" r="2.5" fill="currentColor" />
            <circle cx="300" cy="60" r="2.5" fill="currentColor" />
            <g className="cx-latch" data-closed={on ? "" : undefined}>
              <path d="M265 100V120" className="cx-latch-a" />
              <path d="M275 100V120" className="cx-latch-b" />
            </g>
            <text x="270" y="140" textAnchor="middle" className="cx-label">CR-1 LATCH</text>
            <Led on={on} />
          </>
        )}

        <path d={flow} className="cx-flow" />
      </svg>

      <figcaption className="cx-hint">
        <span aria-hidden="true">{hint}</span>
        <span className="sr-only" aria-live="polite">
          {status}
        </span>
      </figcaption>
    </figure>
  );
}
