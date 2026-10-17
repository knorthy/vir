/* Chat assistant mascot: a pixel-art loaf dog in a yellow hard hat, drawn in
   the style of the reference cat (flat body, dash eyes, smooth sparkles).
   Colours come from theme tokens, so the dog re-inks with the page:
   B body = --dog; D/E/N/M ears, eyes, nose, mouth = --dog-mark;
   H/L/R hat = safety yellow (crown, brim, ridge).
   Every pose shares one 22x14 grid so poses swap in place. */
export type Pose = "sit" | "lay" | "sleep" | "sing";

const poses: Record<Pose, string[]> = {
  sit: [
    "..............HHH.....",
    ".............HHHHH....",
    "............HHHRHHH...",
    "..........LLLLLLLLLLL.",
    "..........DBBBBBBBBBD.",
    "BB.......DDBBBBBBBBBDD",
    "BB.......DDBBEBBBEBBDD",
    "BBB......DDBBEBBBEBBDD",
    "BBBB....BBDBBBNNNBBBD.",
    ".BBBB.BBBBBBBBBMBBBBBB",
    "..BBBBBBBBBBBBBBBBBBBB",
    "....BBBBBBBBBBBBBBBBBB",
    ".....BBBBBBBBBBBBBBBB.",
    "......BBBBBBBBBBBBBB..",
  ],
  // Happy ^ ^ eyes and an open mouth.
  sing: [
    "..............HHH.....",
    ".............HHHHH....",
    "............HHHRHHH...",
    "..........LLLLLLLLLLL.",
    "..........DBBBBBBBBBD.",
    "BB.......DDBBBBBBBBBDD",
    "BB.......DDBBEBBBEBBDD",
    "BBB......DDBEBEBEBEBDD",
    "BBBB....BBDBBBNNNBBBD.",
    ".BBBB.BBBBBBBBMMMBBBBB",
    "..BBBBBBBBBBBBBMBBBBBB",
    "....BBBBBBBBBBBBBBBBBB",
    ".....BBBBBBBBBBBBBBBB.",
    "......BBBBBBBBBBBBBB..",
  ],
  // Stretched out low, ears spread on the ground.
  lay: [
    "......................",
    "......................",
    "......................",
    "..............HHH.....",
    ".............HHHHH....",
    "............HHHRHHH...",
    "..........LLLLLLLLLLL.",
    "..........DBBBBBBBBBD.",
    "BB.......DDBBEBBBEBBDD",
    ".BB......DDBBEBBBEBBDD",
    "..BB.BBBDDDBBBNNNBBBDD",
    "...BBBBBBDDBBBBMBBBBDD",
    "..BBBBBBBBBBBBBBBBBBB.",
    ".BBBBBBBBBBBBBBBBBBBBB",
  ],
  // Lying down with closed eyes.
  sleep: [
    "......................",
    "......................",
    "......................",
    "..............HHH.....",
    ".............HHHHH....",
    "............HHHRHHH...",
    "..........LLLLLLLLLLL.",
    "..........DBBBBBBBBBD.",
    "BB.......DDBBBBBBBBBDD",
    ".BB......DDBEEBBBEEBDD",
    "..BB.BBBDDDBBBNNNBBBDD",
    "...BBBBBBDDBBBBMBBBBDD",
    "..BBBBBBBBBBBBBBBBBBB.",
    ".BBBBBBBBBBBBBBBBBBBBB",
  ],
};

const fills: Record<string, string> = {
  B: "var(--dog)",
  D: "var(--dog-mark)",
  E: "var(--dog-mark)",
  N: "var(--dog-mark)",
  M: "var(--dog-mark)",
  H: "var(--hi)",
  L: "#c9a520",
  R: "#fff3a6",
};

type Run = { x: number; y: number; w: number; c: string };

// Merge horizontal runs of one colour into one rect each.
const runsFor = (art: string[]) => {
  const runs: Run[] = [];
  art.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const c = row[x];
      let w = 1;
      while (row[x + w] === c) w++;
      if (c !== ".") runs.push({ x, y, w, c });
      x += w;
    }
  });
  return runs;
};

const poseRuns = Object.fromEntries(
  (Object.keys(poses) as Pose[]).map((p) => [p, runsFor(poses[p])]),
) as Record<Pose, Run[]>;

// Grid sits inside a larger frame so the sparkles have room around it.
const OX = 6;
const OY = 5;

// Smooth four-point star, like the reference sparkles.
const star = (cx: number, cy: number, r: number) =>
  `M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z`;

export function Dog({ pose = "sit", className = "dog" }: { pose?: Pose; className?: string }) {
  return (
    <svg viewBox="0 0 34 26" className={className} data-pose={pose} aria-hidden="true">
      <g className="dog-sparkles" fill="var(--dog-mark)">
        <path d={star(5.5, 6, 1.8)} className="dog-spark" />
        <circle cx="3.6" cy="8.6" r="0.8" className="dog-spark" />
        <path d={star(28.5, 2.6, 1.6)} className="dog-spark" />
        <circle cx="32" cy="5.2" r="1.1" fill="none" stroke="var(--dog-mark)" strokeWidth="0.75" className="dog-spark" />
        <path d={star(6.2, 20.4, 2.4)} className="dog-spark" />
        <path d={star(9.4, 22.2, 1.1)} className="dog-spark" />
        <circle cx="7.2" cy="24.6" r="0.7" className="dog-spark" />
        <path d={star(31.2, 21.2, 1.6)} className="dog-spark" />
        <circle cx="28" cy="24" r="1.3" fill="none" stroke="var(--dog-mark)" strokeWidth="0.8" className="dog-spark" />
      </g>
      <g transform={`translate(${OX} ${OY})`} shapeRendering="crispEdges">
        {poseRuns[pose].map((r) => (
          <rect
            key={`${r.x}-${r.y}`}
            x={r.x}
            y={r.y}
            width={r.w}
            height={1}
            fill={fills[r.c]}
            className={r.c === "E" && pose !== "sleep" && pose !== "sing" ? "dog-eye" : undefined}
          />
        ))}
      </g>
    </svg>
  );
}
