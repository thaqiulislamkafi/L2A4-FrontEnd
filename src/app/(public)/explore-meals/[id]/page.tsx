"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { getMealById } from "@/lib/api/meal";
import MealDetails from "./(components)/MealDetails";
import MealAnalytics from "@/app/MealAnalytics";
import MealReviews from "./(components)/MealReviews";
import MealProvider from "./(components)/MealProvider";
import DetailsMealsError from "./error";
import DetailsMealsLoading from "./loading";


const MealDetailsPage = () => {
  const params = useParams();

  const mealId = params.id as string;

  const {data,isLoading,isError,} = useQuery({
    queryKey: ["meal", mealId],
    queryFn: () => getMealById(mealId),
    enabled: Boolean(mealId),
  });


  if (isLoading) return <DetailsMealsLoading/>
  if (isError || !data?.data) return <DetailsMealsError/>

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