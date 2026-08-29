"use client";

import * as React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

interface DashboardErrorProps {
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export default function DashboardError({
  message = "Something went wrong while loading your dashboard data.",
  onRetry,
  isRetrying = false,
}: DashboardErrorProps) {
  return (
    <div className={`${geist.className} flex min-h-[60vh] items-center justify-center p-4 md:p-6`}>
      <Card className="w-full max-w-md overflow-hidden border-orange-200/80 bg-orange-50/50 shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/10">
        <CardContent className="flex flex-col items-center px-6 py-10 text-center">
          {/* Error Icon */}
          <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 ring-1 ring-orange-200 dark:bg-orange-950/50 dark:text-orange-400 dark:ring-orange-900/60">
            <AlertCircle className="size-7" />
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold tracking-tight text-orange-950 dark:text-orange-50">
            Unable to Load Dashboard
          </h2>

          {/* Description */}
          <p className="mt-2 max-w-sm text-sm font-medium leading-6 text-orange-700/70 dark:text-orange-300/70">
            {message}
          </p>

          {/* Retry Button */}
          {onRetry && (
            <Button
              type="button"
              onClick={onRetry}
              disabled={isRetrying}
              className="mt-6 rounded-lg bg-orange-500 px-5 font-semibold text-white shadow-sm shadow-orange-500/20 transition-all duration-200 hover:bg-orange-600 hover:shadow-md hover:shadow-orange-500/25 disabled:opacity-70 dark:bg-orange-600 dark:hover:bg-orange-500"
            >
              <RefreshCw className={isRetrying ? "size-4 animate-spin" : "size-4"} />
              {isRetrying ? "Retrying..." : "Try Again"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}