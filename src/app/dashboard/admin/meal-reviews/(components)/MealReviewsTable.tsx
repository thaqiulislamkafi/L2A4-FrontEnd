"use client";

import * as React from "react";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { MealReview } from "@/types/meal-review.type";
import MealReviewCard from "./MealReviewCard";

export default function MealReviewsTable({ reviews, isFetching = false, onEdit, onDelete }: { reviews: MealReview[]; isFetching?: boolean; onEdit?: (review: MealReview) => void; onDelete?: (review: MealReview) => void }) {
  const columns = React.useMemo<ColumnDef<MealReview>[]>(() => [{
    id: "review",
    header: "Meal Reviews",
    cell: ({ row }) => <MealReviewCard review={row.original} onEdit={onEdit} onDelete={onDelete} />,
  }], [onEdit, onDelete]);
  const table = useReactTable({ data: reviews, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <Card className="relative border-orange-200/80 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 lg:grid-cols-3">
          {table.getRowModel().rows.map((row) => row.getVisibleCells().map((cell) => <React.Fragment key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</React.Fragment>))}
        </div>
        {reviews.length === 0 && <p className="px-5 py-12 text-center text-sm text-orange-700/70 dark:text-orange-300/70">No meal reviews found.</p>}
      </CardContent>
      {isFetching && <div className="absolute inset-0 flex items-center justify-center bg-orange-50/40 backdrop-blur-[1px] dark:bg-orange-950/20"><div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-white/95 px-3 py-2 text-sm font-medium text-orange-600 shadow-sm dark:border-orange-900/50 dark:bg-orange-950/95 dark:text-orange-400"><Loader2 className="size-4 animate-spin" /> Loading...</div></div>}
    </Card>
  );
}
