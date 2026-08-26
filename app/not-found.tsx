import Link from "next/link";
import { LineNode } from "@/components/LineNode";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Has to live at the app root: that is the only place Next.js reads for
 * unmatched URLs across the whole app.
 *
 * Deliberately self-contained rather than importing Nav and Footer. Next.js
 * serialises the root not-found into every page's payload as the fallback
 * boundary, so pulling the Coreline chrome in here would ship the logo and nav
 * markup into all nine /samples pages - which are supposed to carry no trace of
 * our brand beyond a footer credit.
 */
export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col">
      <Container className="flex flex-1 flex-col items-start py-24 md:py-40">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight"
        >
          coreline<span className="text-accent">.</span>
        </Link>

        <div className="mb-10 mt-16 w-24">
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
          <Button href="/work" variant="secondary">
            See sample builds
          </Button>
        </div>
      </Container>
    </main>
  );
}
