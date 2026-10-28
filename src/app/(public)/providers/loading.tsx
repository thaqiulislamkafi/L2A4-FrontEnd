import { Card } from "@/components/ui/card";

const ProvidersLoading = () => {
  return (
    <section
      role="status"
      aria-label="Loading providers"
      className="min-h-screen max-w-6xl mx-auto py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9">
          <div className="mb-4 h-8 w-52 animate-pulse rounded-full bg-orange-100 dark:bg-orange-950/40" />
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="w-full max-w-2xl space-y-3">
              <div className="h-10 w-3/4 animate-pulse rounded-xl bg-orange-100 dark:bg-orange-950/40 sm:h-12" />
              <div className="h-5 w-full max-w-xl animate-pulse rounded-lg bg-muted" />
              <div className="h-5 w-4/5 max-w-lg animate-pulse rounded-lg bg-muted" />
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-background/80 px-4 py-3 dark:border-orange-900/40">
              <div className="size-11 animate-pulse rounded-xl bg-orange-100 dark:bg-orange-950/50" />
              <div className="space-y-2">
                <div className="h-6 w-12 animate-pulse rounded bg-muted" />
                <div className="h-3 w-24 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mb-14 max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-14 min-w-0 flex-1 animate-pulse rounded-2xl border border-orange-100 bg-orange-50/60 dark:border-orange-950/50 dark:bg-orange-950/10" />
            <div className="flex shrink-0 items-center gap-3">
              <div className="size-11 animate-pulse rounded-xl bg-orange-100 dark:bg-orange-950/40" />
              <div className="space-y-2">
                <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                <div className="h-5 w-20 animate-pulse rounded bg-muted" />
              </div>
            </div>
            <div className="h-14 w-full animate-pulse rounded-2xl bg-orange-100 dark:bg-orange-950/40 sm:w-36" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={index}
              className="h-full overflow-hidden rounded-2xl border border-orange-100/80 bg-background p-5 shadow-sm dark:border-orange-900/40 sm:p-6"
            >
              <div className="flex items-start gap-4">
                <div className="size-16 shrink-0 animate-pulse rounded-2xl bg-orange-100/70 dark:bg-orange-950/40 sm:size-[76px]" />
                <div className="min-w-0 flex-1 space-y-3 pt-1">
                  <div className="h-5 w-3/5 animate-pulse rounded-md bg-muted" />
                  <div className="h-4 w-4/5 max-w-56 animate-pulse rounded-md bg-muted" />
                  <div className="flex flex-wrap gap-2 pt-1">
                    <div className="h-6 w-20 animate-pulse rounded-full bg-green-100 dark:bg-green-950/40" />
                    <div className="h-6 w-24 animate-pulse rounded-full bg-orange-100 dark:bg-orange-950/40" />
                  </div>
                </div>
              </div>

              <div className="my-4 h-px bg-border/70" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-4 shrink-0 animate-pulse rounded bg-orange-200/80 dark:bg-orange-900/50" />
                  <div className="h-4 w-2/5 animate-pulse rounded-md bg-muted" />
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 size-4 shrink-0 animate-pulse rounded bg-orange-200/80 dark:bg-orange-900/50" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-4/5 animate-pulse rounded-md bg-muted" />
                    <div className="h-4 w-3/5 animate-pulse rounded-md bg-muted" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-4 shrink-0 animate-pulse rounded bg-orange-200/80 dark:bg-orange-900/50" />
                  <div className="h-4 w-1/4 animate-pulse rounded-md bg-muted" />
                  <div className="size-1 rounded-full bg-border" />
                  <div className="size-4 shrink-0 animate-pulse rounded bg-orange-200/80 dark:bg-orange-900/50" />
                  <div className="h-4 w-1/3 animate-pulse rounded-md bg-muted" />
                </div>
              </div>

              <div className="mt-5 border-t border-orange-100 pt-4 dark:border-orange-900/40">
                <div className="h-10 w-full animate-pulse rounded-xl bg-orange-100 dark:bg-orange-950/40" />
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4">
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="size-9 animate-pulse rounded-lg bg-orange-100 dark:bg-orange-950/40"
              />
            ))}
          </div>
          <div className="h-7 w-28 animate-pulse rounded-full bg-orange-100 dark:bg-orange-950/40" />
        </div>
      </div>
    </section>
  );
};

export default ProvidersLoading;
