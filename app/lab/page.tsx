import Link from "next/link";

const concepts = [
  {
    slug: "signal",
    tag: "A · Kinetic product",
    refs: "Resend + AuthKit",
    title: "Signal",
    blurb:
      "Dark cinematic canvas. The product is the hero — website, assistant, automation as floating glass artifacts. Emerald glow, giant wordmark, motion that sells clarity.",
    bestFor: "Premium feel + cold traffic that needs to see craft fast",
  },
  {
    slug: "atlas",
    tag: "B · Full-stack studio",
    refs: "Zero to One + Estrela",
    title: "Atlas",
    blurb:
      "One studio for the whole online stack. Bento services, Mumbai/Thane signal, packages, chatbot as proof. Built for “I need everything, not just a website.”",
    bestFor: "Expanded services + multi-offer conversion",
  },
  {
    slug: "loom",
    tag: "C · Craft story",
    refs: "Estrela + Flammini + light scrollytelling",
    title: "Loom",
    blurb:
      "Type-led manifesto, sticky story panels, horizontal work rail. Feels like a design studio without WebGL. Human, calm, unforgettable scroll.",
    bestFor: "Brand differentiation + “this isn’t a template agency”",
  },
];

export default function LabIndexPage() {
  return (
    <div className="lab-grain relative min-h-dvh overflow-hidden px-6 py-16 md:px-10 md:py-24">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[40rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(47,143,114,0.35), transparent 65%)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl">
        <p className="lab-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--lab-accent)]">
          Coreline lab · noindex · branch lab/dark-revamp-concepts
        </p>
        <h1 className="lab-display mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">
          Three dark directions.
          <span className="mt-2 block text-[var(--lab-mute)]">Pick a spine, then we revamp for real.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-[var(--lab-mute)]">
          References ranked in{" "}
          <code className="lab-mono text-[0.8rem] text-[var(--lab-ink)]">docs/lab-revamp-brief.md</code>.
          Best DNA for us: <strong className="font-medium text-[var(--lab-ink)]">Resend + AuthKit</strong> for
          craft, <strong className="font-medium text-[var(--lab-ink)]">Zero to One</strong> for the multi-service
          offer, <strong className="font-medium text-[var(--lab-ink)]">Estrela</strong> for voice. Lusion is the
          ceiling — not the day-one homepage.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="lab-mono rounded-full border border-[var(--lab-line)] px-4 py-2 text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--lab-mute)] transition hover:border-[var(--lab-accent)] hover:text-[var(--lab-ink)]"
          >
            ← Live site
          </Link>
          <a
            href="https://resend.com/"
            target="_blank"
            rel="noreferrer"
            className="lab-mono rounded-full border border-[var(--lab-line)] px-4 py-2 text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--lab-mute)] transition hover:border-[var(--lab-accent)] hover:text-[var(--lab-ink)]"
          >
            Resend ↗
          </a>
          <a
            href="https://www.authkit.com/"
            target="_blank"
            rel="noreferrer"
            className="lab-mono rounded-full border border-[var(--lab-line)] px-4 py-2 text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--lab-mute)] transition hover:border-[var(--lab-accent)] hover:text-[var(--lab-ink)]"
          >
            AuthKit ↗
          </a>
        </div>

        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {concepts.map((c, i) => (
            <li key={c.slug} className="lab-fade" style={{ animationDelay: `${i * 90}ms` }}>
              <Link
                href={`/lab/${c.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-[var(--lab-line)] bg-[var(--lab-surface)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--lab-accent)] hover:shadow-[0_0_40px_rgba(47,143,114,0.15)]"
              >
                <p className="lab-mono text-[0.625rem] uppercase tracking-[0.16em] text-[var(--lab-accent)]">
                  {c.tag}
                </p>
                <h2 className="lab-display mt-4 text-3xl font-semibold tracking-[-0.02em]">{c.title}</h2>
                <p className="mt-2 text-[0.75rem] text-[var(--lab-mute)]">After {c.refs}</p>
                <p className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-[var(--lab-mute)]">{c.blurb}</p>
                <p className="mt-6 text-[0.8125rem] font-medium text-[var(--lab-ink)]">
                  Best for: {c.bestFor}
                </p>
                <span className="lab-mono mt-8 inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--lab-accent)] transition group-hover:gap-3">
                  Open concept <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
