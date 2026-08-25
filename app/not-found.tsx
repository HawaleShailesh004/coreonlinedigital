import { LineNode } from "@/components/LineNode";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start py-24 md:py-40">
      <div className="mb-10 w-24">
        <LineNode nodes={[100]} tone="accent" />
      </div>
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-5 max-w-2xl font-display text-h2 font-semibold">
        This line doesn&apos;t connect to anything.
      </h1>
      <p className="mt-6 max-w-xl text-lead text-body">
        The page you asked for isn&apos;t here. Everything else still is.
      </p>
      <div className="mt-12 flex flex-col gap-4 sm:flex-row">
        <Button href="/">Back to home</Button>
        <Button href="/services" variant="secondary">
          Our services
        </Button>
      </div>
    </Container>
  );
}
