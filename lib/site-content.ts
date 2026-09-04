/**
 * Copy and structured data for the 2026 dark rebuild (`app/(site)` tree).
 *
 * Source of truth is `designs/coreline-rebuild-brief.md` - edit copy against
 * that document, not by eyeballing components. Distinct from `lib/content.ts`,
 * which still drives `/samples`, `/admin`, and the existing chat/lead backend
 * and is deliberately left untouched (different voice, different infra).
 *
 * Contact identity (phone) is a placeholder throughout - see
 * `designs/coreline-rebuild-brief.md` §14. Swap `site.phone` /
 * `site.phoneHref` / `site.whatsappHref` in one place here when the real
 * number is ready.
 */

export const site = {
  name: "Coreline Digital",
  url: "https://www.corelinedigital.in",
  location: "Wagle Estate, Thane",
  region: "Maharashtra, India",
  phone: "+91 90823 08732",
  phoneHref: "tel:+919082308732",
  whatsappNumber: "919082308732",
  email: "contact@corelinedigital.in",
  emailHref: "mailto:contact@corelinedigital.in",
  socials: {
    instagram: "https://www.instagram.com/corelinedigitall/",
    linkedin: "https://www.linkedin.com/company/coreline-digital/",
  },
} as const;

/** Every WhatsApp CTA on the site routes through this, so the message context is never lost. */
export function whatsappHref(context: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    `Hi Coreline - I was on ${context}.`,
  )}`;
}

export const cta = {
  primary: "WhatsApp us",
  secondary: "Call us",
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const legalNav = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

export const industryTicker = [
  "Jewellers",
  "Clinics",
  "Gyms",
  "Real estate",
  "Schools",
  "Chartered accountants",
  "Interior designers",
  "Travel agencies",
  "Traders",
] as const;

// ---------------------------------------------------------------------------
// Services - single list, reused on home (slabs) and /services (detail blocks)
// ---------------------------------------------------------------------------

export type ServiceId =
  | "websites"
  | "ai-agents"
  | "automations"
  | "local-search"
  | "apps"
  | "crm-software"
  | "branding"
  | "social-content";

export type Service = {
  id: ServiceId;
  name: string;
  /** Homepage slab - short. */
  promise: string;
  /** /services detail block - one-sentence promise from the brief. */
  hubPromise: string;
  /** /services detail: five hairline-separated "what's included" lines. */
  included: readonly [string, string, string, string, string];
  /** /services detail block "for:" line. */
  forWhom: string;
};

export const services: readonly Service[] = [
  {
    id: "websites",
    name: "Websites",
    promise: "Hand-built and fast on mobile data. Made to turn visitors into calls.",
    hubPromise: "A site that loads fast and turns visitors into phone calls.",
    included: [
      "Design and build from scratch",
      "Mobile-first, tested on real budget phones",
      "Copy written for your customers",
      "Google Business set up properly",
      "You own the domain, hosting and code",
    ],
    forWhom: "Any business whose current site is slow, dated, or doesn't exist.",
  },
  {
    id: "ai-agents",
    name: "AI agents",
    promise: "Trained on your services and timings. Answers and books while you sleep.",
    hubPromise: "A chat assistant trained on your business that answers when you can't.",
    included: [
      "Trained on your services, timings and pricing",
      "Works on your site and on WhatsApp",
      "Captures names and numbers automatically",
      "Hands off to a human when it should",
      "Learns from what people actually ask",
    ],
    forWhom: "Businesses losing enquiries after hours or during rush.",
  },
  {
    id: "automations",
    name: "Automations",
    promise: "Confirmations, reminders and review requests that send themselves.",
    hubPromise: "The follow-ups nobody has time to send, sent automatically.",
    included: [
      "Booking and order confirmations",
      "Appointment reminders",
      "Review requests after a visit",
      "Invoice and payment follow-ups",
      "Enquiries logged in one place",
    ],
    forWhom: "Anyone still doing this manually on WhatsApp.",
  },
  {
    id: "local-search",
    name: "Local search",
    promise: "Found by the people already searching for what you sell nearby.",
    hubPromise: "Show up when someone nearby searches for what you sell.",
    included: [
      "Google Business profile fixed and maintained",
      "A page per service and per area",
      "Technical fixes: speed, structure, indexing",
      "Review strategy",
      "Monthly report in plain language",
    ],
    forWhom: "Businesses invisible on Google despite being good at the job.",
  },
  {
    id: "apps",
    name: "Apps",
    promise: "Android and iOS, for when a website genuinely isn't enough.",
    hubPromise: "Android and iOS, when a website genuinely isn't enough.",
    included: [
      "Native or cross-platform",
      "Store listing and submission handled",
      "Push notifications",
      "Backend and admin panel",
      "Updates and maintenance",
    ],
    forWhom: "Businesses with repeat customers who need to log in, order or track.",
  },
  {
    id: "crm-software",
    name: "CRM & software",
    promise: "Custom tools shaped around how your business already runs.",
    hubPromise: "Custom tools shaped around how your business already runs.",
    included: [
      "Enquiry and lead tracking",
      "Inventory or catalogue systems",
      "Staff and scheduling tools",
      "Reporting dashboards",
      "Built to replace the spreadsheet you've outgrown",
    ],
    forWhom: "Businesses where the process lives in someone's head or in one huge Excel file.",
  },
  {
    id: "branding",
    name: "Branding",
    promise: "Logo, palette, cards, signage. One face everywhere.",
    hubPromise: "One consistent face, everywhere someone meets you.",
    included: [
      "Logo and marks",
      "Colour and typography system",
      "Business cards and stationery",
      "Signage and hoardings",
      "Packaging and labels",
    ],
    forWhom: "Businesses whose logo looks different on every surface it appears.",
  },
  {
    id: "social-content",
    name: "Social content",
    promise: "Monthly graphics and reels, handled on retainer.",
    hubPromise: "Monthly graphics and reels, so it stops being your problem.",
    included: [
      "Content calendar",
      "Post and story graphics",
      "Short-form video edits",
      "Festival and offer creatives",
      "Captions in Hindi or English",
    ],
    forWhom: "Businesses who post once, get nothing, and give up.",
  },
] as const;

export const bundles = [
  {
    name: "Get found",
    parts: "Website + Local search + Branding",
    body: "For businesses nobody can find yet. We build the thing, then make sure Google shows it.",
  },
  {
    name: "Get booked",
    parts: "Website + AI agent + Automations",
    body: "For businesses losing enquiries to slow replies. The site answers, books and follows up on its own.",
  },
  {
    name: "Get organised",
    parts: "CRM + Automations + Apps",
    body: "For businesses where the process has outgrown WhatsApp and Excel.",
  },
] as const;

// ---------------------------------------------------------------------------
// Demos - one entry per trade. All nine are demo builds (including the
// jeweller concept); they reuse /samples routes where available.
// ---------------------------------------------------------------------------

export type DemoEntry = {
  slug: string;
  /** Existing /samples/[slug] route this links to, or "" if none yet. */
  demoHref: string;
  trade: string;
  business: string;
  mockup: string;
  status: "Live" | "Demo build";
  /** ~100-150 word case-detail paragraph for /work. */
  caseDetail: string;
  /** One line under the card title. */
  tagline: string;
};

export const demos: readonly DemoEntry[] = [
  {
    slug: "jewellers",
    demoHref: "/samples/jeweller",
    trade: "Jewellers",
    business: "Vasant & Sons",
    mockup: "/lab/mockups/jeweller-mockup.png",
    status: "Demo build",
    tagline: "Catalogue, certification and trust, built for a considered purchase.",
    caseDetail:
      "A jeweller needs a site that carries the weight of the purchase - real photography, clear certification, and a catalogue that doesn't make someone scroll forever to find one piece. This demo covers browsing by category, WhatsApp enquiry on every piece, and a Google Business listing set up so someone nearby searching can actually find it. If we rebuilt it today, we'd add a save-for-later list - most jewellery visits happen more than once before a sale.",
  },
  {
    slug: "clinics",
    demoHref: "/samples/clinic",
    trade: "Clinics & doctors",
    business: "A multi-doctor clinic",
    mockup: "/lab/mockups/clinic-mockup.png",
    status: "Demo build",
    tagline: "Appointment booking and credentials, answered after hours.",
    caseDetail:
      "Clinics lose patients to whoever replies first, and most replies happen the next morning. This demo puts doctor credentials and timings up front, a booking flow that doesn't need a phone call, and an assistant that answers common questions - fees, insurance, what to bring - at 11pm. What we'd do differently: a shorter path from homepage to booking. Right now it's two taps; for a walk-in-heavy clinic, one is better.",
  },
  {
    slug: "gyms",
    demoHref: "/samples/gym",
    trade: "Gyms",
    business: "A neighbourhood gym",
    mockup: "/lab/mockups/gym-mockup.png",
    status: "Demo build",
    tagline: "Trial bookings and class timings, answered at 10pm.",
    caseDetail:
      "Someone deciding to join a gym usually decides at night, scrolling, after everyone else has gone home. This build is built around that moment: a trial-class booking that takes under a minute, plans laid out without needing a call, and an assistant that answers \"are you open right now\" honestly. What we'd change: the transformation photos need to be real member photos, not stock - for a gym, that's the whole pitch.",
  },
  {
    slug: "real-estate",
    demoHref: "/samples/realty",
    trade: "Real estate",
    business: "A local real estate broker",
    mockup: "/lab/mockups/realty-mockup.png",
    status: "Demo build",
    tagline: "Listings that load fast and a WhatsApp enquiry on every unit.",
    caseDetail:
      "Property sites usually die under their own photography - huge images, no compression, unusable on mobile data. This demo keeps listings fast, filterable by budget and area, with a WhatsApp enquiry on every unit instead of a contact form nobody fills. What we'd add: a saved-search alert, so a buyer gets pinged when something new matches instead of having to keep checking back.",
  },
  {
    slug: "schools",
    demoHref: "/samples/school",
    trade: "Schools & classes",
    business: "A coaching institute",
    mockup: "/lab/mockups/school-mockup.png",
    status: "Demo build",
    tagline: "Batch timings, results context and an enquiry that doesn't vanish.",
    caseDetail:
      "Parents comparing coaching classes want batch timings, faculty, and some sense of outcomes, in that order, on a phone, in under a minute. This build lays that out plainly and routes every enquiry straight to WhatsApp instead of a form that sits unread. What we'd do differently: a printable batch schedule - a surprising number of parents want to show it to someone else in the family before deciding.",
  },
  {
    slug: "chartered-accountants",
    demoHref: "/samples/ca",
    trade: "Chartered accountants",
    business: "A CA practice",
    mockup: "/lab/mockups/ca-mockup.png",
    status: "Demo build",
    tagline: "Services laid out plainly, for a client who wants credibility, not decoration.",
    caseDetail:
      "A CA's site has one job: look credible enough that a stranger sends over their financial documents. This demo keeps it plain - services listed clearly, credentials up front, no stock photos of people shaking hands. Enquiries go straight to WhatsApp with the service already noted. What we'd add: a secure document-upload link, so a new client can send the first set of papers before the first call.",
  },
  {
    slug: "interior-designers",
    demoHref: "/samples/interior",
    trade: "Interior designers",
    business: "An interior design studio",
    mockup: "/lab/mockups/interior-mockup.png",
    status: "Demo build",
    tagline: "A portfolio that loads fast enough for someone to actually see it.",
    caseDetail:
      "Interior design sells on photography, which is exactly what makes most designer sites slow to the point of unusable on mobile data. This demo compresses and lazy-loads every image so a full portfolio still loads fast, organised by room type instead of one long scroll. What we'd change: video walkthroughs for the larger projects - photos alone undersell a finished space.",
  },
  {
    slug: "travel-agencies",
    demoHref: "/samples/travel",
    trade: "Travel agencies",
    business: "A travel agency",
    mockup: "/lab/mockups/travel-mockup.png",
    status: "Demo build",
    tagline: "Packages that are easy to compare, with a human to call for the details.",
    caseDetail:
      "Travel packages have a lot of moving parts - dates, inclusions, group size - and most agency sites bury all of it under a phone-number-only contact page. This demo lays packages out for easy comparison, with WhatsApp enquiry pre-filled per package. What we'd add: a simple availability calendar, since dates are usually the first real question.",
  },
  {
    slug: "traders",
    demoHref: "/samples/trader",
    trade: "Traders & wholesalers",
    business: "A wholesale trading business",
    mockup: "/lab/mockups/trader-mockup.png",
    status: "Demo build",
    tagline: "A catalogue built for bulk enquiry, not a checkout cart.",
    caseDetail:
      "Wholesale buyers don't want a shopping cart, they want a catalogue and a fast reply on quantity and rate. This demo is built around that - browse by category, enquire on a whole order over WhatsApp, no login wall. What we'd do differently: a downloadable price list PDF for repeat buyers who don't want to browse the site again each time.",
  },
] as const;

export const homeDemoSlugs = ["jewellers", "clinics", "gyms"] as const;

// ---------------------------------------------------------------------------
// Page copy
// ---------------------------------------------------------------------------

export const homeCopy = {
  hero: {
    lines: ["WE BUILD WHAT", "YOUR BUSINESS", "IS MISSING"] as const,
    /** Two lines under the CTAs — deliberately split for the hero layout. */
    subLines: [
      "Websites, AI agents, automations and search.",
      "One team across Thane and Mumbai.",
    ] as const,
  },
  statement: {
    text: "Most businesses here are invisible online. Not because they're bad at what they do, but because nobody built them a thing that works.",
    emerald: ["invisible", "built", "works"] as const,
  },
  services: {
    eyebrow: "Services",
    heading: "Eight services. One team. No handoffs.",
    sub: "The people who design it are the people who ship it, rank it, and pick up the phone when it breaks.",
  },
  aperture: {
    heading: "Your customers are searching right now.",
    sub: "They're typing your service and your area into Google today. We make sure the result they tap belongs to you.",
  },
  demos: {
    eyebrow: "Work",
    heading: "We haven't built for you yet. So we built one for your trade already.",
    sub: "Complete sites for the businesses we work with. Open them on your phone and judge for yourself.",
    link: "See all the work",
  },
  process: {
    heading: "How we work",
    steps: [
      { title: "We talk", body: "One call. What you sell, who buys it, what the site has to do." },
      { title: "We plan", body: "You get a structure and a direction, not a mood board." },
      { title: "We build", body: "Design first, then code, then the agents and automations wired in." },
      { title: "We run it", body: "Live on your domain, on Google, and kept fast after launch." },
    ],
  },
  team: {
    heading: "Who you'll actually be working with.",
    sub: "We started Coreline because every business we knew was paying three vendors and getting one bad website. So we do all of it ourselves, and you always know who is holding your project.",
  },
  faq: [
    {
      question: "What does it cost?",
      answer: "Depends on how much you need. We'll give you a number on the first call, not after three meetings.",
    },
    {
      question: "Who owns the website?",
      answer: "You do. Domain, hosting, code, all in your name from day one.",
    },
    {
      question: "Do you actually build the AI agents, or resell a widget?",
      answer: "We build them, trained on your own content — not a resold widget.",
    },
    {
      question: "We already have a website.",
      answer: "Then open it on your phone and time it. If it's slow, hard to edit, or nobody calls from it, that's what we fix.",
    },
  ],
} as const;

export const contactPanelCopy = {
  heading: "Let's talk.",
  sub: "Tell us what you sell. We'll show you what it should look like.",
} as const;

export type TeamMember = {
  name: string;
  discipline: string;
  description: string;
  /** Public path under /public, or null while awaiting a real portrait. */
  portrait: string | null;
  /** true = real, known detail. false = placeholder awaiting real content. */
  known: boolean;
};

/**
 * One person for now. Adding a second is just another entry here - the team
 * grids on / and /about lay out from this array's length, so nothing else
 * needs touching. Keep the site's numeric claims honest when you do: search
 * for "one person" in this file and in lib/coreline-knowledge.ts.
 */
/**
 * The points that light up beside the portrait in the solo layout. Each one
 * restates something already claimed elsewhere on the site (the origin story,
 * the process, the discipline line) - no new promises, and nothing here that
 * stops being true the day a second person joins.
 */
export const founderPoints = [
  {
    title: "One person, no handoffs",
    body: "Design, code, search and automation. Nothing gets passed between vendors, because there is nobody to pass it to.",
  },
  {
    title: "You talk to whoever builds it",
    body: "No account manager in the middle. The person who answers your message is the person writing the code.",
  },
  {
    title: "Still here after launch",
    body: "The site stays fast, stays on Google, and gets picked up when it breaks - by the same person who shipped it.",
  },
  {
    title: "Based in Thane",
    body: "Working out of Wagle Estate, not a virtual studio somewhere else. If you'd rather talk across a table than a screen, that's on offer too.",
  },
] as const;

export const team: readonly TeamMember[] = [
  {
    name: "Shailesh Hawale",
    discipline: "Design & Engineering",
    description: "Builds the sites, the agents, and everything wired in between.",
    portrait: "/team/shailesh.jpeg",
    known: true,
  },
] as const;

export const workPageCopy = {
  hero: {
    lines: ["NINE BUILDS.", "ONE OF THEM IS YOURS."] as const,
    sub: "We build a complete site for a trade before anyone asks. Open them on your phone, then tell us what you'd change about your version.",
  },
  honesty:
    "All nine are demo builds, not client work. We're a new studio and we'd rather show you finished work we made than pretend we have clients we don't. Open any of them on your phone and tell us what you'd change.",
  buildForYou: {
    heading: "What we'd build for you",
    steps: [
      "We ask what you sell and who buys it.",
      "We build the site, then wire in the agent and automations.",
      "You get the keys - domain, hosting and code in your name.",
    ],
  },
} as const;

export const servicesPageCopy = {
  hero: {
    lines: ["EIGHT SERVICES.", "ONE TEAM."] as const,
    sub: "Everything your business needs online, built and run by the same people. Nothing gets handed off, and nothing gets lost between vendors.",
  },
  bundles: {
    heading: "Most businesses need three of these, not one.",
    sub: "Here's how they usually go together.",
  },
  statement:
    "We'd rather do four things properly than eight things badly. So the same person does all of it, and we tell you when something isn't worth building.",
  demosStrip: {
    heading: "See the work, not just the pitch",
  },
  faq: [
    {
      question: "Can we start with just one thing?",
      answer: "Yes. Our own suggestion is usually the website first, then add the rest once it's earning.",
    },
    {
      question: "Do you work with what we already have?",
      answer:
        "If your current site is on WordPress or Shopify and it's salvageable, we'll say so instead of selling you a rebuild.",
    },
    {
      question: "What do you build things with?",
      answer: "Modern frameworks, hosted properly, no page builders stacked with plugins. You get the code.",
    },
    {
      question: "Who looks after it afterwards?",
      answer: "We do, if you want us to. If you don't, everything is in your name and you can take it anywhere.",
    },
  ],
} as const;

export const aboutPageCopy = {
  hero: {
    lines: ["ONE PERSON.", "NO HANDOFFS."] as const,
  },
  origin: [
    "Every business we knew was paying three vendors and getting one bad website. A designer who left after launch. A developer who couldn't be reached. An SEO agency sending reports nobody read.",
    "So we do all of it ourselves. Design, code, search, automation. It's more work, but there's nobody left to blame, and you always know who's holding your project.",
    "We're based in Wagle Estate, Thane, and we work with businesses across Thane and Mumbai. If you'd rather talk across a table than a screen, that's on offer too.",
  ],
  wontDo: [
    "We won't sell you an app when a website will do.",
    "We won't lock your domain or hosting in our name.",
    "We won't send a report you need us to explain.",
    "We won't disappear after launch, because we're the ones running it.",
  ],
} as const;

export const contactPageCopy = {
  heading: "Let's talk.",
  sub: "Tell us what you sell. We'll show you what it should look like.",
  hoursLabel: "Hours we'll actually answer",
  hours: "Mon-Sat, 9am-6pm IST",
} as const;

export const privacyPageCopy = {
  heading: "How we handle what you send us.",
  sub: "Short version: your number stays with us. We don't sell it, and we don't put it on a list.",
  paragraphs: [
    "If you message us on WhatsApp, call us, or talk to the chat assistant on this site, we receive your name, your phone number, the kind of business you run, and what you typed or said. We use it to reply about a website, an agent, or whatever you asked. That's the only reason we have it.",
    "This site has no advertising cookies, no tracking pixels, and no visitor analytics. The chat assistant runs in your browser and doesn't save your conversation once you close the tab.",
    "Nothing here is sold, rented, or passed to another company, and we don't run ads against it. The only outside services that touch a message are the ones needed to deliver it - WhatsApp and standard mobile calling - and each sees only what it needs to.",
    "Messages you send on WhatsApp sit in that app under its own terms, the same as any other conversation you have there.",
    "To ask what we hold about you, or to have it removed, message us on WhatsApp. Coreline Digital, Wagle Estate, Thane, Maharashtra 400604.",
  ],
} as const;

export const termsPageCopy = {
  heading: "Terms.",
  sub: "The short, honest version - see designs/coreline-rebuild-brief.md for what this page should ultimately say once reviewed by a lawyer.",
  paragraphs: [
    "Working with us starts with a conversation, not a form. Whatever we agree on a call - what we're building, and the terms for it - is what governs the work, and we'll confirm it in writing over WhatsApp or email before anything starts.",
    "Once a website, app or system is delivered and paid for, the domain, hosting account and source code are put in your name or handed to you. You're free to take it to anyone else at any time.",
    "Demo sites under /samples and /work are our own concept work, shown to illustrate what we build. They describe fictional businesses and they're not for sale or resale as-is.",
    "We keep working code and reasonable care as our standard, but we don't guarantee specific business outcomes - rankings, enquiry volumes, or sales - since those depend on more than a website.",
    "This page is a placeholder in plain language, not a substitute for legal advice. If you need a formal Terms of Service for a contract, ask us and we'll put one together with you.",
  ],
} as const;

export const chatCopy = {
  header: "Chat with Coreline",
  proof: "This is the same kind of agent we build for clients.",
} as const;
