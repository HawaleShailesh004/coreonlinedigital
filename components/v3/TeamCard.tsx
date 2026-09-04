"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CallIcon, WhatsAppIcon } from "@/components/v3/icons";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { founderPoints, site, whatsappHref } from "@/lib/site-content";
import type { TeamMember } from "@/lib/site-content";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="v3-bracket relative aspect-[4/5] w-full overflow-hidden"
        style={{ backgroundColor: "var(--surface)" }}
      >
        {member.portrait ? (
          <Image
            src={member.portrait}
            alt={`${member.name}, ${member.discipline}`}
            fill
            className="object-cover object-[center_20%]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div
            className="flex h-full items-center justify-center px-6 text-center text-[15px] uppercase tracking-[0.12em]"
            style={{ color: "var(--muted)" }}
          >
            Portrait pending
          </div>
        )}
      </div>
      <div>
        <p className="v3-display text-lg font-semibold">{member.name}</p>
        <p className="text-sm" style={{ color: "var(--emerald)" }}>
          {member.discipline}
        </p>
        <p className="mt-2 text-sm opacity-70">{member.description}</p>
      </div>
      <ContactRow member={member} />
    </div>
  );
}

function ContactRow({ member, large = false }: { member: TeamMember; large?: boolean }) {
  const size = large ? "size-[18px]" : "size-4";
  return (
    <div className={cn("flex items-center", large ? "gap-3" : "gap-4")}>
      {large ? (
        <>
          <a href={whatsappHref("the founder section")} target="_blank" rel="noopener noreferrer" className="v3-pill v3-pill--primary">
            <WhatsAppIcon className={size} />
            WhatsApp
          </a>
          <a href={site.phoneHref} className="v3-pill v3-pill--outline">
            <CallIcon className={size} />
            Call
          </a>
        </>
      ) : (
        <>
          <a href={site.phoneHref} aria-label={`Call ${member.name}`} className="opacity-70 hover:opacity-100">
            <CallIcon className={size} />
          </a>
          <a
            href={whatsappHref(`${member.name}'s profile`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${member.name}`}
            className="opacity-70 hover:opacity-100"
          >
            <WhatsAppIcon className={size} />
          </a>
        </>
      )}
    </div>
  );
}

/**
 * Solo layout: the portrait holds still on one side while the points beside
 * it light up on the way past.
 *
 * A single card in a three-column grid reads as missing content - the whole
 * section looks like it failed to load the rest of the team. Giving the one
 * person the full width instead turns the constraint into the point: the
 * thing being sold here is that there is only one person, so the layout
 * should say that rather than apologise for it.
 *
 * Points stay lit once reached rather than tracking a single active row -
 * scrolling back up shouldn't unlight things you've already read.
 */
function FounderSpotlight({ member }: { member: TeamMember }) {
  const reducedMotion = useReducedMotion();
  const rowsRef = useRef<(HTMLLIElement | null)[]>([]);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(reducedMotion ? founderPoints.length : 0);
  const [focused, setFocused] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setLit(founderPoints.length);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.index ?? "0");
          setLit((prev) => Math.max(prev, index + 1));
        }
      },
      // A band across the middle of the screen, so a point lights as it
      // arrives at reading position rather than the moment it clips the edge.
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
    );

    for (const row of rowsRef.current) {
      if (row) observer.observe(row);
    }
    return () => observer.disconnect();
  }, [reducedMotion]);

  /*
   * The one-time "coming into focus" moment on the portrait: it starts
   * slightly soft and scaled up, and the corner marks start collapsed, as
   * though the frame is still finding him. The section arriving is what
   * triggers it, not the reading band the points use below - it should have
   * already resolved by the time you're reading, not be competing with it.
   */
  useEffect(() => {
    if (reducedMotion || !portraitRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFocused(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    observer.observe(portraitRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div
          ref={portraitRef}
          data-in={focused}
          className="v3-bracket v3-founder-portrait relative aspect-[4/5] w-full max-w-xs overflow-hidden lg:max-w-none"
          style={{ backgroundColor: "var(--surface)" }}
        >
          {member.portrait ? (
            <Image
              src={member.portrait}
              alt={`${member.name}, ${member.discipline}`}
              fill
              className="v3-founder-portrait__img object-cover object-[center_20%]"
              sizes="(min-width: 1024px) 22rem, 20rem"
            />
          ) : (
            <div
              className="flex h-full items-center justify-center px-6 text-center text-[15px] uppercase tracking-[0.12em]"
              style={{ color: "var(--muted)" }}
            >
              Portrait pending
            </div>
          )}
        </div>

        <p className="v3-display mt-5 text-xl">{member.name}</p>
        <p className="text-sm" style={{ color: "var(--emerald)" }}>
          {member.discipline}
        </p>
        <p className="mt-2 max-w-xs text-[15px] opacity-70">{member.description}</p>

        <div className="mt-6">
          <ContactRow member={member} large />
        </div>
      </div>

      <ol className="v3-founder-points">
        {founderPoints.map((point, i) => (
          <li
            key={point.title}
            data-index={i}
            ref={(node) => {
              rowsRef.current[i] = node;
            }}
            data-lit={i < lit}
            className="v3-founder-point"
          >
            <span className="v3-founder-point__num">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="v3-display text-[clamp(1.25rem,2.6vw,1.7rem)] tracking-[-0.02em]">
                {point.title}
              </p>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed opacity-70">{point.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Lays the team out from the array in lib/site-content. One person gets the
 * spotlight layout above; two or more fall back to a plain grid, so adding
 * someone later needs nothing here or on the pages that use it.
 */
export function TeamGrid({ members }: { members: readonly TeamMember[] }) {
  if (members.length === 1 && members[0]) {
    return <FounderSpotlight member={members[0]} />;
  }

  return (
    <div
      className={cn(
        "grid gap-8 sm:grid-cols-2",
        members.length === 2 ? "max-w-2xl" : "lg:grid-cols-3",
      )}
    >
      {members.map((member) => (
        <TeamCard key={member.name} member={member} />
      ))}
    </div>
  );
}
