// Edit this file to update the content of the site.

export const profile = {
  name: "Tiffany Lyssa",
  role: "Software Engineer",
  tagline: "I build thoughtful, reliable software for the web.",
  about:
    "Write a short paragraph about yourself here: what you work on, what you care about, and what you're looking for next.",
  email: "you@example.com",
  links: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
};

export const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "Git",
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    title: "Project One",
    description: "A short description of what this project does and why it matters.",
    tags: ["Next.js", "TypeScript"],
    href: "#",
    repo: "#",
  },
  {
    title: "Project Two",
    description: "A short description of what this project does and why it matters.",
    tags: ["React", "Node.js"],
    repo: "#",
  },
  {
    title: "Project Three",
    description: "A short description of what this project does and why it matters.",
    tags: ["Tailwind CSS"],
    href: "#",
  },
];
