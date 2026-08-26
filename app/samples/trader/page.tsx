import type { Metadata } from "next";
import Image from "next/image";
import { Manrope } from "next/font/google";
import { ChatWidget } from "@/components/samples/ChatWidget";
import { InView } from "@/components/samples/InView";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleFooter } from "@/components/samples/SampleFooter";
import { SampleFrame } from "@/components/samples/SampleFrame";
import { SampleNav } from "@/components/samples/SampleNav";
import { SampleSection } from "@/components/samples/SampleSection";
import { CartButton, ShopGrid, StoreProvider } from "@/components/samples/TraderStore";
import { Reveal } from "@/components/ui/Reveal";
import { personas } from "@/lib/samples/chat-personas";
import { trader } from "@/lib/samples/trader";
import { traderMedia } from "@/lib/samples/media";

/** Geometric, unfussy, and legible at card sizes - e-commerce trust is clarity. */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sample: Online Home Goods Store",
  description:
    "Concept build for a small D2C brand - working cart and checkout, WhatsApp order automation, and a live AI assistant answering stock, shipping and returns.",
};

const heading =
  "s-display text-[1.875rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.25rem]";

export default function TraderSample() {
  return (
    <SampleFrame sample="trader" fontClass={manrope.variable}>
      <StoreProvider>
        <span id="top" />
        {/* The cart control rides in the nav's `extra` slot so it's reachable
            from anywhere on the page, as the brief requires. */}
        <SampleNav
          brand={trader.business}
          brandNote={trader.brandNote}
          links={trader.nav.links}
          cta={trader.nav.cta}
          extra={<CartButton />}
        />

        <main id="main">
          {/* --- Hero ------------------------------------------------------- */}
          <section className="border-b border-[var(--s-hair)]">
            <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div>
                <span
                  className="hero-step inline-block bg-[var(--s-surface)] px-3 py-1.5 text-[0.75rem] font-medium text-[var(--s-ink)]"
                  style={{ "--step-delay": "0ms" } as React.CSSProperties}
                >
                  {trader.hero.eyebrow}
                </span>

                <h1
                  className="hero-step s-display mt-6 max-w-lg text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[3rem]"
                  style={{ "--step-delay": "80ms" } as React.CSSProperties}
                >
                  {trader.hero.headline}
                </h1>

                <p
                  className="hero-step mt-5 max-w-lg leading-[1.7] text-[var(--s-grey)]"
                  style={{ "--step-delay": "160ms" } as React.CSSProperties}
                >
                  {trader.hero.sub}
                </p>

                <div
                  className="hero-step mt-8 flex flex-wrap gap-3"
                  style={{ "--step-delay": "240ms" } as React.CSSProperties}
                >
                  <SampleButton href="#shop">
                    {trader.hero.primaryCta}
                  </SampleButton>
                  <SampleButton data-open-chat variant="outline">
                    {trader.hero.chatCta}
                  </SampleButton>
                </div>

                <ul
                  className="hero-step mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-[var(--s-grey)]"
                  style={{ "--step-delay": "320ms" } as React.CSSProperties}
                >
                  {["Tracked delivery", "7-day returns", "COD available"].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-1.5">
                        <Tick />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div
                className="hero-step relative aspect-[4/3] overflow-hidden bg-[var(--s-surface)]"
                style={{ "--step-delay": "200ms" } as React.CSSProperties}
              >
                <Image
                  src={traderMedia.hero.src}
                  alt={traderMedia.hero.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* --- Shop ------------------------------------------------------- */}
          <SampleSection id="shop" size="tight" className="scroll-mt-20">
            <Reveal>
              <SampleEyebrow>{trader.shop.eyebrow}</SampleEyebrow>
              <h2 className={`${heading} mt-3 max-w-xl`}>
                {trader.shop.heading}
              </h2>
            </Reveal>
            <ShopGrid />
          </SampleSection>

          {/* --- Why buy from us -------------------------------------------- */}
          <SampleSection tone="surface" size="tight">
            <Reveal>
              <SampleEyebrow>{trader.why.eyebrow}</SampleEyebrow>
              <h2 className={`${heading} mt-3`}>{trader.why.heading}</h2>
            </Reveal>

            <ul className="mt-9 grid gap-8 md:grid-cols-3">
              {trader.why.points.map((point, index) => (
                <Reveal as="li" key={point.title} delay={index * 80}>
                  <div className="flex size-9 items-center justify-center bg-[var(--s-primary)]/12">
                    <Tick />
                  </div>
                  <h3 className="s-display mt-4 text-[1rem] font-semibold">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                    {point.body}
                  </p>
                </Reveal>
              ))}
            </ul>
          </SampleSection>

          {/* --- Post-order automation ---------------------------------------
              A diagram rather than a live demo: these messages fire over days,
              so there is nothing to show in real time on a call. It doubles as
              genuinely useful content for the shop's own customers. */}
          <SampleSection id="flow" className="scroll-mt-20">
            <Reveal>
              <SampleEyebrow>{trader.flow.eyebrow}</SampleEyebrow>
              <h2 className={`${heading} mt-3 max-w-2xl`}>
                {trader.flow.heading}
              </h2>
              <p className="mt-4 max-w-xl leading-[1.7] text-[var(--s-grey)]">
                {trader.flow.sub}
              </p>
            </Reveal>

            <ol className="mt-12 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-5">
              {trader.flow.steps.map((step, index) => (
                <li key={step.title} className="relative">
                  {/* Line-and-node motif: the node lands, then the connector
                      draws toward the next step. */}
                  <div className="flex items-center gap-2">
                    <InView
                      as="span"
                      delay={index * 140}
                      className="s-pop flex size-7 shrink-0 items-center justify-center bg-[var(--s-primary)] text-[0.6875rem] font-semibold text-[var(--s-on-primary)]"
                    >
                      {index + 1}
                    </InView>
                    {index < trader.flow.steps.length - 1 && (
                      <InView
                        as="span"
                        delay={index * 140 + 120}
                        className="s-connector hidden h-px flex-1 bg-[var(--s-hair)] lg:block"
                      />
                    )}
                  </div>

                  <Reveal delay={index * 140 + 60}>
                    <p className="s-mono mt-4 text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--s-accent)]">
                      {step.timing}
                    </p>
                    <h3 className="s-display mt-1.5 text-[0.9375rem] font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[0.875rem] leading-[1.65] text-[var(--s-grey)]">
                      {step.body}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </SampleSection>

          {/* --- About ------------------------------------------------------ */}
          <SampleSection id="about" size="tight" bordered className="scroll-mt-20">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
              <Reveal>
                <SampleEyebrow>{trader.about.eyebrow}</SampleEyebrow>
                <h2 className={`${heading} mt-3`}>{trader.about.heading}</h2>

                {trader.about.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-5 max-w-xl leading-[1.75] text-[var(--s-grey)]"
                  >
                    {paragraph}
                  </p>
                ))}

                <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-5">
                  {trader.about.stats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="s-display text-[1.5rem] font-semibold tabular-nums">
                        {stat.value}
                      </dt>
                      <dd className="mt-0.5 text-[0.75rem] uppercase tracking-[0.12em] text-[var(--s-grey)]">
                        {stat.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={100}>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--s-surface)] lg:aspect-[4/3]">
                    <Image
                      src={traderMedia.founder.src}
                      alt={traderMedia.founder.alt}
                      fill
                      sizes="(min-width: 1024px) 38vw, 47vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--s-surface)] lg:aspect-[16/9]">
                    <Image
                      src={traderMedia.lifestyle.src}
                      alt={traderMedia.lifestyle.alt}
                      fill
                      sizes="(min-width: 1024px) 38vw, 47vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </SampleSection>

          {/* --- Help / FAQ ------------------------------------------------- */}
          <SampleSection id="help" tone="surface" className="scroll-mt-20">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <Reveal>
                <SampleEyebrow>{trader.help.eyebrow}</SampleEyebrow>
                <h2 className={`${heading} mt-3`}>{trader.help.heading}</h2>
                <p className="mt-4 max-w-sm leading-[1.7] text-[var(--s-grey)]">
                  {trader.help.sub}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <SampleButton
                    href={trader.help.whatsappHref}
                    external
                    size="sm"
                  >
                    {trader.help.whatsappLabel}
                  </SampleButton>
                  <SampleButton data-open-chat variant="outline" size="sm">
                    Ask the assistant
                  </SampleButton>
                </div>

                <dl className="mt-8 space-y-2 text-[0.875rem]">
                  <div className="flex gap-3">
                    <dt className="w-16 shrink-0 text-[var(--s-grey)]">Phone</dt>
                    <dd>
                      <a
                        href={trader.help.phoneHref}
                        className="underline underline-offset-4 hover:opacity-70"
                      >
                        {trader.help.phoneLabel}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-16 shrink-0 text-[var(--s-grey)]">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${trader.help.email}`}
                        className="underline underline-offset-4 hover:opacity-70"
                      >
                        {trader.help.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal delay={100}>
                <dl className="divide-y divide-[var(--s-hair)] border-y border-[var(--s-hair)]">
                  {trader.help.faqs.map((faq) => (
                    <div key={faq.q} className="py-5">
                      <dt className="s-display text-[0.9375rem] font-semibold">
                        {faq.q}
                      </dt>
                      <dd className="mt-2 max-w-xl text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                        {faq.a}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </SampleSection>

          {/* --- Closing CTA ------------------------------------------------ */}
          <SampleSection size="tight">
            <Reveal>
              <div className="bg-[var(--s-ink)] px-6 py-14 text-center sm:px-12">
                <h2 className="s-display mx-auto max-w-xl text-[1.625rem] font-semibold leading-[1.25] text-[var(--s-bg)] sm:text-[2rem]">
                  {trader.bottomCta.heading}
                </h2>
                <p className="mx-auto mt-4 max-w-md text-[var(--s-bg)]/70">
                  {trader.bottomCta.body}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <SampleButton
                    href={trader.help.whatsappHref}
                    external
                    variant="accent"
                  >
                    {trader.bottomCta.cta}
                  </SampleButton>
                  <SampleButton data-open-chat variant="solid">
                    {trader.hero.chatCta}
                  </SampleButton>
                </div>
              </div>
            </Reveal>
          </SampleSection>
        </main>

        <SampleFooter
          brand="Nilaya Home"
          blurb={trader.footer.blurb}
          legal={trader.footer.legal}
          variant="compact"
          columns={[
            {
              title: "Shop",
              items: [
                { label: "All products", href: "#shop" },
                { label: "After you order", href: "#flow" },
                { label: "About Nilaya", href: "#about" },
              ],
            },
            {
              title: "Help",
              items: [
                { label: trader.help.email, href: `mailto:${trader.help.email}` },
                { label: trader.help.phoneLabel, href: trader.help.phoneHref },
                { label: "Shipping & returns", href: "#help" },
              ],
            },
          ]}
        />

        <ChatWidget persona={personas.trader} />
      </StoreProvider>
    </SampleFrame>
  );
}

function Tick() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4 shrink-0 text-[var(--s-primary)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8.5 6.2 11.7 13 5" />
    </svg>
  );
}
