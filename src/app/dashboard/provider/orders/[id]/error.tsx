"use client";

import * as React from "react";
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface OrderDetailsErrorProps {
  onRetry: () => void;
}

export default function OrderDetailsError({ onRetry }: OrderDetailsErrorProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-lg overflow-hidden border-orange-200/70 bg-white shadow-lg shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
        <CardContent className="flex flex-col items-center px-6 py-10 text-center">
          <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-red-50 text-red-500 ring-8 ring-red-50/60 dark:bg-red-950/30 dark:text-red-400 dark:ring-red-950/20">
            <AlertCircle className="size-8" />
          </div>

          <h2 className="text-lg font-bold text-orange-950 dark:text-orange-50">
            Unable to Load Order
          </h2>

          <p className="mt-2 max-w-sm text-sm font-medium leading-6 text-orange-700/60 dark:text-orange-300/60">
            We could not load the order details right now. Please try again or return to the orders page.
          </p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button type="button" onClick={onRetry} className="rounded-lg bg-orange-500 font-semibold text-white shadow-sm shadow-orange-500/20 hover:bg-orange-600">
              <RefreshCw className="size-4" />
              Try Again
            </Button>

            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/admin/orders")} className="rounded-lg border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40">
              <ArrowLeft className="size-4" />
              Back to Orders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}