/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Eye, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Order } from "@/types/order.type";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface OrdersTableColumnsProps {
  onStatusChange: (order: Order) => void;
  onView: (order: Order) => void;
}

const statusStyles: Record<Order["status"], string> = {
  PENDING: "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900/50 dark:bg-yellow-950/30 dark:text-yellow-400",
  APPROVED: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-400",
  PROCESSING: "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900/50 dark:bg-purple-950/30 dark:text-purple-400",
  COMPLETED: "border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400",
  DELIVERED: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400",
  CANCELLED: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400",
  DECLINED: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-400",
};

export const OrdersTableColumns = ({ onStatusChange, onView }: OrdersTableColumnsProps): ColumnDef<Order>[] => [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => (
      <div className="max-w-45 truncate font-mono text-xs font-semibold text-orange-800 dark:text-orange-300">
        {row.original.id}
      </div>
    ),
  },
  {
    accessorKey: "user_id",
    header: "User ID",
    cell: ({ row }) => (
      <div className="max-w-40 truncate font-mono text-xs text-orange-700/70 dark:text-orange-300/70">
        {row.original.user_id}
      </div>
    ),
  },
  {
    accessorKey: "total_price",
    header: "Total Price",
    cell: ({ row }) => (
      <span className="font-bold text-orange-950 dark:text-orange-50">
        ৳{row.original.total_price.toLocaleString("en-BD")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[row.original.status]}`}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-sm font-medium text-orange-800 dark:text-orange-200">
        {format(new Date(row.original.createdAt), "dd MMM yyyy, hh:mm a")}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={(event:any) => {
            event.stopPropagation();
            onView(row.original);
          }}
          className="size-8 rounded-lg text-orange-600 hover:bg-orange-50 hover:text-orange-700 dark:text-orange-400 dark:hover:bg-orange-950/40"
          aria-label="View order"
        >
          <Eye className="size-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={(event:any) => {
            event.stopPropagation();
            onStatusChange(row.original);
          }}
          className="size-8 rounded-lg text-orange-600 hover:bg-orange-50 hover:text-orange-700 dark:text-orange-400 dark:hover:bg-orange-950/40"
          aria-label="Change order status"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </div>
    ),
    enableSorting: false,
  },
];