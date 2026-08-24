"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChefHat,
  Heart,
  Sparkles,
  Star,
  UtensilsCrossed,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AboutCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-orange-50/40 to-orange-100/60 dark:via-orange-950/10 dark:to-orange-950/20" />

      {/* Decorative Blurs */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-orange-500/15 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-amber-500/15 blur-[120px]"
      />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-orange-600 via-orange-600 to-amber-500 px-6 py-14 text-center shadow-2xl shadow-orange-600/20 sm:px-10 sm:py-16 lg:px-16 lg:py-20"
        >
          {/* Decorative Circles */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full border border-white/10" />

          <div className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full border border-white/10" />

          <div className="absolute left-1/4 top-10 h-20 w-20 rounded-full bg-white/5" />

          <div className="absolute bottom-10 right-1/4 h-16 w-16 rounded-full bg-white/5" />

          {/* Floating Icons */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-6 top-8 hidden h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm sm:flex"
          >
            <ChefHat className="h-7 w-7" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-8 right-7 hidden h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm sm:flex"
          >
            <UtensilsCrossed className="h-7 w-7" />
          </motion.div>

          {/* Main Content */}
          <div className="relative mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="border-white/20 bg-white/15 px-4 py-2 text-white shadow-sm backdrop-blur-md hover:bg-white/20">
                <Sparkles className="mr-2 h-4 w-4" />
                Your Next Great Meal Awaits
              </Badge>
            </motion.div>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
              Discover Something{" "}
              <span className="text-orange-100">Delicious</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-orange-50 sm:text-lg">
              Explore delicious meals from passionate food providers, discover
              new favorites, and become part of the FoodHub community.
            </p>

            {/* Rating Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white backdrop-blur-md"
            >
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 fill-current text-yellow-300"
                  />
                ))}
              </div>

              <span className="h-4 w-px bg-white/30" />

              <span className="font-medium">
                Great food. Great people. Great experiences.
              </span>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
            >
              <Button
                // asChild
                size="lg"
                className="group h-12 rounded-xl bg-white px-7 font-semibold text-orange-600 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-orange-50 hover:shadow-2xl"
              >
                <Link href="/explore-meals">
                  <UtensilsCrossed className="mr-2 h-5 w-5" />

                  Explore Meals

                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                // asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-white/40 bg-white/5 px-7 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/15 hover:text-white"
              >
                <Link href="/signup">
                  <Heart className="mr-2 h-5 w-5" />

                  Get Started
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}