"use client";

import { MessageSquareQuote, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MealReviewsToolbar({ search, onSearchChange, onReset }: { search: string; onSearchChange: (value: string) => void; onReset: () => void }) {
  const hasSearch = search.trim().length > 0;
  return (
    <div className="flex flex-col gap-3 border-b border-orange-100 bg-orange-50/40 p-4 dark:border-orange-900/40 dark:bg-orange-950/10 sm:flex-row sm:items-center sm:justify-between">
      <div><div className="flex items-center gap-2"><MessageSquareQuote className="size-4 text-orange-500" /><h2 className="text-base font-bold text-orange-950 dark:text-orange-50">Meal Reviews</h2></div><p className="mt-0.5 text-xs font-medium text-orange-700/60 dark:text-orange-300/60">Manage and view reviews submitted for meals.</p></div>
      <div className="flex w-full items-center gap-2 sm:w-auto"><div className="relative min-w-0 flex-1 sm:w-72"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-orange-500" /><Input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search meal reviews..." className="h-9 w-full rounded-lg border-orange-200 bg-white pl-9 pr-9 text-sm dark:border-orange-800 dark:bg-orange-950/20 dark:text-orange-100" />{hasSearch && <button type="button" onClick={onReset} aria-label="Clear search" className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-orange-500 hover:bg-orange-100"><X className="size-3.5" /></button>}</div>{hasSearch && <Button type="button" variant="outline" onClick={onReset} className="h-9 rounded-lg border-orange-200 text-orange-700">Reset</Button>}</div>
    </div>
  );
}
