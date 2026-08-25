"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface TablePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function TablePagination({ page, totalPages, onPageChange }: TablePaginationProps) {
  const canPreviousPage = page > 1;
  const canNextPage = page < totalPages;

  const handlePrevious = () => {
    if (canPreviousPage) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (canNextPage) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 border-t border-orange-100 px-4 py-3 dark:border-orange-900/40">
      <div className="text-sm font-medium text-orange-700/70 dark:text-orange-300/70">
        Page <span className="font-semibold text-orange-700 dark:text-orange-300">{page}</span> of <span className="font-semibold text-orange-700 dark:text-orange-300">{totalPages}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handlePrevious} disabled={!canPreviousPage} className="h-9 gap-1 rounded-lg border-orange-200 bg-white text-orange-700 hover:bg-orange-50 hover:text-orange-700 disabled:opacity-50 dark:border-orange-800 dark:bg-orange-950/20 dark:text-orange-300 dark:hover:bg-orange-950/40">
          <ChevronLeft className="size-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <div className="flex size-9 items-center justify-center rounded-lg bg-orange-500 text-sm font-semibold text-white shadow-sm shadow-orange-500/20">
          {page}
        </div>

        <Button variant="outline" size="sm" onClick={handleNext} disabled={!canNextPage} className="h-9 gap-1 rounded-lg border-orange-200 bg-white text-orange-700 hover:bg-orange-50 hover:text-orange-700 disabled:opacity-50 dark:border-orange-800 dark:bg-orange-950/20 dark:text-orange-300 dark:hover:bg-orange-950/40">
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}