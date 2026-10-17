---
name: Jasmine Vir · Electrical Engineer
description: A portfolio drawn as an electrical drawing set in two print processes, blueprint and whiteprint, wired by one live one-line diagram.
colors:
  paper: "#0f3a72"
  paper-deep: "#08264d"
  ink: "#e8f1ff"
  ink-2: "#b4cff2"
  ink-rule: "rgb(232 241 255 / 0.45)"
  ink-bus: "rgb(232 241 255 / 0.5)"
  ink-3: "rgb(232 241 255 / 0.3)"
  ink-4: "rgb(232 241 255 / 0.14)"
  hi: "#f4de4c"
  hi-line: "#f4de4c"
  on-hi: "#0a2550"
  red: "#ff8466"
  red-hover: "#ff9a80"
  on-red: "#0a2550"
  well: "rgb(4 22 50 / 0.28)"
  prussian: "#0f3a72"
  diazo-sheet: "#e9eef1"
  light-paper: "#eef2f3"
  light-paper-deep: "#d9e2e8"
  light-ink: "#0f3a72"
  light-ink-2: "#3c5f8d"
  light-ink-rule: "rgb(15 58 114 / 0.5)"
  light-ink-bus: "rgb(15 58 114 / 0.45)"
  light-ink-3: "rgb(15 58 114 / 0.3)"
  light-ink-4: "rgb(15 58 114 / 0.1)"
  light-hi-line: "#8a5d00"
  light-red: "#c4401b"
  light-red-hover: "#a93514"
  light-on-red: "#ffffff"
  light-well: "rgb(15 58 114 / 0.035)"
typography:
  display:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "clamp(2.75rem, 6.5vw, 4.75rem)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "clamp(1.875rem, 3.6vw, 3rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "0.005em"
  title:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.625rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "0.01em"
  title-sm:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "0.02em"
  lead:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.4vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "tnum"
  label:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.12em"
  mono:
    fontFamily: "Red Hat Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.1em"
  hand:
    fontFamily: "Kalam, cursive"
    fontSize: "1.05rem"
    fontWeight: 400
  button:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    letterSpacing: "0.04em"
rounded:
  none: "0"
  symbol: "50%"
spacing:
  band-sm: "10px"
  band-lg: "28px"
  spine-sm: "16px"
  spine-lg: "40px"
  margin-sm: "44px"
  margin-lg: "152px"
  gutter-sm: "16px"
  gutter-lg: "40px"
  controls-inset: "10px"
  drawer: "320px"
  sheet-top: "5.5rem"
  sheet-bottom: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.red}"
    textColor: "{colors.on-red}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0.65rem 1.1rem"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.red-hover}"
  button-primary-light:
    backgroundColor: "{colors.light-red}"
    textColor: "{colors.light-on-red}"
  button-primary-light-hover:
    backgroundColor: "{colors.light-red-hover}"
  button-ghost:
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0.65rem 1.1rem"
    height: "44px"
  control-button:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 0.85rem"
    height: "44px"
  logo:
    textColor: "{colors.ink}"
    size: "2.25rem"
  drawer:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.5rem 1.25rem 1.25rem"
    width: "{spacing.drawer}"
  input-field:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.5rem 0"
  index-link-current:
    backgroundColor: "{colors.hi}"
    textColor: "{colors.on-hi}"
    padding: "0.6rem 0.4rem"
  detail-bubble:
    textColor: "{colors.ink}"
    rounded: "{rounded.symbol}"
    size: "3.25rem"
  title-block-cell:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.5rem 0.75rem 0.6rem"
---

# Design System: Jasmine Vir · Electrical Engineer

## Overview

**Creative North Star: "The Issued Drawing Set"**

The whole site is one electrical drawing set, issued in two print processes from the same originals. The default is a blueprint (cyanotype): Prussian-blue paper with a mottled exposure and darkened edges, pale diazo-white linework and lettering. The alternate is a whiteprint (diazo): pale paper with Prussian linework, an amber highlighter line, and a darker redline. Every surface is a drafting object with a real job on a real sheet: a fixed border with zone letters and numbers, a title block, a sheet index, numbered general notes, a symbol legend, a revision table, detail bubbles, and an RFI form. Nothing is a card, and nothing is rounded except what a draftsman would draw with a circle template.

Density is that of a working sheet: generous margins around content, fine and heavy rules doing all structural work, drafted condensed capitals for every heading, set at a moderate scale so the sheet reads as a drawing rather than a poster. A single one-line power diagram is the system's spine: the cover's switchboard feeds a bus down the left margin, each sheet hangs off it through a breaker, and scrolling energizes it with the highlighter. Motion behaves like a plotter and a print machine: strokes draw on, and switching prints wipes the new sheet down over the old one.

Color is spent like ink on a markup set. Paper and line carry everything; the highlighter means energized, checked, current, or focused; the redline means placeholder, error, or the one primary action. Those meanings are fixed in both prints. A small control block at the top right (JV monogram, print switch, index button) is the only chrome; the sheet index lives in a drawer opened on demand.

**Key Characteristics:**
- Two prints, one system: every color is a custom property, redefined as a whole set under the whiteprint theme; components never hard-code a color.
- Paper ground with a shared texture layer (vignette, exposure mottle, paper fibre) on every opaque surface, recut for each print.
- Linework hierarchy instead of elevation: 1px fine rules, 1.5px heavy rules, double rules under drawing titles.
- Barlow Condensed drafted capitals for headings, Barlow for reading, Red Hat Mono for numbers and codes, Kalam for handwritten markup.
- Square corners everywhere; circles only as drafting symbols.
- Authored SVG drawings (one-line, breakers, legend symbols, detail drawings, the monogram) with round-capped strokes so every stroke can plot.
- Placeholder content is visibly redlined until replaced.

## Colors

A two-tone print (paper and line) with exactly two markup pens on top, in two processes: blueprint by default, whiteprint as the alternate. Unprefixed tokens are the blueprint values; `light-` tokens are the whiteprint overrides of the same custom properties under `:root[data-theme="light"]`. Tokens with no `light-` counterpart (`hi`, `on-hi`, `prussian`, `diazo-sheet`) are shared by both prints.

### Primary
- **Redline** (`red` / `light-red`): the drafter's red pen. Fills the primary action ("Issue an RFI"), marks field errors and invalid input borders, draws the wavy underline under placeholder text, and writes handwritten notes ("Redlined items are TBD"). Hover deepens or lightens to **Redline Hover** (`red-hover` / `light-red-hover`): lighter on blue paper, darker on white. Text on it is **On Redline** (`on-red` / `light-on-red`): navy on the blueprint, white on the whiteprint.

### Secondary
- **Checker's Highlighter** (`hi`, both prints): the highlighter as a fill. The current sheet in the index and text selection, with **On Highlighter** (`on-hi`) navy text.
- **Highlighter Line** (`hi-line` / `light-hi-line`): the highlighter as a stroke or letterform. The energized bus and feeder, closed breakers, hovered cover feeders, focus outline, text caret, focused input baselines, checker notes, link hover underline, monogram hover. On blue paper it is the same yellow as the fill; on white paper it darkens to amber so a line stays visible.

### Neutral
- **Paper** (`paper` / `light-paper`): the sheet itself; page ground, frame, control block, drawer, and the knockout behind labels that sit on lines and behind the monogram's via pads.
- **Deep Paper** (`paper-deep` / `light-paper-deep`): scrollbar track; the deepest paper tone.
- **Line** (`ink` / `light-ink`): primary linework and text, input text, heavy symbols, the monogram.
- **Tinted Line** (`ink-2` / `light-ink-2`): secondary text (roles, orgs, dates, field labels, sheet meta, the unselected print name), drawing annotations, list dashes, dimension lines, the select chevron.
- **Heavy Rule** (`ink-rule` / `light-ink-rule`): 1.5px structural borders (sheet border, title block, control block, drawer, legend top, revision header, RFI form).
- **Bus** (`ink-bus` / `light-ink-bus`): the de-energized margin bus, routed feeder, and ground symbol.
- **Fine Rule** (`ink-3` / `light-ink-3`): 1px dividers inside drafting objects and between controls, ghost button outline, input baseline at rest, link underline color, portrait cross.
- **Hairline** (`ink-4` / `light-ink-4`): the faintest dividers (list rows, zone ticks) and the hover wash on index links and controls.
- **Well** (`well` / `light-well`): the faint wash inside the RFI form.
- **Prussian** (`prussian`) and **Diazo Sheet** (`diazo-sheet`): the loader only; the pale unexposed sheet with Prussian plotting before it exposes into the page. Also `prussian` is the browser theme color.

### Named Rules
**The Two Pens Rule.** Only two colors exist beyond paper and line. Highlighter means energized, checked, current, or focused; red means placeholder, error, or primary action. Never use either decoratively, and never swap their jobs, in either print.

**The Two Prints Rule.** Both themes are the same drawing set. A new color is added as a custom property in both the blueprint `:root` and the whiteprint override, never as a literal in a component; role names stay the same across prints and only values change.

**The One Redline Action Rule.** A surface layer carries at most one filled redline button. On the sheet that is the cover's "Issue an RFI"; every other action there is a ghost outline. The sheet-index drawer is its own overlay layer, so its RFI button is primary.

**The Line Is Not Text Rule.** Fine Rule and Hairline are line weights, not text colors. Any readable text uses Line or Tinted Line.

## Typography

**Display Font:** Barlow Condensed (with Barlow, sans-serif)
**Body Font:** Barlow (with system-ui, sans-serif)
**Label/Mono Font:** Red Hat Mono (with ui-monospace) for numbers and codes; Kalam (with cursive) for handwritten markup

**Character:** Condensed engineering capitals over a sturdy grotesque, the pairing of a drawing title block. The mono is the plotter's voice and the hand is the checker's. The scale is restrained: the name leads, but no heading shouts over the drawings.

### Hierarchy
- **Display** (600, `display`, uppercase, balanced): the name on the cover only, spanned by a live dimension line.
- **Headline** (600, `headline`, uppercase, balanced): sheet titles, always with the drawing-title underline (3px heavy rule over 1px fine rule).
- **Title** (600, `title`, uppercase): revision roles. The cover role line runs at clamp(1.125rem, 1.8vw, 1.5rem), weight 500, 0.04em tracking, in Tinted Line; detail titles at clamp(1.2rem, 1.7vw, 1.45rem) with their own double underline (2px over 1px).
- **Title Small** (600, `title-sm`, uppercase): legend entries; the title-block project line (1.25rem), index name, legend and end-of-set titles (1.5rem), portrait caption (1.125rem).
- **Lead** (400, `lead`): cover tagline within 40ch. The first general note runs at clamp(1.15rem, 1.6vw, 1.35rem) / 1.45; the contact lead at clamp(1.2rem, 1.8vw, 1.45rem) / 1.35 within 30ch.
- **Body** (400, `body`, tabular numerals): reading text; notes at 1.0625rem / 1.65 within 64ch, detail summaries within 52ch, input text at 1.0625rem, secondary rows (index links, title-block values, form status) at 0.9375rem.
- **Label** (600, `label`, uppercase): field labels for title block, contact list, index, revision headers, RFI form, and the text of the top-right controls (print names, "Index").
- **Mono** (500, `mono`, uppercase): sheet numbers, sheet meta ("Sheet E-100 · 2 of 5 · Scale: NTS"), dates (0.875rem), bubble numbers, dimension readouts, drawing annotations (11 to 12px in SVG), and plotter status strings in the loader.
- **Hand** (400, `hand`, rotated -2 to -3deg): redline notes and checker annotations; "Fed from" notes at 1rem.

### Named Rules
**The Drafted Capitals Rule.** Every heading and action button is Barlow Condensed 600, uppercase, lightly tracked. Utility controls (print switch, index toggle) are tracked Barlow label caps. Reading text is never set in capitals.

**The Mono Is For Numbers Rule.** Red Hat Mono carries sheet numbers, codes, dates, dimensions, and plotter status, never sentences or field labels. Labels are tracked Barlow caps.

**The Handwriting Is Markup Rule.** Kalam appears only as a pen annotation in Redline or Highlighter Line (or Tinted Line for "Fed from" notes), slightly rotated, never as a heading or body.

## Layout

The page is a sheet inside a fixed border. A band (`band-sm`, `band-lg` from 760px) frames the viewport; from 760px the band carries zone numbers 1-8 top and bottom and letters A-F left and right, with an inner fine border. Content sits right of a wide left margin (`margin-sm` / `margin-lg`) that holds the bus at the spine position (`spine-sm` / `spine-lg`), with a right gutter (`gutter-sm` / `gutter-lg`).

A single control block is fixed at the top right, inset `controls-inset` inside the band, at every width: monogram, print switch, index button. The sheet index is never docked; it opens as a right-hand drawer (`drawer` wide, capped at the viewport minus the bands) spanning the full sheet height inside the band. Below 760px the index button collapses to its icon; below 560px the print switch drops its "Blue / Light" names to the track alone.

Each section is a sheet: generous vertical air (5rem / 6rem, rising to `sheet-top` / `sheet-bottom` at 760px), a header row of breaker, bubble, and title aligned to the bus, then content. Grids are asymmetric and drawn: cover 1.35fr/1fr from 960px with the title block bottom-right; notes plus a 220-300px portrait opening from 900px; details on a 12-column grid (max 1100px) with staggered 7/5 and 5/7 spans and offset tops; revisions as a four-column table (4rem / 10rem / 1.1fr / 1fr) from 900px; contact 0.9fr/1.1fr from 1000px.

**The Hang It On The Bus Rule.** Every sheet header connects to the left-margin bus through its breaker; new sections join the circuit rather than float free of it.

## Elevation & Depth

Flat. Depth comes from the paper itself (a radial vignette darkening toward the edges, a low-frequency exposure mottle, and fine fibre noise on the blueprint; a lighter edge tint and fibre on the whiteprint, shared by every opaque surface through one `--texture` layer) and from line weight. Fixed chrome (frame, control block) repaints the same textured paper with `background-attachment: fixed` so it reads as the same sheet, not a layer above it. The RFI form sits on the Well wash inside a heavy rule.

### Shadow Vocabulary
- **Drawer lift** (`box-shadow: -18px 0 40px -18px rgb(3 14 32 / 0.55)`): the sheet-index drawer only, cast leftward over the sheet, above a backdrop of `rgb(4 18 40 / 0.35)` on the blueprint and `rgb(15 58 114 / 0.18)` on the whiteprint.

### Named Rules
**The Line Weight Is Depth Rule.** Hierarchy between surfaces is expressed by 1px fine versus 1.5px heavy rules and by double title rules, never by shadows. The only shadow belongs to the drawer, which genuinely overlays the sheet.

## Shapes

Square paper. Every container, button, input, control, and frame has zero radius. Circles appear only where drafting uses them: detail bubbles (split by a horizontal rule, number over sheet), connection nodes, breaker terminals, transformer windings, the monogram's via pads, the print switch's knob. Triangles are revision deltas. Strokes in drawings use round caps and joins at 1.5px (2.25px traces in the monogram); the switchboard bus is 4px; the margin bus is 2px, energized at 3px.

**The Circle Template Rule.** A circle is a symbol, never a softened corner. If it is not a node, pad, terminal, bubble, or component symbol, it is square.

## Components

### Buttons
Drafted capitals on square stock; tactile but flat.
- **Shape:** square (`rounded.none`), minimum 44px tall, an inline SVG arrow that nudges 3px in its direction on hover.
- **Primary:** Redline fill with On Redline text. One per surface layer.
- **Hover / Focus:** primary moves to Redline Hover over 0.25s ease-out; press drops 1px; focus is the global 2px Highlighter Line outline at 3px offset.
- **Ghost:** transparent with a 1.5px Fine Rule outline that strengthens to Line on hover.

### Inputs / Fields
Ruled lines on a form, not boxes.
- **Style:** no box; a 1.5px Fine Rule baseline, Line text, Highlighter Line caret; label above in tracked Barlow caps; "optional" is an inline lowercase note.
- **Focus:** baseline turns Highlighter Line; hover strengthens it to Tinted Line.
- **Error:** baseline turns Redline and a Redline message (0.9375rem) follows the field.
- **Select:** native appearance removed, Tinted Line chevron drawn as an SVG (`--select-arrow`, recoloured per print).

### Control Block
A small title-block strip fixed at the top right: textured paper inside a 1.5px Heavy Rule, cells divided by 1px Fine Rules, each cell at least 44px tall. Cells, in order: the monogram (links to the cover), the print switch, and the index button (a stacked-sheets SVG icon plus "Index" in label caps). Control hover is a Hairline wash over 0.2s.

### Monogram
The JV mark: J and V routed as PCB traces (2.25px, round caps) inside a thin square border (1.25px), each trace ending in a hollow via pad (a paper-filled circle) with one solid via at the V's point. Drawn in Line at 2.25rem; on hover its traces take the Highlighter Line. It is a drawing, so it follows the stroke rules of every other drawing.

### Print Switch
A `role="switch"` button between the two processes, persisted in local storage and applied to `html[data-theme]` before first paint so neither print flashes. "Blue" and "Light" flank a 2.25rem track drawn in a 1.5px Line stroke; the current print's name is Line, the other Tinted Line; a 0.625rem circular knob slides 0.35s ease-out. Switching runs a 0.7s top-down print wipe (view transition on the plot curve), skipped under reduced motion. The track is currently pill-rounded (999px), which departs from the Circle Template Rule; it is recorded as shipped, not as a precedent for other controls.

### Sheet Index Drawer
A native `popover` panel docked to the right edge inside the band, opened by the index button at every width. Textured paper, 1.5px Heavy Rule, Drawer lift shadow over a dimming backdrop; it enters by sliding 24px from the right and fading (0.35s ease-out) and light-dismisses, also closing after a sheet is chosen. Head: name in Title Small, role in Tinted Line, square close control. Body: a ruled list of mono sheet number plus title; hover washes Hairline; the current sheet is filled with Checker's Highlighter in On Highlighter. Foot: a full-width primary RFI button and a two-row mini title block.

### Title Block
A ruled grid (two columns, four from 560px) inside a heavy rule with fine internal rules; label over value, the project row spanning full width in Title Small. Redline handwritten notes may be pinned to its corner.

### Detail Bubble
A 3.25rem circle (3rem small) with a 1.5px Line outline split by a horizontal rule: mono detail number above, sheet number below in Tinted Line.

### Circuit (signature)
The one-line diagram on the cover is navigation: its four feeders link to the sheets, and hovering one closes its blade and lights it in Highlighter Line. A routed feeder runs from the switchboard tap to the margin bus; the highlighter fill descends the bus with scroll, and each sheet's breaker blade swings closed (from -30deg) as its sheet goes live. Drawings in sections plot on first entry (stroke-dashoffset over 1.6s on the plot curve), with labels fading in after. All content is visible without JavaScript; reduced motion shows the final wired state and skips the loader and print wipe.

### Placeholder Redline
Placeholder content (bracketed in data) renders with a 1px wavy Redline underline until replaced, so missing content is visible, not hidden.

## Do's and Don'ts

### Do:
- **Do** build every new surface as a drafting object (sheet, schedule, detail, note, table) on Paper with Line linework, and check it in both prints.
- **Do** add every new color as a custom property in both the blueprint `:root` and the `:root[data-theme="light"]` override.
- **Do** keep the highlighter for energized, checked, current, and focus states (Highlighter Line for strokes and text, Checker's Highlighter for fills), and red for placeholders, errors, and the single primary action.
- **Do** set every heading in Barlow Condensed 600 uppercase with the double drawing-title underline on sheet and detail titles.
- **Do** separate and frame with 1px Fine Rule / Hairline and 1.5px Heavy Rule lines.
- **Do** author drawings as inline SVG with `pathLength=1` strokes, 1.5px round-capped, so they can plot on entry with the plot curve (cubic-bezier(0.45, 0, 0.2, 1)).
- **Do** keep chrome inside the top-right control block and put navigation in the drawer rather than docking new fixed panels.
- **Do** show content in its final state without JavaScript and under reduced motion.

### Don't:
- **Don't** hard-code a color literal in a component; it will be wrong in the other print.
- **Don't** round corners on containers, buttons, controls, or inputs; circles are drafting symbols only.
- **Don't** add shadows to express hierarchy; only the overlaying drawer gets a shadow.
- **Don't** put a second filled redline button on the same surface layer.
- **Don't** set readable text in Fine Rule or Hairline; they are line weights.
- **Don't** use Red Hat Mono for sentences or field labels, or Kalam for anything but pen markup.
- **Don't** fade or slide drawings in; they plot.
