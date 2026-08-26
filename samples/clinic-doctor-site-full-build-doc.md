# Sample Site Build Doc - Clinic / Doctor (Multi-Page)

Reference: builds on `sample-1-clinic-doctor.md` (positioning, palette, hero copy already defined there - extend, don't rewrite).
No chatbot/automation demo on this one by design - this sample proves calm, trustworthy design and clear booking flow instead.

---

## 1. Sitemap

1. **Home** - `/`
2. **Services** - `/services`
3. **Doctor / About** - `/doctor`
4. **Book Appointment** - `/book`
5. **Contact** - `/contact`

Global: sticky nav (soft, not heavy), footer, no floating chat widget on this site - keep it calm, consistent with the "restraint" design principle from the original doc.

---

## 2. Design Tokens (reuse - do not redesign)

```css
--bg: #fafbfa;
--ink: #1c2b2a;
--primary: #3d8b7d; /* muted teal-green */
--accent: #e8a13f; /* warm amber - CTA emphasis only */
--grey: #6b7873;
--hair: rgba(28, 43, 42, 0.1);
```

Fonts: Poppins/Manrope (display, rounded is fine here), Inter (body, generous line-height). Rounded corners (8-12px) - deliberate exception to Coreline's own sharp-corner house rule, per the original doc's reasoning.

---

## 3. Page-by-Page Content

### Home (`/`)

Reuse hero, services teaser (3-4 cards, link to `/services`), Why Book Online strip, doctor teaser (photo + 1 line, link to `/doctor`), final CTA.

### Services (`/services`)

**Header:** "Care, explained simply."
Full list of services (General Consultation, Diagnostics & Tests, Follow-up Care, plus any others relevant), each with:

- Name, 2-3 sentence plain-English description
- What to expect / how to prepare, if relevant (builds trust for anxious patients)
- "Book this service" CTA per item, routes to `/book` pre-selected

### Doctor / About (`/doctor`)

**Header:** "Meet Dr. [Name]"
Full bio: qualifications, years of practice, philosophy of care, one human detail. Larger photo than the Home teaser. Optional: a short "why I practice" quote block, styled distinctly (soft background, larger italic-style text) to add warmth.

### Book Appointment (`/book`)

This page's entire job is frictionless booking:

- Simple form: Name, phone, preferred service (dropdown, pre-fillable from Services page links), preferred date/time
- Confirmation state after submit: "We'll confirm your slot on WhatsApp within a few hours" - reinforces the same "never left hanging" story as your other samples, just via a human process here rather than an AI agent, since a solo clinic realistically confirms manually
- No payment collection needed for a demo

### Contact (`/contact`)

Map embed, address, phone, WhatsApp button, clinic hours table (as a clean table, not paragraph text - parents/patients scan this quickly).

---

## 4. Reusable Components

- `<Nav />` - sticky, soft shadow instead of hard border on scroll (matches the calm tone)
- `<Footer />` - hours, address, "Built by Coreline Digital" credit
- `<ServiceCard />` - used on Home (teaser) and Services (full), `variant` prop
- `<CTAButton />` - primary (teal fill, rounded) / secondary (bordered, rounded)
- `<BookingForm />` - Book Appointment page, accepts an optional `preselectedService` prop for pre-filling from Services page links
- `<HoursTable />` - Contact page
- `<QuoteBlock />` - Doctor page, styled distinctly for the "why I practice" note

---

## 5. Animation Notes (page-specific, beyond the base spec in `sample-1-clinic-doctor.md`)

- Services page cards: gentle fade-up on scroll, staggered - same calm pace as the original doc specifies, no snappy transitions anywhere on this site.
- Booking form: on successful submit, a simple, warm confirmation state (soft checkmark icon, gentle scale-in, no confetti or flashy celebration - stay calm even in the success state).
- Doctor page quote block: fades in slightly after the bio text, subtle delay (200ms) to draw a second look without feeling mechanical.
- No scroll-linked effects, no marquees, no parallax anywhere on this site - restraint is the entire design signal, repeated intentionally across every page.

---

## 6. Cursor Build Guide

- **Stack:** Next.js (App Router) + Tailwind, same base stack as the other two samples for consistency across your own tooling.
- **Folder structure suggestion:**
  ```
  /app
    /services/page.tsx
    /doctor/page.tsx
    /book/page.tsx
    /contact/page.tsx
    page.tsx (Home)
    layout.tsx (Nav, Footer)
  /components
    Nav.tsx, Footer.tsx, ServiceCard.tsx, CTAButton.tsx,
    BookingForm.tsx, HoursTable.tsx, QuoteBlock.tsx
  ```
- No API routes needed for this site - no chatbot, no live backend. The `/book` form can submit to a simple mock success state, or wire to a real form-to-WhatsApp/email service (e.g. Formspree-style) if you want it to be a genuinely working lead-capture demo.
- This is the simplest of the three builds technically - prioritize photography and copy polish here over any engineering complexity, since calm and trustworthy design IS the entire pitch for this vertical.
