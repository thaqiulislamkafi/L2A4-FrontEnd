"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  Users,
  Utensils,
  ShoppingBag,
  Star,
  Store,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { getDashboardStats } from "@/lib/api/dashboardStats";

import { Card, CardContent } from "@/components/ui/card";
import { Badge, HeaderBadge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Skeleton } from "./ui/skeleton";

const statisticsConfig = [
  {
    key: "totalUsers",
    title: "Registered Users",
    icon: Users,
    description: "People enjoying FoodHub",
  },
//   {
//     key: "totalProviders",
//     title: "Food Providers",
//     icon: Store,
//     description: "Trusted providers serving meals",
//   },
  {
    key: "totalMeals",
    title: "Meals Available",
    icon: Utensils,
    description: "Delicious meals available",
  },
  {
    key: "totalOrders",
    title: "Orders Placed",
    icon: ShoppingBag,
    description: "Successful food orders",
  },
  {
    key: "totalReviews",
    title: "Customer Reviews",
    icon: Star,
    description: "Reviews from our customers",
  },
] as const;

export default function HomeStatistics() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });

  const stats = data?.data;

  /* ============================================================
     Loading State
  ============================================================ */

  if (isLoading) {
    return (
      <section className="relative overflow-hidden py-24">
        {/* Background */}

        <div className="absolute inset-0 bg-linear-to-b from-orange-50 via-transparent to-orange-50 dark:from-orange-950/20 dark:via-background dark:to-orange-950/20" />

        <div className="relative  mx-auto px-4">
          {/* Header Skeleton */}

          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto h-8 w-40 rounded-full" />

            <Skeleton className="mx-auto mt-6 h-12 w-80 max-w-full" />

            <Skeleton className="mx-auto mt-5 h-5 w-full max-w-2xl" />
            <Skeleton className="mx-auto mt-2 h-5 w-2/3 max-w-xl" />
          </div>

          {/* Cards Skeleton */}

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Card
                key={index}
                className="overflow-hidden rounded-3xl border-orange-100 dark:border-orange-900/30"
              >
                <CardContent className="p-6">
                  <Skeleton className="size-14 rounded-2xl" />

                  <Skeleton className="mt-6 h-10 w-24" />

                  <Skeleton className="mt-3 h-6 w-36" />

                  <Skeleton className="mt-3 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-4/5" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ============================================================
     Error State
  ============================================================ */

  if (isError || !stats) {
    return (
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-linear-to-b from-orange-50 via-transparent to-orange-50 dark:from-orange-950/20 dark:via-background dark:to-orange-950/20" />

        <div className="relative  mx-auto px-4">
          <Card className="mx-auto max-w-xl border-orange-200 bg-orange-50/70 dark:border-orange-900/40 dark:bg-orange-950/20">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-950/50">
                <ShoppingBag className="size-7 text-orange-600 dark:text-orange-400" />
              </div>

              <Label className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                Statistics unavailable
              </Label>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                We couldnt load the latest FoodHub statistics right now.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  /* ============================================================
     Main UI
  ============================================================ */

  return (
    <section className="relative overflow-hidden py-24 max-w-7xl">
      {/* ========================================================
          Background
      ======================================================== */}

      <div className="absolute inset-0 bg-linear-to-b from-orange-50 via-transparent to-orange-50 dark:from-orange-950/20 dark:via-background dark:to-orange-950/20" />

      {/* Decorative Glow */}

      <div className="absolute -left-32 top-20 size-72 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-600/10" />

      <div className="absolute -right-32 bottom-10 size-72 rounded-full bg-orange-400/20 blur-3xl dark:bg-orange-600/10" />

      <div className="relative  mx-auto px-4">
        {/* ======================================================
            Header
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}

          <HeaderBadge>
            <span className="size-2 animate-pulse rounded-full bg-orange-500" />
            FoodHub Statistics
          </HeaderBadge>

          {/* Heading */}

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-white">
            Growing With Food Lovers
          </h2>

          {/* Description */}

          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            FoodHub connects food lovers with trusted providers and delicious
            meals, making every order a better experience.
          </p>
        </motion.div>

        {/* ======================================================
            Statistics Grid
        ====================================================== */}

        <div className="mt-16 flex gap-3  max-w-5xl mx-auto">
          {statisticsConfig.map((stat, index) => {
            const Icon = stat.icon;

            const value =
              stats[stat.key as keyof typeof stats] ?? 0;

            return (
              <motion.div
                key={stat.key}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group"
              >
                <Card className="relative h-full overflow-hidden  border-orange-100 bg-orange-100/10 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-orange-100/50 dark:border-orange-900/30 dark:bg-slate-900/70 dark:group-hover:shadow-orange-950/20">
                  {/* Hover Background */}

                  <div className="absolute  inset-0 bg-linear-to-br from-orange-50/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-950/20" />

                  <CardContent className="relative p-6">
                    {/* Icon */}

                    <div className="inline-flex rounded-2xl bg-orange-100 p-4 transition-all duration-300 group-hover:bg-orange-600 dark:bg-orange-950/40 dark:group-hover:bg-orange-600">
                      <Icon className="size-7 text-orange-600 transition-colors duration-300 group-hover:text-white dark:text-orange-400 dark:group-hover:text-white" />
                    </div>

                    {/* Content */}

                    <div className="mt-6">

                        <div className="flex gap-3 items-center justify-center">
                               {/* Number */}

                      <h3 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                        <CountUp
                          end={Number(value)}
                          duration={2.5}
                          enableScrollSpy
                          scrollSpyOnce
                        />

                        <span className="text-orange-600 dark:text-orange-400">
                          +
                        </span>
                      </h3>

                      {/* Title */}
        
                      <Label className="text-base font-semibold text-slate-900 dark:text-white">
                        {stat.title}
                      </Label>

                    </div>
                   

                      {/* Description */}

                      <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        {stat.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}