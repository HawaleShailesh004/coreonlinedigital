"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/LogoMark";
import { WhatsAppButton } from "@/components/v3/CtaButtons";
import { cn } from "@/lib/cn";
import { nav, site } from "@/lib/site-content";

function parseRgb(color: string): [number, number, number] | null {
  const match = color.match(/rgba?\(([^)]+)\)/);
  if (!match) return null;
  const [r, g, b, a] = match[1].split(",").map((n) => parseFloat(n));
  if (a === 0) return null;
  return [r, g, b];
}

/** Walks up from the point behind the nav to find the nearest opaque background. */
function sampleBackgroundTone(x: number, y: number): "light" | "dark" {
  let node = document.elementFromPoint(x, y) as HTMLElement | null;
  while (node) {
    const rgb = parseRgb(getComputedStyle(node).backgroundColor);
    if (rgb) {
      const [r, g, b] = rgb;
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      return luminance > 150 ? "light" : "dark";
    }
    node = node.parentElement;
  }
  return "dark";
}

/**
 * Fixed nav that adapts to whatever panel sits behind it (brief §6.1) by
 * sampling the actual background luminance on scroll, rather than relying
 * on `mix-blend-mode` - see the comment in site-theme.css for why.
 */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<"light" | "dark">("dark");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const header = headerRef.current;
      if (!header) return;
      const wasVisible = header.style.visibility;
      // Hide the nav for one point-sample so elementFromPoint reads what's
      // actually behind it, not the nav itself.
      header.style.visibility = "hidden";
      const next = sampleBackgroundTone(24, 40);
      header.style.visibility = wasVisible;
      setTone(next);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const toneColor = tone === "light" ? "var(--ink)" : "var(--bone)";
  const navBg =
    tone === "light" ? "rgba(239, 237, 230, 0.92)" : "rgba(6, 10, 8, 0.92)";

  return (
    <header ref={headerRef} className="v3-nav" style={{ backgroundColor: navBg }}>
      <div className="v3-container flex h-20 items-center justify-between gap-6">
        <div className="v3-nav-invert flex flex-1 items-center gap-8" style={{ color: toneColor }}>
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <LogoMark className="size-7" />
            <span className="v3-display text-lg tracking-[-0.02em]">
              {site.name}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "v3-display text-sm font-semibold transition-opacity",
                    active ? "opacity-100" : "opacity-80 hover:opacity-100",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <WhatsAppButton context="the nav" />
          </span>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="v3-nav-invert flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
            style={{ color: toneColor }}
          >
            <span className={cn("block h-px w-5 bg-current transition-transform", open && "translate-y-[3.5px] rotate-45")} />
            <span className={cn("block h-px w-5 bg-current transition-transform", open && "-translate-y-[3.5px] -rotate-45")} />
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="md:hidden" style={{ backgroundColor: "var(--ink)" }}>
          <div className="v3-container flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="v3-hairline-b py-4 v3-display text-base font-semibold"
              >
                {item.label}
              </Link>
            ))}
            <div className="py-4">
              <WhatsAppButton context="the nav" className="w-full" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
