"use client";

import { Button } from "@/components/ui/button";

export default function ProviderMealsError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <section className="px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Unable to load provider meals</h1>
      <p className="mt-3 text-muted-foreground">
        Please try again in a moment.
      </p>
      <Button onClick={reset} className="mt-6">
        Try Again
      </Button>
    </section>
  );
}