import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui/Container";
import { nav, site } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline">
      <Container>
        <div className="flex flex-col gap-10 py-16 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <Logo size="md" />
            <p className="font-mono text-label uppercase text-grey">
              {site.location} · {site.region}
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div className="flex flex-col gap-3">
              <p className="font-mono text-label uppercase text-grey">Reach us</p>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="font-display text-sm font-medium transition-colors duration-150 ease-linear hover:text-accent"
              >
                WhatsApp
              </a>
              <a
                href={site.phoneHref}
                className="font-display text-sm font-medium transition-colors duration-150 ease-linear hover:text-accent"
              >
                {site.phone}
              </a>
              <a
                href={site.emailHref}
                className="font-display text-sm font-medium break-all transition-colors duration-150 ease-linear hover:text-accent"
              >
                {site.email}
              </a>
            </div>

            <nav aria-label="Footer" className="flex flex-col gap-3">
              <p className="font-mono text-label uppercase text-grey">Pages</p>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-display text-sm font-medium transition-colors duration-150 ease-linear hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-hairline py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-label uppercase text-grey">
            © {year} {site.legalName}
          </p>
          <p className="font-mono text-label uppercase text-grey">
            Digital infrastructure, built to run
          </p>
        </div>
      </Container>
    </footer>
  );
}
