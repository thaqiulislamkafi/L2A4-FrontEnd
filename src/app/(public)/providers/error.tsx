"use client";

import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, RefreshCw, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProvidersErrorProps {
  onRetry: () => void;
}

const ProvidersError = ({ onRetry }: ProvidersErrorProps) => {
  return (
    <section className="flex min-h-150 items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-xl">
        <Card className="relative overflow-hidden rounded-3xl border border-orange-100 bg-background p-8 text-center shadow-lg shadow-orange-500/5 sm:p-12">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-orange-300 via-orange-500 to-amber-400" />

          <motion.div initial={{ scale: 0.85 }} animate={{ scale: 1 }} transition={{ duration: 0.35, delay: 0.1 }} className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
            <AlertCircle className="size-10" />
          </motion.div>

          <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Unable to Load Providers
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            We couldn&apos;t retrieve provider information right now. Please check your internet connection and try again.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={onRetry} className="gap-2 rounded-xl bg-orange-500 px-5 text-white shadow-sm transition-all hover:bg-orange-600 hover:shadow-md">
              <RefreshCw className="size-4" />
              Try Again
            </Button>

            <Button variant="outline" onClick={() => window.location.reload()} className="gap-2 rounded-xl border-orange-200 px-5 transition-colors hover:bg-orange-50 hover:text-orange-700 dark:border-orange-900 dark:hover:bg-orange-950/40">
              <ArrowLeft className="size-4" />
              Reload Page
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 border-t border-orange-100 pt-5 text-xs text-muted-foreground dark:border-orange-900/40">
            <UsersRound className="size-4 text-orange-500" />
            <span>FoodHub Provider Directory</span>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};

export default ProvidersError;