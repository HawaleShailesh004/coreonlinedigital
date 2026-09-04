import Link from "next/link";
import { Schematic } from "./Schematic";

const WHATSAPP =
  "https://wa.me/919082308732?text=" +
  encodeURIComponent("Hi Shailesh - I was on the Switchboard concept.");

/** The `part` column maps each thing you can buy back onto the board above. */
const BUILD = [
  {
    part: "hub",
    name: "Business website",
    note: "Custom design, fast on a phone, every page pushing toward one action.",
    price: "from ₹15,000",
  },
  {
    part: "hub",
    name: "Landing page",
    note: "One page, one job — an ad, a launch, or a single service.",
    price: "from ₹15,000",
  },
  {
    part: "hub",
    name: "Online store",
    note: "Products, cart, checkout. There's a working one in the samples.",
    price: "quoted",
  },
  {
    part: "answers",
    name: "AI assistant / chatbot",
    note: "Trained on your business. Answers at 2am, escalates the ones worth your time.",
    price: "quoted",
  },
  {
    part: "captures",
    name: "WhatsApp enquiry capture",
    note: "Name, number and what they want, landing where you already reply.",
    price: "quoted",
  },
  {
    part: "captures",
    name: "Booking system",
    note: "They pick the slot; it arrives with the details already filled in.",
    price: "quoted",
  },
  {
    part: "keeps going",
    name: "Follow-up automation",
    note: "Reminders before, review requests after, a nudge to the lead that went cold.",
    price: "quoted",
  },
  {
    part: "source",
    name: "SEO and Google Business Profile",
    note: "Getting found for your trade in your area, then staying found.",
    price: "quoted",
  },
  {
    part: "off-board",
    name: "Mobile apps and internal tools",
    note: "A CRM, a dashboard, an app — when the job genuinely needs one.",
    price: "quoted",
  },
  {
    part: "off-board",
    name: "Brand, logo and identity",
    note: "Logo, colours, and the way the whole thing sounds to a stranger.",
    price: "quoted",
  },
];

const PROOF = [
  { name: "Forge Strength Co.", note: "Gym — live assistant, working trial booking.", href: "/samples/gym" },
  { name: "Meridian Family Clinic", note: "Clinic — appointment flow you can run.", href: "/samples/clinic" },
  { name: "Trader storefront", note: "Retail — cart and checkout that work.", href: "/samples/trader" },
  { name: "Keystone Properties", note: "Real estate — budget captured before the visit.", href: "/samples/realty" },
];

export default function SwitchboardPage() {
  return (
    <>
      <header className="sw-shell sw-bar">
        <Link href="/v2" className="sw-wordmark">
          coreline<i>.</i>
        </Link>
        <span className="sw-bar-meta">Thane · Mumbai · one operator</span>
        <a href={WHATSAPP} className="sw-btn" target="_blank" rel="noreferrer">
          Talk on WhatsApp
        </a>
      </header>

      <main>
        <section className="sw-shell sw-hero">
          <h1>
            Your business already has a system.{" "}
            <span>Nothing in it is connected.</span>
          </h1>
          <p className="sw-lede">
            Customers arrive from search, from Instagram, from someone who vouched for you —
            and every one of them lands in the same inbox, unsorted, usually while you&apos;re
            busy. I&apos;m Shailesh. I build the part in the middle: the website, the assistant,
            the bookings and the follow-up that turn three raw sources into enquiries you can
            actually work.
          </p>

          <Schematic />
        </section>

        <section className="sw-shell sw-section">
          <h2 className="sw-h2">Everything on the board, and what it costs.</h2>
          <p className="sw-sub">
            Start with the hub. The rest is worth adding once it&apos;s earning — and I&apos;ll tell
            you when you don&apos;t need something yet, which is more often than you&apos;d expect
            from someone selling it.
          </p>

          <div className="sw-list">
            {BUILD.map((item) => (
              <div className="sw-item" key={item.name}>
                <span className="sw-item-no">{item.part}</span>
                <span className="sw-item-name">{item.name}</span>
                <span className="sw-item-note">{item.note}</span>
                <span className="sw-item-price">{item.price}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="sw-shell sw-section">
          <h2 className="sw-h2">Ten working builds. None of them clients.</h2>
          <p className="sw-sub">
            I&apos;d rather say that plainly than let you find out. They&apos;re complete sites, one
            per kind of business, so you can use the thing before you spend anything. Real
            client work replaces them as it ships.
          </p>

          <div className="sw-proof">
            {PROOF.map((p) => (
              <Link href={p.href} key={p.href}>
                <b>{p.name}</b>
                <span>{p.note}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="sw-shell sw-section">
          <h2 className="sw-h2">Terms, published.</h2>

          <dl className="sw-terms">
            <div>
              <dt>Price</dt>
              <dd>From ₹15,000</dd>
              <p>One fixed number before I start. It does not move afterwards.</p>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>10 days</dd>
              <p>Working days, from when I have your content and photos.</p>
            </div>
            <div>
              <dt>Payment</dt>
              <dd>50 / 50</dd>
              <p>Half to begin, half only once it&apos;s live and you&apos;ve seen it.</p>
            </div>
            <div>
              <dt>People</dt>
              <dd>One</dd>
              <p>The person you message designs it, builds it and answers afterwards.</p>
            </div>
          </dl>
        </section>

        <section className="sw-shell sw-close">
          <h2 className="sw-h2">Send me what your business does.</h2>
          <p className="sw-sub">
            I&apos;ll look at how you show up on Google right now and tell you which parts of
            this board you actually need — free, and including the parts you don&apos;t.
          </p>
          <div className="sw-cta-row">
            <a href={WHATSAPP} className="sw-btn" target="_blank" rel="noreferrer">
              Talk on WhatsApp
            </a>
            <a href="tel:+919082308732" className="sw-btn-ghost">
              +91 90823 08732
            </a>
          </div>
        </section>

        <div className="sw-shell">
          <div className="sw-foot">
            <span>Coreline Digital — Wagle Estate, Thane 400604</span>
            <Link href="/v2">All three concepts</Link>
          </div>
        </div>
      </main>
    </>
  );
}
