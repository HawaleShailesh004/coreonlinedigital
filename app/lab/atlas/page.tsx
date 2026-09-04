import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: "01",
    title: "Websites & web apps",
    body: "Marketing sites, booking flows, dashboards — engineered to load fast and convert.",
  },
  {
    id: "02",
    title: "Mobile apps",
    body: "Customer apps and internal tools when WhatsApp alone isn’t enough.",
  },
  {
    id: "03",
    title: "SEO & local growth",
    body: "Get found when someone searches your trade in Mumbai / Thane.",
  },
  {
    id: "04",
    title: "CRM & WhatsApp systems",
    body: "Enquiries land in one place. Follow-ups don’t die in the chat list.",
  },
  {
    id: "05",
    title: "AI chatbots & automations",
    body: "Qualify, answer, book — while you’re with a customer.",
  },
  {
    id: "06",
    title: "Brand & UI design",
    body: "Logo, identity, and interfaces that match how serious the business is.",
  },
];

const industries = [
  "Clinics",
  "Gyms",
  "Coaching",
  "Jewellery",
  "Traders",
  "Real estate",
  "Travel",
  "Interiors",
  "Schools",
  "CAs",
];

export default function AtlasConceptPage() {
  return (
    <div className="lab-grain relative min-h-dvh overflow-x-hidden bg-[#070908]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <Link href="/lab" className="lab-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--lab-mute)]">
          ← Lab
        </Link>
        <nav className="hidden gap-8 text-sm text-[var(--lab-mute)] md:flex">
          <span>Services</span>
          <span>Work</span>
          <span>Process</span>
        </nav>
        <a
          href="https://wa.me/919082308732"
          className="rounded-lg bg-[var(--lab-ink)] px-4 py-2 text-sm font-medium text-[var(--lab-void)]"
        >
          Book a build
        </a>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-12 md:px-10 md:pt-20">
          <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="lab-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--lab-warm)]">
                Concept B · Atlas · Full-stack studio
              </p>
              <h1 className="lab-display mt-6 text-4xl font-bold leading-[1.02] tracking-[-0.03em] md:text-6xl lg:text-7xl">
                Design. Build.
                <br />
                Automate.{" "}
                <span className="text-[var(--lab-accent)]">Grow.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--lab-mute)]">
                Coreline is the single team behind your website, your assistant, your SEO, and the automations that keep
                customers from slipping away — one person accountable, Mumbai / Thane.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/919082308732"
                  className="rounded-lg bg-[var(--lab-accent)] px-6 py-3.5 font-medium text-[var(--lab-void)]"
                >
                  Talk on WhatsApp
                </a>
                <Link
                  href="/services"
                  className="rounded-lg border border-[var(--lab-line)] px-6 py-3.5 text-[var(--lab-mute)]"
                >
                  All services
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--lab-line)]">
              <Image
                src="/lab/mockups/jeweller-mockup.png"
                alt="Jewellery sample site"
                fill
                className="object-cover"
                sizes="(min-width:1024px) 40vw, 100vw"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6">
                <p className="lab-mono text-[0.625rem] uppercase tracking-[0.14em] text-[var(--lab-accent)]">
                  Sample · Jeweller
                </p>
                <p className="mt-1 text-sm text-white/80">One of ten working builds you can click through.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee industries */}
        <div className="overflow-hidden border-y border-[var(--lab-line)] py-5">
          <div className="lab-marquee-track flex w-max gap-10" style={{ animation: "lab-marquee 32s linear infinite" }}>
            {[...industries, ...industries].map((item, i) => (
              <span key={`${item}-${i}`} className="lab-display flex items-center gap-10 text-sm font-medium text-[var(--lab-mute)]">
                {item}
                <span className="size-1.5 rounded-full bg-[var(--lab-accent)]" aria-hidden />
              </span>
            ))}
          </div>
        </div>

        {/* Bento services */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="lab-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--lab-accent)]">
                Six capabilities. One owner.
              </p>
              <h2 className="lab-display mt-4 max-w-xl text-3xl font-semibold tracking-[-0.02em] md:text-5xl">
                Tired of managing five vendors?
              </h2>
            </div>
            <p className="max-w-sm text-[var(--lab-mute)]">
              Same person designs, ships, ranks, and wires the automation. No handoff theatre.
            </p>
          </div>

          <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <li
                key={s.id}
                className={`rounded-2xl border border-[var(--lab-line)] bg-[var(--lab-surface)] p-6 ${
                  i === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:min-h-[22rem]" : ""
                }`}
              >
                <p className="lab-mono text-[0.625rem] text-[var(--lab-mute)]">{s.id}</p>
                <h3 className={`lab-display mt-4 font-semibold tracking-tight ${i === 0 ? "text-3xl" : "text-xl"}`}>
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--lab-mute)]">{s.body}</p>
                {i === 0 && (
                  <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-xl border border-[var(--lab-line)]">
                    <Image
                      src="/lab/mockups/coaching-mockup.png"
                      alt="Coaching sample"
                      fill
                      className="object-cover"
                      sizes="40vw"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Outcomes */}
        <section className="border-t border-[var(--lab-line)] bg-[var(--lab-surface)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-3 md:px-10">
            {[
              { k: "Fixed price", v: "Know the number before you start." },
              { k: "Fixed date", v: "10 working days from content, for sites." },
              { k: "Live proof", v: "Chatbot on this domain is the product demo." },
            ].map((item) => (
              <div key={item.k}>
                <h3 className="lab-display text-2xl font-semibold">{item.k}</h3>
                <p className="mt-3 text-[var(--lab-mute)]">{item.v}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-24 text-center md:px-10">
          <h2 className="lab-display text-3xl font-semibold md:text-5xl">
            Tell me what you&apos;re losing.
            <br />
            <span className="text-[var(--lab-mute)]">I&apos;ll tell you if it&apos;s worth fixing.</span>
          </h2>
          <a
            href="https://wa.me/919082308732"
            className="mt-10 inline-flex rounded-lg bg-[var(--lab-ink)] px-8 py-4 font-medium text-[var(--lab-void)]"
          >
            WhatsApp Shailesh
          </a>
          <p className="lab-mono mt-10 text-[0.625rem] uppercase tracking-[0.16em] text-[var(--lab-mute)]">
            Concept B · Atlas · After Zero to One + Estrela
          </p>
        </section>
      </main>
    </div>
  );
}
