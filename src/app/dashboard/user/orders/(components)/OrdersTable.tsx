"use client";

import * as React from "react";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Ban, Loader2, PackageSearch } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";
import { updateOrderStatus } from "@/lib/api/order";
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

const baseColumns: ColumnDef<Order>[] = [
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
  const router = useRouter();
  const queryClient = useQueryClient();
  const [orderToCancel, setOrderToCancel] = React.useState<Order | null>(null);

  const cancelMutation = useMutation({
    mutationFn: (order: Order) => updateOrderStatus(order.id, { status: "CANCELLED" }),
    onSuccess: async () => {
      setOrderToCancel(null);
      toast.add({
        title: "Order Cancelled",
        description: "Your order has been cancelled successfully.",
        type: "success",
      });
      await queryClient.invalidateQueries({ queryKey: ["user-orders"] });
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.add({
        title: "Cancellation Failed",
        description: message || "Unable to cancel the order. Please try again.",
        type: "error",
      });
    },
  });

  const handleRowClick = (order: Order) => {
    router.push(`/dashboard/user/orders/${order.id}`);
  };

  const columns = React.useMemo<ColumnDef<Order>[]>(
    () => [
      ...baseColumns,
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const isCancelled = row.original.status === "CANCELLED";

          return (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={isCancelled}
              onClick={(event) => {
                event.stopPropagation();
                setOrderToCancel(row.original);
              }}
              className="rounded-lg"
              aria-label={`Cancel order ${row.original.id}`}
            >
              <Ban className="size-3.5" />
              {isCancelled ? "Cancelled" : "Cancel"}
            </Button>
          );
        },
        enableSorting: false,
      },
    ],
    []
  );

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
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
              <TableRow
                key={row.id}
                onClick={() => handleRowClick(row.original)}
                className="cursor-pointer border-orange-100 transition-colors hover:bg-orange-50/50 dark:border-orange-900/30 dark:hover:bg-orange-950/20"
              >
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

      <AlertDialog
        open={!!orderToCancel}
        onOpenChange={(open) => {
          if (!open && !cancelMutation.isPending) {
            setOrderToCancel(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this order?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will cancel order{" "}
              <span className="font-mono font-semibold">{orderToCancel?.id}</span>. You
              will not be able to undo it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={cancelMutation.isPending}>Keep Order</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={cancelMutation.isPending}
              onClick={() => {
                if (orderToCancel) {
                  cancelMutation.mutate(orderToCancel);
                }
              }}
            >
              {cancelMutation.isPending ? "Cancelling..." : "Yes, Cancel Order"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
