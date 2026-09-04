import Image from "next/image";
import Link from "next/link";
import { workPage, type WorkSample } from "@/lib/content";

export function WorkCard({ sample }: { sample: WorkSample }) {
  return (
    <Link
      href={sample.href}
      className="group flex h-full flex-col border border-hairline transition-transform duration-200 ease-out hover:-translate-y-[3px]"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-hairline bg-card">
        <div className="work-media-wipe absolute inset-0">
          <Image
            src={sample.image.src}
            alt={sample.image.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <span className="absolute inset-x-0 bottom-0 z-10 bg-ink px-6 py-3 font-mono text-label uppercase text-paper">
          {workPage.cardLink}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-8">
        <p className="font-mono text-label uppercase text-grey">
          {sample.industry}
        </p>
        <h3 className="mt-4 font-display text-h3 font-semibold">{sample.name}</h3>
        <p className="mt-3 flex-1 text-small text-grey">
          {sample.summary}
        </p>
        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-label uppercase text-grey">
          {sample.tags.map((tag, index) => (
            <span key={tag} className="flex items-center gap-3">
              {index > 0 && (
                <span className="size-1 rounded-full bg-hairline" aria-hidden="true" />
              )}
              {tag}
            </span>
          ))}
        </p>
      </div>
    </Link>
  );
}
