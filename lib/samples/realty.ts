/**
 * Copy for Sample 4 - Real Estate Agent / Broker. Brief: samples/sample-4-real-estate.md
 *
 * Positioning: aspirational and credible at the same time. A buyer is imagining
 * a life in the space, but is also scanning for the tell that this agent is
 * wasting their Sunday. So the photography sells and the numbers reassure -
 * prices are stated outright, unlike the jeweller sample, because hiding them
 * here reads as evasive rather than premium.
 *
 * `listings[].image` indexes realtyMedia.listings, and each entry is written to
 * match what is genuinely in that photograph.
 */

export const realty = {
  business: "Keystone",
  brandNote: "Properties · Thane",

  nav: {
    links: [
      { label: "Listings", href: "#listings" },
      { label: "Areas We Serve", href: "#areas" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Enquire About a Property", href: "#enquire" },
  },

  hero: {
    eyebrow: "Thane Real Estate",
    headline: "Find the property that actually fits how you live.",
    sub: "Keystone Properties helps you buy, sell or rent across Thane West - with verified listings, honest pricing, and someone who actually answers the phone.",
    primaryCta: "Browse Listings",
    secondaryCta: "Talk to an Agent",
    stats: [
      { value: "11 yrs", label: "In the Thane market" },
      { value: "60+", label: "Live verified listings" },
      { value: "A519", label: "MahaRERA registered" },
    ],
  },

  listings: {
    eyebrow: "Featured listings",
    heading: "Six places worth a Sunday.",
    sub: "Every listing below is one we have walked through ourselves. The price on the card is the price the owner is actually asking.",
    specNote:
      "Carpet area as declared by the owner. Registration and stamp duty extra.",
    enquire: "Enquire",
    items: [
      {
        image: 0,
        name: "Row villa on the Estate",
        area: "Hiranandani Estate, Ghodbunder Road",
        price: "₹3.85 Cr",
        priceNote: "Negotiable",
        specs: ["4 BHK", "2,640 sq ft", "Row Villa"],
        note: "End unit with a private deck, two covered parks and a clubhouse two minutes on foot.",
        badge: "Ready to move",
      },
      {
        image: 1,
        name: "Poolside villa, gated lane",
        area: "Kolshet Road",
        price: "₹6.20 Cr",
        priceNote: "Owner listed",
        specs: ["5 BHK", "4,100 sq ft", "Villa"],
        note: "Six-villa gated lane with its own pool. Sold with the landscaping and the outdoor lighting in place.",
        badge: "Exclusive",
      },
      {
        image: 2,
        name: "Weekend villa with pool",
        area: "Off Ghodbunder Road, Yeoor side",
        price: "₹4.65 Cr",
        priceNote: "Negotiable",
        specs: ["4 BHK", "3,200 sq ft", "Villa"],
        note: "Terracotta-toned build set back from the road, with a plunge pool and a mature garden.",
        badge: "Verified",
      },
      {
        image: 3,
        name: "Corner flat, timber interiors",
        area: "Pokhran Road 2",
        price: "₹1.95 Cr",
        priceNote: "All-inclusive",
        specs: ["3 BHK", "1,180 sq ft", "Apartment"],
        note: "Fully done up - timber feature wall, modular kitchen, and a balcony that faces the internal garden.",
        badge: "New this week",
      },
      {
        image: 4,
        name: "Bay-window two-bed",
        area: "Vartak Nagar",
        price: "₹1.35 Cr",
        priceNote: "Negotiable",
        specs: ["2 BHK", "860 sq ft", "Apartment"],
        note: "Bright through the day thanks to the bay windows. Eight-year-old building, lift and backup power.",
        badge: "Verified",
      },
      {
        image: 5,
        name: "Open-plan three-bed",
        area: "Majiwada",
        price: "₹78,000",
        priceNote: "Per month",
        specs: ["3 BHK", "1,340 sq ft", "Rental"],
        note: "Semi-furnished, open-plan dining and living. Two months deposit, available from the first.",
        badge: "For rent",
      },
    ],
  },

  areas: {
    eyebrow: "Areas we serve",
    heading: "We work six micro-markets, properly.",
    sub: "Not the whole of MMR. These are the pockets we have sold in this year, so the price bands below are what deals are actually closing at - not what portals are quoting.",
    footnote: "Rates are indicative for resale stock, as of this quarter.",
    items: [
      {
        name: "Hiranandani Estate",
        rate: "₹19,500 – 24,000 / sq ft",
        note: "Township living, 2–4 BHK, strongest resale demand in Thane.",
      },
      {
        name: "Ghodbunder Road",
        rate: "₹13,000 – 17,500 / sq ft",
        note: "New launches and villas. Best value per square foot right now.",
      },
      {
        name: "Kolshet Road",
        rate: "₹16,000 – 21,000 / sq ft",
        note: "Large-format flats and gated villa lanes near the creek.",
      },
      {
        name: "Pokhran Road 2",
        rate: "₹17,000 – 22,000 / sq ft",
        note: "Schools within walking distance. Families rarely leave.",
      },
      {
        name: "Vartak Nagar",
        rate: "₹14,000 – 18,000 / sq ft",
        note: "Older stock, honest prices, ten minutes to the station.",
      },
      {
        name: "Majiwada",
        rate: "₹15,000 – 19,500 / sq ft",
        note: "Highway and metro access. Where most of our rentals sit.",
      },
    ],
  },

  why: {
    eyebrow: "Why work with us",
    heading: "Three things we do differently.",
    points: [
      {
        title: "Verified listings only",
        body: "Every property on this page has been visited, measured and price-checked against the last three closings in that building. No bait-and-switch pricing to get you in the car.",
      },
      {
        title: "Site visits within 24 hours",
        body: "Tell us what you are looking for today and you are standing in it tomorrow. We shortlist first, so a Sunday gets you four relevant properties, not eleven random ones.",
      },
      {
        title: "Paperwork and negotiation included",
        body: "Agreement drafting, society NOC, registration appointment and the negotiation itself are part of the brokerage. Not billed separately at the end.",
      },
    ],
  },

  about: {
    eyebrow: "About the agent",
    heading: "About Rohan Deshpande",
    role: "Founder, Keystone Properties · MahaRERA A51700012345",
    paragraphs: [
      "Rohan has sold in Thane West for eleven years, the last six of them running Keystone. He works six micro-markets and refuses to quote on a seventh, which is the only reason he can tell you what a specific floor in a specific tower is genuinely worth.",
      "He handles every enquiry himself up to the site visit. If you call on a Sunday afternoon, he is the one who picks up - usually from somebody's living room.",
    ],
    quote:
      "A buyer walking away is fine. A buyer finding out something after the token is not.",
  },

  contact: {
    eyebrow: "Contact",
    heading: "Tell us what you're looking for.",
    sub: "Budget, area, and how soon you need to move. We come back with a shortlist, not a brochure.",
    address: [
      "Unit 4, Ashoka Business Centre",
      "Pokhran Road 2, Thane West",
      "Maharashtra 400610",
    ],
    phoneLabel: "+91 22 4118 6620",
    phoneHref: "tel:+912241186620",
    whatsappLabel: "Message on WhatsApp",
    whatsappHref: "https://wa.me/919867186620",
    coords: { lat: 19.2183, lon: 72.9781 },
    mapLabel: "Keystone Properties, Pokhran Road 2, Thane West",
    hours: [
      { day: "Monday – Saturday", time: "10:00 AM – 7:30 PM" },
      { day: "Sunday", time: "Site visits only, by appointment" },
    ],
    form: {
      submit: "Send my requirement",
      successTitle: "Requirement received.",
      successBody:
        "Rohan will call you back within the working day with a shortlist. If you would rather send photos or a floor plan, WhatsApp works too.",
      note: "Rohan will call you back within the working day with a shortlist.",
    },
  },

  bottomCta: {
    heading: "Tell us what you're looking for - we'll shortlist it for you.",
    body: "One call, four properties worth seeing, and a Sunday you get back.",
    cta: "Enquire About a Property",
  },

  footer: {
    blurb:
      "A Thane West brokerage covering six micro-markets - resale, new launches and rentals, with the paperwork handled end to end.",
    legal: "",
  },
};
