"use client";

import { motion } from "framer-motion";
import {BarChart3,MessageSquare,ShoppingBag,Star,TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface MealAnalyticsData {
  totalReviews: number;
  totalOrders: number;
  averageRating: number;
}

interface MealAnalyticsProps {
  analytics?: MealAnalyticsData[];
}

const MealAnalytics = ({ analytics }: MealAnalyticsProps) => {
  if (!analytics) {
    return null;
  }

  const statistics = [
    {
      label: "Total Orders",
      value: analytics[0].totalOrders,
      description: "Orders received",
      icon: ShoppingBag,
      iconClass:
        "bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
      valueClass: "text-orange-600 dark:text-orange-400",
    },
    {
      label: "Total Reviews",
      value: analytics[0].totalReviews,
      description: "Customer reviews",
      icon: MessageSquare,
      iconClass:
        "bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
      valueClass: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "Average Rating",
      value:
        analytics[0].averageRating > 0
          ? analytics[0].averageRating.toFixed(1)
          : "0.0",
      description: "Out of 5.0",
      icon: Star,
      iconClass:
        "bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
      valueClass: "text-orange-600 dark:text-orange-400",
      rating: true,
    },
  ];

  return (
    <section className="relative overflow-hidden  py-16">
      {/* =========================
          Background Decorations
      ========================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-20 h-64 w-64 rounded-full "
        />

        <motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 bottom-10 h-64 w-64 rounded-full  blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* =========================
            Section Header
        ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <Badge
            variant="outline"
            className="mb-4 rounded-full border-orange-200 bg-orange-50 px-4 py-1.5 text-orange-700 dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-400"
          >
            <BarChart3 className="mr-1.5 h-3.5 w-3.5" />

            Meal Statistics
          </Badge>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
            Meal Performance
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            A quick overview of how this meal is performing based on customer
            activity and feedback.
          </p>
        </motion.div>

        {/* =========================
            Statistics
        ========================= */}

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
          {statistics.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
              >
                <Card className="group h-full border-orange-100 bg-background/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/40 dark:border-orange-950/40 dark:hover:border-orange-900 dark:hover:shadow-orange-950/20">
                  <CardContent className="flex items-center gap-4 p-5">
                    {/* Icon */}

                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${stat.iconClass}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Content */}

                    <div className="min-w-0">
                      <Label className="text-xs font-medium text-muted-foreground">
                        {stat.label}
                      </Label>

                      <div className="mt-1 flex gap-2 justify-center items-center">
                        <span
                          className={`text-2xl font-bold tracking-tight ${stat.valueClass}`}
                        >
                          {stat.value}+
                        </span>

                        {stat.rating && (
                          <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                        )}

                         <p className="mt-0.5 text-xs text-muted-foreground">
                        {stat.description}
                      </p>
                      </div>

                     
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* =========================
            Performance Indicator
        ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.3,
            duration: 0.5,
          }}
          className="mx-auto mt-5 flex max-w-5xl items-center justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50/70 px-4 py-2 dark:border-orange-950/50 dark:bg-orange-950/20">
            <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />

            <Label className="text-xs font-medium text-orange-700 dark:text-orange-400">
              Customer activity & performance overview
            </Label>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MealAnalytics;