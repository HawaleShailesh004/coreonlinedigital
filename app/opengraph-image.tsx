import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

/**
 * The preview card for every link Shailesh sends.
 *
 * This matters more here than on most sites: the primary distribution channel
 * is a WhatsApp message with a link in it, and until now that link previewed as
 * nothing at all. The card carries the same three facts as the hero trust line,
 * so the price and the date land before the page even opens.
 *
 * Drawn rather than served as a static file so it can never drift from the
 * numbers in lib/content.ts.
 */

export const alt = `${site.legalName} - ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0c1210";
const PAPER = "#f6f7f5";
const ACCENT = "#2c7a63";
const GREY = "#8b9691";

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
          color: PAPER,
          padding: 72,
          // System sans rather than a fetched webfont: the OG route runs on
          // every social crawl, and a font fetch is a failure mode that turns
          // the whole card blank.
          fontFamily: "sans-serif",
        }}
      >
        {/* The line-and-node mark, drawn with divs - the OG renderer supports
            only a subset of CSS, and this motif needs nothing more. */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 88, height: 8, alignItems: "center" }}>
            <div style={{ width: 10, height: 10, borderRadius: 10, background: ACCENT }} />
            <div style={{ width: 60, height: 1, background: "rgba(246,247,245,0.35)" }} />
            <div style={{ width: 14, height: 14, borderRadius: 14, background: ACCENT }} />
          </div>
          {/* display:flex is required, not cosmetic: the OG renderer refuses
              any element with more than one child that does not declare it. */}
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            coreline<span style={{ color: ACCENT }}>.</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 74,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -2,
            }}
          >
            <span>You&apos;re losing customers</span>
            <span>you never even see.</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 27, color: GREY, maxWidth: 760 }}>
            Websites for Thane businesses that bring you customers.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: "100%", height: 1, background: "rgba(246,247,245,0.16)" }} />
          <div style={{ display: "flex", gap: 64, marginTop: 26, fontSize: 22 }}>
            {[`From ${site.priceFrom}`, site.deliveryShort, site.paymentShort].map(
              (fact) => (
                <div key={fact} style={{ display: "flex", color: PAPER }}>
                  {fact}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
