import { profile, projects, skills } from "@/data/portfolio";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-foreground/10 bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <a href="#" className="font-semibold">
            {profile.name}
          </a>
          <ul className="flex gap-6 text-sm text-foreground/70">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-foreground">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-6">
        <section className="py-24 sm:py-32">
          <p className="font-mono text-sm text-foreground/60">{profile.role}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">
            Hi, I&apos;m {profile.name}.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/70">
            {profile.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-medium hover:bg-foreground/5"
            >
              Get in touch
            </a>
          </div>
        </section>

        <section id="about" className="scroll-mt-20 py-16">
          <h2 className="text-2xl font-semibold">About</h2>
          <p className="mt-4 max-w-2xl text-foreground/70">{profile.about}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-foreground/15 px-3 py-1 font-mono text-xs"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section id="projects" className="scroll-mt-20 py-16">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="flex flex-col rounded-2xl border border-foreground/10 p-6 transition hover:border-foreground/30"
              >
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm text-foreground/70">
                  {project.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded bg-foreground/5 px-2 py-0.5 font-mono text-xs"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex gap-4 text-sm font-medium">
                  {project.href && (
                    <a href={project.href} className="underline-offset-4 hover:underline">
                      Live ↗
                    </a>
                  )}
                  {project.repo && (
                    <a href={project.repo} className="underline-offset-4 hover:underline">
                      Code ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 py-16">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="mt-4 max-w-2xl text-foreground/70">
            I&apos;m open to new opportunities and collaborations. The best way to
            reach me is by email.
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm font-medium">
            <a href={`mailto:${profile.email}`} className="underline-offset-4 hover:underline">
              {profile.email}
            </a>
            <a href={profile.links.github} className="underline-offset-4 hover:underline">
              GitHub ↗
            </a>
            <a href={profile.links.linkedin} className="underline-offset-4 hover:underline">
              LinkedIn ↗
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-foreground/10 py-8 text-center text-sm text-foreground/50">
        © {profile.name}
      </footer>
    </>
  );
}
