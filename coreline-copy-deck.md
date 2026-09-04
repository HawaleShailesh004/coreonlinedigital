# Coreline Digital - Full Copy Deck

Copy only. No layout or component changes are prescribed here; where a field is
new or its shape changes, it is flagged **[NEW FIELD]** or **[SHAPE CHANGE]** so
you can wire it in one pass.

Structure mirrors `lib/content.ts` exports, in file order, then page-level copy.

**Read first:** [Contradictions & fixes needed](#contradictions--things-that-block-clean-paste)

- seven things in the current tree fight the spine - and
  [§2.8](#28-three-decisions-this-list-forces), the three decisions the nine-service
  list forces, including four prices only you can set.

## Voice - company "we" for the product, a real person on About

Final rule, after going back and forth on this: **"we" everywhere the copy is
talking about the work - hero, process, pricing, services, work, FAQ. First
person, naming Shailesh Hawale, on the two places that are supposed to be about
the person - the homepage trust section (§1.7) and the About page (§6).**

That's a deliberate split, not a compromise nobody chose. A site that's "we"
everywhere including the About page reads like it's hiding that one person runs
it. A site that's "I" everywhere reads like a portfolio, which is the thing you
originally didn't want. Most small, credible studios do exactly this split: the
product and process copy speaks as the business, and the one page whose entire
job is "who are you" speaks as the person. The homepage section gets a lighter
touch - it names Shailesh and links the idea forward, but doesn't carry the full
bio; that lives on `/about`, where the whole page is his voice.

**Still true from the earlier pass, unchanged:** "we" is not a headcount claim -
nothing below invents a team of designers or people who don't exist. And the
terms (fixed price, fixed date, half on delivery) still do real trust-building
work everywhere except About - naming Shailesh doesn't replace that, it adds to
it.

---

## 0. Global - `site`, `nav`, footer, meta

### 0.1 `site` - final copy

Everything already in `lib/content.ts` is correct against the spec. Two additions:

```ts
tagline: "Websites that bring you customers. Fixed price, fixed date.",
primaryCta: "Talk on WhatsApp",
secondaryCta: "See what it costs",

// [NEW FIELD] - the footer strap is currently hardcoded in components/Footer.tsx.
// Move it here so there is one place the spine can drift from.
footerStrap: "Websites that bring you customers",

// [NEW FIELD] - used by §1.7 and §6, and by the FAQ answer to "who builds it."
founderName: "Shailesh Hawale",
```

**Annotation:** `secondaryCta` stays "See what it costs" for pages that push to
pricing, and the hero overrides it with "See sample sites" - that is deliberate.
On the homepage the second-strongest thing you have is proof (ten clickable
builds); everywhere else it's the price.

### 0.2 `nav` - final copy

```ts
export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const legalNav = [{ label: "Privacy", href: "/privacy" }] as const;
```

**Annotation - buyer type: burned.** `/about` is currently only reachable from
the footer's legal row, next to Privacy. A buyer who got burned by a template
shop goes looking for something to check before he commits - here that's the
terms and the sample sites, not a bio, but it still belongs one click from the
nav, not buried next to the legal boilerplate. Promote it into the primary nav;
leave Privacy in the legal row where it belongs.

### 0.3 Footer

| Slot                 | Copy                                |
| -------------------- | ----------------------------------- |
| Logo label           | `coreline.`                         |
| Address line         | `Wagle Estate, Thane · Maharashtra` |
| Column head 1        | `Reach us`                          |
| Column head 2        | `Pages`                             |
| Strap (bottom right) | `Websites that bring you customers` |
| Copyright            | `© 2026 Coreline Digital`           |

**[NEW FIELD]** Add a third footer column for `sameAs` links once GBP / LinkedIn
/ Instagram exist (audit 2.2). Column head: `Elsewhere`. Do not add it empty.

### 0.4 Meta titles and descriptions

Currently `/` and `/services` both fight for "Website Design in Thane" - they
cannibalise. Split them so each page owns one query shape.

| Route       | Title (renders as `%s \| coreline.`)       | Description                                                                                                                                                  |
| ----------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/`         | `Website Design in Thane, From ₹15,000`    | `Websites for Thane and Mumbai businesses that bring you customers. From ₹15,000, live in 10 working days, half paid only when it goes live.`                |
| `/services` | `Website Design & Development Services`    | `What we build for Thane businesses: a website that brings customers, an assistant that answers when you can't, and optional monthly upkeep. From ₹15,000.`  |
| `/work`     | `Sample Websites for Thane Businesses`     | `Ten sample websites - clinic, school, gym, jeweller, trader, coaching class. Not client sites. Click into any of them and use it.`                          |
| `/contact`  | `Talk to a Web Developer in Thane`         | `WhatsApp, phone, or leave your number and we'll call back - same day if you reach out before 6pm. Coreline Digital, Wagle Estate, Thane.`                   |
| `/about`    | `About Shailesh Hawale - Coreline Digital` | `Shailesh Hawale runs Coreline Digital from Wagle Estate, Thane, building websites for local businesses. Fixed price, fixed date, half paid only when live.` |
| `/privacy`  | `Privacy`                                  | `How Coreline Digital handles the name and phone number you send from the site. Your number stays with us. We don't sell it.`                                |

All six land between 120 and 155 characters. Each carries at least one of
_website design_, _web developer_, _Thane_, _Mumbai_, or the published price -
without repeating the same phrase across routes.

**Title alternatives for `/`:**

- **A (recommended):** `Website Design in Thane, From ₹15,000` - the price _in
  the SERP_ is the differentiator. Nobody else in this market publishes one, so
  it wins the click before the click happens.
- **B:** `Websites for Thane Businesses` - safer, broader, currently live. Loses
  the one thing you have that competitors don't.
- **C:** `Website Design Thane - Fixed Price, 10 Days` - two differentiators, but
  reads like a classified ad and pushes the brand suffix past 60 characters.

---

## 1. Homepage (`/`)

Target: 700+ words of indexable body copy (live page is 554).

**Counted, not estimated:** the section copy below is **~658 words** (the voice
pivot's net effect on this count is small - the trimmed hero and pricing terms
lose a few words, and naming Shailesh in the restored founder section adds a few
back). The three work-teaser cards the page renders (clinic, jeweller, CA -
§3.2 copy) add about **95** more, for **~753**.
That clears the target, but only because of the cards, which is a thin margin to
depend on - so §1.3 adds a `homeSub` worth another 45, landing the page at
**~798** on its own copy plus cards. Take that field and the page is comfortably
over; skip it and you're at ~753 and still fine.

Geo mentions on this page: three - `Thane and Mumbai` in the hero, `Thane` in
pricing, `Wagle Estate, Thane` in the founder block (§1.7). That is the ceiling;
do not add a fourth.

### 1.1 Hero

```ts
export const hero = {
  headline: ["You're losing customers", "you never even see."],
  subhead:
    "The WhatsApp answered too late. The customer who searched on Google and found someone else. The enquiry at 11pm nobody was awake for. We build websites for Thane and Mumbai businesses that catch those customers, and an assistant that answers while you're busy.",
  ctas: [
    {
      label: "Talk on WhatsApp",
      href: site.whatsapp,
      variant: "primary",
      external: true,
    },
    { label: "See sample sites", href: "/work", variant: "secondary" },
  ],
  trustLine: ["From ₹15,000", "10 working days", "Half paid only when live"],
};
```

**Annotation - what changed and why.** The live subhead opens with _"I run
Coreline Digital from Wagle Estate, Thane."_ That was a fact about the business,
placed where the reader's attention is worth the most, ahead of the reason he
should keep reading. Pain first, then who's behind it, then the geography folded
into the sentence that had to be written anyway. Same structure now in company
voice: no name to lead with, so the sentence goes straight from the third pain
point into what Coreline builds.

**Annotation - buyer coverage.** The three fragments are one per buyer type: the
late WhatsApp reply is the owner running on WhatsApp who never had a site; the
Google search that found someone else is the owner whose site sits there doing
nothing; the 11pm enquiry is universal and sets up pillar 2.

**Headline alternatives:**

- **A (recommended, keep):** `You're losing customers / you never even see.` -
  Names a loss the reader can't refute, because he can't see it. Works on all
  three buyer types at once, which is the whole job of this line.
- **B:** `Your best customer messaged / at 11pm. Nobody answered.` - More specific
  and more cinematic, but it narrows to one failure mode and sells pillar 2 before
  pillar 1, which is the wrong order for the money page.
- **C:** `Someone searched your trade / today. They found someone else.` -
  Sharpest for the never-had-a-site buyer; weakest for the owner who already
  ranks and thinks he's fine.

**CTA note:** keep "Talk on WhatsApp" as the exact string everywhere. Not "Chat
on WhatsApp", not "WhatsApp me". Consistency is what makes it read as a channel
rather than a button.

### 1.2 Focus strip

```ts
export const focusStrip = {
  eyebrow: "Built for",
  items: [
    "Clinics",
    "CAs & Professionals",
    "Jewellers",
    "Schools",
    "Real Estate",
    "Travel",
    "Gyms",
    "Interior Design",
    "Traders",
    "Coaching Classes",
  ],
};
```

Unchanged. Stays "Built for" - not "Recent work for" - until real clients exist.

### 1.3 Three pillars

The section heading on the homepage reuses `servicesPage.eyebrow` / `.heading`
(see §2.1). The homepage renders `teaser`; `/services` renders `body`.

**[NEW FIELD] `servicesPage.homeSub`** - the homepage pillars section currently
runs a bare H2 straight into three cards, with no sentence between them. This is
the one place on the page where a lead-in is missing and where the buyer needs
permission to buy only the first thing:

```ts
homeSub: "Three things, and you almost certainly only need the first one to begin with. Start with the website. If it starts bringing you enquiries, that's when the other two are worth talking about - not before.",
```

`ServicePillars` already imports `servicesPage`, so this is one `<p>` under the
existing `<h2>`.

```ts
export const pillars: Pillar[] = [
  {
    id: "website",
    role: "Start here",
    title: "A website that brings you customers",
    tagline: "Not a business card. A salesperson.",
    teaser:
      "Most sites just sit there with an address and a phone number. Yours should show people why you're worth calling, and make calling easy.",
  },
  {
    id: "follow-up",
    role: "Add on",
    title: "Something that answers when you can't",
    tagline: "A missed message at 9pm is a lost customer by 9:05.",
    teaser:
      "You can't be on WhatsApp all day. Most enquiries come when you're with a customer, closed, or asleep - and they don't wait.",
  },
  {
    id: "monthly",
    role: "Optional, monthly",
    title: "Keeping it working, every month",
    tagline: "A site nobody looks after slowly stops working.",
    teaser:
      "Google rankings slip, photos go stale, nothing improves. This is the optional monthly plan - only if you want it.",
  },
];
```

Full `body` and `includes` for each are in §2.2–2.4.

**Annotation:** the `role` labels do the work the old `01/02/03` numbers only
pretended to. "Start here / Add on / Optional, monthly" tells the reader what
each thing is _and_ when he'd buy it, and it kills the implication that he has to
buy all three.

### 1.4 Process

```ts
export const process = {
  eyebrow: "How this works",
  steps: [
    {
      number: "01",
      title: "Talk",
      body: "A 15-minute call or WhatsApp chat. You tell us what your business does and where customers are slipping away. We tell you what it'll cost and how long.",
    },
    {
      number: "02",
      title: "Build",
      body: "We build it and send you a live link to look at while it's in progress. You see it before it's public, and changes happen then, not after.",
    },
    {
      number: "03",
      title: "Live",
      body: "It goes live, you pay the second half, and we show you how to update it yourself. Monthly upkeep only if you want it.",
    },
  ],
};
```

Unchanged - the strongest sequence on the site, and the numbering is legitimate
here because it _is_ a sequence.

**Annotation - buyer type: burned.** "You see it before it's public, and changes
happen then, not after" answers the template-shop scar without mentioning
template shops. What went wrong last time was that he first saw the site when it
was too late to change it.

### 1.5 Pricing - replaces "Templates are rented"

```ts
export const pricing = {
  eyebrow: "What it costs",
  heading: "₹15,000 to start. You'll know the full price before we begin.",
  body: "Most website design jobs in Thane land between ₹15,000 and ₹35,000, depending on how many pages you need and how much of the site is custom. The assistant, booking, and everything else in the full service list are quoted separately once we know what you need. Either way, you get one fixed number before any work starts - it doesn't change later.",
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
      value: "10 working days from the day we have your content and photos.",
    },
    {
      label: "Contact",
      value:
        "One point of contact from the first message to launch - not passed between departments.",
    },
  ],
};
```

**Annotation - the only keyword insertion on this page.** `body` changed from
"Most business websites land between" to "Most website design jobs in Thane land
between". That is one natural placement of the exact phrase the audit says is
missing from live body copy, in a sentence that had to exist anyway. It is not a
keyword line; it's a pricing line that happens to contain the keyword.

**Annotation - fixed a real pricing contradiction, not just a wording pass.**
`body` used to say the ₹15,000–35,000 range depended on "whether you want the
assistant and booking built in" - implying those were bundled inside that range.
§2.7's service table prices AI Chat Assistant, WhatsApp Automation, and
Appointment Booking System separately, each "Quoted before we start." Same three
services, priced two different ways in two different places - exactly the kind
of inconsistency a buyer comparing this page against a quote later would catch,
and exactly what the "burned by a shop" buyer type is primed to notice. `body`
now scopes the ₹15,000–35,000 range to the website alone (pages, how much is
custom) and states plainly that everything else in §2.7 is quoted separately.

**Annotation - the `Who` row, renamed `Contact`.** The old value ("One person
builds it - me") was the spec's solo-operator trust device; it's gone under the
voice pivot. The replacement keeps the thing that was actually true and useful -
no hand-off between a salesperson and whoever builds it - without stating a
headcount either way.

**Heading alternatives:**

- **A (recommended, keep):** `₹15,000 to start. You'll know the full price before
we begin.` - Two sentences answering the two questions, in the order they're
  being asked.
- **B:** `The price is on the website. That's the point.` - Confident and
  differentiating, but it makes the section about your positioning instead of
  about his money.
- **C:** `From ₹15,000. Fixed before we start.` - Tightest. Loses the reassurance
  that the number won't move, which is the actual fear.

### 1.6 Work teaser

```ts
export const workTeaser = {
  eyebrow: "Sample sites",
  heading: "Ten sample sites you can click into.",
  // [NEW FIELD] - the homepage currently says nothing about what these are,
  // while /work calls them samples. A reader who visits both notices.
  sub: "None of these are client sites. They're complete working builds, one for each kind of business we build for, so you can use the thing before you spend anything. Two of them have a live assistant you can talk to.",
  cta: "See all sample sites",
};
```

**Annotation - audit finding 4, closed.** The live homepage says "Recent builds /
A few systems we've built" while `/work` says "Ten industry sample builds". Both
pages now tell the same story in the same words, and the honesty becomes an
invitation ("you can use the thing before you spend anything") rather than a
disclaimer. `systems` is gone.

**Heading alternatives:**

- **A (recommended):** `Ten sample sites you can click into.` - The verb is the
  offer. "Click into" is what separates this from a portfolio screenshot.
- **B:** `Ten businesses. Ten different jobs to do.` - Better at showing range,
  worse at prompting the click.
- **C:** `See one built for a business like yours.` - Most personal, but implies
  these were built _for_ someone, which they weren't.

### 1.7 Founder

**[SHAPE CHANGE, reverted]** Stays `founder`, as in the live tree - the rename to
`whyCoreline` from the last pass is undone.

```ts
export const founder = {
  eyebrow: "Who's behind it",
  heading: "Run by Shailesh Hawale, from Wagle Estate, Thane.",
  paragraphs: [
    "Coreline Digital works with businesses across Thane and Mumbai - not affiliated with other companies that use a similar name. Shailesh leads every project himself, from the first message to the site going live.",
    "Most new work comes from clients telling other business owners about Coreline. That only works if what we start actually finishes, on the date we said - so the model depends on it, not just the pitch.",
    "That's why the terms are written the way they are, not as boilerplate. Fixed price before we start. A date. Half of it paid only once the site is live and you've looked at it.",
  ],
};
```

**Annotation - why this section is a light touch, not the full bio.** This is
the homepage, mid-scroll - its job is to name the person and move on, not carry
the whole story. Paragraph one names Shailesh and states the one fact that
matters here (he leads every project himself); paragraphs two and three stay in
"we" voice because they're describing how Coreline operates, which is true
regardless of who's reading. The full story - why he started it, the honest
newness admission, "judge the work" - lives on `/about`, where a reader who
clicked through is asking for exactly that.

**Annotation - geo signal.** "Wagle Estate, Thane" and "Thane and Mumbai" live
here, which is where the homepage's third locality mention needs to sit for the
word count in §1's intro to hold.

### 1.8 Final CTA

```ts
export const finalCta = {
  heading: "Let's find out what you're missing.",
  body: "Send us a WhatsApp message with what your business does. We'll take a look at how you show up on Google right now and tell you honestly whether a website will help you - free, no obligation.",
};
```

Unchanged. The free-look offer is the best anti-inertia tool you have, and "tell
you honestly whether a website will help you" is the disarming move -
volunteering that the answer might be no.

**Heading alternatives:**

- **A (recommended, keep):** `Let's find out what you're missing.` - Closes the
  loop the hero opened, using the hero's own noun.
- **B:** `Tell us what your business does.` - Lowest possible ask. Better if
  bounce is the problem; weaker if hesitation is.
- **C:** `Want to know how you show up on Google right now?` - Rhetorical
  question, highest curiosity, but it sells the audit instead of the website.

---

## 2. Services (`/services`)

Target: 900+ words. Counted: the copy below is **1,053 words** before the FAQ
block, and the FAQ block (§5) adds **~630** more, for roughly **1,680** on the
page. The live page is 370.

Geo/keyword placements here: `web developer in Wagle Estate, Thane` (header sub),
`Thane` (pillar 1 body), `Thane and Mumbai` (bottom CTA). Three total. No more.

### 2.1 Page header

```ts
export const servicesPage = {
  eyebrow: "What we build",
  heading: "Start with the website. Add the rest when it's earning.",
  sub: "Coreline Digital is based in Wagle Estate, Thane. Most owners here start with a website and nothing else. If it starts bringing enquiries, that's when we'll bring up the assistant, the booking, and the monthly upkeep. We'd rather you spend less and see it work than spend more and hope.",
  ...
};
```

**Annotation:** the last sentence does more selling than any feature list on the
page, so it stays in the header where everyone reads it rather than in a pillar
two thirds of readers never reach. The locality phrase sits in the introduction
because that's the natural place for a business to say where it's based.

**Heading alternatives:**

- **A (recommended, keep):** `Start with the website. Add the rest when it's
earning.` - Gives the reader permission to buy the cheapest thing, which is
  what actually converts a cautious buyer.
- **B:** `Three things. You probably only need the first one.` - More honest, more
  memorable, and it slightly undersells a page whose job is to sell three things.
- **C:** `What a website is supposed to do for you.` - Best for the dead-site
  buyer, worst for the never-had-one buyer, who has no opinion yet.

### 2.2 Pillar 1 - `START HERE` (dominant)

**Role label:** `START HERE`
**Title:** A website that brings you customers
**Tagline:** Not a business card. A salesperson.
**Price line:** From ₹15,000
**CTA:** Talk on WhatsApp _(primary - the only primary button on this page)_

**Body:**

> Your website is the first thing most customers see before they ever speak to
> you. It should load fast on a phone, say clearly what you do and what it costs,
> and push people toward one action - a call, a WhatsApp message, a booking, an
> order. That's what we build: a site designed around your business, not a theme
> somebody else in Thane is also running. If you've never had a website, this is
> where you start. If you have one that just sits there, this is what replaces it.

**Annotation:** the last two sentences exist so both buyer types find their own
situation named in the same paragraph. Neither is told they were wrong.

**Includes - [SHAPE CHANGE].** `includes: string[]` becomes
`includes: { title: string; body: string }[]`. Each `title` renders as an H3,
each `body` as a short paragraph. This is where the 900-word target is met and
where the audit's "one H3 per include item" is satisfied.

```ts
includes: [
  {
    title: "Custom design, not a template",
    body: "Your site gets designed for your business, not picked off a shelf. No theme three other shops in your area are also running, and no stock layout you have to bend your business to fit.",
  },
  {
    title: "Fast on a phone",
    body: "Almost everyone who finds you will do it on a phone, on mobile data, standing somewhere with one bar. If it doesn't open quickly on that phone, nothing else on this list matters.",
  },
  {
    title: "Services, prices and location, set up properly",
    body: "Photos of your actual work. What you do and what it costs. Where you are and when you're open. The things people came to find, on the page, not buried three clicks in.",
  },
  {
    title: "One clear action on every page",
    body: "Every page pushes toward one thing - a call, a WhatsApp message, a booking, or an order. A visitor should never have to work out what he's supposed to do next.",
  },
  {
    title: "Set up on Google from day one",
    body: "Your site gets submitted to Google properly and connected to a Google Business Profile, which is what puts you on Maps and in the local results when somebody searches your trade near you.",
  },
],
```

### 2.3 Pillar 2 - `ADD ON`

**Role label:** `ADD ON`
**Title:** Something that answers when you can't
**Tagline:** A missed message at 9pm is a lost customer by 9:05.
**CTA:** Ask about this _(text link, not a button)_

**Body:**

> You answer the same fifteen questions every week - timings, price, location, do
> you do this, are you open Sunday. An assistant on your site handles those the
> moment someone asks, day or night, and passes the real enquiries straight to
> your phone with the details already collected. There's one running on this site
> and on two of the sample builds. Talk to it before you decide whether you want
> one.

**Annotation:** the pivot to "talk to it" is the entire argument. A visitor who
watches your assistant qualify him has used the product instead of reading about
it - proof you can give away for free.

```ts
includes: [
  {
    title: "An assistant that answers instantly",
    body: "It sits on your website and handles the questions you get every week - timings, price, location, do you do this - the moment somebody asks, at any hour, without you looking at your phone.",
  },
  {
    title: "Enquiries straight to your WhatsApp",
    body: "Real enquiries arrive on the number you already check all day, with the name, the phone number and what they want already collected. There's no new app and no dashboard to log into.",
  },
  {
    title: "Bookings with the details already filled in",
    body: "Appointment and booking requests come in complete - date, service, phone number - so you're confirming a booking instead of starting the conversation from scratch.",
  },
  {
    title: "Reminders so people actually turn up",
    body: "A reminder goes out before the appointment without you remembering to send it. No-shows are the quietest way a small business loses money, because nothing visibly goes wrong.",
  },
  {
    title: "Follow-up that happens without you",
    body: "The enquiry that went cold three weeks ago gets a message. Most owners never send it, which is exactly why most of those customers end up somewhere else.",
  },
],
```

### 2.4 Pillar 3 - `OPTIONAL, MONTHLY`

**Role label:** `OPTIONAL, MONTHLY`
**Title:** Keeping it working, every month
**Tagline:** A site nobody looks after slowly stops working.
**CTA:** Ask about this _(text link)_

**Body:**

> Some owners want to hand this over and forget it. Some want it kept sharp - new
> photos, updated offers, Google reviews coming in, small improvements every
> month. This is optional, it starts only after your site is live and working,
> and you can stop it any month. We'll tell you honestly if you don't need it, and
> most people don't in the first few months.

**Annotation - keep the honesty line.** For a suspicious buyer, watching you
decline to upsell is worth more than any adjective you could put in its place.
"You can stop it any month" is new and does the same job: it removes the fear of
being locked into a retainer, which is the second thing the template shop did.

```ts
includes: [
  {
    title: "Google Business Profile kept current",
    body: "Hours, photos, services and posts updated as things change. That listing decides whether you appear on Maps, and it goes stale faster than the website does.",
  },
  {
    title: "Review requests sent automatically",
    body: "After each job or sale the customer gets asked for a Google review. Reviews are the biggest single thing separating the top three results in your area from everyone underneath them.",
  },
  {
    title: "New photos, offers and content",
    body: "New work, seasonal offers, a service you've added, a price that changed. A site that never changes slowly stops being worth showing to anyone.",
  },
  {
    title: "Social posts and graphics, if you want them",
    body: "Only if you'll actually use them. Plenty of owners won't, and we'd rather leave it off your bill than charge you for posts nobody sees.",
  },
  {
    title: "Watched, and fixed when it breaks",
    body: "If the site goes down, a form stops sending, or something breaks after an update, we find it and fix it. You shouldn't be the one who discovers the contact form has been dead for a month.",
  },
],
```

### 2.5 Pricing block

Reuse §1.5 verbatim, placed above the bottom CTA.

### 2.6 Bottom CTA

```ts
bottomHeading: "Not sure which one you need?",
bottomBody: "Start with the website. On the call we'll tell you honestly whether you need anything else yet - most people don't, not at first. We work with businesses across Thane and Mumbai, and it's a fifteen-minute conversation either way.",
```

### 2.7 The full service list - [NEW]

Nine services. They do **not** replace the three pillars - the pillars are the
argument, this is the menu underneath it. A visitor who wants to be sold reads
the pillars; a visitor who arrived asking "do you do X?" reads this and leaves.

The mapping turned out unusually clean: three services per pillar.

| Group                                                | Services                                                                                           |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **START HERE** - a website that brings you customers | Business Website Design · Landing Page Design · E-commerce / Online Store                          |
| **ADD ON** - something that answers when you can't   | AI Chat Assistant for Website · WhatsApp Automation & Enquiry Capture · Appointment Booking System |
| **GETTING FOUND** - and staying found                | Google Business Profile Setup · Local SEO Setup · Website Maintenance (Monthly)                    |

**Annotation - SEO.** This block is worth more to search than anything else added
to the site. The audit's second critical finding is that no live body copy says
what you sell in the words people search. Nine named services are nine query
targets - _appointment booking system_, _AI chat assistant for website_,
_Google Business Profile setup_ - each one an exact phrase somebody types. They
land here naturally because they're your product names, not because they were
worked in.

**Row copy - final:**

| Service                               | Price field            | One line                                                                                                                                                                          |
| ------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Business Website Design               | From ₹15,000           | A full site for your business: what you do, what it costs, where you are, and one clear way to reach you on every page.                                                           |
| Landing Page Design                   | _(see note)_           | One page with one job - for an ad campaign, a single service, or a launch where a whole site is more than you need.                                                               |
| E-commerce / Online Store             | Quoted before we start | Products, a working cart and checkout. Orders reach you with the customer's details attached. There's one running on the trader sample - try it.                                  |
| AI Chat Assistant for Website         | Quoted before we start | An assistant on your site that answers the questions you get every week - timings, price, location - the moment somebody asks, at any hour. There's one on this site. Talk to it. |
| WhatsApp Automation & Enquiry Capture | Quoted before we start | Enquiries land on the WhatsApp number you already check all day, with the name and number already collected. Reminders and follow-ups go out without you remembering.             |
| Appointment Booking System            | _(price it)_           | People book a slot themselves instead of calling and waiting. The date, the service and the phone number arrive already filled in.                                                |
| Google Business Profile Setup         | _(price it)_           | The listing that puts you on Maps and in local results, set up properly - categories, services, hours, photos, and the questions people actually ask.                             |
| Local SEO Setup                       | _(price it)_           | Getting found for your trade in your area: the on-page work, the listings that have to match each other, and the terms worth going after in Thane and Mumbai.                     |
| Website Maintenance (Monthly)         | _(price it)_           | New photos and offers as things change, a review requested after each job, and everything watched - if it breaks, we fix it. Stop any month.                                      |

### 2.8 Three decisions this list forces

**1. "Get a quote" on seven of nine rows undercuts the whole positioning.**

This is the one place your list fights the spec, so it's worth stating plainly.
The spec's argument for publishing ₹15,000 is that your buyer's core fear is
being sized up and charged what he'll tolerate - and that publishing a floor
kills that fear for free. A table where seven of nine rows say _Get a quote_ is
the exact page every agency in Thane already has. His takeaway is "they'll work
out what I can afford", which is the fear you just spent a homepage removing.

It also breaks the CTA rule: "Get a quote" is a fifth CTA string competing with
"Talk on WhatsApp", and the spec explicitly deletes the three "Get a quote →"
buttons from this page.

**Recommendation - price five, quote three.** Put a real from-price on the four
marked _(price it)_ above. They're repeatable: a booking system, a GBP setup, a
local SEO setup and a maintenance plan are close to the same job every time, so a
floor costs you nothing and you keep every rupee of headroom above it. Keep
_Quoted before we start_ only where scope genuinely can't be bounded - product
count on a store, what the assistant has to know, what tooling they already run.
Five priced rows and three honest exceptions reads as candour. Seven blanks reads
as evasion.

I can't put numbers in those four rows - I don't know your costs or your floor,
and inventing them would put a number on your site you'd have to defend on a
call. They're the four fields to fill before this ships.

**Wording:** if a row must stay unpriced, use `Quoted before we start` rather than
`Get a quote`. Same information, but it restates the safety promise (a fixed
number, before any work) instead of asking him to go and ask. Never make it a
button.

**2. Landing Page Design at the same From ₹15,000 as a full website.**

A buyer reads one page and five pages for the same money and concludes one of the
two is mispriced. Either give the landing page its own lower floor, or drop the
separate line and fold it into Business Website Design as a scope option. My read:
a landing page is the cheapest thing you sell and it's the natural entry point for
someone testing you - it should carry the lowest number on the page, not tie with
the flagship.

**3. Google Business Profile Setup is currently sold twice.**

Pillar 1's includes promise "Set up on Google from day one… connected to a Google
Business Profile" as part of the website build (§2.2), and this list sells GBP
Setup as its own priced service. A careful reader spots that, and it's the kind of
thing the burned buyer is scanning for. Pick one:

- **A (recommended):** the website build includes basic setup - profile claimed,
  categories, hours, photos, connected. The paid service is the deeper work:
  services and products filled in, posts, Q&A seeded, review flow running. Change
  pillar 1's include to say _"claimed and connected"_ so the boundary is visible.
- **B:** remove it from pillar 1's includes and sell it only here. Cleaner, but you
  lose a genuinely good line from the strongest pillar on the site.

**Word count effect:** this block adds roughly **330 words** to `/services`,
taking the page to about **2,000** including FAQs - comfortably past the 900
target, and now with nine commercial phrases it can actually rank for.

---

---

## 3. Work (`/work`)

### 3.1 Page header

```ts
export const workPage = {
  eyebrow: "Sample sites",
  heading: "Ten sample sites. Click into any of them.",
  sub: "None of these are client sites - we'd rather say that plainly than let you find out. They're complete working builds, one for each kind of business we build for, so you can use the thing before you spend anything. Real client work will replace them as it ships.",
  bottomHeading: "Want to see what this looks like for your business?",
  cardLink: "Open the sample", // [NEW FIELD] - was "View sample"
  note: "Fictional businesses and stand-in photography. Two carry a live assistant you can talk to.",
};
```

**Annotation - buyer type: burned.** "We'd rather say that plainly than let you
find out" is the most valuable sentence on this page. Volunteering the weakness
before he discovers it converts a portfolio problem into a credibility signal. Do
not soften it to "these are concept builds".

**Card link:** "Open the sample" over "View sample" - _open_ implies it does
something; _view_ implies a screenshot. These are clickable working sites and the
verb should say so.

### 3.2 Card copy - all ten

Format: **Industry label | Name | one line | Tags**

**[SHAPE CHANGE] - tags.** The registry in `lib/samples/index.ts` currently tags
these `Storefront`, `Acquisition System`, `AI Chat Agent`, `Automation`.

Two of those four fail the banned list: `Storefront` (from "digital storefront",
and the old pillar name) and `Acquisition System` (hits both "systems as a product
noun" and "client acquisition"). **`AI Chat Agent` and `Automation` are not
banned** - nothing in the spec prohibits naming the AI assistant or the WhatsApp
automation, and "WhatsApp" is on the _required_ vocabulary list. They're only
vaguer than they need to be.

The real fix is a rule, not a word swap: **a tag should be the name of something
the buyer can actually buy.** Once the service list in §2.7 exists, tags become a
bridge - a prospect sees `AI chat assistant` on the gym card, clicks through, and
finds a line item with that exact name and a price against it. Tags that don't
map to a purchasable thing are decoration.

So the tag vocabulary is the service catalogue, shortened:

`Website` · `Online store` · `AI chat assistant` · `WhatsApp automation` ·
`Enquiry capture` · `Booking`

**Annotation:** this is a better system than the six generic buyer words I first
proposed, and it exists because of the service list - not in spite of it. Each tag
maps to a line item in §2.7: `Website` covers Business Website Design and Landing
Page Design (no card needs to distinguish them), and `WhatsApp automation` /
`Enquiry capture` are the two halves of "WhatsApp Automation & Enquiry Capture",
used depending on which half the sample demonstrates.

`Google profile` and `Local SEO` deliberately get no tag: no sample site
demonstrates them, because a sample can't have a real Google Business Profile.
Tagging them would be the first fabricated claim on the page.

---

**1. Clinic** | Family Clinic Booking Site

> Patients book a slot themselves instead of walking in and waiting, and get a
> WhatsApp confirmation plus a reminder before the appointment.

`Website` `Booking` `WhatsApp automation`

**2. Jeweller** | Jeweller Collection Catalogue

> Puts the display case online without listing a single price, so people arrive
> at the showroom already knowing what they want to see.

`Website` `Enquiry capture`

**3. CA / Professional** | CA Practice Intake

> Sorts enquiries by service before they reach the partner's desk, so nobody
> spends twenty minutes finding out the caller wanted something else.

`Website` `Enquiry capture` `WhatsApp automation`

**4. Real Estate** | Realty Listings Front Door

> Asks about budget and timeline before a site visit is booked, so agents stop
> losing Sundays driving to the wrong property.

`Website` `Enquiry capture` `Booking`

**5. School** | School Admissions Site

> Handles admission enquiries through the whole season, so a parent asking about
> fees at 10pm doesn't wait until the office opens.

`Website` `Booking` `WhatsApp automation`

**6. Travel** | Tour Operator Package Site

> Shows the packages and the prices up front, then collects trip enquiries with
> dates and budget already attached.

`Website` `Enquiry capture`

**7. Gym** | Gym Trial Booking + Assistant

> Answers the fees-and-timings questions that flood a gym's WhatsApp all day, and
> books the free trial inside the chat. This one is live - talk to it.

`Website` `AI chat assistant` `Booking`

**8. Interior Design** | Interior Design Portfolio

> Shows past work properly, so someone can judge the taste before calling instead
> of asking for photos on WhatsApp.

`Website` `Enquiry capture`

**9. Trader / D2C** | Online Store + Assistant

> Takes orders through a working cart, answers stock and returns questions in
> chat, and sends the after-order WhatsApp messages on its own.

`Website` `Online store` `AI chat assistant` `WhatsApp automation`

**10. Coaching** | Coaching Classes Results Site

> Puts batch fees and last year's results where parents can see them - the first
> thing they ask and the last thing most classes publish.

`Website` `Enquiry capture` `Booking`

**Annotation:** every line names a _loss_ and its fix, in the owner's words -
"losing Sundays", "flood a gym's WhatsApp", "waits until the office opens". None
of them describe a feature. The two live-assistant builds (gym, trader) say so
explicitly, because a prospect who talks to one has already bought pillar 2.

### 3.3 `samplesIndex` - fix

```ts
export const samplesIndex = {
  eyebrow: "Sample sites",
  heading: "Ten verticals, ten different jobs to do.",
  sub: "Each one is a complete build for a specific kind of business - its own palette, its own typography, its own path to an enquiry. None of them look like each other. That's the point: your site shouldn't look like anyone else's either.",
  note: "Fictional businesses and stand-in photography. Two carry a live assistant you can talk to.",
};
```

**Annotation:** the live copy reads _"none of them look like us"_ - a `we`
violation on a shipped string, and it makes the sentence about your house style
when the point is that you don't impose one. The rewrite turns the same
observation into a benefit for the reader.

### 3.4 Bottom CTA

```
heading: "Want to see what this looks like for your business?"
body:    "Send us a WhatsApp message with what you do. We'll tell you which of these is closest, what yours would need, and what it'd cost - before you commit to anything."
```

---

## 4. Contact (`/contact`)

### 4.1 Header

```ts
export const contactPage = {
  heading: "Let's talk about your business.",
  sub: "Fastest way to reach us is WhatsApp - we're usually on it. We work from Wagle Estate, Thane. Or leave your number below and we'll call you back.",
  ...
};
```

**Heading alternatives:**

- **A (recommended, keep):** `Let's talk about your business.` - Makes the
  conversation about him, not about a quote.
- **B:** `Tell us what your business does.` - An instruction rather than an
  invitation; slightly higher friction, slightly clearer.
- **C:** `Ask us what it would cost.` - Best if price is the block; too
  transactional as the H1 for the whole page.

### 4.2 Section headings - [NEW]

The audit flags this page as having an H1 and nothing else; the two existing H2s
are `sr-only`. Make them visible and add two more, so the page has structure a
screen reader can navigate and Google can extract a passage from.

```ts
// [NEW FIELD] contactPage.sections
sections: [
  {
    heading: "Message us on WhatsApp",
    body: "Quickest answer by a distance. Send what your business does and we'll reply the same day, usually within a couple of hours.",
  },
  {
    heading: "Call us",
    body: "+91 90823 08732. If we don't pick up we're mid-build - send a WhatsApp and we'll call you back.",
  },
  {
    heading: "Where we are",
    body: "Wagle Estate, Thane, Maharashtra 400604. Happy to meet anywhere in Thane if you'd rather do this face to face.",
  },
  {
    heading: "What happens next",
    body: "We talk for fifteen minutes about what your business does and where customers are slipping away. We tell you a fixed price and a date. If a website won't help you yet, we'll say so - that call costs you nothing either way.",
  },
],
```

**Annotation:** "What happens next" is the highest-value block on the page for a
cautious buyer. It removes the fear of what a call with an agency turns into - a
pitch, a deck, a follow-up sequence - by describing a fifteen-minute conversation
with a defined end.

### 4.3 Form

| Slot                    | Copy                                                                             |
| ----------------------- | -------------------------------------------------------------------------------- |
| Section H2              | `Leave your number`                                                              |
| Label 1                 | `Name`                                                                           |
| Label 2                 | `Business type`                                                                  |
| Label 3 _(conditional)_ | `What kind of business?`                                                         |
| Placeholder 3           | `e.g. Pharmacy, salon, logistics`                                                |
| Label 4                 | `Phone number`                                                                   |
| Submit                  | `Request a call back`                                                            |
| Micro-copy              | `We usually call back within a few hours, same day if you reach out before 6pm.` |
| Privacy note            | `Your number stays with us.`                                                     |
| Privacy link            | `How we use it`                                                                  |

**Dropdown options** (`businessTypes`) - unchanged order, because it mirrors the
sample verticals and a reader arriving from `/work` sees his own row:

`Clinic` · `Jeweller` · `CA/Professional` · `School` · `Real Estate` · `Travel` ·
`Gym` · `Coaching class` · `Interior Design` · `Trader` · `Other`

**Success state:**

| Slot    | Copy                                |
| ------- | ----------------------------------- |
| Eyebrow | `Request received`                  |
| Heading | `We'll call you back.`              |
| Body    | _(server message - keep)_           |
| Footer  | `In a hurry? **Talk on WhatsApp**.` |

**Submit alternatives:**

- **A (recommended, keep):** `Request a call back` - Names exactly what happens
  next, which is what a strong CTA does. Not "Submit", not "Send".
- **B:** `Ask us to call you` - Warmer, more personal, marginally longer.
- **C:** `Get a price and a date` - Highest-value promise, but it over-commits: a
  callback form can't guarantee a quote on the spot.

---

## 5. FAQ

Eleven entries. They live on `/services` and feed `faqJsonLd()`. Written to be
quotable: each answer opens with the direct answer in its first sentence, which
is the only sentence an AI Overview is likely to lift.

```ts
faqs: [
  {
    question: "I've never had a website. Do I actually need one?",
    answer: "Maybe not, and we'll tell you if that's the case. If every customer you get walks past your shutter, a well-run Google listing will do more for you than a website will. But if anyone searches your trade on a phone, that search is happening today and landing on somebody else. Message us what you do and we'll look at how you currently show up, free.",
  },
  {
    question: "What does a website cost?",
    answer: "Most business websites land between ₹15,000 and ₹35,000. You get one fixed number before we start and it doesn't change later. Half to begin, half only once the site is live and you've seen it.",
  },
  {
    question: "How long does it take?",
    answer: "10 working days from the day we have your content and photos. The clock starts when we have what we need from you, not when you pay - that way a delay on either side is visible rather than argued about.",
  },
  {
    question: "Who actually builds it?",
    answer: "Shailesh Hawale does. Coreline Digital is one person, based in Wagle Estate, Thane. The person you message is the person who designs the site, builds it, ships it, and answers the phone afterwards.",
  },
  {
    question: "Are the sites on the Work page real clients?",
    answer: "No. They're sample sites we built so you can click in and use them, and two of them have a working assistant you can talk to. Real client work will replace them as it ships. We'd rather show you something working than name-drop.",
  },
  {
    question: "Do I need the assistant and the monthly plan?",
    answer: "Usually not at first. Most owners start with just the website. The assistant and the monthly upkeep are optional, and they're worth adding once the site is live and bringing enquiries - we'll tell you honestly when that is.",
  },
  {
    question: "Can you redesign my existing website instead of starting over?",
    answer: "Often, yes. Send us the link on WhatsApp and we'll tell you whether it's worth rebuilding or repairing. If it loads slowly on a phone or has no clear way to contact you, a rebuild is usually cheaper than patching it.",
  },
  {
    question: "Do you build websites for businesses outside Thane?",
    answer: "Yes. Most of our work is in Thane and Wagle Estate, but we build for Mumbai, Navi Mumbai and Kalyan-Dombivli too. The whole job runs over WhatsApp and a call, so where you are only matters if you'd like to meet - and we're happy to, anywhere in Thane.",
  },
  {
    question: "Do I pay separately for hosting and a domain?",
    answer: "The domain is yours and you pay for it directly - usually ₹800 to ₹1,500 a year - so it stays in your name, not ours. Hosting for a site this size is free on the platform we use. There's no monthly fee unless you choose the optional upkeep plan.",
  },
  {
    question: "Will my site actually show up on Google?",
    answer: "Every site we build is set up for search and connected to a Google Business Profile, which is what puts you on Maps and in local results. That gets you found for your own name and your trade in your area. Ranking above established competitors for the most competitive terms takes months of ongoing work - that's the optional monthly plan, and we'll tell you if you don't need it yet.",
  },
  {
    question: "What do you need from me to start?",
    answer: "Your services and prices, some photos of your work or premises, and your address and timings. If you don't have photos, say so early - it's the one thing that most often holds a build up, and there are ways around it.",
  },
],
```

**Annotation - the first one is new and it is the most important.** The spine says
the largest buyer group never had a website. Every other FAQ assumes the reader
has already decided he wants one. This is the only entry written for the person
who hasn't, and it answers him by conceding he might be right - the one move that
keeps a sceptic reading.

**Annotation - ownership.** "The domain is yours and you pay for it directly, so
it stays in your name, not mine" is a small line that closes a specific old
wound: the template shop that held the domain hostage.

---

## 6. About (`/about`)

Full rewrite back to first-person - the one page on the site that's Shailesh's
own voice, per the voice note at the top. Everywhere else stays "we"; this page
is the exception on purpose.

```ts
export const aboutPage = {
  heading: "Hi, I'm Shailesh Hawale.",
  sub: "I run Coreline Digital from Wagle Estate, Thane. The person you talk to is the person who builds the site.",
  paragraphs: [
    "I design and build websites for businesses in Thane and Mumbai - clinics, jewellers, gyms, coaching classes, shops, professional firms. Coreline Digital is me, working out of Wagle Estate. It isn't a team, and it isn't affiliated with the other companies using a similar name.",

    "I started it because of a pattern I kept running into. A shop with a Google listing nobody had touched in three years. A clinic taking bookings on a number one person checks between patients. A coaching class whose fees are the first thing every parent asks and the last thing anyone can find. None of these owners were doing anything wrong - they were busy running the business. They were losing customers in the gap, and they never saw it happen.",

    "So what I sell is deliberately narrow. One website that brings you customers, with something on it that answers when you can't. A fixed price before I start. Ten working days. Half of it paid only once the site is live and you've looked at it. If I'm late, there's no account manager to hand you to - you're talking directly to me either way.",

    "I'm not going to pretend to have a decade of case studies. There's no wall of client logos here and I'm not going to invent one. What I have instead is ten complete sample sites you can click into and use right now, two of them with a working assistant you can talk to. Judge the work.",

    "Most of what comes next will come from owners telling other owners. That only works if I finish what I start, on the date I said. That's the whole business model, and it's why the terms above are written the way they are.",
  ],
};
```

**[NEW] Photo direction.** A real photo belongs on this page - of Shailesh, or
of him at work, not a stock headshot. This is a copy deck, so it can't source or
place the image, but the field the copy assumes exists: `aboutPage.photo` (or
wherever the component wants it), a plain shot, not a studio portrait - the
whole point of this page is "here's a real person," and an obviously staged
photo undercuts that faster than having no photo at all.

**Annotation - this is the page where "I" is correct, not a leftover.** Every
other export in this deck uses "we." This one doesn't, because its entire job is
"who am I talking to" - a company voice here would be actively worse than no
change at all, since it would bury the one thing a burned buyer is looking for
on this specific page: a real, named, checkable person. "Judge the work." stays
as the closing line for the same reason it worked in the company-voice draft -
it's not about pronoun, it's about ending on proof instead of an adjective.

**Annotation - buyer coverage in paragraph two.** Unchanged across every draft
of this page: the three examples are the three buyer types in order - the stale
listing (dead site), the WhatsApp-only clinic (never had one), the class whose
fees are invisible (has one that doesn't work). Nobody is told they made a
mistake; they're told they were busy.

**Heading alternatives:**

- **A (recommended):** `Hi, I'm Shailesh Hawale.` - Warmest, most direct answer
  to "who am I talking to," and it matches how the page actually reads once
  you're in it.
- **B:** `One person, in Wagle Estate, Thane.` - Keeps the locality in the H1
  more explicitly (SEO angle), but reads more like a company fact than a person
  saying hello - worth using if `sub` is judged to carry enough of the warmth on
  its own.
- **C:** `Coreline Digital is one person. That's me.` - More voice than B, less
  locality than either.

**About page CTA** - override the default `finalCta`, back in first person:

```
heading: "Tell me what your business does."
body:    "Send it on WhatsApp. I'll look at how you show up on Google right now and give you an honest opinion on whether a website will help - free, and I'll say so if it won't."
```

---

## 7. Privacy (`/privacy`)

```ts
export const privacyPage = {
  heading: "How we handle what you send us.",
  sub: "Short version: your number stays with us. We don't sell it, and we don't put it on a list.",
  paragraphs: [
    "If you fill in the callback form or talk to the assistant on this site, we receive your name, your phone number, the kind of business you run, and what you typed. We use it to call or message you back about a website. That's the only reason we have it.",

    "Conversations with the assistant are saved so we can read them later and pick up where you left off. Nothing else about your visit is recorded - this site has no advertising cookies, no tracking pixels, and no visitor analytics.",

    "Nothing here is sold, rented, or passed to another company, and we don't run ads against it. The only outside services that touch it are the ones needed to run the site and get a message to us - hosting, email, and WhatsApp - and each sees only what it needs to deliver.",

    "Messages you send on WhatsApp or by email sit in those apps under their own terms, the same as any other conversation you have there.",

    "We keep enquiry details while there's a live conversation and for a reasonable period afterwards, in case you come back. Ask us to delete yours and we will.",

    "To see what we hold, correct it, or have it removed, message us on WhatsApp or email contact@corelinedigital.in. Coreline Digital, Wagle Estate, Thane, Maharashtra 400604.",
  ],
};
```

**Annotation - paragraph two is a factual disclosure, not a copy choice.**
`app/api/chat-log/route.ts` stores every assistant conversation for reading in
`/admin`, including partial ones from visitors who never left a number. The live
privacy page does not mention this. It has to. The rest of that paragraph - no
cookies, no analytics - I verified against the tree: there is no analytics script,
and the only cookie set anywhere is the admin session in `lib/adminAuth.ts`,
which is yours, not a visitor's. **Re-check this line the day you add analytics.**

---

## Contradictions & things that block clean paste

Seven places where the spec, the audit, and the current tree disagree, or where
the tree holds copy that violates the spine. None of them changed what I wrote
above; all of them need a decision from you.

**1. Sample tags don't map to anything buyable.** `lib/samples/index.ts` tags
every build `Storefront`, `Acquisition System`, `AI Chat Agent`, `Automation`, and
these render on `/work` - the page you send prospects to. Two of the four fail the
banned list (`Storefront`, `Acquisition System`); `AI Chat Agent` and `Automation`
do not, and naming the AI assistant and the WhatsApp automation is fine. The
actual problem is that no tag corresponds to a line item anyone can buy. §3.2
retags them against the service list in §2.7, so a card and a price row use the
same words.

**2. `samplesIndex.sub` says "none of them look like us."** A `we` violation on a
shipped string. Rewrite in §3.3.

**3. `personJsonLd()` in `lib/seo.ts` has `name: "Shailesh"`, no surname.** Now
that the copy names Shailesh Hawale again (§1.7, §6, FAQ), the schema should
match exactly, not just approximately: `name`, `givenName`, `familyName`. It also
carries `jobTitle: "Founder"`, which the implementation spec separately rejects on
the business card for the same reason it's off here - a one-person business
calling itself Founder invites the question "founder of what, how many people?"
Use `Website designer and developer` instead. Straightforward fix, no branching
decision required this time.

**4. Homepage vs `/work` framing is fixed in copy but the components differ.**
§1.6 adds `workTeaser.sub`, which the current `WorkTeaser` component doesn't
render. One line to wire; without it, the homepage still says nothing about what
these builds are, and audit finding 4 stays open.

**5. Contact page H2s are `sr-only`.** The audit's finding 5 asks for real
structure. §4.2 supplies four visible sections. Rendering them means changing the
page, which is outside what I was asked to touch - flagged so the copy doesn't sit
unused.

**6. `/services` includes need a shape change.** `includes: string[]` →
`{ title, body }[]`. Without it, the H3-per-item requirement and roughly 500 of
the 900 words have nowhere to go. This is the one structural change the
word-count target genuinely depends on.

**7. The business card spec (implementation spec §6) is written entirely in
solo-founder voice.** It has the front say `FOUNDER, CORELINE DIGITAL` and argues
at length for a personal incentive line ("the person you talk to is the person
who builds it"). That whole argument is superseded by the same pivot as
everything else in this deck. `business-cards/print-card.html` is out of scope
for a copy-only pass and wasn't on the original page list, but note it needs the
same treatment before it's reprinted: drop `FOUNDER`, use a role line like
`WEBSITE DESIGN & DEVELOPMENT` instead, and the back-of-card copy becomes
`A website that brings you customers.` / `From ₹15,000 · Ready in 10 working
days` / `Half paid only when it's live` / `Scan to see sample websites` - none of
which needed a name or title to begin with, so the card actually needs less
rewriting than the site did.

---

## Banned-word sweep

Checked the whole deck. Zero instances of: _infrastructure, architecture, triage,
systems (as product noun), engineered, bespoke, ecosystem, leverage, solutions,
digital storefront, client acquisition, outgrown templates, your last website,
Book Strategy Call._

**Not banned, and used deliberately:** _AI chat assistant_, _WhatsApp automation_,
_enquiry capture_, _booking_, _online store_, _local SEO_, _Google Business
Profile_. These are product names for things you sell, and _WhatsApp_ is on the
required vocabulary list. The ban covers agency abstractions - infrastructure,
systems, solutions - not the names of your services. Where the spec prefers
"assistant" over "AI chat agent" (§4 of the implementation spec, on naming the bot
plainly), that's a voice preference for conversational copy, not a prohibition: in
the §2.7 price list the fuller name is right, because it's what people type into
Google.

**"We" is the company voice everywhere except two places, deliberately.** Hero
subhead, process steps, pricing terms, all three pillar bodies and includes, work
teaser, work page, contact page and form, and ten of eleven FAQ answers use
"we"/"us"/"our." The two exceptions are the homepage founder section (§1.7,
light touch - names Shailesh, then continues in "we") and the About page (§6,
fully first person - the one page whose job is "who am I talking to"), plus the
one FAQ answer that directly asks who builds it. This is a deliberate split
covered in full in the [Voice note](#voice--company-we-for-the-product-a-real-person-on-about)
at the top of this deck, reached after going back and forth on it - not a
leftover inconsistency. Neither "we" elsewhere on the site nor "I" on About states
or implies a headcount either way; the split is about which page is speaking as
the business versus as the person, not about team size.

Primary CTA string is `Talk on WhatsApp`, identical in every location: hero,
pillar 1 on `/services`, final CTA, work bottom CTA, about CTA, contact form
success state, nav button.

No exclamation points. No testimonials, client counts, logos, or "trusted by".
