"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersLoading() {
  return (
    <div className="overflow-hidden rounded-xl border border-orange-200/70 bg-white shadow-sm dark:border-orange-900/40 dark:bg-orange-950/20">
      <div className="border-b border-orange-100 bg-orange-50/40 p-4 dark:border-orange-900/40 dark:bg-orange-950/10">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32 bg-orange-100 dark:bg-orange-900/40" />
          <Skeleton className="h-4 w-56 bg-orange-100 dark:bg-orange-900/40" />
        </div>
      </div>

      <div className="divide-y divide-orange-100 dark:divide-orange-900/30">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="grid grid-cols-6 items-center gap-4 p-4">
            <Skeleton className="h-4 w-28 bg-orange-100 dark:bg-orange-900/40" />
            <Skeleton className="h-4 w-28 bg-orange-100 dark:bg-orange-900/40" />
            <Skeleton className="h-4 w-20 bg-orange-100 dark:bg-orange-900/40" />
            <Skeleton className="h-6 w-24 rounded-full bg-orange-100 dark:bg-orange-900/40" />
            <Skeleton className="h-4 w-28 bg-orange-100 dark:bg-orange-900/40" />
            <Skeleton className="h-8 w-20 rounded-lg bg-orange-100 dark:bg-orange-900/40" />
          </div>
        ))}
      </div>
    </div>
  );
}