"use client";

import { useEffect, useRef, useState } from "react";
import { Dog, type Pose } from "./Dog";

type Move = "" | "jump" | "spin";

const pick = (list: string[]) => list[Math.floor(Math.random() * list.length)];

const lines = {
  hello: ["Hi! I'm the site pup. Click me if you get lost.", "Hard hat on. Ready to inspect!"],
  section: {
    cover: ["Back to the cover sheet!"],
    about: ["General notes: the fine print on Jasmine.", "Each legend symbol is one of her skills."],
    experience: ["Revision history! Newest rev on top.", "Rev 0 is where it all started."],
    certifications: ["Three NC IIs from TESDA. Go on, drag the notes!", "Those threads? Totally connected."],
    projects: ["Her builds! This is the good stuff.", "Sniff around the projects."],
    publications: ["Papers and research. Very scholarly. Woof.", "Footnotes! My favourite kind of notes."],
    services: ["Need one of these? She can help.", "Details, details. Engineers love details."],
    contact: ["An RFI! I'll fetch it to her.", "Ask away. She replies by email."],
  } as Record<string, string[]>,
  fast: ["Whoa, slow down! I'm getting dizzy.", "Scroll speed: high voltage!"],
  hover: ["Backflip!", "Did you see that?", "Ta-da!"],
  themeLight: ["Whiteprint mode. My fur feels lighter!"],
  themeBlue: ["Back to blueprint. Classic."],
  sleep: ["Zzz… wake me if you need anything."],
  wake: ["I'm up! I'm up!", "Huh? I was just… inspecting my eyelids."],
  sing: ["Ohm, sweet ohm, la la la…", "What a watt-erful day…", "Current-ly singing, don't mind me."],
  drag: ["Careful, those are certified!", "Rearranging the evidence board?"],
  typing: ["Typing an RFI? I'll guard it.", "Good question. She'll like that one."],
  bottom: ["That's the last sheet. Thanks for reading!", "End of set. Woof!"],
};

const IDLE_TO_SLEEP = 30000;
const POSE_TICK = 7000;

export function Assistant() {
  const [pose, setPose] = useState<Pose>("sit");
  const [move, setMove] = useState<Move>("");
  const [line, setLine] = useState("");
  const state = useRef({ pose: "sit" as Pose, lastActive: 0, lastSaid: 0, section: "", spinning: false });
  const timers = useRef<{ hush?: number }>({});

  useEffect(() => {
    const s = state.current;
    const t = timers.current;
    s.lastActive = Date.now();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const say = (text: string, force = false, ms = 4200) => {
      const now = Date.now();
      if (!force && now - s.lastSaid < 2500) return;
      s.lastSaid = now;
      setLine(text);
      window.clearTimeout(t.hush);
      t.hush = window.setTimeout(() => setLine(""), ms);
    };
    const pose = (p: Pose) => {
      s.pose = p;
      setPose(p);
    };
    const hop = () => {
      if (reduce) return;
      setMove("jump");
    };

    // Waking up on any activity; sleeping after a quiet spell.
    const active = () => {
      s.lastActive = Date.now();
      if (s.pose === "sleep") {
        pose("sit");
        hop();
        say(pick(lines.wake), true);
      }
    };

    // Idle life: change pose every few seconds, sleep when nobody is around.
    const tick = window.setInterval(() => {
      if (Date.now() - s.lastActive > IDLE_TO_SLEEP) {
        if (s.pose !== "sleep") {
          pose("sleep");
          say(pick(lines.sleep), true, 6000);
        }
        return;
      }
      const roll = Math.random();
      if (roll < 0.3) pose("sit");
      else if (roll < 0.55) pose("lay");
      else if (roll < 0.75) {
        pose("sing");
        say(pick(lines.sing));
      } else {
        pose("sit");
        hop();
      }
    }, POSE_TICK);

    // Scrolling: one spin per burst, a warning when it gets fast, bottom of page.
    let lastY = window.scrollY;
    let lastT = performance.now();
    let lastFast = 0;
    let saidBottom = false;
    const onScroll = () => {
      active();
      const now = performance.now();
      const v = Math.abs(window.scrollY - lastY) / Math.max(1, now - lastT);
      lastY = window.scrollY;
      lastT = now;
      if (!reduce && !s.spinning && s.pose !== "sleep") {
        s.spinning = true;
        if (s.pose !== "sit" && s.pose !== "sing") pose("sit");
        setMove("spin");
      }
      if (v > 4 && Date.now() - lastFast > 10000) {
        lastFast = Date.now();
        say(pick(lines.fast), true);
      }
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 8;
      if (atBottom && !saidBottom) {
        saidBottom = true;
        say(pick(lines.bottom), true);
      } else if (!atBottom) saidBottom = false;
    };

    // Section commentary as each sheet crosses the middle of the screen.
    const sections = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || e.target.id === s.section) continue;
          s.section = e.target.id;
          const options = lines.section[e.target.id];
          if (options) say(pick(options));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    document.querySelectorAll("[data-sheet]").forEach((el) => sections.observe(el));

    // Theme changes.
    const themes = new MutationObserver(() => {
      active();
      say(pick(document.documentElement.dataset.theme === "light" ? lines.themeLight : lines.themeBlue), true);
      hop();
    });
    themes.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // Typing an RFI.
    let lastTyping = 0;
    const onFocus = (e: FocusEvent) => {
      if (!(e.target as HTMLElement).closest?.(".rfi")) return;
      if (Date.now() - lastTyping < 20000) return;
      lastTyping = Date.now();
      say(pick(lines.typing), true);
    };

    // Certificate notes being dragged (dispatched by CertBoard).
    let lastDrag = 0;
    const onDrag = () => {
      active();
      if (Date.now() - lastDrag < 12000) return;
      lastDrag = Date.now();
      say(pick(lines.drag), true);
      hop();
    };

    const greet = window.setTimeout(() => say(pick(lines.hello), true, 5000), 3600);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", active, { passive: true });
    window.addEventListener("keydown", active);
    window.addEventListener("focusin", onFocus);
    window.addEventListener("cert:drag", onDrag);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(greet);
      window.clearTimeout(t.hush);
      sections.disconnect();
      themes.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", active);
      window.removeEventListener("keydown", active);
      window.removeEventListener("focusin", onFocus);
      window.removeEventListener("cert:drag", onDrag);
    };
  }, []);

  const onEnd = () => {
    state.current.spinning = false;
    setMove("");
  };

  const onHover = () => {
    const s = state.current;
    s.lastActive = Date.now();
    if (s.pose === "sleep" || s.pose === "lay") {
      s.pose = "sit";
      setPose("sit");
    }
    setLine(pick(lines.hover));
    s.lastSaid = Date.now();
    window.clearTimeout(timers.current.hush);
    timers.current.hush = window.setTimeout(() => setLine(""), 2500);
  };

  return (
    <div className="assistant">
      <button
        type="button"
        popoverTarget="assistant"
        className="chat-launcher"
        aria-label="Ask the site assistant anything"
        onPointerEnter={onHover}
      >
        <span className="dog-speech" data-talking={line ? "" : undefined} aria-hidden="true">
          {line || "Ask me anything"}
        </span>
        <span
          className="dog-body"
          data-move={move || undefined}
          onAnimationEnd={(e) => e.target === e.currentTarget && onEnd()}
        >
          <Dog pose={pose} />
          {pose === "sleep" && (
            <span className="dog-zzz" aria-hidden="true">
              <span>z</span>
              <span>z</span>
              <span>z</span>
            </span>
          )}
          {pose === "sing" && (
            <span className="dog-notes" aria-hidden="true">
              {[0, 1].map((i) => (
                <svg key={i} viewBox="0 0 12 16">
                  <path d="M4 13V2l7-1.5v10" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  <ellipse cx="2.6" cy="13" rx="2.6" ry="2" fill="currentColor" />
                  <ellipse cx="9.6" cy="11" rx="2.6" ry="2" fill="currentColor" />
                </svg>
              ))}
            </span>
          )}
        </span>
      </button>
    </div>
  );
}
