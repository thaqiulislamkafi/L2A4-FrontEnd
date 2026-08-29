"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MealReviewsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-100 items-center justify-center p-4 md:p-6">
      <Card className="w-full max-w-md border-orange-200/80 bg-white dark:border-orange-900/40 dark:bg-orange-950/20">
        <CardHeader className="items-center space-y-3 text-center"><div className="flex size-14 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400"><AlertTriangle className="size-7" /></div><CardTitle className="text-lg font-bold text-orange-950 dark:text-orange-50">Failed to Load Meal Reviews</CardTitle></CardHeader>
        <CardContent className="space-y-5 text-center"><p className="text-sm text-orange-700/70 dark:text-orange-300/70">We couldn&apos;t load the meal reviews right now. Please try again.</p><Button type="button" onClick={onRetry} className="rounded-lg bg-orange-500 font-semibold text-white hover:bg-orange-600"><RefreshCw className="size-4" /> Try Again</Button></CardContent>
      </Card>
    </div>
  );
}