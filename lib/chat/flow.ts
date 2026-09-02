/**
 * The scripted spine of the site assistant.
 *
 * WHY THIS EXISTS RATHER THAN "JUST LET THE MODEL TALK"
 *
 * The assistant has one job: understand the visitor's business, how bad the
 * leak actually is, whether they have a site today, and how serious they are
 * about fixing it - and only THEN talk price, to someone it now knows by
 * name. That is a fixed sequence with a fixed set of things it must never get
 * wrong (the price, the delivery window, the payment terms). A model asked to
 * run that sequence will do it correctly most of the time, which is not good
 * enough when the failure mode is quoting a stranger the wrong price - and it
 * will also happily lead with price if asked to, which is exactly the instinct
 * a real qualifying conversation has to resist.
 *
 * So the sequence is deterministic and renders instantly on the client, and the
 * model is a sidecar: it handles whatever the visitor asks off-script, then the
 * flow picks up where it left off. The visitor gets a real conversation; the
 * numbers cannot drift, and they cannot appear before the assistant has
 * actually earned the right to show them.
 *
 * THE SEQUENCE, IN ORDER, AND WHY IT ISN'T SHORTER
 *   1. business  - what kind of business, so the next question can be specific
 *   2. problem   - the one leak that vertical actually has (not generic)
 *   3. impact    - how OFTEN it happens - this is the qualifying step that was
 *                  missing before: a bot that goes straight from "what's wrong"
 *                  to "here's the price" hasn't actually assessed anything
 *   4. website   - what they have today, so the pitch doesn't repeat itself
 *   5. intent    - how serious they are right now - lets the close match the
 *                  visitor instead of pushing everyone the same way
 *   6. name      - asked before the price, not after: knowing who you are
 *                  talking to is what makes the diagnosis that follows read as
 *                  actually FOR them, not a template with their words dropped in
 *   7. contact   - the number, still last, still always skippable
 *
 * Everything here is pure and framework-free so the questions can be read,
 * argued with and edited without opening a component. Icons are referenced by
 * a plain string key (IconKey, below) rather than a component import, for the
 * same reason - components/chat/ChatIcons.tsx is the one place a key becomes
 * an actual glyph.
 */

import { offer } from "@/lib/chat/facts";

/* -------------------------------------------------------------------------- */
/* Icon keys                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Every icon the widget can show. A single union here, rather than one type
 * per option list, so components/chat/ChatIcons.tsx can enforce - at the type
 * level - that every key drawn from here actually has a glyph, without this
 * file needing to know or care what an SVG is.
 */
export type IconKey =
  | VerticalId
  | "websiteNone"
  | "websiteDead"
  | "websiteFine"
  | "frequencyHigh"
  | "frequencyMid"
  | "frequencyLow"
  | "intentReady"
  | "intentWeighing"
  | "intentExploring"
  | "person"
  | "phone"
  | "skip"
  | "question"
  | "images"
  | "rupee"
  | "sparkle";

/* -------------------------------------------------------------------------- */
/* Verticals                                                                   */
/* -------------------------------------------------------------------------- */

export type VerticalId =
  | "clinic"
  | "shop"
  | "gym"
  | "coaching"
  | "jeweller"
  | "ca"
  | "realty"
  | "interior"
  | "school"
  | "travel"
  | "other";

export type Vertical = {
  id: VerticalId;
  /** Shown on the opening chips. Only six are offered; the rest are typed. */
  label: string;
  /** Free-text matching, lowercase. First hit wins. */
  keywords: string[];
  /** How the bot refers to their trade inside a sentence. */
  trade: string;
  /**
   * Turn 2. The one question this owner recognises instantly - this is where
   * the bot proves it is not a generic web form.
   */
  question: string;
  /** Plausible answers, so nobody has to type to keep going. */
  answers: string[];
  /** Fallback leak, used when they typed something too long to quote back. */
  leak: string;
};

export const verticals: Record<VerticalId, Vertical> = {
  clinic: {
    id: "clinic",
    label: "Clinic",
    keywords: [
      "clinic",
      "doctor",
      "dental",
      "dentist",
      "hospital",
      "physio",
      "ayurved",
      "medical",
      "pharmac",
    ],
    trade: "a clinic",
    question:
      "Do patients call to book, or do they just walk in and wait? And what happens to a call that comes in when the front desk is busy?",
    answers: ["Mostly walk-ins", "They call to book", "Calls get missed"],
    leak: "calls coming in while the front desk is busy",
  },
  shop: {
    id: "shop",
    label: "Shop / trader",
    keywords: [
      "shop",
      "store",
      "trader",
      "trading",
      "retail",
      "d2c",
      "wholesale",
      "distributor",
      "boutique",
      "bakery",
      "restaurant",
      "cafe",
      "kirana",
      "electronic",
      "furniture",
      "hardware",
      "garment",
      "saree",
    ],
    trade: "a shop",
    question:
      "Where do most orders come in - WhatsApp, phone, or people walking in? And do you ever lose track of one?",
    answers: ["WhatsApp mostly", "Phone calls", "Walk-ins only"],
    leak: "orders arriving across WhatsApp and phone with nothing holding them together",
  },
  gym: {
    id: "gym",
    label: "Gym",
    keywords: [
      "gym",
      "fitness",
      "yoga",
      "zumba",
      "crossfit",
      "trainer",
      "pilates",
      "martial",
      "dance",
    ],
    trade: "a gym",
    question:
      "How many people message asking about fees and timings each week? And how many of those actually turn up for a trial?",
    answers: ["Many ask, few turn up", "Only a handful ask", "I lose count"],
    leak: "people asking about fees and timings who never turn up",
  },
  coaching: {
    id: "coaching",
    label: "Coaching class",
    keywords: [
      "coaching",
      "tuition",
      "classes",
      "institute",
      "academy",
      "tutor",
      "neet",
      "jee",
      "iit",
    ],
    trade: "a coaching class",
    question:
      "When parents ask about your results and batch fees, where do they see that right now?",
    answers: ["I tell them on call", "On a pamphlet", "Nowhere really"],
    leak: "parents who ask about results and fees and have nothing to look at",
  },
  jeweller: {
    id: "jeweller",
    label: "Jeweller",
    keywords: ["jewel", "jewell", "gold", "silver", "diamond", "ornament"],
    trade: "a jewellery business",
    question:
      "Do people find your designs online before coming to the shop, or only once they're in the showroom?",
    answers: ["Only in the showroom", "Some see Instagram", "They find us on Google"],
    leak: "people who never see your designs until they're already in the showroom",
  },
  ca: {
    id: "ca",
    label: "CA / professional",
    keywords: [
      "chartered accountant",
      "accountant",
      "accounting",
      "audit",
      "auditor",
      "taxation",
      "tax filing",
      "tax consultant",
      "gst",
      "consultancy",
      "consultant",
      "law firm",
      "lawyer",
      "advocate",
      "legal firm",
    ],
    trade: "a CA or professional practice",
    question:
      "During tax and filing deadlines, how many client queries pile up on WhatsApp before you get to them?",
    answers: ["Quite a few, every season", "A steady trickle all year", "We manage, mostly"],
    leak: "client queries piling up on WhatsApp around every deadline",
  },
  realty: {
    id: "realty",
    label: "Real estate",
    keywords: [
      "real estate",
      "realty",
      "property",
      "broker",
      "builder",
      "flats",
      "rental",
    ],
    trade: "a property business",
    question:
      "How many site-visit requests turn out to be people who were never going to buy?",
    answers: ["Most of them", "About half", "Hard to tell"],
    leak: "site visits with people who were never going to buy",
  },
  interior: {
    id: "interior",
    label: "Interior design",
    keywords: [
      "interior",
      "architect",
      "design studio",
      "carpent",
      "modular",
      "contractor",
      "renovation",
      "furnish",
    ],
    trade: "an interior design business",
    question:
      "Can someone see your past work anywhere online before they call you?",
    answers: ["Only on WhatsApp", "On Instagram", "Nowhere"],
    leak: "people who can't see your past work before deciding whether to call",
  },
  school: {
    id: "school",
    label: "School",
    keywords: [
      "school",
      "playgroup",
      "preschool",
      "nursery",
      "kindergarten",
      "college",
      "junior",
    ],
    trade: "a school",
    question:
      "During admission season, how many enquiry calls does the office miss?",
    answers: ["Plenty, honestly", "A few", "We manage"],
    leak: "admission enquiries the office never gets to",
  },
  travel: {
    id: "travel",
    label: "Travel",
    keywords: [
      "travel",
      "tour",
      "trip",
      "holiday",
      "ticket",
      "visa",
      "cab",
      "taxi",
      "transport",
    ],
    trade: "a travel business",
    question:
      "Do people ask you for the same itinerary and price details over and over?",
    answers: ["Every single day", "Quite often", "Not really"],
    leak: "the same itinerary and price questions answered by hand every day",
  },
  other: {
    id: "other",
    label: "Something else",
    keywords: [],
    trade: "your business",
    question:
      "What's the main way customers reach you right now - phone, WhatsApp, or walk-in?",
    answers: ["WhatsApp", "Phone calls", "Walk-ins"],
    leak: "enquiries arriving faster than one person can answer them",
  },
};

/** The six offered as chips. The other four are reachable by typing. */
export const verticalChips: VerticalId[] = [
  "clinic",
  "shop",
  "gym",
  "coaching",
  "jeweller",
  "other",
];

export function matchVertical(text: string): VerticalId {
  const value = text.toLowerCase();
  for (const vertical of Object.values(verticals)) {
    if (vertical.keywords.some((word) => value.includes(word))) return vertical.id;
  }
  return "other";
}

/**
 * A short, warm line acknowledging whatever they just described, before the
 * conversation moves on to how often it happens. Deliberately not tailored
 * per-vertical - the specificity already happened in the question that pulled
 * this answer out of them; this just has to not sound like a form clicking to
 * the next field.
 */
export const problemAcknowledgement =
  "That's more common than most owners realise, and it adds up faster than it looks.";

/* -------------------------------------------------------------------------- */
/* Impact - how often the leak actually happens                                */
/* -------------------------------------------------------------------------- */

export type Frequency = "high" | "mid" | "low";

export const frequencyChips: { id: Frequency; label: string; icon: IconKey }[] = [
  { id: "high", label: "Most days", icon: "frequencyHigh" },
  { id: "mid", label: "A few times a week", icon: "frequencyMid" },
  { id: "low", label: "Only occasionally", icon: "frequencyLow" },
];

export const frequencyLabel: Record<Frequency, string> = {
  high: "Most days",
  mid: "A few times a week",
  low: "Only occasionally",
};

/** Free text at the impact step, best effort. Null means "ask the model". */
export function classifyFrequency(text: string): Frequency | null {
  const value = text.toLowerCase();
  if (/\b(every ?day|daily|constant|all the time|non-?stop|most days|a lot)\b/.test(value)) {
    return "high";
  }
  if (/\b(rare|rarely|occasion|once in a while|not much|hardly|seldom)\b/.test(value)) {
    return "low";
  }
  if (/\b(sometimes|few times|often|weekly|couple times)\b/.test(value)) return "mid";
  return null;
}

/**
 * Folded into the diagnosis so the severity the visitor themselves reported
 * is what makes the case, not an adjective the bot picked.
 */
function severityLine(frequency: Frequency | null): string {
  if (frequency === "high") return "That's happening most days, and it adds up fast.";
  if (frequency === "mid") return "A few times a week is still real money walking past you.";
  if (frequency === "low") return "Even now and then, that's a customer who found someone else instead.";
  return "";
}

/* -------------------------------------------------------------------------- */
/* The website question                                                        */
/* -------------------------------------------------------------------------- */

export type WebsiteState = "none" | "dead" | "fine";

export const websiteChips: { id: WebsiteState; label: string; icon: IconKey }[] = [
  { id: "none", label: "No, never had one", icon: "websiteNone" },
  { id: "dead", label: "Yes, but it does nothing", icon: "websiteDead" },
  { id: "fine", label: "Yes, it's fine", icon: "websiteFine" },
];

export const websiteLabel: Record<WebsiteState, string> = {
  none: "No website",
  dead: "Has one, does nothing",
  fine: "Has one, works fine",
};

/**
 * Branch replies. The third one turns down the sale, and that is the point: a
 * visitor who watches the assistant decline to sell them something believes the
 * next thing it says.
 */
export function websiteReply(state: WebsiteState, vertical: Vertical): string {
  if (state === "none") {
    const trade = vertical.id === "other" ? "what you do" : vertical.trade;
    return `That's the most common answer, honestly. Right now anyone searching for ${trade} in your area finds someone else. That's the gap.`;
  }
  if (state === "dead") {
    return "So it's sitting there like a business card. The real question is whether it does any work - brings enquiries, answers questions, takes bookings.";
  }
  return "Good. Then the question probably isn't a new site - it might just be getting found on Google, or catching the enquiries you're missing. I'd rather tell you that than sell you a rebuild.";
}

/** Free text at the website step, best effort. Null means "ask the model". */
export function classifyWebsite(text: string): WebsiteState | null {
  const value = text.toLowerCase().trim();

  // Order matters, and it is the whole trick here: "yes, but it does nothing"
  // contains a negative word, so the has-a-dead-site phrases must be tested
  // before the no-site ones. Test them the other way round and the single most
  // common answer on this step lands in the wrong branch.
  if (
    /(does nothing|doing nothing|not working|no use|useless|dead|outdated|very old|wix|justdial|nobody visits|sitting there)/.test(
      value,
    )
  ) {
    return "dead";
  }

  if (/\b(yes|yeah|yup|yep|haan|hai|got one|have one|there is one)\b/.test(value)) {
    return /\b(fine|good|works|working|ok|okay|happy|decent|nice)\b/.test(value)
      ? "fine"
      : "dead";
  }

  if (/\b(no|nope|never|nahi|none)\b/.test(value)) return "none";

  return null;
}

/* -------------------------------------------------------------------------- */
/* Intent - how serious they are, right now                                    */
/* -------------------------------------------------------------------------- */

export type Intent = "ready" | "weighing" | "exploring";

export const intentChips: { id: Intent; label: string; icon: IconKey }[] = [
  { id: "ready", label: "Ready to move soon", icon: "intentReady" },
  { id: "weighing", label: "Weighing up my options", icon: "intentWeighing" },
  { id: "exploring", label: "Just exploring, no rush", icon: "intentExploring" },
];

export const intentLabel: Record<Intent, string> = {
  ready: "Ready to move soon",
  weighing: "Weighing up options",
  exploring: "Just exploring",
};

/** Free text at the intent step, best effort. Null means "ask the model". */
export function classifyIntent(text: string): Intent | null {
  const value = text.toLowerCase();
  if (/\b(asap|soon|ready|now|urgent|quick(ly)?|straight ?away)\b/.test(value)) return "ready";
  if (/\b(just looking|just browsing|no rush|exploring|not sure yet|maybe later|someday)\b/.test(value)) {
    return "exploring";
  }
  if (/\b(comparing|weighing|thinking|considering|options|deciding)\b/.test(value)) return "weighing";
  return null;
}

/**
 * A one-line reaction that lands differently depending on how serious they
 * said they are, right before asking for their name. This is the whole point
 * of asking intent at all - a bot that closes the same way regardless of the
 * answer has not actually used the answer for anything.
 */
export function intentAcknowledgement(intent: Intent | null): string {
  if (intent === "ready") return "Good - let's move quickly, then.";
  if (intent === "exploring") return "Totally fine - this is exactly the right time to just look around.";
  return "No pressure at all - let's at least get you the real numbers.";
}

/* -------------------------------------------------------------------------- */
/* Steps                                                                       */
/* -------------------------------------------------------------------------- */

export type Step =
  | "business"
  | "problem"
  | "impact"
  | "website"
  | "intent"
  | "name"
  | "contact"
  | "done";

/** Drawn as nodes on the progress rail in the panel header. */
export const stepOrder: Step[] = [
  "business",
  "problem",
  "impact",
  "website",
  "intent",
  "name",
  "contact",
];

export type Profile = {
  vertical: VerticalId | null;
  /** What they actually said, so the diagnosis can quote them back. */
  businessText: string;
  problemText: string;
  frequency: Frequency | null;
  website: WebsiteState | null;
  intent: Intent | null;
  name: string;
  phone: string;
};

export const emptyProfile: Profile = {
  vertical: null,
  businessText: "",
  problemText: "",
  frequency: null,
  website: null,
  intent: null,
  name: "",
  phone: "",
};

/** The question the flow is currently waiting on, for a given step. */
export function pendingQuestion(step: Step, profile: Profile): string {
  if (step === "business") return "What kind of business do you run?";
  if (step === "problem") return verticals[profile.vertical ?? "other"].question;
  if (step === "impact") return "How often would you say that happens?";
  if (step === "website") return "Do you have a website right now?";
  if (step === "intent") {
    return "Are you looking to sort this soon, or just weighing things up for now?";
  }
  if (step === "name") return "What should I call you?";
  if (step === "contact") return "Can I take your number so Shailesh can reply?";
  return "";
}

/* -------------------------------------------------------------------------- */
/* The diagnosis - given only once the visitor has been properly qualified     */
/* -------------------------------------------------------------------------- */

/**
 * Restates the leak in their words where possible, folds in how often they
 * said it happens, and opens with their name once they've given one. A quoted
 * chip reads far more personal than a paraphrase, and unlike a paraphrase it
 * cannot be wrong.
 *
 * This now runs after business, problem, impact, website, intent AND name -
 * six real exchanges, not three - which is the point: price and terms only
 * show up once the assistant has actually assessed the business, not the
 * moment it has enough to fill in a template.
 */
export function diagnosis(profile: Profile): string {
  const vertical = verticals[profile.vertical ?? "other"];
  const said = profile.problemText.trim().replace(/[.!]+$/, "");
  const quotable = said.length > 0 && said.length <= 90;
  const leak = quotable ? `"${said.toLowerCase()}"` : vertical.leak;
  const severity = severityLine(profile.frequency);
  const firstName = profile.name.trim().split(/\s+/)[0];
  const opener = firstName ? `${firstName} - here's` : "Here's";

  if (profile.website === "fine") {
    return `${opener} what I'm seeing: the leak is ${leak}. ${severity} A rebuild won't fix that on its own - being found, and being answered quickly, will. That's worth twenty minutes with Shailesh to work out which.`.replace(
      /\s+/g,
      " ",
    );
  }

  return `${opener} what I'm seeing: the leak is ${leak}. ${severity} Those are customers you're already paying rent and staff for - they reach out, and nobody gets back to them in time.`.replace(
    /\s+/g,
    " ",
  );
}

/**
 * The ask, matched to how serious they said they were at the intent step -
 * "leave your number" reads differently to someone who just said they are
 * ready to move versus someone who said they are only exploring.
 */
export function closingAsk(intent: Intent | null): string {
  if (intent === "ready") {
    return "Leave your number and Shailesh will look at how your business shows up on Google right now, then message you on WhatsApp with next steps.";
  }
  if (intent === "exploring") {
    return "No obligation either way - leave your number if you want, and Shailesh will send a short honest opinion on WhatsApp, on your own time.";
  }
  return "If you want, leave your number and Shailesh will look at how your business shows up on Google right now and send you a short honest opinion on WhatsApp. Free - and he'll tell you if you don't need one.";
}

/* -------------------------------------------------------------------------- */
/* Phone                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Finds an Indian mobile number inside a message, not just a message that IS
 * one.
 *
 * The first version required the ENTIRE message to digit-strip to exactly ten
 * digits, so anything a real person actually types alongside a number - "call
 * me on 9082308732 after 6pm", "…, flat no 302" - failed outright at the one
 * step that turns the conversation into a lead. This instead looks for a
 * standalone 6-9-starting run of ten digits, tolerating a single space or
 * dash in the middle (the common "90823 08732" way people write it) and an
 * optional +91/91 prefix, but refusing to match a ten-digit run that is
 * actually part of a longer one - a lookaround on both sides requires the
 * number not be glued to more digits, so it can't mistake an order number or
 * a PIN code for a phone number.
 */
const PHONE_PATTERN = /(?<!\d)(?:\+?91[\s-]?)?([6-9]\d{4}[\s-]?\d{5})(?!\d)/g;

export function extractPhone(text: string): string | null {
  for (const match of text.matchAll(PHONE_PATTERN)) {
    const candidate = match[1]!.replace(/[\s-]/g, "");
    if (/^[6-9]\d{9}$/.test(candidate)) return candidate;
  }
  return null;
}

export function formatPhone(phone: string): string {
  return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
}

/* -------------------------------------------------------------------------- */
/* Handoff                                                                     */
/* -------------------------------------------------------------------------- */

export type LeadSummary = {
  business: string;
  problem: string;
  frequency: string;
  website: string;
  intent: string;
  name: string;
  phone: string;
};

export function buildSummary(profile: Profile): LeadSummary {
  const vertical = verticals[profile.vertical ?? "other"];
  return {
    business: profile.businessText.trim() || vertical.label,
    problem: profile.problemText.trim() || "-",
    frequency: profile.frequency ? frequencyLabel[profile.frequency] : "-",
    website: profile.website ? websiteLabel[profile.website] : "-",
    intent: profile.intent ? intentLabel[profile.intent] : "-",
    name: profile.name.trim(),
    phone: profile.phone,
  };
}

/** Pre-fills WhatsApp so the visitor never has to explain themselves twice. */
export function whatsappMessage(summary: LeadSummary): string {
  const lines = [
    "Hi Shailesh - I was on your website.",
    "",
    `Business: ${summary.business}`,
    `Website today: ${summary.website}`,
    `Where I'm losing customers: ${summary.problem}`,
    `How often: ${summary.frequency}`,
  ];
  if (summary.intent !== "-") lines.push(`Where I'm at: ${summary.intent}`);
  if (summary.name) lines.push(`Name: ${summary.name}`);
  lines.push(
    "",
    "Can you take a look and tell me honestly whether this is worth doing?",
  );
  return lines.join("\n");
}

export function whatsappHref(base: string, summary: LeadSummary): string {
  return `${base}?text=${encodeURIComponent(whatsappMessage(summary))}`;
}

/* -------------------------------------------------------------------------- */
/* Routing free text                                                           */
/* -------------------------------------------------------------------------- */

const QUESTION_STARTERS =
  /^(what|how|why|who|when|where|which|can|could|do|does|did|is|are|will|would|should|tell me|explain|kitna|kaise|kya)\b/i;

/**
 * Phrases that are almost never how someone describes their own business, so
 * they are trusted regardless of how long the message is.
 */
const STRONG_QUESTION_SIGNAL =
  /\b(wondering|wonder if|curious|want to know|any chance|is there a way)\b/i;

const QUESTION_HINTS =
  /\b(price|pricing|cost|costs|charge|charges|rate|rates|fee|fees|budget|discount|portfolio|example|examples|sample|samples|client|clients|experience|seo|google|hosting|domain|maintenance|refund|guarantee|payment|advance|timeline|deadline)\b/i;

/** Above this many words, a topic keyword alone is not trusted - see below. */
const HINT_WORD_LIMIT = 5;

/**
 * Decides whether typed text is an answer to the current question or a question
 * of its own. Getting this wrong is cheap in only one direction - treating a
 * question as an answer strands the visitor - so ties go to "ask the model",
 * which leaves the current question on screen either way.
 *
 * QUESTION_HINTS used to trigger on its own, at any length. That is exactly
 * backwards for this bot: the vertical-specific questions it asks ("do you
 * ever lose track of an order", "when parents ask about fees") are designed
 * to pull answers that use words like fee, budget, timeline and booking - so
 * a genuine, on-topic answer like "we lose track of orders when it's busy, no
 * budget for extra staff" was being discarded and routed to the model instead
 * of captured, silently stalling the flow. A bare keyword is now trusted only
 * on a short message, where it is far more likely to be an actual question
 * ("any discount?") than a multi-clause description of the visitor's business.
 */
export function looksLikeQuestion(text: string): boolean {
  const value = text.trim();
  if (value.endsWith("?")) return true;
  if (STRONG_QUESTION_SIGNAL.test(value)) return true;
  if (QUESTION_STARTERS.test(value) && value.split(/\s+/).length > 2) return true;

  const words = value.split(/\s+/).filter(Boolean);
  return words.length <= HINT_WORD_LIMIT && QUESTION_HINTS.test(value);
}

/** Context handed to the model so its answer lands inside the conversation. */
export function stageNote(step: Step, profile: Profile): string {
  const vertical = profile.vertical ? verticals[profile.vertical] : null;
  const known = [
    vertical ? `They run ${vertical.trade}.` : null,
    profile.problemText ? `They described their problem as: "${profile.problemText}".` : null,
    profile.frequency ? `It happens: ${frequencyLabel[profile.frequency]}.` : null,
    profile.website ? `Website today: ${websiteLabel[profile.website]}.` : null,
    profile.intent ? `Where they're at: ${intentLabel[profile.intent]}.` : null,
    profile.name ? `Their name is ${profile.name.trim().split(/\s+/)[0]}.` : null,
  ]
    .filter(Boolean)
    .join(" ");

  const waiting = pendingQuestion(step, profile);

  return [
    known || "You know nothing about them yet.",
    waiting
      ? `The conversation is waiting on this question: "${waiting}". Answer what they asked, then hand back to it in one short line.`
      : "They have already been through the questions - answer briefly and point them to WhatsApp.",
  ].join(" ");
}

/** Shown once the per-session model budget is spent. */
export const budgetSpent = `That's about as far as I can take it here. Send Shailesh a WhatsApp message and he'll answer properly - he replies himself. Builds start at ${offer.priceFrom}, take ${offer.deliveryShort}, and you pay half only once it's live.`;

/** After a handoff, if they keep talking - do not replay the ending. */
export const reopenAsk =
  "Sure - what kind of business are you in?";

/** Short social lines after a handoff - not a business, not a FAQ chip. */
export function looksLikeSocial(text: string): boolean {
  return /^(hi|hii|hello|hey|yo|ok|okay|okk|thanks|thank you|thx|ty|bye|good|great|cool|sure|yes|yeah|yep|no|nope|hmm|ok thanks|ok thank you)[\s!.]*$/i.test(
    text.trim(),
  );
}

/** The three chips after a handoff, so those taps never burn another model turn. */
export const postFlowReplies: Record<string, string> = {
  "What if I don't need a website?":
    "Then you shouldn't get one. Shailesh would rather say that on WhatsApp than take money for a site you don't need.",
  "Can I see your samples?":
    "They're on the Work page of this site - you can click into any of them.",
  "How does payment work?":
    `Half to start, half only when the site is live. Builds start at ${offer.priceFrom} and usually take ${offer.deliveryShort}.`,
};
