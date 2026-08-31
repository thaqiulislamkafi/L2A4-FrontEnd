"use client";

import * as React from "react";
import { CalendarClock, Hash, Package, Receipt, ShoppingBag, WalletCards } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

import { Order } from "@/types/order.type";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderSummaryCardProps {
  order: Order;
}

const statusStyles: Record<Order["status"], string> = {
  PENDING: "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900/50 dark:bg-yellow-950/30 dark:text-yellow-400",
  APPROVED: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-400",
  PROCESSING: "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900/50 dark:bg-purple-950/30 dark:text-purple-400",
  COMPLETED: "border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400",
  DELIVERED: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400",
  CANCELLED: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400",
  DECLINED: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-400",
};

export default function OrderSummaryCard({ order }: OrderSummaryCardProps) {
  const itemCount = order.orderItems?.reduce((total, item) => total + item.quantity, 0) ?? 0;
  const uniqueItems = order.orderItems?.length ?? 0;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
      <Card className="overflow-hidden border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
        <CardHeader className="border-b border-orange-100 bg-orange-50/40 px-5 py-4 dark:border-orange-900/40 dark:bg-orange-950/20">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
              <Receipt className="size-4.5" />
            </div>

            <div>
              <CardTitle className="text-base font-bold text-orange-950 dark:text-orange-50">
                Order Summary
              </CardTitle>

              <p className="mt-0.5 text-xs font-medium text-orange-700/60 dark:text-orange-300/60">
                Overview of this order
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group rounded-xl border border-orange-100 bg-orange-50/50 p-4 transition-all duration-200 hover:border-orange-200 hover:bg-orange-50 dark:border-orange-900/40 dark:bg-orange-950/20 dark:hover:border-orange-800 dark:hover:bg-orange-950/30">
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                  <WalletCards className="size-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500/70">Total</span>
              </div>

              <p className="mt-3 text-xl font-bold text-orange-950 dark:text-orange-50">৳{order.total_price.toLocaleString("en-BD")}</p>
              <p className="mt-0.5 text-xs font-medium text-orange-700/60 dark:text-orange-300/60">Order value</p>
            </div>

            <div className="group rounded-xl border border-orange-100 bg-orange-50/50 p-4 transition-all duration-200 hover:border-orange-200 hover:bg-orange-50 dark:border-orange-900/40 dark:bg-orange-950/20 dark:hover:border-orange-800 dark:hover:bg-orange-950/30">
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                  <ShoppingBag className="size-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500/70">Items</span>
              </div>

              <p className="mt-3 text-xl font-bold text-orange-950 dark:text-orange-50">{itemCount}</p>
              <p className="mt-0.5 text-xs font-medium text-orange-700/60 dark:text-orange-300/60">Total quantity · {uniqueItems} products</p>
            </div>

            <div className="group rounded-xl border border-orange-100 bg-orange-50/50 p-4 transition-all duration-200 hover:border-orange-200 hover:bg-orange-50 dark:border-orange-900/40 dark:bg-orange-950/20 dark:hover:border-orange-800 dark:hover:bg-orange-950/30">
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                  <Package className="size-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500/70">Status</span>
              </div>

              <div className="mt-3">
                <Badge variant="outline" className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[order.status]}`}>
                  {order.status}
                </Badge>
              </div>

              <p className="mt-2 text-xs font-medium text-orange-700/60 dark:text-orange-300/60">Current order status</p>
            </div>

            <div className="group rounded-xl border border-orange-100 bg-orange-50/50 p-4 transition-all duration-200 hover:border-orange-200 hover:bg-orange-50 dark:border-orange-900/40 dark:bg-orange-950/20 dark:hover:border-orange-800 dark:hover:bg-orange-950/30">
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                  <CalendarClock className="size-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500/70">Date</span>
              </div>

              <p className="mt-3 text-sm font-bold text-orange-950 dark:text-orange-50">{format(new Date(order.createdAt), "dd MMM yyyy")}</p>
              <p className="mt-0.5 text-xs font-medium text-orange-700/60 dark:text-orange-300/60">{format(new Date(order.createdAt), "hh:mm a")}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-orange-100 bg-orange-50/30 px-4 py-3 dark:border-orange-900/40 dark:bg-orange-950/10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-2">
              <Hash className="size-4 shrink-0 text-orange-500" />
              <span className="text-xs font-semibold text-orange-700 dark:text-orange-300">Order ID</span>
              <span className="truncate font-mono text-xs font-medium text-orange-900 dark:text-orange-100">{order.id}</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-orange-700/60 dark:text-orange-300/60">
              <span>Last updated:</span>
              <span className="font-semibold text-orange-900 dark:text-orange-100">{format(new Date(order.updatedAt), "dd MMM yyyy, hh:mm a")}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
