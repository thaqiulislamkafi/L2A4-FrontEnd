"use client";

import * as React from "react";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";

import { Card, CardContent } from "@/components/ui/card";
import { GlobalReview } from "@/types/global-review.type";
import ReviewTableColumns from "./ReviewTableColumns";

interface ReviewsTableProps {
  reviews: GlobalReview[];
  isFetching?: boolean;
  onDelete?: (review: GlobalReview) => void;
  onView?: (review: GlobalReview) => void;
}

export default function ReviewsTable({ reviews, isFetching = false, onDelete, onView }: ReviewsTableProps) {
  const columns = React.useMemo<ColumnDef<GlobalReview>[]>(() => ReviewTableColumns({ onDelete, onView }), [onDelete, onView]);

  const table = useReactTable({
    data: reviews,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="border-orange-200/80 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
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
    </Card>
  );
}