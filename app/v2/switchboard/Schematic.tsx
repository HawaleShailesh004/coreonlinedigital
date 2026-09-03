"use client";

import { useState } from "react";

/* --------------------------------------------------------------------------
   The board.

   Two wirings of the same business. "As it runs now" sends every source
   straight into one phone, unfiltered and late. "Wired up" puts the website in
   the middle and gives the enquiry somewhere to be answered, sorted and
   recorded before it reaches you.

   The switch is the only thing on this page that moves without being asked, and
   it does not move until someone flips it.
   -------------------------------------------------------------------------- */

type NodeId =
  | "search"
  | "social"
  | "referral"
  | "website"
  | "assistant"
  | "bookings"
  | "automation"
  | "phone";

type NodeSpec = {
  id: NodeId;
  label: string;
  sub: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Nodes that only exist once the thing is built. */
  built?: boolean;
  kicker: string;
  body: string[];
  /** Replaces `body` when the board is showing how things run today. */
  bodyNow?: string[];
};

const NODES: NodeSpec[] = [
  {
    id: "search",
    label: "Google search",
    sub: "they type your trade",
    x: 20,
    y: 41,
    w: 185,
    h: 68,
    kicker: "Source",
    body: [
      "Someone within a few kilometres searches what you do, today, whether or not you have anything for them to find.",
      "Being in that result is three things: a claimed and connected Google listing, a site that opens fast on a phone, and the words a person actually types being on the page.",
    ],
    bodyNow: [
      "The search still happens. The result is a directory listing you have never seen, or a competitor.",
      "This is the single biggest source of customers you will never know you lost, because nothing about it shows up anywhere you look.",
    ],
  },
  {
    id: "social",
    label: "Instagram",
    sub: "they browse, then leave",
    x: 20,
    y: 181,
    w: 185,
    h: 68,
    kicker: "Source",
    body: [
      "Instagram is where people browse. It is not where they can check your timings, read your prices, or book anything — and the post is gone in a day.",
      "The site is where the same work sits in order, with your name on it, when the post has scrolled away.",
    ],
    bodyNow: [
      "Every enquiry becomes a DM you answer by hand, one at a time, with the same ten photos and the same four sentences.",
      "Nothing is recorded. Next month you cannot say how many people asked, or how many you lost.",
    ],
  },
  {
    id: "referral",
    label: "Referral",
    sub: "“send me the link”",
    x: 20,
    y: 321,
    w: 185,
    h: 68,
    kicker: "Source",
    body: [
      "The strongest lead you get, and the one most often dropped. Someone recommends you and the other person asks for a link.",
      "There has to be a link, and what it opens has to be good enough to survive the recommendation.",
    ],
    bodyNow: [
      "There is no link to send, so the referral is passed on as a phone number in a chat and dies there half the time.",
      "The person who vouched for you does not follow up. They have done their bit.",
    ],
  },
  {
    id: "website",
    label: "The website",
    sub: "everything plugs in here",
    x: 310,
    y: 163,
    w: 225,
    h: 104,
    built: true,
    kicker: "The hub",
    body: [
      "Custom, fast on a phone, and built so every page pushes toward one action — a call, a WhatsApp, a booking, an order.",
      "It is not a brochure. It is the thing the other six boxes on this board connect through.",
    ],
  },
  {
    id: "assistant",
    label: "Assistant",
    sub: "answers at any hour",
    x: 625,
    y: 41,
    w: 190,
    h: 68,
    built: true,
    kicker: "Answers",
    body: [
      "Answers timings, price, location and the same fifteen questions you get every week — the moment somebody asks, at any hour.",
      "It hands you the enquiries that are actually worth a call, with the details already collected. There is one on the main Coreline site; go and argue with it.",
    ],
  },
  {
    id: "bookings",
    label: "Bookings",
    sub: "they pick the slot",
    x: 625,
    y: 181,
    w: 190,
    h: 68,
    built: true,
    kicker: "Captures",
    body: [
      "The customer picks the time themselves. It arrives with the date, the service and the phone number already filled in.",
      "You confirm instead of starting the conversation from nothing.",
    ],
  },
  {
    id: "automation",
    label: "Follow-up",
    sub: "runs without you",
    x: 625,
    y: 321,
    w: 190,
    h: 68,
    built: true,
    kicker: "Keeps going",
    body: [
      "A reminder before the appointment, so fewer people forget. A review request after the job, which is what separates the top three in your area from everybody else.",
      "And a nudge to the enquiry that went cold three weeks ago, which you were never going to send.",
    ],
  },
  {
    id: "phone",
    label: "Your WhatsApp",
    sub: "already on your phone",
    x: 890,
    y: 163,
    w: 190,
    h: 104,
    kicker: "Where it lands",
    body: [
      "Everything ends up on the number you already have open. No dashboard to log into, no new app, nothing to learn.",
      "The difference is what arrives: a name, a number, and what they actually want.",
    ],
    bodyNow: [
      "Everything lands here too — but raw, unsorted, and at the worst possible moment. Three messages during a job, answered at half past three.",
      "By then two of them have asked somebody else the same question and one has already booked.",
    ],
  },
];

type Wire = { from: NodeId; to: NodeId; d: string };

const WIRED: Wire[] = [
  { from: "search", to: "website", d: "M205,75 C255,75 260,190 310,190" },
  { from: "social", to: "website", d: "M205,215 H310" },
  { from: "referral", to: "website", d: "M205,355 C255,355 260,240 310,240" },
  { from: "website", to: "assistant", d: "M535,190 C575,190 585,75 625,75" },
  { from: "website", to: "bookings", d: "M535,215 H625" },
  { from: "website", to: "automation", d: "M535,240 C575,240 585,355 625,355" },
  { from: "assistant", to: "phone", d: "M815,75 C850,75 855,190 890,190" },
  { from: "bookings", to: "phone", d: "M815,215 H890" },
  { from: "automation", to: "phone", d: "M815,355 C850,355 855,240 890,240" },
];

const RAW: Wire[] = [
  { from: "search", to: "phone", d: "M205,75 C450,75 620,190 890,190" },
  { from: "social", to: "phone", d: "M205,215 H890" },
  { from: "referral", to: "phone", d: "M205,355 C450,355 620,240 890,240" },
];

export function Schematic() {
  const [wired, setWired] = useState(false);
  const [active, setActive] = useState<NodeId>("phone");

  const wires = wired ? WIRED : RAW;
  const node = NODES.find((n) => n.id === active) ?? NODES[0];
  const isGhost = (n: NodeSpec) => !wired && Boolean(n.built);

  // A ghost node has nothing to say yet — send the readout somewhere real.
  const selectNode = (n: NodeSpec) => setActive(isGhost(n) ? "phone" : n.id);

  const body = (!wired && node.bodyNow) || node.body;

  return (
    <>
      <div className="sw-switch" role="group" aria-label="How the business is wired">
        <button
          type="button"
          data-tone="leak"
          aria-pressed={!wired}
          onClick={() => {
            setWired(false);
            setActive("phone");
          }}
        >
          As it runs now
        </button>
        <button
          type="button"
          data-tone="signal"
          aria-pressed={wired}
          onClick={() => {
            setWired(true);
            setActive("website");
          }}
        >
          Wired up
        </button>
      </div>

      <div className="sw-board">
        <div className="sw-board-head">
          <span>
            {wired ? (
              <>
                8 parts connected · <b>every enquiry answered, sorted and recorded</b>
              </>
            ) : (
              <>
                3 sources, 1 inbox · <b>nothing in between</b>
              </>
            )}
          </span>
          <span>select any box</span>
        </div>

        <div className="sw-scroll">
          <svg
            className="sw-svg"
            viewBox="0 0 1100 460"
            role="group"
            aria-label={
              wired
                ? "Diagram: sources feed the website, which feeds the assistant, bookings and follow-up, which feed your WhatsApp"
                : "Diagram: three sources feeding straight into your WhatsApp with nothing in between"
            }
          >
            {wires.map((wire) => (
              <path
                key={`${wire.from}-${wire.to}`}
                className="sw-wire"
                d={wire.d}
                data-state={wired ? "live" : "broken"}
                data-active={wire.from === active || wire.to === active}
              />
            ))}

            {NODES.map((n) => {
              const ghost = isGhost(n);
              return (
                <g
                  key={n.id}
                  className="sw-node"
                  role="button"
                  tabIndex={0}
                  aria-label={ghost ? `${n.label} — not built yet` : `${n.label}. ${n.sub}`}
                  data-active={!ghost && active === n.id}
                  data-ghost={ghost}
                  onClick={() => selectNode(n)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      selectNode(n);
                    }
                  }}
                >
                  <rect x={n.x} y={n.y} width={n.w} height={n.h} />
                  <text x={n.x + 16} y={n.y + (n.h > 80 ? 44 : 30)}>
                    {ghost ? "not built yet" : n.label}
                  </text>
                  <text
                    className="sw-node-sub"
                    x={n.x + 16}
                    y={n.y + (n.h > 80 ? 66 : 50)}
                  >
                    {ghost ? "" : n.sub}
                  </text>
                </g>
              );
            })}

            <g className="sw-badge" data-tone={wired ? "signal" : "leak"}>
              <text x="985" y="296" textAnchor="middle">
                {wired ? "qualified · details attached" : "unsorted · answered late"}
              </text>
            </g>
          </svg>
        </div>

        <div className="sw-readout" aria-live="polite">
          <div>
            <span className="sw-kicker">{node.kicker}</span>
            <h3>{node.label}</h3>
          </div>
          <div>
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
