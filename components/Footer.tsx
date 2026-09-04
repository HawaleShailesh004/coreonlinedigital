import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import { CallIcon, WhatsAppIcon } from "@/components/v3/icons";
import { legalNav, nav, site, whatsappHref } from "@/lib/site-content";

const linkClass = "v3-display text-sm font-semibold opacity-80 transition-opacity hover:opacity-100";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="v3-hairline-t relative z-10" itemScope itemType="https://schema.org/Organization" style={{ backgroundColor: "var(--ink)" }}>
      <div className="v3-container">
        <div className="flex flex-col gap-10 py-16 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark className="size-7 text-[var(--emerald)]" />
              <span className="v3-display text-lg">{site.name}</span>
            </Link>
            <p className="text-sm uppercase tracking-[0.08em] text-[var(--muted)]" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="streetAddress">{site.location}</span>
              {", "}
              <span itemProp="addressRegion">{site.region}</span>
            </p>
            <meta itemProp="name" content={site.name} />
            <meta itemProp="url" content={site.url} />
            <meta itemProp="telephone" content={site.phone} />
            <meta itemProp="email" content={site.email} />
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">Talk to us</p>
              <a href={whatsappHref("the footer")} target="_blank" rel="noreferrer noopener" className={`inline-flex items-center gap-2.5 ${linkClass}`}>
                <WhatsAppIcon className="size-4" />
                WhatsApp us
              </a>
              <a href={site.phoneHref} className={`inline-flex items-center gap-2.5 ${linkClass}`}>
                <CallIcon className="size-4" />
                {site.phone}
              </a>
              <a href={site.emailHref} className={linkClass}>
                {site.email}
              </a>
              <div className="flex gap-4 pt-1">
                <a href={site.socials.instagram} target="_blank" rel="noreferrer noopener" className={linkClass}>
                  Instagram
                </a>
                <a href={site.socials.linkedin} target="_blank" rel="noreferrer noopener" className={linkClass}>
                  LinkedIn
                </a>
              </div>
            </div>

            <nav aria-label="Footer" className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">Pages</p>
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ))}
              {legalNav.map((item) => (
                <Link key={item.href} href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="v3-hairline-t flex flex-col gap-2 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
            © {year} {site.name}
          </p>
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
            Websites, AI agents and automations for Thane &amp; Mumbai
          </p>
        </div>
      </div>
    </footer>
  );
}
