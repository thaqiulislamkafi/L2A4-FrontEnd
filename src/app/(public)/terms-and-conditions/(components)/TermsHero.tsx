"use client";

import { motion } from "framer-motion";
import { FileText, ShieldCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const TermsHero = () => {
  return (
    <section className="relative overflow-hidden border-b border-orange-100 bg-gradient-to-br from-orange-50 via-white to-orange-100/50 py-20 dark:border-orange-950/40 dark:from-orange-950/30 dark:via-background dark:to-orange-950/20">
      <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-600/10" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 size-80 rounded-full bg-orange-400/20 blur-3xl dark:bg-orange-600/10" />

      <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-6 flex justify-center">
            <Badge className="gap-2 rounded-full border border-orange-200 bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 shadow-sm hover:bg-orange-100 dark:border-orange-800/50 dark:bg-orange-950/50 dark:text-orange-400 dark:hover:bg-orange-950/50">
              <ShieldCheck className="size-4" />
              Legal &amp; Policies
            </Badge>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-7 flex justify-center">
            <div className="group relative flex size-20 items-center justify-center rounded-3xl border border-orange-200/70 bg-white shadow-xl shadow-orange-950/10 transition-all duration-500 hover:-translate-y-1 hover:rotate-1 hover:shadow-2xl hover:shadow-orange-950/15 dark:border-orange-900/50 dark:bg-orange-950/30">
              <FileText className="size-9 text-orange-600 transition-transform duration-500 group-hover:scale-110 dark:text-orange-400" />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-orange-500 shadow-sm dark:border-orange-800 dark:bg-orange-950">
                <Sparkles className="size-3.5" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Terms &amp; <span className="text-orange-600 dark:text-orange-400">Conditions</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
            Please read these terms carefully before using FoodHub. They explain your rights, responsibilities, and the rules that help us maintain a safe and enjoyable food experience for everyone.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="mt-8 flex justify-center">
            <Card className="inline-flex items-center gap-3 rounded-xl border-orange-200/70 bg-white/80 px-5 py-3 shadow-sm backdrop-blur-sm dark:border-orange-900/40 dark:bg-orange-950/20">
              <div className="flex size-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                <FileText className="size-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Last Updated
                </p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  September 8, 2026
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default TermsHero;