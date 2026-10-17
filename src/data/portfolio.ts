// All site content lives here.
// Text wrapped in [square brackets] is a placeholder: the site draws it with a
// red wavy underline until you replace it with real content.
// An empty string for a link means "not set yet".

export const profile = {
  name: "Jasmine Vir",
  initials: "J. VIR",
  role: "Electrical Engineer",
  tagline:
    "[One sentence on the kind of electrical engineering Jasmine does and who she does it for.]",
  location: "[City, Country]",
  email: "[jasmine@example.com]",
  phone: "[+00 000 000 0000]",
  resume: "", // e.g. "/jasmine-vir-resume.pdf" placed in /public
  links: [
    { label: "LinkedIn", href: "" },
    { label: "GitHub", href: "" },
  ],
};

// About section, written as numbered "general notes".
export const notes = [
  "[Who Jasmine is: her discipline, how long she has been in the field, and where she is based.]",
  "[What she has worked on: the kinds of systems, their scale, and the industries she has served.]",
  "[How she works: her approach to design, safety, documentation, and working with a team.]",
  "[What she is looking for next: the roles, projects, or clients she wants to hear from.]",
];

export type Symbol = "wiring" | "resistor" | "chip" | "cad" | "pen";

// Skills, drawn as the drawing set's symbol legend: one row per group.
export const skills: { symbol: Symbol; name: string; items: string[]; note?: string }[] = [
  {
    symbol: "wiring",
    name: "Electrical systems & installation",
    items: ["Building wiring", "FDAS (Fire Detection and Alarm System)", "Basic electrical troubleshooting", "Electrical safety compliance"],
  },
  {
    symbol: "resistor",
    name: "Circuit design & analysis",
    items: ["Circuit design (AC/DC)", "Electrical system layouts", "Load calculations and sizing", "Interpretation of electrical diagrams"],
  },
  {
    symbol: "chip",
    name: "Programming & engineering tools",
    note: "Foundational",
    items: ["Python", "C++", "R Studio", "MATLAB", "Embedded systems (Arduino)", "Microsoft Office (Word, Excel, PowerPoint)", "AutoCAD"],
  },
  {
    symbol: "cad",
    name: "Illustration & design",
    items: ["Technical drawing", "Engineering diagrams", "Freehand and digital illustration"],
  },
  {
    symbol: "pen",
    name: "Creative digital",
    items: ["Digital drawing", "Visual concept sketching", "Diagrams for presentations and technical reports"],
  },
];

// Experience, written as a revision history. Newest first; rev 0 is education.
export const revisions = [
  {
    rev: 3,
    period: "[Year] – Present",
    role: "BS Electrical Engineering (student)",
    org: "Polytechnic University of the Philippines",
    location: "Sta. Mesa, Manila",
    points: ["[Expected graduation year, focus area, or organizations.]"],
  },
  {
    rev: 2,
    period: "Mar – Jun 2026",
    role: "Quality Assurance & Preventive Maintenance Intern",
    org: "Polytechnic University of the Philippines (PUP)",
    location: "[City]",
    points: [
      "[What she did: inspections, maintenance schedules, reports…]",
      "[A result or system she worked on.]",
    ],
  },
  {
    rev: 1,
    period: "Jul – Sep 2025",
    role: "Assistant Project Coordinator Intern",
    org: "Valiant Advanced Systems and Devices Corporation",
    location: "[City]",
    points: [
      "[What she did: scheduling, site coordination, documentation…]",
      "[A project she supported.]",
    ],
  },
  {
    rev: 0,
    period: "[Year – Year]",
    role: "Diploma in Electrical Engineering Technology",
    org: "Polytechnic University of the Philippines",
    location: "Sta. Mesa, Manila",
    points: ["[Capstone, honors, or focus area.]"],
  },
];

export const certifications = [
  { name: "Technical Drafting NC II", issuer: "TESDA", year: "[Year]" },
  { name: "Electrical Installation and Maintenance NC II", issuer: "TESDA", year: "[Year]" },
  { name: "Mechatronics Servicing NC II", issuer: "TESDA", year: "[Year]" },
];

export type Drawing = "power" | "plan" | "circuit" | "embedded";

export const services: {
  title: string;
  drawing: Drawing;
  summary: string;
  deliverables: string[];
}[] = [
  {
    title: "Power system design",
    drawing: "power",
    summary: "[What this service covers and the kind of client it is for.]",
    deliverables: ["[One-line diagrams]", "[Load flow / short-circuit studies]", "[Protection coordination]"],
  },
  {
    title: "Electrical design & AutoCAD drafting",
    drawing: "plan",
    summary: "[What this service covers and the kind of client it is for.]",
    deliverables: ["[Power and lighting plans]", "[Panel schedules]", "[Construction drawing sets]"],
  },
  {
    title: "Electronics & circuit design",
    drawing: "circuit",
    summary: "[What this service covers and the kind of client it is for.]",
    deliverables: ["[Schematic capture]", "[PCB layout]", "[Prototype testing]"],
  },
  {
    title: "Embedded systems",
    drawing: "embedded",
    summary: "[What this service covers and the kind of client it is for.]",
    deliverables: ["[Firmware in C/C++]", "[Sensor and peripheral integration]", "[Bring-up and debugging]"],
  },
];

// Builds and research. Replace the placeholders; the first entry is featured.
// image: a path under /public (e.g. "/projects/fdas-panel.jpg"), or "" for the drafted placeholder.
export const projects: {
  title: string;
  kind: "Build" | "Research";
  year: string;
  role: string;
  summary: string;
  tags: string[];
  image: string;
  link: string;
}[] = [
  {
    title: "[Featured build, e.g. an FDAS trainer panel or a building wiring mock-up]",
    kind: "Build",
    year: "[Year]",
    role: "[Her role: designer, lead, team member…]",
    summary: "[Two or three sentences: the problem, what she built, and how it performed.]",
    tags: ["[FDAS]", "[AutoCAD]", "[Building wiring]"],
    image: "",
    link: "",
  },
  {
    title: "[Research project or thesis title]",
    kind: "Research",
    year: "[Year]",
    role: "[Her role]",
    summary: "[What was studied, the method, and the finding.]",
    tags: ["[MATLAB]", "[Quality engineering]"],
    image: "",
    link: "",
  },
  {
    title: "[Embedded or electronics build]",
    kind: "Build",
    year: "[Year]",
    role: "[Her role]",
    summary: "[What it does and what she was responsible for.]",
    tags: ["[Embedded systems]"],
    image: "",
    link: "",
  },
];

// Papers, posters, and conference presentations, newest first.
export const publications: {
  authors: string;
  title: string;
  venue: string;
  year: string;
  link: string;
}[] = [
  {
    authors: "[Vir, J., & co-authors]",
    title: "[Paper or thesis title]",
    venue: "[Journal, conference, or university repository]",
    year: "[Year]",
    link: "",
  },
  {
    authors: "[Vir, J.]",
    title: "[Poster, presentation, or technical report title]",
    venue: "[Event or publisher]",
    year: "[Year]",
    link: "",
  },
];

export const sheets = [
  { id: "cover", number: "E-000", title: "Cover", short: "COVER" },
  { id: "about", number: "E-100", title: "General notes", short: "ABOUT" },
  { id: "experience", number: "E-200", title: "Revision history", short: "HISTORY" },
  { id: "certifications", number: "E-210", title: "Certifications", short: "CERTS" },
  { id: "projects", number: "E-300", title: "Projects", short: "PROJECTS" },
  { id: "publications", number: "E-310", title: "Publications", short: "PAPERS" },
  { id: "services", number: "E-400", title: "Details", short: "SERVICES" },
  { id: "contact", number: "E-500", title: "Request for information", short: "CONTACT" },
] as const;

export type SheetId = (typeof sheets)[number]["id"];

export const isPlaceholder = (value: string) => /^\[[\s\S]*\]$/.test(value.trim());
export const unbracket = (value: string) => value.trim().replace(/^\[|\]$/g, "");
