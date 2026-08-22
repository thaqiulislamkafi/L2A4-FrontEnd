"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {ArrowRight,CircleCheck,Clock3,Flame,Package,ShoppingBag,Sparkles,Star,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getHeroMeal } from "@/lib/api/meal";
import { PrimaryMealSpinner, Spinner } from "./ui/spinner";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HomeHero() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["hero-meal"],
    queryFn: getHeroMeal,
  });

  const meal = data?.data;

if (isLoading) return <PrimaryMealSpinner/>

  if (isError || !meal) {
    return (
      <section className="relative overflow-hidden bg-orange-50">
        <div className="mx-auto flex min-h-[500px] max-w-7xl items-center justify-center px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              Something went wrong
            </h2>

            <p className="mt-2 text-slate-600">
              We couldnt load todays featured meal.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const analytics = meal.mealAnalytics?.[0];

  const totalReviews = analytics?.totalReviews ?? 0;
  const totalOrders = analytics?.totalOrders ?? 0;
  const averageRating = analytics?.averageRating ?? 0;

  const availabilityPercentage =
    meal.totalPieces > 0
      ? Math.round((meal.availablePieces / meal.totalPieces) * 100)
      : 0;

  const isAvailable =
    meal.availabilty_status === "AVAILABLE" && meal.availablePieces > 0;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 -top-20 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-500/15 blur-3xl"
        />

        <div className="absolute right-1/3 top-1/4 h-32 w-32 rounded-full bg-orange-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* ================= LEFT ================= */}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* Featured Badge */}

            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="h-auto rounded-full border-orange-200 bg-orange-100 px-5 py-2.5 text-orange-700"
              >
                <Sparkles className="h-4 w-4" />

                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Todays Featured Meal
                </span>
              </Badge>
            </motion.div>

            {/* Heading */}

            <motion.h1
              variants={itemVariants}
              className="mt-7 max-w-2xl text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl lg:text-7xl"
            >
              Taste the{" "}
              <span className="text-orange-600">
                tradition.
              </span>
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="mt-2 max-w-2xl text-4xl font-bold tracking-tight text-slate-800 md:text-5xl"
            >
              {meal.name}
            </motion.h2>

            {/* Description */}

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-2xl text-base font-medium leading-8 text-slate-600 md:text-lg"
            >
              {meal.description}
            </motion.p>

            {/* Price */}

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <div className="flex items-center gap-2 rounded-2xl bg-orange-600 px-5 py-3 text-white shadow-lg shadow-orange-600/20">
                <span className="text-sm font-medium">
                  Only
                </span>

                <span className="text-2xl font-extrabold">
                  ৳{meal.pricePerPiece}
                </span>

                <span className="text-sm font-medium">
                  / piece
                </span>
              </div>

              {isAvailable ? (
                <Badge
                  variant="outline"
                  className="h-auto rounded-2xl border-green-200 bg-green-50 px-5 py-3 text-green-700"
                >
                  <CircleCheck className="h-5 w-5" />

                  <span className="font-semibold">
                    Available Now
                  </span>
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="h-auto rounded-2xl border-red-200 bg-red-50 px-5 py-3 text-red-600"
                >
                  Currently Unavailable
                </Badge>
              )}
            </motion.div>

            {/* Meta Cards */}

            <motion.div
              variants={itemVariants}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              {/* Availability */}

              <div className="rounded-2xl border border-orange-100 bg-white/80 p-4 shadow-sm backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-orange-100 p-2.5 text-orange-600">
                    <Package className="h-5 w-5" />
                  </div>

                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Available
                    </Label>

                    <h3 className="mt-1 font-bold text-slate-900">
                      {meal.availablePieces} pieces
                    </h3>
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-orange-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${availabilityPercentage}%`,
                    }}
                    transition={{
                      delay: 0.8,
                      duration: 1,
                    }}
                    className="h-full rounded-full bg-orange-500"
                  />
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  {availabilityPercentage}% of todays stock remaining
                </p>
              </div>

              {/* Orders */}

              <div className="rounded-2xl border border-orange-100 bg-white/80 p-4 shadow-sm backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-orange-100 p-2.5 text-orange-600">
                    <ShoppingBag className="h-5 w-5" />
                  </div>

                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Ordered
                    </Label>

                    <h3 className="mt-1 font-bold text-slate-900">
                      {totalOrders} orders
                    </h3>
                  </div>
                </div>

                <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
                  <Flame className="h-3.5 w-3.5 text-orange-500" />
                  Popular among FoodHub customers
                </p>
              </div>
            </motion.div>


            {/* CTA */}

            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link href={`/explore-meals/${meal.id}`}>
                <Button
                  size="lg"
                  className="group h-auto rounded-xl bg-orange-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700 hover:shadow-orange-600/30"
                >
                  Explore Meal

                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href="/explore-meals">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-auto rounded-xl border-orange-200 bg-white px-6 py-3.5 text-sm font-semibold text-orange-700 hover:bg-orange-50 hover:text-orange-700"
                >
                  Explore All Meals
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT ================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 60,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto w-full max-w-xl"
          >
            {/* Glow */}

            <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-orange-400/25 blur-[90px]" />

            <div className="absolute -bottom-10 -left-10 h-52 w-52 rounded-full bg-orange-600/20 blur-[90px]" />

            {/* Image */}

            <div className="relative overflow-hidden rounded-[2rem] border border-orange-100 bg-white p-2 shadow-2xl shadow-orange-900/10">
              <div className="relative overflow-hidden rounded-[1.5rem]">
                {meal.image ? (
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    width={700}
                    height={800}
                    priority
                    className="h-[520px] w-full object-cover transition duration-700 hover:scale-105 md:h-[600px]"
                  />
                ) : (
                  <div className="flex h-[520px] items-center justify-center bg-orange-100 text-orange-600 md:h-[600px]">
                    No image available
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Image Badge */}

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute left-6 top-6"
                >
                  <Badge className="h-auto rounded-full border border-white/20 bg-white/15 px-5 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-xl hover:bg-white/20">
                    <Sparkles className="h-4 w-4 text-orange-300" />

                    Featured Meal
                  </Badge>
                </motion.div>

                {/* Image Content */}

                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-sm font-medium text-orange-200">
                    FoodHub Special
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-white md:text-3xl">
                    {meal.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* ================= ANALYTICS ================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.5,
                duration: 0.6,
              }}
              whileHover={{
                y: -5,
              }}
              className="absolute -bottom-12 left-1/2 w-[92%] max-w-lg -translate-x-1/2 rounded-2xl border border-white/40 bg-white/90 p-5 shadow-2xl backdrop-blur-xl"
            >
              <div className="grid grid-cols-3 divide-x divide-orange-100 text-center">
                {/* Rating */}

                <div className="px-3">
                  <div className="flex items-center justify-center gap-1.5">
                    <Star className="h-4 w-4 fill-orange-500 text-orange-500" />

                    <h3 className="text-xl font-extrabold text-orange-600 md:text-2xl">
                      {averageRating.toFixed(1)}
                    </h3>
                  </div>

                  <Label className="mt-1 justify-center text-xs font-medium text-slate-500">
                    Rating
                  </Label>
                </div>

                {/* Reviews */}

                <div className="px-3">
                  <h3 className="text-xl font-extrabold text-orange-600 md:text-2xl">
                    {totalReviews}
                  </h3>

                  <Label className="mt-1 justify-center text-xs font-medium text-slate-500">
                    Reviews
                  </Label>
                </div>

                {/* Orders */}

                <div className="px-3">
                  <h3 className="text-xl font-extrabold text-orange-600 md:text-2xl">
                    {totalOrders}
                  </h3>

                  <Label className="mt-1 justify-center text-xs font-medium text-slate-500">
                    Orders
                  </Label>
                </div>
              </div>

              <div className="my-4 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />

              <Link href={`/explore-meals/${meal.id}`}>
                <Button
                  size="lg"
                  className="group h-auto w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 px-5 py-3 font-bold text-white shadow-lg shadow-orange-600/20 hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-600/30"
                >
                  Order This Meal

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}