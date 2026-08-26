import type { Metadata } from "next";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleEyebrow } from "@/components/samples/SampleEyebrow";
import { SampleLeadForm } from "@/components/samples/SampleLeadForm";
import { SampleMap } from "@/components/samples/SampleMap";
import { SampleSection } from "@/components/samples/SampleSection";
import { Reveal } from "@/components/ui/Reveal";
import { gym } from "@/lib/samples/gym";

export const metadata: Metadata = {
  title: "Book a Free Trial · Forge Strength Co.",
  description:
    "Book a free trial session at Forge Strength Co. in Wagle Estate, Thane. No card required.",
};

const heading =
  "s-display text-[2rem] uppercase leading-[0.95] tracking-[0.01em] sm:text-[2.75rem]";

type SearchParams = Promise<{
  program?: string | string[];
  trainer?: string | string[];
}>;

function one(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function GymContactPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const programParam = one(params.program);
  const trainerParam = one(params.trainer);

  const programNames = gym.programs.items.map((p) => p.name);
  const trainerNames = gym.trainers.people.map((t) => t.name);

  const defaultProgram =
    programParam && programNames.includes(programParam)
      ? programParam
      : trainerParam
        ? "Personal Training"
        : undefined;

  const defaultTrainer =
    trainerParam && trainerNames.includes(trainerParam)
      ? trainerParam
      : undefined;

  const defaultValues: Record<string, string> = {};
  if (defaultProgram) defaultValues.program = defaultProgram;
  if (defaultTrainer) defaultValues.trainer = defaultTrainer;

  return (
    <main id="main">
      <SampleSection size="tight">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="border border-[var(--s-hair)] bg-[#161616] p-6 sm:p-8">
              <SampleEyebrow tone="accent">{gym.contact.eyebrow}</SampleEyebrow>
              <h1 className={`${heading} mt-4`}>{gym.contact.heading}</h1>
              <p className="mt-4 max-w-md text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                {gym.contact.sub}
              </p>

              {defaultTrainer && (
                <p className="mt-5 border border-[var(--s-accent)]/40 bg-[#1a1a14] px-4 py-3 text-sm text-[var(--s-accent)]">
                  Booking a session with{" "}
                  <span className="font-semibold">{defaultTrainer}</span>
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3 border-y border-[var(--s-hair)] py-4">
                <SampleButton data-open-chat variant="outline" size="sm">
                  Ask the assistant
                </SampleButton>
                <p className="max-w-xs text-[0.8125rem] leading-[1.6] text-[var(--s-grey)]">
                  Best for timings, membership questions, and booking the right
                  trial slot.
                </p>
              </div>

              <div className="mt-8">
                <SampleLeadForm
                  columns={1}
                  submitLabel={gym.trial.submit}
                  successTitle={gym.trial.successTitle}
                  successBody={gym.trial.successBody}
                  note={gym.trial.note}
                  defaultValues={defaultValues}
                  fields={[
                    {
                      kind: "text",
                      name: "name",
                      label: "Name",
                      placeholder: "Your name",
                      required: true,
                    },
                    {
                      kind: "tel",
                      name: "phone",
                      label: "Phone",
                      placeholder: "10-digit mobile",
                      required: true,
                    },
                    {
                      kind: "select",
                      name: "program",
                      label: "Preferred program",
                      required: true,
                      options: programNames,
                    },
                    {
                      kind: "select",
                      name: "slot",
                      label: "Preferred time",
                      required: true,
                      options: gym.contact.timeSlots,
                    },
                    {
                      kind: "select",
                      name: "trainer",
                      label: "Preferred trainer",
                      options: ["No preference", ...trainerNames],
                    },
                  ]}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="border border-[var(--s-hair)] bg-[#161616] p-6 sm:p-8">
              <SampleEyebrow tone="accent">Visit</SampleEyebrow>
              <h2 className={`${heading} mt-4`}>Walk in or message first.</h2>
              <address className="not-italic leading-[1.9] text-[var(--s-grey)]">
                {gym.contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <div className="mt-5 flex flex-wrap gap-3">
                <SampleButton href={gym.contact.phoneHref} size="sm">
                  {gym.contact.phoneLabel}
                </SampleButton>
                <SampleButton
                  href={gym.contact.whatsappHref}
                  external
                  size="sm"
                  variant="outline"
                >
                  {gym.contact.whatsappLabel}
                </SampleButton>
              </div>

              <table className="mt-8 w-full text-sm">
                <caption className="mb-3 text-left text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--s-grey)]">
                  Opening hours
                </caption>
                <tbody>
                  {gym.contact.hours.map((row) => (
                    <tr
                      key={row.day}
                      className="border-b border-[var(--s-hair)] last:border-0"
                    >
                      <th scope="row" className="py-3 text-left font-medium">
                        {row.day}
                      </th>
                      <td className="s-mono py-3 text-right text-[var(--s-grey)]">
                        {row.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <SampleMap
                lat={gym.contact.coords.lat}
                lon={gym.contact.coords.lon}
                label="Forge Strength Co., Wagle Estate, Thane"
                dark
                className="mt-8 h-56"
              />
            </div>
          </Reveal>
        </div>
      </SampleSection>
    </main>
  );
}
