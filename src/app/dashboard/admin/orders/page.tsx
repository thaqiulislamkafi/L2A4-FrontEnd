"use client";

import * as React from "react";

import { useQuery } from "@tanstack/react-query";

import { getOrders } from "@/lib/api/order";
import { Order } from "@/types/order.type";

import OrdersTableToolbar from "./(components)/OrdersTableToolbar";
import { TablePagination } from "@/components/TablePagination";
import OrdersLoading from "./loading";
import OrdersError from "./error";
import OrdersTable from "./(components)/OrdersTable";
import UpdateOrderStatusDialog from "./(components)/UpdateOrderStatusDialog";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 6;

export default function OrdersPage() {
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [limit, setLimit] = React.useState(DEFAULT_LIMIT);
  const [search, setSearch] = React.useState("");

  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = React.useState(false);

  const ordersQuery = useQuery({
    queryKey: ["admin-orders", page, limit, search],
    queryFn: () =>
      getOrders({
        page,
        limit,
        search,
      }),
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

  const handleStatusChange = (order: Order) => {
    setSelectedOrder(order);
    setStatusDialogOpen(true);
  };

  const handleStatusDialogChange = (open: boolean) => {
    setStatusDialogOpen(open);

    if (!open) {
      setSelectedOrder(null);
    }
  };

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
            Manage and monitor all customer orders.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
          <OrdersTableToolbar search={search} onSearchChange={handleSearchChange} onReset={handleReset} />

          <OrdersTable orders={orders} isFetching={ordersQuery.isFetching} onStatusChange={handleStatusChange} />

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

      <UpdateOrderStatusDialog order={selectedOrder} open={statusDialogOpen} onOpenChange={handleStatusDialogChange} />
    </>
  );
}