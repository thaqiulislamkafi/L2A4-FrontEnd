"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import { TablePagination } from "@/components/TablePagination";
import OrderItemsError from "../../admin/order-items/error";
import OrderItemsLoading from "../../admin/order-items/loading";
import OrderItemsTableToolbar from "../../admin/order-items/(components)/OrderItemsTableToolbar";
import { getUserOrderItems } from "@/lib/api/order";
import { useAuthStore } from "@/store/auth.store";
import OrderItemsTable from "./(components)/OrderItemsTable";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 3;

export default function UserOrderItemsPage() {
  const userId = useAuthStore((state) => state.user?.id);
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [search, setSearch] = React.useState("");

  const orderItemsQuery = useQuery({
    queryKey: ["user-order-items", userId, page, DEFAULT_LIMIT, search],
    queryFn: () => {
      if (!userId) {
        throw new Error("User account not found. Please sign in again.");
      }

      return getUserOrderItems(userId, { page, limit: DEFAULT_LIMIT, search });
    },
    enabled: !!userId,
    placeholderData: (previousData) => previousData,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(DEFAULT_PAGE);
  };

  const handleReset = () => {
    setSearch("");
    setPage(DEFAULT_PAGE);
  };

  if (!userId) {
    return <OrderItemsError onRetry={() => orderItemsQuery.refetch()} />;
  }

  if (orderItemsQuery.isLoading || !orderItemsQuery) return <OrderItemsLoading />;
  if (orderItemsQuery.isError) {
    return <OrderItemsError onRetry={() => orderItemsQuery.refetch()} />;
  }

  const orderItems = orderItemsQuery.data?.data ?? [];
  const meta = orderItemsQuery.data?.meta;

  return (
    <div className="space-y-5 p-4 md:p-6 max-w-234">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-orange-950 dark:text-orange-50">
          My Order Items
        </h1>
        <p className="mt-1 text-sm font-medium text-orange-700/60 dark:text-orange-300/60">
          View all items included in your orders.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
        <OrderItemsTableToolbar
          search={search}
          onSearchChange={handleSearchChange}
          onReset={handleReset}
        />
        <OrderItemsTable
          orderItems={orderItems}
          isFetching={orderItemsQuery.isFetching}
        />
        {meta && (
          <TablePagination
            page={Number(meta.page)}
            totalPages={meta.totalPage}
            totalItems={meta.total}
            itemsName="Order Items"
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
