import Link from "next/link";

const WHATSAPP =
  "https://wa.me/919082308732?text=" +
  encodeURIComponent("Hi Shailesh - I was on the Thread concept.");

function Ticks() {
  return (
    <svg
      className="th-ticks"
      width="15"
      height="10"
      viewBox="0 0 15 10"
      fill="none"
      aria-hidden="true"
    >
      <path d="M1 5.2 3.4 7.7 8.2 1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.3 5.9 7.4 7.1 13 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type MsgProps = {
  from: "you" | "them";
  time: string;
  lead?: boolean;
  delay?: number;
  children: React.ReactNode;
};

function Msg({ from, time, lead, delay, children }: MsgProps) {
  return (
    <div
      className={`th-msg${delay === undefined ? "" : " th-arrive"}`}
      data-from={from}
      style={delay === undefined ? undefined : ({ "--d": `${delay}ms` } as React.CSSProperties)}
    >
      <div className="th-bubble" data-size={lead ? "lead" : undefined}>
        {children}
        <span className="th-meta">
          <span>{time}</span>
          {from === "you" && <Ticks />}
        </span>
      </div>
    </div>
  );
}

function Attachment({
  kind,
  meta,
  children,
}: {
  kind: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <div className="th-attach">
      <div className="th-attach-head">
        <span>{kind}</span>
        <span>{meta}</span>
      </div>
      <div className="th-attach-body">{children}</div>
    </div>
  );
}

const LEAKS = [
  {
    title: "The search you weren't in",
    body: "Someone within two kilometres searched your trade today. The results didn't include you, and you will never find out that it happened.",
  },
  {
    title: "The message answered at three",
    body: "It arrived at 11:40. By the time you replied, they had asked two other people the same question and one of them had answered.",
  },
  {
    title: "The three questions",
    body: "Timings, price, whether you do the specific thing they need. You answer them forty times a week. They could be answered once.",
  },
];

const STACK = [
  {
    name: "Websites and landing pages",
    body: "Custom, fast on a phone, built to produce one action instead of admiring itself.",
  },
  {
    name: "Online stores",
    body: "Products, cart, checkout. There's a working one in the samples you can buy from.",
  },
  {
    name: "AI assistants and chatbots",
    body: "Trained on your business. Answers at 2am and hands you only the enquiries worth your time.",
  },
  {
    name: "WhatsApp and CRM automation",
    body: "Enquiries captured, reminders sent, follow-ups that happen without you remembering.",
  },
  {
    name: "Mobile apps",
    body: "When the job genuinely needs one. I'll tell you when it doesn't, which is most of the time.",
  },
  {
    name: "SEO and Google Business Profile",
    body: "Getting found for your trade in your area, then staying found once you are.",
  },
  {
    name: "Brand and identity",
    body: "Logo, colours, and the way the whole thing sounds when a stranger reads it.",
  },
  {
    name: "Internal tools and dashboards",
    body: "The system that fits how you actually work, instead of the one you're working around.",
  },
];

const LINKS = [
  { tag: "GYM", name: "Forge Strength Co.", note: "Live assistant — ask it the fee.", href: "/samples/gym" },
  { tag: "CLINIC", name: "Meridian Family Clinic", note: "Book a dummy appointment.", href: "/samples/clinic" },
  { tag: "SHOP", name: "Trader storefront", note: "Working cart and checkout.", href: "/samples/trader" },
  { tag: "GOLD", name: "Vasant & Sons", note: "A catalogue with no prices, deliberately.", href: "/samples/jeweller" },
];

export default function ThreadPage() {
  return (
    <>
      <header className="th-bar">
        <div className="th-col th-bar-inner">
          <Link href="/v2" className="th-avatar" aria-label="All concepts">
            c
          </Link>
          <span className="th-who">
            <b>Coreline</b>
            <span>online — usually replies in a few minutes</span>
          </span>
          <a href={WHATSAPP} className="th-call" target="_blank" rel="noreferrer">
            Open in WhatsApp
          </a>
        </div>
      </header>

      <main className="th-col th-thread">
        <p className="th-day">Today</p>

        <Msg from="you" time="21:04" delay={100}>
          someone told me i need a website. honestly most of my business is walk-ins and
          whatsapp
        </Msg>

        {/* The reply types itself in, once. Nothing below this animates. */}
        <div className="th-slot">
          <span className="th-typing th-typing-slot" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <div
            className="th-msg th-arrive"
            data-from="them"
            style={{ "--d": "1800ms" } as React.CSSProperties}
          >
            <div className="th-bubble" data-size="lead">
              Then you already know how to get customers. The only question is how many you
              never find out about.
              <span className="th-meta">
                <span>21:04</span>
              </span>
            </div>
          </div>
        </div>

        <Msg from="them" time="21:05" delay={2300}>
          Can I show you what that looks like on an ordinary Tuesday?
        </Msg>

        <Msg from="you" time="21:06" delay={2700}>
          go on
        </Msg>

        <Attachment kind="Tuesday" meta="3 items">
          <h2 className="th-h2">Where a walk-in business leaks.</h2>
          <p className="th-p">
            None of this is a failure of the business. It&apos;s a failure of the hours — every
            one of these happens while you are doing the actual work.
          </p>
          <ul className="th-leaks">
            {LEAKS.map((leak) => (
              <li key={leak.title}>
                <b>{leak.title}</b>
                <p>{leak.body}</p>
              </li>
            ))}
          </ul>
        </Attachment>

        <Msg from="you" time="21:11">
          ok. what does it cost
        </Msg>

        <Msg from="them" time="21:11">
          ₹15,000 to start. Here it is in writing, before you have to ask twice.
        </Msg>

        <Attachment kind="Quote" meta="coreline-terms.pdf">
          <div className="th-quote">
            <div className="th-quote-line">
              <span>Business website, custom built</span>
              <span>from ₹15,000</span>
            </div>
            <div className="th-quote-line">
              <span>Assistant that answers around the clock</span>
              <span>quoted with the build</span>
            </div>
            <div className="th-quote-line">
              <span>Google listing claimed and connected</span>
              <span>included</span>
            </div>
            <div className="th-quote-line">
              <span>Delivery</span>
              <span>10 working days</span>
            </div>
            <div className="th-quote-line">
              <span>Payment</span>
              <span>half to start, half when live</span>
            </div>
            <div className="th-quote-total">
              <span>Fixed before I begin</span>
              <b>₹15,000</b>
            </div>
          </div>
          <p className="th-note">
            Most sites land between ₹15,000 and ₹35,000 depending on how many pages you need
            and how much of it is custom. You get one number before any work starts and it
            doesn&apos;t move afterwards. The domain stays in your name.
          </p>
        </Attachment>

        <Msg from="you" time="21:14">
          and who actually builds it. is this an agency
        </Msg>

        <Msg from="them" time="21:15">
          No. It&apos;s me, and that&apos;s the pitch rather than the disclaimer.
        </Msg>

        <Attachment kind="Contact" meta="1 person">
          <div className="th-founder">
            <div className="th-portrait">
              founder
              <br />
              photo
              <br />
              pending
            </div>
            <div>
              <h2 className="th-h2">Shailesh Hawale, Wagle Estate, Thane.</h2>
              <p className="th-p">
                I take the first message, design it, build it, ship it, and answer the phone
                afterwards. No account manager, nobody to hand you to, and no team it quietly
                gets passed to.
              </p>
              <p className="th-p">
                Most of what comes next will come from owners telling other owners. That only
                works if I finish what I start on the date I said — so the terms above aren&apos;t
                generosity, they&apos;re the business model.
              </p>
            </div>
          </div>
        </Attachment>

        <Msg from="you" time="21:19">
          what else do you do apart from websites
        </Msg>

        <Attachment kind="Services" meta="8 things">
          <h2 className="th-h2">The whole online setup, from one person.</h2>
          <p className="th-p">
            Start with the website. The rest is worth talking about once it&apos;s earning — and
            I&apos;ll say so when you don&apos;t need something yet.
          </p>
          <div className="th-stack">
            {STACK.map((item) => (
              <div key={item.name}>
                <b>{item.name}</b>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </Attachment>

        <Msg from="you" time="21:24">
          can i see something real
        </Msg>

        <Msg from="them" time="21:24">
          Ten of them. None are client sites — I&apos;d rather tell you that than have you find
          out.
        </Msg>

        <Attachment kind="Forwarded" meta="4 of 10">
          <div className="th-links">
            {LINKS.map((link) => (
              <Link className="th-link" href={link.href} key={link.href}>
                <span className="th-link-thumb">{link.tag}</span>
                <span>
                  <b>{link.name}</b>
                  <span>{link.note}</span>
                  <em>corelinedigital.in{link.href}</em>
                </span>
              </Link>
            ))}
          </div>
        </Attachment>

        <Msg from="you" time="21:33">
          alright. how do we start
        </Msg>

        <Msg from="them" time="21:33" lead>
          You already have. Tell me what your business does — I&apos;ll look at how you show up on
          Google right now and give you an honest read, free, including if the answer is that
          you don&apos;t need me yet.
        </Msg>
      </main>

      <div className="th-composer-wrap">
        <div className="th-col">
          <a className="th-composer" href={WHATSAPP} target="_blank" rel="noreferrer">
          <span>Tell Shailesh what your business does…</span>
          <span className="th-send" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 8h11M8.5 3.5 13 8l-4.5 4.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <div className="th-col">
        <div className="th-foot">
          <span>Coreline Digital — Thane, Mumbai</span>
          <Link href="/v2">All three concepts</Link>
        </div>
      </div>
    </>
  );
}
