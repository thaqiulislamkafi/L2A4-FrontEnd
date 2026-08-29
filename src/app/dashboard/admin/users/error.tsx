"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface UsersErrorProps {
  onRetry?: () => void;
}

export default function UsersError({ onRetry }: UsersErrorProps) {
  return (
    <Card className="overflow-hidden rounded-xl border-orange-200/80 bg-white shadow-sm dark:border-orange-900/40 dark:bg-orange-950/10">

      <CardContent className="flex min-h-[320px] flex-col items-center justify-center px-6 py-12 text-center">

        <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 ring-1 ring-orange-200 dark:bg-orange-950/50 dark:text-orange-400 dark:ring-orange-900/50">
          <AlertCircle className="size-6" />
        </div>

        <h3 className="text-base font-bold tracking-tight text-orange-950 dark:text-orange-50">
          Failed to load users
        </h3>

        <p className="mt-1.5 max-w-md text-sm font-medium text-orange-700/60 dark:text-orange-300/60">
          We couldn&apos;t retrieve the users at this time. Please try again.
        </p>

      
          <Button type="button" onClick={onRetry} className="mt-5 h-9 gap-2 rounded-lg bg-orange-500 px-4 font-semibold text-white shadow-sm shadow-orange-500/20 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500">
            <RefreshCw className="size-4" />
            Try Again
          </Button>

      </CardContent>
    </Card>
  );
}