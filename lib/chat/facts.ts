/**
 * Every fact the site assistant is allowed to state.
 *
 * Single source of truth on purpose: the bot quotes a price and a delivery
 * window to a stranger, so those numbers must come from the same place the
 * page does. If a number lives in two files it will eventually disagree with
 * itself, and the one place you cannot afford that is a sales conversation.
 *
 * Structured exports feed the scripted flow (lib/chat/flow.ts). The string at
 * the bottom is what the model sees. Both are built from the same constants.
 */

import { site } from "@/lib/content";

export const offer = {
  priceFrom: site.priceFrom,
  priceRange: `${site.priceFrom} and ${site.priceCeiling}`,
  deliveryShort: site.deliveryShort,
  paymentShort: site.paymentShort,
  // Long forms differ only in voice: the site is Shailesh writing as "I", the
  // assistant talks about him in the third person. The numbers are the same
  // ones, imported, so they cannot drift apart.
  delivery: "10 working days from the day Shailesh has your content and photos",
  payment: "Half to start, half only once your site is live and you've seen it",
} as const;

/** The three-fact card the bot shows before it ever asks for a number. */
export const trustFacts = [
  { label: "Price", value: `From ${offer.priceFrom}`, note: "Fixed before any work starts" },
  { label: "Time", value: offer.deliveryShort, note: "From when he has your content" },
  { label: "Payment", value: "Half on delivery", note: "You pay the rest once it's live" },
] as const;

export const freeAudit =
  "Shailesh looks at how your business shows up on Google right now and sends you a short honest opinion on WhatsApp. Free, no obligation.";

export const contact = {
  whatsapp: site.whatsapp,
  phone: site.phone,
  email: site.email,
  area: `${site.location}, ${site.region}`,
} as const;

/**
 * What the model is allowed to know. Written as flat statements rather than
 * marketing copy - the model paraphrases, and paraphrased marketing copy is
 * how bots start inventing.
 */
export const corelineChatFacts = `
WHO
- Coreline Digital is one person: Shailesh. He designs and builds every site himself. No team, no account manager, no work passed on.
- Based in ${contact.area}. Works with businesses in Thane and Mumbai, and remotely elsewhere in India.
- Contact: WhatsApp ${contact.phone}, email ${contact.email}.

WHAT HE BUILDS
1. A website that brings you customers - custom designed, not a template. Fast on a phone. Services, photos, prices and location set up properly. One clear action on every page: call, WhatsApp, book or order. Set up on Google so people searching your trade can find you.
2. Something that answers when you can't - an assistant on your website that answers common questions instantly, enquiries sent straight to WhatsApp, booking requests with details already collected, reminders, and follow-ups.
3. Keeping it working, every month - optional. Google Business Profile kept updated, automatic review requests, new photos and offers, monitoring. Only starts after the site is live. He will say honestly if a business does not need it.

PRICE AND TERMS - never state anything other than these
- Starts at ${offer.priceFrom}. Most business websites land between ${offer.priceRange}, depending on pages and whether the assistant and booking are included.
- One fixed number is given before any work starts, and it does not change later. No hourly billing.
- ${offer.payment}.
- Delivery: ${offer.delivery}.

PROOF
- Shailesh is building his first client projects now. There are no past clients, no testimonials and no client names to give.
- Instead there are ten sample sites on the Work page of this website - real working builds, not screenshots. Two are worth clicking: a gym site with trial booking and a live assistant, and a D2C shop with a working cart. Do not paste a URL; the chat shows a button.
- Sample businesses are fictional; the builds are real.

FREE FIRST STEP
- ${freeAudit}
- He will tell someone honestly if a website will not help them.
`.trim();
