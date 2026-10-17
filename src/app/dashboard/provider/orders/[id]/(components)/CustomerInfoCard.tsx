"use client";

import * as React from "react";
import Image from "next/image";
import { Mail, ShieldCheck, UserCircle, UserRound } from "lucide-react";
import { motion } from "framer-motion";

import { Order } from "@/types/order.type";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CustomerInfoCardProps {
  order: Order;
}

export default function CustomerInfoCard({ order }: CustomerInfoCardProps) {
  const customer = order.user;

  return (
    <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
      <Card className="h-full overflow-hidden border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
        <CardHeader className="border-b border-orange-100 bg-orange-50/40 px-5 py-4 dark:border-orange-900/40 dark:bg-orange-950/20">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
              <UserRound className="size-4.5" />
            </div>

            <div>
              <CardTitle className="text-base font-bold text-orange-950 dark:text-orange-50">
                Customer Information
              </CardTitle>

              <p className="mt-0.5 text-xs font-medium text-orange-700/60 dark:text-orange-300/60">
                Information about the customer
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-orange-100 ring-2 ring-orange-200 ring-offset-2 ring-offset-white dark:bg-orange-950/60 dark:ring-orange-900/60 dark:ring-offset-orange-950/20">
              {customer?.image ? (
                <Image src={customer.image} alt={customer.name ?? "Customer"} fill sizes="80px" className="object-cover" />
              ) : (
                <div className="flex size-full items-center justify-center text-orange-500 dark:text-orange-400">
                  <UserCircle className="size-10" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <h3 className="truncate text-lg font-bold text-orange-950 dark:text-orange-50">
                {customer?.name ?? "Unknown Customer"}
              </h3>

              <div className="mt-1 flex items-center justify-center gap-1.5 text-sm text-orange-700/70 dark:text-orange-300/70 sm:justify-start">
                <Mail className="size-3.5 shrink-0 text-orange-500" />
                <span className="truncate">{customer?.email ?? "No email available"}</span>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <Badge variant="outline" className="rounded-full border-orange-200 bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-orange-700 dark:border-orange-800 dark:bg-orange-950/30 dark:text-orange-300">
                  <ShieldCheck className="mr-1 size-3" />
                  Customer
                </Badge>

                <Badge variant="outline" className="max-w-full rounded-full border-orange-200 bg-white px-2.5 py-1 font-mono text-[10px] font-medium text-orange-700/70 dark:border-orange-800 dark:bg-orange-950/20 dark:text-orange-300/70">
                  <span className="truncate">{customer?.id ?? order.user_id}</span>
                </Badge>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-orange-100 bg-orange-50/30 p-3 dark:border-orange-900/40 dark:bg-orange-950/10">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-orange-500/80">
                <UserRound className="size-3.5" />
                Customer ID
              </div>

              <p className="mt-1.5 truncate font-mono text-xs font-medium text-orange-900 dark:text-orange-100">
                {customer?.id ?? order.user_id}
              </p>
            </div>

            <div className="rounded-xl border border-orange-100 bg-orange-50/30 p-3 dark:border-orange-900/40 dark:bg-orange-950/10">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-orange-500/80">
                <Mail className="size-3.5" />
                Email Address
              </div>

              <p className="mt-1.5 truncate text-xs font-medium text-orange-900 dark:text-orange-100">
                {customer?.email ?? "No email available"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}