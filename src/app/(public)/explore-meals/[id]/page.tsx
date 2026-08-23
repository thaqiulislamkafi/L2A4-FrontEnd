"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { getMealById } from "@/lib/api/meal";
import MealDetails from "./MealDetails";
import MealAnalytics from "@/app/MealAnalytics";
import MealReviews from "./MealReviews";
import MealProvider from "./MealProvider";


const MealDetailsPage = () => {
  const params = useParams();

  const mealId = params.id as string;

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["meal", mealId],
    queryFn: () => getMealById(mealId),
    enabled: Boolean(mealId),
  });

  /* =========================
      Loading
  ========================= */

  if (isLoading) {
    return (
      <main className="min-h-screen bg-orange-50/40 py-24 dark:bg-orange-950/10">
        <div className="mx-auto flex min-h-100 max-w-7xl items-center justify-center px-6">
          <div className="flex flex-col items-center gap-4">
            <Spinner className="size-10 text-orange-600" />

            <p className="text-sm font-medium text-orange-700 dark:text-orange-400">
              Loading meal details...
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* =========================
      Error
  ========================= */

  if (isError || !data?.data) {
    return (
      <main className="min-h-screen bg-orange-50/40 py-24 dark:bg-orange-950/10">
        <div className="mx-auto max-w-2xl px-6">
          <Card className="border-orange-100 bg-background p-10 text-center dark:border-orange-950/40">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
              <AlertCircle className="h-7 w-7" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
              Unable to Load Meal
            </h1>

            <p className="mt-2 text-muted-foreground">
              We couldnt retrieve this meal. Please try again later.
            </p>
          </Card>
        </div>
      </main>
    );
  }

  const meal = data.data;

  return (
    <main className="relative overflow-hidden bg-orange-50/40 py-16 dark:bg-orange-950/10">
      {/* Background decoration */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-orange-300/15 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Main Meal */}

        <MealDetails meal={meal} />

        {/* Analytics */}

        <MealAnalytics
          analytics={meal.mealAnalytics}
        />

        {/* Reviews */}

        <MealReviews
          reviews={meal.reviews}
        />

        {/* Provider */}

        <MealProvider
          provider={meal.provider}
        />
      </div>
    </main>
  );
};

export default MealDetailsPage;