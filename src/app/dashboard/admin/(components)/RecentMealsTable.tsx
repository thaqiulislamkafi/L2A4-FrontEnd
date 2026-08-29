/* eslint-disable react-hooks/incompatible-library */
"use client";

import * as React from "react";
import {
  type ColumnDef, flexRender, getCoreRowModel, useReactTable,
} from "@tanstack/react-table";
import {ChefHat,ImageOff,UtensilsCrossed,} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {Card,CardContent,CardDescription,CardHeader,CardTitle,} from "@/components/ui/card";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import Image from "next/image";

export interface RecentMeal {
  id: string;
  name: string;
  image: string | null;
  description: string;
  cuisine_type: string;
  dietry_type: string;
  category: string;
  availabilty_status: string;
  pricePerPiece: number;
  totalPieces: number;
  availablePieces: number;
  isPublished: boolean;
  isHeroContent: boolean;
  isSliderContent: boolean;
  provider_id: string;
  createdAt: string;
  updatedAt: string;
}

interface RecentMealsTableProps {
  meals: RecentMeal[];
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getAvailabilityLabel(status: string) {
  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function MealImage({
  image,
  name,
}: {
  image: string | null;
  name: string;
}) {
  const [imageError, setImageError] = React.useState(false);

  if (!image || imageError) {
    return (
      <div
        className=" flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 ring-1 ring-orange-200 dark:bg-orange-950/50 dark:text-orange-400 dark:ring-orange-900/50
        "
      >
        {image ? (
          <ImageOff className="size-4" />
        ) : (
          <UtensilsCrossed className="size-4" />
        )}
      </div>
    );
  }

  return (
    <Image
      src={image}
      height={40}
      width={40}
      alt={name}
      className="size-10 shrink-0 rounded-lg object-cover ring-1 ring-orange-200 dark:ring-orange-900/50
      "
      onError={() => setImageError(true)}
    />
  );
}

const columns: ColumnDef<RecentMeal>[] = [
  {
    accessorKey: "name",
    header: "Meal",
    cell: ({ row }) => {
      const meal = row.original;

      return (
        <div className="flex items-center gap-3">
          <MealImage
            image={meal.image}
            name={meal.name}
          />

          <div className="">
            <div className="flex items-center gap-1.5">
              <p
                className=" truncate font-semibold text-orange-950 dark:text-orange-50
                "
              >
                {meal.name}
              </p>

              {meal.isHeroContent && (
                <Badge
                  variant="secondary"
                  className="shrink-0 rounded-full border border-orange-200 bg-orange-100 px-1.5 py-0 text-[9px] font-bold text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300
                  "
                >
                  Hero
                </Badge>
              )}
            </div>

            <p
              className=" mt-0.5 max-w-64 truncate text-xs text-orange-600/60 dark:text-orange-300/60
              "
            >
              {meal.description}
            </p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "pricePerPiece",
    header: "Price",
    cell: ({ row }) => {
      return (
        <span
          className="font-semibold text-orange-700 dark:text-orange-300
          "
        >
          {formatPrice(row.original.pricePerPiece)}
        </span>
      );
    },
  },

  {
    accessorKey: "availabilty_status",
    header: "Status",
    cell: ({ row }) => {
      const status =
        row.original.availabilty_status.toLowerCase();

      const isAvailable = status === "available";

      return (
        <Badge
          variant="secondary"
          className={
            isAvailable
              ? `rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400
              `
              : `rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-700 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-400
              `
          }
        >
          {getAvailabilityLabel(
            row.original.availabilty_status
          )}
        </Badge>
      );
    },
  },

  {
    accessorKey: "isPublished",
    header: "Published",
    cell: ({ row }) => {
      const published = row.original.isPublished;

      return (
        <Badge
          variant="secondary"
          className={
            published
              ? `rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400
              `
              : `rounded-full border border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-400
              `
          }
        >
          {published ? "Published" : "Draft"}
        </Badge>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      return (
        <span
          className="text-sm font-medium text-orange-800/75 dark:text-orange-200/75
          "
        >
          {formatDate(row.original.createdAt)}
        </span>
      );
    },
  },
];

export default function RecentMealsTable({
  meals,
}: RecentMealsTableProps) {
  const table = useReactTable({
    data: meals,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card
      className="border-orange-200/70 bg-white/80 shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/10
      "
    >
      <CardHeader
        className="border-b border-orange-100 px-4 py-4 sm:px-6 dark:border-orange-900/30
        "
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div
                className="flex size-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400
                "
              >
                <ChefHat className="size-4" />
              </div>

              <CardTitle
                className="text-base font-bold tracking-tight text-orange-950 dark:text-orange-50
                "
              >
                Recent Meals
              </CardTitle>
            </div>

            <CardDescription
              className="mt-1 text-xs text-orange-700/60 dark:text-orange-300/60
              "
            >
              Recently added meals on FoodHub.
            </CardDescription>
          </div>

          <Badge
            variant="secondary"
            className="shrink-0 rounded-full border border-orange-200 bg-orange-100 px-2.5 text-[10px] font-bold text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300
            "
          >
            {meals.length} meals
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table className="max-w-250 overflow-auto">
          <TableHeader
            className="bg-orange-50/70 dark:bg-orange-950/20
      "
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-orange-100 hover:bg-transparent dark:border-orange-900/30
          "
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-11 px-4 text-[10px] font-bold uppercase tracking-wider text-orange-600/80 sm:px-6 dark:text-orange-400/80
              "
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-orange-100 transition-colors hover:bg-orange-50/60 dark:border-orange-900/30 dark:hover:bg-orange-950/20
            "
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-3 sm:px-6"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-sm text-orange-600/60 dark:text-orange-300/60
            "
                >
                  No recent meals found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}