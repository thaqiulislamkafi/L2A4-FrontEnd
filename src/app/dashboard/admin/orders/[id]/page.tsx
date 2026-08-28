"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getOrderById } from "@/lib/api/order";
import OrderDetailsHeader from "./(components)/OrderDetailsHeader";
import OrderSummaryCard from "./(components)/OrderSummaryCard";
import CustomerInfoCard from "./(components)/CustomerInfoCard";
import OrderItemsCard from "./(components)/OrderItemsCard";
import OrderDetailsError from "./error";
import OrderDetailsLoading from "./loading";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const orderId = params.id as string;

  const orderQuery = useQuery({
    queryKey: ["admin-order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: Boolean(orderId),
  });

  if (orderQuery.isLoading || !orderQuery) {
    return <OrderDetailsLoading />;
  }

  if (orderQuery.isError || !orderQuery.data?.data) {
    return <OrderDetailsError onRetry={() => orderQuery.refetch()} />;
  }

  const order = orderQuery.data.data;
  if(!order.user) return <OrderDetailsLoading/>

  return (
    <div className="space-y-5">
      <OrderDetailsHeader order={order} onBack={() => router.push("/dashboard/admin/orders")} />

      <div className="grid gap-5 grid-cols-1">
        <div className="min-w-0 space-y-5">
          <OrderSummaryCard order={order} />
          <OrderItemsCard order={order} />
        </div>

        <div className="min-w-0 space-y-5">
          <CustomerInfoCard order={order} />
        </div>
      </div>
    </div>
  );
}