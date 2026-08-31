"use client";

import { motion } from "framer-motion";
import {
  MessageSquareQuote,
  MessageCircle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MealReviewCard } from "./MealReviewCard";

interface MealReview {
  id: string;
  meal_id: string;
  user_id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

interface MealAnalytics {
  totalReviews: number;
  averageRating: number;
}

interface MealReviewsProps {
  reviews: MealReview[];
  analytics?: MealAnalytics;
}

const MealReviews = ({
  reviews,
}: MealReviewsProps) => {

  return (
    <section className="relative overflow-hidden py-20 max-w-6xl mx-auto">

      {/* ================= BACKGROUND ================= */}

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
          className="absolute top-20 h-72 w-72 rounded-full bg-orange-300/10 blur-3xl"
        />


      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ================= HEADER ================= */}

        <motion.div
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
            duration: 0.5,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge
            variant="outline"
            className="mb-5 rounded-full border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-400"
          >
            <MessageSquareQuote className="h-4 w-4" />

            Customer Reviews
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            What Customers Say
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            See what FoodHub customers think about this meal
            and their ordering experience.
          </p>
        </motion.div>

        {/* ================= REVIEWS ================= */}

        {reviews.length > 0 ? (
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <MealReviewCard
                key={review.id}
                review={review}
                index={index}
              />
            ))}
          </div>
        ) : (
          <EmptyReviews />
        )}

        {/* ================= FOOTER ================= */}

        {reviews.length > 0 && (
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
            }}
            className="mt-10 flex justify-center"
          >
            <Button
              variant="outline"
              className="group rounded-xl border-orange-200 bg-background px-5 text-orange-700 transition-all duration-300 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-900 dark:text-orange-400 dark:hover:bg-orange-950/30"
            >
              <MessageCircle className="h-4 w-4" />

              View All Reviews
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

function EmptyReviews() {
  return (
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
      className="mx-auto mt-12 max-w-xl"
    >
      <Card className="border-dashed border-orange-200 bg-orange-50/40 dark:border-orange-900/50 dark:bg-orange-950/10">
        <CardContent className="flex flex-col items-center px-6 py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
            <MessageSquareQuote className="h-7 w-7" />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
            No Reviews Yet
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            This meal hasnt received any customer reviews
            yet. Be the first to share your experience.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default MealReviews;