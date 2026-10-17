import {
  notes,
  profile,
  revisions,
  certifications,
  projects,
  publications,
  services,
  sheets,
  skills,
  unbracket,
  type SheetId,
} from "@/data/portfolio";
import {
  Arrow,
  Breaker,
  CloseIcon,
  Delta,
  DetailDrawing,
  Ground,
  IndexIcon,
  Logo,
  OneLine,
} from "@/components/drawings";
import { Assistant } from "@/components/Assistant";
import { CertBoard } from "@/components/CertBoard";
import { ChatPanel } from "@/components/ChatPanel";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { ProjectDesk } from "@/components/ProjectDesk";
import { RfiForm } from "@/components/RfiForm";
import { SkillStack } from "@/components/SkillStack";
import { T } from "@/components/T";
import { SkipLoader, Wiring } from "@/components/Wiring";

const sectionSheets = sheets.filter((s) => s.id !== "cover");
const sheetCount = sheets.length;

function SheetHeader({ id }: { id: SheetId }) {
  const index = sheets.findIndex((s) => s.id === id);
  const sheet = sheets[index];
  const title = sheet.title;
  return (
    <header className="sheet-header">
      <Breaker />
      <span className="bubble" aria-hidden="true">
        <span>{index}</span>
        <span>{sheet.number}</span>
      </span>
      <div>
        <h2 className="sheet-title">{title}</h2>
        <p className="sheet-meta">
          <span>Sheet {sheet.number}</span> · <span>{index + 1} of {sheetCount}</span> · <span>Scale: NTS</span>
        </p>
      </div>
    </header>
  );
}

function Loader() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader-sheet">
        <svg viewBox="0 0 300 120" className="loader-dwg" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path pathLength={1} d="M4 60h56" />
          <circle pathLength={1} cx="78" cy="60" r="18" />
          <circle pathLength={1} cx="104" cy="60" r="18" />
          <path pathLength={1} d="M122 60h40" />
          <circle pathLength={1} cx="165" cy="60" r="3" />
          <path pathLength={1} d="M168 60l26-14" />
          <circle pathLength={1} cx="200" cy="60" r="3" />
          <path pathLength={1} d="M203 60h40M243 20v80" />
          <path pathLength={1} d="M243 40h48M243 80h48" />
        </svg>
        <p className="loader-name">{profile.name}</p>
        <p className="loader-set">Electrical drawing set · {sheets[0].number} to {sheets[sheets.length - 1].number}</p>
        <div className="loader-progress">
          <span />
        </div>
        <p className="loader-status">Plotting sheet E-000</p>
      </div>
      <SkipLoader />
    </div>
  );
}

function SheetIndexLinks() {
  return (
    <ol className="index-list">
      {sheets.map((s) => (
        <li key={s.id}>
          <a href={`#${s.id}`} data-index-link data-label={`${s.number} ${s.title}`}>
            <span className="index-num">{s.number}</span>
            <span>{s.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

const hasPlaceholders = JSON.stringify({ profile, notes, skills, revisions, certifications, projects, publications, services }).includes('"[');

export default function Home() {
  return (
    <>
      <Loader />

      <div className="sheet-frame" aria-hidden="true">
        <div className="zones zones-top">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <span key={n}>{n}</span>)}
        </div>
        <div className="zones zones-bottom">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <span key={n}>{n}</span>)}
        </div>
        <div className="zones zones-left">
          {["A", "B", "C", "D", "E", "F"].map((n) => <span key={n}>{n}</span>)}
        </div>
        <div className="zones zones-right">
          {["A", "B", "C", "D", "E", "F"].map((n) => <span key={n}>{n}</span>)}
        </div>
      </div>

      <a href="#cover" className="logo-link" aria-label={`${profile.name}, back to top`}>
        <Logo />
      </a>

      <div className="controls">
        <ThemeSwitch />
        <button type="button" popoverTarget="sheet-index" className="index-toggle" aria-label="Open sheet index">
          <IndexIcon />
          <span className="index-toggle-label">Index</span>
        </button>
      </div>

      <div id="sheet-index" popover="auto" className="drawer" aria-label="Sheet index">
        <div className="drawer-head">
          <div>
            <a href="#cover" className="index-name">
              {profile.name}
            </a>
            <p className="index-role">{profile.role}</p>
          </div>
          <button type="button" popoverTarget="sheet-index" popoverTargetAction="hide" className="drawer-close" aria-label="Close sheet index">
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Sections">
          <p className="index-label">Sheet index</p>
          <SheetIndexLinks />
        </nav>
        <div className="index-foot">
          <a href="#contact" className="btn btn-primary btn-block">
            Issue an RFI <Arrow />
          </a>
          <dl className="mini-block">
            <div>
              <dt>Drawn</dt>
              <dd>{profile.initials}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Issued for review</dd>
            </div>
          </dl>
        </div>
      </div>

      <Assistant />
      <div id="assistant" popover="auto" className="chat-panel" aria-label="Site assistant">
        <ChatPanel />
      </div>

      <main className="drawing-set">
        <svg className="feed" aria-hidden="true" fill="none">
          <path data-feed />
        </svg>
        {/* E-000 COVER */}
        <section id="cover" data-sheet className="cover">
          <div className="cover-name">
            <h1 className="name">
              <span className="dimension" aria-hidden="true">
                <span data-name-width>NTS</span>
              </span>
              {profile.name}
            </h1>
            <p className="role">{profile.role}</p>
            <p className="tagline">
              <T>{profile.tagline}</T>
            </p>
            <div className="actions">
              <a href="#contact" className="btn btn-primary">
                Issue an RFI <Arrow />
              </a>
              <a href="#about" className="btn btn-ghost">
                Read the set <Arrow dir="down" />
              </a>
            </div>
          </div>

          <div className="cover-diagram">
            <OneLine feeders={sectionSheets.map((s) => ({ id: s.id, number: s.number, title: s.short }))} />
          </div>

          <dl className="title-block">
            <div className="tb-wide">
              <dt>Project</dt>
              <dd>Portfolio of {profile.name}</dd>
            </div>
            <div>
              <dt>Drawn by</dt>
              <dd>{profile.initials}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>
                <T>{profile.location}</T>
              </dd>
            </div>
            <div>
              <dt>Scale</dt>
              <dd>NTS</dd>
            </div>
            <div>
              <dt>Sheet</dt>
              <dd>E-000</dd>
            </div>
            {hasPlaceholders && <p className="redline-note">Redlined items are TBD</p>}
          </dl>
        </section>

        <div className="circuit" data-circuit>
          <div className="bus" aria-hidden="true">
            <div className="bus-live" />
          </div>
          <p className="fed-from" aria-hidden="true">
            Fed from SWBD-1 · E-000
          </p>

          {/* E-100 ABOUT */}
          <section id="about" data-sheet className="sheet">
            <SheetHeader id="about" />
            <div className="about-grid">
              <ol className="notes">
                {notes.map((n, i) => (
                  <li key={i}>
                    <T>{n}</T>
                  </li>
                ))}
              </ol>
              <figure className="portrait" data-plot>
                <svg viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 0L100 125M100 0L0 125" vectorEffect="non-scaling-stroke" strokeDasharray="none" />
                </svg>
                <figcaption>
                  <span className="tbd">Portrait</span>
                  <span>Opening for photo · 1:1</span>
                </figcaption>
              </figure>
            </div>

            <div className="legend" data-plot>
              <h3 className="legend-title">Legend: skills</h3>
              <SkillStack groups={skills} />
            </div>
          </section>

          {/* E-200 EXPERIENCE */}
          <section id="experience" data-sheet className="sheet">
            <SheetHeader id="experience" />
            <div className="rev-table" role="table" aria-label="Experience, newest first">
              <div className="rev-row rev-head" role="row">
                <span role="columnheader">Rev</span>
                <span role="columnheader">Date</span>
                <span role="columnheader">Description</span>
                <span role="columnheader">Notes</span>
              </div>
              {revisions.map((r) => (
                <div key={r.rev} className="rev-row" role="row" data-plot>
                  <span role="cell" className="rev-delta">
                    <Delta n={r.rev} />
                    <span className="sr-only">Revision {r.rev}</span>
                  </span>
                  <span role="cell" className="rev-date">
                    <T>{r.period}</T>
                  </span>
                  <span role="cell" className="rev-desc">
                    <span className="rev-role">
                      <T>{r.role}</T>
                    </span>
                    <span className="rev-org">
                      <T>{r.org}</T>
                      <span className="sep" aria-hidden="true"> · </span>
                      <T>{r.location}</T>
                    </span>
                    {r.rev === 0 && <span className="rev-issue">Initial issue</span>}
                  </span>
                  <span role="cell">
                    <ul className="rev-points">
                      {r.points.map((p, i) => (
                        <li key={i}>
                          <T>{p}</T>
                        </li>
                      ))}
                    </ul>
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* E-210 CERTIFICATIONS */}
          <section id="certifications" data-sheet className="sheet">
            <SheetHeader id="certifications" />
            <CertBoard certs={certifications} />
          </section>

          {/* E-300 PROJECTS */}
          <section id="projects" data-sheet className="sheet">
            <SheetHeader id="projects" />
            <ProjectDesk projects={projects} sheet={sheets.find((s) => s.id === "projects")!.number} />
          </section>

          {/* E-310 PUBLICATIONS */}
          <section id="publications" data-sheet className="sheet">
            <SheetHeader id="publications" />
            <ol className="refs">
              {publications.map((p, i) => (
                <li key={i} className="ref" data-plot>
                  <span className="ref-num" aria-hidden="true">
                    [{i + 1}]
                  </span>
                  <div>
                    <p className="ref-title">
                      {p.link ? (
                        <a href={p.link} target="_blank" rel="noreferrer">
                          <T>{p.title}</T>
                        </a>
                      ) : (
                        <T>{p.title}</T>
                      )}
                    </p>
                    <p className="ref-meta">
                      <T>{p.authors}</T>
                      <span className="sep" aria-hidden="true"> · </span>
                      <em>
                        <T>{p.venue}</T>
                      </em>
                      <span className="sep" aria-hidden="true"> · </span>
                      <T>{p.year}</T>
                    </p>
                  </div>
                  <span className="ref-type">Ref. document</span>
                </li>
              ))}
            </ol>
          </section>

          {/* E-400 SERVICES */}
          <section id="services" data-sheet className="sheet">
            <SheetHeader id="services" />
            <div className="details">
              {services.map((s, i) => (
                <article key={s.title} className="detail" data-plot>
                  <DetailDrawing drawing={s.drawing} />
                  <header className="detail-head">
                    <span className="bubble bubble-sm" aria-hidden="true">
                      <span>{i + 1}</span>
                      <span>{sheets.find((s) => s.id === "services")!.number}</span>
                    </span>
                    <div>
                      <h3 className="detail-title">{s.title}</h3>
                      <p className="sheet-meta">Detail {i + 1} · Scale: NTS</p>
                    </div>
                  </header>
                  <p className="detail-summary">
                    <T>{s.summary}</T>
                  </p>
                  <ul className="detail-list">
                    {s.deliverables.map((d) => (
                      <li key={d}>
                        <T>{d}</T>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* E-500 CONTACT */}
          <section id="contact" data-sheet className="sheet">
            <SheetHeader id="contact" />
            <div className="contact-grid">
              <div className="contact-copy">
                <p className="contact-lead">
                  Hiring for a role, or need an engineer on a project? Send a question and Jasmine will reply by email.
                </p>
                <dl className="contact-list">
                  {profile.links.map((l) => (
                    <div key={l.label}>
                      <dt>{l.label}</dt>
                      <dd>
                        {l.href ? (
                          <a href={l.href} target="_blank" rel="noreferrer">
                            {l.href.replace(/^https?:\/\/(www\.)?/, "")}
                          </a>
                        ) : (
                          <span className="tbd">Link to add</span>
                        )}
                      </dd>
                    </div>
                  ))}
                  <div>
                    <dt>Résumé</dt>
                    <dd>
                      {profile.resume ? (
                        <a href={profile.resume} download>
                          Download PDF
                        </a>
                      ) : (
                        <span className="tbd">PDF to add</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
              <RfiForm to={unbracket(profile.email)} />
            </div>
          </section>

        </div>

        <footer className="end">
          <Ground />
          <p className="end-title">End of set</p>
          <p className="sheet-meta">
            {profile.name} · {profile.role} · All sheets subject to revision
          </p>
        </footer>
      </main>

      <Wiring />
    </>
  );
}
