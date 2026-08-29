"use client";

import { MessageSquareQuote, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ReviewsTableToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
}

export default function ReviewsTableToolbar({ search, onSearchChange, onReset }: ReviewsTableToolbarProps) {
  const hasSearch = search.trim().length > 0;

  return (
    <div className="flex flex-col gap-3 border-b border-orange-100 bg-orange-50/40 p-4 dark:border-orange-900/40 dark:bg-orange-950/10 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <MessageSquareQuote className="size-4 text-orange-500 dark:text-orange-400" />
          <h2 className="text-base font-bold tracking-tight text-orange-950 dark:text-orange-50">
            Global Reviews
          </h2>
        </div>

        <p className="mt-0.5 text-xs font-medium text-orange-700/60 dark:text-orange-300/60">
          Manage and view reviews submitted by users.
        </p>
      </div>

      <div className="flex w-full items-center gap-2 sm:w-auto">
        <div className="relative min-w-0 flex-1 sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-orange-500 dark:text-orange-400" />

          <Input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search reviews..." className="h-9 w-full rounded-lg border-orange-200 bg-white pl-9 pr-9 text-sm text-orange-900 placeholder:text-orange-400/60 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-800 dark:bg-orange-950/20 dark:text-orange-100 dark:placeholder:text-orange-400/50" />

          {hasSearch && (
            <button type="button" onClick={onReset} aria-label="Clear search" className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-orange-500 transition-colors hover:bg-orange-100 hover:text-orange-700 dark:text-orange-400 dark:hover:bg-orange-950/60 dark:hover:text-orange-300">
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {hasSearch && (
          <Button type="button" variant="outline" onClick={onReset} className="h-9 shrink-0 rounded-lg border-orange-200 bg-white px-3 font-medium text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:bg-orange-950/20 dark:text-orange-300 dark:hover:bg-orange-950/40">
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}