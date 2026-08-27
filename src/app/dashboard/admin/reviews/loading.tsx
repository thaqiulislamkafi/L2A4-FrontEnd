"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const REVIEW_SKELETON_COUNT = 6;

export default function ReviewsLoading() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-40 rounded-lg bg-orange-100 dark:bg-orange-950/50" />
          <Skeleton className="h-4 w-64 rounded-md bg-orange-100 dark:bg-orange-950/50" />
        </div>

        <Skeleton className="h-10 w-full rounded-lg bg-orange-100 dark:bg-orange-950/50 sm:w-72" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: REVIEW_SKELETON_COUNT }).map((_, index) => (
          <Card key={index} className="overflow-hidden border-orange-200/80 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
            <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-orange-100/80 px-5 py-4 dark:border-orange-900/30">
              <div className="flex min-w-0 items-center gap-3">
                <Skeleton className="size-11 shrink-0 rounded-full bg-orange-100 dark:bg-orange-950/50" />

                <div className="min-w-0 space-y-2">
                  <Skeleton className="h-4 w-28 rounded-md bg-orange-100 dark:bg-orange-950/50" />
                  <Skeleton className="h-3 w-40 rounded-md bg-orange-100 dark:bg-orange-950/50" />
                </div>
              </div>

              <Skeleton className="size-8 rounded-lg bg-orange-100 dark:bg-orange-950/50" />
            </CardHeader>

            <CardContent className="space-y-4 px-5 py-5">
              <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-4 w-28 rounded-md bg-orange-100 dark:bg-orange-950/50" />
                <Skeleton className="h-6 w-12 rounded-full bg-orange-100 dark:bg-orange-950/50" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-md bg-orange-100 dark:bg-orange-950/50" />
                <Skeleton className="h-4 w-[90%] rounded-md bg-orange-100 dark:bg-orange-950/50" />
                <Skeleton className="h-4 w-[65%] rounded-md bg-orange-100 dark:bg-orange-950/50" />
              </div>
            </CardContent>

            <CardFooter className="border-t border-orange-100/80 px-5 py-3 dark:border-orange-900/30">
              <Skeleton className="h-3 w-32 rounded-md bg-orange-100 dark:bg-orange-950/50" />
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-3 border-t border-orange-100 px-4 py-3 sm:flex-row dark:border-orange-900/40">
        <Skeleton className="h-4 w-32 rounded-md bg-orange-100 dark:bg-orange-950/50" />
        <Skeleton className="h-9 w-64 rounded-lg bg-orange-100 dark:bg-orange-950/50" />
      </div>
    </div>
  );
}