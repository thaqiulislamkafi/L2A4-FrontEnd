"use client";

import * as React from "react";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Meal } from "@/types/meal.type";
import { MealTableColumns } from "./MealTableColumns";

interface MealsTableProps {
  meals: Meal[];
  isFetching?: boolean;
  onEdit?: (meal: Meal) => void;
  onDelete?: (meal: Meal) => void;
}

export default function MealsTable({ meals, isFetching = false, onEdit, onDelete }: MealsTableProps) {
  const columns = React.useMemo<ColumnDef<Meal>[]>(() => MealTableColumns(onEdit ?? (() => {}), onDelete ?? (() => {})), [onEdit, onDelete]);

  const table = useReactTable({
    data: meals,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="relative border-orange-200/80 p-0 shadow-sm shadow-orange-950/5 dark:border-orange-900/40 overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table className="overflow-auto">
            <TableHeader className="bg-orange-50/80 dark:bg-orange-950/20">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-orange-200/70 hover:bg-transparent dark:border-orange-900/40">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="h-11 px-4 text-xs font-bold uppercase tracking-wide text-orange-700 dark:text-orange-300">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="border-orange-100 transition-colors hover:bg-orange-50/60 dark:border-orange-900/30 dark:hover:bg-orange-950/20">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={columns.length} className="h-32 text-center text-sm font-medium text-orange-700/60 dark:text-orange-300/60">
                    No meals found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {isFetching && (
            <div className="absolute inset-0 flex items-center justify-center bg-orange-50/40 backdrop-blur-[1px] dark:bg-orange-950/20">
              <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-white/95 px-3 py-2 text-sm font-medium text-orange-600 shadow-sm dark:border-orange-900/50 dark:bg-orange-950/95 dark:text-orange-400">
                <Loader2 className="size-4 animate-spin" />
                <span>Loading...</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}