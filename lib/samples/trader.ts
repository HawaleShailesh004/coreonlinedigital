/**
 * Copy for Sample 9 - Trader / Small D2C Brand. Brief: samples/sample-9-trader-seller.md
 *
 * Positioning: sells convenience and confidence to buy online. Unlike the
 * jeweller (browse online, close in person), this one has to close the sale
 * on-site, so the cart and checkout have to feel real.
 *
 * `products` and `traderChatFacts` are shared with the AI assistant so it can
 * answer stock, shipping and returns questions without contradicting the store.
 */

export type Product = {
  id: string;
  name: string;
  price: number;
  /** Struck-through original, for genuinely reduced items only. */
  was?: number;
  category: "Tableware" | "Textiles" | "Decor" | "Bath & Body";
  blurb: string;
  /** Drives the stock answers the chat assistant gives. */
  stock: "in" | "low" | "out";
  variants?: string;
};

export const products: Product[] = [
  {
    id: "stoneware-cups",
    name: "Stoneware Cups, Set of 4",
    price: 1450,
    category: "Tableware",
    blurb: "Cork-based, hand-glazed, dishwasher safe.",
    stock: "in",
    variants: "Sand, Slate",
  },
  {
    id: "cushion-covers",
    name: "Cotton Cushion Covers, Pair",
    price: 990,
    was: 1290,
    category: "Textiles",
    blurb: "Handloom cotton in rust and stripe.",
    stock: "in",
    variants: "16in, 18in, 20in",
  },
  {
    id: "concrete-vases",
    name: "Concrete Vase Trio",
    price: 2150,
    category: "Decor",
    blurb: "Three heights, cast and sealed by hand.",
    stock: "low",
  },
  {
    id: "room-oil",
    name: "Amber Room Oil, 30ml",
    price: 720,
    category: "Bath & Body",
    blurb: "Vetiver, cedar and a little smoke.",
    stock: "in",
    variants: "Vetiver, Neroli",
  },
  {
    id: "steel-bottle",
    name: "Insulated Bottle, 750ml",
    price: 1290,
    category: "Tableware",
    blurb: "Holds temperature twelve hours. Matte finish.",
    stock: "in",
    variants: "Moss, Charcoal",
  },
  {
    id: "cotton-pillow",
    name: "Washed Cotton Pillow",
    price: 1650,
    category: "Textiles",
    blurb: "Softens with every wash, never thins.",
    stock: "in",
  },
  {
    id: "flatweave-rug",
    name: "Flatweave Rug, 4x6",
    price: 5900,
    was: 6900,
    category: "Textiles",
    blurb: "Handwoven in Panipat, gold border.",
    stock: "low",
  },
  {
    id: "wall-clock",
    name: "Brass Wall Clock",
    price: 2400,
    category: "Decor",
    blurb: "Silent sweep movement, solid brass ring.",
    stock: "out",
  },
];

export const shipping = {
  freeOver: 999,
  flatRate: 79,
  dispatch:
    "Orders placed before 2 PM dispatch the same day, otherwise the next working day.",
  delivery:
    "3–5 working days to metros, 5–8 days elsewhere in India. Every order is tracked.",
  returns:
    "7-day returns on anything unused with tags on. We arrange the pickup and refund to your original payment method within 5–7 working days.",
  returnsExceptions:
    "Bath & Body items can't be returned once opened, for hygiene reasons.",
  payments:
    "UPI, all major cards, netbanking, and cash on delivery up to ₹3,000.",
};

export const trader = {
  business: "NILAYA",
  brandNote: "Home Goods · Thane",

  nav: {
    links: [
      { label: "Shop", href: "#shop" },
      { label: "After You Order", href: "#flow" },
      { label: "About", href: "#about" },
      { label: "Help", href: "#help" },
    ],
    cta: { label: "Shop Now", href: "#shop" },
  },

  hero: {
    eyebrow: `Free shipping over ₹${shipping.freeOver} · Thane-based`,
    headline: "Straightforward shopping. No games, no fine print.",
    sub: "Nilaya Home sells tableware, textiles and small decor with clear pricing, fast dispatch, and a real person to talk to if something's wrong.",
    primaryCta: "Shop Collection",
    chatCta: "Chat for Help",
  },

  shop: {
    eyebrow: "Shop",
    heading: "Everything in stock, photographed as it ships.",
    categories: [
      "All",
      "Tableware",
      "Textiles",
      "Decor",
      "Bath & Body",
    ] as const,
    sorts: ["Newest", "Price: low to high", "Price: high to low"] as const,
  },

  why: {
    eyebrow: "Why buy from us",
    heading: "Three promises, kept.",
    points: [
      {
        title: "Real photos, real stock",
        body: "What you see is what ships. No renders, no borrowed catalogue images.",
      },
      {
        title: "Fast dispatch, tracked delivery",
        body: shipping.dispatch,
      },
      {
        title: "Easy returns, no hassle",
        body: "Seven days, pickup arranged by us, refunded to how you paid.",
      },
    ],
  },

  flow: {
    eyebrow: "What happens after you order",
    heading: "You'll hear from us four times. Then we leave you alone.",
    sub: "Every update lands on WhatsApp automatically - no chasing us for a tracking number.",
    steps: [
      {
        title: "Order placed",
        body: "You get an order number the moment payment clears.",
        timing: "Instant",
      },
      {
        title: "WhatsApp confirmation",
        body: "Itemised confirmation with your delivery address to check.",
        timing: "Within a minute",
      },
      {
        title: "Dispatch update",
        body: "Courier name and tracking link, sent the moment it leaves us.",
        timing: "Same or next day",
      },
      {
        title: "Delivery update",
        body: "A heads-up the morning it's out for delivery.",
        timing: "Day of delivery",
      },
      {
        title: "Review request",
        body: "One message, three days later. Ignore it and we won't ask twice.",
        timing: "+3 days",
      },
    ],
  },

  about: {
    eyebrow: "About",
    heading: "Started with six cups and a spare room.",
    paragraphs: [
      "Nilaya began in 2021 because we couldn't find plain, well-made tableware at a price that made sense - everything was either disposable or absurd.",
      "We work directly with four workshops: stoneware in Jaipur, handloom cotton in Erode, cast concrete here in Thane, and flatweave rugs in Panipat. No importers in between, which is the only reason the prices look like this.",
    ],
    stats: [
      { value: "2021", label: "Founded" },
      { value: "4", label: "Workshops" },
      { value: "11k+", label: "Orders shipped" },
    ],
  },

  help: {
    eyebrow: "Help",
    heading: "Questions before you order?",
    sub: "Message us on WhatsApp and a person replies, usually within the hour. Or ask the assistant in the corner - it knows our stock, shipping and returns.",
    whatsappLabel: "Message us on WhatsApp",
    whatsappHref: "https://wa.me/919820066140",
    phoneLabel: "+91 22 4066 1400",
    phoneHref: "tel:+912240661400",
    email: "hello@nilayahome.in",
    faqs: [
      {
        q: "How long does delivery take?",
        a: shipping.delivery,
      },
      {
        q: "What does shipping cost?",
        a: `Free over ₹${shipping.freeOver}. Below that it's a flat ₹${shipping.flatRate} anywhere in India.`,
      },
      {
        q: "Can I return something?",
        a: `${shipping.returns} ${shipping.returnsExceptions}`,
      },
      {
        q: "How can I pay?",
        a: shipping.payments,
      },
    ],
  },

  cart: {
    title: "Your cart",
    empty: "Nothing in here yet.",
    emptyHint: "Add something from the shop and it'll show up here.",
    checkout: "Checkout",
    subtotal: "Subtotal",
    shippingLabel: "Shipping",
    freeShipping: "Free",
    total: "Total",
    successTitle: "Order placed.",
    successBody:
      "Order NIL-48213 confirmed. Your WhatsApp confirmation is on its way, and you'll get a tracking link when it ships.",
    note: "Demo checkout - no payment is taken and no order is created.",
  },

  bottomCta: {
    heading: "Questions before you order? Message us - we reply fast.",
    body: "A real person, usually within the hour, 9 AM to 8 PM.",
    cta: "Message on WhatsApp",
  },

  footer: {
    blurb:
      "Plain, well-made home goods from four Indian workshops. Shipped from Thane, tracked to your door.",
    legal: "This is a concept build, not a real shop.",
  },
};

/** Factsheet handed to the AI assistant. Derived from the data above. */
export const traderChatFacts = [
  `Shop: Nilaya Home, a Thane-based online home goods brand (tableware, textiles, decor, bath & body).`,
  `Support: WhatsApp ${trader.help.whatsappHref}, phone ${trader.help.phoneLabel}, email ${trader.help.email}. A human replies within the hour, 9 AM to 8 PM.`,
  `Catalogue with prices and stock: ${products
    .map(
      (product) =>
        `${product.name} - Rs ${product.price}${
          product.was ? ` (was Rs ${product.was})` : ""
        }, ${product.category}, ${
          product.stock === "in"
            ? "in stock"
            : product.stock === "low"
              ? "low stock, only a few left"
              : "currently out of stock, restocking in about two weeks"
        }${product.variants ? `, options: ${product.variants}` : ""}`,
    )
    .join("; ")}.`,
  `Shipping: free over Rs ${shipping.freeOver}, otherwise a flat Rs ${shipping.flatRate} anywhere in India. ${shipping.dispatch} ${shipping.delivery}`,
  `Returns: ${shipping.returns} ${shipping.returnsExceptions}`,
  `Payments: ${shipping.payments}`,
  `Demo order for status lookups: order NIL-48213 shipped yesterday via Delhivery, tracking AWB 284471903, out for delivery tomorrow to Thane West. If asked about any other order number, say you can't find it and offer the WhatsApp handoff.`,
].join("\n");
