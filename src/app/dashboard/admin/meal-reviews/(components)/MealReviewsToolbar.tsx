"use client";

import { MessageSquareQuote } from "lucide-react";


export default function MealReviewsToolbar({ search, onSearchChange, onReset }: { search: string; onSearchChange: (value: string) => void; onReset: () => void }) {

  return (
    <div className="flex flex-col gap-3 border-b border-orange-100 bg-orange-50/40 p-4 dark:border-orange-900/40 dark:bg-orange-950/10 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2"><MessageSquareQuote className="size-4 text-orange-500" />
        <h2 className="text-base font-bold text-orange-950 dark:text-orange-50">
          Meal Reviews
          </h2>
          </div>
          <p className="mt-0.5 text-xs font-medium text-orange-700/60 dark:text-orange-300/60">Manage and view reviews submitted for meals.</p>
          </div>

    </div>
  );
}
