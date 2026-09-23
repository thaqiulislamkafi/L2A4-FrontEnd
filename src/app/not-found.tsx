"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChefHat, Home, LayoutDashboard, Search, UtensilsCrossed } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });


const NotFound = () => {
  return (
    <main className={`${geist.className} relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-linear-to-br from-orange-50 via-white to-orange-100/50 px-4 py-16 dark:from-orange-950/20 dark:via-background dark:to-orange-950/10`}>
      <div className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-600/10" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 size-112 rounded-full bg-orange-400/20 blur-3xl dark:bg-orange-600/10" />

      <motion.div animate={{ x: [0, 12, 0], y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute left-[12%] top-[20%] hidden size-3 rounded-full bg-orange-400/50 sm:block" />
      <motion.div animate={{ x: [0, -10, 0], y: [0, 12, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="pointer-events-none absolute bottom-[20%] right-[14%] hidden size-2 rounded-full bg-orange-500/50 sm:block" />

      <div className="relative z-10 w-full max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, type: "spring", stiffness: 120 }} className="mx-auto mb-7 flex size-24 items-center justify-center rounded-3xl border border-orange-200 bg-white shadow-xl shadow-orange-950/10 dark:border-orange-900/50 dark:bg-orange-950/30">
            <motion.div animate={{ rotate: [0, -8, 8, 0], y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="flex size-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
              <ChefHat className="size-9" />
            </motion.div>
          </motion.div>

          <Badge className="mb-5 gap-2 rounded-full border border-orange-200 bg-orange-100 px-4 py-2 text-orange-700 hover:bg-orange-100 dark:border-orange-800/50 dark:bg-orange-950/50 dark:text-orange-400 dark:hover:bg-orange-950/50">
            <UtensilsCrossed className="size-4" />
            Page Not Found
          </Badge>

          <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-8xl font-black tracking-tighter text-orange-600 sm:text-9xl dark:text-orange-500">
            404
          </motion.h1>

          <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Oops! This page is off the menu.
          </motion.h2>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mx-auto mt-8 max-w-md">
            <Card className="border-orange-200/70 bg-white/80 shadow-lg shadow-orange-950/5 backdrop-blur-sm dark:border-orange-900/40 dark:bg-orange-950/20">
              <CardContent className="p-5">
                <div className="flex items-center justify-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <Search className="size-4 text-orange-500" />
                  <span>Try exploring our meals or return to the homepage.</span>
                </div>

                <Separator className="my-5 bg-orange-100 dark:bg-orange-900/40" />

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="/" className="flex-1">
                    <Button className="w-full gap-2 bg-orange-600 text-white shadow-md shadow-orange-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-700">
                      <Home className="size-4" />
                      Back to Home
                    </Button>
                  </Link>

                  <Link href="/dashboard" className="flex-1">
                    <Button variant="outline" className="w-full gap-2 border-orange-200 text-orange-600 transition-all duration-300 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800/60 dark:text-orange-400 dark:hover:bg-orange-950/50 dark:hover:text-orange-300">
                      <LayoutDashboard className="size-4" />
                      Back to Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.6 }} className="mt-7">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-orange-600 dark:text-slate-500 dark:hover:text-orange-400">
              <ArrowLeft className="size-4" />
              Return to FoodHub
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default NotFound;