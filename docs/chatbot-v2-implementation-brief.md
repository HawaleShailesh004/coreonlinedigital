# Site Assistant v2 — Implementation Brief (GO AHEAD)

**Status:** Approved — implement now.  
**Goal:** Replace the fixed 7-step form-feel chatbot with a consultative sales flow (PAS/SPIN) plus a short lead-capture path. Same widget, same admin log, same architecture (scripted spine + AI sidecar).

---

## Do NOT change

- **Architecture:** Scripted spine on client (`lib/chat/flow.ts`) + Groq sidecar (`/api/chat`) for off-script questions only.
- **Facts source:** All price/terms from `lib/chat/facts.ts` ← `lib/content.ts`. Model never invents numbers.
- **Lead capture:** Client `extractPhone()` → POST `/api/lead` → server re-validates. Never trust the model for leads.
- **Logging:** Every conversation to `/api/chat-log` → `/admin`. Log `path: "consult" | "quick"`.
- **Voice:** Bot is the assistant on Shailesh's site — third person (*Shailesh builds…*), never *I build…*. No exclamation marks, no agency jargon, no emoji.
- **Phone last** on any path that asks for it — only after value + agreement (consult) or facts card (quick).
- **Honest decline:** If a website won't help, say so. Turning down a sale is allowed.
- **Sample widget:** `ChatWidget.tsx` + `/api/sample-chat` stays separate.

---

## Self-select opener (new routing step)

Immediately after greeting, before any qualifying question:

**Bot:**
> Want me to ask a few questions and give you an honest read on your situation — or skip straight to the numbers and WhatsApp?

**Chips:**
- **Ask me a few questions** → Flow A (consultative)
- **Skip to price + WhatsApp** → Flow B (quick lead)

Store `profile.path = "consult" | "quick"`. Progress rail and step counts differ per path.

---

## Flow A — Consultative (quality leads)

**Framework:** SPIN — Situation → Problem → Implication → Need-payoff → agreement before price → contact.

**Rail steps (8 nodes, pre-contact):**

| # | Step ID | Sales move | Notes |
|---|---------|------------|-------|
| 0 | `route` | Self-select | Opener above |
| 1 | `business` | Identify | Unchanged — vertical chips |
| 2 | `problem` | Pain | Unchanged — keep existing per-vertical questions + chips |
| 3 | `amplify` | Highlight pain (Implication) | After frequency answer — vertical-aware reflection, not generic math |
| 4 | `goal` | Need-payoff | NEW — get them to name the win |
| 5 | `obstacle` | What's stopping them | NEW — surface objection early |
| 6 | `website` | Current approach | Unchanged question + chips + honest `fine` branch |
| 7 | `fit` | Diagnosis + solution bridge + agreement | NEW checkpoint — **no price yet** |
| 8 | `close` | Facts card → name → phone | Only if yes/maybe on fit |

**Do NOT keep `intent` as a separate rail step.** Intent signals come from obstacle chips and fit agreement.

### Step copy (consult path)

#### `business` — unchanged
> What kind of business do you run?

Chips: Clinic · Shop / trader · Gym · Coaching class · Jeweller · Something else

#### `problem` — unchanged
Use existing `verticals[id].question` and `verticals[id].answers`.

#### `amplify` — sharpened (after frequency)

Ask frequency first (reuse existing chips: Most days · A few times a week · Only occasionally).

Then **reflect cost back** using vertical + frequency. Examples:

- **Gym, high frequency:**  
  > So people ask about fees and timings, and you said that happens most days. That's a steady stream of people who showed interest but never walked in. Does that feel about right?

- **Clinic, mid frequency:**  
  > Calls coming in while the desk is busy — a few times a week adds up. That's people who tried to reach you and didn't get through. Does that sound fair?

- **Shop, high frequency:**  
  > Orders landing on WhatsApp and phone with nothing holding them together — most days, that's a lot of threads to lose track of. Ring true?

**Confirm chips:** Yes, that's the issue · Annoying but manageable · Not sure

If "Not sure" → brief model sidecar or one clarifying line, then continue.

Implement as `amplifyReflection(vertical, frequency, problemText)` per vertical — not one global sentence.

#### `goal` — NEW

> If this were sorted, what would that actually look like for you?

**Chips:** More bookings or orders · Stop repeating myself all day · Look legit online · Get found on Google

Store in `profile.goal`.

#### `obstacle` — NEW

> What's stopped you from fixing this so far?

**Chips:** Never got around to it · Not sure what I actually need · Got burned before · Wasn't sure it's worth it

Store in `profile.obstacle`.

#### `website` — unchanged logic
> Do you have a website right now?

Chips + `websiteReply()` + honest decline for `fine` — keep as-is.

#### `fit` — NEW (critical)

**Order inside this step:**

1. **Diagnosis** — reuse/enhance `diagnosis(profile)` quoting their problem + severity + name if known (name asked later in close, so diagnosis here may not have name yet — OK).

2. **Solution bridge** (no price):
   > From what you've said, a site that answers [their leak] when you can't — and shows up when people search — sounds like it could help. Shailesh builds exactly that for [trade]s like yours.

   Vertical-tweak the bridge. No ₹ amounts here.

3. **Agreement check:**
   > Does that direction sound worth looking into?

   **Chips:**
   - **Yes, let's do it** → `profile.fit = "yes"` → advance to `close`
   - **I've got more questions** → `profile.fit = "questions"` → AI sidecar (existing budget cap), then re-show agreement chips — no phone push mid-questions
   - **Not right now** → `profile.fit = "no"` → graceful exit (see below)

#### `close` — only after yes or maybe

Only enter if `fit === "yes"` or user chose "I've got more questions" and then agreed.

1. **Facts card** — From ₹15,000 · 10 working days · Half on delivery (from `facts.ts`)
2. **Closing ask** — intent-aware copy from existing `closingAsk()` or refined
3. **Name:** > What should I call you?
4. **Contact:** > Can I take your number so Shailesh can reply on WhatsApp?

Skip chips unchanged. Phone → POST `/api/lead` → handoff card.

### Graceful exit (`fit === "no"`)

> Fair enough — no pressure. WhatsApp is on the site whenever you want a second opinion. Shailesh replies himself, usually within a few hours.

Show WhatsApp button. **Do not ask for phone.** Mark conversation complete in log with `hasPhone: false`.

---

## Flow B — Quick lead (volume)

**Shape (approved):**

```
business → facts card → name → phone (both skippable) → handoff
```

Optional: one skippable chip row after business — *What's the main thing you're trying to fix?* — store in `profile.problemText` if answered. Do not block progress on skip.

**Steps:**

1. **business** — same as consult
2. **quickFacts** — show Facts card + one line:
   > Here's what Shailesh charges and how it works. Leave your name and number if you want him to take a look — or skip straight to WhatsApp.
3. **name** — with skip chip
4. **contact** — with skip chip → handoff

No amplify, goal, obstacle, fit on this path. Rail shows fewer nodes (4).

---

## Profile type changes

Extend `Profile` in `flow.ts`:

```ts
path: "consult" | "quick" | null;
goal: string;
obstacle: string;
fit: "yes" | "questions" | "no" | null;
amplifyConfirmed: boolean | null; // optional
```

Update WhatsApp prefill (`whatsappMessage()`) to include goal, obstacle, path, and fit outcome.

Bump localStorage key (e.g. `coreline-chat-v4`) so old sessions don't break state machine.

---

## Files to edit

| File | Changes |
|------|---------|
| `lib/chat/flow.ts` | New steps, copy, chips, classifiers, `amplifyReflection()`, goal/obstacle chips, fit branches, quick path steps, updated `stepOrder` per path, WhatsApp template |
| `components/chat/SiteAssistant.tsx` | State machine for new steps, path routing, fit agreement branches, graceful exit UI, progress rail per path |
| `components/chat/ChatIcons.tsx` | Icons for new chip types if needed |
| `lib/chat/persona.ts` | Update `stage` context for new steps; sidecar knows pending agreement |
| `app/api/chat-log/route.ts` | Accept new profile fields |
| `lib/conversationStore.ts` | Store path, goal, obstacle, fit |
| `docs/coreline-chatbot-strategy.md` | Update to v2 flow |
| `docs/coreline-chatbot-strategy.html` | Update to match |

---

## UX rules (unchanged)

- Never auto-open; 12s teaser once per session
- Chips at every step; typing never required
- Typing indicator pacing unchanged
- Mobile sheet + desktop panel unchanged
- Restart clears session, new UUID

---

## Testing checklist

- [ ] Consult path: full 8 steps → agreement yes → facts → phone → lead POST → WhatsApp prefill includes goal + obstacle
- [ ] Consult path: fit "Not right now" → no phone ask → WhatsApp only → logged
- [ ] Consult path: fit "More questions" → AI answers → re-offer agreement → no phone until yes
- [ ] Consult path: website `fine` → honest decline before or within fit — no hard sell
- [ ] Quick path: business → facts → name skip → phone → handoff
- [ ] Quick path: full skip to WhatsApp
- [ ] Off-script price question mid-flow → model quotes from facts only → returns to pending step
- [ ] `/admin` shows path, goal, obstacle, fit
- [ ] Build passes; no price drift in model replies

---

## GO AHEAD

Implement Flow A + Flow B + self-select opener as specified. Write vertical-aware `amplifyReflection()` for all 10 verticals + `other`. Lock price behind agreement on consult path. Update strategy docs after code works.
