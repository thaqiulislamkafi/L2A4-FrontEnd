"use client";

import * as React from "react";
import { type ColumnDef,flexRender,getCoreRowModel,useReactTable,} from "@tanstack/react-table";
import { CircleDollarSign, ShoppingCart,} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export interface RecentOrder {
  id: string;
  user_id: string;
  total_price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface RecentOrdersTableProps {
  orders: RecentOrder[];
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

function formatOrderId(id: string) {
  if (id.length <= 12) {
    return id;
  }

  return `${id.slice(0, 8)}...${id.slice(-4)}`;
}

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getStatusClasses(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return ` border-orange-200 bg-orange-100 text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300
      `;

    case "confirmed":
      return ` border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-400
      `;

    case "processing":
      return ` border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-400
      `;

    case "shipped":
      return ` border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-400
      `;

    case "delivered":
    case "completed":
      return ` border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400
      `;

    case "cancelled":
    case "canceled":
    case "rejected":
      return ` border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400
      `;

    default:
      return ` border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-400
      `;
  }
}

const columns: ColumnDef<RecentOrder>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => {
      return (
        <div className="flex min-w-40 items-center gap-2">
          <div
            className=" flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400
            "
          >
            <ShoppingCart className="size-4" />
          </div>

          <span
            className=" font-mono text-xs font-semibold text-orange-800 dark:text-orange-200
            "
            title={row.original.id}
          >
            #{formatOrderId(row.original.id)}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "user_id",
    header: "Customer",
    cell: ({ row }) => {
      return (
        <span
          className=" font-mono text-xs font-medium text-orange-700/80 dark:text-orange-300/80
          "
          title={row.original.user_id}
        >
          {formatOrderId(row.original.user_id)}
        </span>
      );
    },
  },

  {
    accessorKey: "total_price",
    header: "Total Amount",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1.5">
          <CircleDollarSign
            className="
              size-4
              text-orange-500
              dark:text-orange-400
            "
          />

          <span
            className="
              font-bold
              text-orange-700
              dark:text-orange-300
            "
          >
            {formatPrice(row.original.total_price)}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Badge
          variant="secondary"
          className={`
            rounded-full
            border
            px-2.5
            py-0.5
            text-[10px]
            font-bold
            uppercase
            tracking-wide
            ${getStatusClasses(status)}
          `}
        >
          {formatStatus(status)}
        </Badge>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Ordered At",
    cell: ({ row }) => {
      return (
        <span
          className="
            whitespace-nowrap
            text-sm
            font-medium
            text-orange-800/75
            dark:text-orange-200/75
          "
        >
          {formatDate(row.original.createdAt)}
        </span>
      );
    },
  },
];

export default function RecentOrdersTable({
  orders,
}: RecentOrdersTableProps) {
  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card
      className="
        overflow-hidden
        border-orange-200/70
        bg-white/80
        shadow-sm
        shadow-orange-950/5
        dark:border-orange-900/40
        dark:bg-orange-950/10
      "
    >
      <CardHeader
        className="
          border-b
          border-orange-100
          px-4
          py-4
          sm:px-6
          dark:border-orange-900/30
        "
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div
                className="
                  flex size-8 items-center justify-center
                  rounded-lg
                  bg-orange-100
                  text-orange-600
                  dark:bg-orange-950/50
                  dark:text-orange-400
                "
              >
                <ShoppingCart className="size-4" />
              </div>

              <CardTitle
                className="
                  text-base
                  font-bold
                  tracking-tight
                  text-orange-950
                  dark:text-orange-50
                "
              >
                Recent Orders
              </CardTitle>
            </div>

            <CardDescription
              className="
                mt-1
                text-xs
                text-orange-700/60
                dark:text-orange-300/60
              "
            >
              Recently placed orders on FoodHub.
            </CardDescription>
          </div>

          <Badge
            variant="secondary"
            className="
              shrink-0
              rounded-full
              border
              border-orange-200
              bg-orange-100
              px-2.5
              text-[10px]
              font-bold
              text-orange-700
              dark:border-orange-800
              dark:bg-orange-950/50
              dark:text-orange-300
            "
          >
            {orders.length} orders
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table className="min-w-[850px]">
          <TableHeader
            className="
              bg-orange-50/70
              dark:bg-orange-950/20
            "
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="
                  border-orange-100
                  hover:bg-transparent
                  dark:border-orange-900/30
                "
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="
                      h-11
                      px-4
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-orange-600/80
                      sm:px-6
                      dark:text-orange-400/80
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
                  className="
                    border-orange-100
                    transition-colors
                    hover:bg-orange-50/60
                    dark:border-orange-900/30
                    dark:hover:bg-orange-950/20
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
                  className="
                    h-32
                    text-center
                    text-sm
                    text-orange-600/60
                    dark:text-orange-300/60
                  "
                >
                  No recent orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}