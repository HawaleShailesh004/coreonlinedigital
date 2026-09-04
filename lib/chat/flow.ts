/**
 * The scripted spine of the site assistant - v2.
 *
 * WHY THIS EXISTS RATHER THAN "JUST LET THE MODEL TALK"
 *
 * The assistant's job is to run an actual consultative sales conversation -
 * PAS (Pain, Agitate, Solve) plus SPIN's Implication and Need-payoff moves -
 * not fill in a form. That means a fixed sequence with a fixed set of things
 * it must never get wrong (the price, the delivery window, the payment
 * terms, and the ORDER those get revealed in). A model asked to run that
 * sequence will do it correctly most of the time, which is not good enough
 * when the failure mode is quoting a stranger the wrong price - and it will
 * also happily lead with price the moment it's asked to, which is exactly
 * the instinct a real qualifying conversation has to resist.
 *
 * So the sequence is deterministic and renders instantly on the client, and
 * the model is a sidecar: it handles whatever the visitor asks off-script,
 * then the flow picks up where it left off. The visitor gets a real
 * conversation; the numbers cannot drift, and they cannot appear before the
 * assistant has actually earned the right to show them.
 *
 * TWO PATHS, ONE WIDGET
 *
 * Right after the greeting, the visitor picks their own pace:
 *
 *   "consult" - the full sales conversation. Identify the business, surface
 *     the pain, reflect its cost back (Implication), get them to name the
 *     win they want (Need-payoff), surface what's actually stopped them so
 *     far, hear what they have today, THEN bridge to a solution and check
 *     for agreement - and only once they've said yes does price ever appear.
 *     Someone who says "not right now" gets released gracefully, never
 *     pushed for a phone number.
 *
 *   "quick" - business type, an optional one-line problem question they can
 *     skip, the facts card, name, phone. No probing. For someone who just
 *     wants the number and doesn't want a conversation - respecting that is
 *     also good salesmanship.
 *
 * Everything here is pure and framework-free so the questions can be read,
 * argued with and edited without opening a component. Icons are referenced
 * by a plain string key (IconKey, below) rather than a component import, for
 * the same reason - components/chat/ChatIcons.tsx is the one place a key
 * becomes an actual glyph.
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
  | "confirmYes"
  | "confirmManageable"
  | "goalGrowth"
  | "goalRepeat"
  | "goalLegit"
  | "goalFound"
  | "obstacleTime"
  | "obstacleBurned"
  | "obstacleWorth"
  | "fitYes"
  | "fitNotNow"
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
  /**
   * The Implication half of the amplify step: what the leak actually costs,
   * in plain terms, tacked onto a frequency phrase. Written to be TRUE
   * regardless of how often it happens - the frequency phrase in front of it
   * is what carries the intensity.
   */
  consequence: string;
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
    consequence: "That's people who tried to reach you and didn't get through.",
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
    consequence:
      "That's orders you can't be completely sure you didn't lose track of.",
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
    consequence: "That's people who showed real interest and never walked in.",
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
    consequence:
      "That's parents deciding without the one thing that would have reassured them.",
  },
  jeweller: {
    id: "jeweller",
    label: "Jeweller",
    keywords: ["jewel", "jewell", "gold", "silver", "diamond", "ornament"],
    trade: "a jewellery business",
    question:
      "Do people find your designs online before coming to the shop, or only once they're in the showroom?",
    answers: [
      "Only in the showroom",
      "Some see Instagram",
      "They find us on Google",
    ],
    leak: "people who never see your designs until they're already in the showroom",
    consequence:
      "That's people who never got excited enough to walk in at all.",
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
    answers: [
      "Quite a few, every season",
      "A steady trickle all year",
      "We manage, mostly",
    ],
    leak: "client queries piling up on WhatsApp around every deadline",
    consequence:
      "That's clients feeling ignored right when they need you most.",
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
    consequence:
      "That's your time spent on visits that were never going to close.",
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
    consequence:
      "That's people who couldn't tell if you're any good before they called.",
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
    consequence:
      "That's admissions that quietly went to a school that answered.",
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
    consequence:
      "That's you re-explaining the same trip instead of closing it.",
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
    consequence:
      "That's customers who reached out and didn't hear back in time.",
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
    if (vertical.keywords.some((word) => value.includes(word)))
      return vertical.id;
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
/* Amplify - frequency, then the Implication reflection                        */
/* -------------------------------------------------------------------------- */

export type Frequency = "high" | "mid" | "low";

export const frequencyChips: { id: Frequency; label: string; icon: IconKey }[] =
  [
    { id: "high", label: "Most days", icon: "frequencyHigh" },
    { id: "mid", label: "A few times a week", icon: "frequencyMid" },
    { id: "low", label: "Only occasionally", icon: "frequencyLow" },
  ];

export const frequencyLabel: Record<Frequency, string> = {
  high: "Most days",
  mid: "A few times a week",
  low: "Only occasionally",
};

/** Free text at the frequency sub-step, best effort. Null means "ask the model". */
export function classifyFrequency(text: string): Frequency | null {
  const value = text.toLowerCase();
  if (
    /\b(every ?day|daily|constant|all the time|non-?stop|most days|a lot)\b/.test(
      value,
    )
  ) {
    return "high";
  }
  if (
    /\b(rare|rarely|occasion|once in a while|not much|hardly|seldom)\b/.test(
      value,
    )
  ) {
    return "low";
  }
  if (/\b(sometimes|few times|often|weekly|couple times)\b/.test(value))
    return "mid";
  return null;
}

const FREQUENCY_PHRASE: Record<Frequency, string> = {
  high: "most days",
  mid: "a few times a week",
  low: "every now and then",
};

/**
 * The SPIN "Implication" move: reflect the cost of the leak back in the
 * visitor's own terms, using what they actually said where it's short enough
 * to quote, rather than lecturing them with a made-up statistic. This is what
 * separates a bot that has "assessed" a business from one that has just
 * collected a form field.
 */
export function amplifyReflection(profile: Profile): string {
  const vertical = verticals[profile.vertical ?? "other"];
  const said = profile.problemText.trim().replace(/[.!]+$/, "");
  const quotable = said.length > 0 && said.length <= 90;
  // Only the leading letter gets lowercased, so a mid-sentence brand name the
  // visitor typed or tapped - "WhatsApp mostly", "Google ads" - keeps its
  // capital instead of reading like a typo.
  const leak = quotable
    ? said.charAt(0).toLowerCase() + said.slice(1)
    : vertical.leak;
  const frequencyPhrase = FREQUENCY_PHRASE[profile.frequency ?? "mid"];

  return `So ${leak} - and that's happening ${frequencyPhrase}. ${vertical.consequence} Does that sound about right?`;
}

export type AmplifyConfirm = "yes" | "manageable" | "unsure";

export const amplifyConfirmChips: {
  id: AmplifyConfirm;
  label: string;
  icon: IconKey;
}[] = [
  { id: "yes", label: "Yes, that's the issue", icon: "confirmYes" },
  {
    id: "manageable",
    label: "Annoying but manageable",
    icon: "confirmManageable",
  },
  { id: "unsure", label: "Not sure", icon: "question" },
];

export function classifyAmplifyConfirm(text: string): AmplifyConfirm | null {
  const value = text.toLowerCase();
  if (/\b(yes|yeah|yep|exactly|right|true|that's it|spot on)\b/.test(value))
    return "yes";
  if (
    /\b(manageable|annoying|ok|okay|fine|not that bad|deal with it)\b/.test(
      value,
    )
  ) {
    return "manageable";
  }
  if (/\b(not sure|maybe|don't know|dunno|hard to say)\b/.test(value))
    return "unsure";
  return null;
}

/**
 * Folded into the diagnosis so the severity the visitor themselves reported
 * is what makes the case, not an adjective the bot picked.
 */
function severityLine(frequency: Frequency | null): string {
  if (frequency === "high")
    return "That's happening most days, and it adds up fast.";
  if (frequency === "mid")
    return "A few times a week is still real money walking past you.";
  if (frequency === "low")
    return "Even now and then, that's a customer who found someone else instead.";
  return "";
}

/* -------------------------------------------------------------------------- */
/* Goal - the SPIN Need-payoff move: get them to name the win                  */
/* -------------------------------------------------------------------------- */

export type Goal = "bookings" | "stopRepeating" | "lookLegit" | "getFound";

export const goalChips: { id: Goal; label: string; icon: IconKey }[] = [
  { id: "bookings", label: "More bookings or orders", icon: "goalGrowth" },
  {
    id: "stopRepeating",
    label: "Stop repeating myself all day",
    icon: "goalRepeat",
  },
  { id: "lookLegit", label: "Look legit online", icon: "goalLegit" },
  { id: "getFound", label: "Get found on Google", icon: "goalFound" },
];

export const goalLabel: Record<Goal, string> = {
  bookings: "More bookings or orders",
  stopRepeating: "Stop repeating myself all day",
  lookLegit: "Look legit online",
  getFound: "Get found on Google",
};

export function classifyGoal(text: string): Goal | null {
  const value = text.toLowerCase();
  if (/\b(book|order|sale|revenue|customers?|clients?)\b/.test(value))
    return "bookings";
  if (/\b(repeat|same questions|answer|reply|time|tired of)\b/.test(value))
    return "stopRepeating";
  if (/\b(legit|professional|serious|trust|credib)\b/.test(value))
    return "lookLegit";
  if (/\b(found|google|search|seo|visible|show up)\b/.test(value))
    return "getFound";
  return null;
}

/* -------------------------------------------------------------------------- */
/* Obstacle - surface the real objection before the pitch, not after          */
/* -------------------------------------------------------------------------- */

export type Obstacle =
  | "neverGotToIt"
  | "notSureWhatINeed"
  | "gotBurned"
  | "notSureWorthIt";

export const obstacleChips: { id: Obstacle; label: string; icon: IconKey }[] = [
  { id: "neverGotToIt", label: "Never got around to it", icon: "obstacleTime" },
  {
    id: "notSureWhatINeed",
    label: "Not sure what I actually need",
    icon: "question",
  },
  { id: "gotBurned", label: "Got burned before", icon: "obstacleBurned" },
  {
    id: "notSureWorthIt",
    label: "Wasn't sure it's worth it",
    icon: "obstacleWorth",
  },
];

export const obstacleLabel: Record<Obstacle, string> = {
  neverGotToIt: "Never got around to it",
  notSureWhatINeed: "Not sure what they need",
  gotBurned: "Got burned before",
  notSureWorthIt: "Wasn't sure it's worth it",
};

export function classifyObstacle(text: string): Obstacle | null {
  const value = text.toLowerCase();
  if (
    /\b(burned|scammed|ripped off|bad experience|last time|previous (guy|developer|freelancer))\b/.test(
      value,
    )
  ) {
    return "gotBurned";
  }
  if (/\b(worth|expensive|cost|afford|budget|price)\b/.test(value))
    return "notSureWorthIt";
  if (
    /\b(don't know|not sure|no idea|confus|what i need|which)\b/.test(value)
  ) {
    return "notSureWhatINeed";
  }
  if (
    /\b(never|busy|no time|got around|procrastinat|lazy|forgot)\b/.test(value)
  ) {
    return "neverGotToIt";
  }
  return null;
}

/* -------------------------------------------------------------------------- */
/* The website question                                                        */
/* -------------------------------------------------------------------------- */

export type WebsiteState = "none" | "dead" | "fine";

export const websiteChips: {
  id: WebsiteState;
  label: string;
  icon: IconKey;
}[] = [
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

  if (
    /\b(yes|yeah|yup|yep|haan|hai|got one|have one|there is one)\b/.test(value)
  ) {
    return /\b(fine|good|works|working|ok|okay|happy|decent|nice)\b/.test(value)
      ? "fine"
      : "dead";
  }

  if (/\b(no|nope|never|nahi|none)\b/.test(value)) return "none";

  return null;
}

/* -------------------------------------------------------------------------- */
/* Fit - diagnosis, solution bridge, agreement (no price yet)                  */
/* -------------------------------------------------------------------------- */

export type Fit = "yes" | "questions" | "no";

export const fitChips: { id: Fit; label: string; icon: IconKey }[] = [
  { id: "yes", label: "Yes, let's do it", icon: "fitYes" },
  { id: "questions", label: "I've got more questions", icon: "question" },
  { id: "no", label: "Not right now", icon: "fitNotNow" },
];

/**
 * The bridge from diagnosis to solution - deliberately carries no rupee
 * amounts. Price only ever appears after this gets a yes, which is the whole
 * point of the fit step: agree on direction first, negotiate nothing before
 * that agreement exists.
 *
 * When the obstacle was "got burned before", this is the one place that
 * objection gets answered directly rather than left hanging - a real
 * salesperson does not pitch past a stated bad experience without addressing
 * it, and the honest answer here is the same payment structure that already
 * protects against it.
 */
export function solutionBridge(profile: Profile): string {
  const vertical = verticals[profile.vertical ?? "other"];
  const trade =
    vertical.id === "other"
      ? "businesses like yours"
      : `${vertical.trade}s like yours`.replace("a ", "");
  const base = `From what you've said, a site that answers ${vertical.leak.startsWith("the") ? vertical.leak : "that"} when you can't - and shows up when people search - sounds like it could help. Shailesh builds exactly that for ${trade}.`;

  if (profile.obstacle === "gotBurned") {
    return `${base} And given what happened last time - you'd see it before it's live, and only pay the rest once it's actually working, not before.`;
  }
  return base;
}

/** The agreement question itself, asked right after the solution bridge. */
export const fitQuestion = "Does that direction sound worth looking into?";

/**
 * Free text at the fit step, best effort. Null routes to the model rather
 * than guessing - wrongly reading a reply as "no" ends the conversation, and
 * wrongly reading it as "yes" skips straight to asking for a phone number
 * nobody agreed to give yet. Both are worse than one extra AI turn.
 */
export function classifyFit(text: string): Fit | null {
  const value = text.toLowerCase();
  if (
    /\b(yes|yeah|yep|sure|let'?s do it|sounds good|go ahead|definitely|why not)\b/.test(
      value,
    )
  ) {
    return "yes";
  }
  if (
    /\b(no|not now|not right now|maybe later|not interested|nah|not yet)\b/.test(
      value,
    )
  ) {
    return "no";
  }
  return null;
}

/** Shown when fit === "no" - the graceful exit. No phone ask, ever. */
export const gracefulExit =
  "Fair enough - no pressure. WhatsApp is on the site whenever you want a second opinion. Shailesh replies himself, usually within a few hours.";

/* -------------------------------------------------------------------------- */
/* Steps                                                                       */
/* -------------------------------------------------------------------------- */

export type Path = "consult" | "quick";

export type Step =
  | "route"
  | "business"
  | "problem"
  | "amplify"
  | "goal"
  | "obstacle"
  | "website"
  | "fit"
  | "quickProblem"
  | "quickFacts"
  | "name"
  | "contact"
  | "done";

/**
 * Drawn as nodes on the progress rail in the panel header - differs by path.
 * "quickFacts" is not a rail stop: nothing ever waits there for an answer -
 * the facts card is shown as content during the quickProblem -> name
 * transition, so the step machine never actually pauses on it.
 */
export function stepOrderForPath(path: Path | null): Step[] {
  if (path === "quick") return ["business", "quickProblem", "name", "contact"];
  return [
    "business",
    "problem",
    "amplify",
    "goal",
    "obstacle",
    "website",
    "fit",
    "name",
    "contact",
  ];
}

export type Profile = {
  path: Path | null;
  vertical: VerticalId | null;
  /** What they actually said, so the diagnosis can quote them back. */
  businessText: string;
  problemText: string;
  frequency: Frequency | null;
  amplifyConfirm: AmplifyConfirm | null;
  goal: Goal | null;
  obstacle: Obstacle | null;
  website: WebsiteState | null;
  fit: Fit | null;
  name: string;
  phone: string;
};

export const emptyProfile: Profile = {
  path: null,
  vertical: null,
  businessText: "",
  problemText: "",
  frequency: null,
  amplifyConfirm: null,
  goal: null,
  obstacle: null,
  website: null,
  fit: null,
  name: "",
  phone: "",
};

/** The question the flow is currently waiting on, for a given step. */
export function pendingQuestion(step: Step, profile: Profile): string {
  if (step === "route") {
    return "Want me to ask a few questions about your business, or would you rather type freely?";
  }
  if (step === "business") return "What kind of business do you run?";
  if (step === "problem" || step === "quickProblem") {
    return verticals[profile.vertical ?? "other"].question;
  }
  if (step === "amplify") {
    return profile.frequency
      ? amplifyReflection(profile)
      : "How often would you say that happens?";
  }
  if (step === "goal")
    return "If this were sorted, what would that actually look like for you?";
  if (step === "obstacle") return "What's stopped you from fixing this so far?";
  if (step === "website") return "Do you have a website right now?";
  if (step === "fit") return fitQuestion;
  if (step === "quickFacts") {
    return "Here's what Shailesh charges and how it works - leave your name and number if you want him to take a look, or skip straight to WhatsApp.";
  }
  if (step === "name") return "What should I call you?";
  if (step === "contact")
    return "Can I take your number so Shailesh can reply on WhatsApp?";
  return "";
}

/* -------------------------------------------------------------------------- */
/* The diagnosis - shown inside `fit`, before the solution bridge              */
/* -------------------------------------------------------------------------- */

/**
 * Restates the leak in their words where possible and folds in how often
 * they said it happens. A quoted chip reads far more personal than a
 * paraphrase, and unlike a paraphrase it cannot be wrong.
 */
export function diagnosis(profile: Profile): string {
  const vertical = verticals[profile.vertical ?? "other"];
  const said = profile.problemText.trim().replace(/[.!]+$/, "");
  const quotable = said.length > 0 && said.length <= 90;
  const leak = quotable ? `"${said.toLowerCase()}"` : vertical.leak;
  const severity = severityLine(profile.frequency);

  if (profile.website === "fine") {
    return `Here's what I'm seeing: the leak is ${leak}. ${severity} A rebuild won't fix that on its own - being found, and being answered quickly, will.`.replace(
      /\s+/g,
      " ",
    );
  }

  return `Here's what I'm seeing: the leak is ${leak}. ${severity} Those are customers you're already paying rent and staff for - they reach out, and nobody gets back to them in time.`.replace(
    /\s+/g,
    " ",
  );
}

/** The ask, once fit has landed on "yes" and the facts card is on screen. */
export const closingAsk =
  "Leave your number and Shailesh will look at how your business shows up on Google right now, then message you on WhatsApp with next steps.";

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
  path: string;
  business: string;
  problem: string;
  frequency: string;
  goal: string;
  obstacle: string;
  website: string;
  fit: string;
  name: string;
  phone: string;
};

export function buildSummary(profile: Profile): LeadSummary {
  const vertical = verticals[profile.vertical ?? "other"];
  return {
    path: profile.path === "quick" ? "Quick lead" : "Consultative",
    business: profile.businessText.trim() || vertical.label,
    problem: profile.problemText.trim() || "-",
    frequency: profile.frequency ? frequencyLabel[profile.frequency] : "-",
    goal: profile.goal ? goalLabel[profile.goal] : "-",
    obstacle: profile.obstacle ? obstacleLabel[profile.obstacle] : "-",
    website: profile.website ? websiteLabel[profile.website] : "-",
    fit: profile.fit ?? "-",
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
  ];
  if (summary.problem !== "-")
    lines.push(`Where I'm losing customers: ${summary.problem}`);
  if (summary.frequency !== "-") lines.push(`How often: ${summary.frequency}`);
  if (summary.goal !== "-") lines.push(`What I want: ${summary.goal}`);
  if (summary.obstacle !== "-")
    lines.push(`What's stopped me: ${summary.obstacle}`);
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
  if (QUESTION_STARTERS.test(value) && value.split(/\s+/).length > 2)
    return true;

  const words = value.split(/\s+/).filter(Boolean);
  return words.length <= HINT_WORD_LIMIT && QUESTION_HINTS.test(value);
}

/** Context handed to the model so its answer lands inside the conversation. */
export function stageNote(step: Step, profile: Profile): string {
  const vertical = profile.vertical ? verticals[profile.vertical] : null;
  const known = [
    profile.path
      ? `Path: ${profile.path === "quick" ? "quick lead, low friction" : "consultative"}.`
      : null,
    vertical ? `They run ${vertical.trade}.` : null,
    profile.problemText
      ? `They described their problem as: "${profile.problemText}".`
      : null,
    profile.frequency
      ? `It happens: ${frequencyLabel[profile.frequency]}.`
      : null,
    profile.goal ? `What they want: ${goalLabel[profile.goal]}.` : null,
    profile.obstacle
      ? `What's stopped them: ${obstacleLabel[profile.obstacle]}.`
      : null,
    profile.website ? `Website today: ${websiteLabel[profile.website]}.` : null,
    profile.name
      ? `Their name is ${profile.name.trim().split(/\s+/)[0]}.`
      : null,
  ]
    .filter(Boolean)
    .join(" ");

  const waiting = pendingQuestion(step, profile);
  const atFit = step === "fit";

  return [
    known || "You know nothing about them yet.",
    atFit
      ? `They are mid-way through deciding whether to go ahead - do not quote a price or push. Answer their question, then hand back to: "${fitQuestion}"`
      : waiting
        ? `The conversation is waiting on this question: "${waiting}". Answer what they asked, then hand back to it in one short line.`
        : "They have already been through the questions - answer briefly and point them to WhatsApp.",
  ].join(" ");
}

/** Shown once the per-session model budget is spent. */
export const budgetSpent = `That's about as far as I can take it here. Send Shailesh a WhatsApp message and he'll answer properly - he replies himself. Builds start at ${offer.priceFrom}, take ${offer.deliveryShort}, and you pay half only once it's live.`;

/** After a handoff, if they keep talking - do not replay the ending. */
export const reopenAsk = "Sure - what kind of business are you in?";

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
  "How does payment work?": `Half to start, half only when the site is live. Builds start at ${offer.priceFrom} and usually take ${offer.deliveryShort}.`,
};
