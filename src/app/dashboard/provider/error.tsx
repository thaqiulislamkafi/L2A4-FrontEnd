"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProviderDashboardErrorProps {
  error?: Error & { digest?: string };
  reset?: () => void;
}

export default function ProviderDashboardError({
  error,
  reset,
}: ProviderDashboardErrorProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4 md:p-6">
      <Card className="w-full max-w-md overflow-hidden border-orange-200/80 bg-orange-50/50 shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/10">
        <CardContent className="flex flex-col items-center px-6 py-10 text-center">
          <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 ring-1 ring-orange-200 dark:bg-orange-950/50 dark:text-orange-400 dark:ring-orange-900/60">
            <AlertCircle className="size-7" />
          </div>

          <h2 className="text-lg font-bold tracking-tight text-orange-950 dark:text-orange-50">
            Unable to Load Dashboard
          </h2>

          <p className="mt-2 max-w-sm text-sm font-medium leading-6 text-orange-700/70 dark:text-orange-300/70">
            {error?.message || "Something went wrong while loading your provider dashboard."}
          </p>

          {reset && (
            <Button
              type="button"
              onClick={reset}
              className="mt-6 rounded-lg bg-orange-500 px-5 font-semibold text-white shadow-sm shadow-orange-500/20 transition-all duration-200 hover:bg-orange-600 hover:shadow-md hover:shadow-orange-500/25"
            >
              <RefreshCw className="size-4" />
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
