import Link from "next/link";
import {
  Archivo,
  IBM_Plex_Mono,
  Instrument_Sans,
  Instrument_Serif,
  JetBrains_Mono,
  Schibsted_Grotesk,
  Space_Mono,
} from "next/font/google";
import "./index.css";

/* Every concept's faces, so each band can be shown in its own voice. */
const serif = Instrument_Serif({ subsets: ["latin"], weight: ["400"], variable: "--pick-serif", display: "swap" });
const sans = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--pick-sans", display: "swap" });
const monoA = JetBrains_Mono({ subsets: ["latin"], weight: ["400"], variable: "--pick-mono-a", display: "swap" });
const grotesk = Schibsted_Grotesk({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--pick-grotesk", display: "swap" });
const monoB = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400"], variable: "--pick-mono-b", display: "swap" });
const archivo = Archivo({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--pick-archivo", display: "swap" });
const monoC = Space_Mono({ subsets: ["latin"], weight: ["400"], variable: "--pick-mono-c", display: "swap" });

const FONTS = [serif, sans, monoA, grotesk, monoB, archivo, monoC]
  .map((f) => f.variable)
  .join(" ");

export default function ConceptIndexPage() {
  return (
    <div className={`pick ${FONTS}`}>
      <div className="pick-shell pick-intro">
        <h1>Three ways Coreline could look in the dark.</h1>
        <p>
          Same business, same true facts, three different arguments about what the site is
          for. Each one is a working page, not a mockup — open them on a phone as well.
          Reference DNA runs from <a href="https://resend.com/" target="_blank" rel="noreferrer">Resend</a>{" "}
          and <a href="https://www.authkit.com/" target="_blank" rel="noreferrer">AuthKit</a>{" "}
          for craft, but none of these copy their layout, because a Thane owner comparing
          three quotes is not a developer buying an API.
        </p>
      </div>

      <Link href="/v2/after-hours" className="pick-band pick-a">
        <div className="pick-shell pick-band-inner">
          <div style={{ position: "relative" }}>
            <div className="pick-meta">
              <span className="pick-letter">A</span>
              <h2 className="pick-name">After Hours</h2>
            </div>
            <p className="pick-premise">
              Dark is the subject, not the styling. The page knows what time it is in Thane
              and says something different at 4am than it does at noon — then hands you a
              24-hour rail you can walk through your own worst day on.
            </p>
            <p className="pick-for">
              Strongest emotional argument. Best if the pitch is “you are losing customers
              while you sleep”. Sodium-amber on night blue, serif display.
            </p>
            <span className="pick-open">Open After Hours</span>
          </div>

          <div>
            <p className="pick-a-demo">
              It&apos;s 23:47 in Thane. <span>You&apos;re done for the day. They&apos;re still deciding.</span>
            </p>
            <div className="pick-a-rail" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <i key={i} />
              ))}
            </div>
          </div>
        </div>
      </Link>

      <Link href="/v2/thread" className="pick-band pick-b">
        <div className="pick-shell pick-band-inner">
          <div>
            <div className="pick-meta">
              <span className="pick-letter">B</span>
              <h2 className="pick-name">Thread</h2>
            </div>
            <p className="pick-premise">
              The page is the conversation. One evening&apos;s messages between an owner and
              you, where the pricing, the proof and the founder arrive as attachments —
              and the last thing on the page is a message box.
            </p>
            <p className="pick-for">
              Most differentiated, highest risk. Demonstrates the assistant by being one.
              Nobody in this market has a site that looks like this.
            </p>
            <span className="pick-open">Open Thread</span>
          </div>

          <div className="pick-b-demo" aria-hidden="true">
            <span data-from="you">most of my business is walk-ins and whatsapp</span>
            <span data-from="them">
              Then you already know how to get customers. The only question is how many you
              never find out about.
            </span>
          </div>
        </div>
      </Link>

      <Link href="/v2/switchboard" className="pick-band pick-c">
        <div className="pick-shell pick-band-inner">
          <div>
            <div className="pick-meta">
              <span className="pick-letter">C</span>
              <h2 className="pick-name">Switchboard</h2>
            </div>
            <p className="pick-premise">
              The whole offer drawn as a schematic you can operate. One switch flips the
              board between how the business runs now — three sources dumping into one
              phone — and the same business wired up.
            </p>
            <p className="pick-for">
              Best for the expanded positioning: apps, CRM, SEO, automations, brand. Sells a
              system rather than a page, without a single bento card.
            </p>
            <span className="pick-open">Open Switchboard</span>
          </div>

          <div className="pick-c-demo" aria-hidden="true">
            <svg viewBox="0 0 420 120">
              <path className="w" d="M92,30 C130,30 130,60 168,60" />
              <path className="w" d="M92,90 C130,90 130,60 168,60" />
              <path className="w" d="M256,60 H300" />
              <rect x="12" y="14" width="80" height="32" />
              <rect x="12" y="74" width="80" height="32" />
              <rect x="168" y="40" width="88" height="40" />
              <rect x="300" y="44" width="106" height="32" />
              <text x="24" y="34">search</text>
              <text x="24" y="94">instagram</text>
              <text x="180" y="64">website</text>
              <text x="312" y="64">your whatsapp</text>
            </svg>
          </div>
        </div>
      </Link>

      <div className="pick-shell pick-foot">
        Coreline Digital — concept branch redesign/dark-v2 · noindex · not live
      </div>
    </div>
  );
}
