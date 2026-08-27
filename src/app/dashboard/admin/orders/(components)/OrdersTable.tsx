"use client";

import * as React from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Loader2, PackageSearch } from "lucide-react";

import { Order } from "@/types/order.type";
import { OrdersTableColumns } from "./OrdersTableColumns";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface OrdersTableProps {
  orders: Order[];
  isFetching?: boolean;
  onStatusChange: (order: Order) => void;
}

export default function OrdersTable({ orders, isFetching = false, onStatusChange }: OrdersTableProps) {
  const router = useRouter();

  const handleRowClick = (order: Order) => {
    router.push(`/dashboard/admin/orders/${order.id}`);
  };

  const columns = React.useMemo(
    () =>
      OrdersTableColumns({
        onView: handleRowClick,
        onStatusChange,
      }),
    [onStatusChange]
  );

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative w-full overflow-x-auto">
      {isFetching && (
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-lg border border-orange-200 bg-white px-3 py-2 text-xs font-medium text-orange-600 shadow-sm dark:border-orange-800 dark:bg-orange-950/90 dark:text-orange-300">
          <Loader2 className="size-3.5 animate-spin" />
          Updating...
        </div>
      )}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-orange-100 bg-orange-50/50 hover:bg-orange-50/50 dark:border-orange-900/40 dark:bg-orange-950/20">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wide text-orange-900 dark:text-orange-100">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} onClick={() => handleRowClick(row.original)} className="cursor-pointer border-orange-100 transition-colors hover:bg-orange-50/50 dark:border-orange-900/30 dark:hover:bg-orange-950/20">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-64">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-orange-100 text-orange-500 dark:bg-orange-950/50 dark:text-orange-400">
                    <PackageSearch className="size-6" />
                  </div>

                  <h3 className="text-sm font-bold text-orange-950 dark:text-orange-50">
                    No orders found
                  </h3>

                  <p className="mt-1 text-xs font-medium text-orange-700/60 dark:text-orange-300/60">
                    There are no orders matching your search.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}