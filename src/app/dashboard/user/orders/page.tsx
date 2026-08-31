"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import { TablePagination } from "@/components/TablePagination";
import { getUserOrders } from "@/lib/api/order";
import { useAuthStore } from "@/store/auth.store";

import OrdersTableToolbar from "./(components)/OrdersTableToolbar";
import OrdersTable from "./(components)/OrdersTable";
import OrdersLoading from "./loading";
import OrdersError from "./error";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 3;

export default function UserOrdersPage() {
  const userId = useAuthStore((state) => state.user?.id);
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [search, setSearch] = React.useState("");

  const ordersQuery = useQuery({
    queryKey: ["user-orders", userId, page, DEFAULT_LIMIT, search],
    queryFn: () => {
      if (!userId) {
        throw new Error("User account not found. Please sign in again.");
      }

      return getUserOrders(userId, {
        page,
        limit: DEFAULT_LIMIT,
        search,
      });
    },
    enabled: !!userId,
    placeholderData: (previousData) => previousData,
  });

  const orders = ordersQuery.data?.data ?? [];
  const meta = ordersQuery.data?.meta;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(DEFAULT_PAGE);
  };

  const handleReset = () => {
    setSearch("");
    setPage(DEFAULT_PAGE);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (!userId) {
    return <OrdersError message="User account not found. Please sign in again." />;
  }

  if (ordersQuery.isLoading) {
    return <OrdersLoading />;
  }

  if (ordersQuery.isError) {
    return <OrdersError onRetry={() => ordersQuery.refetch()} />;
  }

  return (
    <>
      <div className="space-y-5 p-4 md:p-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-orange-950 dark:text-orange-50">
            Orders
          </h1>

          <p className="mt-1 text-sm font-medium text-orange-700/60 dark:text-orange-300/60">
            Track and monitor all your recent orders.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
          <OrdersTableToolbar
            search={search}
            onSearchChange={handleSearchChange}
            onReset={handleReset}
          />

          <OrdersTable orders={orders} isFetching={ordersQuery.isFetching} />

          {meta && (
            <TablePagination
              page={Number(meta.page)}
              totalPages={meta.totalPage}
              totalItems={meta.total}
              itemsName="Orders"
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  );
}
