"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function MealsLoading() {
  return (
    <Card className="overflow-hidden rounded-xl border-orange-200/80 bg-white shadow-sm dark:border-orange-900/40 dark:bg-orange-950/10">
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Table Header */}
            <div className="flex h-12 items-center gap-4 border-b border-orange-100 bg-orange-50/70 px-4 dark:border-orange-900/40 dark:bg-orange-950/20">
              <Skeleton className="h-4 w-8 bg-orange-100 dark:bg-orange-900/40" />
              <Skeleton className="h-4 w-40 bg-orange-100 dark:bg-orange-900/40" />
              <Skeleton className="h-4 w-52 bg-orange-100 dark:bg-orange-900/40" />
              <Skeleton className="h-4 w-24 bg-orange-100 dark:bg-orange-900/40" />
              <Skeleton className="h-4 w-24 bg-orange-100 dark:bg-orange-900/40" />
              <Skeleton className="ml-auto h-4 w-16 bg-orange-100 dark:bg-orange-900/40" />
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-orange-100 dark:divide-orange-900/40">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex h-16 items-center gap-4 px-4">
                  <Skeleton className="h-4 w-8 bg-orange-100 dark:bg-orange-900/40" />

                  <div className="flex w-40 items-center gap-3">
                    <Skeleton className="size-9 shrink-0 rounded-lg bg-orange-100 dark:bg-orange-900/40" />
                    <div className="min-w-0 space-y-1.5">
                      <Skeleton className="h-3.5 w-24 bg-orange-100 dark:bg-orange-900/40" />
                      <Skeleton className="h-3 w-32 bg-orange-100 dark:bg-orange-900/40" />
                    </div>
                  </div>

                  <Skeleton className="h-4 w-52 bg-orange-100 dark:bg-orange-900/40" />

                  <Skeleton className="h-5 w-20 rounded-full bg-orange-100 dark:bg-orange-900/40" />

                  <Skeleton className="h-4 w-24 bg-orange-100 dark:bg-orange-900/40" />

                  <div className="ml-auto flex gap-2">
                    <Skeleton className="size-8 rounded-lg bg-orange-100 dark:bg-orange-900/40" />
                    <Skeleton className="size-8 rounded-lg bg-orange-100 dark:bg-orange-900/40" />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex h-16 items-center justify-between border-t border-orange-100 px-4 dark:border-orange-900/40">
              <Skeleton className="h-4 w-24 bg-orange-100 dark:bg-orange-900/40" />

              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-20 rounded-lg bg-orange-100 dark:bg-orange-900/40" />
                <Skeleton className="size-9 rounded-lg bg-orange-100 dark:bg-orange-900/40" />
                <Skeleton className="h-9 w-20 rounded-lg bg-orange-100 dark:bg-orange-900/40" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
