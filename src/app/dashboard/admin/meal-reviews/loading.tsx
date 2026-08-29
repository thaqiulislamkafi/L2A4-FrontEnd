"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MealReviewsLoading() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2"><Skeleton className="h-7 w-40 rounded-lg bg-orange-100 dark:bg-orange-950/50" /><Skeleton className="h-4 w-64 rounded-md bg-orange-100 dark:bg-orange-950/50" /></div>
        <Skeleton className="h-10 w-full rounded-lg bg-orange-100 dark:bg-orange-950/50 sm:w-72" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Card key={index} className="overflow-hidden border-orange-200/80 bg-white dark:border-orange-900/40 dark:bg-orange-950/20">
            <CardHeader className="flex flex-row gap-3 border-b border-orange-100 px-5 py-4"><Skeleton className="size-11 rounded-full bg-orange-100 dark:bg-orange-950/50" /><div className="space-y-2"><Skeleton className="h-4 w-28 bg-orange-100 dark:bg-orange-950/50" /><Skeleton className="h-3 w-40 bg-orange-100 dark:bg-orange-950/50" /></div></CardHeader>
            <CardContent className="space-y-4 px-5 py-5"><Skeleton className="h-16 w-full bg-orange-100 dark:bg-orange-950/50" /><Skeleton className="h-4 w-full bg-orange-100 dark:bg-orange-950/50" /><Skeleton className="h-16 w-full bg-orange-100 dark:bg-orange-950/50" /></CardContent>
            <CardFooter className="border-t border-orange-100 px-5 py-3"><Skeleton className="h-3 w-32 bg-orange-100 dark:bg-orange-950/50" /></CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}