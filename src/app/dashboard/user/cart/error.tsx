"use client";

import { AlertCircle, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CartErrorProps {
  reset: () => void;
}

export default function CartError({ reset }: CartErrorProps) {
  return (
    <Card className="border-orange-200/70 bg-white shadow-sm dark:border-orange-900/40 dark:bg-orange-950/20">
      <CardContent className="flex min-h-100 flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-orange-100 text-orange-500 dark:bg-orange-950/50 dark:text-orange-400">
          <AlertCircle className="size-7" />
        </div>

        <h2 className="text-xl font-black text-orange-950 dark:text-orange-50">
          Unable to Load Your Cart
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-orange-700/60 dark:text-orange-300/60">
          Something went wrong while loading your cart items. Please try again.
        </p>

        <Button type="button" onClick={reset} className="mt-6 rounded-xl bg-orange-500 font-bold text-white hover:bg-orange-600">
          <RefreshCcw className="size-4" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
}