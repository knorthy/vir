---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Surface: portfolio home (single scrolling page)

Mode: Experience (portfolio), with a Persuade close (contact). Audience: employers/recruiters and prospective clients, weighted equally. Job: understand Jasmine's specialty in seconds, review experience and services, reach out. All content is placeholder until the user supplies it; placeholders render visibly as TBD.

## Direction contract

THESIS: The site is Jasmine's own electrical drawing set, E-000 to E-400, and one power one-line diagram is its circuit: the cover's switchboard feeds a bus down the left margin that is energized as you scroll, closing one breaker per sheet. Refuses the category default of hero, about card, timeline dots, three service cards, and a contact form.

OWN-WORLD: Two print processes share one system: blueprint (default) and whiteprint (light: prussian linework on pale diazo paper, amber highlighter line, darker redline), switched with a top-down print wipe. Cyanotype Prussian-blue paper (#0f3a72 ground, mottled exposure, darker edges), pale diazo-white linework and text, tinted-blue secondary text. Two markup pens with jobs: checker's yellow highlighter = energized/checked/focus; redline = placeholders, errors, primary action. Fixed sheet border with zone letters and numbers. Barlow Condensed drafted capitals for display, Barlow for reading, Red Hat Mono only for sheet numbers, dates, and dimensions, Kalam for handwritten redline notes. Components are drafting objects: title block, sheet index, general notes, symbol legend, revision table, detail bubbles, RFI form.

STORY: Visitor sees an engineer's cover sheet with her name dimensioned like a part, reads her general notes and discipline legend, scans her revision history (Rev 0 = education), browses service details, and issues an RFI (prefilled email).

FIRST VIEWPORT: After a ~2s plotter/exposure loader, desktop: left 60% holds JASMINE VIR at display max with a dimension line spanning it that reads the name's rendered width, ELECTRICAL ENGINEER as a subline below, tagline, primary action "Issue an RFI" (redline) and secondary "Read the set". Right 40%: plotted one-line diagram (utility, transformer, main breaker, switchboard) whose four feeders are the section links. Bottom-right: title block. A feeder runs from SWBD-1's tap down and left to become the bus in the margin. Top-right control block: JV monogram (PCB traces with via pads), Blue/Light print switch, and an Index button that opens the sheet index as a right-hand drawer (hidden by default at every width).

FORM: Brief-pinned blueprint world; drawing-set structure, one-line diagram as navigation and scroll spine; position 1 on own list. seed: none (brief-pinned: the user named the blueprint world, which beats the roll per new-work; concept-seed was not run)

Signature interaction: scroll energizes the bus (yellow highlighter fills down the spine) and each section's breaker blade swings closed as its sheet enters; drawings plot (stroke draw) on entry. Content visible by default; reduced motion shows final state.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Contact delivery: mailto composition for now; a form backend is undecided.
- All biography, experience, services, links, résumé PDF, and portrait are placeholders.
