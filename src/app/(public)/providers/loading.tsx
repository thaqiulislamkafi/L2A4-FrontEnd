"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface ProvidersLoadingProps {
  count?: number;
}

const ProvidersLoading = ({ count = 6 }: ProvidersLoadingProps) => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.25) }}>
            <Card className="relative h-full overflow-hidden rounded-2xl border border-orange-100/80 bg-background p-5 shadow-sm dark:border-orange-900/40 sm:p-6">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-300 via-orange-500 to-amber-400 opacity-70" />

              <div className="flex items-start gap-4">
                <div className="size-16 shrink-0 animate-pulse rounded-2xl border-2 border-orange-100 bg-orange-100/70 sm:size-[76px] dark:border-orange-900/40 dark:bg-orange-950/40" />

                <div className="min-w-0 flex-1 space-y-3 pt-1">
                  <div className="h-5 w-3/5 animate-pulse rounded-md bg-muted" />
                  <div className="h-4 w-4/5 max-w-56 animate-pulse rounded-md bg-muted" />
                  <div className="flex flex-wrap gap-2 pt-1">
                    <div className="h-6 w-20 animate-pulse rounded-full bg-green-100 dark:bg-green-950/40" />
                    <div className="h-6 w-24 animate-pulse rounded-full bg-orange-100 dark:bg-orange-950/40" />
                  </div>
                </div>
              </div>

              <div className="my-5 h-px bg-border/70" />

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
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3 border-t border-orange-100 pt-7 dark:border-orange-900/40">
        <div className="h-4 w-36 animate-pulse rounded-md bg-muted" />
        <div className="flex gap-2">
          <div className="size-9 animate-pulse rounded-lg bg-orange-100 dark:bg-orange-950/40" />
          <div className="size-9 animate-pulse rounded-lg bg-orange-200 dark:bg-orange-900/50" />
          <div className="size-9 animate-pulse rounded-lg bg-orange-100 dark:bg-orange-950/40" />
          <div className="size-9 animate-pulse rounded-lg bg-orange-100 dark:bg-orange-950/40" />
        </div>
      </div>
    </div>
  );
};

export default ProvidersLoading;