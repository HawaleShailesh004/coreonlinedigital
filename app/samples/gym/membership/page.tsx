import type { Metadata } from "next";
import { CountUp } from "@/components/samples/CountUp";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { gym, type MembershipPlan } from "@/lib/samples/gym";

export const metadata: Metadata = {
  title: "Membership · Forge Strength Co.",
  description:
    "Basic, Standard and Premium membership plans at Forge Strength Co. in Thane - transparent monthly pricing, no joining fee.",
};

const heading =
  "s-display text-[2rem] uppercase leading-[0.95] tracking-[0.01em] sm:text-[2.75rem]";

export default function GymMembershipPage() {
  return (
    <main id="main">
      <SampleSection size="tight">
        <Reveal>
          <SampleEyebrow tone="accent">{gym.membership.eyebrow}</SampleEyebrow>
          <h1 className={`${heading} mt-4 max-w-2xl`}>
            {gym.membership.heading}
          </h1>
          <p className="mt-4 max-w-lg text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
            {gym.membership.sub}
          </p>
        </Reveal>

        <PricingTable plans={gym.membership.plans} />

        <Reveal delay={240}>
          <p className="s-mono mt-8 text-[0.75rem] uppercase tracking-[0.1em] text-[var(--s-grey)]">
            {gym.membership.note}
          </p>
        </Reveal>
      </SampleSection>

      <SampleSection bordered size="tight">
        <Reveal>
          <SampleEyebrow tone="accent">FAQ</SampleEyebrow>
          <h2 className={`${heading} mt-4`}>Before you join.</h2>
        </Reveal>

        <div className="mt-10 divide-y divide-[var(--s-hair)] border-y border-[var(--s-hair)]">
          {gym.membership.faq.map((item, index) => (
            <Reveal key={item.question} delay={index * 60}>
              <div className="grid gap-3 py-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12">
                <p className="s-display text-[1.05rem] uppercase leading-snug tracking-[0.02em]">
                  {item.question}
                </p>
                <p className="text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                  {item.answer}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <SampleButton href="/samples/gym/contact" className="s-pulse">
              Start with a free trial
            </SampleButton>
            <button
              type="button"
              data-open-chat
              className="s-mono text-[0.75rem] uppercase tracking-[0.12em] text-[var(--s-accent)] underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Ask about membership
            </button>
          </div>
        </Reveal>
      </SampleSection>
    </main>
  );
}

function PricingTable({ plans }: { plans: MembershipPlan[] }) {
  return (
    <div className="mt-12 grid gap-4 lg:grid-cols-3">
      {plans.map((plan, index) => (
        <Reveal key={plan.name} delay={index * 80}>
          <article
            className={
              plan.featured
                ? "relative h-full border-2 border-[var(--s-primary)] bg-[#171313] p-7 lg:-mt-4 lg:pb-11"
                : "h-full border border-[var(--s-hair)] bg-[#161616] p-7"
            }
          >
            {plan.featured && (
              <span className="absolute -top-3 left-7 bg-[var(--s-accent)] px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-[var(--s-on-accent)]">
                Most popular
              </span>
            )}

            <h2 className="s-display text-lg uppercase tracking-[0.06em] text-[var(--s-grey)]">
              {plan.name}
            </h2>

            <p className="mt-3 flex items-baseline gap-1.5">
              <CountUp
                value={plan.price}
                prefix="₹"
                className="s-display text-[2.75rem] leading-none text-[var(--s-ink)]"
              />
              <span className="text-xs uppercase tracking-[0.12em] text-[var(--s-grey)]">
                {plan.cadence}
              </span>
            </p>

            <p className="mt-4 text-[0.875rem] leading-[1.6] text-[var(--s-grey)]">
              {plan.summary}
            </p>

            <ul className="mt-6 space-y-3 border-t border-[var(--s-hair)] pt-6">
              {plan.includes.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-[0.875rem] leading-[1.55] text-[var(--s-ink)]"
                >
                  <Tick />
                  {item}
                </li>
              ))}
            </ul>

            <SampleButton
              href="/samples/gym/contact"
              variant={plan.featured ? "primary" : "outline"}
              className="mt-7 w-full"
            >
              Start with a free trial
            </SampleButton>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

function Tick() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="mt-[0.3rem] size-3.5 shrink-0 text-[var(--s-accent)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8.5 6.2 11.7 13 5" />
    </svg>
  );
}
