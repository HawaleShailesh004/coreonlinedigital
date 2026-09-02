import Image from "next/image";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { FinalCta } from "@/components/FinalCta";
import { WorkCard } from "@/components/WorkCard";
import { WhatsAppButton } from "@/components/WhatsAppLink";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import {
  site,
  verticalIndex,
  verticalPages,
  workSamples,
  type VerticalPage,
} from "@/lib/content";

export function VerticalLanding({ page }: { page: VerticalPage }) {
  const sample = workSamples.find((entry) => entry.slug === page.sampleSlug);
  const others = verticalPages.filter((entry) => entry.slug !== page.slug);

  return (
    <>
      <PageHeader heading={page.heading} sub={page.sub} />

      <Section bordered size="flush" className="pb-16 md:pb-24">
        <Reveal>
          <div className="relative aspect-video overflow-hidden bg-card">
            <Image
              src={page.images.hero.src}
              alt={page.images.hero.alt}
              fill
              priority
              sizes="(min-width: 1280px) 1120px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </Section>

      <Section bordered size="tight">
        <Reveal>
          <div className="grid items-start gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              {page.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mt-8 text-lead text-body first:mt-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-card md:col-span-5">
              <Image
                src={page.images.frame.src}
                alt={page.images.frame.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </Section>

      <Section bordered size="tight">
        <Reveal>
          <div className="grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <p className="font-mono text-label uppercase text-grey">
                From {site.priceFrom}
              </p>
              <p className="mt-6 max-w-md font-display text-lg font-medium">
                {verticalIndex.priceNote}
              </p>
              <WhatsAppButton className="mt-8">{site.primaryCta}</WhatsAppButton>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <p className="font-mono text-label uppercase text-grey">Includes</p>
              <ul className="mt-5 border-t border-hairline">
                {page.includes.map((item) => (
                  <li
                    key={item.title}
                    className="border-b border-hairline py-5"
                  >
                    <h3 className="font-display text-base font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-small text-body">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      {sample && (
        <Section bordered size="tight">
          <Reveal>
            <p className="font-mono text-label uppercase text-grey">
              {verticalIndex.sampleEyebrow}
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-h2 font-semibold">
              {page.sampleHeading}
            </h2>
            <p className="mt-5 max-w-2xl text-small text-body">{page.sampleNote}</p>
            <div className="mt-12 max-w-md">
              <WorkCard sample={sample} />
            </div>
            <Button href={sample.href} className="mt-8">
              {page.sampleCta}
            </Button>
          </Reveal>
        </Section>
      )}

      <Section bordered size="tight">
        <Reveal>
          <p className="font-mono text-label uppercase text-grey">Questions</p>
          <h2 className="mt-5 max-w-3xl font-display text-h2 font-semibold">
            {verticalIndex.questionsHeading}
          </h2>
          <FaqList faqs={page.faqs} />
        </Reveal>
      </Section>

      <Section bordered size="tight">
        <Reveal>
          <p className="font-mono text-label uppercase text-grey">
            {verticalIndex.eyebrow}
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-h2 font-semibold">
            {page.othersHeading}
          </h2>
          <ul className="mt-12 border-t border-hairline">
            {others.map((entry) => (
              <li key={entry.slug} className="border-b border-hairline py-6">
                <Link
                  href={entry.path}
                  className="group inline-flex items-center gap-2 font-display text-base font-medium"
                >
                  {entry.title}
                  <span className="inline-block h-px w-6 origin-left bg-accent transition-transform duration-200 ease-out group-hover:scale-x-150" />
                </Link>
                <p className="mt-2 max-w-2xl text-small text-body">{entry.sub}</p>
              </li>
            ))}
            <li className="border-b border-hairline py-6">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 font-display text-base font-medium"
              >
                {verticalIndex.allSamples}
                <span className="inline-block h-px w-6 origin-left bg-accent transition-transform duration-200 ease-out group-hover:scale-x-150" />
              </Link>
            </li>
          </ul>
        </Reveal>
      </Section>

      <FinalCta heading={page.ctaHeading} body={page.ctaBody} />
    </>
  );
}
