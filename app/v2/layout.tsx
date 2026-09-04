import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coreline — redesign concepts",
  robots: { index: false, follow: false },
};

/**
 * Concept namespace. Each concept below carries its own palette, typefaces and
 * chrome, so nothing here imposes a house style — the point is that the three
 * look like three different studios pitched them.
 */
export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex-1">{children}</div>;
}
