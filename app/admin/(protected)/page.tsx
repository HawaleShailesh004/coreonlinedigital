import Link from "next/link";
import { listConversations, type Conversation } from "@/lib/conversationStore";

export const dynamic = "force-dynamic";

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(diffMs / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

/**
 * hasPhone beats everything else - it is the one signal that turns a visitor
 * into a lead someone can actually call. "Completed" without a number still
 * matters (they went through the whole flow and chose not to leave one,
 * which is itself information), and anything neither complete nor recently
 * touched is a conversation that trailed off - still worth reading, since a
 * question the bot fumbled shows up here just as much as one it handled well.
 */
function status(c: Conversation): { label: string; tone: string } {
  if (c.hasPhone) return { label: "Hot lead", tone: "bg-accent text-paper" };
  if (c.completed) return { label: "No number left", tone: "border border-hairline text-grey" };
  const ageMinutes = (Date.now() - new Date(c.updatedAt).getTime()) / 60_000;
  if (ageMinutes < 5) return { label: "In progress", tone: "border border-accent text-accent" };
  return { label: "Left mid-chat", tone: "border border-hairline text-grey" };
}

export default async function AdminConversationsPage() {
  const conversations = await listConversations();

  if (conversations.length === 0) {
    return (
      <p className="text-[0.9375rem] text-grey">
        No conversations yet - once someone uses the site assistant, they show up here.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] border-collapse text-left text-[0.8125rem]">
        <thead>
          <tr className="border-b border-hairline text-grey">
            <th className="py-3 pr-4 font-mono text-label uppercase font-normal">When</th>
            <th className="py-3 pr-4 font-mono text-label uppercase font-normal">Who</th>
            <th className="py-3 pr-4 font-mono text-label uppercase font-normal">Business</th>
            <th className="py-3 pr-4 font-mono text-label uppercase font-normal">Website today</th>
            <th className="py-3 pr-4 font-mono text-label uppercase font-normal">How often</th>
            <th className="py-3 pr-4 font-mono text-label uppercase font-normal">Path</th>
            <th className="py-3 pr-4 font-mono text-label uppercase font-normal">Goal</th>
            <th className="py-3 pr-4 font-mono text-label uppercase font-normal">Obstacle</th>
            <th className="py-3 pr-4 font-mono text-label uppercase font-normal">Fit</th>
            <th className="py-3 pr-4 font-mono text-label uppercase font-normal">Status</th>
          </tr>
        </thead>
        <tbody>
          {conversations.map((c) => {
            const badge = status(c);
            return (
              <tr key={c.id} className="border-b border-hairline hover:bg-card">
                <td className="py-3 pr-4 align-top">
                  <Link href={`/admin/${c.id}`} className="block hover:text-accent">
                    <span className="whitespace-nowrap">{relativeTime(c.updatedAt)}</span>
                  </Link>
                </td>
                <td className="py-3 pr-4 align-top">
                  <Link href={`/admin/${c.id}`} className="block hover:text-accent">
                    <span className="font-display font-medium">
                      {c.name || "Not given"}
                    </span>
                    {c.phone && (
                      <span className="mt-0.5 block font-mono text-[0.75rem] text-grey">
                        +91 {c.phone.slice(0, 5)} {c.phone.slice(5)}
                      </span>
                    )}
                  </Link>
                </td>
                <td className="py-3 pr-4 align-top text-body">{c.business || "-"}</td>
                <td className="py-3 pr-4 align-top text-body">{c.website || "-"}</td>
                <td className="py-3 pr-4 align-top text-body">{c.frequency || "-"}</td>
                <td className="py-3 pr-4 align-top text-body capitalize">{c.path || "-"}</td>
                <td className="py-3 pr-4 align-top text-body">{c.goal || "-"}</td>
                <td className="py-3 pr-4 align-top text-body">{c.obstacle || "-"}</td>
                <td className="py-3 pr-4 align-top text-body capitalize">{c.fit || "-"}</td>
                <td className="py-3 pr-4 align-top">
                  <span className={`inline-block px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-wide ${badge.tone}`}>
                    {badge.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
