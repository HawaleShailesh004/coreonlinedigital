"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";

/* --------------------------------------------------------------------------
   Everything on this page that knows what time it is.

   The conceit only works if the clock is real: the headline a visitor reads at
   11pm has to be a different sentence from the one a visitor reads at 10am, and
   the rail has to mark the hour they are actually in. All of it is Asia/Kolkata
   regardless of where the visitor sits, because the business being described is
   in Thane.
   -------------------------------------------------------------------------- */

type ThaneTime = { hour: number; minute: number; clock: string };

const FORMAT = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/** "HH:MM:SS" in Thane. A plain string so the store snapshot stays comparable. */
function readClock(): string {
  const parts = FORMAT.formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  return `${get("hour")}:${get("minute")}:${get("second")}`;
}

/*
 * The wall clock is an external system, so it is subscribed to rather than
 * mirrored into state by an effect. The server snapshot is empty on purpose:
 * server and client cannot agree on the time, so the markup ships with a
 * placeholder and the real reading arrives on subscribe.
 */
let snapshot = "";

function subscribe(onChange: () => void): () => void {
  const tick = () => {
    const next = readClock();
    if (next !== snapshot) {
      snapshot = next;
      onChange();
    }
  };

  tick();
  const id = window.setInterval(tick, 1000);
  return () => window.clearInterval(id);
}

function useThaneTime(): ThaneTime | null {
  const clock = useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => "",
  );

  if (!clock) return null;

  return {
    hour: Number(clock.slice(0, 2)) % 24,
    minute: Number(clock.slice(3, 5)),
    clock,
  };
}

export function LiveClock() {
  const time = useThaneTime();

  return (
    <span className="ah-clock">
      <i className="ah-dot" aria-hidden="true" />
      <b>{time?.clock ?? "--:--:--"}</b>
      <span>Thane</span>
    </span>
  );
}

/* --- the headline --------------------------------------------------------- */

const BANDS: { from: number; to: number; turn: string }[] = [
  { from: 5, to: 8, turn: "Your shutter is down. The searching has already started." },
  { from: 9, to: 13, turn: "You're with a customer. Three people just messaged." },
  { from: 14, to: 17, turn: "You're mid-job. The enquiries don't queue politely." },
  { from: 18, to: 21, turn: "You're closing up. This is the hour they browse." },
];

const NIGHT = "You're done for the day. They're still deciding.";

function turnFor(hour: number): string {
  return BANDS.find((b) => hour >= b.from && hour <= b.to)?.turn ?? NIGHT;
}

export function TimeHeadline() {
  const time = useThaneTime();
  const hhmm = time ? `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}` : null;

  return (
    <h1>
      <span className="ah-rise" style={{ "--d": "80ms" } as React.CSSProperties}>
        {hhmm ? `It's ${hhmm} in Thane.` : "It's late in Thane."}
      </span>{" "}
      <span
        className="ah-turn ah-rise"
        style={{ "--d": "220ms" } as React.CSSProperties}
      >
        {turnFor(time?.hour ?? 23)}
      </span>
    </h1>
  );
}

/* --- the 24-hour rail ----------------------------------------------------- */

/** `quiet` hours carry a single line instead of the two-outcome comparison. */
type Moment = {
  hour: number;
  event?: string;
  without?: string;
  with?: string;
  quiet?: string;
};

const MOMENTS: Moment[] = [
  {
    hour: 0,
    event: "Someone is comparing three gyms from bed.",
    without:
      "He opens all three Instagram pages and messages all three. He joins whichever one replies first in the morning.",
    with: "He reads the fees, books the 7am trial himself, and you find his name on your phone at breakfast.",
  },
  {
    hour: 2,
    quiet: "Nothing happens at two. It's the one hour of the day I can't sell you anything.",
  },
  {
    hour: 4,
    event: "Night-shift workers and new parents search like everyone else.",
    without:
      "Google shows the three businesses with a properly claimed listing. A page nobody has touched since 2019 sits below all of them.",
    with: "You're one of the three. The site opens in under two seconds on one bar of data.",
  },
  {
    hour: 6,
    event: "A cab ride, and a search for your trade on the way.",
    without: "Whatever is on Justdial answers for you. You've never seen that page.",
    with: "Your own site answers, with your prices and your number on it.",
  },
  {
    hour: 8,
    event: "Parents compare coaching classes before the school run.",
    without: "“Fees on request” reads as something to hide. They call the class that published the number.",
    with: "Batch fees, last year's results and a demo slot — all readable at a traffic light.",
  },
  {
    hour: 10,
    event: "You're with a customer. The phone rings out.",
    without: "Nobody leaves a voicemail. Nobody has left a voicemail since 2016.",
    with: "The assistant answers the timing question, takes a name and a number, and pushes it to your WhatsApp.",
  },
  {
    hour: 12,
    event: "Three messages arrive in nine minutes.",
    without: "You see them at half past three and answer all three the same way. Two have already booked elsewhere.",
    with: "All three got an answer in the first minute. You call the one worth calling.",
  },
  {
    hour: 14,
    event: "A supplier is asked: who built your website?",
    without: "There's nothing to send. The referral dies as a phone number in a chat.",
    with: "They forward one link. That link does the pitch without you being in the room.",
  },
  {
    hour: 16,
    event: "You're being compared in another tab.",
    without: "Yours is the tab with the 2019 photos and a number that goes to a landline nobody sits at.",
    with: "Yours is the one with real work, real prices, and one tap to start talking.",
  },
  {
    hour: 18,
    event: "The heaviest browsing hour of the day. You're closing up.",
    without: "The counter is being cleaned. The enquiry arrives to an empty chair.",
    with: "The site is at full strength at exactly the hour you have nothing left to give it.",
  },
  {
    hour: 20,
    event: "Dinner-table decisions. Clinics, classes, contractors.",
    without: "The decision gets made from whatever a phone can find. You aren't in that search.",
    with: "You are, and what they find is organised enough to settle the argument.",
  },
  {
    hour: 22,
    event: "The 11pm enquiry.",
    without: "It sits unread until morning. By then it's been sent to two other people as well.",
    with: "It's answered, qualified, and waiting for you as a name, a number and what they want.",
  },
];

export function NightShift() {
  const time = useThaneTime();
  const [chosen, setChosen] = useState<number | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  /*
   * Derived, not synchronised: until the visitor picks an hour, the rail simply
   * shows the one they are living in. Before the clock resolves it falls back to
   * 22:00, the sharpest of the twelve.
   */
  const index = chosen ?? (time ? Math.floor(time.hour / 2) : 11);

  const select = useCallback((next: number) => setChosen(next), []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowRight: 1,
      ArrowLeft: -1,
      Home: -MOMENTS.length,
      End: MOMENTS.length,
    };
    const move = moves[event.key];
    if (move === undefined) return;

    event.preventDefault();
    const next = Math.min(MOMENTS.length - 1, Math.max(0, index + move));
    select(next);
    tabs.current[next]?.focus();
  };

  const moment = MOMENTS[index];
  const nowLeft = time ? ((time.hour + time.minute / 60) / 24) * 100 : null;

  return (
    <div className="ah-rail">
      <div
        role="tablist"
        aria-label="Hours of one day"
        className="ah-rail-track"
        onKeyDown={onKeyDown}
      >
        {MOMENTS.map((m, i) => (
          <button
            key={m.hour}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`ah-tab-${m.hour}`}
            aria-selected={i === index}
            aria-controls="ah-hour-panel"
            tabIndex={i === index ? 0 : -1}
            className="ah-tick"
            onClick={() => select(i)}
          >
            {String(m.hour).padStart(2, "0")}
          </button>
        ))}

        {nowLeft !== null && (
          <span className="ah-now" style={{ left: `${nowLeft}%` }} aria-hidden="true">
            <span>now</span>
          </span>
        )}
      </div>

      <div
        role="tabpanel"
        id="ah-hour-panel"
        aria-labelledby={`ah-tab-${moment.hour}`}
        tabIndex={-1}
      >
        {moment.quiet ? (
          <div className="ah-panel">
            <p className="ah-quiet" style={{ gridColumn: "1 / -1" }}>
              <span className="ah-hour-big">
                {String(moment.hour).padStart(2, "0")}:00
              </span>
              <span style={{ display: "block", marginTop: "1.25rem" }}>{moment.quiet}</span>
            </p>
          </div>
        ) : (
          <div className="ah-panel">
            <div className="ah-cell ah-cell-head">
              <span className="ah-hour-big">
                {String(moment.hour).padStart(2, "0")}:00
              </span>
              <p className="ah-event">{moment.event}</p>
            </div>
            <div className="ah-cell ah-cell-without">
              <h3>As things stand</h3>
              <p>{moment.without}</p>
            </div>
            <div className="ah-cell ah-cell-with">
              <h3>With the site working</h3>
              <p>{moment.with}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
