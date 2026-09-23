"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ForbiddenPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-orange-50/50 px-4 dark:bg-background">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <Card className="overflow-hidden border-orange-200/70 bg-white shadow-xl shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/10">
          <CardContent className="flex flex-col items-center px-6 py-10 text-center sm:px-8">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5, type: "spring" }} className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
              <LockKeyhole className="size-9" />
            </motion.div>

            <p className="text-sm font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-400">
              Error 403
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Access Forbidden
            </h1>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
              You don&apos;t have permission to access this page. Please make sure you&apos;re using an authorized account.
            </p>

            <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
              <Link href="/" className="flex-1">
                <Button className="w-full gap-2 bg-orange-600 text-white hover:bg-orange-700">
                  <Home className="size-4" />
                  Back to Home
                </Button>
              </Link>

              <Button variant="outline" onClick={() => window.history.back()} className="flex-1 gap-2 border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800/60 dark:text-orange-400 dark:hover:bg-orange-950/50">
                <ArrowLeft className="size-4" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
};

export default ForbiddenPage;