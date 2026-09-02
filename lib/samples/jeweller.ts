/**
 * Copy for Sample 2 - Jeweller. Brief: samples/sample-2-jeweller.md
 * Multi-page build: samples/jeweller-site-full-build-doc.md
 *
 * Positioning: sells desire and craftsmanship, never price. The buyer browses
 * here and closes in the showroom, so every path ends in a visit or a message.
 * There is no price anywhere on this site and that is deliberate.
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
      { label: "Collections", href: "/samples/jeweller/collections" },
      { label: "Craftsmanship", href: "/samples/jeweller/craftsmanship" },
      { label: "Custom", href: "/samples/jeweller/custom" },
      { label: "Visit", href: "/samples/jeweller/contact" },
    ],
    cta: {
      label: "Enquire on WhatsApp",
      href: "https://wa.me/919820151968",
    },
  },

  hero: {
    eyebrow: "Est. 1968 · Thane",
    /** Split so the shimmer lands on one word only - once, on load. */
    headlineBefore: "Jewellery made to be worn for ",
    headlineAccent: "a lifetime",
    headlineAfter: ", not a season.",
    sub: "Every piece at Vasant & Sons is handcrafted in our own workshop above the showroom - from a single gemstone to a finished heirloom. Visit us on Ram Maruti Road, or browse the collections here first.",
    primaryCta: "View Collections",
    primaryHref: "/samples/jeweller/collections",
    secondaryCta: "Book a Visit",
    secondaryHref: "/samples/jeweller/contact",
  },

  collections: {
    eyebrow: "The collections",
    heading: "Four ways in.",
    sub: "Nothing here is priced online. Every piece is weighed, quoted and made to your measurement in the showroom.",
    pageHeading: "Every collection, one story.",
    pageSub:
      "Browse by occasion and metal. Each category is a starting point for a conversation at the counter - not a catalogue to order from.",
    items: [
      {
        name: "Bridal",
        slug: "bridal",
        line: "Complete sets built around one bride, one date and one measurement.",
        body: "A bridal order at Vasant & Sons begins with the date, the blouse measurement and the family pieces already spoken for. We build the set around those constraints - necklace weight, earring drop, bangle size - so nothing fights the lehenga or the older jewellery being worn alongside it. Most bridal work is drawn, waxed and cast upstairs; you approve each stage before the next begins.",
        image: jewellerMedia.bridal,
      },
      {
        name: "Gold Traditional",
        slug: "gold-traditional",
        line: "22kt in the older Maharashtrian forms - thushi, saj, vajratik.",
        body: "The traditional gold case still holds the forms Thane families ask for by name: thushi, saj, vajratik, kolhapuri saaj. We keep the proportions honest to the older pieces rather than thinning them for modern fashion, and every gram is BIS hallmarked before it leaves the counter. These are the pieces worn for decades and remade for daughters.",
        image: jewellerMedia.gold,
      },
      {
        name: "Diamond",
        slug: "diamond",
        line: "Certified stones, set for daily wear as often as for occasions.",
        body: "Diamonds arrive with IGI or GIA certification and leave with the same paperwork in your hand. Settings lean toward pieces that survive a working day - solitaires, studs, thin tennis lines - as often as towards evening wear. We will not sell an uncertified stone, and we will not rush a setting that needs another week of hand-finishing.",
        image: jewellerMedia.diamond,
      },
      {
        name: "Custom Design",
        slug: "custom",
        line: "Your sketch, your mother's piece, or a photograph on your phone.",
        body: "Custom work is its own path: an idea, a consultation, a wax model, then casting and fitting. Bring a photograph, a worn family piece, or nothing more than a sentence - the workshop will draw it before a single gram is committed.",
        image: jewellerMedia.custom,
        href: "/samples/jeweller/custom",
      },
    ],
    note: "Enquire about any collection on WhatsApp and we will send weights, options and availability the same day.",
    enquireCta: "Enquire on WhatsApp",
  },

  craft: {
    eyebrow: "Craftsmanship",
    heading: "Every piece has a story before it has an owner.",
    teaser:
      "Three generations on Ram Maruti Road. Nine karigars one floor above the shop. Gold hallmarked, stones certified, finishing done in-house - so a piece can be repaired by the same hands twenty years on.",
    teaserCta: "Read the full story",
    teaserHref: "/samples/jeweller/craftsmanship",
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
    stories: [
      {
        title: "A counter since 1968.",
        body: "Vasantrao Joshi opened with two karigars, a set of hand tools and a single glass case on Ram Maruti Road. The address has not changed. The family still lives above the shop on busy nights, and a Joshi still signs the book before a finished piece goes downstairs into the case.",
        image: jewellerMedia.heritage,
        caption: "Pieces presented the way they leave the workshop.",
      },
      {
        title: "Gold that can be trusted by weight.",
        body: "Every gram that leaves the showroom is BIS hallmarked - 22kt for traditional work, 18kt where the design asks for it. We buy from known dealers, melt and refine in batches we can trace, and refuse mixed scrap that cannot be accounted for. Authenticity is the objection online jewellery never settles; hallmarking is how we answer it in person.",
        image: jewellerMedia.gold,
        caption: "Traditional forms, weighed and marked.",
      },
      {
        title: "Stones with paperwork attached.",
        body: "Diamonds arrive with IGI or GIA certification and leave with that certificate in your hand - not filed in a drawer upstairs. We will walk the 4Cs at the counter without rushing, and we will not set an uncertified stone into a piece carrying our name.",
        image: jewellerMedia.diamond,
        caption: "Certified stones, set for years of wear.",
      },
      {
        title: "Nine karigars, one floor up.",
        body: "Setting, polishing and finishing happen above the showroom rather than at a wholesaler across the city. It means a bridal order waits a little longer - and that the same hands can resize, re-polish or remake the piece twenty years later. The workshop is not a showpiece; it is where the work actually happens.",
        image: jewellerMedia.craft,
        caption: "In the workshop, above the showroom.",
      },
      {
        title: "Finished by hand, checked by family.",
        body: "Before a piece goes into the case, it is checked for finish, clasp, stone security and weight against the quote. A family member still does that pass. Lifetime cleaning, resizing and re-polish stay with us - because a piece sold here is meant to be worn for a lifetime, not a season.",
        image: jewellerMedia.solitaire,
        caption: "The last look before it meets its owner.",
      },
    ],
  },

  custom: {
    eyebrow: "Custom design",
    heading: "Have something in mind?",
    pageHeading: "Bring an idea. Leave with a piece.",
    pageSub:
      "A photo, a sketch, or a sentence is enough to start. We draw it, quote the weight, show you a wax model, and only then cast - nothing is committed until you have seen it.",
    body: "Bring a photo, a sketch, or just an idea. We will draw it, quote the weight, and show you a wax model before a single gram is cast - nothing is committed until you have seen it.",
    steps: [
      {
        title: "Share Your Idea",
        note: "Day one",
        body: "Send a photo, a sketch, or describe what you want on WhatsApp or in the form below. A worn family piece or a screenshot is enough.",
      },
      {
        title: "Design Consultation",
        note: "Within a week",
        body: "We draw the design, quote the gold weight and stone options, and sit with you at the counter until the proportions feel right.",
      },
      {
        title: "Crafting",
        note: "Four to six weeks",
        body: "A wax model is approved in the showroom, then cast, set and hand-finished upstairs by the same karigars who do our bridal work.",
      },
      {
        title: "Reveal & Fitting",
        note: "Final visit",
        body: "You try it on under showroom light, we adjust the fit if needed, and the piece leaves with its hallmark and any stone certificates.",
      },
    ],
    /** Short labels kept for the home teaser list. */
    stepLabels: [
      "Share Your Idea",
      "Design Consultation",
      "Crafting",
      "Reveal & Fitting",
    ],
    cta: "Start a Custom Order",
    ctaHref: "/samples/jeweller/custom",
    ctaNote: "Speaks to the workshop directly, not a call centre.",
    form: {
      eyebrow: "Custom enquiry",
      heading: "Tell us what you have in mind.",
      sub: "Attach a photo or sketch if you have one - optional, and helpful. We reply on WhatsApp within a day.",
      submit: "Send custom enquiry",
      successTitle: "Enquiry received.",
      successBody:
        "Someone from the family will message you on WhatsApp with next steps.",
      note: "We'll reply on WhatsApp within a day.",
      fields: {
        name: { label: "Your name", placeholder: "Full name" },
        phone: { label: "Phone", placeholder: "10-digit mobile" },
        idea: {
          label: "Your idea",
          placeholder:
            "A solitaire like my mother's, but lighter… or paste a description here.",
        },
        attachment: {
          label: "Photo or sketch (optional)",
          hint: "JPG or PDF, under 5 MB.",
        },
      },
    },
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
    showroomImage: jewellerMedia.heritage,
    showroomCaption: "At the counter on Ram Maruti Road.",
  },

  contactPage: {
    eyebrow: "Visit",
    heading: "Book a private viewing.",
    sub: "Walk in during open hours, or book a quiet slot for bridal and custom work - away from the counter, with pieces ready.",
    formHeading: "Book a private viewing",
    formSub:
      "Prefer a quieter hour? Leave your name, phone and a preferred date. We confirm on WhatsApp.",
    submit: "Request a viewing",
    successTitle: "Viewing requested.",
    successBody:
      "We will confirm the slot on WhatsApp.",
    note: "We confirm on WhatsApp.",
    fields: {
      name: { label: "Your name", placeholder: "Full name" },
      phone: { label: "Phone", placeholder: "10-digit mobile" },
      date: { label: "Preferred date" },
    },
  },

  bottomCta: {
    heading: "The best way to see it is in person.",
    body: "Book a visit or message us your questions - someone from the family is on the floor every day we are open.",
    primaryCta: "Book a Visit",
    primaryHref: "/samples/jeweller/contact",
    secondaryCta: "Ask on WhatsApp",
  },

  footer: {
    blurb:
      "Goldsmiths on Ram Maruti Road, Naupada, since 1968. Bridal, traditional gold, certified diamond and custom work, made in our own workshop.",
    legal: "",
  },
};
