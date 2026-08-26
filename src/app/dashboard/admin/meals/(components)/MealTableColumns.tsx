"use client";

import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal, Eye } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Meal } from "@/types/meal.type";

function formatDate(date?: string | Date) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getAvailabilityClass(status?: string) {
  switch (status?.toLowerCase()) {
    case "available":
      return "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400";
    case "unavailable":
      return "border-red-200 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400";
    default:
      return "border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-400";
  }
}

export const MealTableColumns = (): ColumnDef<Meal>[] => [
  {
    accessorKey: "name",
    header: "Meal",
    cell: ({ row }) => {
      const meal = row.original;

      return (
        <div className="flex min-w-55 items-center gap-3">
          {meal.image ? (
            <Image src={meal.image} alt={meal.name ?? "Meal"} width={48} height={48} className="size-10 shrink-0 rounded-lg object-cover ring-1 ring-orange-200 dark:ring-orange-900/50" />
          ) : (
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-sm font-bold text-orange-600 ring-1 ring-orange-200 dark:bg-orange-950/50 dark:text-orange-400 dark:ring-orange-900/50">
              {meal.name?.slice(0, 2).toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-orange-950 dark:text-orange-50">{meal.name ?? "Unnamed Meal"}</p>
            <p className="truncate text-xs font-medium text-orange-600/60 dark:text-orange-300/60">{meal.id}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "cuisine_rel.cuisine_type_name",
    header: "Cuisine",
    cell: ({ row }) => (
      <span className="font-medium text-orange-800 dark:text-orange-200">{row.original.cuisine_rel?.cuisine_type_name || "—"}</span>
    ),
  },
  {
    accessorKey: "category_rel.category_name",
    header: "Category",
    cell: ({ row }) => (
      <span className="font-medium text-orange-800 dark:text-orange-200">{row.original.category_rel?.category_name || "—"}</span>
    ),
  },
  {
    accessorKey: "dietry_rel.dietry_type_name",
    header: "Dietry",
    cell: ({ row }) => (
      <span className="font-medium text-orange-800 dark:text-orange-200">{row.original.dietry_rel?.dietry_type_name || "—"}</span>
    ),
  },
  {
    accessorKey: "availabilty_status",
    header: "Availability",
    cell: ({ row }) => (
      <Badge variant="outline" className={`rounded-full px-2.5 py-1 text-[10px] font-bold capitalize tracking-wide ${getAvailabilityClass(row.original.availabilty_status)}`}>
        <span className="mr-1.5 size-1.5 rounded-full bg-current" />
        {row.original.availabilty_status ?? "Unknown"}
      </Badge>
    ),
  },
  {
    accessorKey: "pricePerPiece",
    header: "Price",
    cell: ({ row }) => (
      <span className="font-medium text-orange-700/70 dark:text-orange-300/70">৳{row.original.pricePerPiece}</span>
    ),
  },
  {
    accessorKey: "availablePieces",
    header: "Available",
    cell: ({ row }) => (
      <span className="font-medium text-orange-700/70 dark:text-orange-300/70">{row.original.availablePieces}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <span className="font-medium text-orange-700/70 dark:text-orange-300/70">{formatDate(row.original.createdAt)}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const meal = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={`Actions for ${meal.name}`} />}>
            <MoreHorizontal className="size-4 text-orange-600 dark:text-orange-400" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44 rounded-xl border-orange-200 bg-white p-1.5 dark:border-orange-900/50 dark:bg-orange-950">
            <DropdownMenuItem render={<Link href={`/dashboard/admin/meals/${meal.id}`} />} className="cursor-pointer rounded-lg font-medium text-orange-800 focus:bg-orange-100 focus:text-orange-700 dark:text-orange-200 dark:focus:bg-orange-950/60 dark:focus:text-orange-300">
              <Eye className="size-4 text-orange-500 dark:text-orange-400" />
              <span>View Meal</span>
            </DropdownMenuItem>

            {/* Static actions for now, functionality may be added later */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
