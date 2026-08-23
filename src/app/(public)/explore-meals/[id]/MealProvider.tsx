"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { MealProvider as MealProviderType } from "@/types/meal.type";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface MealProviderProps {
  provider: MealProviderType;
}

const MealProvider = ({
  provider,
}: MealProviderProps) => {
  return (
    <section className="mt-20 pb-10">
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
      >
        {/* Header */}

        <Badge
          variant="outline"
          className="border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-400"
        >
          <ShieldCheck className="h-3.5 w-3.5" />

          Trusted Provider
        </Badge>

        <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          Meet the Meal Provider
        </h2>

        <p className="mt-2 text-muted-foreground">
          Get to know the provider behind this meal.
        </p>

        {/* Provider Card */}

        <Card className="mt-8 overflow-hidden border-orange-100 bg-background/90 shadow-sm dark:border-orange-950/40">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col gap-7 md:flex-row md:items-center">
              {/* Avatar */}

              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border-2 border-orange-100 bg-orange-50 dark:border-orange-950/50 dark:bg-orange-950/30">
                {provider.image ? (
                  <Image
                    src={provider.image}
                    alt={provider.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <UserRound className="h-10 w-10 text-orange-400" />
                )}
              </div>

              {/* Main info */}

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {provider.name}
                  </h3>

                  {provider.status === "active" && (
                    <Badge className="border-green-200 bg-green-50 text-green-700 hover:bg-green-50 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />

                      Active Provider
                    </Badge>
                  )}
                </div>

                <Label className="mt-2 block text-sm text-muted-foreground">
                  FoodHub Meal Provider
                </Label>

                {/* Contact */}

                <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-4 w-4 text-orange-500" />

                    {provider.email}
                  </div>

                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-4 w-4 text-orange-500" />

                    {provider.contact}
                  </div>

                  <div className="flex items-start gap-3 text-muted-foreground sm:col-span-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />

                    {provider.address}
                  </div>
                </div>
              </div>

              {/* Provider Badge */}

              <div className="shrink-0">
                <div className="rounded-2xl border border-orange-100 bg-orange-50/60 p-4 text-center dark:border-orange-950/40 dark:bg-orange-950/10">
                  <ShieldCheck className="mx-auto h-7 w-7 text-orange-500" />

                  <Label className="mt-2 block text-xs text-muted-foreground">
                    Verified Role
                  </Label>

                  <p className="mt-1 font-semibold capitalize text-orange-700 dark:text-orange-400">
                    {provider.role}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default MealProvider;