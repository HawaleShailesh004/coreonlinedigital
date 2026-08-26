# Sample Build 7 - Gym / Fitness Studio

Vertical: Gym, fitness studio, or personal training center
Purpose: Portfolio sample + cold-call demo asset - this is one of the two samples carrying the LIVE chatbot demo.

---

## 1. Positioning

This site sells energy and momentum - someone deciding to join a gym is deciding to change a habit, and the site's job is to make that decision feel easy and immediate, not intimidating. High energy visually, but the actual conversion action (trial booking) must be frictionless.

---

## 2. Copy

### Nav

Logo/gym name · Programs · Membership · Contact
CTA button: **Book a Free Trial**

### Hero

**Eyebrow:** [City] · Open 6AM–10PM

**Headline:** Stop planning your first workout. Book it.

**Sub:** [Gym Name] offers strength training, group classes, and personal coaching - with real trainers, flexible timings, and a free trial before you commit to anything.

**CTAs:** Book Free Trial · Chat With Us Now (opens chatbot)

### Programs (grid, 4–5 cards)

Strength Training · Group Classes (HIIT/Zumba/Yoga) · Personal Training · Nutrition Coaching. Each: one energetic line, class timing snippet.

### Membership Plans

Simple 3-tier comparison (Basic / Standard / Premium) - show pricing here, gyms are a category where transparent pricing builds trust, not undermines premium positioning.

### Why Train Here

3-point strip:

- Certified trainers, not just equipment
- Flexible class timings, book via WhatsApp in seconds
- No long-term lock-in - month-to-month available

### Trainers

Small grid: trainer photo, name, specialization (1 line each).

### Contact

Map, address, phone, WhatsApp, hours. Free trial booking form: Name, phone, preferred time slot.

**Bottom CTA:** Your first session is free. No card required.

---

## 3. Design System

### Palette - "Kinetic"

```
--bg:      #101010   /* near-black, high-energy gym aesthetic */
--paper:   #F4F3EF   /* light section breaks only */
--primary: #E13B3B   /* strong red - energy, urgency, classic gym color done with restraint */
--accent:  #D4FF3F   /* electric lime, used ONLY for small highlights/badges, never large fills */
--grey:    #A6A6A0
--hair:    rgba(255,255,255,0.10)
```

Dark background with one hot color (red) and one electric accent (lime) used sparingly - avoid using both at full saturation everywhere, that reads amateur; restraint on the accent is what makes it look premium instead of like a flyer.

### Typography

- **Display:** A bold condensed sans - Archivo Black, Anton, or Space Grotesk (bold) - should feel powerful at large sizes.
- **Body:** Inter, regular - keep body text calm even though the visuals are loud, so it stays readable.
- **Pricing/plan numbers:** bold, large, high-contrast against card background.

### Spacing & Feel

- Sharp corners, high contrast, bold blocks of color rather than soft gradients.
- Photography: real action shots (training, classes) if possible - dark, high-contrast editing style, not bright/clinical gym-stock-photo look.
- Tight, energetic spacing compared to the other samples - this is the one vertical where a bit of density feels right, not sparse and calm.

### Motion

- Hero CTA button: subtle continuous pulse/glow in accent lime - signals urgency ("book now"), one of the few looping animations in the whole portfolio.
- Program cards: sharp, fast hover transform (translateY -4px, 120ms - quicker than other samples, matches the energetic tone).
- Numbers on the membership pricing table count up/animate in on scroll (0 → final price) - small dopamine-style motion fitting the category.

---

## 4. LIVE Chatbot Demo - build this one for real

**Trigger:** "Chat With Us Now" button in the hero, opens a chat widget (bottom-right corner, standard pattern).

**System prompt scope (keep tight):**

- Answers class timings and schedule questions ("What time is the HIIT class on Tuesday?")
- Explains membership plans and pricing when asked
- Can "book" a free trial slot by collecting name + phone + preferred time, and confirming it back in the chat (no real backend needed for demo - just needs to respond convincingly)
- Politely deflects anything outside scope ("For that, our team will call you - can I get your number?")

**Why this vertical:** gyms get a high volume of repetitive questions (timings, pricing, trial availability) - the chatbot's value is immediately obvious and easy for a gym owner to picture handling their actual WhatsApp inbox.

**Demo move on a call:** open the site, click the chat button, type "What time is your evening class?" live in front of the prospect. Let it answer. That's the entire pitch for this service line - no further explanation usually needed.

---

## 5. Build Notes

- Show real pricing here - unlike jewellery, gym pricing transparency is expected and builds trust.
- Small "Built by Coreline Digital" credit in the footer.
