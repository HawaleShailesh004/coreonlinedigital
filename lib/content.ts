/**
 * Single source of truth for site copy.
 * Mirrors coreline-site-copy-draft.md - edit copy here, never inline in components.
 */

export const site = {
  name: "coreline.",
  legalName: "Coreline Digital",
  tagline: "Digital infrastructure that drives revenue, not just traffic.",
  location: "Wagle Estate, Thane",
  region: "Maharashtra",
  phone: "+91 90823 08732",
  phoneHref: "tel:+919082308732",
  whatsapp: "https://wa.me/919082308732",
  email: "coreonlinedigital@gmail.com",
  emailHref: "mailto:coreonlinedigital@gmail.com",
  primaryCta: "Book Strategy Call",
  url: "https://corelinedigital.com",
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
] as const;

export const hero = {
  headline: [
    [{ text: "Digital infrastructure" }],
    [{ text: "that " }, { text: "drives revenue", tone: "accent" as const }, { text: "," }],
    [{ text: "not just traffic.", tone: "muted" as const }],
  ],
  subhead:
    "We build the booking, triage, and follow-up systems behind a clinic, firm, or storefront's front door - engineered for owners who've outgrown templates.",
  ctas: [
    { label: "View Sample Systems", href: "/work", variant: "primary" as const },
    { label: "Our Services", href: "/services", variant: "secondary" as const },
  ],
};

export const focusStrip = {
  eyebrow: "Built for",
  items: [
    "Clinics",
    "CAs & Professionals",
    "Jewellers",
    "Schools",
    "Real Estate",
    "Traders",
  ],
};

export type Pillar = {
  id: string;
  number: string;
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
    id: "storefronts",
    number: "01",
    title: "Digital Storefronts",
    tagline: "A site that works while you don't.",
    teaser:
      "Your website shouldn't be a digital business card. It should be the first employee a customer meets - one that never calls in sick.",
    body: "Your storefront is the first thing a customer sees before they ever speak to you - it should look like it, and work like it. We design and build sites that are fast, clear, and built around the one action you actually want a visitor to take.",
    includes: [
      "Custom-designed website or landing page (not a theme)",
      "Mobile-first build, fast load times",
      "Product/service catalog with online payments, where needed",
      "Built to convert visitors into calls, bookings, or orders",
    ],
  },
  {
    id: "acquisition",
    number: "02",
    title: "Client Acquisition Systems",
    tagline: "Stop losing leads to a missed call.",
    teaser:
      "Every unanswered call or unread message is a customer who booked with someone else. We build the systems that catch them anyway.",
    body: "A missed call at 9pm is a lost customer by 9:05. We build the layer that catches every enquiry - on WhatsApp, on your site, or over a form - and responds before the customer moves on to the next name on their list.",
    includes: [
      "AI chat agents for your website or WhatsApp",
      "Automated appointment booking and reminders",
      "Lead capture routed straight to you, no manual entry",
      "Follow-up sequences that run without you touching them",
    ],
  },
  {
    id: "operations",
    number: "03",
    title: "Growth & Operations",
    tagline: "The system, maintained.",
    teaser:
      "A site that isn't watched slowly stops working. We keep it running, keep it visible, and keep it improving - every month.",
    body: "A site you never touch again slowly stops working - search rankings slip, content goes stale, nothing improves. This is the retainer: we keep the system visible, current, and getting better, every month, without you having to ask.",
    includes: [
      "Monthly social/graphic content for Instagram and other platforms",
      "Google Business Profile setup and optimization",
      "Local SEO essentials",
      "Automated review requests after every booking or sale",
      "Ongoing monitoring and small improvements",
    ],
  },
];

export const process = {
  eyebrow: "How we work",
  steps: [
    {
      number: "01",
      title: "Discovery",
      body: "We map every point where a client currently drops off - the missed call, the slow reply, the booking that never happened.",
    },
    {
      number: "02",
      title: "Build",
      body: "A live system, not a mockup. Booking, triage, and follow-up, wired together and tested before it ever goes live.",
    },
    {
      number: "03",
      title: "Operate",
      body: "Monitored and tuned monthly under retainer - not handed over and forgotten.",
    },
  ],
};

export const whyNotTemplate = {
  eyebrow: "The difference",
  headline: "Templates are rented. Systems are owned.",
  body: "A template site looks fine in a screenshot and does nothing once it's live - no memory of a customer, no way to catch a missed call, no way to get better over time. We don't sell you a page. We build the infrastructure behind it: the parts that book the appointment, answer the question at 11pm, and follow up before you remember to.",
  panels: {
    template: {
      label: "Template",
      lines: ["Looks finished on day one.", "Flat ever after."],
    },
    system: {
      label: "System",
      lines: ["Books, answers, follows up.", "Still running at 11pm."],
    },
  },
};

export type Industry =
  | "Clinic"
  | "Jeweller"
  | "CA / Professional"
  | "School"
  | "Real Estate";

export type WorkSample = {
  slug: string;
  industry: Industry;
  name: string;
  summary: string;
  tags: string[];
  href: string;
};

export const workSamples: WorkSample[] = [
  {
    slug: "family-clinic-booking",
    industry: "Clinic",
    name: "Sample: Family Clinic Booking Site",
    summary: "Turns walk-in-only enquiries into a same-day booking calendar.",
    tags: ["Storefront", "Acquisition System"],
    href: "#",
  },
  {
    slug: "jeweller-catalogue",
    industry: "Jeweller",
    name: "Sample: Jeweller Collection Catalogue",
    summary: "Puts the display case online, with enquiries routed to WhatsApp.",
    tags: ["Storefront"],
    href: "#",
  },
  {
    slug: "ca-practice-intake",
    industry: "CA / Professional",
    name: "Sample: CA Practice Intake System",
    summary: "Screens and sorts client enquiries before they reach your desk.",
    tags: ["Acquisition System"],
    href: "#",
  },
  {
    slug: "school-admissions",
    industry: "School",
    name: "Sample: School Admissions Funnel",
    summary: "Handles admission enquiries and follow-up through the season.",
    tags: ["Storefront", "Acquisition System"],
    href: "#",
  },
  {
    slug: "realty-listings",
    industry: "Real Estate",
    name: "Sample: Realty Listings Front Door",
    summary: "Qualifies site-visit requests before an agent spends a Sunday.",
    tags: ["Storefront", "Acquisition System"],
    href: "#",
  },
];

export const workPage = {
  eyebrow: "Sample systems",
  heading: "Built to show what's possible.",
  sub: "These are concept builds - made to show exactly what a Digital Storefront or Acquisition System looks like for a specific kind of business. Real client work will replace these as it ships.",
  bottomHeading: "Want to see what this looks like for your business?",
};

export const workTeaser = {
  eyebrow: "Recent builds",
  heading: "A few systems we've built",
  cta: "See all sample systems",
};

export const founder = {
  eyebrow: "Who's building this",
  heading: "One engineer. No handoffs.",
  body: "Coreline is built and run by Shailesh - one person who understands your business on the call and builds the system afterward. No account manager, no relay between the person who sold you and the person who delivers. What you ask for is what gets built, by the same person, start to finish.",
};

export const finalCta = {
  heading: "Let's see where you're losing customers.",
  body: "A 20-minute call is enough to find the leaks - the missed calls, the slow replies, the bookings that quietly went to someone else.",
};

export const servicesPage = {
  eyebrow: "What we build",
  heading: "Three systems. One business.",
  sub: "Most agencies sell you a website and disappear. We build the storefront, the system behind it that catches customers you'd otherwise lose, and stay on to run it.",
  bottomHeading: "Not sure which one you need?",
  bottomBody:
    "Most clients start with a Digital Storefront and add Acquisition or Operations once it's live. We'll tell you honestly what you actually need on the call - not what's most expensive.",
};

export const contactPage = {
  heading: "Let's talk about your business.",
  sub: "Fastest way to reach us is WhatsApp. Or leave your number and we'll call you.",
  formSubmit: "Request a Call Back",
  microCopy:
    "We usually call back within a few hours, same day if you reach out before 6pm.",
  businessTypes: [
    "Clinic",
    "Jeweller",
    "CA/Professional",
    "School",
    "Real Estate",
    "Trader",
    "Other",
  ],
};
