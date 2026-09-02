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
 * - Voice is first person singular - "I", "me", "my" - on every page without
 *   exception. Coreline is one person and saying so is the pitch, not a
 *   weakness to manage: no competitor can promise that the person you message
 *   is the person who builds it. "We" reads as a team to the buyer no matter
 *   what it means internally, and the About page then contradicts it.
 * - Never claim clients, referrals, or history that does not exist yet. Future
 *   tense where the claim is about what the model depends on.
 * - Trust sits on the terms (fixed price, fixed date, half on delivery), the
 *   sample sites, and a named person who can be checked.
 * - Premium here is restraint and specificity, never decoration. Plain numbers,
 *   real dates, one published price.
 *
 * Edit copy here, never inline in components.
 */

import { samples, type SampleIndustry, type SampleSlug } from "@/lib/samples";
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

  footerStrap: "Websites that bring you customers",
  founderName: "Shailesh Hawale",
  founderGiven: "Shailesh",
  founderFamily: "Hawale",
  jobTitle: "Website designer and developer",

  /**
   * Public profiles for the same business, emitted as schema.org `sameAs`
   * and as the footer Elsewhere column.
   */
  profiles: [
    { label: "Google", href: "https://g.page/r/CSP-PeoCxAXgEBM" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/coreline-digital/" },
    { label: "Instagram", href: "https://www.instagram.com/corelinedigitall/" },
  ] as const,
} as const;

const PAGE_WHATSAPP_LABEL: Record<string, string> = {
  "/": "your homepage",
  "/services": "/services",
  "/work": "the sample sites",
  "/contact": "/contact",
  "/about": "/about",
  "/privacy": "/privacy",
  "/clinic-website-thane": "the clinic website page",
  "/jewellery-website-thane": "the jewellery website page",
  "/gym-website-thane": "the gym website page",
  "/coaching-class-website-thane": "the coaching class website page",
  "/real-estate-website-thane": "the real estate website page",
};

function pageLeaveLabel(path: string): string {
  const sample = path.match(/^\/samples\/([^/]+)/);
  return sample ? `the ${sample[1]} sample` : (PAGE_WHATSAPP_LABEL[path] ?? path);
}

/** Prefills wa.me so Shailesh knows which page they left. */
export function pageWhatsappHref(path: string): string {
  return `${site.whatsapp}?text=${encodeURIComponent(`Hi Shailesh - I was on ${pageLeaveLabel(path)}.`)}`;
}

/**
 * Opens Gmail compose with subject and body filled. Same "I was on X" cue
 * as WhatsApp, plus a blank line for what the business does.
 */
export function pageEmailHref(path: string): string {
  const subject = "Website enquiry";
  const body = `Hi Shailesh -\n\nI was on ${pageLeaveLabel(path)}.\n\nWhat my business does:\n`;
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: site.email,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const legalNav = [{ label: "Privacy", href: "/privacy" }] as const;

export const hero = {
  /**
   * No coloured accent word. Colouring one phrase is a generic treatment and
   * this sentence carries itself - keeping the emerald for CTAs and the
   * line-node motif is what makes it mean something when it does appear.
   */
  headline: ["You're losing customers", "you never even see."],
  subhead:
    "The WhatsApp message answered too late. The customer who searched on Google and found someone else. The enquiry at 11pm nobody was awake for. I build the website that catches those customers, and the assistant that answers while you're busy.",
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

export type FocusStripItem = {
  label: string;
  /** Only the verticals with a unique indexed page. */
  href?: string;
};

export const focusStrip = {
  /** Stays "Built for" until real clients exist. Do not fabricate. */
  eyebrow: "Built for",
  items: [
    { label: "Clinics", href: "/clinic-website-thane" },
    { label: "CAs & Professionals" },
    { label: "Jewellers", href: "/jewellery-website-thane" },
    { label: "Schools" },
    { label: "Real Estate", href: "/real-estate-website-thane" },
    { label: "Travel" },
    { label: "Gyms", href: "/gym-website-thane" },
    { label: "Interior Design" },
    { label: "Traders" },
    { label: "Coaching Classes", href: "/coaching-class-website-thane" },
  ] satisfies FocusStripItem[],
};

export type Include = {
  title: string;
  body: string;
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
  includes: Include[];
};

export const pillars: Pillar[] = [
  {
    id: "website",
    role: "Start here",
    title: "A website that brings you customers",
    tagline: "Not a business card. A salesperson.",
    teaser:
      "Most sites just sit there with an address and a phone number. Yours should show people why you're worth calling, and make calling easy.",
    body: "It should load fast on a phone, say what you do and what it costs, and push toward one action - a call, a WhatsApp, a booking, an order. Not a theme somebody else is also running.",
    includes: [
      {
        title: "Custom design, not a template",
        body: "Designed for your business. Not a theme three other shops in the area are running.",
      },
      {
        title: "Fast on a phone",
        body: "If it doesn't open on one bar of data, nothing else on this list matters.",
      },
      {
        title: "Services, prices and location, set up properly",
        body: "What you do, what it costs, where you are. On the page, not three clicks in.",
      },
      {
        title: "One clear action on every page",
        body: "Every page pushes to a call, a WhatsApp, a booking, or an order.",
      },
      {
        title: "Claimed and connected on Google from day one",
        body: "Site submitted. Google Business Profile claimed and connected. Deeper Maps work is an add-on.",
      },
    ],
  },
  {
    id: "follow-up",
    role: "Add on",
    title: "Something that answers when you can't",
    tagline: "A missed message at 9pm is a lost customer by 9:05.",
    teaser:
      "You can't be on WhatsApp all day. Most enquiries come when you're with a customer, closed, or asleep - and they don't wait.",
    body: "The same questions hit WhatsApp all day. An assistant on the site answers them at any hour, and real enquiries land on your phone already filled in. There's one on this site - talk to it.",
    includes: [
      {
        title: "An assistant that answers instantly",
        body: "Timings, price, location - answered the moment somebody asks, at any hour.",
      },
      {
        title: "Enquiries straight to your WhatsApp",
        body: "Name, number, and what they want. On the number you already check. No new app.",
      },
      {
        title: "Bookings with the details already filled in",
        body: "Date, service, phone number. You confirm, instead of starting from scratch.",
      },
      {
        title: "Reminders so people actually turn up",
        body: "A reminder goes out before the slot. No-shows are the quietest way to lose money.",
      },
      {
        title: "Follow-up that happens without you",
        body: "The enquiry that went cold three weeks ago gets a message.",
      },
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
    body: "Optional, and only after the site is live. New photos, review requests, the Google listing kept current. Stop any month. Same as the assistant: most people don't need it at first - I'll say so.",
    includes: [
      {
        title: "Google Business Profile kept current",
        body: "Hours, photos, services. The listing that puts you on Maps goes stale faster than the site does.",
      },
      {
        title: "Review requests sent automatically",
        body: "After each job, a Google review request. That's what separates the top three in your area from everyone else.",
      },
      {
        title: "New photos, offers and content",
        body: "A new service, a price change, seasonal work. A site that never changes stops being worth showing.",
      },
      {
        title: "Social posts and graphics, if you want them",
        body: "Only if you'll use them. I'd rather leave it off the bill than charge for posts nobody sees.",
      },
      {
        title: "Watched, and fixed when it breaks",
        body: "If a form stops sending, I find it. You shouldn't discover it a month later.",
      },
    ],
  },
];

/**
 * Named services under the three pillars. A visitor who wants to be sold
 * reads the pillars; a visitor who arrived asking "do you do X?" reads this.
 *
 * Website and landing page share the published floor. Everything else stays
 * unpriced on the page because the scope moves with the business - product
 * count, what the assistant has to know, which WhatsApp tools they already run.
 */
export type ServiceItem = {
  name: string;
  price: string;
  line: string;
};

export type ServiceGroup = {
  role: string;
  title: string;
  items: ServiceItem[];
};

const quoted = "Get a quote";

export const serviceMenu: ServiceGroup[] = [
  {
    role: "Start here",
    title: "A website that brings you customers",
    items: [
      {
        name: "Business Website Design",
        price: `From ${site.priceFrom}`,
        line: "What you do, what it costs, where you are, and one way to reach you.",
      },
      {
        name: "Landing Page Design",
        price: `From ${site.priceFrom}`,
        line: "One page, one job - an ad, a launch, or a single service.",
      },
      {
        name: "E-commerce / Online Store",
        price: quoted,
        line: "Products, cart, checkout. Try the trader sample.",
      },
    ],
  },
  {
    role: "Add on",
    title: "Something that answers when you can't",
    items: [
      {
        name: "AI Chat Assistant for Website",
        price: quoted,
        line: "Answers timings, price and location the moment somebody asks. There's one on this site.",
      },
      {
        name: "WhatsApp Automation & Enquiry Capture",
        price: quoted,
        line: "Name and number land on the WhatsApp you already check.",
      },
      {
        name: "Appointment Booking System",
        price: quoted,
        line: "They pick a slot. Date, service and number arrive filled in.",
      },
    ],
  },
  {
    role: "Getting found",
    title: "And staying found",
    items: [
      {
        name: "Google Business Profile Setup",
        price: quoted,
        line: "Services, posts, Q&A and reviews. Claim-and-connect is already in the website build.",
      },
      {
        name: "Local SEO Setup",
        price: quoted,
        line: "Your trade, your area, listings that match. Thane and Mumbai first.",
      },
      {
        name: "Website Maintenance (Monthly)",
        price: quoted,
        line: "New photos, review requests, watched if it breaks. Stop any month.",
      },
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
  body: `Most website design jobs land between ${site.priceFrom} and ${site.priceCeiling}, depending on how many pages you need and how much of the site is custom. The assistant, booking, and everything else in the full service list are quoted separately once I know what you need. Either way, you get one fixed number before any work starts - it doesn't change later.`,
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
      label: "Contact",
      value: "One point of contact from the first message to launch - not passed between departments.",
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
  heading: "Ten sample sites. Click into any of them.",
  sub: "None of these are client sites - I'd rather say that plainly than let you find out. They're complete working builds, one for each kind of business I build for, so you can use the thing before you spend anything. Real client work will replace them as it ships.",
  bottomHeading: "Want to see what this looks like for your business?",
  bottomBody:
    "Send me a WhatsApp message with what you do. I'll tell you which of these is closest, what yours would need, and what it'd cost - before you commit to anything.",
  cardLink: "Open the sample",
  note: "Fictional businesses and stand-in photography. Two carry a live assistant you can talk to.",
};

export const workTeaser = {
  eyebrow: "Sample sites",
  heading: "Ten sample sites you can click into.",
  sub: "None of these are client sites. They're complete working builds, one for each kind of business I build for, so you can use the thing before you spend anything. Two of them have a live assistant you can talk to.",
  cta: "See all sample sites",
};

/**
 * Indexed landing pages for the verticals worth a unique URL.
 * Copy has to fail the swap test: if you can replace "clinic" with "gym"
 * and the page still reads, it does not belong here.
 */
export type VerticalPhoto = {
  src: string;
  alt: string;
};

export type VerticalPage = {
  slug: string;
  path: string;
  crumb: string;
  stripLabel: string;
  title: string;
  description: string;
  heading: string;
  sub: string;
  images: {
    hero: VerticalPhoto;
    frame: VerticalPhoto;
  };
  paragraphs: string[];
  includes: Include[];
  sampleSlug: SampleSlug;
  sampleHeading: string;
  sampleNote: string;
  sampleCta: string;
  faqs: { question: string; answer: string }[];
  ctaHeading: string;
  ctaBody: string;
  othersHeading: string;
};

export const verticalPages: VerticalPage[] = [
  {
    slug: "clinic-website-thane",
    path: "/clinic-website-thane",
    crumb: "Clinic website",
    stripLabel: "Clinics",
    title: "Clinic Website in Thane",
    description:
      "A clinic website in Thane that lets patients book a slot instead of calling and waiting. WhatsApp confirmation, timings, doctors. From ₹15,000.",
    heading: "Clinic website in Thane.",
    sub: "The patient who couldn't get through at lunch booked the clinic that answered. I build the site that takes the appointment while you're with someone else.",
    images: {
      hero: {
        src: "/verticals/clinic-hero.jpg",
        alt: "Waiting area with timber panelling, plants and full-height windows",
      },
      frame: {
        src: "/verticals/clinic-2.jpg",
        alt: "Doctor talking through notes with a patient",
      },
    },
    paragraphs: [
      "Most Thane clinics still run on a phone that rings through the consultation. The person on the other end hangs up and searches 'clinic near me'. That search does not wait until you finish with the patient in the chair.",
      "A clinic website has one job that a visiting card does not: show when you are open, which doctor is in, and let someone pick a time without a call. WhatsApp confirmation after that is how they actually turn up.",
      "I don't publish fake patient reviews or pretend a sample is a live hospital. There is a working family-clinic build on this site you can book a dummy slot on, so you can see the flow before you spend anything.",
    ],
    includes: [
      {
        title: "Hours, doctors, and what you actually treat",
        body: "Sunday closed, the paediatric slot, cashless or not - written once so the receptionist is not repeating it forty times a day.",
      },
      {
        title: "A slot they pick themselves",
        body: "Date, doctor, phone number. It arrives already filled in. No 'please call between 10 and 1'.",
      },
      {
        title: "WhatsApp confirmation and a reminder",
        body: "The missed appointment is usually a forgotten one. A message the evening before costs nothing next to an empty chair.",
      },
    ],
    sampleSlug: "clinic",
    sampleHeading: "Open the sample clinic",
    sampleNote:
      "Meridian Family Clinic is fictional. The booking flow is real. Use it like a patient would.",
    sampleCta: "Book a dummy appointment",
    faqs: [
      {
        question: "Do you build hospital websites or only small clinics?",
        answer:
          "Small and mid-size clinics, nursing homes, and specialist practices. A multi-department hospital is a different job - message me the link or the brief and I'll say if it's in scope.",
      },
      {
        question: "Will patients really book online instead of calling?",
        answer:
          "Some will still call. Enough will book if the slot is on the phone in front of them. The point is catching the ones who currently don't get through.",
      },
    ],
    ctaHeading: "Want this for your clinic?",
    ctaBody:
      "Send me the clinic name and what you treat. I'll tell you whether a website will help, what it would cost, and which of the sample flows is closest - before you commit.",
    othersHeading: "Websites for other kinds of business",
  },
  {
    slug: "jewellery-website-thane",
    path: "/jewellery-website-thane",
    crumb: "Jewellery website",
    stripLabel: "Jewellers",
    title: "Jewellery Shop Website in Thane",
    description:
      "A jewellery website in Thane that shows the collection without listing prices, then sends every enquiry to WhatsApp so the sale still closes in the showroom. From ₹15,000.",
    heading: "Jewellery shop website in Thane.",
    sub: "People already decide from photos. If those photos only live on WhatsApp, you are sending the same ten pictures by hand, every day, and still arguing price when they walk in.",
    images: {
      hero: {
        src: "/verticals/jewellery-hero.jpg",
        alt: "Fine gold chain lit against a warm dark background",
      },
      frame: {
        src: "/verticals/jewellery-2.jpg",
        alt: "Solitaire diamond ring on a black block",
      },
    },
    paragraphs: [
      "A Thane jeweller does not lose customers because the gold rate moved. They lose them because the buyer compared three shops on Instagram, asked all three for a quote on WhatsApp, and visited the one that looked organised.",
      "The site should never become a discount list. No gram-rate table, no 'starting at'. Collections, craft, the custom-order path, and a private viewing request that lands on the number you already live on.",
      "There is a working catalogue on this site - fictional shop, real pages. Click through a collection and send a dummy enquiry so you can see what the customer sees.",
    ],
    includes: [
      {
        title: "Collections without a price war",
        body: "Editorial sets, not a marketplace grid. The piece is the point. The number is for the counter.",
      },
      {
        title: "Custom and viewing, not a cart",
        body: "Most jewellery still closes in person. The site's job is to get the right person into the showroom with a piece already in mind.",
      },
      {
        title: "Every enquiry on WhatsApp",
        body: "Name, what they looked at, a number. It arrives where you already reply. No extra app to check.",
      },
    ],
    sampleSlug: "jeweller",
    sampleHeading: "Open the sample jeweller",
    sampleNote:
      "Vasant & Sons is fictional. The catalogue and enquiry flow are real. No prices on purpose.",
    sampleCta: "Browse the collection",
    faqs: [
      {
        question: "Should we list prices on the website?",
        answer:
          "Almost never for jewellery that closes in the showroom. A public price starts a discount conversation before they have seen the piece. The sample site is built that way on purpose.",
      },
      {
        question: "Can this work if we already sell on Instagram?",
        answer:
          "Yes. Instagram is where people browse. The website is where the collection sits in order, with your name on it, when the Instagram post is gone.",
      },
    ],
    ctaHeading: "Want this for the showroom?",
    ctaBody:
      "Send a few photos of pieces you actually stock. I'll tell you what belongs on the site, what to keep off it, and what it would cost.",
    othersHeading: "Websites for other kinds of business",
  },
  {
    slug: "gym-website-thane",
    path: "/gym-website-thane",
    crumb: "Gym website",
    stripLabel: "Gyms",
    title: "Gym Website in Thane",
    description:
      "A gym website in Thane that answers fees, timings and ladies-batch questions, and books the free trial without another WhatsApp. From ₹15,000.",
    heading: "Gym website in Thane.",
    sub: "The same eight questions hit WhatsApp all day: fees, PT, ladies batch, trial, parking. The gym that replies first gets the walk-in. The others get a seen tick.",
    images: {
      hero: {
        src: "/verticals/gym-hero.jpg",
        alt: "Low-lit training floor lined with equipment",
      },
      frame: {
        src: "/verticals/gym-2.jpg",
        alt: "Lifter setting up under a loaded barbell",
      },
    },
    paragraphs: [
      "A Thane gym does not lose members at the squat rack. It loses them in the inbox. Someone searching 'gym in Thane West' opens three chats. The first clear fee and a trial slot wins. The brochure PDF you send at 9 the next morning does not.",
      "The site should publish the plans, the timetable, and a trial they can book without waiting for a reply. The assistant on the sample gym does the repetitive answers inside the chat - that one is live. Talk to it.",
      "I don't pretend this sample is a client. Forge Strength Co. is fictional. The trial booking and the assistant are the parts that matter, and both work.",
    ],
    includes: [
      {
        title: "Plans and a timetable you don't retype",
        body: "Fees, what's included, when the floor is open. Written once. Updated when you change a batch.",
      },
      {
        title: "Free trial without a phone tag",
        body: "They pick a slot. You get a name and a number. The trial is the close - the site should not hide it behind 'contact us'.",
      },
      {
        title: "The questions that flood WhatsApp, answered on the page",
        body: "Ladies hours, PT, lockers, parking. If it's in the chat fifty times a week, it belongs on the site. The sample gym also has a live assistant if you want to see that layer.",
      },
    ],
    sampleSlug: "gym",
    sampleHeading: "Open the sample gym",
    sampleNote:
      "Forge Strength Co. is fictional. The assistant is live - ask it the fee. The trial booking works.",
    sampleCta: "Talk to the gym assistant",
    faqs: [
      {
        question: "We already run memberships on an app. Do we still need a website?",
        answer:
          "The app is for people who already joined. The website is for the person who has not. Google does not send that person into your member login.",
      },
      {
        question: "Can the trial booking go to WhatsApp instead of email?",
        answer:
          "Yes. That's usually better. The sample shows the flow; on a real build it lands on the number you already check.",
      },
    ],
    ctaHeading: "Want this for the gym?",
    ctaBody:
      "Send the plans you currently quote on WhatsApp. I'll tell you what should be on the site, whether the assistant is worth it, and what it would cost.",
    othersHeading: "Websites for other kinds of business",
  },
  {
    slug: "coaching-class-website-thane",
    path: "/coaching-class-website-thane",
    crumb: "Coaching class website",
    stripLabel: "Coaching classes",
    title: "Coaching Class Website in Thane",
    description:
      "A coaching class website in Thane that publishes batch fees and last year's results before the parent has to ask. Demo class enquiry included. From ₹15,000.",
    heading: "Coaching class website in Thane.",
    sub: "A parent comparing two classes will pick the one that looks organised. Hidden fees and 'results on request' read as something to hide.",
    images: {
      hero: {
        src: "/verticals/coaching-hero.jpg",
        alt: "Students facing a lecture board in a packed classroom",
      },
      frame: {
        src: "/verticals/coaching-2.jpg",
        alt: "Student writing equations in a notebook",
      },
    },
    paragraphs: [
      "Coaching in Thane is a trust purchase made by someone who is not the student. The first two questions are always the same: what did last year's batch do, and what does this year cost. Most classes still answer both only after a visit.",
      "The site should put batch fees, faculty, and results where they can be checked on a phone at 10pm. A demo-class form beats 'call the office between 4 and 7'.",
      "Summit Prep on the Work page is a sample, not a client. The results board and the fee table are the point. Open it like a cautious parent would.",
    ],
    includes: [
      {
        title: "Results you can actually read",
        body: "Named ranks, pass rates, the year they belong to. Vague 'excellent results' is what every competitor already wrote.",
      },
      {
        title: "Batch fees in writing",
        body: "The visit is for the classroom. The fee on the site is how they decide whether the visit is worth it.",
      },
      {
        title: "Demo class without a gatekeeper",
        body: "Name, class, phone. It arrives before the office opens. You call the ones who are actually going to show up.",
      },
    ],
    sampleSlug: "coaching",
    sampleHeading: "Open the sample coaching site",
    sampleNote:
      "Summit Prep is fictional. The fee table and the results board are the parts to judge.",
    sampleCta: "See fees and results",
    faqs: [
      {
        question: "We're worried other classes will copy our fees if we publish them.",
        answer:
          "They already hear the number on the phone. Publishing it filters the parents who were never going to pay it, and it is the main reason they pick you over a class that makes them visit first.",
      },
      {
        question: "Can this work for one subject, not a full academy?",
        answer:
          "Yes. A single-subject class still needs the fee, the batch times, and a way to book a demo. The sample is a fuller site so you can see the pieces; yours can be smaller.",
      },
    ],
    ctaHeading: "Want this for the class?",
    ctaBody:
      "Send the batches you run and whether you already publish fees. I'll tell you what the site needs, what to keep off it, and what it would cost.",
    othersHeading: "Websites for other kinds of business",
  },
  {
    slug: "real-estate-website-thane",
    path: "/real-estate-website-thane",
    crumb: "Real estate website",
    stripLabel: "Real Estate",
    title: "Real Estate Website in Thane",
    description:
      "A real estate website in Thane that shows verified listings with the asking price on the card, then qualifies budget and timeline before a site visit. From ₹15,000.",
    heading: "Real estate website in Thane.",
    sub: "The Sunday visit should be for a flat they can actually buy. Most broker sites dump every listing in the city. I build the one that asks budget first.",
    images: {
      hero: {
        src: "/verticals/realty-hero.jpg",
        alt: "Contemporary house lit from within at dusk, seen across a lawn",
      },
      frame: {
        src: "/verticals/realty-2.jpg",
        alt: "Bright living room with bay windows",
      },
    },
    paragraphs: [
      "A Thane broker does not lose a Sunday because they don't have inventory. They lose it driving to a 2BHK the buyer cannot afford, because the WhatsApp chat never asked. Magicbricks already has the listings. What it doesn't have is your name on a site that qualifies the visit before it is booked.",
      "The site should show the properties you have actually walked, with the asking price on the card. Hidden prices here read as evasive, not premium. A form that collects budget and timeline before a site visit is how you stop wasting the one day you have.",
      "Keystone Properties on the Work page is a sample, not a client. The listings grid and the enquiry form are the point. Open it like a buyer who has already been burned.",
    ],
    includes: [
      {
        title: "Listings with the real asking price",
        body: "The price on the card is the price the owner is asking. A buyer who has to message for every number will message the next broker instead.",
      },
      {
        title: "Budget and timeline before a visit",
        body: "What they can spend, when they need to move. You only drive to the ones that fit. That is the whole job of the form.",
      },
      {
        title: "Enquiry on WhatsApp with the property named",
        body: "Which listing, which budget, a number. It arrives where you already reply. No extra portal to check between site visits.",
      },
    ],
    sampleSlug: "realty",
    sampleHeading: "Open the sample listings",
    sampleNote:
      "Keystone Properties is fictional. The listings grid and the budget form are real. Prices are on the cards on purpose.",
    sampleCta: "Browse the listings",
    faqs: [
      {
        question: "We already pay for Magicbricks. Why do we need our own site?",
        answer:
          "Magicbricks is where people browse every broker in the city. Your website is where they browse you - your listings, your prices, your number. The portal does not put your name on Google when someone searches the area you actually sell.",
      },
      {
        question: "Should we hide prices so buyers have to call?",
        answer:
          "No. A hidden price here reads as something to argue about. The sample puts the asking price on the card so the people who enquire already know they can afford the visit.",
      },
    ],
    ctaHeading: "Want this for the brokerage?",
    ctaBody:
      "Send two or three listings you actually have, with the asking prices. I'll tell you what the site should show, how the budget form should work, and what it would cost.",
    othersHeading: "Websites for other kinds of business",
  },
];

export function getVerticalPage(slug: string): VerticalPage | undefined {
  return verticalPages.find((page) => page.slug === slug);
}

export const verticalIndex = {
  eyebrow: "By kind of business",
  heading: "Websites by kind of business",
  sub: "If you run one of these, start here. Everything else is a working sample further down.",
  priceNote: `Same terms as every other site I build. Fixed number before I start. ${site.deliveryShort}. ${site.paymentShort}.`,
  sampleEyebrow: "Sample site",
  questionsHeading: "Straight answers before you message.",
  allSamples: "All sample sites",
};

export const whyCoreline = {
  eyebrow: "Who's behind it",
  heading: "Run by Shailesh Hawale, from Wagle Estate, Thane.",
  paragraphs: [
    "Coreline Digital is one person. I take the first message, I build the site, and I'm the one who answers the phone afterwards. There's no account manager and nobody to hand you to.",
    "Most of what comes next will come from owners telling other owners. That only works if I finish what I start, on the date I said - so the model depends on it, not just the pitch.",
    "That's why the terms are written the way they are, not as boilerplate. Fixed price before I start. A date. Half of it paid only once the site is live and you've looked at it.",
  ],
};

export const finalCta = {
  heading: "Let's find out what you're missing.",
  body: "Send me a WhatsApp message with what your business does. I'll take a look at how you show up on Google right now and tell you honestly whether a website will help you - free, no obligation.",
};

export const servicesPage = {
  eyebrow: "What I build",
  heading: "Start with the website. Add the rest when it's earning.",
  sub: "Most owners start with a website and nothing else. The assistant and monthly upkeep come later, if the site starts bringing enquiries.",
  homeSub:
    "Three things, and you almost certainly only need the first one to begin with. Start with the website. If it starts bringing you enquiries, that's when the other two are worth talking about - not before.",
  namedEyebrow: "Named",
  namedHeading: "If you arrived looking for a specific thing.",
  proof: {
    website: {
      src: "/services/website.jpg",
      alt: "Clothing boutique interior with hanging racks, a display table and pendant lights",
      caption: "A shop that looks organised in person should look organised online.",
      href: "/work",
    },
    assistant: {
      src: "/services/assistant.jpg",
      alt: "Phone home screen with WhatsApp, Paytm and other apps",
      caption: "WhatsApp is already where the enquiries are. The site should feed it.",
      href: "/samples/gym",
    },
  },
  bottomHeading: "Not sure which one you need?",
  bottomBody:
    "Start with the website. I'll tell you if you need anything else - most people don't, not at first.",
  faqs: [
    {
      question: "What does a website cost?",
      answer: `Most business websites land between ${site.priceFrom} and ${site.priceCeiling}. You get one fixed number before I start and it doesn't change later. Half to begin, half only once the site is live and you've seen it.`,
    },
    {
      question: "How long does it take?",
      answer:
        "10 working days from the day I have your content and photos. The clock starts when I have what I need from you, not when you pay - that way a delay on either side is visible rather than argued about.",
    },
    {
      question: "I've never had a website. Do I actually need one?",
      answer:
        "Maybe not, and I'll tell you if that's the case. If every customer you get walks past your shutter, a well-run Google listing will do more for you than a website will. But if anyone searches your trade on a phone, that search is happening today and landing on somebody else. Message me what you do and I'll look at how you currently show up, free.",
    },
    {
      question: "Do I pay separately for hosting and a domain?",
      answer:
        "The domain is yours and you pay for it directly - usually ₹800 to ₹1,500 a year - so it stays in your name, not mine. Hosting for a site this size is free on the platform I use. There's no monthly fee unless you choose the optional upkeep plan.",
    },
    {
      question: "Will my site actually show up on Google?",
      answer:
        "Every site I build is set up for search and connected to a Google Business Profile, which is what puts you on Maps and in local results. That gets you found for your own name and your trade in your area. Ranking above established competitors for the most competitive terms takes months of ongoing work - that's the optional monthly plan, and I'll tell you if you don't need it yet.",
    },
    {
      question: "Can you redesign my existing website instead of starting over?",
      answer:
        "Often, yes. Send me the link on WhatsApp and I'll tell you whether it's worth rebuilding or repairing. If it loads slowly on a phone or has no clear way to contact you, a rebuild is usually cheaper than patching it.",
    },
  ],
};

export const contactPage = {
  heading: "Let's talk about your business.",
  sub: "Fastest way to reach me is WhatsApp - I'm usually on it. I work from Wagle Estate, Thane. Or leave your number below and I'll call you back.",
  formHeading: "Leave your number",
  formSubmit: "Request a call back",
  formSuccessHeading: "I'll call you back.",
  microCopy:
    "I usually call back within a few hours, same day if you reach out before 6pm.",
  privacyNote: "Your number stays with me.",
  privacyLink: "How I use it",
  sections: [
    {
      heading: "Message me on WhatsApp",
      body: "Quickest answer by a distance. Send what your business does and I'll reply the same day, usually within a couple of hours.",
    },
    {
      heading: "Call me",
      body: `${site.phone}. If I don't pick up I'm mid-build - send a WhatsApp and I'll call you back.`,
    },
    {
      heading: "Where I work",
      body: "Wagle Estate, Thane, Maharashtra 400604. Happy to meet anywhere in Thane if you'd rather do this face to face.",
    },
    {
      heading: "What happens next",
      body: "We talk for fifteen minutes about what your business does and where customers are slipping away. I tell you a fixed price and a date. If a website won't help you yet, I'll say so - that call costs you nothing either way.",
    },
  ],
  faqs: [
    {
      question: "What do you need from me to start?",
      answer:
        "Your services and prices, some photos of your work or premises, and your address and timings. If you don't have photos, say so early - it's the one thing that most often holds a build up, and there are ways around it.",
    },
    {
      question: "Do you build websites for businesses outside Thane?",
      answer:
        "Yes - the whole job runs over WhatsApp, a call, and a live link to review the build, so where you are doesn't really matter. Most of my work happens to be Thane and Mumbai right now, but I build for businesses anywhere. If you'd like to meet in person, I'm happy to, anywhere in and around Thane.",
    },
  ],
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

export const aboutPage = {
  heading: "Hi, I'm Shailesh Hawale.",
  sub: "I run Coreline Digital from Wagle Estate, Thane. The person you talk to is the person who builds the site.",
  paragraphs: [
    "I design and build websites for small businesses, wherever they are - clinics, jewellers, gyms, coaching classes, shops, professional firms. Coreline Digital is me, working out of Wagle Estate, Thane. It isn't a team, and it isn't affiliated with the other companies using a similar name.",
    "I started it because of a pattern I kept running into. A shop with a Google listing nobody had touched in three years. A clinic taking bookings on a number one person checks between patients. A coaching class whose fees are the first thing every parent asks and the last thing anyone can find. None of these owners were doing anything wrong - they were busy running the business. They were losing customers in the gap, and they never saw it happen.",
    "So what I sell is deliberately narrow. One website that brings you customers, with something on it that answers when you can't. A fixed price before I start. Ten working days. Half of it paid only once the site is live and you've looked at it. If I'm late, there's no account manager to hand you to - you're talking directly to me either way.",
    "I'm not going to pretend to have a decade of case studies. There's no wall of client logos here and I'm not going to invent one. What I have instead is ten complete sample sites you can click into and use right now, two of them with a working assistant you can talk to. Judge the work.",
    "Most of what comes next will come from owners telling other owners. That only works if I finish what I start, on the date I said. That's the whole business model, and it's why the terms above are written the way they are.",
  ],
  ctaHeading: "Tell me what your business does.",
  ctaBody:
    "Send it on WhatsApp. I'll look at how you show up on Google right now and give you an honest opinion on whether a website will help - free, and I'll say so if it won't.",
  faqs: [
    {
      question: "Who actually builds it?",
      answer:
        "Shailesh Hawale does. Coreline Digital is one person, based in Wagle Estate, Thane. The person you message is the person who designs the site, builds it, ships it, and answers the phone afterwards.",
    },
    {
      question: "Are the sites on the Work page real clients?",
      answer:
        "No. They're sample sites I built so you can click in and use them, and two of them have a working assistant you can talk to. Real client work will replace them as it ships. I'd rather show you something working than name-drop.",
    },
  ],
};

export const privacyPage = {
  heading: "How I handle what you send me.",
  sub: "Short version: your number stays with me. I don't sell it, and I don't put it on a list.",
  paragraphs: [
    "If you fill in the callback form or talk to the assistant on this site, I receive your name, your phone number, the kind of business you run, and what you typed. I use it to call or message you back about a website. That's the only reason I have it.",
    "Conversations with the assistant are saved so I can read them later and pick up where you left off. Nothing else about your visit is recorded - this site has no advertising cookies, no tracking pixels, and no visitor analytics.",
    "Nothing here is sold, rented, or passed to another company, and I don't run ads against it. The only outside services that touch it are the ones needed to run the site and get a message to me - hosting, email, and WhatsApp - and each sees only what it needs to deliver.",
    "Messages you send on WhatsApp or by email sit in those apps under their own terms, the same as any other conversation you have there.",
    "I keep enquiry details while there's a live conversation and for a reasonable period afterwards, in case you come back. Ask me to delete yours and I will.",
    `To see what I hold, correct it, or have it removed, message me on WhatsApp or email ${site.email}. Coreline Digital, Wagle Estate, Thane, Maharashtra 400604.`,
  ],
  ctaHeading: "Questions about your data?",
  ctaBody: "Message me on WhatsApp and I'll remove whatever you want gone.",
};
