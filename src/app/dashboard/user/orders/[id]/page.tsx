"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getOrderById } from "@/lib/api/order";
import { useAuthStore } from "@/store/auth.store";

import OrderDetailsHeader from "./(components)/OrderDetailsHeader";
import OrderSummaryCard from "./(components)/OrderSummaryCard";
import OrderItemsCard from "./(components)/OrderItemsCard";
import OrderDetailsError from "./error";
import OrderDetailsLoading from "./loading";

export default function UserOrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = useAuthStore((state) => state.user?.id);

  const orderId = params.id as string;

  const orderQuery = useQuery({
    queryKey: ["user-order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: Boolean(orderId),
  });

  if (!userId) {
    return <OrderDetailsLoading />;
  }

  if (orderQuery.isLoading || !orderQuery) {
    return <OrderDetailsLoading />;
  }

  if (orderQuery.isError || !orderQuery.data?.data) {
    return <OrderDetailsError onRetry={() => orderQuery.refetch()} />;
  }

  const order = orderQuery.data.data;

  if (!order.user) {
    return <OrderDetailsLoading />;
  }

  if (order.user_id !== userId) {
    return <OrderDetailsError onRetry={() => orderQuery.refetch()} />;
  }

  return (
    <div className="space-y-5">
      <OrderDetailsHeader order={order} onBack={() => router.push("/dashboard/user/orders")} />

      <div className="grid grid-cols-1 gap-5">
        <div className="min-w-0 space-y-5">
          <OrderSummaryCard order={order} />
          <OrderItemsCard order={order} />
        </div>
      </div>
    </div>
  );
}
