"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const FAQ_SKELETON_COUNT = 5;

export default function FaqManagementLoading() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-48 rounded-md bg-orange-100 dark:bg-orange-950/50" />
        <Skeleton className="h-4 w-80 max-w-full rounded-md bg-orange-100 dark:bg-orange-950/50" />
      </div>

      <Separator />

      <Card className="overflow-hidden border-orange-200/80 p-0 shadow-sm shadow-orange-950/5 dark:border-orange-900/40">
        <CardContent className="p-0">
          <div className="flex h-11 items-center gap-6 border-b border-orange-200/70 bg-orange-50/80 px-4 dark:border-orange-900/40 dark:bg-orange-950/20">
            <Skeleton className="h-3.5 w-8 bg-orange-100 dark:bg-orange-900/40" />
            <Skeleton className="h-3.5 w-24 bg-orange-100 dark:bg-orange-900/40" />
            <Skeleton className="h-3.5 w-20 bg-orange-100 dark:bg-orange-900/40" />
            <Skeleton className="h-3.5 w-16 bg-orange-100 dark:bg-orange-900/40" />
            <Skeleton className="ml-auto h-3.5 w-20 bg-orange-100 dark:bg-orange-900/40" />
          </div>

          <div className="divide-y divide-orange-100 dark:divide-orange-900/30">
            {Array.from({ length: FAQ_SKELETON_COUNT }).map((_, index) => (
              <div
                key={index}
                className="flex min-h-24 items-center gap-6 px-4 py-4"
              >
                <Skeleton className="h-4 w-8 shrink-0 bg-orange-100 dark:bg-orange-900/40" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3 bg-orange-100 dark:bg-orange-900/40" />
                  <Skeleton className="h-3.5 w-full bg-orange-100 dark:bg-orange-900/40" />
                  <Skeleton className="h-3.5 w-4/5 bg-orange-100 dark:bg-orange-900/40" />
                </div>
                <Skeleton className="h-5 w-20 shrink-0 rounded-full bg-orange-100 dark:bg-orange-900/40" />
                <Skeleton className="h-5 w-16 shrink-0 rounded-full bg-orange-100 dark:bg-orange-900/40" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}