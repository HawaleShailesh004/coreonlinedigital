export function StepRow({ index, title, body }: { index: number; title: string; body?: string }) {
  return (
    <div className="v3-hairline-t flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:gap-8">
      <span className="v3-display text-sm opacity-50">{String(index + 1).padStart(2, "0")}</span>
      <div>
        <p className="v3-display text-xl">{title}</p>
        {body && <p className="mt-1 max-w-md text-sm opacity-70">{body}</p>}
      </div>
    </div>
  );
}
