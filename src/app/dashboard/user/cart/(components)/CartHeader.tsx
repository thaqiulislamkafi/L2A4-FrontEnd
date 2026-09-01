"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

import { HeaderBadge } from "@/components/ui/badge";

interface CartHeaderProps {
  itemCount: number;
}

export default function CartHeader({ itemCount }: CartHeaderProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
      <HeaderBadge>
        <ShoppingCart className="size-4" />
        My Cart
      </HeaderBadge>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-orange-950 dark:text-orange-50 sm:text-4xl">
            Your Shopping Cart
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-orange-700/60 dark:text-orange-300/60 sm:text-base">
            Review the meals you have selected before proceeding with your order.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm font-semibold text-orange-600 dark:text-orange-400">
          <ShoppingCart className="size-4" />
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </div>
      </div>
    </motion.div>
  );
}