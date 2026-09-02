/**
 * The small icon set that gives the assistant's chips and prompts a warmer,
 * more human feel than plain text buttons.
 *
 * Kept as one file, mapped by string key rather than imported directly into
 * lib/chat/flow.ts - that file is deliberately framework-free ("pure and
 * framework-free so the questions can be read, argued with and edited
 * without opening a component"), so a Vertical or option only ever carries an
 * `icon: "clinic"` key. This file is the one place that turns a key into a
 * component.
 *
 * Drawn in the same voice as the rest of the widget's glyphs (WhatsAppIcon,
 * SendIcon, CloseIcon in SiteAssistant.tsx): 16x16, 1.5 stroke, currentColor,
 * no fills except the odd solid accent dot - so a new icon dropped in here
 * should look like it always belonged.
 */

import type { IconKey } from "@/lib/chat/flow";

type IconProps = { className?: string };

const base = "size-4 shrink-0";

function Svg({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className ?? base}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Verticals                                                                   */
/* -------------------------------------------------------------------------- */

function ClinicIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 3v10M3 8h10" />
    </Svg>
  );
}

function ShopIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 6.5 4 2.5h8l1 4M3 6.5h10v6.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6.5Z" />
      <path d="M6 6.5v1.5a2 2 0 0 0 4 0V6.5" />
    </Svg>
  );
}

function GymIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2 8h1.5M12.5 8H14M4 8h8" />
      <rect x="1.2" y="6" width="2" height="4" rx="0.5" />
      <rect x="12.8" y="6" width="2" height="4" rx="0.5" />
    </Svg>
  );
}

function CoachingIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.5 4c1.5-1 4-1 5.5 0v8c-1.5-1-4-1-5.5 0V4Z" />
      <path d="M13.5 4c-1.5-1-4-1-5.5 0v8c1.5-1 4-1 5.5 0V4Z" />
    </Svg>
  );
}

function JewellerIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 3h7l2 3.5-6.5 7-6.5-7 2-3.5Z" />
      <path d="M4.5 3 8 6.5 11.5 3M2 6.5h12" />
    </Svg>
  );
}

function CaIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 2.5h7l3 3V13a.5.5 0 0 1-.5.5h-9A.5.5 0 0 1 3 13V2.5Z" />
      <path d="M6 8h4M6 10.5h4" />
    </Svg>
  );
}

function RealtyIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.5 7.5 8 3l5.5 4.5" />
      <path d="M4 6.5V13h8V6.5" />
    </Svg>
  );
}

function InteriorIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.5 13V6l5.5-3.5L13.5 6v7" />
      <path d="M6 13V9h4v4" />
    </Svg>
  );
}

function SchoolIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 3 14 6l-6 3-6-3 6-3Z" />
      <path d="M4.5 7.5V11c0 .8 1.6 1.5 3.5 1.5s3.5-.7 3.5-1.5V7.5" />
    </Svg>
  );
}

function TravelIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2 9.5 13.5 4c.8-.4 1.4.4 1 1.1L9 13l-1.3-3.7L2 9.5Z" />
    </Svg>
  );
}

function OtherIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="4" cy="8" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="8" cy="8" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="8" r="0.9" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Website status                                                              */
/* -------------------------------------------------------------------------- */

function CircleEmptyIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="8" cy="8" r="5" />
    </Svg>
  );
}

function CircleDashIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="8" cy="8" r="5" />
      <path d="M6 8h4" />
    </Svg>
  );
}

function CircleCheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="8" cy="8" r="5" />
      <path d="M6 8.2 7.3 9.5 10.2 6.5" />
    </Svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Frequency (the "how often" qualifying question)                            */
/* -------------------------------------------------------------------------- */

function BarsHighIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 10v2M8 6v6M12 3v9" />
    </Svg>
  );
}

function BarsMidIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 10v2M8 6v6M12 8v4" />
    </Svg>
  );
}

function BarsLowIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 10v2M8 9v3M12 11v1" />
    </Svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Intent / timeline                                                          */
/* -------------------------------------------------------------------------- */

function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 8h9.5M9 4.5 12.5 8 9 11.5" />
    </Svg>
  );
}

function ScaleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 2.5v11M4.5 4.5h7M4.5 4.5 2.5 8.5a2 2 0 0 0 4 0L4.5 4.5ZM11.5 4.5l-2 4a2 2 0 0 0 4 0l-2-4Z" />
    </Svg>
  );
}

function CompassIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="8" cy="8" r="5.5" />
      <path d="m9.8 6.2-1 3.6-3.6 1 1-3.6 3.6-1Z" />
    </Svg>
  );
}

/* -------------------------------------------------------------------------- */
/* People, contact and misc                                                    */
/* -------------------------------------------------------------------------- */

function PersonIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="8" cy="5.3" r="2.3" />
      <path d="M3 13c.4-2.6 2.3-4 5-4s4.6 1.4 5 4" />
    </Svg>
  );
}

function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 2.5h2.2l.9 2.6L5.6 6.5c.6 1.6 1.8 2.9 3.4 3.5l1.4-1.5 2.6.9V11.6c0 .8-.7 1.4-1.5 1.3C7.5 12.4 3.6 8.5 3.1 4.6c-.1-.8.5-1.5 1.3-1.5Z" />
    </Svg>
  );
}

function SkipIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 4v8l6-4-6-4ZM10.5 4v8" />
    </Svg>
  );
}

function QuestionIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M6.3 6.3a1.8 1.8 0 1 1 2.6 1.6c-.6.3-.9.7-.9 1.3v.3" />
      <circle cx="8" cy="11.1" r="0.15" fill="currentColor" />
    </Svg>
  );
}

function ImagesIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="3.5" width="9" height="8" rx="1" />
      <circle cx="5.3" cy="6" r="0.8" fill="currentColor" stroke="none" />
      <path d="m4 11 2.5-2.8L8.5 10l1.5-1.8 2 2.3" />
    </Svg>
  );
}

function RupeeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 3.5h6M5 6.5h6M5 3.5c2 0 3 .8 3 1.9S7 7.3 5 7.3h-.4L9.5 12.5" />
    </Svg>
  );
}

function SparkleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 2.5 9.1 6 12.5 7.2 9.1 8.4 8 12 6.9 8.4 3.5 7.2 6.9 6 8 2.5Z" />
    </Svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Lookup                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * The `Record<IconKey, …>` annotation is load-bearing: it makes a key added to
 * IconKey in lib/chat/flow.ts without a matching glyph here a type error
 * instead of a silently blank chip.
 */
export const chatIcons: Record<IconKey, React.ComponentType<IconProps>> = {
  clinic: ClinicIcon,
  shop: ShopIcon,
  gym: GymIcon,
  coaching: CoachingIcon,
  jeweller: JewellerIcon,
  ca: CaIcon,
  realty: RealtyIcon,
  interior: InteriorIcon,
  school: SchoolIcon,
  travel: TravelIcon,
  other: OtherIcon,

  websiteNone: CircleEmptyIcon,
  websiteDead: CircleDashIcon,
  websiteFine: CircleCheckIcon,

  frequencyHigh: BarsHighIcon,
  frequencyMid: BarsMidIcon,
  frequencyLow: BarsLowIcon,

  intentReady: ArrowRightIcon,
  intentWeighing: ScaleIcon,
  intentExploring: CompassIcon,

  person: PersonIcon,
  phone: PhoneIcon,
  skip: SkipIcon,
  question: QuestionIcon,
  images: ImagesIcon,
  rupee: RupeeIcon,
  sparkle: SparkleIcon,
};
