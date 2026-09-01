"use client";

import { Loader2, ShoppingCart } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function CartLoading() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse space-y-3">
        <div className="h-6 w-28 rounded-full bg-orange-100 dark:bg-orange-950/50" />
        <div className="h-10 w-72 rounded-lg bg-orange-100 dark:bg-orange-950/50" />
        <div className="h-5 w-96 max-w-full rounded-lg bg-orange-100 dark:bg-orange-950/50" />
      </div>

      <Card className="overflow-hidden border-orange-200/70 dark:border-orange-900/40">
        <CardContent className="flex min-h-100 flex-col items-center justify-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-orange-100 text-orange-500 dark:bg-orange-950/50 dark:text-orange-400">
            <ShoppingCart className="size-7" />
          </div>

          <Loader2 className="size-6 animate-spin text-orange-500" />

          <p className="text-sm font-semibold text-orange-700/60 dark:text-orange-300/60">
            Loading your cart...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}