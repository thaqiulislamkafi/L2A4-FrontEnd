"use client";

import { ArrowLeft } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MealDetailsLoading() {
  return (
    <div className="space-y-5 p-4 md:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg border border-orange-200 bg-white dark:border-orange-800 dark:bg-orange-950/20">
          <ArrowLeft className="size-4 text-orange-400" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 rounded-lg bg-orange-100 dark:bg-orange-950/40" />
          <Skeleton className="h-4 w-64 rounded-md bg-orange-100 dark:bg-orange-950/40" />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
        <Skeleton className="min-h-80 rounded-2xl bg-orange-100 dark:bg-orange-950/40 lg:min-h-105" />
        <Card className="border-orange-200/70 dark:border-orange-900/40 dark:bg-orange-950/20">
          <CardHeader className="space-y-3">
            <Skeleton className="h-6 w-36 rounded-md bg-orange-100 dark:bg-orange-950/40" />
            <Skeleton className="h-9 w-3/4 rounded-md bg-orange-100 dark:bg-orange-950/40" />
          </CardHeader>
          <CardContent className="space-y-5">
            <Skeleton className="h-20 w-full rounded-xl bg-orange-100 dark:bg-orange-950/40" />
            <Skeleton className="h-16 w-full rounded-xl bg-orange-100 dark:bg-orange-950/40" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-16 rounded-xl bg-orange-100 dark:bg-orange-950/40"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}