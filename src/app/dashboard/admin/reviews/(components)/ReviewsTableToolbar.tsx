"use client";

import { MessageSquareQuote } from "lucide-react";


interface ReviewsTableToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
}

export default function ReviewsTableToolbar({ search, onSearchChange, onReset }: ReviewsTableToolbarProps) {

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

    </div>
  );
}