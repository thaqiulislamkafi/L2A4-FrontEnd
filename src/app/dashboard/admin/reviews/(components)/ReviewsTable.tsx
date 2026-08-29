/* eslint-disable react-hooks/incompatible-library */
"use client";

import * as React from "react";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { GlobalReview } from "@/types/global-review.type";
import ReviewTableColumns from "./ReviewTableColumns";

interface ReviewsTableProps {
  reviews: GlobalReview[];
  isFetching?: boolean;
  onEdit?: (review: GlobalReview) => void;
  onDelete?: (review: GlobalReview) => void;
  onView?: (review: GlobalReview) => void;
}

export default function ReviewsTable({ reviews, isFetching = false, onEdit, onDelete, onView }: ReviewsTableProps) {
  const columns = React.useMemo<ColumnDef<GlobalReview>[]>(() => ReviewTableColumns({ onEdit, onDelete, onView }), [onEdit, onDelete, onView]);

  const table = useReactTable({
    data: reviews,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="relative border-orange-200/80 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
      <CardContent className="p-0">
        <div className="grid gap-5 p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <React.Fragment key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </CardContent>

      {isFetching && (
        <div className="absolute inset-0 flex items-center justify-center bg-orange-50/40 backdrop-blur-[1px] dark:bg-orange-950/20">
          <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-white/95 px-3 py-2 text-sm font-medium text-orange-600 shadow-sm dark:border-orange-900/50 dark:bg-orange-950/95 dark:text-orange-400">
            <Loader2 className="size-4 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      )}
    </Card>
  );
}