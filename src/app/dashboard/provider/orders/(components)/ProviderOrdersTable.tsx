"use client";

import * as React from "react";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { PackageSearch } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Order, OrderStatus } from "@/types/order.type";
import { useRouter } from "next/navigation";

interface ProviderOrdersTableProps {
  orders: Order[];
  isFetching?: boolean;
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

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price);
}

const statusStyles: Record<OrderStatus, string> = {
  PENDING: "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900/50 dark:bg-yellow-950/30 dark:text-yellow-400",
  APPROVED: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-400",
  PROCESSING: "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900/50 dark:bg-purple-950/30 dark:text-purple-400",
  COMPLETED: "border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400",
  DELIVERED: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400",
  CANCELLED: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400",
  DECLINED: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-400",
};

export default function ProviderOrdersTable({ orders, isFetching = false }: ProviderOrdersTableProps) {

  const router = useRouter();

  const handleRowClick = (order: Order) => {
    router.push(`/dashboard/provider/orders/${order.id}`);
  };


  const columns = React.useMemo<ColumnDef<Order>[]>(() => [
    {
      accessorKey: "id",
      header: "Order",
      cell: ({ row }) => <span className="font-mono text-xs font-semibold text-orange-800 dark:text-orange-200" title={row.original.id}>{row.original.id}</span>,
    },
    {
      accessorKey: "user_id",
      header: "Customer",
      cell: ({ row }) => <span className="font-mono text-xs text-orange-700/70 dark:text-orange-300/70">{row.original.user_id}</span>,
    },
    {
      accessorKey: "contact",
      header: "Contact",
      cell: ({ row }) => <span className="whitespace-nowrap text-sm text-orange-800 dark:text-orange-200">{row.original.contact || "—"}</span>,
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <span
          className="block max-w-56 truncate text-sm text-orange-800 dark:text-orange-200"
          title={row.original.location}
        >
          {row.original.location || "—"}
        </span>
      ),
    },
    {
      accessorKey: "total_price",
      header: "Total",
      cell: ({ row }) => <span className="font-bold text-orange-700 dark:text-orange-300">{formatPrice(row.original.total_price)}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <Badge variant="outline" className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${statusStyles[row.original.status]}`}>{row.original.status}</Badge>,
    },
    {
      accessorKey: "createdAt",
      header: "Ordered At",
      cell: ({ row }) => <span className="whitespace-nowrap text-sm font-medium text-orange-800/75 dark:text-orange-200/75">{formatDate(row.original.createdAt)}</span>,
    },
  ], []);

  const table = useReactTable({ data: orders, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="relative w-full overflow-x-auto">
      {isFetching && <div className="absolute right-4 top-4 z-10 rounded-lg border border-orange-200 bg-white px-3 py-2 text-xs font-medium text-orange-600 shadow-sm dark:border-orange-800 dark:bg-orange-950/90 dark:text-orange-300">Updating...</div>}

      <Table>
        <TableHeader>{table.getHeaderGroups().map((group) =>

          <TableRow key={group.id} className="border-orange-100 bg-orange-50/50 dark:border-orange-900/40 dark:bg-orange-950/20">{group.headers.map((header) =>

            <TableHead key={header.id} className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wide text-orange-900 dark:text-orange-100">{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>)}

          </TableRow>)}

        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? table.getRowModel().rows.map((row) =>

            <TableRow key={row.id} onClick={() => handleRowClick(row.original)} className="cursor-pointer border-orange-100 dark:border-orange-900/30">{row.getVisibleCells().map((cell) =>
              <TableCell key={cell.id}  className="px-4 py-3">{flexRender(cell.column.columnDef.cell, cell.getContext())}

              </TableCell>)}

            </TableRow>) :
            (
              <TableRow>

                <TableCell colSpan={columns.length} className="h-64">
                  <div className="flex flex-col items-center justify-center text-center">
                    <PackageSearch className="mb-3 size-8 text-orange-500" />
                    <h3 className="text-sm font-bold text-orange-950 dark:text-orange-50">No orders found
                    </h3>
                    <p className="mt-1 text-xs font-medium text-orange-700/60 dark:text-orange-300/60">There are no orders matching your search.
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
