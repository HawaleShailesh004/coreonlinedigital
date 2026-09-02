"use client";

import { useEffect } from "react";
import { WhatsAppButton } from "@/components/WhatsAppLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineNode } from "@/components/LineNode";
import { site } from "@/lib/content";

export default function SiteError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[site] render failed");
  }, []);

  return (
    <main className="flex-1">
      <Container className="flex flex-col items-start py-24 md:py-40">
        <Eyebrow>Something broke</Eyebrow>
        <div className="mb-10 mt-8 w-24">
          <LineNode nodes={[100]} tone="accent" />
        </div>
        <h1 className="max-w-2xl font-display text-h2 font-semibold">
          That page didn&apos;t load.
        </h1>
        <p className="mt-6 max-w-xl text-lead text-body">
          Try again, or message me on WhatsApp and I&apos;ll sort it.
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
          <WhatsAppButton variant="secondary">{site.primaryCta}</WhatsAppButton>
        </div>
      </Container>
    </main>
  );
}
