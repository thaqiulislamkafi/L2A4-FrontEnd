"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TablePagination } from "@/components/TablePagination";
import { getUserOrders } from "@/lib/api/order";
import { useAuthStore } from "@/store/auth.store";
import type { Order } from "@/types/order.type";

import UserOrdersError from "./error";
import UserOrdersLoading from "./loading";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 3;

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

export default function UserOrdersPage() {
  const userId = useAuthStore((state) => state.user?.id);
  const [page, setPage] = React.useState(DEFAULT_PAGE);

  const ordersQuery = useQuery({
    queryKey: ["user-orders", userId, page, DEFAULT_LIMIT],
    queryFn: () => {
      if (!userId) {
        throw new Error("User account not found. Please sign in again.");
      }

      return getUserOrders(userId, { page, limit: DEFAULT_LIMIT });
    },
    enabled: !!userId,
    placeholderData: (previousData) => previousData,
  });

  const orders = ordersQuery.data?.data ?? [];
  const meta = ordersQuery.data?.meta;

  if (!userId) {
    return <UserOrdersError message="User account not found. Please sign in again." />;
  }

  if (ordersQuery.isLoading) {
    return <UserOrdersLoading />;
  }

  if (ordersQuery.isError) {
    return <UserOrdersError onRetry={() => ordersQuery.refetch()} />;
  }

  return (
    <div className="space-y-5 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-orange-950 dark:text-orange-50">
          My Orders
        </h1>
        <p className="mt-1 text-sm font-medium text-orange-700/60 dark:text-orange-300/60">
          Track all orders you have placed so far.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
        <div className="flex items-center justify-between gap-3 border-b border-orange-100 bg-orange-50/40 p-4 dark:border-orange-900/40 dark:bg-orange-950/10">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
              <ShoppingCart className="size-4" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight text-orange-950 dark:text-orange-50">
                Order History
              </h2>
              <p className="text-xs font-medium text-orange-700/60 dark:text-orange-300/60">
                Your recent purchases and statuses
              </p>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-orange-100 bg-orange-50/50 hover:bg-orange-50/50 dark:border-orange-900/40 dark:bg-orange-950/20">
                <TableHead className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wide text-orange-900 dark:text-orange-100">
                  Order
                </TableHead>
                <TableHead className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wide text-orange-900 dark:text-orange-100">
                  Total
                </TableHead>
                <TableHead className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wide text-orange-900 dark:text-orange-100">
                  Status
                </TableHead>
                <TableHead className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wide text-orange-900 dark:text-orange-100">
                  Ordered At
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.length > 0 ? (
                orders.map((order: Order) => (
                  <TableRow key={order.id} className="border-orange-100 transition-colors hover:bg-orange-50/50 dark:border-orange-900/30 dark:hover:bg-orange-950/20">
                    <TableCell className="px-4 py-3">
                      <span className="font-mono text-xs font-semibold text-orange-800 dark:text-orange-200" title={order.id}>
                        #{formatId(order.id)}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <span className="font-bold text-orange-700 dark:text-orange-300">
                        {formatPrice(order.total_price)}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Badge className="rounded-full border border-orange-200 bg-orange-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300">
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <span className="whitespace-nowrap text-sm font-medium text-orange-800/75 dark:text-orange-200/75">
                        {formatDate(order.createdAt)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-sm text-orange-600/60 dark:text-orange-300/60">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {meta && (
          <TablePagination
            page={Number(meta.page)}
            totalPages={meta.totalPage}
            totalItems={meta.total}
            itemsName="Orders"
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
      </div>
    </div>
  );
}
