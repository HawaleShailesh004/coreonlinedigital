/**
 * Single source of truth for site copy.
 *
 * THE SPINE, so edits stay on message: every owner - whether they've had a
 * website or never had one - is losing customers they never see. The message
 * answered six hours late. The person who searched their trade on Google and
 * found someone else. The enquiry at 11pm nobody was awake for.
 *
 * Rules that follow from it, and that this file has to keep:
 * - Never "your last website" or "outgrown templates". Most Thane owners never
 *   had a site at all, and that phrasing writes off the largest group.
 * - Banned words: infrastructure, architecture, triage, systems (as the thing
 *   being sold), engineered, bespoke, ecosystem, leverage, solutions.
 * - Write instead: website, customers, enquiries, WhatsApp, Google, bookings,
 *   orders, follow-up, missed, late, price, date.
 * - Voice is one person. "I", never "we" or "our team" - Shailesh works alone,
 *   and "we" is a lie the buyer finds out on the first call.
 * - Premium here is restraint and specificity, never decoration. Plain numbers,
 *   real dates, one published price.
 *
 * Edit copy here, never inline in components.
 */

import { samples, type SampleIndustry } from "@/lib/samples";
import {
  caMedia,
  clinicMedia,
  coachingMedia,
  gymMedia,
  interiorMedia,
  jewellerMedia,
  realtyMedia,
  schoolMedia,
  traderMedia,
  travelMedia,
  type SampleImage,
} from "@/lib/samples/media";

/**
 * The published numbers live here and nowhere else. The site assistant reads
 * them through lib/chat/facts.ts, so the bot can never quote a price the page
 * does not show.
 */
export const site = {
  name: "coreline.",
  legalName: "Coreline Digital",
  tagline: "Websites that bring you customers. Fixed price, fixed date.",
  location: "Wagle Estate, Thane",
  region: "Maharashtra",
  phone: "+91 90823 08732",
  phoneHref: "tel:+919082308732",
  whatsappNumber: "919082308732",
  whatsapp: "https://wa.me/919082308732",
  email: "contact@corelinedigital.in",
  emailHref: "mailto:contact@corelinedigital.in",
  url: "https://www.corelinedigital.in",

  /**
   * "Book Strategy Call" was consultant language - it sounds like a meeting
   * with an agency and a proposal deck. This buyer books nothing; he messages.
   */
  primaryCta: "Talk on WhatsApp",
  secondaryCta: "See what it costs",

  priceFrom: "₹15,000",
  priceCeiling: "₹35,000",
  deliveryShort: "10 working days",
  deliveryPromise:
    "10 working days from the day I have your content and photos.",
  paymentShort: "Half paid only when live",
  paymentTerms: "Half to start, half only when your site is live",

  /**
   * Public profiles for the same business, emitted as schema.org `sameAs`.
   *
   * This is how Google reconciles "Coreline Digital" the website with Coreline
   * Digital the entity it already knows from Maps and LinkedIn - which is what
   * the about page's "not the other companies with a similar name" line is
   * fighting, and it cannot win that with prose alone.
   *
   * Order doesn't matter to Google; GBP is listed first as the highest-value
   * entry for a local service business.
   */
  profiles: [
    "https://g.page/r/CSP-PeoCxAXgEBM",
    "https://www.linkedin.com/company/coreline-digital/",
    "https://www.instagram.com/corelinedigitall/",
  ] as readonly string[],
} as const;

const PAGE_WHATSAPP_LABEL: Record<string, string> = {
  "/": "your homepage",
  "/services": "/services",
  "/work": "the sample sites",
  "/contact": "/contact",
  "/about": "/about",
  "/privacy": "/privacy",
};

/** Prefills wa.me so Shailesh knows which page they left. */
export function pageWhatsappHref(path: string): string {
  const sample = path.match(/^\/samples\/([^/]+)/);
  const where = sample
    ? `the ${sample[1]} sample`
    : (PAGE_WHATSAPP_LABEL[path] ?? path);
  return `${site.whatsapp}?text=${encodeURIComponent(`Hi Shailesh - I was on ${where}.`)}`;
}

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
] as const;

export const hero = {
  /**
   * No coloured accent word. Colouring one phrase is a generic treatment and
   * this sentence carries itself - keeping the emerald for CTAs and the
   * line-node motif is what makes it mean something when it does appear.
   */
  headline: ["You're losing customers", "you never even see."],
  subhead:
    "I run Coreline Digital from Wagle Estate, Thane. The WhatsApp message answered too late. The customer who searched on Google and found someone else. The enquiry at 11pm nobody was awake for. I build the website that catches them - and the assistant that answers while you're busy.",
  ctas: [
    {
      label: site.primaryCta,
      href: site.whatsapp,
      variant: "primary" as const,
      external: true,
    },
    { label: "See sample sites", href: "/work", variant: "secondary" as const },
  ],
  /**
   * Price, time and risk answered before the visitor has to ask - which is
   * exactly what a cautious buyer needs and what no competitor here does.
   */
  trustLine: [`From ${site.priceFrom}`, site.deliveryShort, site.paymentShort],
};

export const focusStrip = {
  /** Stays "Built for" until real clients exist. Do not fabricate. */
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

export type Pillar = {
  id: string;
  /**
   * What this is and when you'd buy it. Replaces the old 01/02/03, which
   * implied a sequence you had to buy in order - these are a menu, not steps.
   */
  role: string;
  title: string;
  tagline: string;
  /** Short version used on the home page card. */
  teaser: string;
  /** Long version used on the services page. */
  body: string;
  includes: string[];
};

export const pillars: Pillar[] = [
  {
    id: "website",
    role: "Start here",
    title: "A website that brings you customers",
    tagline: "Not a business card. A salesperson.",
    teaser:
      "Most sites just sit there with an address and a phone number. Yours should show people why you're worth calling, and make calling easy.",
    body: "Your website is the first thing most customers see before they ever speak to you. It should load fast on a phone, say clearly what you do, and push people toward one action - a call, a WhatsApp message, a booking, an order. That's what I build. Custom, not a theme someone else is also using.",
    includes: [
      "Custom design, built for your business - not a template",
      "Fast on mobile, where almost all your customers are",
      "Photos, services, prices, location - set up properly",
      "One clear action on every page: call, WhatsApp, book, or order",
      "Set up on Google so people searching your trade can find you",
    ],
  },
  {
    id: "follow-up",
    role: "Add on",
    title: "Something that answers when you can't",
    tagline: "A missed message at 9pm is a lost customer by 9:05.",
    teaser:
      "You can't be on WhatsApp all day. Most enquiries come when you're with a customer, closed, or asleep - and they don't wait.",
    body: "You answer the same fifteen questions every week - timings, price, location, do you do this, are you open Sunday. An assistant on your site handles those the moment someone asks, day or night, and passes the real enquiries straight to your phone with the details already collected.",
    includes: [
      "An assistant on your website that answers common questions instantly",
      "Enquiries sent straight to your WhatsApp, no app to check",
      "Appointment or booking requests with details already filled in",
      "Automatic reminders so people actually show up",
      "Follow-up messages that go out without you remembering",
    ],
  },
  {
    id: "monthly",
    role: "Optional, monthly",
    title: "Keeping it working, every month",
    tagline: "A site nobody looks after slowly stops working.",
    teaser:
      "Google rankings slip, photos go stale, nothing improves. This is the optional monthly plan - only if you want it.",
    /* The closing line here is the point: for a suspicious buyer, visibly
       declining to upsell is worth more than any adjective. Keep it. */
    body: "Some owners want to hand this over and forget it. Some want it kept sharp - new photos, updated offers, Google reviews coming in, small improvements every month. This is optional and it starts after your site is live and working. I'll tell you honestly if you don't need it.",
    includes: [
      "Google Business Profile kept updated and optimised",
      "Review requests sent automatically after each job or sale",
      "New photos, offers and content added as your business changes",
      "Social posts and graphics if you want them",
      "Everything monitored - if something breaks, I fix it",
    ],
  },
];

/**
 * Agencies hide price because they sell variable scopes and want to size the
 * buyer up. This buyer's core fear is exactly that. Publishing a floor removes
 * it and costs nothing: the range leaves room to quote higher on the call for a
 * bigger job. The floor catches the cautious; the ceiling does the premium work
 * in conversation.
 *
 * ₹15,000 and not ₹10,000 on purpose - ₹10k is the price of the template shop
 * that burned these people, and at half-on-delivery it would mean floating a
 * real build for a ₹5,000 back-end payment.
 */
export const pricing = {
  eyebrow: "What it costs",
  heading: `${site.priceFrom} to start. You'll know the full price before I begin.`,
  body: `Most business websites land between ${site.priceFrom} and ${site.priceCeiling}, depending on how many pages you need and whether you want the assistant and booking built in. I'll give you one fixed number before any work starts - it doesn't change later.`,
  terms: [
    {
      label: "Price",
      value: "Fixed before I start. No hourly billing, no surprise additions.",
    },
    {
      label: "Payment",
      value: "Half to begin. Half only once your site is live and you've seen it.",
    },
    { label: "Time", value: site.deliveryPromise },
    {
      label: "Who",
      value: "One person builds it - me. The person you talk to is the person who builds it.",
    },
  ],
};

export const process = {
  eyebrow: "How this works",
  steps: [
    {
      number: "01",
      title: "Talk",
      body: "A 15-minute call or WhatsApp chat. You tell me what your business does and where customers are slipping away. I tell you what it'll cost and how long.",
    },
    {
      number: "02",
      title: "Build",
      body: "I build it and send you a live link to look at while it's in progress. You see it before it's public, and changes happen then, not after.",
    },
    {
      number: "03",
      title: "Live",
      body: "It goes live, you pay the second half, and I show you how to update it yourself. Monthly upkeep only if you want it.",
    },
  ],
};

export type Industry = SampleIndustry;

export type WorkSample = {
  slug: string;
  industry: Industry;
  name: string;
  summary: string;
  tags: string[];
  href: string;
  image: SampleImage;
};

/** Card thumbs for /work - one distinctive frame per vertical. */
const workThumbs: Record<(typeof samples)[number]["slug"], SampleImage> = {
  clinic: clinicMedia.waiting,
  jeweller: jewellerMedia.solitaire,
  ca: caMedia.office,
  realty: realtyMedia.listings[0],
  school: schoolMedia.hero,
  travel: travelMedia.hero,
  gym: gymMedia.hero,
  interior: interiorMedia.hero,
  trader: traderMedia.hero,
  coaching: coachingMedia.hero,
};

/** Built from the sample registry so Work stays in sync with /samples. */
export const workSamples: WorkSample[] = samples.map((sample) => ({
  slug: sample.slug,
  industry: sample.industry,
  name: sample.name,
  summary: sample.summary,
  tags: sample.tags,
  href: `/samples/${sample.slug}`,
  image: workThumbs[sample.slug],
}));

export const workPage = {
  eyebrow: "Sample sites",
  heading: "Built to show what's possible.",
  sub: "Ten sample sites, one for each kind of business I build for. They're working builds you can click into - not live client work. Real jobs will replace these as they ship.",
  bottomHeading: "Want to see what this looks like for your business?",
};

export const workTeaser = {
  eyebrow: "Sample sites",
  heading: "A few sample sites",
  cta: "See all sample sites",
};

export const founder = {
  eyebrow: "Who's building this",
  heading: "One person builds it. That person is me.",
  paragraphs: [
    "I'm Shailesh. I run Coreline Digital from Wagle Estate, Thane - not a team, and not the other companies that share a similar name. The person you talk to on the phone is the person who builds your site.",
    "Most of my work is going to come from owners telling other owners. That only works if I finish what I start, on the date I said. That's the whole business model.",
  ],
};

export const finalCta = {
  heading: "Let's find out what you're missing.",
  body: "Send me a WhatsApp message with what your business does. I'll take a look at how you show up on Google right now and tell you honestly whether a website will help you - free, no obligation.",
};

export const servicesPage = {
  eyebrow: "What I build",
  heading: "Start with the website. Add the rest when it's earning.",
  sub: "Most owners in Thane start with a website and nothing else. If it starts bringing enquiries, then I talk about the assistant, the booking, the monthly upkeep. I'd rather you spend less and see it work than spend more and hope.",
  bottomHeading: "Not sure which one you need?",
  bottomBody:
    "Start with the website. I'll tell you honestly on the call whether you need anything else yet - most people don't, not at first.",
  faqs: [
    {
      question: "What does a website cost?",
      answer: `Most business websites land between ${site.priceFrom} and ${site.priceCeiling}. You get one fixed number before I start - it doesn't change later. Half to begin, half only when the site is live.`,
    },
    {
      question: "How long does it take?",
      answer: site.deliveryPromise,
    },
    {
      question: "Who actually builds it?",
      answer:
        "I do. Coreline Digital is one person in Wagle Estate, Thane - Shailesh. The person you message is the person who designs and ships the site.",
    },
    {
      question: "Do I need the assistant and the monthly plan?",
      answer:
        "Usually not at first. Most owners start with the website. The assistant and monthly upkeep are optional, added after the site is live and earning.",
    },
    {
      question: "Are the sites on the Work page real clients?",
      answer:
        "No. Those are sample sites I built so you can click in and use them. Real client work will replace them as it ships.",
    },
    /* The five below exist because they are what people actually type into
       Google before they type a company name - hosting, domains, redesigns,
       "will I show up on Google", and whether a Thane guy will take a Mumbai
       job. Answering them plainly is also what gets a page quoted back by an
       AI search result, which a page of adjectives never is. */
    {
      question: "Do you build websites for businesses outside Thane?",
      answer:
        "Yes. Most of my work is Thane and Wagle Estate, but I build for Mumbai, Navi Mumbai and Kalyan-Dombivli too. The whole job runs over WhatsApp and a call, so where you are only matters if you want to meet in person - and I'm happy to, anywhere in Thane.",
    },
    {
      question: "Can you redesign my existing website instead of starting over?",
      answer:
        "Often, yes. Send me the link on WhatsApp and I'll tell you honestly whether it's worth rebuilding or repairing. If your current site loads slowly on a phone or has no clear way to contact you, a rebuild is usually cheaper than patching it.",
    },
    {
      question: "Do I pay separately for hosting and a domain?",
      answer:
        "The domain is yours and you pay for it directly - usually ₹800 to ₹1,500 a year - so it stays in your name, not mine. Hosting for a site this size is free on the platform I use. There is no monthly fee unless you choose the optional upkeep plan.",
    },
    {
      question: "Will my site actually show up on Google?",
      answer:
        "Every site I build is set up properly for search and connected to a Google Business Profile, which is what puts you on Maps and in the local results. That gets you found for your own name and your trade in your area. Ranking above established competitors for competitive terms takes months of ongoing work - that's the optional monthly plan, and I'll tell you if you don't need it yet.",
    },
    {
      question: "What do you need from me to start?",
      answer:
        "Your services and prices, some photos of your work or premises, and your address and timings. If you don't have photos, tell me - it's the one thing that most often holds a build up, and there are ways around it.",
    },
  ],
};

export const contactPage = {
  heading: "Let's talk about your business.",
  sub: "Fastest way to reach me is WhatsApp. I'm in Wagle Estate, Thane. Or leave your number and I'll call you back.",
  formSubmit: "Request a call back",
  microCopy:
    "I usually call back within a few hours, same day if you reach out before 6pm.",
  privacyNote: "Your number stays with me.",
  privacyLink: "How I use it",
  businessTypes: [
    "Clinic",
    "Jeweller",
    "CA/Professional",
    "School",
    "Real Estate",
    "Travel",
    "Gym",
    "Coaching class",
    "Interior Design",
    "Trader",
    "Other",
  ],
};

export const legalNav = [
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
] as const;

export const aboutPage = {
  heading: "Coreline Digital, Wagle Estate, Thane.",
  sub: "One person. The person you talk to is the person who builds the site.",
  paragraphs: [
    "I'm Shailesh. I design and build websites for Thane and Mumbai businesses - clinics, jewellers, gyms, coaching classes, shops, professional firms. Coreline Digital is not a team, and it is not affiliated with other companies that use a similar name.",
    "I work from Wagle Estate, Thane. WhatsApp, a call, or a callback is how I start. You get a fixed price before I begin, a date, and a site you can actually use.",
    "The Work page is sample sites so you can click in and try the thing. Real client work will go there as it ships. I don't publish fake testimonials.",
  ],
};

export const privacyPage = {
  heading: "How I handle what you send me.",
  sub: "Short version: your number stays with me. I don't sell it, and I don't put it on a list.",
  paragraphs: [
    "If you fill in the callback form or talk to the assistant on this site, I receive your name, phone number, and what kind of business you run. I use that to call or WhatsApp you back about a website. That's it.",
    "Messages you send on WhatsApp or email sit in those apps, the same as any other conversation. I don't run ads against this data and I don't pass it to other companies.",
    `If you want something deleted, message me on WhatsApp or email ${site.email} and I'll remove it.`,
  ],
};
