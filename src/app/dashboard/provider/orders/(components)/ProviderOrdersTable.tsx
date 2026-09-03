"use client";

import * as React from "react";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal, PackageSearch } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/toast";
import { updateOrderStatus } from "@/lib/api/order";
import type { Order, OrderStatus } from "@/types/order.type";

interface ProviderOrdersTableProps {
  orders: Order[];
  isFetching?: boolean;
}

const ACTION_STATUSES: OrderStatus[] = ["APPROVED", "PROCESSING", "COMPLETED", "DELIVERED", "DECLINED"];

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
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: ({ order, status }: { order: Order; status: OrderStatus }) =>
      updateOrderStatus(order.id, { status }),
    onSuccess: async () => {
      toast.add({ title: "Order Status Updated", description: "The order status has been updated successfully.", type: "success" });
      await queryClient.invalidateQueries({ queryKey: ["provider-orders"] });
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.add({ title: "Status Update Failed", description: message || "Unable to update the order status. Please try again.", type: "error" });
    },
  });

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
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button type="button" variant="ghost" size="icon" aria-label={`Actions for order ${row.original.id}`} />}>
            <MoreHorizontal className="size-4 text-orange-600 dark:text-orange-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 rounded-xl border-orange-200 bg-white p-1.5 dark:border-orange-900/50 dark:bg-orange-950">
            {ACTION_STATUSES.map((status) => (
              <DropdownMenuItem
                key={status}
                disabled={row.original.status === status || updateMutation.isPending}
                onClick={() => updateMutation.mutate({ order: row.original, status })}
                className="cursor-pointer rounded-lg font-medium text-orange-800 focus:bg-orange-100 focus:text-orange-700 dark:text-orange-200 dark:focus:bg-orange-950/60 dark:focus:text-orange-300"
              >
                Set {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
    },
  ], [updateMutation]);

  const table = useReactTable({ data: orders, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="relative w-full overflow-x-auto">
      {isFetching && <div className="absolute right-4 top-4 z-10 rounded-lg border border-orange-200 bg-white px-3 py-2 text-xs font-medium text-orange-600 shadow-sm dark:border-orange-800 dark:bg-orange-950/90 dark:text-orange-300">Updating...</div>}
      <Table>
        <TableHeader>{table.getHeaderGroups().map((group) => <TableRow key={group.id} className="border-orange-100 bg-orange-50/50 dark:border-orange-900/40 dark:bg-orange-950/20">{group.headers.map((header) => <TableHead key={header.id} className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wide text-orange-900 dark:text-orange-100">{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>)}</TableRow>)}</TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => <TableRow key={row.id} className="border-orange-100 dark:border-orange-900/30">{row.getVisibleCells().map((cell) => <TableCell key={cell.id} className="px-4 py-3">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}</TableRow>) : (
            <TableRow><TableCell colSpan={columns.length} className="h-64"><div className="flex flex-col items-center justify-center text-center"><PackageSearch className="mb-3 size-8 text-orange-500" /><h3 className="text-sm font-bold text-orange-950 dark:text-orange-50">No orders found</h3><p className="mt-1 text-xs font-medium text-orange-700/60 dark:text-orange-300/60">There are no orders matching your search.</p></div></TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
