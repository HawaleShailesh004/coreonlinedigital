import Image from "next/image";
import Link from "next/link";
import type { DemoEntry } from "@/lib/site-content";

export function DemoCard({ demo }: { demo: DemoEntry }) {
  const content = (
    <>
      <div className="v3-bracket relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: "var(--surface)" }}>
        <Image
          src={demo.mockup}
          alt={`${demo.business} - ${demo.trade} demo site`}
          fill
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <span
          className="absolute left-3 top-3 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]"
          style={
            demo.status === "Live"
              ? { backgroundColor: "var(--emerald)", color: "var(--emerald-ink)" }
              : { backgroundColor: "rgba(6, 10, 8, 0.82)", color: "#efede6" }
          }
        >
          {demo.status}
        </span>
      </div>
      <div className="mt-3">
        <p className="text-xs uppercase tracking-[0.1em] opacity-50">{demo.trade}</p>
        <p className="v3-display mt-1 text-lg font-semibold">{demo.business}</p>
        <p className="mt-1 text-sm opacity-70">{demo.tagline}</p>
      </div>
    </>
  );

  if (!demo.demoHref) {
    return <div className="group">{content}</div>;
  }

  return (
    <Link href={demo.demoHref} target="_blank" rel="noopener noreferrer" className="group block">
      {content}
    </Link>
  );
}
