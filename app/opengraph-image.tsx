import { ImageResponse } from "next/og";
import { site } from "@/lib/site-content";

/**
 * The preview card for every link shared from the site - primarily WhatsApp,
 * so this is what most visitors see before the page even opens.
 *
 * Matches the homepage hero lockup (brief §12: "the homepage OG uses the
 * cut-out hero lockup") - same three lines, "IS MISSING" in solid emerald as
 * a static stand-in for the live page's drifting cut-out gradient, which
 * obviously can't animate in a still PNG.
 *
 * Drawn rather than served as a static file so it never drifts from the
 * live headline in lib/site-content.ts.
 */

export const alt = `${site.name} - websites, AI agents, automations and search for Thane and Mumbai businesses`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#060a08";
const BONE = "#efede6";
const EMERALD = "#12e68e";
const MUTED = "#868d89";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          color: BONE,
          padding: 72,
          // System sans rather than a fetched webfont: the OG route runs on
          // every social crawl, and a font fetch is a failure mode that
          // turns the whole card blank.
          fontFamily: "sans-serif",
        }}
      >
        {/* Bracket mark, drawn with borders - the OG renderer supports only
            a subset of CSS, and the mark needs nothing more. */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 40,
              height: 40,
              border: `2px solid ${EMERALD}`,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 12, height: 12, background: EMERALD }} />
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            <span>WE BUILD WHAT</span>
            <span>YOUR BUSINESS</span>
            <span style={{ color: EMERALD }}>IS MISSING</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 26, color: MUTED, maxWidth: 760 }}>
            Websites, AI agents, automations and search - one team for Thane and Mumbai.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
