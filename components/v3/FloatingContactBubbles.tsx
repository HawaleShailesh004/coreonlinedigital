import { site, whatsappHref, cta } from "@/lib/site-content";
import { CallIcon, WhatsAppIcon } from "@/components/v3/icons";

/** Desktop-only, persistent, bottom right (brief §5). */
export function FloatingContactBubbles() {
  return (
    <div className="v3-bubbles max-sm:hidden">
      <a href={site.phoneHref} className="v3-bubble v3-bubble--outline" aria-label={cta.secondary}>
        <CallIcon className="size-5" />
      </a>
      <a
        href={whatsappHref("the floating button")}
        target="_blank"
        rel="noopener noreferrer"
        className="v3-bubble"
        aria-label={cta.primary}
      >
        <WhatsAppIcon className="size-5" />
      </a>
    </div>
  );
}
