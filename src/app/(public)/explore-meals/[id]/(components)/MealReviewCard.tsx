import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MealReview } from "@/types/meal.type";
import { Badge, CalendarDays, Quote, Star, UserRound } from "lucide-react";
import { motion } from "framer-motion";

interface MealReviewCardProps {
  review: MealReview;
  index: number;
}

export function MealReviewCard({
  review,
  index,
}: MealReviewCardProps) {
  return (
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
        delay: index * 0.08,
        duration: 0.45,
      }}
      whileHover={{
        y: -4,
      }}
    >
      <Card className="group h-full border-orange-100 bg-background shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/40 dark:border-orange-950/40 dark:hover:border-orange-900 dark:hover:shadow-orange-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            {/* Avatar */}

            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-orange-100 bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950/30">
              <UserRound className="h-5 w-5 text-orange-500" />
            </div>

            {/* User */}

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                FoodHub Customer
              </h3>

              <div className="mt-1 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3.5 w-3.5 ${
                      star <= review.rating
                        ? "fill-orange-500 text-orange-500"
                        : "text-orange-200"
                    }`}
                  />
                ))}

                <span className="ml-1 text-xs font-semibold text-orange-600 dark:text-orange-400">
                  {review.rating}.0
                </span>
              </div>
            </div>

            {/* Review Number */}

            <Badge
            //   variant="outline"
              className="rounded-full border-orange-100 bg-orange-50 px-2 py-1 text-[10px] font-semibold text-orange-600 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-400"
            >
              #{index + 1}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-2">
          {/* Comment */}

          <div className="relative rounded-xl bg-orange-50/70 p-4 dark:bg-orange-950/20">
            <Quote className="absolute right-3 top-3 h-5 w-5 text-orange-200 dark:text-orange-900" />

            <p className="relative pr-6 text-sm leading-6 text-muted-foreground">
              {review.comment ||
                "No review comment available."}
            </p>
          </div>

          {/* Date */}

          <div className="mt-4 flex items-center justify-between border-t border-orange-100 pt-3 dark:border-orange-950/40">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-3.5 w-3.5 text-orange-500" />

              <Label className="text-xs text-muted-foreground">
                {new Date(
                  review.createdAt
                ).toLocaleDateString("en-BD", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Label>
            </div>

            <Badge
            //   variant="outline"
              className="rounded-full border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700 dark:border-green-900/50 dark:bg-green-950/20 dark:text-green-400"
            >
              Verified
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}