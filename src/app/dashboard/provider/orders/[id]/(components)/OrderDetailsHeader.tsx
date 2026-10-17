"use client";

import * as React from "react";
import { ArrowLeft, CalendarDays, Clock3, Hash, PackageCheck } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

import { Order } from "@/types/order.type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface OrderDetailsHeaderProps {
  order: Order;
  onBack: () => void;
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

export default function OrderDetailsHeader({ order, onBack }: OrderDetailsHeaderProps) {
  return (
    <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Button type="button" variant="outline" size="icon" onClick={onBack} className="size-9 shrink-0 rounded-lg border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950/40" aria-label="Back to orders">
            <ArrowLeft className="size-4" />
          </Button>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <PackageCheck className="size-5 shrink-0 text-orange-500" />
              <h1 className="text-xl font-bold tracking-tight text-orange-950 dark:text-orange-50 sm:text-2xl">
                Order Details
              </h1>
              <Badge variant="outline" className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[order.status]}`}>
                {order.status}
              </Badge>
            </div>

            <div className="mt-1 flex min-w-0 items-center gap-1.5 text-xs font-medium text-orange-700/60 dark:text-orange-300/60">
              <Hash className="size-3.5 shrink-0" />
              <span className="truncate font-mono">{order.id}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-orange-200/70 bg-orange-50/40 px-4 py-3 dark:border-orange-900/40 dark:bg-orange-950/20">
        <div className="flex items-center gap-2 text-xs font-medium text-orange-700/70 dark:text-orange-300/70">
          <CalendarDays className="size-4 text-orange-500" />
          <span>Created</span>
          <span className="font-semibold text-orange-900 dark:text-orange-100">{format(new Date(order.createdAt), "dd MMM yyyy")}</span>
        </div>

        <div className="hidden h-4 w-px bg-orange-200 sm:block dark:bg-orange-900/50" />

        <div className="flex items-center gap-2 text-xs font-medium text-orange-700/70 dark:text-orange-300/70">
          <Clock3 className="size-4 text-orange-500" />
          <span>Time</span>
          <span className="font-semibold text-orange-900 dark:text-orange-100">{format(new Date(order.createdAt), "hh:mm a")}</span>
        </div>

        <div className="hidden h-4 w-px bg-orange-200 sm:block dark:bg-orange-900/50" />

        <div className="flex items-center gap-2 text-xs font-medium text-orange-700/70 dark:text-orange-300/70">
          <Clock3 className="size-4 text-orange-500" />
          <span>Updated</span>
          <span className="font-semibold text-orange-900 dark:text-orange-100">{format(new Date(order.updatedAt), "dd MMM yyyy, hh:mm a")}</span>
        </div>
      </div>
    </motion.div>
  );
}