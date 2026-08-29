"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";

import { GlobalReview } from "@/types/global-review.type";
import ReviewCard from "./ReviewCard";

interface ReviewTableColumnsProps {
  onEdit?: (review: GlobalReview) => void;
  onDelete?: (review: GlobalReview) => void;
  onView?: (review: GlobalReview) => void;
}

export const ReviewTableColumns = ({ onEdit, onDelete, onView }: ReviewTableColumnsProps): ColumnDef<GlobalReview>[] => [
  {
    id: "review",
    header: "Reviews",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <ReviewCard review={row.original} onEdit={onEdit} onDelete={onDelete} onView={onView} />
    ),
  },
];

export default ReviewTableColumns;