"use client";

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { PackageSearch } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Order } from "@/types/order.type";

interface OrdersTableProps {
  orders: Order[];
  isFetching?: boolean;
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
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatId(id: string) {
  return id.length <= 12 ? id : `${id.slice(0, 8)}...${id.slice(-4)}`;
}

const columns = [
  {
    accessorKey: "id",
    header: "Order",
    cell: ({ row }: { row: { original: Order } }) => (
      <span className="font-mono text-xs font-semibold text-orange-800 dark:text-orange-200" title={row.original.id}>
        #{formatId(row.original.id)}
      </span>
    ),
  },
  {
    accessorKey: "total_price",
    header: "Total",
    cell: ({ row }: { row: { original: Order } }) => (
      <span className="font-bold text-orange-700 dark:text-orange-300">
        {formatPrice(row.original.total_price)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: { original: Order } }) => (
      <Badge className="rounded-full border border-orange-200 bg-orange-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300">
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Ordered At",
    cell: ({ row }: { row: { original: Order } }) => (
      <span className="whitespace-nowrap text-sm font-medium text-orange-800/75 dark:text-orange-200/75">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
];

export default function OrdersTable({ orders, isFetching = false }: OrdersTableProps) {
  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative w-full overflow-x-auto">
      {isFetching && (
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-lg border border-orange-200 bg-white px-3 py-2 text-xs font-medium text-orange-600 shadow-sm dark:border-orange-800 dark:bg-orange-950/90 dark:text-orange-300">
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
              <TableRow key={row.id} className="border-orange-100 transition-colors hover:bg-orange-50/50 dark:border-orange-900/30 dark:hover:bg-orange-950/20">
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
