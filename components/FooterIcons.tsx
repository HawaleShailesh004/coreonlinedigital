/**
 * Footer contact and profile marks. Same drawing voice as the rest of the
 * site glyphs: 16×16, currentColor, no decorative fills except WhatsApp,
 * which has to be the filled bubble or people don't read it as WhatsApp.
 */

type IconProps = { className?: string };

const box = "size-4 shrink-0";

function Svg({
  className,
  filled = false,
  children,
}: {
  className?: string;
  filled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className ?? box}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={filled ? undefined : "1.5"}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={props.className ?? box}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3Z" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 2.5h2.2l.9 2.6L5.6 6.5c.6 1.6 1.8 2.9 3.4 3.5l1.4-1.5 2.6.9V11.6c0 .8-.7 1.4-1.5 1.3C7.5 12.4 3.6 8.5 3.1 4.6c-.1-.8.5-1.5 1.3-1.5Z" />
    </Svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2" y="3.5" width="12" height="9" rx="1" />
      <path d="m2.5 5 5.5 4 5.5-4" />
    </Svg>
  );
}

export function GoogleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 5.2v5.6M8 8h4.2" />
    </Svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="2.5" width="11" height="11" rx="1" />
      <path d="M5.2 7.2V11M5.2 5.15v.01M8.2 11V8.4c0-.8.6-1.4 1.4-1.4s1.4.6 1.4 1.4V11" />
    </Svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="2.5" width="11" height="11" rx="2.5" />
      <circle cx="8" cy="8" r="2.4" />
      <circle cx="11.2" cy="4.8" r="0.4" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export const profileIcons: Record<
  string,
  React.ComponentType<IconProps>
> = {
  Google: GoogleIcon,
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
};
