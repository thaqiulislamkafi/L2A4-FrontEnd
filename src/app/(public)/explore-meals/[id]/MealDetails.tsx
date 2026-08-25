"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {ArrowRight,CheckCircle2,Clock3,Package,ShoppingBag,Utensils,} from "lucide-react";

import { MealDetailsType } from "@/types/meal.type";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface MealDetailsProps {
  meal: MealDetailsType;
}

const MealDetails = ({ meal }: MealDetailsProps) => {
  return (
    <section className="pt-6">
      {/* Back */}

    
      <Card className="overflow-hidden border-orange-100 bg-background/90 p-0 shadow-xl shadow-orange-100/30 dark:border-orange-950/40 dark:shadow-orange-950/20">
        <div className="grid lg:grid-cols-2">
          {/* ================= IMAGE ================= */}

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative min-h-100 lg:min-h-130"
          >
            <Image
              src={meal.image}
              alt={meal.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

            {/* Availability */}

            <div className="absolute right-5 top-5">
              <Badge
                className={
                  meal.availabilty_status === "AVAILABLE"
                    ? "border border-white/20 bg-orange-600 text-white shadow-lg hover:bg-orange-600"
                    : "bg-slate-700 text-white"
                }
              >
                <CheckCircle2 className="h-3.5 w-3.5" />

                {meal.availabilty_status === "AVAILABLE"
                  ? "Available"
                  : meal.availabilty_status}
              </Badge>
            </div>

            {/* Price */}

            <div className="absolute bottom-6 left-6">
              <div className="rounded-2xl border border-white/20 bg-black/35 px-5 py-3 text-white backdrop-blur-md">
                <Label className="text-xs text-white/70">
                  Price per piece
                </Label>

                <p className="text-3xl font-bold">
                  ৳{meal.pricePerPiece}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ================= CONTENT ================= */}

          <CardContent className="flex flex-col justify-center p-7 sm:p-10">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}

              <Badge
                variant="outline"
                className="mb-5 border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-400"
              >
                <Utensils className="h-3.5 w-3.5" />

                {meal.cuisine_rel.cuisine_type_name}
              </Badge>

              {/* Name */}

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                {meal.name}
              </h1>

              {/* Description */}

              <p className="mt-5 leading-8 text-muted-foreground">
                {meal.description}
              </p>

              {/* Tags */}

              <div className="mt-6 flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="border border-orange-100 bg-orange-50 text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-400"
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

              {/* Inventory */}

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-orange-100 bg-orange-50/60 p-4 dark:border-orange-950/40 dark:bg-orange-950/10">
                  <Package className="h-5 w-5 text-orange-500" />

                  <Label className="mt-3 block text-xs text-muted-foreground">
                    Available
                  </Label>

                  <p className="mt-1 text-lg font-bold text-foreground">
                    {meal.availablePieces} pieces
                  </p>
                </div>

                <div className="rounded-2xl border border-orange-100 bg-orange-50/60 p-4 dark:border-orange-950/40 dark:bg-orange-950/10">
                  <Clock3 className="h-5 w-5 text-orange-500" />

                  <Label className="mt-3 block text-xs text-muted-foreground">
                    Total Pieces
                  </Label>

                  <p className="mt-1 text-lg font-bold text-foreground">
                    {meal.totalPieces}
                  </p>
                </div>
              </div>

              {/* Button */}

              <Button
                className="group mt-8 h-12 w-full rounded-xl bg-orange-600 font-semibold text-white shadow-lg shadow-orange-600/20 transition-all hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-orange-600/30"
              >
                <ShoppingBag className="h-4 w-4" />

                Order This Meal

                <ArrowRight className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </CardContent>
        </div>
      </Card>
    </section>
  );
};

export default MealDetails;