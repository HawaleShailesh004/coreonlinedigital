import Link from "next/link";
import { notFound } from "next/navigation";
import { getConversation } from "@/lib/conversationStore";

export const dynamic = "force-dynamic";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-hairline py-3">
      <dt className="font-mono text-label uppercase text-grey">{label}</dt>
      <dd className="mt-1 text-[0.9375rem] text-body">{value || "-"}</dd>
    </div>
  );
}

export default async function AdminConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const conversation = await getConversation(id);
  if (!conversation) notFound();

  const whatsappHref = conversation.phone
    ? `https://wa.me/91${conversation.phone}`
    : null;

  return (
    <div>
      <Link href="/admin" className="font-mono text-label uppercase text-grey hover:text-accent">
        ← All conversations
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <h1 className="font-display text-h3 font-semibold">
          {conversation.name || "Name not given"}
        </h1>
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
            className="bg-accent px-5 py-2.5 font-display text-sm font-medium text-paper hover:opacity-85"
          >
            Open on WhatsApp
          </a>
        )}
      </div>

      <dl className="mt-8 grid gap-x-8 sm:grid-cols-2">
        <Field
          label="Phone"
          value={conversation.phone ? `+91 ${conversation.phone.slice(0, 5)} ${conversation.phone.slice(5)}` : ""}
        />
        <Field label="Business" value={conversation.business} />
        <Field label="Vertical" value={conversation.vertical} />
        <Field label="Website today" value={conversation.website} />
        <Field label="Where they're losing customers" value={conversation.problem} />
        <Field label="How often" value={conversation.frequency} />
        <Field label="Path" value={conversation.path} />
        <Field label="Goal" value={conversation.goal} />
        <Field label="Obstacle" value={conversation.obstacle} />
        <Field label="Fit" value={conversation.fit} />
        <Field
          label="Status"
          value={conversation.hasPhone ? "Hot lead" : conversation.completed ? "Completed, no number" : "In progress / left mid-chat"}
        />
      </dl>

      <p className="mt-10 font-mono text-label uppercase text-grey">Full transcript</p>
      <pre className="mt-3 whitespace-pre-wrap border border-hairline bg-card p-5 text-[0.8125rem] leading-relaxed text-body">
        {conversation.transcript || "No transcript recorded."}
      </pre>
    </div>
  );
}
