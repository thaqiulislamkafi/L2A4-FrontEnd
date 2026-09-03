"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileErrorProps {
  onRetry: () => void;
}

export default function ProfileError({ onRetry }: ProfileErrorProps) {
  return (
    <div className="flex min-h-100 items-center justify-center">
      <Card className="w-full max-w-md border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
        <CardContent className="flex flex-col items-center justify-center px-6 py-10 text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-950/30 dark:text-red-400">
            <AlertCircle className="size-7" />
          </div>

          <h2 className="text-lg font-bold text-orange-950 dark:text-orange-50">
            Unable to Load Profile
          </h2>

          <p className="mt-2 max-w-sm text-sm font-medium text-orange-700/60 dark:text-orange-300/60">
            We couldn&apos;t retrieve your profile information right now. Please try again.
          </p>

          <Button type="button" onClick={onRetry} className="mt-6 rounded-lg bg-orange-500 font-semibold text-white shadow-sm shadow-orange-500/20 hover:bg-orange-600">
            <RefreshCw className="size-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
