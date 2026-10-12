"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MEAL_REVIEW_SKELETON_COUNT = 6;

export default function MealReviewsLoading() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-orange-100 bg-orange-50/40 p-4 dark:border-orange-900/40 dark:bg-orange-950/10 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 rounded-md bg-orange-100 dark:bg-orange-950/50" />
            <Skeleton className="h-5 w-32 rounded-md bg-orange-100 dark:bg-orange-950/50" />
          </div>

          <Skeleton className="h-3.5 w-64 rounded-md bg-orange-100 dark:bg-orange-950/50" />
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Skeleton className="h-9 w-full rounded-lg bg-orange-100 dark:bg-orange-950/50 sm:w-72" />
        </div>
      </div>

      {/* Meal Reviews Table */}
      <Card className="border-orange-200/80 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: MEAL_REVIEW_SKELETON_COUNT }).map((_, index) => (
              <MealReviewCardSkeleton key={index} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-orange-100 px-4 py-3 dark:border-orange-900/40 sm:flex-row">
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-32 rounded-md bg-orange-100 dark:bg-orange-950/50" />
          <Skeleton className="size-1 rounded-full bg-orange-200 dark:bg-orange-800" />
          <Skeleton className="h-4 w-24 rounded-md bg-orange-100 dark:bg-orange-950/50" />
        </div>

        <div className="flex items-center gap-1">
          <Skeleton className="size-9 rounded-md bg-orange-100 dark:bg-orange-950/50" />
          <Skeleton className="size-9 rounded-md bg-orange-100 dark:bg-orange-950/50" />
          <Skeleton className="size-9 rounded-md bg-orange-100 dark:bg-orange-950/50" />
          <Skeleton className="size-9 rounded-md bg-orange-100 dark:bg-orange-950/50" />
          <Skeleton className="size-9 rounded-md bg-orange-100 dark:bg-orange-950/50" />
          <Skeleton className="size-9 rounded-md bg-orange-100 dark:bg-orange-950/50" />
        </div>
      </div>
    </div>
  );
}

function MealReviewCardSkeleton() {
  return (
    <div className="rounded-xl border border-orange-100 bg-white p-5 shadow-sm dark:border-orange-900/40 dark:bg-orange-950/20">
      {/* Reviewer / Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Skeleton className="size-11 shrink-0 rounded-full bg-orange-100 dark:bg-orange-950/50" />

          <div className="min-w-0 space-y-2">
            <Skeleton className="h-4 w-28 rounded-md bg-orange-100 dark:bg-orange-950/50" />
            <Skeleton className="h-3 w-36 rounded-md bg-orange-100 dark:bg-orange-950/50" />
          </div>
        </div>

        <Skeleton className="size-8 shrink-0 rounded-lg bg-orange-100 dark:bg-orange-950/50" />
      </div>

      {/* Meal Information */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-4 w-28 rounded-md bg-orange-100 dark:bg-orange-950/50" />
          <Skeleton className="h-6 w-14 rounded-full bg-orange-100 dark:bg-orange-950/50" />
        </div>

        <Skeleton className="h-16 w-full rounded-lg bg-orange-100 dark:bg-orange-950/50" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-md bg-orange-100 dark:bg-orange-950/50" />
          <Skeleton className="h-4 w-[90%] rounded-md bg-orange-100 dark:bg-orange-950/50" />
          <Skeleton className="h-4 w-[65%] rounded-md bg-orange-100 dark:bg-orange-950/50" />
        </div>
      </div>

      {/* Date / Footer */}
      <div className="mt-5 border-t border-orange-100 pt-3 dark:border-orange-900/30">
        <Skeleton className="h-3 w-32 rounded-md bg-orange-100 dark:bg-orange-950/50" />
      </div>
    </div>
  );
}