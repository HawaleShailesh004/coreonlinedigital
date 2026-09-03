import Link from "next/link";
import { LiveClock, NightShift, TimeHeadline } from "./interactive";

const WHATSAPP =
  "https://wa.me/919082308732?text=" +
  encodeURIComponent("Hi Shailesh - I was on the After Hours concept.");

/**
 * What runs without you, and what needs you in the room. The status column is
 * the information — it is the reason the list is a ledger and not a card grid.
 */
const LEDGER: { name: string; note: string; on: boolean }[] = [
  {
    name: "The website",
    note: "Fast on a phone, says what you do and what it costs, one clear way to reach you.",
    on: true,
  },
  {
    name: "The assistant",
    note: "Answers timings, price and location the moment someone asks. There's one on this page.",
    on: true,
  },
  {
    name: "WhatsApp capture",
    note: "Name, number and what they want, landing on the number you already check.",
    on: true,
  },
  {
    name: "Bookings",
    note: "They pick the slot. It arrives with the details already filled in.",
    on: true,
  },
  {
    name: "Google and local search",
    note: "Listing claimed and connected, so the search at 4am has something to find.",
    on: true,
  },
  {
    name: "Follow-up",
    note: "The enquiry that went cold three weeks ago gets a message without you remembering.",
    on: true,
  },
  {
    name: "Brand and identity",
    note: "Logo, colours, the way it all sounds. Built once, at the start.",
    on: false,
  },
  {
    name: "Apps and internal tools",
    note: "A CRM, a dashboard, something only your business needs. Scoped before we start.",
    on: false,
  },
];

const SAMPLES = [
  { name: "Forge Strength Co.", kind: "Gym", note: "Live assistant. Ask it the fee.", href: "/samples/gym" },
  { name: "Meridian Family Clinic", kind: "Clinic", note: "Book a dummy appointment.", href: "/samples/clinic" },
  { name: "Vasant & Sons", kind: "Jeweller", note: "A catalogue with no prices, on purpose.", href: "/samples/jeweller" },
  { name: "Summit Prep", kind: "Coaching", note: "Fees and results, published.", href: "/samples/coaching" },
  { name: "Keystone Properties", kind: "Real estate", note: "Budget asked before the site visit.", href: "/samples/realty" },
  { name: "Trader storefront", kind: "Retail", note: "Working cart and checkout.", href: "/samples/trader" },
];

export default function AfterHoursPage() {
  return (
    <>
      <header className="ah-shell ah-bar">
        <Link href="/v2" className="ah-wordmark">
          coreline<span>.</span>
        </Link>
        <LiveClock />
        <a href={WHATSAPP} className="ah-btn-ghost" target="_blank" rel="noreferrer">
          Talk on WhatsApp
        </a>
      </header>

      <main>
        <section className="ah-hero">
          <div className="ah-sky" aria-hidden="true" />
          <div className="ah-shell" style={{ position: "relative" }}>
            <TimeHeadline />

            <p className="ah-rise ah-lede" style={{ "--d": "360ms" } as React.CSSProperties}>
              I&apos;m Shailesh. I build the website, the assistant and the automations that
              keep working through the hours you can&apos;t — for businesses in Thane, Mumbai,
              and anywhere else that runs on WhatsApp. One person. Fixed price, fixed date.
            </p>

            <div
              className="ah-rise ah-cta-row"
              style={{ "--d": "480ms" } as React.CSSProperties}
            >
              <a href={WHATSAPP} className="ah-btn" target="_blank" rel="noreferrer">
                Talk on WhatsApp
              </a>
              <a href="#night-shift" className="ah-btn-ghost">
                See what 4am costs you
              </a>
            </div>
          </div>
        </section>

        <section className="ah-section" id="night-shift">
          <div className="ah-shell">
            <h2 className="ah-h2">One day, hour by hour, in a business like yours.</h2>
            <p className="ah-sub">
              Move through the day, hour by hour. Every one of these is a real moment a
              customer decides something about you — usually while you&apos;re busy, closed, or
              asleep.
            </p>
            <NightShift />
          </div>
        </section>

        <section className="ah-section">
          <div className="ah-shell">
            <h2 className="ah-h2">What keeps running when you stop.</h2>
            <p className="ah-sub">
              The top six work whether or not you&apos;re awake. The bottom two need you in the
              room, and I&apos;d rather say which is which than let it sound like magic.
            </p>

            <div className="ah-ledger">
              {LEDGER.map((row) => (
                <div className="ah-row" key={row.name}>
                  <span className="ah-row-name">{row.name}</span>
                  <span className="ah-row-note">{row.note}</span>
                  <span className="ah-state" data-on={row.on}>
                    <i aria-hidden="true" />
                    {row.on ? "runs without you" : "built with you"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ah-section">
          <div className="ah-shell">
            <h2 className="ah-h2">Ten sites you can open right now.</h2>
            <p className="ah-sub">
              None of these are client sites — I&apos;d rather tell you than let you find out.
              They&apos;re complete working builds, one per kind of business, so you can use the
              thing before you spend anything.
            </p>

            <div className="ah-samples">
              {SAMPLES.map((s) => (
                <Link className="ah-sample" href={s.href} key={s.href}>
                  <b>{s.name}</b>
                  <span>{s.kind}</span>
                  <span>{s.note}</span>
                  <em>Open it</em>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="ah-section">
          <div className="ah-shell">
            <h2 className="ah-h2">The terms, before you ask for them.</h2>

            <dl className="ah-terms">
              <div className="ah-term">
                <dt>Price</dt>
                <dd>From ₹15,000</dd>
                <p>One fixed number before I start. It doesn&apos;t move later.</p>
              </div>
              <div className="ah-term">
                <dt>Time</dt>
                <dd>10 working days</dd>
                <p>From the day I have your content and photos, not the day you pay.</p>
              </div>
              <div className="ah-term">
                <dt>Payment</dt>
                <dd>Half on delivery</dd>
                <p>Half to begin. The rest only once it&apos;s live and you&apos;ve seen it.</p>
              </div>
              <div className="ah-term">
                <dt>Who</dt>
                <dd>One person</dd>
                <p>The person you message is the person who builds it and answers afterwards.</p>
              </div>
            </dl>
          </div>
        </section>

        <section className="ah-close">
          <div className="ah-shell ah-close-inner">
            <h2 className="ah-h2" style={{ maxWidth: "16ch" }}>
              Tell me what your business does. I&apos;ll tell you what you&apos;re missing.
            </h2>
            <p className="ah-sub">
              Send it on WhatsApp. I&apos;ll look at how you show up on Google right now and give
              you an honest read on whether a website will help — free, and I&apos;ll say so if it
              won&apos;t.
            </p>
            <div className="ah-cta-row">
              <a href={WHATSAPP} className="ah-btn" target="_blank" rel="noreferrer">
                Talk on WhatsApp
              </a>
              <a href="tel:+919082308732" className="ah-btn-ghost">
                +91 90823 08732
              </a>
            </div>
          </div>
        </section>

        <div className="ah-shell">
          <div className="ah-foot">
            <span>Coreline Digital — Wagle Estate, Thane</span>
            <Link href="/v2">All three concepts</Link>
          </div>
        </div>
      </main>
    </>
  );
}
