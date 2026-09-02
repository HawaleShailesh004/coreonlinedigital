"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { WhatsAppButton } from "@/components/WhatsAppLink";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { nav, site } from "@/lib/content";

/** Survives client-side navigation, resets on a real page load. */
let logoHasDrawn = false;

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Tracking the route the menu was opened on closes it on navigation
  // without an extra effect.
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const menuOpen = menu.open && menu.path === pathname;
  const [drawLogo] = useState(() => !logoHasDrawn);

  useEffect(() => {
    logoHasDrawn = true;
  }, []);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        frame = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-paper/90 backdrop-blur-sm",
        scrolled && "border-b border-hairline",
      )}
    >
      <Container>
        <div className="flex h-18 items-center justify-between gap-6">
          <Logo animate={drawLogo} />

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-1 font-display text-sm font-medium transition-colors duration-150 ease-linear after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-accent after:transition-transform after:duration-200 after:ease-out",
                    active
                      ? "text-accent after:scale-x-100"
                      : "text-ink hover:text-accent after:origin-left after:scale-x-0 hover:after:scale-x-100",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/*
              The wrapper carries the visibility, not the Button.

              Button's base class already sets `inline-flex`, and Tailwind
              utilities all have the same specificity - which one wins is
              decided by their order in the generated stylesheet, not by the
              order of the class attribute. So `hidden` passed through
              className silently lost, and this CTA rendered on every phone,
              wrapping onto two lines and pushing the bar to 66px tall.

              On small phones the persistent close is the bottom bar
              (WhatsApp | Ask), so this stays off until sm.
            */}
            <span className="hidden sm:block">
              <WhatsAppButton variant="ink" size="sm">
                {site.primaryCta}
              </WhatsAppButton>
            </span>

            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenu({ open: !menuOpen, path: pathname })}
              className="flex size-10 flex-col items-center justify-center gap-1.5 border border-hairline md:hidden"
            >
              <span
                className={cn(
                  "block h-px w-4 bg-ink transition-transform duration-200 ease-out",
                  menuOpen && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-4 bg-ink transition-transform duration-200 ease-out",
                  menuOpen && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </Container>

      {menuOpen && (
        <div id="mobile-nav" className="border-t border-hairline bg-paper md:hidden">
          <Container className="flex flex-col py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "border-b border-hairline py-4 font-display text-base font-medium",
                  pathname === item.href ? "text-accent" : "text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
            <WhatsAppButton variant="ink" size="md" className="mt-6 w-full">
              {site.primaryCta}
            </WhatsAppButton>
          </Container>
        </div>
      )}
    </header>
  );
}
