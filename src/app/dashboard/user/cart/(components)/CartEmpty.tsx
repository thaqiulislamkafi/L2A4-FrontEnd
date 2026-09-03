"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CartEmpty() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="overflow-hidden rounded-2xl border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
        <CardContent className="flex min-h-100 flex-col items-center justify-center px-6 py-12 text-center">
          <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-orange-100 text-orange-500 dark:bg-orange-950/50 dark:text-orange-400">
            <ShoppingCart className="size-9" />
          </div>

          <h2 className="text-2xl font-black text-orange-950 dark:text-orange-50">
            Your Cart Is Empty
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-orange-700/60 dark:text-orange-300/60">
            Discover delicious meals from FoodHub and add your favorites to your cart.
          </p>

          <Button type="button" className="mt-6 rounded-xl bg-orange-500 px-6 font-bold text-white hover:bg-orange-600">
            Explore Meals
            <ArrowRight className="size-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}