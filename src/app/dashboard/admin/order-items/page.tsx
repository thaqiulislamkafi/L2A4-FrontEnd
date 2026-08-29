"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import { TablePagination } from "@/components/TablePagination";
import { getOrderItems } from "@/lib/api/order";

import OrderItemsLoading from "./loading";
import OrderItemsError from "./error";
import OrderItemsTable from "./(components)/OrderItemsTable";
import OrderItemsTableToolbar from "./(components)/OrderItemsTableToolbar";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 6;

export default function OrderItemsPage() {
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [search, setSearch] = React.useState("");

  const orderItemsQuery = useQuery({
    queryKey: ["admin-order-items", page, DEFAULT_LIMIT, search],
    queryFn: () => getOrderItems({ page, limit: DEFAULT_LIMIT, search }),
    placeholderData: (previousData) => previousData,
  });

  const orderItems = orderItemsQuery.data?.data ?? [];
  const meta = orderItemsQuery.data?.meta;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(DEFAULT_PAGE);
  };

  const handleReset = () => {
    setSearch("");
    setPage(DEFAULT_PAGE);
  };

  if (orderItemsQuery.isLoading) return <OrderItemsLoading />;
  if (orderItemsQuery.isError) {
    return <OrderItemsError onRetry={() => orderItemsQuery.refetch()} />;
  }

  return (
    <div className="space-y-5 p-4 md:p-6 max-w-234">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-orange-950 dark:text-orange-50">
          Order Items
        </h1>
        <p className="mt-1 text-sm font-medium text-orange-700/60 dark:text-orange-300/60">
          View all items included in customer orders.
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