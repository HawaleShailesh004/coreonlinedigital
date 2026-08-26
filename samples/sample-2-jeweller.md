# Sample Build 2 - Jeweller

Vertical: Jewellery retailer / showroom (aligns with existing MNK Jewels work - use this as the more premium/portfolio-grade evolution of that build)
Purpose: Portfolio sample for Coreline's Work page + cold-call demo asset for jewellery/luxury retail leads.

---

## 1. Positioning

This site sells desire and craftsmanship, not price. Jewellery buyers browse online but almost always close in-person or over a call - so the site's real job is to get someone to walk in or message, not to sell directly. Never show prices upfront; that's deliberate, not a missing feature.

---

## 2. Copy

### Nav

Logo/showroom name · Collections · Craftsmanship · Visit Us
CTA button: **Enquire on WhatsApp**

### Hero

**Eyebrow:** Est. [year] · [City]

**Headline:** Jewellery made to be worn for a lifetime, not a season.

**Sub:** Each piece at [Showroom Name] is handcrafted in-house - from a single gemstone to a finished heirloom. Visit our showroom or browse our collections online.

**CTAs:** View Collections · Book a Visit

### Collections (visual grid)

4–6 categories as large image cards, e.g.: Bridal · Gold Traditional · Diamond · Custom Design. Each card: category name + one evocative line, no prices.

### Craftsmanship / Story

**Heading:** Every piece has a story before it has an owner.

2–3 sentences on the showroom's history, materials, or process - hand-finishing, certified stones, family legacy if relevant. This section sells trust in authenticity, which is the #1 objection online jewellery buyers have.

### Custom Design CTA

**Heading:** Have something in mind?

Short section: "Bring a photo, a sketch, or just an idea - we'll bring it to life." CTA: **Start a Custom Order** (routes to WhatsApp).

### Visit / Contact

Showroom photo, address, map, hours, WhatsApp + call buttons.

**Bottom CTA:** The best way to see it is in person. Book a visit or message us your questions.

---

## 3. Design System

### Palette - "Warm Gold on Ink"

```
--bg:      #0F0D0A   /* near-black, warm undertone, not cool grey-black */
--paper:   #F7F1E5   /* warm ivory, used for light-section breaks only */
--gold:    #C9A55C   /* primary metallic accent - muted gold, not yellow/brass */
--gold-2:  #8A6B33   /* deeper gold for gradients/hover states */
--text:    #EDE6D8   /* warm off-white body text on dark bg */
--hair:    rgba(237,230,216,0.12)
```

Dark background is the right call here - luxury jewellery photography (dark backdrop, single lit piece) is the industry-standard visual language for a reason; going light/white would undersell the product photography.

### Typography

- **Display:** A refined serif with some contrast - Fraunces, Playfair Display, or similar - used ONLY for the hero headline and section headers. This is the one vertical where a serif earns its place; luxury/jewellery is the category serif fonts are built for.
- **Body:** Inter or similar clean sans, light/regular weight, generous letter-spacing on labels.
- **Category labels:** small caps, wide letter-spacing (0.15em), gold color.

### Spacing & Feel

- Sharp corners on buttons, but generous rounded/soft edges on image cards (product photography should feel gallery-like, not boxed in).
- Large, full-bleed imagery is the point of this site - text sections should be short, images should dominate the scroll.
- Gold gradient text treatment on key words in the hero (e.g. "lifetime") - one moment of shine, not overused across the page.

### Motion

- Slow, cinematic fade + slight scale-up on collection images as they scroll into view (image starts at 1.03 scale, settles to 1.0) - mimics a jeweller sliding a piece toward you.
- Gold shimmer sweep animation across the hero headline's accent word, once on load only.
- Hover on collection cards: image brightens slightly, category label underline draws in gold, 200ms.
- Keep everything slow and deliberate - luxury motion should never feel snappy or "app-like."

---

## 4. Build Notes

- Reuse real product photography style from the existing MNK Jewels build where possible, but treat this as the "flagship" version - better photography direction, no template WooCommerce look.
- No price display anywhere on the public site - this is deliberate for the category, not an oversight.
- Small "Built by Coreline Digital" credit in the footer.
