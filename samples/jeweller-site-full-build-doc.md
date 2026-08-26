# Sample Site Build Doc — Jeweller (Multi-Page)
Reference: builds on `sample-2-jeweller.md` (positioning, palette, hero copy already defined there — extend, don't rewrite). Also the natural "flagship evolution" of the existing MNK Jewels work — reuse real photography direction from there where possible.

---

## 1. Sitemap
1. **Home** — `/`
2. **Collections** — `/collections` (category-level browsing)
3. **Craftsmanship / Our Story** — `/craftsmanship`
4. **Custom Design** — `/custom`
5. **Visit / Contact** — `/contact`

Global: sticky nav (transparent over hero, solid on scroll), footer, no floating chat widget — this vertical closes in person or on WhatsApp directly, not through an on-site bot, per the original doc's reasoning.

---

## 2. Design Tokens (reuse — do not redesign)
```css
--bg:      #0F0D0A;
--paper:   #F7F1E5;
--gold:    #C9A55C;
--gold-2:  #8A6B33;
--text:    #EDE6D8;
--hair:    rgba(237,230,216,0.12);
```
Fonts: Fraunces/Playfair Display (serif, hero + section headers only), Inter (body). Dark background throughout, gold gradient text used sparingly. Full-bleed photography is the primary design element — see original doc for detailed reasoning.

---

## 3. Page-by-Page Content

### Home (`/`)
Reuse hero, collections teaser (4-6 category cards, link to `/collections`), craftsmanship/story teaser (link to `/craftsmanship`), custom design CTA (link to `/custom`), visit/contact final CTA.

### Collections (`/collections`)
**Header:** "Every collection, one story."
Full category browsing: Bridal · Gold Traditional · Diamond · Custom Design (as a link-out) · any others relevant. Each category as a large image-led section (not a dense product grid — this stays editorial, not e-commerce). No prices anywhere. Optional: a lightbox/expanded view on click for a closer look at pieces, still no "buy" action — every path leads to WhatsApp or Visit.

### Craftsmanship / Our Story (`/craftsmanship`)
**Header:** "Every piece has a story before it has an owner."
Full narrative: showroom history, materials sourcing, hand-finishing process, family legacy if relevant. This page is the #1 trust-builder for the "is this authentic" objection — give it real room, 4-5 short sections rather than a single paragraph, each with a supporting photo (workshop, materials, finished piece close-up).

### Custom Design (`/custom`)
**Header:** "Bring an idea. Leave with a piece."
Process steps: Share Your Idea → Design Consultation → Crafting → Reveal & Fitting. Include a simple upload/reference field in the enquiry form ("attach a photo or sketch if you have one") — this page exists to remove the intimidation of "I don't know how to ask for something custom."

### Visit / Contact (`/contact`)
Showroom photo, address, map, hours, WhatsApp + call buttons. Optional: "Book a private viewing" as a distinct CTA from general enquiry — reinforces the premium, appointment-worthy feel of the brand.

---

## 4. Reusable Components
- `<Nav />` — transparent-over-hero, solid on scroll, gold underline on active link
- `<Footer />` — logo, hours, socials, "Built by Coreline Digital" credit (small, unobtrusive — this footer should stay quiet on a luxury site)
- `<CollectionCard />` — large image-led card, used on Home teaser and Collections page, `variant` prop for size
- `<CTAButton />` — gold gradient fill (primary) / bordered gold (secondary), sharp corners on buttons only
- `<StorySection />` — reusable full-bleed image + text block, used repeatedly on Craftsmanship page
- `<CustomOrderForm />` — Custom Design page, includes optional file/photo attachment field
- `<Lightbox />` — optional, for expanded collection image viewing

---

## 5. Animation Notes (page-specific, beyond the base spec in `sample-2-jeweller.md`)
- Collections page: each category section fades + slightly scales in as it scrolls into view (image starts at 1.03 scale, settles to 1.0), consistent with the original doc's "slide toward you" concept — apply this to every full-bleed section, not just the homepage teaser.
- Craftsmanship page: text blocks fade in slightly after their accompanying image, small delay (150-200ms), giving a slow, considered reading pace appropriate to the story being told.
- Custom Design process steps: connected by a slow-drawing gold line as the section scrolls into view, mirroring the process-line pattern used elsewhere in your work but styled in gold.
- Keep everything slow and deliberate on every page — this is a house rule for this vertical specifically, never introduce a snappy/app-like transition anywhere on this site.

---

## 6. Cursor Build Guide
- **Stack:** Next.js (App Router) + Tailwind, consistent with your other builds.
- **Folder structure suggestion:**
  ```
  /app
    /collections/page.tsx
    /craftsmanship/page.tsx
    /custom/page.tsx
    /contact/page.tsx
    page.tsx (Home)
    layout.tsx (Nav, Footer)
  /components
    Nav.tsx, Footer.tsx, CollectionCard.tsx, CTAButton.tsx,
    StorySection.tsx, CustomOrderForm.tsx, Lightbox.tsx (optional)
  ```
- No chatbot, no cart/checkout, no pricing anywhere — all of these are deliberate exclusions for this vertical, not gaps to fill in later.
- Photography is the single highest-leverage investment on this build — prioritize sourcing or generating strong, consistent studio-lit product shots over any additional feature work.
