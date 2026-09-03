import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Skeleton className="h-8 w-36 rounded-lg bg-orange-100 dark:bg-orange-950/50" />
        <Skeleton className="h-4 w-72 rounded-md bg-orange-50 dark:bg-orange-950/30" />
      </div>

      <div className="overflow-hidden rounded-xl border border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
        <Skeleton className="h-28 w-full rounded-none bg-orange-100 dark:bg-orange-950/40" />

        <div className="px-6 pb-6">
          <div className="-mt-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
              <Skeleton className="size-28 shrink-0 rounded-2xl bg-orange-100 ring-4 ring-white dark:bg-orange-950/50 dark:ring-orange-950" />

              <div className="space-y-3 pb-1">
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-7 w-44 rounded-md bg-orange-100 dark:bg-orange-950/50" />
                  <Skeleton className="h-6 w-16 rounded-full bg-orange-50 dark:bg-orange-950/30" />
                  <Skeleton className="h-6 w-20 rounded-full bg-orange-50 dark:bg-orange-950/30" />
                </div>

                <Skeleton className="h-4 w-64 rounded-md bg-orange-50 dark:bg-orange-950/30" />
              </div>
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-10 w-32 rounded-lg bg-orange-100 dark:bg-orange-950/50" />
              <Skeleton className="h-10 w-32 rounded-lg bg-orange-100 dark:bg-orange-950/50" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
        <div className="border-b border-orange-100 px-5 py-4 dark:border-orange-900/40">
          <Skeleton className="h-5 w-36 rounded-md bg-orange-100 dark:bg-orange-950/50" />
        </div>

        <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-16 rounded-xl bg-orange-50 dark:bg-orange-950/30" />
          <Skeleton className="h-16 rounded-xl bg-orange-50 dark:bg-orange-950/30" />
          <Skeleton className="h-16 rounded-xl bg-orange-50 dark:bg-orange-950/30" />
        </div>
      </div>

      <div className="rounded-xl border border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
        <div className="border-b border-orange-100 px-5 py-4 dark:border-orange-900/40">
          <Skeleton className="h-5 w-44 rounded-md bg-orange-100 dark:bg-orange-950/50" />
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-2">
          <Skeleton className="h-20 rounded-xl bg-orange-50 dark:bg-orange-950/30" />
          <Skeleton className="h-20 rounded-xl bg-orange-50 dark:bg-orange-950/30" />
          <Skeleton className="h-20 rounded-xl bg-orange-50 dark:bg-orange-950/30" />
          <Skeleton className="h-20 rounded-xl bg-orange-50 dark:bg-orange-950/30" />
          <Skeleton className="h-20 rounded-xl bg-orange-50 dark:bg-orange-950/30 md:col-span-2" />
        </div>
      </div>
    </div>
  );
}