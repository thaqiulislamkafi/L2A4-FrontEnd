"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const USER_SKELETON_COUNT = 8;

export default function UsersLoading() {
  return (
    <div className="grid grid-cols-1 space-y-6 overflow-hidden p-4 md:p-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-orange-100 bg-orange-50/40 p-4 dark:border-orange-900/40 dark:bg-orange-950/10 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-2">
          <Skeleton className="h-5 w-24 rounded-md bg-orange-100 dark:bg-orange-950/50" />
          <Skeleton className="h-3.5 w-56 rounded-md bg-orange-100 dark:bg-orange-950/50" />
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Skeleton className="h-9 w-full rounded-lg bg-orange-100 dark:bg-orange-950/50 sm:w-72" />
        </div>
      </div>

      {/* Users Table */}
      <Card className="border-orange-200/80 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/10">
        <CardContent className="p-0">
          <div className="relative w-full overflow-x-auto">
            <div className="min-w-225">
              {/* Table Header */}
              <div className="flex h-11 items-center gap-4 border-b border-orange-200/70 bg-orange-50/80 px-4 dark:border-orange-900/40 dark:bg-orange-950/20">
                <Skeleton className="h-3.5 w-8 rounded-md bg-orange-100 dark:bg-orange-900/40" />
                <Skeleton className="h-3.5 w-40 rounded-md bg-orange-100 dark:bg-orange-900/40" />
                <Skeleton className="h-3.5 w-52 rounded-md bg-orange-100 dark:bg-orange-900/40" />
                <Skeleton className="h-3.5 w-24 rounded-md bg-orange-100 dark:bg-orange-900/40" />
                <Skeleton className="h-3.5 w-24 rounded-md bg-orange-100 dark:bg-orange-900/40" />
                <Skeleton className="h-3.5 w-24 rounded-md bg-orange-100 dark:bg-orange-900/40" />
                <Skeleton className="ml-auto h-3.5 w-16 rounded-md bg-orange-100 dark:bg-orange-900/40" />
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-orange-100 dark:divide-orange-900/40">
                {Array.from({ length: USER_SKELETON_COUNT }).map((_, index) => (
                  <UserRowSkeleton key={index} />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-orange-100 px-4 py-3 dark:border-orange-900/40 sm:flex-row">
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-24 rounded-md bg-orange-100 dark:bg-orange-950/50" />
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

function UserRowSkeleton() {
  return (
    <div className="flex h-16 items-center gap-4 px-4">
      {/* Index */}
      <Skeleton className="h-4 w-8 rounded-md bg-orange-100 dark:bg-orange-900/40" />

      {/* User */}
      <div className="flex w-40 items-center gap-3">
        <Skeleton className="size-9 shrink-0 rounded-lg bg-orange-100 dark:bg-orange-900/40" />

        <div className="min-w-0 space-y-1.5">
          <Skeleton className="h-3.5 w-24 rounded-md bg-orange-100 dark:bg-orange-900/40" />
          <Skeleton className="h-3 w-32 rounded-md bg-orange-100 dark:bg-orange-900/40" />
        </div>
      </div>

      {/* Email */}
      <Skeleton className="h-4 w-52 rounded-md bg-orange-100 dark:bg-orange-900/40" />

      {/* Role */}
      <Skeleton className="h-5 w-20 rounded-full bg-orange-100 dark:bg-orange-900/40" />

      {/* Status */}
      <Skeleton className="h-5 w-20 rounded-full bg-orange-100 dark:bg-orange-900/40" />

      {/* Date */}
      <Skeleton className="h-4 w-24 rounded-md bg-orange-100 dark:bg-orange-900/40" />

      {/* Actions */}
      <div className="ml-auto flex items-center gap-2">
        <Skeleton className="size-8 rounded-lg bg-orange-100 dark:bg-orange-900/40" />
        <Skeleton className="size-8 rounded-lg bg-orange-100 dark:bg-orange-900/40" />
      </div>
    </div>
  );
}