"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/components/ui/toast";
import { getOrderById, updateOrderStatus } from "@/lib/api/order";
import type { OrderStatus } from "@/types/order.type";
import OrderDetailsHeader from "./(components)/OrderDetailsHeader";
import OrderSummaryCard from "./(components)/OrderSummaryCard";
import CustomerInfoCard from "./(components)/CustomerInfoCard";
import OrderItemsCard from "./(components)/OrderItemsCard";
import OrderDetailsError from "./error";
import OrderDetailsLoading from "./loading";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const orderId = params.id as string;

  const orderQuery = useQuery({
    queryKey: ["provider-order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: Boolean(orderId),
  });

  const updateStatusMutation = useMutation({
    mutationFn: (status: OrderStatus) => updateOrderStatus(orderId, { status }),
    onSuccess: async () => {
      toast.add({
        title: "Order Status Updated",
        description: "The order status has been updated successfully.",
        type: "success",
      });

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["provider-order", orderId] }),
        queryClient.invalidateQueries({ queryKey: ["provider-orders"] }),
      ]);
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.add({
        title: "Status Update Failed",
        description: message || "Unable to update the order status. Please try again.",
        type: "error",
      });
    },
  });

  if (orderQuery.isLoading) {
    return <OrderDetailsLoading />;
  }

  if (orderQuery.isError || !orderQuery.data?.data) {
    return <OrderDetailsError onRetry={() => orderQuery.refetch()} />;
  }

  const order = orderQuery.data.data;
  if(!order.user) return <OrderDetailsLoading/>

  return (
    <div className="space-y-5">
      <OrderDetailsHeader
        order={order}
        onBack={() => router.push("/dashboard/provider/orders")}
        onUpdateStatus={(status) => updateStatusMutation.mutate(status)}
        isUpdatingStatus={updateStatusMutation.isPending}
      />

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