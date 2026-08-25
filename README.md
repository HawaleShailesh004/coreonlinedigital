# Coreline Digital - Website

Marketing site for Coreline Digital, built to the spec in
`coreline-website-build-document (1).md` with copy from `coreline-site-copy-draft.md`.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script              | Purpose                    |
| ------------------- | -------------------------- |
| `npm run dev`       | Dev server                 |
| `npm run build`     | Production build           |
| `npm start`         | Serve the production build |
| `npm run lint`      | ESLint                     |
| `npm run typecheck` | `tsc --noEmit`             |

## Structure

```
app/
  layout.tsx          Fonts, metadata, nav + footer shell
  page.tsx            Home
  services/           Services page
  work/               Work page
  contact/            Contact page + server action
  globals.css         Design tokens, keyframes, reduced-motion fallbacks
components/
  LineNode.tsx        The brand motif - line ending in a node
  Nav.tsx  Footer.tsx  Logo.tsx  WorkCard.tsx  FinalCta.tsx
  home/               One component per home section
  work/  contact/     Page-specific interactive pieces
  ui/                 Container, Section, Button, Eyebrow, Reveal, PageHeader
lib/
  content.ts          All site copy - single source of truth
  useReducedMotion.ts cn.ts
```

## Design system

Tokens live in the `@theme` block of `app/globals.css`, so they're available as
Tailwind utilities (`bg-accent`, `text-h2`, `border-hairline`, `font-display`).
Never hardcode a hex value or a font stack in a component.

| Token      | Value                 | Use                               |
| ---------- | --------------------- | --------------------------------- |
| `ink`      | `#0C1210`             | Primary text, dark surfaces       |
| `paper`    | `#F6F7F5`             | Background                        |
| `accent`   | `#1F5C4B`             | CTAs, links, active states, motif |
| `grey`     | `#6E7A75`             | Secondary text                    |
| `hairline` | `rgba(12,18,16,0.12)` | Borders and dividers              |

Type: Space Grotesk (display) · Inter (body) · IBM Plex Mono (labels). Adding a
fourth typeface or a new colour is a brand decision, not a styling one.

Two layout rules that are deliberate, not oversights: **no border radius** on
cards, buttons, inputs and badges, and **hairline borders instead of shadows**.

## Motion

Three intentional infinite loops, everything else fires once:

1. Focus strip ticker (`.marquee-track`, 40s, pauses on hover)
2. "System" waveform in Why Not a Template (`.pulse-path`)
3. Status light on the final CTA band (`.breathe`) and the WhatsApp ring on Contact

Scroll reveals use `Reveal`, which disconnects its observer after firing. The
Process section is scroll-_linked_: the connector fills in proportion to scroll
position and each node flips to `--accent` as the fill reaches it.

Every animation has a static fallback in the `prefers-reduced-motion` block at
the bottom of `globals.css`. JS-driven motion additionally checks the setting via
`useReducedMotion`, and a `<noscript>` style in the layout keeps revealed content
visible without JavaScript.

## Before launch

- `lib/content.ts` - `url` is still a placeholder domain, which affects page
  metadata and the sitemap; phone, WhatsApp, email and address are live
- `app/contact/actions.ts` - wire `requestCallback` to deliver to
  `coreonlinedigital@gmail.com`; it currently validates and logs only
- `lib/content.ts` - `workSamples[].href` all point at `#` until the sample
  builds ship
- Add an OG image and a favicon in `app/`

Per the copy notes: no pricing, no testimonials, no client counts anywhere -
none of that exists yet, and nothing on the site should imply it does.
