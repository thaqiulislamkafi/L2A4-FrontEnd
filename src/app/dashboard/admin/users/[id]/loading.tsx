"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserDetailsLoading() {
  return (
    <div className="space-y-5 p-4 md:p-6">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-950/40" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-44 rounded-lg bg-orange-100 dark:bg-orange-950/40" />
          <Skeleton className="h-4 w-64 rounded-md bg-orange-100 dark:bg-orange-950/40" />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        <Card className="overflow-hidden border-orange-200/70 bg-white shadow-sm dark:border-orange-900/40 dark:bg-orange-950/20">
          <CardHeader className="border-b border-orange-100 bg-orange-50/40 p-5 dark:border-orange-900/40 dark:bg-orange-950/10">
            <Skeleton className="h-5 w-32 rounded-md bg-orange-100 dark:bg-orange-950/40" />
          </CardHeader>
          <CardContent className="space-y-4 p-5">
            <Skeleton className="h-16 w-full rounded-xl bg-orange-100 dark:bg-orange-950/40" />
            <Skeleton className="h-16 w-full rounded-xl bg-orange-100 dark:bg-orange-950/40" />
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-orange-200/70 bg-white shadow-sm dark:border-orange-900/40 dark:bg-orange-950/20">
          <CardHeader className="border-b border-orange-100 bg-orange-50/40 p-5 dark:border-orange-900/40 dark:bg-orange-950/10">
            <Skeleton className="h-5 w-28 rounded-md bg-orange-100 dark:bg-orange-950/40" />
          </CardHeader>
          <CardContent className="space-y-4 p-5">
            <Skeleton className="h-20 w-full rounded-xl bg-orange-100 dark:bg-orange-950/40" />
            <Skeleton className="h-16 w-full rounded-xl bg-orange-100 dark:bg-orange-950/40" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
