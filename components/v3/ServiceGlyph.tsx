import type { ServiceId } from "@/lib/site-content";

/** Large watermark glyphs for service detail cards. Stroke-only, decorative. */
export function ServiceGlyph({ id, className }: { id: ServiceId; className?: string }) {
  const common = {
    viewBox: "0 0 120 120",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 3.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true as const,
  };

  switch (id) {
    case "websites":
      return (
        <svg {...common}>
          <rect x="18" y="28" width="84" height="58" rx="4" />
          <path d="M18 42h84M40 86v8M80 86v8M48 94h24" />
        </svg>
      );
    case "ai-agents":
      return (
        <svg {...common}>
          <path d="M28 70c0-18 14-32 32-32s32 14 32 32" />
          <circle cx="46" cy="58" r="4" fill="currentColor" stroke="none" />
          <circle cx="74" cy="58" r="4" fill="currentColor" stroke="none" />
          <path d="M40 78h40M60 28v10" />
        </svg>
      );
    case "automations":
      return (
        <svg {...common}>
          <path d="M36 40h48v40H36z" />
          <path d="M48 52h24M48 64h16M36 40l12-12h24l12 12" />
        </svg>
      );
    case "local-search":
      return (
        <svg {...common}>
          <circle cx="52" cy="52" r="22" />
          <path d="M68 68l22 22" />
          <circle cx="52" cy="52" r="6" />
        </svg>
      );
    case "apps":
      return (
        <svg {...common}>
          <rect x="38" y="18" width="44" height="84" rx="8" />
          <path d="M50 28h20M54 90h12" />
        </svg>
      );
    case "crm-software":
      return (
        <svg {...common}>
          <path d="M24 78V42l36-16 36 16v36l-36 16-36-16z" />
          <path d="M60 26v68M24 42l36 16 36-16" />
        </svg>
      );
    case "branding":
      return (
        <svg {...common}>
          <path d="M30 82L60 22l30 60H30z" />
          <path d="M44 62h32" />
        </svg>
      );
    case "social-content":
      return (
        <svg {...common}>
          <rect x="22" y="30" width="50" height="60" rx="4" />
          <path d="M72 42h26v48H72" />
          <path d="M34 48h26M34 60h20" />
        </svg>
      );
    default:
      return null;
  }
}
