"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { SampleButton } from "@/components/samples/SampleButton";

export type SampleNavLink = { label: string; href: string };

function NavAnchor({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

/**
 * Shared header for the sample sites. Colour, radius and type all come from the
 * active palette, so one component covers nine very different-looking navs.
 *
 * `overlay` starts the bar transparent over a full-bleed hero photo and swaps it
 * to a solid bar once the page scrolls.
 * `soft` uses a soft shadow on scroll instead of a hard border (clinic calm).
 */
export function SampleNav({
  brand,
  brandNote,
  links,
  cta,
  homeHref = "#top",
  overlay = false,
  soft = false,
  extra,
}: {
  brand: string;
  brandNote?: string;
  links: SampleNavLink[];
  cta?: { label: string; href: string };
  /** Brand mark destination - use a route for multi-page samples. */
  homeHref?: string;
  overlay?: boolean;
  soft?: boolean;
  extra?: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  const floating = overlay && !scrolled && !open;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        floating
          ? "bg-transparent text-white"
          : soft
            ? cn(
                "bg-[var(--s-bg)]/95 text-[var(--s-ink)] backdrop-blur",
                scrolled && "shadow-[0_4px_20px_rgba(0,0,0,0.05)]",
              )
            : "border-b border-[var(--s-hair)] bg-[var(--s-bg)]/95 text-[var(--s-ink)] backdrop-blur",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <NavAnchor href={homeHref} className="group flex flex-col leading-none">
          <span className="s-display text-lg font-semibold tracking-tight">
            {brand}
          </span>
          {brandNote && (
            <span
              className={cn(
                "mt-1 text-[0.625rem] uppercase tracking-[0.22em]",
                floating ? "text-white/70" : "text-[var(--s-grey)]",
              )}
            >
              {brandNote}
            </span>
          )}
        </NavAnchor>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavAnchor
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-opacity hover:opacity-70",
                floating ? "text-white" : "text-[var(--s-ink)]",
              )}
            >
              {link.label}
            </NavAnchor>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {extra}
          {cta && (
            <SampleButton
              href={cta.href}
              external={/^https?:|^tel:|^mailto:/i.test(cta.href)}
              size="sm"
              variant={floating ? "accent" : "primary"}
              className="hidden sm:inline-flex"
            >
              {cta.label}
            </SampleButton>
          )}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="sample-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="flex size-9 items-center justify-center md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 h-px w-5 bg-current transition-transform duration-200",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-5 bg-current transition-transform duration-200",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="sample-menu"
          className="border-t border-[var(--s-hair)] bg-[var(--s-bg)] px-5 pb-6 pt-2 text-[var(--s-ink)] sm:px-8 md:hidden"
        >
          <nav className="flex flex-col">
            {links.map((link) => (
              <NavAnchor
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--s-hair)] py-3.5 text-sm"
              >
                {link.label}
              </NavAnchor>
            ))}
          </nav>
          {cta && (
            <SampleButton
              href={cta.href}
              external={/^https?:|^tel:|^mailto:/i.test(cta.href)}
              className="mt-5 w-full"
            >
              {cta.label}
            </SampleButton>
          )}
        </div>
      )}
    </header>
  );
}
