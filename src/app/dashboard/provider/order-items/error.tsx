"use client";

import { AlertCircle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface OrderItemsErrorProps {
  onRetry?: () => void;
}

export default function OrderItemsError({ onRetry }: OrderItemsErrorProps) {
  return (
    <Card className="border-orange-200/70 shadow-sm dark:border-orange-900/40">
      <CardContent className="flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
          <AlertCircle className="size-6" />
        </div>
        <h3 className="text-base font-bold text-orange-950 dark:text-orange-50">Failed to load order items</h3>
        <p className="mt-1 max-w-md text-sm text-orange-700/60 dark:text-orange-300/60">
          Something went wrong while loading the order items. Please try again.
        </p>
        {onRetry && (
          <Button type="button" variant="outline" onClick={onRetry} className="mt-5 rounded-lg border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40">
            <RotateCcw className="size-4" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
