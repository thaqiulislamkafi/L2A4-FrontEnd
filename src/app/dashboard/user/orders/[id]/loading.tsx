"use client";

import * as React from "react";
import { ArrowLeft, Package, User, ShoppingBag } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderDetailsLoading() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg border border-orange-200 bg-white dark:border-orange-800 dark:bg-orange-950/20">
          <ArrowLeft className="size-4 text-orange-400" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-7 w-44 rounded-lg bg-orange-100 dark:bg-orange-950/40" />
          <Skeleton className="h-4 w-64 rounded-md bg-orange-100 dark:bg-orange-950/40" />
        </div>
      </div>

      <Card className="overflow-hidden border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
        <CardHeader className="border-b border-orange-100 bg-orange-50/40 px-5 py-4 dark:border-orange-900/40 dark:bg-orange-950/10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-950/50">
                <Package className="size-5 text-orange-400" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-32 rounded-md bg-orange-100 dark:bg-orange-950/40" />
                <Skeleton className="h-3 w-48 rounded-md bg-orange-100 dark:bg-orange-950/40" />
              </div>
            </div>

            <Skeleton className="h-7 w-24 rounded-full bg-orange-100 dark:bg-orange-950/40" />
          </div>
        </CardHeader>

        <CardContent className="p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-xl border border-orange-100 bg-orange-50/30 p-4 dark:border-orange-900/30 dark:bg-orange-950/10">
                <Skeleton className="mb-2 h-3 w-20 rounded-md bg-orange-100 dark:bg-orange-950/40" />
                <Skeleton className="h-5 w-28 rounded-md bg-orange-100 dark:bg-orange-950/40" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <Card className="overflow-hidden border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
          <CardHeader className="border-b border-orange-100 bg-orange-50/40 px-5 py-4 dark:border-orange-900/40 dark:bg-orange-950/10">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-950/50">
                <ShoppingBag className="size-4 text-orange-400" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-28 rounded-md bg-orange-100 dark:bg-orange-950/40" />
                <Skeleton className="h-3 w-44 rounded-md bg-orange-100 dark:bg-orange-950/40" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="divide-y divide-orange-100 p-0 dark:divide-orange-900/30">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex gap-4 p-5">
                <Skeleton className="size-20 shrink-0 rounded-xl bg-orange-100 dark:bg-orange-950/40 sm:size-24" />

                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-40 rounded-md bg-orange-100 dark:bg-orange-950/40" />
                      <Skeleton className="h-5 w-28 rounded-full bg-orange-100 dark:bg-orange-950/40" />
                    </div>

                    <div className="space-y-2">
                      <Skeleton className="ml-auto h-5 w-20 rounded-md bg-orange-100 dark:bg-orange-950/40" />
                      <Skeleton className="ml-auto h-3 w-24 rounded-md bg-orange-100 dark:bg-orange-950/40" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Skeleton className="h-7 w-24 rounded-lg bg-orange-100 dark:bg-orange-950/40" />
                    <Skeleton className="h-7 w-32 rounded-lg bg-orange-100 dark:bg-orange-950/40" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
            <CardHeader className="border-b border-orange-100 bg-orange-50/40 px-5 py-4 dark:border-orange-900/40 dark:bg-orange-950/10">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-950/50">
                  <User className="size-4 text-orange-400" />
                </div>

                <Skeleton className="h-5 w-32 rounded-md bg-orange-100 dark:bg-orange-950/40" />
              </div>
            </CardHeader>

            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-3">
                <Skeleton className="size-12 rounded-full bg-orange-100 dark:bg-orange-950/40" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-32 rounded-md bg-orange-100 dark:bg-orange-950/40" />
                  <Skeleton className="h-3 w-44 rounded-md bg-orange-100 dark:bg-orange-950/40" />
                </div>
              </div>

              <Skeleton className="h-16 w-full rounded-xl bg-orange-100 dark:bg-orange-950/40" />
              <Skeleton className="h-16 w-full rounded-xl bg-orange-100 dark:bg-orange-950/40" />
            </CardContent>
          </Card>

          <Card className="border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
            <CardContent className="space-y-4 p-5">
              <Skeleton className="h-5 w-32 rounded-md bg-orange-100 dark:bg-orange-950/40" />
              <Skeleton className="h-8 w-40 rounded-md bg-orange-100 dark:bg-orange-950/40" />
              <Skeleton className="h-10 w-full rounded-lg bg-orange-100 dark:bg-orange-950/40" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
