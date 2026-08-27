"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";

import { GlobalReview } from "@/types/global-review.type";
import ReviewCard from "./ReviewCard";

interface ReviewTableColumnsProps {
  onDelete?: (review: GlobalReview) => void;
  onView?: (review: GlobalReview) => void;
}

export const ReviewTableColumns = ({ onDelete, onView }: ReviewTableColumnsProps): ColumnDef<GlobalReview>[] => [
  {
    id: "review",
    header: "Reviews",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <ReviewCard review={row.original} onDelete={onDelete} onView={onView} />
    ),
  },
];

export default ReviewTableColumns;