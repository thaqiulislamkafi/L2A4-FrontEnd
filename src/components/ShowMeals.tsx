"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChefHat,
  Utensils,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

import { useQuery } from "@tanstack/react-query";

import { Meal } from "@/types/meal.type";
import { getPublishedMeals } from "@/lib/api/meal";

const ShowMeals = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["published-meals", 1, 6],
    queryFn: () =>
      getPublishedMeals({
        page: 1,
        limit: 6,
      }),
  });

  const meals: Meal[] = data?.data ?? [];

  /* =========================
     Loading UI
  ========================= */

  if (isLoading) {
    return (
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-linear-to-b from-orange-50/70 via-background to-orange-50/40 dark:from-orange-950/20 dark:via-background dark:to-orange-950/10" />

        <div className="relative  mx-auto px-4">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="mx-auto h-7 w-40 animate-pulse rounded-full bg-orange-100 dark:bg-orange-950/40" />

            <div className="mx-auto mt-6 h-12 w-3/4 animate-pulse rounded-lg bg-muted" />

            <div className="mx-auto mt-5 h-5 max-w-2xl animate-pulse rounded bg-muted" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border bg-background shadow-sm"
              >
                <div className="h-60 animate-pulse bg-orange-100 dark:bg-orange-950/30" />

                <div className="space-y-4 p-6">
                  <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />

                  <div className="h-4 w-full animate-pulse rounded bg-muted" />

                  <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />

                  <div className="h-9 w-full animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* =========================
     Error UI
  ========================= */

  if (isError) {
    return (
      <section className="relative overflow-hidden py-24">
        <div className=" mx-auto px-4">
          <div className="flex min-h-72 flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-orange-100 p-4 text-orange-600 dark:bg-orange-950/30">
              <ChefHat className="h-8 w-8" />
            </div>

            <h3 className="text-xl font-semibold text-foreground">
              Unable to load meals
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Something went wrong while fetching delicious meals.
            </p>

            <Button
              className="mt-6 bg-orange-600 text-white hover:bg-orange-700"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  /* =========================
     Empty UI
  ========================= */

  if (meals.length === 0) {
    return (
      <section className="relative overflow-hidden py-24">
        <div className=" mx-auto px-4">
          <div className="flex min-h-72 flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-orange-100 p-4 text-orange-600 dark:bg-orange-950/30">
              <Utensils className="h-8 w-8" />
            </div>

            <h3 className="text-xl font-semibold">
              No meals available
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              We couldnt find any published meals right now.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-orange-50/70 via-transparent to-orange-50/50 dark:from-orange-950/20 dark:via-transparent dark:to-orange-950/10" />

      {/* Decorative Orange Glow */}
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-orange-300/10 blur-3xl dark:bg-orange-600/10" />

      <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl dark:bg-orange-600/10" />

      <div className="relative  mx-auto px-4">

        {/* =========================
            Heading
        ========================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          {/* Badge */}

          <div className="mb-6 flex justify-center">
            <Badge
              variant="outline"
              className="gap-2  rounded-full border-orange-200 bg-orange-50/80 px-4 py-2 text-sm font-medium text-orange-700 backdrop-blur-sm dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-400"
            >
              <ChefHat className="h-4 w-4" />
              Featured Meals
            </Badge>
          </div>

          {/* Heading */}

          <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Discover Delicious Meals
          </h2>

          {/* Description */}

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Explore delicious meals from trusted food providers and
            discover authentic flavors from Bangladesh and beyond.
          </p>
        </motion.div>

        {/* =========================
            Meal Grid
        ========================= */}

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {meals.map((meal, index) => (
            <motion.div
              key={meal.id}
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
                amount: 0.2,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -7,
              }}
            >
              <Card className="group h-full overflow-hidden border-orange-100 bg-background/90 p-0 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/40 dark:border-orange-950/40 dark:hover:border-orange-900 dark:hover:shadow-orange-950/20">

                {/* =========================
                    Image
                ========================= */}

                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Image Overlay */}

                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/5 to-transparent" />

                  {/* Availability */}

                  <div className="absolute right-4 top-4">
                    <Badge
                      className={
                        meal.availabilty_status === "AVAILABLE"
                          ? "border border-white/20 bg-orange-600 text-white shadow-lg hover:bg-orange-600"
                          : "bg-slate-700 text-white"
                      }
                    >
                      {meal.availabilty_status === "AVAILABLE"
                        ? "Available"
                        : meal.availabilty_status}
                    </Badge>
                  </div>

                  {/* Price */}

                  <div className="absolute bottom-4 left-4">
                    <div className="rounded-xl border border-white/20 bg-black/30 px-4 py-2 text-white backdrop-blur-md">
                      <Label className="text-xs font-medium text-white/80">
                        Starting from
                      </Label>

                      <p className="text-xl font-bold">
                        ৳{meal.pricePerPiece}
                      </p>
                    </div>
                  </div>
                </div>

                {/* =========================
                    Content
                ========================= */}

                <CardContent className="p-6">

                  {/* Meal Name */}

                  <h3 className="line-clamp-1 text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                    {meal.name}
                  </h3>

                  {/* Description */}

                  <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-relaxed text-muted-foreground">
                    {meal.description}
                  </p>

                  {/* Tags */}

                  <div className="mt-5 flex flex-wrap gap-2">

                    <Badge
                      variant="secondary"
                      className="border border-orange-100 bg-orange-50 text-orange-700 hover:bg-orange-100 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-400"
                    >
                      {meal.cuisine_rel.cuisine_type_name}
                    </Badge>

                    <Badge
                      variant="outline"
                      className="border-orange-200 text-orange-700 dark:border-orange-900 dark:text-orange-400"
                    >
                      {meal.category_rel.category_name}
                    </Badge>

                    <Badge
                      variant="outline"
                      className="border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400"
                    >
                      {meal.dietry_rel.dietry_type_name}
                    </Badge>

                  </div>

                  {/* Availability */}

                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">

                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Available
                      </Label>

                      <p className="mt-1 font-semibold text-foreground">
                        {meal.availablePieces} pieces
                      </p>
                    </div>

                    <div className="text-right">
                      <Label className="text-xs text-muted-foreground">
                        Category
                      </Label>

                      <p className="mt-1 max-w-32 truncate text-sm font-medium text-foreground">
                        {meal.category_rel.category_name}
                      </p>
                    </div>

                  </div>
                </CardContent>

                {/* =========================
                    Footer
                ========================= */}

                <CardFooter className="p-6 pt-0">

                  <Button
                    
                    className="group/button w-full bg-orange-600 text-white shadow-md shadow-orange-600/20 transition-all hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/30"
                  >
                    <Link href={`/meals/${meal.id}`} className="flex items-center justify-center gap-2">
                      <ShoppingBag className="h-4 w-4" />

                      View Meal

                      <ArrowRight className="ml-auto h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                    </Link>
                  </Button>

                </CardFooter>

              </Card>
            </motion.div>
          ))}
        </div>

        {/* =========================
            View All
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.5,
            delay: 0.4,
          }}
          className="mt-14 flex justify-center"
        >
          <Button
            
            variant="outline"
            size="lg"
            className="group rounded-2xl border-orange-200 px-7 text-orange-700 transition-all hover:-translate-y-1 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 hover:shadow-lg dark:border-orange-900 dark:text-orange-400 dark:hover:bg-orange-950/30 dark:hover:text-orange-400"
          >
            <Link href="/explore-meals" className="flex gap-2 items-center justify-center">
              Explore All Meals

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

export default ShowMeals;