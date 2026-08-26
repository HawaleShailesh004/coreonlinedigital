# Sample Build 9 - Trader / Seller (Small D2C Brand)

Vertical: Small retail brand or trader selling products online (clothing, home goods, FMCG, etc.)
Purpose: Portfolio sample for Coreline's Work page + cold-call demo asset - this is the dedicated E-COMMERCE showcase, and the second sample carrying a live chatbot demo plus a visible automation flow.

---

## 1. Positioning

This site sells convenience and confidence to buy online - the objections here are "is this a real business" and "will checkout actually work smoothly." Unlike jewellery (browse-then-visit-in-person), this vertical needs to close the sale entirely on-site.

---

## 2. Copy

### Nav

Logo/brand name · Shop · About · Contact
CTA button: **Shop Now**

### Hero

**Eyebrow:** Free shipping over ₹[amount] · [City]-based

**Headline:** Straightforward shopping. No games, no fine print.

**Sub:** [Brand Name] sells [category] with clear pricing, fast dispatch, and real support if something's wrong - buy with confidence, not just hope.

**CTAs:** Shop Collection · Chat for Help

### Shop Grid

Product cards: photo, name, price, "Add to Cart" - standard e-commerce grid, clean and fast-loading. Filter/sort bar (price, category, newest).

### Why Buy From Us

3-point strip:

- Real photos, real stock - what you see is what ships
- Fast dispatch, tracked delivery
- Easy returns, no hassle

### About

**Heading:** About [Brand Name]

2–3 sentences: how the business started, what makes the product/sourcing different, one human detail - small brands sell trust through story more than a big retailer needs to.

### Contact / Support

WhatsApp (primary support channel), email, order-status lookup if feasible. FAQ mini-section: shipping time, returns, payment methods accepted.

**Bottom CTA:** Questions before you order? Message us - we reply fast.

---

## 3. Design System

### Palette - "Clean Commerce"

```
--bg:      #FFFFFF   /* pure white - e-commerce product photography needs a neutral stage */
--ink:     #1A1A1A
--primary: #2F6F5E   /* confident teal-green - trust + "buy" without being generic Amazon-orange or Shopify-purple */
--accent:  #E8622E   /* warm orange, used only for sale badges/urgent CTAs */
--grey:    #767676
--hair:    rgba(26,26,26,0.10)
```

Pure white background is a deliberate, category-correct choice here - product photography needs a neutral stage to look accurate and trustworthy; this is the one sample where "let the product be the color" is right.

### Typography

- **Display:** Clean geometric sans - Inter (semibold) or Manrope - nothing decorative, e-commerce trust comes from clarity and speed, not personality.
- **Body:** Inter, regular.
- **Prices:** Bold, slightly larger than surrounding text, consistent placement on every card - scanning speed matters more than style here.

### Spacing & Feel

- Sharp corners, tight consistent grid - standard, proven e-commerce card patterns; this is not the place to get experimental with layout.
- Fast-loading feel is part of the "design" - minimal decorative elements, product photos carry all the visual weight.
- Clear, sticky "Add to Cart"/cart icon in nav at all times.

### Motion

- Add-to-cart: small cart icon bounces/badges with a count increment animation (150ms) - standard, expected e-commerce feedback pattern, keep it snappy and familiar rather than novel.
- Product cards: subtle image swap on hover (primary photo → secondary angle) if multiple product photos exist - very common, effective pattern for this category.
- Sale/urgent badges: small pulse animation, used sparingly (only genuinely time-limited offers, not decoration).

---

## 4. LIVE Chatbot Demo - build this one for real too

**Trigger:** "Chat for Help" button, same widget pattern as the gym sample, different system prompt.

**System prompt scope:**

- Answers product availability/stock questions ("Do you have this in size M?")
- Explains shipping time and return policy when asked
- Can look up "order status" conversationally for demo purposes (canned realistic response is fine - doesn't need real backend integration for a demo)
- Escalates anything complex to WhatsApp handoff

**Demo move on a call:** type "Do you ship to [prospect's city]?" or "What's your return policy?" live - shows the trader exactly how many WhatsApp messages this would take off their plate daily.

## 5. Visible Automation Flow - show this one as a diagram, not live

Since order confirmations/shipping updates happen over hours or days, this is the sample where the **animated flow diagram** approach (from the earlier discussion) belongs most naturally:

**Diagram steps (horizontal, connected by line-and-node motif):**
Order Placed → Instant WhatsApp Confirmation → Dispatch Update → Delivery Update → Review Request

Place this as a section on the sample site itself ("What happens after you order") - it doubles as real content for the trader's own customers AND as your automation pitch, solving two problems with one build.

---

## 6. Build Notes

- Include a working (or demo-realistic) cart + checkout flow - this is the sample that should look and feel closest to a real, functioning store, since that IS the product being sold.
- Small "Built by Coreline Digital" credit in the footer.
