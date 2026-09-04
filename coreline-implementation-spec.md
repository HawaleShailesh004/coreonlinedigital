# Coreline Digital - Implementation Spec

Paste into Cursor. Work top to bottom. Every section is a concrete change against the existing repo (`HawaleShailesh004/coreonlinedigital`).

**Do not redesign the site.** The design system, motion system, and component architecture are correct and stay. This is a copy, structure, and capability change. Where design changes are specified, they are surgical and named.

---

## 0. The positioning spine (read first - everything below derives from it)

**Old spine (being removed):** "Digital infrastructure / systems, not templates / for owners who've outgrown templates."

Why it dies: it is agency vocabulary for a buyer who doesn't use it, and it assumes the visitor already had a website and was disappointed by it. Most Thane small-business owners never had one at all.

**New spine:** Every owner - whether they've had a website or never had one - is losing customers they never see. The message answered six hours late. The person who searched their trade on Google and found someone else. The enquiry at 11pm nobody was awake for.

Three real buyer types, all covered by one spine:

| Buyer            | State                                           | What they need to hear                                              |
| ---------------- | ----------------------------------------------- | ------------------------------------------------------------------- |
| Never had a site | Running on WhatsApp + walk-ins. Feels no pain.  | _This is what you're missing._ Show the leak they can't see.        |
| Has a dead site  | Wix/Justdial page that sits there. Low urgency. | _A site is supposed to do work._ Contrast doing-nothing vs working. |
| Burned           | Paid a template shop, got nothing.              | _Fixed price, fixed date, half paid only when live._ Safety.        |

**Rules that follow:**

- Never write "your last website" or "outgrown templates" - excludes the largest group.
- Never write: infrastructure, architecture, triage, systems (as a noun for what you sell), engineered, bespoke, ecosystem, leverage, solutions.
- Do write: website, customers, enquiries, WhatsApp, Google, bookings, orders, follow-up, missed, late, price, date.
- Premium here = restraint + specificity, never decoration. Plain numbers, real dates, one published price.
- Voice: one person. "I", never "we"/"our team". This is a factual correction - Shailesh is solo, and "we" is a lie the buyer will discover on the first call.

---

## 1. `lib/content.ts` - the core rewrite

This single file carries almost the entire repositioning. Nothing in `components/` needs to change for this section.

### 1.1 `site`

```ts
tagline: "Websites that bring you customers. Fixed price, fixed date.";
primaryCta: "Talk on WhatsApp";
```

**Change `primaryCta` everywhere from "Book Strategy Call".** "Book Strategy Call" is consultant language; it sounds like a meeting with an agency and a proposal deck. Your buyer books nothing - he messages on WhatsApp. Every CTA on the site becomes "Talk on WhatsApp" (primary) or "See what it costs" (secondary, to /contact or pricing).

Add new fields:

```ts
priceFrom: "₹15,000",
deliveryPromise: "10 working days from the day I have your content",
paymentTerms: "Half to start, half only when your site is live",
```

### 1.2 `hero` - replace entirely

```
headline (3 lines, no single-word colour accent - see note):
  "You're losing customers"
  "you never even see."

subhead:
  "The WhatsApp message answered too late. The customer who searched
   on Google and found someone else. The enquiry at 11pm nobody was
   awake for. I build the website that catches them - and the
   assistant that answers while you're busy."

CTAs:
  primary:   "Talk on WhatsApp" → whatsapp link
  secondary: "See sample sites"  → /work
```

Below the CTAs, add a single line of three facts, mono, separated by generous space (not middle dots - see §6):

```
From ₹15,000     10 working days     Half paid only when live
```

**This trust line is the single highest-value addition to the homepage.** It is currently absent from the site entirely, and it is the strongest thing you have. It answers price, time, and risk before the visitor has to ask, which is exactly what a cautious buyer needs and what no competitor does.

**Note on the accent word:** the current hero colours "drives revenue" in emerald. Drop that. Colouring one phrase in a headline is a generic treatment and the new headline doesn't need it - the sentence carries itself. Keep the whole headline in ink, let the emerald live only in the CTA and the line-node motif. This makes the accent mean something when it does appear.

### 1.3 `focusStrip`

Keep the ticker. Change eyebrow from "Built for" to `"Recent work for"` only once real clients exist - until then keep "Built for". Do not fabricate.

### 1.4 `pillars` - rewrite all three

The three-pillar structure is sound. The names are not: "Digital Storefronts / Client Acquisition Systems / Growth & Operations" are category names invented by an agency. Rename to what the owner actually buys.

**Pillar 1 - id `website`**

- title: `A website that brings you customers`
- tagline: `Not a business card. A salesperson.`
- teaser: `Most sites just sit there with an address and a phone number. Yours should show people why you're worth calling, and make calling easy.`
- body: `Your website is the first thing most customers see before they ever speak to you. It should load fast on a phone, say clearly what you do, and push people toward one action - a call, a WhatsApp message, a booking, an order. That's what I build. Custom, not a theme someone else is also using.`
- includes:
  - `Custom design, built for your business - not a template`
  - `Fast on mobile, where almost all your customers are`
  - `Photos, services, prices, location - set up properly`
  - `One clear action on every page: call, WhatsApp, book, or order`
  - `Set up on Google so people searching your trade can find you`

**Pillar 2 - id `follow-up`**

- title: `Something that answers when you can't`
- tagline: `A missed message at 9pm is a lost customer by 9:05.`
- teaser: `You can't be on WhatsApp all day. Most enquiries come when you're with a customer, closed, or asleep - and they don't wait.`
- body: `You answer the same fifteen questions every week - timings, price, location, do you do this, are you open Sunday. An assistant on your site handles those the moment someone asks, day or night, and passes the real enquiries straight to your phone with the details already collected.`
- includes:
  - `An assistant on your website that answers common questions instantly`
  - `Enquiries sent straight to your WhatsApp, no app to check`
  - `Appointment or booking requests with details already filled in`
  - `Automatic reminders so people actually show up`
  - `Follow-up messages that go out without you remembering`

**Pillar 3 - id `monthly`**

- title: `Keeping it working, every month`
- tagline: `A site nobody looks after slowly stops working.`
- teaser: `Google rankings slip, photos go stale, nothing improves. This is the optional monthly plan - only if you want it.`
- body: `Some owners want to hand this over and forget it. Some want it kept sharp - new photos, updated offers, Google reviews coming in, small improvements every month. This is optional and it starts after your site is live and working. I'll tell you honestly if you don't need it.`
- includes:
  - `Google Business Profile kept updated and optimised`
  - `Review requests sent automatically after each job or sale`
  - `New photos, offers and content added as your business changes`
  - `Social posts and graphics if you want them`
  - `Everything monitored - if something breaks, I fix it`

**Note the honesty move in pillar 3** ("I'll tell you honestly if you don't need it"). For a suspicious buyer, visibly declining to upsell is worth more than any adjective. Keep it.

### 1.5 New export - `pricing`

```ts
export const pricing = {
  eyebrow: "What it costs",
  heading: "₹15,000 to start. You'll know the full price before I begin.",
  body: "Most business websites land between ₹15,000 and ₹35,000, depending on how many pages you need and whether you want the assistant and booking built in. I'll give you one fixed number before any work starts - it doesn't change later.",
  terms: [
    {
      label: "Price",
      value: "Fixed before we start. No hourly billing, no surprise additions.",
    },
    {
      label: "Payment",
      value:
        "Half to begin. Half only once your site is live and you've seen it.",
    },
    {
      label: "Time",
      value: "10 working days from the day I have your content and photos.",
    },
    {
      label: "Who",
      value:
        "One person builds it - me. The person you talk to is the person who builds it.",
    },
  ],
};
```

**Why publish a price when no agency does:** agencies hide price because they sell variable six-figure scopes and want to size the buyer up. Your buyer's core fear is exactly that - being sized up and charged what he'll tolerate. Publishing a floor removes his biggest fear and costs you nothing, because the range (₹15k–₹35k) leaves you full room to quote high on the call for a bigger job. The floor catches the cautious; the ceiling does the premium work in conversation.

**Why ₹15,000 and not ₹10,000:** ₹10k is the price of the template shop that burned these people. Publishing ₹10k files you in the same drawer as the operator you're trying to beat, and at half-on-delivery you'd float a real build for a ₹5,000 back-end payment. ₹15k is the floor.

### 1.6 `founder` section - strengthen

Current copy is already the strongest thing on the site. Two changes: convert "we" to "I" throughout, and add the incentive line.

```
heading: "One person builds it. That person is me."
body: "I'm Shailesh. I run Coreline on my own - the person you talk to on
the phone is the person who builds your site. There's no account manager,
no team it gets passed to, nobody to blame if it's late.

Most of my work is going to come from owners telling other owners. That
only works if I finish what I start, on the date I said. That's the whole
business model."
```

That second paragraph is the answer to "you're new and I don't know you" - it doesn't hide inexperience or announce it, it explains why your incentives are aligned with his. Better than any credential you don't have.

### 1.7 Remove entirely

- The "Templates are rented. Systems are owned." section. It insults the buyer who currently has a template, and it's an argument about a category the buyer doesn't think in. **Replace this whole homepage section with the new Pricing section (§1.5).** Same slot, same visual weight, infinitely more useful.
- Every instance of the word "system" as a product noun.
- `tagline` in `site` (old version) and the footer strap "Digital infrastructure, built to run" → replace with `"Websites that bring you customers"`.

---

## 2. Homepage - final section order

```
1. Hero            - new headline + trust line (From ₹15,000 · 10 working days · Half on delivery)
2. Focus strip     - unchanged ticker
3. Three pillars   - renamed and rewritten per §1.4
4. Process         - unchanged structure, copy edit only (see below)
5. PRICING         - NEW. Replaces "Templates are rented"
6. Work teaser     - unchanged structure, fix dead links (§5)
7. Founder         - rewritten per §1.6
8. Final CTA       - copy edit
```

**Process copy edit** (keep the scroll-linked connector - it's good, and it's a real sequence so the 01/02/03 numbering is legitimate here):

- `01 Talk` - "A 15-minute call or WhatsApp chat. You tell me what your business does and where customers are slipping away. I tell you what it'll cost and how long."
- `02 Build` - "I build it and send you a live link to look at while it's in progress. You see it before it's public, and changes happen then, not after."
- `03 Live` - "It goes live, you pay the second half, and I show you how to update it yourself. Monthly upkeep only if you want it."

**Final CTA copy:**

- heading: `Let's find out what you're missing.`
- body: `Send me a WhatsApp message with what your business does. I'll take a look at how you show up on Google right now and tell you honestly whether a website will help you - free, no obligation.`
- button: `Talk on WhatsApp`

That free-look offer is your best anti-inertia tool and it belongs on the site, not just on calls.

---

## 3. Services page - UI restructure

Current problems: all three pillars render identically in a 5/6 column split, each ends with an identical "Get a quote →" button, and they're numbered 01/02/03 as if they're a sequence. **They aren't a sequence - they're a menu.** The numbering implies you must buy them in order, and three identical blocks give the eye no hierarchy, so the page reads as flat and long.

### Changes

**3.1 Drop the 01/02/03 numbers.** Replace the number with a short role label in mono: `START HERE`, `ADD ON`, `OPTIONAL, MONTHLY`. This encodes real information - what the thing is and when you'd buy it - instead of decorating with a false sequence.

**3.2 Make pillar 1 visually dominant.** It's the front-door offer; the page should show that. Give it a full-width treatment above a hairline: heading and tagline large, body and includes below in two columns. Pillars 2 and 3 sit beneath it side by side in a 6/6 grid at smaller scale.

```
┌──────────────────────────────────────────────────┐
│ START HERE                                       │
│ A website that brings you customers              │
│ Not a business card. A salesperson.              │
│                                                  │
│ [body copy, 2 cols]     [includes list]          │
│ From ₹15,000            [Talk on WhatsApp]       │
└──────────────────────────────────────────────────┘
──────────────────────────────────────────────────────
┌────────────────────────┐ ┌────────────────────────┐
│ ADD ON                 │ │ OPTIONAL, MONTHLY      │
│ Something that answers │ │ Keeping it working     │
│ when you can't         │ │ every month            │
│ [body] [includes]      │ │ [body] [includes]      │
└────────────────────────┘ └────────────────────────┘
```

This one change fixes the flatness without touching the design system.

**3.3 Replace the three identical "Get a quote →" buttons** with one primary CTA on pillar 1 (`Talk on WhatsApp`) and plain text links on 2 and 3 (`Ask about this`). Three identical primary buttons compete with each other and none of them wins. Also drop the `→` suffix on button labels site-wide - it's a default flourish, and your buttons are already unmistakably buttons.

**3.4 Add the pricing block** to the services page bottom, above the final CTA - same content as §1.5, reused component.

**3.5 Services page header copy:**

- eyebrow: `What I build`
- heading: `Start with the website. Add the rest when it's earning.`
- sub: `Most owners start with a website and nothing else. If it starts bringing enquiries, then we talk about the assistant, the booking, the monthly upkeep. I'd rather you spend less and see it work than spend more and hope.`

That last sentence does more selling than any feature list.

---

## 4. The chatbot on your own site - full spec

### 4.1 Which type, and why

There are three plausible bots: (a) a support bot answering FAQs about your services, (b) a lead-qualifying bot that interviews the visitor, (c) a free-audit bot that looks at their current online presence.

**Build (b), the qualifying bot, with a light touch of (c) as the hook.** Reasoning: a support bot answers questions nobody is asking (your site is small; there's no FAQ burden). A full audit bot requires real data lookups and will disappoint. The qualifying bot does three jobs at once - it captures the lead, it collects what you need before a call, and **it demonstrates the exact product you sell** (pillar 2, "something that answers when you can't"). A visitor who watches your bot qualify them has experienced your service instead of reading about it. That's the whole argument for building it.

**Name it plainly.** Not "Coreline AI Assistant". Header reads:

```
Coreline
Answers now - Shailesh replies personally
```

### 4.2 The goal, stated precisely

Get the visitor's **business type, whether they have a website today, their single biggest customer-loss problem, and their phone number** - in that order - inside 6 exchanges, then hand off to WhatsApp with the whole thing summarised.

Phone number is asked **last and only after value has been given.** Asking first is what every spammy bot does and it kills the conversation.

### 4.3 Conversation design

**Opening message (no user input required):**

```
Hi - I'm the assistant on Shailesh's site. Tell me what your business
does and I'll tell you honestly whether a website will actually bring
you customers, or whether you'd be wasting your money.

What kind of business do you run?
```

The "or whether you'd be wasting your money" is deliberate. Volunteering that you might tell them no is the single most disarming thing you can say to a suspicious buyer.

**Suggestion chips (so nobody has to think of what to type):**
`Clinic` · `Shop / trader` · `Gym` · `Coaching class` · `Jeweller` · `Something else`

**Turn 2 - vertical-specific problem question.** This is where the bot proves it isn't generic. Based on the stated vertical, ask the one question that owner will recognise instantly:

| Vertical            | Question                                                                                                                         |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Clinic / doctor     | "Do patients call to book, or do they just walk in and wait? And what happens to a call that comes when the front desk is busy?" |
| Shop / trader / D2C | "Where do most orders come in - WhatsApp, phone, or people walking in? And do you ever lose track of one?"                       |
| Gym                 | "How many people message asking about fees and timings each week? And how many of those actually turn up for a trial?"           |
| Coaching class      | "When parents ask about your results and batch fees, where do they see that right now?"                                          |
| Jeweller            | "Do people find your designs online before coming to the shop, or only once they're in the showroom?"                            |
| Real estate         | "How many site-visit requests turn out to be people who were never going to buy?"                                                |
| Interior design     | "Can someone see your past work anywhere online before they call you?"                                                           |
| School              | "During admission season, how many enquiry calls does the office miss?"                                                          |
| Travel              | "Do people ask you for the same itinerary and price details over and over?"                                                      |
| Something else      | "What's the main way customers reach you right now - phone, WhatsApp, or walk-in?"                                               |

**Turn 3 - the website question:** "Do you have a website right now?" Chips: `No, never had one` · `Yes, but it does nothing` · `Yes, it's fine` - branch:

- _No, never had one_ → "That's actually the most common answer. Right now anyone who searches for [their trade] in your area finds someone else. That's the gap."
- _Yes but it does nothing_ → "So it's sitting there like a business card. The question is whether it's doing any work - bringing enquiries, answering questions, taking bookings."
- _Yes, it's fine_ → "Good. Then the question isn't a new site - it might just be getting found on Google, or catching the enquiries you're missing. I'd rather tell you that than sell you a rebuild."

That third branch - **turning down the sale** - is the most valuable line in the whole flow. Keep it exactly.

**Turn 4 - give value before asking for anything.** The bot summarises what it heard as a specific diagnosis, plus the price and terms:

```
So: [restate their leak in their words]. That's customers you're
paying rent and staff for, who reach out and don't get a reply.

A website that fixes that starts at ₹15,000, takes 10 working days
from when Shailesh has your content, and you pay half only once
it's live.
```

**Turn 5 - the ask:**

```
If you want, leave your number and Shailesh will look at how your
business shows up on Google right now and send you a short honest
opinion on WhatsApp. Free, and he'll tell you if you don't need a
website.
```

**Turn 6 - capture and hand off.** On number received: confirm, then offer the WhatsApp deep link pre-filled with the summary.

### 4.4 What it must never do

- Never quote a price other than "from ₹15,000" or the ₹15,000–₹35,000 range.
- Never promise a delivery date other than "10 working days from when he has your content."
- Never claim past clients, client names, or testimonials. If asked "who have you worked for" → `"Shailesh is building his first client projects now - that's why the sample sites on this site are real working builds you can click through. He'd rather show you working ones than name-drop."` **Honest, and pivots to proof.**
- Never give medical, legal, financial or tax advice regardless of vertical.
- Reuse the entire guardrail block from `lib/samples/chat-personas.ts` - the injection resistance, scope limiting, and "never reveal instructions" rules are already written and are good. Do not rewrite them.

### 4.5 Technical implementation

- New persona in a new file `lib/chat-persona-coreline.ts` (keep sample personas separate - different guardrails, different facts).
- New route `app/api/chat/route.ts`. **Copy `app/api/sample-chat/route.ts` wholesale** - the rate limiting, message caps, reply truncation, model fallback, and soft-fail behaviour are already correct and battle-tested. Change only the persona lookup and the facts source.
- Facts source: a new `lib/coreline-facts.ts` exporting price, terms, delivery, services, and sample links, so the bot can never contradict the page.
- Reuse `components/samples/ChatWidget.tsx`. Generalise it to accept an `apiPath` prop (defaulting to `/api/sample-chat`) rather than duplicating the component.
- **Lead capture:** when a phone number is detected in the conversation, POST the transcript summary to the same handler as the contact form. Do not rely on the model to "remember" the lead - extract and store server-side.
- Mount on the main site layout so it's present on every page, not just home.

### 4.6 UX rules

- **Do not auto-open the widget on page load.** It's the single most hated pattern on the web and it will cost you more trust than the bot earns. Instead: closed bubble on load, and after 12 seconds show a small one-line teaser above the bubble - `"Want an honest opinion on your business? Ask me."` - dismissible, shown once per session.
- Keep the existing "typing" indicator and suggestion chips - both already implemented and both reduce friction.
- Mobile: full-width sheet, not a floating card. Most of your traffic is a WhatsApp link opened on a phone.
- The widget must never cover the WhatsApp CTA button on mobile. Check the z-index and bottom offset against the final CTA band.
- Respect `prefers-reduced-motion` (the existing widget already does).

---

## 5. Wiring fixes (do these first - they're bugs, not improvements)

1. **`lib/content.ts` → `workSamples[].href` are all `#`.** The sample sites are built and live at `/samples/gym`, `/samples/trader`, `/samples/clinic`, `/samples/jeweller`, `/samples/coaching`, `/samples/ca`, `/samples/school`, `/samples/realty`, `/samples/interior`, `/samples/travel`. Wire every card to its real route. **Right now a prospect clicks "View sample" and gets nothing - that is worse than having no samples at all, and it's your strongest proof sitting disconnected.**
2. **`app/(site)/contact/actions.ts` → `requestCallback` validates and logs only.** It does not deliver. Every lead submitted through your contact form is currently being silently dropped. Wire it to email (Resend) or to a WhatsApp notification. Do this before any cold calling starts.
3. **Add `app/opengraph-image`.** When you share the link on WhatsApp - your primary distribution channel - there's currently no preview card. This matters more for you than for most sites.
4. Metadata across all pages still says "Digital Infrastructure" - update title, description, and keywords in `lib/seo.ts` and each page's `pageMetadata` to the new spine.

---

## 6. Business card - redesign

### What's wrong with the current card

**Front:** actually good. Logo, name, role, contact, all in clear hierarchy with real whitespace. Keep the structure. One fix: `FOUNDER, CORELINE DIGITAL` - drop "Founder". A one-person business calling itself Founder invites the question "founder of what, how many people?" Use `WEBSITES & ONLINE SETUP` or simply `WEBSITE DESIGN & DEVELOPMENT` - it tells the person what you do, which is what a card is for. Right now your card doesn't say what you sell anywhere on the front.

**Back:** this is the problem side. Three issues:

1. The headline is the dead positioning - "Digital infrastructure that drives revenue, not just traffic." Nobody you hand this to will understand it.
2. Three mono column labels (`WEBSITES THAT CONVERT` / `LEADS, CAUGHT INSTANTLY` / `SYSTEMS, KEPT RUNNING`) are set in all-caps mono at small size on a dark background - hard to read, and they're abstract category names, not benefits.
3. The QR is bottom-right and unlabelled. Nobody knows what scanning it does.

### New back

Kill the three columns entirely. A card back has one job: give one reason to act and one way to act.

```
┌─────────────────────────────────────────────┐
│                                             │
│  A website that brings                      │
│  you customers.                             │
│                                             │
│  From ₹15,000 · Ready in 10 working days    │
│  Half paid only when it's live              │
│                                             │
│                                             │
│  ┌────────┐   Scan to see                   │
│  │  QR    │   sample websites               │
│  │        │   corelinedigital.in/work       │
│  └────────┘                                 │
│                                             │
└─────────────────────────────────────────────┘
```

Changes and why:

- Headline in plain language, sentence case, set in Space Grotesk at the same size as now.
- **The price and terms go on the card.** This is unusual and that's precisely why it works - the owner puts the card in a drawer, finds it three weeks later, and it still answers his only two questions: how much, how long. No competitor's card does this.
- QR gets a label. An unlabelled QR is never scanned. "Scan to see sample websites" gives a reason.
- Use the sage tint `#8FBFA8` for the secondary line on the ink background - the dark emerald `#1F5C4B` fails contrast on dark, which the brand notes already flag. Check the current card back: the mono labels appear to be using a colour that's borderline at that size.
- Drop the middle-dot separator if it reads as cramped in print; a line break is fine.

**Print spec:** 90×54mm (Indian standard), 3mm bleed, matte lamination not gloss - gloss reads cheap and shows fingerprints. 350gsm minimum. Print a test of 100 before committing to a bulk run, and check the QR actually scans from the printed card at arm's length, not just on screen.

---

## 7. What NOT to do

Listed because these came up and each one would cost time for negative return:

- **No hero animations, loop patterns, or ambient effects.** The current hero has a one-time load sequence that lands under 1.5s with proper reduced-motion fallbacks. That restraint is the most professional thing in the codebase. Adding decorative motion would read as trying too hard, which reads as insecure, which reads as amateur to a cautious buyer. The proof that you can build complex things is the trader sample's working cart and the live chatbot - not a moving homepage.
- **No redesign.** The design system is coherent and correct. Every problem identified on this site is a words problem or a wiring problem.
- **No videos on the site.** The personalised audit video is a WhatsApp asset sent to one prospect at a time. On the site it's dead weight.
- **No stock photography beyond the sample sites.** The samples need imagery; the main site's restraint is doing work.
- **No testimonials, client logos, counts, or "trusted by".** None exist. Fabricating them is the fastest way to lose a buyer who checks.

---

## 8. Order of execution

1. §5 wiring fixes - bugs, ship today
2. §1 `lib/content.ts` rewrite - highest leverage, one file
3. §1.5 + §2 pricing section on homepage
4. §3 services page restructure
5. §4 chatbot
6. §6 card reprint

Steps 1–3 are roughly a day and change more than everything else combined.
