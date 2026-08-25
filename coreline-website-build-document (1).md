# Coreline Digital - Website Build Document

Hand this whole file to Cursor/Claude Code as project context before scaffolding. It contains the full design system, layout spec, and per-section animation behavior. Copy content lives in `coreline-site-copy-draft.md` - reference it, don't duplicate it here.

---

## 1. Brand Identity

- **Name:** Coreline Digital (wordmark: lowercase `coreline.`)
- **Positioning:** Digital infrastructure firm, not a web design shop. Sells outcomes (revenue, retention, response time), never tech stack.
- **Feel / vibe:** Engineered, calm, precise, trustworthy. Should read like fintech or medical-device branding - never playful, never "startup," never templated.
- **Signature motif:** A single horizontal line ending in a node (circle). This is the logo, the section divider, the process connector, and the loading/hover language. Every recurring visual element should trace back to this one idea - a line that connects two points, i.e. "coreline."

## 2. Design Tokens

### Color - Emerald & Ink (locked palette)

```css
--ink: #0c1210; /* primary text, dark surfaces */
--paper: #f6f7f5; /* background */
--accent: #1f5c4b; /* Signal/Emerald - CTAs, links, active states, the line motif */
--grey: #6e7a75; /* secondary text, muted copy */
--hairline: rgba(12, 18, 16, 0.12); /* borders, dividers */
--card-bg: rgba(12, 18, 16, 0.02); /* subtle card backgrounds if needed */
```

Do not introduce new colors without a reason. If a client-vertical sample site needs its own palette later, that's a separate token set - never bleed it into the core Coreline brand.

### Typography

- **Display (headlines, nav, buttons):** Space Grotesk - weights 500/600/700. Tight letter-spacing (-0.01em to -0.02em depending on size).
- **Body (paragraphs, descriptions):** Inter - weights 400/500. Line-height 1.6–1.7 for readability.
- **Data/utility (labels, eyebrows, badges, stats, nav micro-copy):** IBM Plex Mono - weight 400/500, uppercase, letter-spacing 0.08em–0.14em, always small (11–12px).

Never introduce a fourth typeface. Never use a rounded/soft-terminal font anywhere - that reads "consumer app," which fights the positioning.

### Type Scale

```
H1 (hero):        56–64px / 1.05–1.12 line-height / -0.02em tracking
H2 (section):      36–40px / 1.15 / -0.015em
H3 (card/subhead):  20–24px / 1.2 / -0.01em
Body large:         17–18px / 1.65
Body:                15–16px / 1.6
Caption/mono label:  11–12px / uppercase / 0.1em tracking
```

### Spacing

Base unit: **8px**. All spacing in multiples of 8.

```
Section vertical padding (desktop):  120–160px top/bottom
Section vertical padding (mobile):    64–80px
Container max-width:                  1120–1200px
Container horizontal padding:         48px desktop / 20px mobile
Card internal padding:                28–36px
Gap between grid items:               24–32px
```

Generous whitespace is part of the "premium/engineered" signal - don't compress sections to fit more in. If content feels sparse, that's a copy problem, not a spacing problem to fix by shrinking margins.

### Layout Rules

- Sharp corners only. `border-radius: 0` on cards, buttons, inputs, badges. This is a deliberate brand rule, not an oversight - rounded corners read "friendly startup," this brand reads "infrastructure."
- Hairline borders (1px, `--hairline` token) over drop shadows. No box-shadow anywhere except the CTA pulse glow described in section 4.
- 12-column grid, desktop. Stack to single column under 768px.
- Buttons: solid fill (primary) or 1px bordered (secondary). No gradient fills, no pill shapes.

---

## 3. Page Structure

Reference `coreline-site-copy-draft.md` for all copy. This section is layout only.

### Home

1. Nav (sticky)
2. Hero
3. Focus strip (marquee of industries served)
4. Service Pillars (3-card grid)
5. Process (Discovery → Build → Operate, connected by line motif)
6. Why Not a Template (split two-panel comparison)
7. Work Teaser (2–3 cards)
8. Founder Section
9. Final CTA band
10. Footer

### Services

1. Nav
2. Header (eyebrow + heading + sub)
3. Pillar 1 - Digital Storefronts (full section, includes list, CTA)
4. Pillar 2 - Client Acquisition Systems (same structure)
5. Pillar 3 - Growth & Operations (same structure)
6. "Not sure which one" bottom CTA
7. Footer

### Work

1. Nav
2. Header
3. Filterable card grid (filter tabs by industry: Clinic / Jeweller / CA / School / Real Estate / All)
4. Bottom CTA
5. Footer

### Contact

1. Nav
2. Header
3. Contact block (WhatsApp / phone / location) + short form, side by side on desktop, stacked on mobile
4. Footer

---

## 4. Section-by-Section Animation Spec

**Governing principle:** one orchestrated load sequence, scroll-reveals that fire once, and 150–200ms linear hovers. Nothing loops forever except two deliberate "alive" signals (marked below). Every animation must have a static `prefers-reduced-motion` fallback - no exceptions.

### Nav

- Sticky on scroll. Hides on scroll-down past 80px, reappears on scroll-up. Transition: `transform 0.25s ease`.
- Logo line-draw animation plays once on first page load only (0.7s, `cubic-bezier(0.65,0,0.35,1)`), not on route changes.

### Hero

Sequenced entrance, not simultaneous - each element fades up (`opacity 0→1, translateY 14px→0`) staggered by ~150ms:

1. Thin horizontal line draws left-to-right above the badge (0.4s)
2. Badge fades in
3. Headline (staggered by line if multi-line, 60ms apart)
4. Subhead
5. CTA buttons
   Total sequence should complete under 1.5s - this is a one-time "curtain up" moment, never repeats on scroll-back.

### Focus Strip

Auto-scrolling horizontal marquee, right to left, continuous loop, slow speed (~40s per full cycle). **This is one of the two intentional infinite loops** - it's meant to feel like a live ticker/status feed. Pauses on hover.

### Service Pillars

Scroll-reveal on entry: fade-up, staggered 80ms per card, fires once. On hover: the card's top hairline border animates from `scaleX(0)` to `scaleX(1)` left-to-right in `--accent` color, 200ms ease-out - reuses the line motif as a hover state, not a new idea.

### Process (Discovery / Build / Operate)

Scroll-linked, not just scroll-reveal: as the section enters and the user scrolls through it, the connecting horizontal line between the three step-nodes fills from left to right proportional to scroll position within the section, and each node transitions from hollow/grey to filled/`--accent` as the fill reaches it. Use `IntersectionObserver` + scroll-position calculation, or a scroll-linked CSS approach (`animation-timeline: view()` if targeting modern browsers, with a JS fallback). This is the clearest literal expression of "coreline" as a system - worth the extra build time.

### Why Not a Template

This is the one section that earns a bigger animation budget - everywhere else stays quiet specifically so this lands by contrast.

- Two-panel split, left labeled "Template," right labeled "System" (or similar).
- Left panel: a flat, static grey horizontal line - literally motionless, like a disconnected monitor flatline. No animation at all on this side - the stillness IS the point.
- Right panel: the same line in `--accent`, animated as a continuous soft pulse/heartbeat-style waveform (a simple sine-like SVG path animating its `stroke-dashoffset`, or a pulsing glow along the line). **This is the second intentional infinite loop.** Slow, ambient, not jarring - should read as "alive," not "urgent."
- No heavy copy needed in this section; let the visual contrast carry the point, copy stays to 1–2 short lines per side.

### Work Teaser / Work Page Grid

- Cards lift on hover: `translateY(-3px)`, 200ms ease.
- Thumbnail/mockup image reveals a "View" label sliding up from the bottom (`translateY(100%)→0`), 200ms ease, on hover.
- On the full Work page: filter tabs with a sliding underline indicator that animates its `left`/`width` to the active tab, 200ms ease - same interaction language as nav.

### Founder Section

Deliberately calm - no motion beyond a standard scroll-reveal fade-up on the whole block. Optionally render the icon mark large and very faint (5–8% opacity) as a static background element behind the text. This section should feel human and still after several "engineered" moments elsewhere on the page.

### Final CTA Band

Full-width `--ink` background. The node/dot next to the heading does a slow breathing pulse: `opacity 0.6→1`, 3s ease-in-out infinite. **This is intentional and subtle** - reads as a system status light that's "on," not as attention-grabbing motion. Keep the amplitude small.

### Contact Page

- Form inputs: default border is a plain hairline; on focus, an underline expands from the center outward (`scaleX(0)→1`, transform-origin center, 200ms ease) in `--accent`, replacing the default browser focus ring.
- WhatsApp button: a soft pulsing ring animation around the icon (box-shadow expanding and fading, 2s loop) to suggest "live, responsive channel." Keep it subtle - this is a third small ambient loop, only introduce it if the page doesn't already feel busy.

---

## 5. Build Notes for Cursor

- Stack: Next.js + Tailwind is recommended given existing MERN/Next.js background - define the tokens above as Tailwind theme extensions (`colors`, `fontFamily`, `spacing`) rather than hardcoding hex/px values inline, so the system stays consistent as pages get added.
- Fonts: load Space Grotesk, Inter, and IBM Plex Mono via `next/font/google` or a self-hosted variant for performance - avoid render-blocking Google Fonts `<link>` tags in production.
- Respect `prefers-reduced-motion: reduce` globally - wrap animation logic in a check, don't just rely on CSS media queries for JS-driven scroll effects (the Process section scroll-link especially).
- Keep the line-and-node SVG as a single reusable component (`<LineNode />` or similar) parameterized by color/length/orientation, since it's reused in the logo, dividers, process section, and hover states - don't redraw it per section.
- Reference the four existing HTML prototypes already built (hero rebuild, style guide, dark variants) for exact CSS values where this document is ambiguous.
