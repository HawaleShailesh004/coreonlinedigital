/**
 * Copy for Sample 2 - Jeweller. Brief: samples/sample-2-jeweller.md
 *
 * Positioning: sells desire and craftsmanship, never price. The buyer browses
 * here and closes in the showroom, so every path ends in a visit or a message.
 * There is no price anywhere on this page and that is deliberate.
 *
 * Collection photography is paired here rather than in the page so a real
 * engagement can swap the client's own catalogue in one file.
 */

import { jewellerMedia } from "@/lib/samples/media";

export const jeweller = {
  business: "Vasant & Sons",
  brandNote: "Fine Jewellers · Thane",

  nav: {
    links: [
      { label: "Collections", href: "#collections" },
      { label: "Craftsmanship", href: "#craftsmanship" },
      { label: "Visit Us", href: "#visit" },
    ],
    cta: { label: "Enquire on WhatsApp", href: "#custom" },
  },

  hero: {
    eyebrow: "Est. 1968 · Thane",
    /** Split so the shimmer lands on one word only - once, on load. */
    headlineBefore: "Jewellery made to be worn for ",
    headlineAccent: "a lifetime",
    headlineAfter: ", not a season.",
    sub: "Every piece at Vasant & Sons is handcrafted in our own workshop above the showroom - from a single gemstone to a finished heirloom. Visit us on Ram Maruti Road, or browse the collections here first.",
    primaryCta: "View Collections",
    secondaryCta: "Book a Visit",
  },

  collections: {
    eyebrow: "The collections",
    heading: "Four ways in.",
    sub: "Nothing here is priced online. Every piece is weighed, quoted and made to your measurement in the showroom.",
    items: [
      {
        name: "Bridal",
        line: "Complete sets built around one bride, one date and one measurement.",
        image: jewellerMedia.bridal,
      },
      {
        name: "Gold Traditional",
        line: "22kt in the older Maharashtrian forms - thushi, saj, vajratik.",
        image: jewellerMedia.gold,
      },
      {
        name: "Diamond",
        line: "Certified stones, set for daily wear as often as for occasions.",
        image: jewellerMedia.diamond,
      },
      {
        name: "Custom Design",
        line: "Your sketch, your mother's piece, or a photograph on your phone.",
        image: jewellerMedia.custom,
      },
    ],
    note: "Enquire about any collection on WhatsApp and we will send weights, options and availability the same day.",
  },

  craft: {
    eyebrow: "Craftsmanship",
    heading: "Every piece has a story before it has an owner.",
    paragraphs: [
      "Vasantrao Joshi opened a single counter on Ram Maruti Road in 1968 with two karigars and a set of hand tools. Three generations later the workshop is still one floor above the showroom, and the family still signs off on every piece before it goes into the case.",
      "Gold is BIS hallmarked, diamonds arrive with IGI or GIA certification, and setting, polishing and finishing all happen here rather than at a wholesaler. It means a longer wait on a bridal order - and a piece that can be repaired, resized or remade by the same hands in twenty years.",
    ],
    marks: [
      { label: "BIS hallmarked", note: "22kt and 18kt, marked on every piece" },
      {
        label: "IGI / GIA certified",
        note: "Certificate handed over with the stone",
      },
      {
        label: "Made in-house",
        note: "Nine karigars, one floor above the shop",
      },
      {
        label: "Lifetime service",
        note: "Free cleaning, resizing and re-polish",
      },
    ],
    detailCaption: "In the workshop, above the showroom.",
  },

  custom: {
    eyebrow: "Custom design",
    heading: "Have something in mind?",
    body: "Bring a photo, a sketch, or just an idea. We will draw it, quote the weight, and show you a wax model before a single gram is cast - nothing is committed until you have seen it.",
    steps: [
      "Send us a photo or sketch on WhatsApp",
      "We draw the design and quote the weight",
      "You approve a wax model in the showroom",
      "Cast, set and hand-finished in four to six weeks",
    ],
    cta: "Start a Custom Order",
    ctaNote: "Speaks to the workshop directly, not a call centre.",
  },

  visit: {
    eyebrow: "Visit us",
    heading: "Come and see it in daylight.",
    sub: "Photographs flatten gold. Ten minutes at the counter tells you more than an afternoon of scrolling.",
    address: [
      "Vasant Bhavan, Ground Floor",
      "Ram Maruti Road, Naupada",
      "Thane West 400602",
    ],
    phoneLabel: "+91 22 2540 1968",
    phoneHref: "tel:+912225401968",
    whatsappLabel: "Message on WhatsApp",
    whatsappHref: "https://wa.me/919820151968",
    coords: { lat: 19.1932, lon: 72.9698 },
    hours: [
      { day: "Monday – Wednesday", time: "11:00 AM – 8:30 PM" },
      { day: "Thursday", time: "Closed" },
      { day: "Friday – Saturday", time: "11:00 AM – 9:00 PM" },
      { day: "Sunday", time: "11:00 AM – 6:00 PM" },
    ],
    appointmentNote:
      "Bridal appointments are held in the first-floor room, away from the counter. Message us a day ahead and we will keep the pieces ready.",
  },

  bottomCta: {
    heading: "The best way to see it is in person.",
    body: "Book a visit or message us your questions - someone from the family is on the floor every day we are open.",
    primaryCta: "Book a Visit",
    secondaryCta: "Ask on WhatsApp",
  },

  footer: {
    blurb:
      "Goldsmiths on Ram Maruti Road, Naupada, since 1968. Bridal, traditional gold, certified diamond and custom work, made in our own workshop.",
    legal: "This is a concept build, not a real showroom.",
  },
};
