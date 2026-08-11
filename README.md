# Montavia

A bilingual (English / Georgian) architecture-studio portfolio site in Next.js.

It is built in two layers. Underneath is a faithful port of the **Utica**
(Squarespace 7.1 / Fluid Engine) template's layout system — every number
measured off the running reference at twelve viewport widths and reproduced
exactly. On top of that sits a **studio design layer**: an editorial display
scale, a mono meta voice, an asymmetric work index, theme-adaptive chrome and
line-masked type reveals.

The bottom layer is why the spacing feels right. The top layer is why it no
longer looks like a template.

```bash
npm install
npm run dev
```

---

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router, React 19, RSC) |
| Language | TypeScript, `strict` + `noUncheckedIndexedAccess` |
| Styling | Tailwind CSS v4 (CSS-first `@theme`), no runtime CSS-in-JS |
| Forms | React 19 `useActionState` + Server Actions + Zod |
| Images | `next/image` (AVIF/WebP), `sizes` derived from grid spans |
| Tests | Vitest |

Every route is statically prerendered; first-load JS is ~113 kB. The only
client components are the header (samples scroll position), the mobile nav,
the two reveal primitives, the parallax image and the contact form.

## Scripts

| | |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and serve |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Vitest |
| `npm run assets:photos` | Fetch and grade the photography (`-- --mono` for black and white) |
| `npm run assets:placeholders` | Regenerate abstract placeholders instead |

## Languages

The site ships in **English** and **Georgian**, both statically prerendered.

| | |
|---|---|
| Routes | `/en/...` and `/ka/...` — every page exists in both |
| Default | `/` redirects via `src/middleware.ts` |
| Detection | `locale` cookie, then `Accept-Language`, then `en` |
| Switching | Preserves the current page — `/ka/work/project-two` → `/en/work/project-two` |
| SEO | Per-locale `<html lang>`, canonical, `hreflang` alternates, both locales in `sitemap.xml` |

Copy lives in `src/content/en/` and `src/content/ka/` as parallel modules;
`getContent(locale)` returns one merged dictionary. Adding a third language
means adding a folder and one entry in `src/i18n/config.ts` — no component
changes.

Things that are **not** translated on purpose: image filenames, project
slugs (so URLs stay stable across languages), and the shared contact details
in `src/content/index.ts`.

### Nothing may be hardcoded in a component

Two checks enforce this, because either one alone misses half the problem:

- `src/content/dictionary.test.ts` compares the two dictionaries key by key
  and array length by array length, then scans the Georgian one for stray
  Latin copy. It catches a key you translated in one locale and forgot in the
  other.
- `leak-scan` walks the **rendered** `/ka` pages and flags any text node
  containing Latin letters that is not the brand, a number or a contact
  detail. It catches a string hardcoded in a component, which never reaches a
  dictionary at all.

The second check is what found `"What people write about the work."` sitting
in `press/page.tsx` and `"Every project is led by a partner…"` in
`our-team/page.tsx` — both invisible to the dictionary test.

Both are clean: 20 unit tests passing, 0 leaks across 9 Georgian pages.

### Georgian typography

Georgian needed three deliberate corrections, in `src/styles/georgian.css`:

- **No uppercasing.** `text-transform: uppercase` maps Mkhedruli to Mtavruli
  in modern browsers. It renders, but no Georgian site sets running text that
  way — so the mono meta voice keeps its tracking and drops the transform.
- **No negative tracking.** The display scale runs at `-0.03em` for Archivo.
  Georgian letterforms are rounder and more open; the same value closes them
  up badly. Set to `0`, with looser line-height to match.
- **Its own face.** Archivo and IBM Plex Mono have no Georgian glyphs, so
  **Noto Sans Georgian** sits in all three stacks and takes over by coverage.

Georgian also runs roughly 20–30 % longer than English. The fluid grid absorbs
it, but it is worth checking headline blocks when editing copy.

## Conventions

- **No comments in source.** Every `.ts`, `.tsx`, `.mjs` and `.css` file is
  comment-free. This README is therefore the only record of *why* the numbers
  are what they are — the fluid type formula, the grid math, the failure modes
  the motion code guards against. Treat it as part of the source.
- **No file over 120 lines.** Anything approaching it gets split by
  responsibility rather than trimmed.

## Project layout

```
src/
  app/
    globals.css            imports styles/* only
    contact/
      actions.ts           'use server' — submit handler only
      schema.ts            Zod schema (testable, reusable client-side)
      state.ts             action-state type + initial value
    work/[slug]/           project pages, statically generated
  styles/                  tokens, base, layout, typography,
                           components, effects, motion
  components/
    fluid/                 Section + FluidGrid + FluidBlock  ← layout system
    layout/                adaptive header, mobile nav, footer
    sections/              BleedImage, CtaSection, StatRow
    sections/home/         Statement, Practice, WorkIntro, Approach
    ui/                    Button, Meta/SectionLabel, Reveal, SplitText, Grain
    work/                  ProjectIndex, ProjectHeader, ProjectSpec,
                           ProjectGallery, NextProject
    contact/               ContactForm, Fields
  content/                 types + all copy and data — swap for a CMS here
  lib/                     fluid geometry, projects, useReveal,
                           useSectionTheme, useModalPanel, cn
scripts/
  fetch-photos.mjs         curated photography
  make-placeholders.mjs    abstract fallback imagery
  lib/                     composition helpers
```

---

## The layout system

`FluidBlock` takes raw Fluid Engine grid coordinates, so a design can be
transcribed 1:1 and stays verifiable against its source:

```tsx
<FluidBlock area={{ desktop: [3, 2, 9, 22], mobile: [3, 2, 9, 10] }}>
  <SplitText as="h1" text={site.tagline} className="display" />
</FluidBlock>
```

Those are `rowStart / colStart / rowEnd / colEnd`, where **line 1 is the left
gutter track** — content column 1 begins at line 2, exactly as in the source
design. Placements are asserted in development, so a coordinate transcribed
against the wrong breakpoint's grid throws with the block's label instead of
silently collapsing.

`sizesForArea()` turns a column span into an `<Image sizes>` string, so the
browser never downloads more pixels than the grid can show.

### One rule worth knowing

**Width comes from the grid; height comes from `aspect-ratio`.** Never the
other way round. Pinning height first — `h-full` on an aspect-ratio box — lets
the media compute its *width* from its height and escape the grid entirely.
That bug shipped an image 21px past the right edge of the viewport during
development; it is why `ProjectIndex` sizes cards the way it does.

---

## Design system

Measured at 320 / 375 / 480 / 600 / 700 / 767 / 768 / 900 / 1000 / 1100 /
1300 / 1440 / 1500 / 1700 / 1920 px, then reproduced.

### Type

Headings use a fluid curve rather than breakpoint steps:

```
font-size = v × 1rem + (v − 1) × (min(1.2vmax, 18px) − 16px)
```

| token | `v` | @375×812 | @1000×800 | @1440×900 | ≥1500 |
|---|---|---|---|---|---|
| `h1` | 4.0 | 45.23 px | 52.00 px | 67.84 px | 70.00 px |
| `h2` | 2.8 | 33.54 | 37.60 | 47.10 | 48.40 |
| `h3` | 2.2 | 28.44 | 31.60 | 39.66 | 40.60 |
| `h4` | 1.6 | 21.85 | 23.20 | 26.37 | 26.80 |

The `18px` ceiling is where the 1500 px max content width clamps the curve.
Body copy is a flat `1rem / 1.8` at every width — it does **not** scale.

On top of that, three additions:

- `.display` — `clamp(2.6rem, 6.2vw, 6.6rem)` at `-0.03em`, its own curve so
  it stays usable on a phone. Large type needs less air between letters; the
  optical correction is what stops it reading as a scaled-up paragraph.
- `.meta` — IBM Plex Mono, 11 px, `0.14em`, uppercase, tabular figures. The
  drawing-sheet voice: index numbers, years, categories, captions, nav.
- `.numeral` — tabular heading figures for the statistics row.

### Grid

```
grid-template-columns:
  minmax(gutter, 1fr) repeat(N, minmax(0, cell)) minmax(gutter, 1fr)
```

| | ≤767 px | ≥768 px |
|---|---|---|
| columns `N` | 8 | 24 |
| site gutter | `6vw` | `4vw` |
| gap | `11px` | `11px` |
| `cell` | `(1500px − 11px × (N−1)) / N` | same |
| row minimum | `24px` (flat) | `0.0215 × min(100vw − 2×gutter, 1500px)` |

Above 1700 px the gutter becomes `(100vw − 1500px) / 2`, capping content at
1500 px.

### Rhythm and colour

| section height | padding-block | min-height |
|---|---|---|
| hero | `3.4vmax` | `100svh` |
| small | `3.3vmax` | `33vh` |
| medium | `6.6vmax` | `66vh` |
| large | `10vmax` | `100vh` |

| token | value | role |
|---|---|---|
| `paper` | `#f6f4ef` | bone off-white, the default ground |
| `stone` | `#e7e4db` | tinted section, used for rhythm |
| `ink` | `#14151a` | near-black with a cool cast |
| `navy` | `#1b2a5c` | ultramarine, the dark sections |
| `blue` | `#2743a8` | accent on light — text **and** fill |
| `blue-light` | `#8fa6f0` | accent on dark — text **and** fill |

| section theme | background | text | accent |
|---|---|---|---|
| `white` | paper | ink | blue |
| `tint` | stone | ink | blue |
| `dark` | navy | paper | blue-light |
| `black` | ink | paper | blue-light |

Ultramarine needs only one accent tone per ground, unlike a warm accent:
`#2743a8` measures **7.78:1** on paper in *both* directions, so the same value
works as 11px label text and as a button fill. `#8fa6f0` does the same job on
dark — 7.71:1 on ink, 5.80:1 on navy.

Rules and hairlines use `--rule`. A fixed film-grain layer sits over
everything at 3.5 % opacity in `multiply` — a few percent of noise is what
stops large flat areas reading as flat *screen* rather than flat *paper*.

### Contrast is verified, not assumed

Every text/background pair is audited against the **rendered** page — walking
the DOM, compositing each ancestor background, and blending the `color-mix`
alpha in `--muted`. Current state: **0 failures** across `/en`, `/en/contact`
and `/ka/work/project-one` at WCAG AA (4.5:1 body, 3:1 large).

That audit caught a real bug: `--muted` at 58 % ink measured 4.1–4.3:1 on the
warm grounds — it had passed on pure white and quietly stopped passing when
the ground warmed up. It is 70 % now.

One trap worth knowing if you re-run such a check: Chrome serialises
`color-mix()` as `color(srgb 0.95 0.94 0.91 / 0.66)` with **0–1** channels,
not the `rgb()` 0–255 you get everywhere else. Parsing those as 8-bit gives
nonsense ratios.

---

## What the studio layer adds

**Theme-adaptive header.** Fixed and transparent rather than a white bar. It
samples the `data-theme` of whichever section sits behind it and flips between
ink and paper — so it stays legible over a full-bleed image and inverts again
on the way out. The section themes already exist as attributes, so this reads
the design system rather than duplicating it. It also re-samples on
`visibilitychange`, because `requestAnimationFrame` is paused in hidden
documents and a backgrounded tab otherwise returns with a stale reading.

**Asymmetric work index.** The template shipped a 2×2 table of equal cards.
Equal weight reads as a catalogue; a portfolio wants hierarchy. Each entry has
its own column span, aspect ratio and vertical offset, so the eye zig-zags
down the page. Index numbers and mono meta give it the feel of a drawing
register.

**Line-masked headlines.** `SplitText` renders every word inside its own
clipping box and staggers them by the line they actually landed on — grouped
at runtime from `offsetTop`, so the stagger follows the real wrap at any
width and re-measures on resize.

**Sectioned pages.** `(01) —— Work`, `(02) —— Practice`, and so on, set in
the left margin: a table of contents you can read while scrolling.

**Richer project pages.** A mono spec table, an editorial narrative column, a
two-up gallery with full-bleed rows, and a full-bleed next-project teaser that
keeps people moving through the work instead of bouncing to the footer.

### Motion, and why it can't strand content

Every reveal shares one hook, `useReveal`, because a failed trigger is not a
missing fade — `SplitText` masks its words, so a missed trigger means a
missing *headline*. It has five independent ways to fire:

1. Server output is unmasked, ordinary markup — no JS, no problem.
2. Masking is applied in a layout effect, before paint, so it never flashes.
3. IntersectionObserver, for the normal case.
4. A passive scroll listener, because a fast or programmatic scroll can carry
   an element from below the fold to above it without crossing an observer
   threshold — IntersectionObserver genuinely never fires for those.
5. A ResizeObserver, for arriving in view because the page changed around it,
   plus a slow `inView()` poll as a net. (A blind timeout would be wrong: on a
   long page it would reveal everything a few seconds in and kill the effect.)

The in-view-at-mount path pairs its `requestAnimationFrame` with a timer for
the same reason the header listens for `visibilitychange` — **rAF does not
fire while a document is hidden**, and a link opened in a background tab loads
exactly that way. Without the timer, such a page would sit with its headline
masked indefinitely.

`prefers-reduced-motion: reduce` disables all of it and skips the masking
entirely.

---

## Fonts

The reference sets headings in **Acumin Pro** (Adobe Fonts), which is not free
to redistribute. The stack leads with it anyway:

```css
--font-heading: 'acumin-pro', var(--font-archivo), 'Helvetica Neue', …;
```

Add your own Adobe Fonts kit and Acumin takes over with no other change. Until
then it falls back to **Archivo**, which measures within **0.6 %** of Acumin
Pro at display sizes (`"Montavia is an architecture firm"` — Acumin 830.9 px,
Archivo 826.3 px at 67.84 px).

Body copy is **Poppins Light**, exactly what the reference uses. Meta is
**IBM Plex Mono**.

One knob exists for the substitution:

```css
--heading-tracking: -0.006em;  /* set to 0 if you license Acumin Pro */
```

Archivo runs ~1.7 % wide against Acumin on some strings — enough to change
where a headline breaks. This corrects it.

## Photography

`public/images/*.jpg` are real photographs, fetched and graded by
`npm run assets:photos`.

They come from [Lorem Picsum](https://picsum.photos), which serves
Unsplash-licensed images — free for commercial use, no attribution required.
The IDs are **curated, not random**: each was reviewed on a contact sheet and
picked for being architectural, urban or structural, then cast into a specific
slot (a brick detail belongs in a gallery, not behind a headline).

Two decisions make a mixed-source set read as one studio's portfolio:

- **Per-image white balance, then one shared grade.** Each frame is
  grey-world balanced *after* cropping, then desaturated to 74 % with a
  slightly cool per-channel curve. That is what lets a Cambridge quad and a brutalist
  flak tower sit on the same page while both still read as colour. The balance
  step matters: the hero photograph shipped with a **+15 green cast** that was
  invisible in black and white and turned the whole section olive the moment
  colour came back. It is ±0.7 across the set now. Pass `--mono` for the
  black-and-white treatment instead.

  Two sharp traps worth knowing: `.tint()` duotones an image and destroys its
  original hue — it is not a white-balance tool. And calling `.linear()` twice
  on one pipeline **overwrites** rather than composes, so a correction and a
  grade have to be separate passes.
- **Attention-based cropping.** Sources are landscape; several slots are
  portrait. A centre crop cuts buildings in half, so `sharp` picks the region
  of interest instead.

```bash
npm run assets:photos           # graded colour (default)
npm run assets:photos -- --mono # black and white
```

Swap in your own photography by dropping files over the same filenames, or
point `src/content/*.ts` at new ones — nothing else needs to change. The
original generated placeholders are still available via
`npm run assets:placeholders` if you want to work without the network.

## Content

All copy and data live in `src/content/` as typed modules — `site.ts`,
`pages.ts`, `projects.ts`, `team.ts`. Nothing is hard-coded into components, so
moving to a CMS means replacing those four files with fetchers of the same
shape.

Body copy is original writing at the reference's lengths, so the layout matches
without reproducing its prose.

## Contact form

Progressively enhanced: a plain `<form action={serverAction}>` that works
without JavaScript and upgrades to inline pending state and field errors with
it. Server-side Zod validation, per-field `aria-invalid` + `aria-describedby`,
a honeypot that returns a fake success so bots learn nothing, and length caps
on every field.

Set `CONTACT_WEBHOOK_URL` to POST submissions as JSON to Resend / Postmark / a
CRM. Unset, they are logged to the server console — see `deliver()` in
`src/app/contact/actions.ts`.

## Accessibility

Skip link; landmark regions; `aria-current` on the active nav item; the mobile
panel traps focus, closes on <kbd>Esc</kbd>, restores focus to its trigger and
locks background scroll — and the header inverts with it, so the wordmark and
close button never end up black-on-black. Visible focus rings throughout, and
meaningful `alt` on every image. Decorative duplicate links (an image linking
to the same place as its title) are `aria-hidden` and removed from the tab
order.

## SEO

Per-route metadata with a title template, canonical URLs, Open Graph,
`sitemap.xml`, `robots.txt`, an SVG monogram icon, and `ArchitecturalService`
JSON-LD. Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) so absolute URLs
resolve correctly.

---

## Attribution

This is an independent implementation. The **layout system** is a deliberate
reproduction of the Utica template's geometry; the visual design on top of it
is original work. The prose and Acumin Pro licence belong to Squarespace
and Adobe respectively and are not included — supply your own font licence,
and swap the fetched stock photography for the studio's own, before deploying
anything public.
