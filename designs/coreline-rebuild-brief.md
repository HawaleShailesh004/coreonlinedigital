# Coreline Digital — Full Site Rebuild Brief

You are rebuilding `corelinedigital.in` from scratch. The existing site is light-themed and is being replaced entirely. Do not reuse any of its code, markup, styles or copy.

Read this entire document before writing any code.

---

## 0. Reference designs — read these first

The `/designs` folder contains nine standalone HTML prototypes. **They are pattern references, not templates.** Do not copy any one of them wholesale. Each contributes one specific technique to the final build, listed below.

Open and study each file before starting. The interactions matter more than the layouts.

| File | Take ONLY this from it |
|---|---|
| `coreline-i-kinetic.html` | Word-by-word reading highlight on scroll. Variable-width display type. Scroll-velocity-reactive marquee. Full-width type "slab" rows that expand on hover. |
| `coreline-h-panels.html` | Full-screen panels that stack with rounded top edges and invert the palette. `mix-blend-mode: difference` nav. Magnetic CTA button. Animated stat bars. |
| `coreline-g-aperture.html` | Circular mask that opens on scroll to reveal a layer beneath. Counter-scrolling columns. Cursor-following hover preview thumbnail. |
| `coreline-f-spotlight.html` | Oversized display type at viewport scale. Pinned stacking cards that scale and dim. Diagonal accent marquee. |
| `coreline-e-signal.html` | Sticky-visual scrollytelling (copy steps on one side driving a visual on the other). Glass card treatment. |
| `coreline-b-deepfield.html` | Emerald used as an ambient light source (radial glow) rather than as borders. Generous vertical rhythm. |
| `coreline-d-assembly.html` | Scroll-scrubbed multi-state sequence. Horizontal track driven by vertical scroll. |
| `coreline-a-bracket.html` | The bracket corner mark as a repeating UI device, derived from the logo. |
| `coreline-c-console.html` | Reference only. Do not use its aesthetic. |

**Ignore all copy in the reference files that mentions prices, rupee amounts, day counts, delivery timelines, client results, percentages, or testimonials.** Those were exploratory. The authoritative copy is in this document.

---

## 1. Project context

Coreline Digital is a two-person digital studio in Wagle Estate, Thane, serving small businesses across Thane and Mumbai. Services: websites, AI agents, automations, local search, mobile apps, CRM and custom software, branding, social content.

**The audience is not designers or developers.** It is shop owners, clinic owners, gym owners, CAs and traders, aged roughly 30–60, arriving on a mid-range Android phone over mobile data, often immediately after a cold call. Every design decision defers to that person.

**The studio has no clients yet apart from one.** This constrains the entire content strategy. See §9.

---

## 2. Tech stack

- **Next.js 15**, App Router, TypeScript
- **Tailwind CSS** with the design tokens in §3 defined as CSS custom properties and exposed through the Tailwind theme
- **Framer Motion** for entrance and state animation
- **Lenis** for smooth scroll
- Native `IntersectionObserver` and `requestAnimationFrame` for scroll-driven effects. Do not add GSAP unless a specific effect genuinely cannot be built without it.
- **No 3D. No Three.js, no React Three Fiber, no Spline.**
- Content in local MDX or typed TS objects. No CMS at this stage.
- Deploy to Vercel.

---

## 3. Design tokens

### Colour

```
--ink            #060A08   page base (green-tinted black, NOT neutral black)
--surface        #0D1211   cards, inputs
--raised         #141A18   hover states, elevated panels
--line           rgba(239,237,230,.12)   all borders

--bone           #EFEDE6   primary text (warm white, NEVER pure #FFF)
--muted          #868D89   secondary text

--emerald        #12E68E   the single accent
--emerald-glow   rgba(18,230,142,.16)   radial washes only

--forest         #07281C   inversion panel, bone text on it
--bone-panel     #EFEDE6   inversion panel, ink text on it
```

**One accent colour only.** Visual variety comes from panel inversion, not from additional hues. Do not introduce a second accent.

### Typography

- **Display: Archivo** (variable, width axis 62–125, weight 400–800). Headings, nav, buttons, service names.
- **Body: Inter Tight**, weights 400 and 500 only.
- **No third typeface. No monospace anywhere.**

Type scale: use a clear modular scale. Display sizes use `clamp()`. Tracking tightens as size increases (roughly `-0.02em` at 40px down to `-0.045em` at 150px).

### Layout

- Max width 1240px, 30px gutters, 24px on mobile
- Border radius: 0 or 2px on small elements. The only exception is the 26px top radius on stacking panels and 100px on pill buttons.
- Hairline borders, never shadows, except the shadow beneath stacking panel edges.

---

## 4. Motion budget — a hard rule

**Homepage: exactly three motion moments. Every other page: exactly two, or one where stated.**

A "motion moment" is a scroll-driven or orchestrated effect. Hover states, panel inversions, and simple entrance fades do not count.

Anything not listed as a motion moment in the page specs below is **static**. This restraint is what separates the result from a showreel. Do not add effects because a reference file contains them.

All motion must:
- Respect `prefers-reduced-motion: reduce` with a genuine static fallback, not just a shorter duration
- Run at 60fps on a mid-range Android
- Degrade to static on viewports under 768px where the effect depends on a cursor

---

## 5. CTA system — one decision, applied everywhere

- **Primary: `WhatsApp us`** — emerald filled pill. Identical label site-wide.
- **Secondary: `Call us`** — outline pill.
- **Mobile: sticky bottom bar** with both halves, appearing once the user scrolls past the hero. This is required on every page.
- **Desktop: floating call and WhatsApp bubbles**, bottom right, persistent.

**No contact forms anywhere on the site. No email capture, no newsletter, no calendar embed, no "download our guide".** The audience wants to talk now.

---

## 6. Component inventory

Build these once and reuse. Nothing on the site should exist outside this list.

1. `Nav` — fixed, `mix-blend-mode: difference` so it inverts against panels automatically
2. `StickyMobileCTA`
3. `FloatingContactBubbles`
4. `DisplayHeading` — Archivo, size and width-axis props
5. `ReadingHighlight` — paragraph whose words light from `#26251F` to bone on scroll, with key words landing in emerald
6. `Panel` — wrapper with variants `ink | forest | bone | emerald`, handles the stacking sticky behaviour and rounded top edge
7. `ServiceSlab` — full-width row, name expands from condensed to extended Archivo on hover
8. `DemoCard` — mockup image, title, trade, status badge
9. `IndustryTile`
10. `ApertureReveal` — sticky section, circular mask opening on scroll progress
11. `StepRow` — static numbered step
12. `TeamCard` — portrait, name, discipline, per-person call and WhatsApp buttons
13. `FAQAccordion`
14. `ContactPanel` — the emerald closing block, identical on every page
15. `Footer`
16. `ChatWidget`

---

## 7. Chat widget

Bottom-right bubble on every page. Opens automatically after 20 seconds, or when the user scrolls past the services section, whichever is first. Dismissible and stays dismissed for the session.

It has two jobs simultaneously:

1. Answer questions about Coreline — what we build, what we work with, roughly what things cost, how to get started.
2. **Be the product demo.** Header text: *"This is the same kind of agent we build for clients."* With a link: *"Want one for your business?"* → WhatsApp.

Three tappable starter prompts so nobody has to type:
- `What do you build?`
- `Do you work with my trade?`
- `Talk to a human` → opens WhatsApp with a summary of the conversation pre-filled

---

## 8. Sitemap

**Build at launch:**
```
/                      Home
/demos                 Demos
/services              Services hub
/industries            Industries hub
/about                 About
/contact               Contact
/privacy  /terms  404
```

**Build after launch, one per week:**
```
/industries/jewellers
/industries/clinics
/industries/gyms
/industries/chartered-accountants
/services/websites
/services/ai-agents
/services/automations
```

**Do not build:** a pricing page, a standalone process page, a blog, or a testimonials page. Do not create empty placeholder routes for them.

---

## 9. Content rules — non-negotiable

The studio is new. These rules protect it.

- **Never state or imply a price.** No rupee figures, no "starting from", no package tiers.
- **Never state a delivery timeline.** No day counts, no "in X weeks".
- **Never invent clients, logos, testimonials, or results.** No percentages, no multipliers, no "3.1× enquiries".
- **Demo work must be labelled as demo work.** Badge `Demo build` in muted grey. Only MNK Jewels carries the `Live` badge in emerald.
- **Never claim a team larger than two.** Use "we" and "our studio". Use disciplines, not inflated titles: "Design & Engineering", not "Founder & CEO".
- No stat counters unless the number is verifiably true today (e.g. "8 services", "9 trades covered").

---

## 10. Page specifications

### 10.1 Home `/`

Scroll rhythm: loud → quiet → loud → quiet → loudest.

**1. Nav** — see components.

**2. Hero** — full viewport, ink, centred. **Motion moment 1.**

Reference the oversized centred type in `coreline-f-spotlight.html` and the cut-out treatment approach.

Three lines, Archivo, tight tracking:
```
WE BUILD WHAT
YOUR BUSINESS
IS MISSING
```
Line 3 is a **cut-out**: the letters are transparent (`background-clip: text`) and a slowly drifting emerald gradient field shows through them. Lines 1 and 2 are solid bone.

Buttons directly below, centred: `WhatsApp us` · `Call us`

Paragraph below the buttons (not above), centred, narrow measure, muted:
> Websites, AI agents, automations and search. One team for everything your business needs online, across Thane and Mumbai.

Motion: three lines reveal on load with an upward mask, ~90ms apart. The gradient behind the cut-out drifts continuously. Nothing else.

**3. Industry ticker** — thin band, hairline top and bottom, scrolling left, speed reacting to scroll velocity (see `coreline-i-kinetic.html`). Muted text, emerald separators.
> Jewellers / Clinics / Gyms / Real estate / Schools / Chartered accountants / Interior designers / Travel agencies / Traders

**4. Statement** — ink, large vertical padding, one paragraph, 20ch measure. **Motion moment 2** — the reading highlight.
> Most businesses here are **invisible** online. Not because they're bad at what they do, but because nobody **built** them a thing that **works**.

Bold words land in emerald. Nothing else in this viewport.

**5. Services — forest panel.** First inversion.
> **Eight services. One team. No handoffs.**
> The people who design it are the people who ship it, rank it, and pick up the phone when it breaks.

Eight `ServiceSlab` rows, hairline separated, each linking to its service page:

- **Websites** — Hand-built and fast on mobile data. Made to turn visitors into calls.
- **AI agents** — Trained on your services and timings. Answers and books while you sleep.
- **Automations** — Confirmations, reminders and review requests that send themselves.
- **Local search** — Found by the people already searching for what you sell nearby.
- **Apps** — Android and iOS, for when a website genuinely isn't enough.
- **CRM & software** — Custom tools shaped around how your business already runs.
- **Branding** — Logo, palette, cards, signage. One face everywhere.
- **Social content** — Monthly graphics and reels, handled on retainer.

**6. Aperture** — ink, sticky ~250vh. **Motion moment 3.** Circular mask opens from centre on scroll, thin ring outline on top. Revealed:
> **Your customers are searching right now.**
> They're typing your service and your area into Google today. We make sure the result they tap belongs to you.

**7. Demos — bone panel.** Second inversion. Dark mockups on the light field.
> **We haven't built for you yet. So we built one for your trade already.**
> Complete demo sites for the businesses we work with. Open them on your phone and judge for yourself.

Three `DemoCard`s: MNK Jewels (`Live`), a clinic (`Demo build`), a gym (`Demo build`). Link: `See all nine demos →`

**8. How we work** — ink, static, no animation. Four steps, horizontal on desktop.
1. **We talk** — One call. What you sell, who buys it, what the site has to do.
2. **We plan** — You get a structure and a direction, not a mood board.
3. **We build** — Design first, then code, then the agents and automations wired in.
4. **We run it** — Live on your domain, on Google, and kept fast after launch.

**9. Meet the team** — ink, static.
> **Who you'll actually be working with.**
> We started Coreline because every business we knew was paying three vendors and getting one bad website. So we do all of it ourselves, and you always know who is holding your project.

Two `TeamCard`s side by side, identical portrait treatment. Grid is three columns with the third slot absent, so a third person can be added later without changing the layout.

**10. FAQ** — ink, four items, first open.
- **What does it cost?** — Depends on how much you need. We'll give you a number on the first call, not after three meetings.
- **Who owns the website?** — You do. Domain, hosting, code, all in your name from day one.
- **Do you actually build the AI agents, or resell a widget?** — We build them, trained on your own content. There's one on this page. Ask it something.
- **We already have a website.** — Then open it on your phone and time it. If it's slow, hard to edit, or nobody calls from it, that's what we fix.

**11. Contact — emerald panel.** Third inversion, highest contrast screen on the site.
> **Let's talk.**
> Tell us what you sell. We'll show you what it should look like.

One magnetic button `WhatsApp us` (ink pill on emerald). Below, small: `or call +91 XXXXX XXXXX`

**12. Footer.**

---

### 10.2 Demos `/demos`

The most important page on the site. It carries all credibility.

**Compact hero (~55vh) — bone panel, ink text.** Deliberately inverted from the rest of the site: this is a gallery, so it is lit.
```
NINE DEMOS.
ONE OF THEM IS YOURS.
```
> We build a complete site for a trade before anyone asks. Open them on your phone, then tell us what you'd change about your version.

**Honesty block** — directly beneath, small, muted. Do not bury this.
> Most of these are demo builds, not client work. We're a new studio and we'd rather show you finished work we made than pretend we have clients we don't. MNK Jewels is live and in use.

**Gallery** — three columns on bone, dark mockups, status badges. **Motion moment 1 (and only)** — staggered fade on entry. No parallax. The images are the design.

**Case detail** — one block per demo, ~150 words: what the trade needs, what we built, one thing we'd do differently, link to open it.

**What we'd build for you** — ink panel, three static steps.

**Contact panel.**

---

### 10.3 Services `/services`

**Compact hero — ink, left-aligned** (centred type is the homepage's signature; do not repeat it).
```
EIGHT SERVICES.
ONE TEAM.
```
> Everything your business needs online, built and run by the same people. Nothing gets handed off, and nothing gets lost between vendors.

**Sticky index + detail scroll — motion moment 1.** Pattern from `coreline-e-signal.html`. Desktop: left column is a sticky list of all eight service names pinned at viewport centre; right column scrolls eight detail blocks. As each block enters, its name in the index goes muted → bone with an emerald rule sliding in. Mobile: index collapses to a horizontal chip row pinned under the nav, auto-scrolling the active chip into view.

Each detail block: name, one-sentence promise, four "what's included" lines (hairline-separated, not bulleted), one "for:" line, link to the child page.

Full copy for all eight blocks:

**Websites** — A site that loads fast and turns visitors into phone calls.
Design and build from scratch · Mobile-first, tested on real budget phones · Copy written for your customers · Google Business set up properly · You own the domain, hosting and code
*For: any business whose current site is slow, dated, or doesn't exist.*

**AI agents** — A chat assistant trained on your business that answers when you can't.
Trained on your services, timings and pricing · Works on your site and on WhatsApp · Captures names and numbers automatically · Hands off to a human when it should · Learns from what people actually ask
*For: businesses losing enquiries after hours or during rush.*

**Automations** — The follow-ups nobody has time to send, sent automatically.
Booking and order confirmations · Appointment reminders · Review requests after a visit · Invoice and payment follow-ups · Enquiries logged in one place
*For: anyone still doing this manually on WhatsApp.*

**Local search** — Show up when someone nearby searches for what you sell.
Google Business profile fixed and maintained · A page per service and per area · Technical fixes: speed, structure, indexing · Review strategy · Monthly report in plain language
*For: businesses invisible on Google despite being good at the job.*

**Apps** — Android and iOS, when a website genuinely isn't enough.
Native or cross-platform · Store listing and submission handled · Push notifications · Backend and admin panel · Updates and maintenance
*For: businesses with repeat customers who need to log in, order or track.*

**CRM & software** — Custom tools shaped around how your business already runs.
Enquiry and lead tracking · Inventory or catalogue systems · Staff and scheduling tools · Reporting dashboards · Built to replace the spreadsheet you've outgrown
*For: businesses where the process lives in someone's head or in one huge Excel file.*

**Branding** — One consistent face, everywhere someone meets you.
Logo and marks · Colour and typography system · Business cards and stationery · Signage and hoardings · Packaging and labels
*For: businesses whose logo looks different on every surface it appears.*

**Social content** — Monthly graphics and reels, so it stops being your problem.
Content calendar · Post and story graphics · Short-form video edits · Festival and offer creatives · Captions in Hindi or English
*For: businesses who post once, get nothing, and give up.*

**Bundles — forest panel. Motion moment 2** — three cards revealing in sequence as the panel enters.
> **Most businesses need three of these, not one.**
> Here's how they usually go together.

- **Get found** — Website + Local search + Branding. For businesses nobody can find yet. We build the thing, then make sure Google shows it.
- **Get booked** — Website + AI agent + Automations. For businesses losing enquiries to slow replies. The site answers, books and follows up on its own.
- **Get organised** — CRM + Automations + Apps. For businesses where the process has outgrown WhatsApp and Excel.

Each card ends with `WhatsApp us`. No prices, no tier names.

**Statement** — ink, static, one line, narrow measure:
> **We'd rather do four things properly than eight things badly. So the same two people do all of it, and we tell you when something isn't worth building.**

**Demos strip — bone panel**, three cards, link to `/demos`.

**FAQ** — four, services-specific:
- **Can we start with just one thing?** — Yes, and most people should. Start with the website, add the rest once it's earning.
- **Do you work with what we already have?** — Usually. If your site is on WordPress or Shopify and it's salvageable, we'll say so instead of selling you a rebuild.
- **What do you build things with?** — Modern frameworks, hosted properly, no page builders stacked with plugins. You get the code.
- **Who looks after it afterwards?** — We do, if you want us to. If you don't, everything is in your name and you can take it anywhere.

**Contact panel.**

---

### 10.4 Industries `/industries`

**Compact hero — ink, left-aligned.**
```
WE'VE ALREADY BUILT
ONE FOR YOUR TRADE.
```
> Nine businesses, nine complete demo sites. Find yours, open it on your phone, and tell us what you'd change.

**Counter-scroll grid — motion moment 1.** Pattern from `coreline-g-aperture.html`: two columns drifting against each other, nine tiles, each with trade name, one line, and a dark mockup thumbnail. Hover lifts and brightens. **Single static column on mobile, no parallax.**

Jewellers · Clinics & doctors · Gyms · Real estate · Schools & classes · Chartered accountants · Interior designers · Travel agencies · Traders & wholesalers

**What's the same everywhere — forest panel**, four static rows.
> **Different trades. Same four problems.**
- **Nobody can find you.** You're not in the local results, or your listing is half-empty.
- **The site is from 2016.** Slow on a phone, impossible to edit, and nobody calls from it.
- **Enquiries arrive and die.** They come at 10pm on WhatsApp and get answered at noon.
- **Everything lives in one head.** The process, the prices, the follow-ups. Nothing written down.

**What changes per trade** — ink, quiet, three short paragraphs on how a jeweller needs a catalogue and trust signals, a clinic needs appointments and credentials, a gym needs trial bookings and late-night answers.

**Demos strip — bone panel.** **Contact panel.**

---

### 10.5 About `/about`

**Compact hero — ink.**
```
TWO PEOPLE.
NO HANDOFFS.
```

**Why we started** — ink, single column, 60ch measure. **Motion moment 1** — reading highlight on these paragraphs.
> Every business we knew was paying three vendors and getting one bad website. A designer who left after launch. A developer who couldn't be reached. An SEO agency sending reports nobody read.
>
> So we do all of it ourselves. Design, code, search, automation. It's more work, but there's nobody left to blame, and you always know who's holding your project.
>
> We're based in Wagle Estate and we work with businesses across Thane and Mumbai. Most of our clients we've met in person.

**The team** — ink, static. Two large portraits, identical treatment. Name, discipline, one line, per-person call and WhatsApp buttons. Third grid slot left empty for future.

**How we work — forest panel.** The four steps from the homepage.

**What we won't do** — ink, quiet, four lines:
> We won't sell you an app when a website will do. We won't lock your domain or hosting in our name. We won't send a report you need us to explain. We won't disappear after launch, because we're the ones running it.

**Contact panel.**

---

### 10.6 Contact `/contact`

Single full-viewport emerald panel, ink text, centred. No scrolling required.
> **Let's talk.**
> Tell us what you sell. We'll show you what it should look like.

`WhatsApp us` (large, magnetic, ink pill) · `Call +91 XXXXX XXXXX`

Below, small and quiet: Wagle Estate address, static map thumbnail, hours you'll actually answer.

**No form.**

---

### 10.7 Child page template (build later)

Same skeleton for all industry and service child pages:
1. Compact hero — H1 is the literal search phrase (e.g. "Websites for jewellers in Thane")
2. What we notice about this trade / the problem — four or five specific sentences
3. The demo, full width, bone panel, with `Open the live demo`
4. What we'd build for you — five or six trade-specific lines
5. Two related links sideways
6. FAQ, three items
7. Contact panel

**Motion budget on child pages: one moment maximum.**

---

## 11. Performance and accessibility

Non-negotiable, tested on a throttled 4G mobile profile:

- LCP under 2.5s, CLS under 0.1, INP under 200ms
- Total JS on the critical path under 120KB gzipped
- Fonts self-hosted, `woff2`, `font-display: swap`, preloaded, subset to Latin
- All images `next/image`, AVIF/WebP, explicit dimensions, lazy below the fold
- Every scroll effect throttled through `requestAnimationFrame`, never a raw scroll handler
- `prefers-reduced-motion` honoured with a real static fallback
- Visible keyboard focus on every interactive element
- Semantic headings, one `h1` per page, real landmarks
- Colour contrast: bone on ink and ink on emerald both pass AA. Muted text is only used at 15px+.

**Test on a real mid-range Android before considering any page done.** The laptop is not the target device.

---

## 12. SEO

- Per-page `title` and `description`, written for humans
- OG image per page; the homepage OG uses the cut-out hero lockup
- `LocalBusiness` JSON-LD with the Wagle Estate address, phone and hours
- `FAQPage` JSON-LD on pages with FAQ sections
- Sitemap and robots
- Child pages target real search phrases in the H1 and title

---

## 13. Build order

1. Design tokens, Tailwind config, fonts, base layout, Nav, Footer, ContactPanel, StickyMobileCTA
2. Home
3. Demos
4. Services hub
5. Industries hub
6. About
7. Contact, Privacy, Terms, 404
8. Chat widget
9. Child pages, one at a time

---

## 14. Placeholders to leave clearly marked

- `+91 XXXXX XXXXX` — phone number
- Second team member's name, discipline and one-line description
- Both portrait photographs
- The nine demo mockup PNGs (supplied separately) — wire the components to a typed data file so swapping them is trivial

---

## 15. Do not

- Do not copy any `/designs` file wholesale
- Do not add a motion effect that isn't specified in the page spec
- Do not introduce a second accent colour, a third typeface, or a monospace face
- Do not use pure black or pure white anywhere
- Do not add 3D, WebGL, or a physics library
- Do not add a contact form, newsletter, or calendar embed
- Do not state prices, timelines, client names, testimonials or performance statistics
- Do not use `localStorage` or `sessionStorage` for anything load-bearing
- Do not ship a section that only works with a cursor without a mobile equivalent

---

## 16. When you're done

Report back with: Lighthouse mobile scores for every page, the total JS bundle on the homepage, a list of every placeholder still unfilled, and a list of anything in this brief you deviated from and why.
