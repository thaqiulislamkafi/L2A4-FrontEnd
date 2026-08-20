"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import {CalendarDays,MessageSquareQuote,Star,Quote,UserRound,ArrowRight,} from "lucide-react";

import { getGlobalReviews } from "@/lib/api/global-reviews";
import {
  GlobalReview,
  GlobalReviewResponse,
} from "@/types/global-review.type";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const ShowReviews = () => {
  const { data, isLoading, isError } = useQuery<GlobalReviewResponse>({
    queryKey: ["global-reviews"],
    queryFn: () =>
      getGlobalReviews({
        page: 1,
        limit: 6,
      }),
  });

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <section className="bg-orange-50/60 py-20">
        <div className="mx-auto flex min-h-100 max-w-7xl items-center justify-center px-6">
          <div className="flex flex-col items-center gap-4">
            <Spinner className="size-10 text-orange-600" />

            <p className="text-sm font-medium text-orange-700">
              Loading customer reviews...
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ================= ERROR ================= */

  if (isError || !data) {
    return null;
  }

  const reviews: GlobalReview[] = data.data;

  if (!reviews.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-orange-50/60 py-20">
      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-orange-300/15 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ================= HEADER ================= */}

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
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}

          <div className="mb-6 flex justify-center">
            <Badge
              variant="outline"
              className="h-auto rounded-full border-orange-200 bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-100"
            >
              <MessageSquareQuote className="h-4 w-4" />

              Customer Reviews
            </Badge>
          </div>

          {/* Heading */}

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            What Our Customers Say
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-600">
            Real experiences from FoodHub customers who have enjoyed delicious
            meals and a seamless ordering experience.
          </p>
        </motion.div>

        {/* ================= REVIEWS MARQUEE ================= */}

        <div className="mt-14">
          <Marquee
            speed={20}
            pauseOnHover
            gradient={false}
            autoFill
          >
            {reviews.map((review, index) => (
              <ReviewCard
                key={review.id}
                review={review}
                index={index}
              />
            ))}
          </Marquee>
        </div>

        {/* ================= BOTTOM ================= */}

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
            delay: 0.3,
          }}
          className="mt-12 flex justify-center"
        >
          <Button
            variant="outline"
            className="group rounded-xl border-orange-200 bg-white px-5 py-2.5 text-orange-700 hover:bg-orange-50 hover:text-orange-700"
          >
            See More Reviews

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowReviews;

/* =========================================================
   REVIEW CARD
========================================================= */

interface ReviewCardProps {
  review: GlobalReview;
  index: number;
}

function ReviewCard({ review, index }: ReviewCardProps) {
  return (
    <Card className="group mx-4 my-2 shrink-0 border-orange-100 bg-orange-100/10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/70 md:w-[370px]">
      {/* ================= USER ================= */}

      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}

          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-orange-100 bg-orange-50">
            {review.user?.image ? (
              <Image
                src={review.user.image}
                alt={review.user.name || "FoodHub customer"}
                fill
                className="object-cover"
              />
            ) : (
              <UserRound className="h-7 w-7 text-orange-400" />
            )}
          </div>

          {/* User Info */}

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-slate-900">
              {review.user?.name || "Anonymous Customer"}
            </h3>

            {/* Rating */}

            <div className="mt-1 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= review.rating
                      ? "fill-orange-500 text-orange-500"
                      : "text-slate-200"
                  }`}
                />
              ))}

              <span className="ml-1 text-xs font-semibold text-orange-600">
                {review.rating}.0
              </span>
            </div>
          </div>

          {/* Review Number */}

          <Badge
            variant="outline"
            className="h-7 rounded-full border-orange-100 bg-orange-50 px-2.5 text-xs font-semibold text-orange-600"
          >
            #{index + 1}
          </Badge>
        </div>
      </CardHeader>

      {/* ================= REVIEW CONTENT ================= */}

      <CardContent>
        <div className="relative rounded-2xl bg-orange-300/10 p-5">
          <Quote className="absolute right-4 top-4 h-7 w-7 text-orange-200" />

          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
            <MessageSquareQuote className="h-4 w-4 text-orange-600" />
          </div>

          <p className="relative pr-5 text-sm leading-7 text-slate-600">
            {review.comment || "No review text available."}
          </p>
        </div>

        {/* ================= FOOTER ================= */}

        <div className="mt-5 flex items-center justify-between border-t border-orange-100 pt-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-orange-500" />

            <Label className="text-xs font-medium text-slate-500">
              {review.createdAt
                ? new Date(review.createdAt).toLocaleDateString("en-BD", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Recently"}
            </Label>
          </div>

          <Badge
            variant="outline"
            className="h-6 rounded-full border-green-200 bg-green-50 px-2.5 text-[11px] font-medium text-green-700 hover:bg-green-50"
          >
            Verified
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}