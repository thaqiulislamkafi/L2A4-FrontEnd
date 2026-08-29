"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProviderDashboardLoading() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-7 w-40 rounded-lg bg-orange-100 dark:bg-orange-950/40" />
        <Skeleton className="h-4 w-72 max-w-full rounded-md bg-orange-50 dark:bg-orange-950/30" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="border-orange-200/70 shadow-sm dark:border-orange-900/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-20 rounded-md bg-orange-100 dark:bg-orange-950/40" />
              <Skeleton className="size-8 rounded-lg bg-orange-100 dark:bg-orange-950/40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 rounded-md bg-orange-100 dark:bg-orange-950/40" />
              <Skeleton className="mt-2 h-3 w-24 rounded-md bg-orange-50 dark:bg-orange-950/30" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden border-orange-200/70 shadow-sm dark:border-orange-900/40">
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-32 rounded-md bg-orange-100 dark:bg-orange-950/40" />
          <Skeleton className="h-4 w-64 max-w-full rounded-md bg-orange-50 dark:bg-orange-950/30" />
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <div className="min-w-[700px] space-y-3">
              <div className="flex items-center gap-4 border-b border-orange-100 pb-3 dark:border-orange-900/30">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="h-4 flex-1 rounded-md bg-orange-100 dark:bg-orange-950/40"
                  />
                ))}
              </div>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex items-center gap-4 border-b border-orange-50 py-3 last:border-0 dark:border-orange-950/30"
                >
                  {Array.from({ length: 5 }).map((_, columnIndex) => (
                    <Skeleton
                      key={columnIndex}
                      className={`h-8 rounded-md bg-orange-50 dark:bg-orange-950/30 ${
                        columnIndex === 0 ? "flex-[1.4]" : "flex-1"
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
