/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Loader2, Save, RefreshCcw } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

import { Order, OrderStatus } from "@/types/order.type";
import { updateOrderStatus } from "@/lib/api/order";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toast";

interface UpdateOrderStatusDialogProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ORDER_STATUSES: OrderStatus[] = [
  "PENDING",
  "APPROVED",
  "PROCESSING",
  "COMPLETED",
  "DELIVERED",
  "CANCELLED",
  "DECLINED",
];

const statusStyles: Record<OrderStatus, string> = {
  PENDING: "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900/50 dark:bg-yellow-950/30 dark:text-yellow-400",
  APPROVED: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-400",
  PROCESSING: "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900/50 dark:bg-purple-950/30 dark:text-purple-400",
  COMPLETED: "border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400",
  DELIVERED: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400",
  CANCELLED: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400",
  DECLINED: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-400",
};

export default function UpdateOrderStatusDialog({ order, open, onOpenChange }: UpdateOrderStatusDialogProps) {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (status: OrderStatus) => {
      if (!order) {
        throw new Error("Order not found");
      }

      return updateOrderStatus(order.id, { status });
    },
    onSuccess: async () => {
      onOpenChange(false);

      toast.add({
        title: "Order Status Updated!",
        description: "The order status has been updated successfully.",
        type: "success",
      });

      await queryClient.invalidateQueries({
        queryKey: ["admin-orders"],
      });
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

  const form = useForm({
    defaultValues: {
      status: order?.status ?? "PENDING",
    },
    onSubmit: async ({ value }) => {
      if (!order) {
        return;
      }

      if (!value.status) {
        toast.add({
          title: "Status Required",
          description: "Please select an order status.",
          type: "warning",
        });

        return;
      }

      if (value.status === order.status) {
        toast.add({
          title: "No Changes",
          description: "The selected status is already the current order status.",
          type: "warning",
        });

        return;
      }

      updateMutation.mutate(value.status);
    },
  });

  React.useEffect(() => {
    if (!order || !open) {
      return;
    }

    form.reset({
      status: order.status,
    });
  }, [order, open, form]);

  const handleClose = (value: boolean) => {
    if (updateMutation.isPending) {
      return;
    }

    onOpenChange(value);
  };

  if (!order) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="lg:min-w-lg overflow-x-auto rounded-2xl border-orange-200/80 bg-white p-0 shadow-2xl shadow-orange-950/10 dark:border-orange-900/50 dark:bg-orange-950/95">
        <DialogHeader className="border-b border-orange-100 px-6 py-5 dark:border-orange-900/40">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-orange-950 dark:text-orange-50">
            <RefreshCcw className="size-5 text-orange-500" />
            Update Order Status
          </DialogTitle>

          <DialogDescription className="text-sm text-orange-700/60 dark:text-orange-300/60">
            Change the current status of this order.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="space-y-5 px-6 py-5">
            <div className="rounded-xl border border-orange-200/70 bg-orange-50/50 p-4 dark:border-orange-900/40 dark:bg-orange-950/20">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
                    Order ID
                  </p>

                  <p className="mt-1 truncate font-mono text-sm font-semibold text-orange-950 dark:text-orange-50">
                    {order.id}
                  </p>
                </div>

                <Badge variant="outline" className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[order.status]}`}>
                  {order.status}
                </Badge>
              </div>

              <div className="mt-3 border-t border-orange-200/60 pt-3 dark:border-orange-900/40">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-orange-700/70 dark:text-orange-300/70">
                    Total Amount
                  </span>

                  <span className="text-base font-bold text-orange-950 dark:text-orange-50">
                    ৳{order.total_price.toLocaleString("en-BD")}
                  </span>
                </div>
              </div>
            </div>

            <form.Field name="status">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="order-status" className="font-semibold text-orange-900 dark:text-orange-100">
                    Order Status
                  </Label>

                  <Select
                    value={field.state.value}
                    onValueChange={(value:any) => field.handleChange(value as OrderStatus)}
                    disabled={updateMutation.isPending}
                  >
                    <SelectTrigger id="order-status" className="border-orange-200 bg-white focus:border-orange-500 focus:ring-orange-500/20 dark:border-orange-800 dark:bg-orange-950/30">
                      <SelectValue placeholder="Select order status" />
                    </SelectTrigger>

                    <SelectContent>
                      {ORDER_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          <div className="flex items-center gap-2">
                            <span className={`size-2 rounded-full ${status === "PENDING" ? "bg-yellow-500" : status === "APPROVED" ? "bg-blue-500" : status === "PROCESSING" ? "bg-purple-500" : status === "COMPLETED" ? "bg-green-500" : status === "DELIVERED" ? "bg-emerald-500" : status === "CANCELLED" ? "bg-red-500" : "bg-rose-500"}`} />
                            <span>{status}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>
          </div>

          <DialogFooter className="border-t  border-orange-100  dark:border-orange-900/40">
            <Button type="button" variant="outline" 
            onClick={() => handleClose(false)} disabled={updateMutation.isPending} 
            className="rounded-lg border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40">
              Cancel
            </Button>

            <Button type="submit" disabled={updateMutation.isPending} className="rounded-lg bg-orange-600 font-semibold text-white shadow-sm shadow-orange-600/20 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700">
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Update Status
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}