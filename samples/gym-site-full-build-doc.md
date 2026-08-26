# Sample Site Build Doc - Gym / Fitness Studio (Multi-Page)

Reference: builds on `sample-7-gym.md` (positioning, palette, hero copy already defined there - don't rewrite, extend).
This doc expands that one-pager into a full demoable multi-page site + specifies the live chatbot integration.

---

## 1. Sitemap

1. **Home** - `/`
2. **Programs** - `/programs`
3. **Membership** - `/membership`
4. **Trainers** - `/trainers`
5. **Contact / Book Trial** - `/contact`

Global: sticky nav, footer, floating chatbot widget (bottom-right, all pages).

---

## 2. Design Tokens (reuse - do not redesign)

```css
--ink: #101010;
--paper: #f4f3ef;
--primary: #e13b3b; /* red - energy, CTAs */
--accent: #d4ff3f; /* electric lime - small highlights only, never large fills */
--grey: #a6a6a0;
--hair: rgba(255, 255, 255, 0.1);
```

Fonts: Display - Archivo Black / Anton / Space Grotesk (bold). Body - Inter. Corners sharp, high contrast, tight energetic spacing (see original doc for full rationale).

---

## 3. Page-by-Page Content

### Home (`/`)

Reuse hero, programs teaser (4 cards, link to `/programs`), Why Train Here strip, trainers teaser (2-3 photos, link to `/trainers`), final CTA. All copy already exists in `sample-7-gym.md` - port directly.

### Programs (`/programs`)

**Header:** "Train the way that actually works for you."
Full breakdown per program (Strength / Group Classes / Personal Training / Nutrition Coaching):

- Program name + full description (3-4 sentences)
- **Class schedule table** for Group Classes specifically (day × time × class type) - this table is a strong candidate for the chatbot to reference/answer questions about
- "Book a trial for this program" CTA per section

### Membership (`/membership`)

**Header:** "Simple pricing. No surprise renewals."
3-tier comparison table (Basic / Standard / Premium) - price, included classes, PT sessions, access hours. Add an FAQ strip below: "Can I pause my membership?", "Is there a joining fee?", etc. - these FAQ answers should also be fed into the chatbot's knowledge.

### Trainers (`/trainers`)

Grid of trainer cards: photo, name, specialization, 2-3 sentence bio, certifications. Optional: "Book a session with [Trainer]" CTA per card, routes to Contact form pre-filled with trainer name.

### Contact / Book Trial (`/contact`)

Trial booking form (Name, phone, preferred program, preferred time slot), map embed, WhatsApp button, hours table. This page's form is the "real" conversion action - keep it short, 4 fields max.

---

## 4. Reusable Components (build once, reuse across pages)

- `<Nav />` - sticky, links to all 5 pages, mobile hamburger
- `<Footer />` - logo, hours, socials, "Built by Coreline Digital" credit
- `<ChatWidget />` - floating button + expandable chat panel, present on every page (see Section 6)
- `<ProgramCard />` - used on Home (teaser) and Programs (full) with a `variant` prop (`compact` | `full`)
- `<PricingTable />` - Membership page
- `<TrainerCard />`
- `<CTAButton />` - primary (red fill) / secondary (bordered) variants, used everywhere
- `<BookingForm />` - Contact page, reusable if a trainer-specific pre-fill is needed

---

## 5. LIVE Chatbot Integration - build spec

**Component:** `<ChatWidget />`, floating bottom-right, opens a panel on click. Persistent across all 5 pages (mount at layout level, not per-page).

**Backend:** a single serverless API route (e.g. `/api/chat`) calling the LLM API with a fixed system prompt for this site. Keep the API key server-side only - never expose it client-side.

**System prompt scope (assemble from actual page content above, so answers stay accurate):**

- Class timings - pull from the Programs page schedule table
- Membership pricing and FAQ - pull from the Membership page
- Trial booking - collects name + phone + preferred time conversationally, then instructs the user "We'll confirm on WhatsApp shortly" (no real backend booking needed for a demo - a convincing scripted confirmation is enough)
- Anything outside scope → "For that, let me connect you with our team - can I get your number?"

**UI notes:** chat bubble styled in the site's own palette (dark background, red accent for the user's own message bubbles, light grey for bot responses) - should look native to this site, not like a generic embedded widget.

**Demo instruction (for cold calls):** open `/contact` or any page, click the chat icon, type "What time is the evening HIIT class?" live - this is the single most important moment of the demo.

---

## 6. Animation Notes (page-specific, beyond the base spec in `sample-7-gym.md`)

- Programs page schedule table: rows fade in staggered as the section scrolls into view.
- Membership pricing numbers: count-up animation on scroll into view (already specified in base doc - apply here too).
- Trainer cards: fast hover lift (120ms), consistent with the site's energetic pace.
- Chat widget: button pulses gently (opacity 0.7→1, 3s loop) to draw attention without being obnoxious - this is the site's one "come talk to me" ambient signal.

---

## 7. Cursor Build Guide

- **Stack:** Next.js (App Router) + Tailwind, matching the main Coreline site's stack for consistency across your own tooling.
- **Folder structure suggestion:**
  ```
  /app
    /programs/page.tsx
    /membership/page.tsx
    /trainers/page.tsx
    /contact/page.tsx
    /api/chat/route.ts
    page.tsx (Home)
    layout.tsx (Nav, Footer, ChatWidget mounted here)
  /components
    Nav.tsx, Footer.tsx, ChatWidget.tsx, ProgramCard.tsx,
    PricingTable.tsx, TrainerCard.tsx, CTAButton.tsx, BookingForm.tsx
  /lib
    chatSystemPrompt.ts  (keep the prompt text in one file, easy to tune)
  ```
- Define the color tokens as Tailwind theme extensions (`tailwind.config`), not hardcoded hex - keeps this site's palette isolated from Coreline's own brand tokens if both projects ever share a component library.
- This is a **demo/portfolio site, not a production client deliverable** - real booking backend, payment, and CRM integration are NOT needed. Scripted/convincing responses are sufficient everywhere except the visual design, which should be full-quality.
