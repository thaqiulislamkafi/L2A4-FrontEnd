"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import { TablePagination } from "@/components/TablePagination";
import { getProviderOrders } from "@/lib/api/order";
import { useAuthStore } from "@/store/auth.store";
import OrdersTableToolbar from "../../user/orders/(components)/OrdersTableToolbar";
import UserOrdersLoading from "../../user/orders/loading";
import UserOrdersError from "../../user/orders/error";
import ProviderOrdersTable from "./(components)/ProviderOrdersTable";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export default function ProviderOrdersPage() {
  const providerId = useAuthStore((state) => state.user?.id);
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [search, setSearch] = React.useState("");

  const ordersQuery = useQuery({
    queryKey: ["provider-orders", providerId, page, DEFAULT_LIMIT, search],
    queryFn: () => {
      if (!providerId) {
        throw new Error("Provider account not found. Please sign in again.");
      }

      return getProviderOrders(providerId, { page, limit: DEFAULT_LIMIT, search });
    },
    enabled: !!providerId,
    placeholderData: (previousData) => previousData,
  });

  if (!providerId) {
    return <UserOrdersError message="Provider account not found. Please sign in again." />;
  }

  if (ordersQuery.isLoading) {
    return <UserOrdersLoading />;
  }

  if (ordersQuery.isError) {
    return <UserOrdersError onRetry={() => ordersQuery.refetch()} />;
  }

  const orders = ordersQuery.data?.data ?? [];
  const meta = ordersQuery.data?.meta;

  return (
    <div className="space-y-5 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-orange-950 dark:text-orange-50">Orders</h1>
        <p className="mt-1 text-sm font-medium text-orange-700/60 dark:text-orange-300/60">
          Manage orders placed for your meals.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20 grid grid-cols-1">
        <OrdersTableToolbar
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(DEFAULT_PAGE);
          }}
          onReset={() => {
            setSearch("");
            setPage(DEFAULT_PAGE);
          }}
        />
        <ProviderOrdersTable orders={orders} isFetching={ordersQuery.isFetching} />
        {meta && (
          <TablePagination
            page={Number(meta.page)}
            totalPages={meta.totalPage}
            totalItems={meta.total}
            itemsName="Orders"
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}