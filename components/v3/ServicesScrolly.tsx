"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { services, type ServiceId } from "@/lib/site-content";
import { ServiceGlyph } from "@/components/v3/ServiceGlyph";

/**
 * Sticky index + stacked detail cards (brief §10.3).
 * Desktop: left index pinned; right column cards stick and stack with a
 * large watermark glyph. Mobile: chip rail under the nav.
 */
export function ServicesScrolly() {
  const [active, setActive] = useState<string>(services[0].id);
  const refs = useRef<Record<string, HTMLElement>>({});
  const chipRailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-service-id");
            if (id) setActive(id);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    Object.values(refs.current).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const rail = chipRailRef.current;
    if (!rail) return;
    const chip = rail.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    chip?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  return (
    <div className="v3-container grid gap-8 py-16 sm:py-24 lg:grid-cols-[220px_1fr] lg:gap-14">
      <div className="hidden lg:block">
        <ul className="sticky top-[calc(var(--v3-nav-h)+1.5rem)] flex flex-col gap-1">
          {services.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={cn(
                  "v3-display relative block py-2 pl-4 text-[0.95rem] transition-colors",
                  active === s.id ? "opacity-100" : "opacity-40 hover:opacity-70",
                )}
                style={active === s.id ? { color: "var(--emerald)" } : undefined}
              >
                <span
                  className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 origin-left transition-transform duration-300"
                  style={{
                    backgroundColor: "var(--emerald)",
                    transform: `translateY(-50%) scaleX(${active === s.id ? 1 : 0})`,
                  }}
                />
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={chipRailRef}
        className="v3-hairline-b sticky top-20 z-30 -mx-[var(--v3-gutter)] overflow-x-auto px-[var(--v3-gutter)] py-3 lg:hidden"
        style={{ backgroundColor: "rgba(6, 10, 8, 0.94)", backdropFilter: "blur(10px)" }}
      >
        <div className="flex w-max gap-2">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              data-chip={s.id}
              className="v3-pill v3-pill--outline px-3! py-1.5! whitespace-nowrap text-xs"
              style={
                active === s.id
                  ? { borderColor: "var(--emerald)", color: "var(--emerald)" }
                  : undefined
              }
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:gap-10">
        {services.map((s, i) => (
          <article
            key={s.id}
            id={s.id}
            data-service-id={s.id}
            ref={(el) => {
              if (el) refs.current[s.id] = el;
            }}
            className="v3-service-card scroll-mt-28"
            style={{ zIndex: i + 1 }}
          >
            <ServiceGlyph id={s.id as ServiceId} className="v3-service-card__icon" />
            <div className="v3-service-card__body">
              <p className="text-xs uppercase tracking-[0.14em] opacity-45">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="v3-display mt-2 text-2xl sm:text-[1.85rem]">{s.name}</h2>
              <p className="mt-3 max-w-lg text-base opacity-80 sm:text-lg">{s.hubPromise}</p>
              <div className="mt-6 max-w-lg">
                {s.included.map((line) => (
                  <p key={line} className="v3-hairline-t py-3 text-sm opacity-70">
                    {line}
                  </p>
                ))}
              </div>
              <p className="mt-6 text-sm opacity-60">
                <span style={{ color: "var(--emerald)" }}>For:</span> {s.forWhom}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
