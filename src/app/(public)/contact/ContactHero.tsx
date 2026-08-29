"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  Headphones,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

const ContactHero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-orange-50/50 py-24 dark:bg-orange-950/10">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-100 w-100 -translate-x-1/2 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-600/10" />

        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 25, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-orange-300/10 blur-3xl"
        />

        <div className="absolute inset-0 bg-linear-to-b from-orange-100/40 via-background to-background dark:from-orange-950/20 dark:via-background dark:to-background" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}
          <Badge
            variant="outline"
            className="mb-7 rounded-full border-orange-200 bg-orange-50/80 px-4 py-2 text-sm font-medium text-orange-700 shadow-sm backdrop-blur-sm dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-400"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            We would Love to Hear From You
          </Badge>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
            Lets Talk About{" "}
            <span className="text-orange-600 dark:text-orange-500">
              Food
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Have a question, suggestion, or need help with your order?
            Our FoodHub team is always ready to help you enjoy a better
            food experience.
          </p>

          {/* Floating icons */}
          <div className="relative mx-auto mt-12 h-20 max-w-md">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-8 top-0 flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-200 bg-white text-orange-600 shadow-lg dark:border-orange-900 dark:bg-orange-950/50"
            >
              <Headphones className="h-5 w-5" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-8 top-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-200 bg-white text-orange-600 shadow-lg dark:border-orange-900 dark:bg-orange-950/50"
            >
              <Sparkles className="h-5 w-5" />
            </motion.div>

            <div className="absolute left-1/2 top-2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-xl shadow-orange-600/30">
              <MessageCircle className="h-7 w-7" />
            </div>
          </div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="mt-4 flex justify-center text-orange-500"
          >
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;