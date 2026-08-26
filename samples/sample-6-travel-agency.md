# Sample Build 6 - Travel Agency

Vertical: Local travel agency or tour operator (domestic packages, adventure tourism, group tours)
Purpose: Portfolio sample for Coreline's Work page + cold-call demo asset for travel/tourism leads - also a natural fit to showcase alongside the Maharashtra adventure tourism dataset work.

---

## 1. Positioning

This site sells a feeling before it sells an itinerary. Travel buyers browse emotionally first (the photo, the destination) and evaluate logistically second (price, dates, inclusions). The design needs to feel expansive and a little adventurous - this is the one sample where more visual energy is not just allowed but expected.

---

## 2. Copy

### Nav

Logo/agency name · Packages · Destinations · Contact
CTA button: **Plan My Trip**

### Hero

**Eyebrow:** Group Tours & Custom Trips · [City/Region] Based

**Headline:** Trips planned properly, so all you do is show up.

**Sub:** [Agency Name] handles the stays, transport, permits, and itinerary for [region/domestic/adventure] trips - so you spend your time deciding what to see, not how to book it.

**CTAs:** View Packages · Talk to a Trip Planner

### Featured Packages (grid, 4–6 packages)

Each card: destination photo, package name, duration, starting price, 2–3 highlight tags (e.g. "Trekking," "Family Friendly," "Weekend Trip"). Price shown as "starting from" - sets expectation without over-committing to a fixed number.

### How It Works

Simple 3–4 step strip: Choose a Package/Tell Us Your Idea → We Plan the Itinerary → You Confirm & Pay → We Handle the Rest. Removes the biggest hesitation in booking travel from someone new: "what actually happens after I enquire?"

### Why Book With Us

3-point strip:

- Local knowledge - routes and stays scouted, not just listed
- Direct WhatsApp support during the trip, not just before booking
- Transparent pricing, no last-minute add-on costs

### Custom Trip CTA

**Heading:** Don't see what you're looking for?

Short section: "Tell us your dates, budget, and what you want to experience - we'll build the itinerary around it." CTA: **Start Planning**

### Contact

WhatsApp (primary), phone, office address if applicable. Short form: Name, phone, destination interest, approximate dates.

**Bottom CTA:** The best trips start with a 5-minute conversation. Let's plan yours.

---

## 3. Design System

### Palette - "Horizon"

```
--bg:      #FAF7F0   /* warm sand-white */
--ink:     #23282A   /* near-black, neutral, lets photography carry the color */
--primary: #1F5C63   /* deep teal - horizon/ocean/forest, versatile across destination types */
--accent:  #E5793A   /* sunset orange - CTAs, price highlights, tags */
--grey:    #74716A
--hair:    rgba(35,40,42,0.12)
```

Sand + teal + sunset-orange works across mountain, coastal, and adventure imagery alike - avoids over-committing to one destination mood (e.g. all-blue reads "beach only," all-green reads "forest only").

### Typography

- **Display:** A bold, slightly condensed sans with presence - Archivo or Space Grotesk (bold/black weight) - should feel confident on top of a full-bleed photo.
- **Body:** Inter, regular, comfortable line-height.
- **Price/duration tags:** small, uppercase, in a pill-shaped badge (rounded here is fine - this is a warmth-forward site) using the accent orange.

### Spacing & Feel

- Full-bleed hero photography (or hero video/slow pan if feasible) - this is the one sample where a large, immersive image is the correct opening move, not a restrained one.
- Rounded corners (10–14px) throughout - soft, welcoming, matches the "adventure but not risky" brand feeling.
- Package cards use a slight overlap/layered composition (image bleeding to card edges) rather than strict grid boxes - gives a more magazine-editorial feel than a rigid e-commerce grid.

### Motion

- Hero: slow, subtle Ken Burns-style zoom on the background photo (scale 1.0 → 1.08 over 15–20s, looping gently) - **this is the one intentional slow ambient loop for this site**, gives a sense of a living destination rather than a static photo.
- Package cards: on hover, image parallax-shifts slightly opposite to cursor direction, card lifts (translateY -4px) - a touch more playful interaction than the other samples, fitting the adventurous tone.
- "How It Works" steps animate in sequence with a simple connecting line (same pattern as the school/process sections but styled with the destination color palette).
- Package price/tag badges pop in with a small scale bounce (0.9 → 1.0) as they scroll into view - one small moment of energy, not overused across the whole page.

---

## 4. Build Notes

- This sample can double as a lightweight showcase for the Maharashtra adventure tourism dataset work if relevant categories overlap - worth reusing real trek/destination data here rather than generic stock trip names, if available.
- Small "Built by Coreline Digital" credit in the footer.
