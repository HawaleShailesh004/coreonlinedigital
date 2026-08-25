import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineNode } from "@/components/LineNode";
import { Container } from "@/components/ui/Container";

export function PageHeader({
  eyebrow,
  heading,
  sub,
}: {
  eyebrow?: string;
  heading: string;
  sub?: string;
}) {
  return (
    <header className="pt-16 pb-16 md:pt-24 md:pb-24">
      <Container>
        <div className="mb-10 w-24">
          <LineNode animate tone="accent" />
        </div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-5 max-w-3xl font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[2.75rem] lg:text-h1">
          {heading}
        </h1>
        {sub && <p className="mt-8 max-w-2xl text-lead text-body">{sub}</p>}
      </Container>
    </header>
  );
}
