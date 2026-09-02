import Link from "next/link";
import { Logo } from "@/components/Logo";
import { WhatsAppAnchor } from "@/components/WhatsAppLink";
import { Container } from "@/components/ui/Container";
import { legalNav, nav, site } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline" itemScope itemType="https://schema.org/Organization">
      <Container>
        <div className="flex flex-col gap-10 py-16 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <Logo size="md" />
            <p className="font-mono text-label uppercase text-grey" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="streetAddress">{site.location}</span>
              {" · "}
              <span itemProp="addressRegion">{site.region}</span>
            </p>
            <meta itemProp="name" content={site.legalName} />
            <meta itemProp="url" content={site.url} />
            <meta itemProp="telephone" content={site.phone} />
            <meta itemProp="email" content={site.email} />
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div className="flex flex-col gap-3">
              <p className="font-mono text-label uppercase text-grey">Reach me</p>
              <WhatsAppAnchor className="font-display text-sm font-medium transition-colors duration-150 ease-linear hover:text-accent">
                WhatsApp
              </WhatsAppAnchor>
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
              {legalNav.map((item) => (
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
            Websites that bring you customers
          </p>
        </div>
      </Container>
    </footer>
  );
}
