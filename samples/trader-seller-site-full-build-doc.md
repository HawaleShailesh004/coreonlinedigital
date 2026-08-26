# Sample Site Build Doc — Trader / Seller D2C Brand (Multi-Page)
Reference: builds on `sample-9-trader-seller.md` (positioning, palette, hero copy already defined there — extend, don't rewrite).
This is your dedicated e-commerce showcase, with a live chatbot AND a visible automation flow.

---

## 1. Sitemap
1. **Home** — `/`
2. **Shop** — `/shop` (full catalog, filters)
3. **Product Detail** — `/shop/[productId]` (dynamic route)
4. **Cart** — `/cart`
5. **About** — `/about`
6. **Contact / Support** — `/contact`

Global: sticky nav with cart icon (item count badge), footer, floating chatbot widget on every page.

---

## 2. Design Tokens (reuse — do not redesign)
```css
--bg:      #FFFFFF;
--ink:     #1A1A1A;
--primary: #2F6F5E;   /* confident teal-green */
--accent:  #E8622E;   /* warm orange — sale badges, urgent CTAs only */
--grey:    #767676;
--hair:    rgba(26,26,26,0.10);
```
Fonts: Inter throughout (semibold display, regular body) — clarity over personality, per the original doc's reasoning. Pure white background, sharp corners, tight standard e-commerce grid.

---

## 3. Page-by-Page Content

### Home (`/`)
Reuse hero, shop grid teaser (4-6 featured products, link to `/shop`), Why Buy From Us strip, About teaser, the **"What happens after you order" automation flow diagram** (see Section 6), final CTA.

### Shop (`/shop`)
**Header:** "Browse the full collection."
- Filter/sort bar: category, price range, newest
- Product grid — reuse `<ProductCard />` component
- Pagination or infinite scroll for a realistic catalog feel (10-20 demo products is enough)

### Product Detail (`/shop/[productId]`)
- Product image gallery (2-4 angles if available)
- Name, price, size/variant selector if relevant, "Add to Cart" button
- Description (2-3 sentences)
- "You may also like" — 3-4 related product cards
- Chatbot contextually aware of the current product if feasible (e.g. "Ask about this product" prompt near the Add to Cart button)

### Cart (`/cart`)
- Line items with quantity adjust, remove
- Order summary, subtotal, shipping estimate
- "Proceed to Checkout" — for a demo site, this can end at a simple confirmation screen rather than a real payment gateway, clearly labeled as a demo flow if needed

### About (`/about`)
Reuse About copy from the one-pager doc — brand story, sourcing/quality note, one human detail.

### Contact / Support (`/contact`)
WhatsApp button (primary), email, FAQ accordion (shipping time, returns, payment methods), short contact form.

---

## 4. Reusable Components
- `<Nav />` — sticky, cart icon with live count, mobile hamburger
- `<Footer />` — links, socials, "Built by Coreline Digital" credit
- `<ChatWidget />` — floating, present on every page, product-aware on detail pages
- `<ProductCard />` — used on Home (teaser), Shop (grid), and "You may also like" — single component, `variant` prop for teaser vs full grid sizing
- `<FilterBar />` — Shop page only
- `<CartLineItem />`
- `<CTAButton />` — primary (teal fill) / secondary (bordered)
- `<FAQAccordion />` — Contact page
- `<AutomationFlowDiagram />` — see Section 6, reusable if you want it on both Home and a dedicated section

---

## 5. LIVE Chatbot Integration — build spec
**Component:** `<ChatWidget />`, same pattern as the Gym site — floating panel, mounted at layout level.

**Backend:** single `/api/chat` serverless route, separate system prompt from the Gym site's.

**System prompt scope:**
- Product availability/stock questions ("Do you have this in size M?") — can reference a static product list passed into the prompt context
- Shipping time and return policy (pull from the Contact page FAQ content, so the bot and the page never contradict each other)
- Conversational "order status" lookup — canned realistic response is fine for a demo, no real order backend needed
- Escalates anything complex to WhatsApp handoff

**Demo instruction (for cold calls):** on `/shop` or a product page, type "Do you ship to [prospect's city]?" or "What's your return policy?" live.

---

## 6. Visible Automation Flow — build this as a real component, not just a demo talking point
**Component:** `<AutomationFlowDiagram />` — horizontal step diagram using the line-and-node visual motif (reuse the same SVG pattern idea from Coreline's own Process section, restyled in this site's teal/orange palette).

**Steps:** Order Placed → Instant WhatsApp Confirmation → Dispatch Update → Delivery Update → Review Request

**Placement:** as a section on the Home page ("What happens after you order") — this is real, useful content for an actual future customer AND your automation sales pitch simultaneously. Each step's node can "light up" in sequence on scroll (same interaction pattern as Coreline's own Process section, described in the main build document).

---

## 7. Cursor Build Guide
- **Stack:** Next.js (App Router) + Tailwind. Product data can live in a simple local JSON file or array for a demo — no real database/CMS needed.
- **Folder structure suggestion:**
  ```
  /app
    /shop/page.tsx
    /shop/[productId]/page.tsx
    /cart/page.tsx
    /about/page.tsx
    /contact/page.tsx
    /api/chat/route.ts
    page.tsx (Home)
    layout.tsx (Nav, Footer, ChatWidget)
  /components
    Nav.tsx, Footer.tsx, ChatWidget.tsx, ProductCard.tsx,
    FilterBar.tsx, CartLineItem.tsx, CTAButton.tsx,
    FAQAccordion.tsx, AutomationFlowDiagram.tsx
  /lib
    products.ts        (demo product data array)
    chatSystemPrompt.ts
  ```
- Cart state can be simple React Context or local state — no need for a real persistence/payment layer since this is a portfolio demo, not a production store.
- Keep product photography consistent (same lighting/background style across all demo products) — inconsistent product photos are one of the fastest ways a demo e-commerce site looks unconvincing.
