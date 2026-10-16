"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const ProviderMealsLoading = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-orange-50/40 py-24 dark:bg-orange-950/10">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-orange-100/70 via-background to-orange-50/50 dark:from-orange-950/20 dark:via-background dark:to-orange-950/10" />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Header Skeleton */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-9 w-36 animate-pulse rounded-full border border-orange-200 bg-orange-100/80 dark:border-orange-900/40 dark:bg-orange-950/40" />
          </div>
          <div className="mx-auto h-10 w-4/5 max-w-lg animate-pulse rounded-xl bg-muted sm:h-12" />
          <div className="mx-auto mt-5 max-w-2xl space-y-2.5">
            <div className="mx-auto h-4 w-full animate-pulse rounded-md bg-muted" />
            <div className="mx-auto h-4 w-4/5 animate-pulse rounded-md bg-muted" />
          </div>
        </motion.div>

        {/* Search and Filters Skeleton */}
        <Card className="mb-8 space-y-5 rounded-2xl border-orange-100/80 bg-background/90 p-5 shadow-sm dark:border-orange-900/40 sm:p-6">
          <div className="h-11 w-full animate-pulse rounded-xl bg-muted" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="h-10 animate-pulse rounded-xl bg-orange-100/80 dark:bg-orange-950/40" />
            <div className="h-10 animate-pulse rounded-xl bg-orange-100/80 dark:bg-orange-950/40" />
            <div className="h-10 animate-pulse rounded-xl bg-orange-100/80 dark:bg-orange-950/40" />
          </div>
          <div className="h-4 w-40 animate-pulse rounded-md bg-muted" />
        </Card>

        {/* Meal Cards Skeleton */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.25) }}>
              <Card className="h-full overflow-hidden rounded-2xl border border-orange-100/80 bg-background p-0 shadow-sm dark:border-orange-900/40">
                <div className="relative aspect-[4/3] animate-pulse bg-orange-100/80 dark:bg-orange-950/40">
                  <div className="absolute right-4 top-4 h-6 w-20 rounded-full bg-background/70" />
                </div>
                <div className="space-y-4 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="h-6 w-3/5 animate-pulse rounded-md bg-muted" />
                    <div className="h-5 w-16 animate-pulse rounded-md bg-orange-100 dark:bg-orange-950/40" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3.5 w-full animate-pulse rounded-md bg-muted" />
                    <div className="h-3.5 w-4/5 animate-pulse rounded-md bg-muted" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 w-20 animate-pulse rounded-full bg-orange-100 dark:bg-orange-950/40" />
                    <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
                  </div>
                  <div className="flex items-center justify-between border-t border-orange-100 pt-4 dark:border-orange-900/40">
                    <div className="h-6 w-24 animate-pulse rounded-md bg-muted" />
                    <div className="h-9 w-28 animate-pulse rounded-xl bg-orange-200 dark:bg-orange-900/50" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className={`size-9 animate-pulse rounded-xl ${index === 2 ? "bg-orange-200 dark:bg-orange-900/50" : "bg-orange-100 dark:bg-orange-950/40"}`} />
            ))}
          </div>
          <div className="h-8 w-28 animate-pulse rounded-full bg-orange-100 dark:bg-orange-950/40" />
        </div>
      </div>
    </section>
  );
};

export default ProviderMealsLoading;