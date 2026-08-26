import { cn } from "@/lib/cn";

/**
 * OpenStreetMap embed. Keyless on purpose - a sample site shouldn't need a
 * Maps billing account to demo, and swapping in Google Maps later is a
 * one-line change.
 */
export function SampleMap({
  lat,
  lon,
  label,
  span = 0.008,
  dark = false,
  className,
}: {
  lat: number;
  lon: number;
  label: string;
  /** Half-width of the viewport box in degrees; smaller zooms in. */
  span?: number;
  /** Inverts the tiles so the map doesn't glare on a dark palette. */
  dark?: boolean;
  className?: string;
}) {
  const bbox = [lon - span, lat - span / 2, lon + span, lat + span / 2].join(",");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--s-radius-lg)] border border-[var(--s-hair)]",
        className,
      )}
    >
      <iframe
        title={`Map showing ${label}`}
        src={src}
        loading="lazy"
        className="h-full w-full border-0"
        style={
          dark ? { filter: "invert(1) hue-rotate(180deg) saturate(0.7)" } : undefined
        }
      />
    </div>
  );
}
