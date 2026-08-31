"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Package, Utensils, Hash, Layers3, Tag, ShoppingBag } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/order.type";

interface OrderItemsCardProps {
  order: Order;
}

const getCategoryColor = (category?: string) => {
  if (!category) {
    return "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-300";
  }

  return "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-300";
};

export default function OrderItemsCard({ order }: OrderItemsCardProps) {
  const orderItems = order.orderItems ?? [];

  return (
    <Card className="overflow-hidden border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
      <CardHeader className="border-b border-orange-100 bg-orange-50/40 px-5 py-4 dark:border-orange-900/40 dark:bg-orange-950/10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-base font-bold text-orange-950 dark:text-orange-50">
              <div className="flex size-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
                <ShoppingBag className="size-4" />
              </div>
              Order Items
            </CardTitle>

            <p className="mt-1 text-xs font-medium text-orange-700/60 dark:text-orange-300/60">
              All meals included in this order.
            </p>
          </div>

          <Badge variant="outline" className="rounded-full border-orange-200 bg-white px-2.5 py-1 text-xs font-semibold text-orange-700 dark:border-orange-800 dark:bg-orange-950/30 dark:text-orange-300">
            <Package className="mr-1 size-3.5" />
            {orderItems.length} {orderItems.length === 1 ? "Item" : "Items"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {orderItems.length > 0 ? (
          <div className="grid grid-cols-2 divide-y divide-orange-100 dark:divide-orange-900/30">
            {orderItems.map((item, index) => {
              const itemTotal = item.price * item.quantity;
              const meal = item.meal;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                  className="group p-4 transition-colors hover:bg-orange-50/40 dark:hover:bg-orange-950/20 sm:p-5"
                >
                  <div className="flex gap-4">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-orange-100 ring-1 ring-orange-200/70 dark:bg-orange-950/50 dark:ring-orange-900/50 sm:size-24">
                      {meal?.image ? (
                        <Image src={meal.image} alt={meal.name ?? "Meal"} fill sizes="96px" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                      ) : (
                        <div className="flex size-full items-center justify-center text-orange-500 dark:text-orange-400">
                          <Utensils className="size-8" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-bold text-orange-950 dark:text-orange-50 sm:text-base">
                            {meal?.name ?? "Unknown Meal"}
                          </h3>

                          {meal?.category_rel?.category_name && (
                            <Badge variant="outline" className={`mt-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${getCategoryColor(meal.category_rel.category_name)}`}>
                              <Tag className="mr-1 size-3" />
                              {meal.category_rel.category_name}
                            </Badge>
                          )}
                        </div>

                        <div className="shrink-0 text-left sm:text-right">
                          <p className="text-sm font-bold text-orange-950 dark:text-orange-50">৳{itemTotal.toLocaleString("en-BD")}</p>
                          <p className="text-[11px] font-medium text-orange-700/60 dark:text-orange-300/60">
                            ৳{item.price.toLocaleString("en-BD")} × {item.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <div className="inline-flex items-center gap-1.5 rounded-lg border border-orange-100 bg-orange-50 px-2.5 py-1.5 text-xs font-semibold text-orange-700 dark:border-orange-900/40 dark:bg-orange-950/30 dark:text-orange-300">
                          <Layers3 className="size-3.5" />
                          Quantity: {item.quantity}
                        </div>

                        <div className="inline-flex items-center gap-1.5 rounded-lg border border-orange-100 bg-white px-2.5 py-1.5 text-xs font-medium text-orange-700/70 dark:border-orange-900/40 dark:bg-orange-950/20 dark:text-orange-300/70">
                          <Hash className="size-3.5" />
                          <span className="max-w-35 truncate">{item.meal_id}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-orange-100 text-orange-500 dark:bg-orange-950/50 dark:text-orange-400">
              <Package className="size-6" />
            </div>

            <h3 className="text-sm font-bold text-orange-950 dark:text-orange-50">No order items</h3>
            <p className="mt-1 text-xs font-medium text-orange-700/60 dark:text-orange-300/60">
              This order does not contain any meals.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
