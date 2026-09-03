/* eslint-disable react-hooks/incompatible-library */
"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MessageSquareText, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  UserRecentGlobalReview,
  UserRecentReview,
} from "@/types/dashboard.type";

type Review = UserRecentReview | UserRecentGlobalReview;

interface RecentReviewsTableProps {
  reviews: Review[];
  global?: boolean;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatId(id: string) {
  return id.length <= 12 ? id : `${id.slice(0, 8)}...${id.slice(-4)}`;
}

const mealColumns: ColumnDef<UserRecentReview>[] = [
  {
    accessorKey: "meal_id",
    header: "Meal",
    cell: ({ row }) => (
      <span className="font-mono text-xs font-medium text-orange-700/80 dark:text-orange-300/80" title={row.original.meal_id}>
        {formatId(row.original.meal_id)}
      </span>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-orange-400 text-orange-400" />
        <span className="font-bold text-orange-700 dark:text-orange-300">{row.original.rating}/5</span>
      </div>
    ),
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => <p className="max-w-md truncate text-sm text-orange-800/80 dark:text-orange-200/80">{row.original.comment}</p>,
  },
  {
    accessorKey: "createdAt",
    header: "Reviewed At",
    cell: ({ row }) => <span className="whitespace-nowrap text-sm font-medium text-orange-800/75 dark:text-orange-200/75">{formatDate(row.original.createdAt)}</span>,
  },
];

const globalColumns: ColumnDef<UserRecentGlobalReview>[] = [
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-orange-400 text-orange-400" />
        <span className="font-bold text-orange-700 dark:text-orange-300">{row.original.rating}/5</span>
      </div>
    ),
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => <p className="max-w-md truncate text-sm text-orange-800/80 dark:text-orange-200/80">{row.original.comment}</p>,
  },
  {
    accessorKey: "createdAt",
    header: "Reviewed At",
    cell: ({ row }) => <span className="whitespace-nowrap text-sm font-medium text-orange-800/75 dark:text-orange-200/75">{formatDate(row.original.createdAt)}</span>,
  },
];

export default function RecentReviewsTable({
  reviews,
  global = false,
}: RecentReviewsTableProps) {
  const table = useReactTable({
    data: reviews as (UserRecentReview[] | UserRecentGlobalReview[])[number][],
    columns: (global ? globalColumns : mealColumns) as ColumnDef<Review>[],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="overflow-hidden border-orange-200/70 bg-white/80 shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/10">
      <CardHeader className="border-b border-orange-100 px-4 py-4 sm:px-6 dark:border-orange-900/30">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
                <MessageSquareText className="size-4" />
              </div>
              <CardTitle className="text-base font-bold tracking-tight text-orange-950 dark:text-orange-50">
                {global ? "Recent Global Reviews" : "Recent Meal Reviews"}
              </CardTitle>
            </div>
            <CardDescription className="mt-1 text-xs text-orange-700/60 dark:text-orange-300/60">
              {global ? "Your latest feedback about FoodHub." : "Your latest feedback about ordered meals."}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="shrink-0 rounded-full border border-orange-200 bg-orange-100 px-2.5 text-[10px] font-bold text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300">
            {reviews.length} reviews
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto p-0">
        <Table className="min-w-[700px]">
          <TableHeader className="bg-orange-50/70 dark:bg-orange-950/20">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-orange-100 hover:bg-transparent dark:border-orange-900/30">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-11 px-4 text-[10px] font-bold uppercase tracking-wider text-orange-600/80 sm:px-6 dark:text-orange-400/80">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="border-orange-100 transition-colors hover:bg-orange-50/60 dark:border-orange-900/30 dark:hover:bg-orange-950/20">
                {row.getVisibleCells().map((cell) => <TableCell key={cell.id} className="px-4 py-3 sm:px-6">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={global ? globalColumns.length : mealColumns.length} className="h-32 text-center text-sm text-orange-600/60 dark:text-orange-300/60">No recent reviews found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
