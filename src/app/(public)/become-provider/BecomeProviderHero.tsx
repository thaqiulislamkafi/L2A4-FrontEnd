"use client";

import { motion } from "framer-motion";
import {ArrowRight,BadgeCheck,ChefHat,Heart,Sparkles,Utensils,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function BecomeProviderHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-orange-50 via-white to-amber-50 py-20 md:py-28 dark:from-orange-950/20 dark:via-background dark:to-amber-950/10">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-orange-400/15 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-amber-400/15 blur-3xl"
        />

        <div className="absolute left-1/2 top-20 h-40 w-40 -translate-x-1/2 rounded-full bg-orange-500/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Badge */}
            <Badge
              variant="outline"
              className="mb-6 gap-2 rounded-full border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm dark:border-orange-800 dark:bg-orange-950/30 dark:text-orange-400"
            >
              <Sparkles className="h-4 w-4" />
              Join the FoodHub Community
            </Badge>

            {/* Heading */}
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
              Turn Your Passion for Food Into a{" "}
              <span className="text-orange-600">FoodHub Journey</span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
              Share your delicious creations with food lovers around you.
              Become a FoodHub provider and turn your cooking skills into an
              opportunity to grow, connect, and serve amazing meals.
            </p>

            {/* Highlights */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <BadgeCheck className="h-5 w-5 text-orange-600" />
                Easy Registration
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Heart className="h-5 w-5 text-orange-600" />
                Food Community
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Utensils className="h-5 w-5 text-orange-600" />
                Share Your Meals
              </div>
            </div>

            {/* Actions */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#provider-registration">
                <Button
                  size="lg"
                  className="group h-12 w-full rounded-xl bg-orange-600 px-7 font-semibold text-white shadow-lg shadow-orange-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/30 sm:w-auto"
                >
                  Become a Provider
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href="#provider-guidelines">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-xl border-orange-200 px-7 font-semibold text-orange-700 transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 sm:w-auto dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950/30"
                >
                  View Guidelines
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: "easeOut",
            }}
            className="relative mx-auto w-full max-w-lg"
          >
            {/* Main Card */}
            <Card className="relative overflow-hidden rounded-3xl border-orange-100 bg-white/80 p-6 shadow-2xl shadow-orange-900/10 backdrop-blur-xl dark:border-orange-900/50 dark:bg-slate-900/80">
              {/* Top icon */}
              <div className="flex items-center justify-between">
                <Badge className="rounded-full bg-orange-100 px-3 py-1.5 text-orange-700 hover:bg-orange-100 dark:bg-orange-950/40 dark:text-orange-400">
                  <ChefHat className="mr-1.5 h-4 w-4" />
                  Food Provider
                </Badge>

                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                >
                  <Utensils className="h-6 w-6" />
                </motion.div>
              </div>

              {/* Illustration area */}
              <div className="relative mt-6 flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-orange-100 via-amber-50 to-orange-50 dark:from-orange-950/40 dark:via-amber-950/20 dark:to-orange-950/30">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-2xl dark:bg-slate-800"
                >
                  <ChefHat className="h-20 w-20 text-orange-600" />
                </motion.div>

                {/* Floating decorations */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-8 top-8 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-orange-600 shadow-lg dark:bg-slate-800"
                >
                  <Heart className="h-5 w-5 fill-orange-600" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-8 right-8 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-amber-600 shadow-lg dark:bg-slate-800"
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
              </div>

              {/* Bottom content */}
              <div className="mt-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Your Kitchen. Your Passion. Your Community.
                </h2>

                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  Create your provider profile and start sharing your favorite
                  meals with FoodHub users.
                </p>
              </div>

              {/* Progress-like indicators */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  "Create Profile",
                  "Add Meals",
                  "Serve Customers",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-xl border border-orange-100 bg-orange-50/70 p-3 text-center dark:border-orange-900/40 dark:bg-orange-950/20"
                  >
                    <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">
                      {index + 1}
                    </div>

                    <p className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Decorative glow */}
            <div className="absolute -bottom-8 -right-8 -z-10 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}