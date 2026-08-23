"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {BadgeCheck,CalendarDays,Mail,Phone,User,ShieldCheck,Sparkles,MapPin,Utensils,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface MealProviderData {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  contact: string;
  age: number;
  address: string;
  role: string;
  status: string;
}

interface MealProviderProps {
  provider: MealProviderData;
}

const MealProvider = ({
  provider,
}: MealProviderProps) => {
  return (
    <section className="relative overflow-hidden py-20 ">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" />

        <motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className=""
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* =====================================================
            MAIN CARD
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
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
        >
          <Card className="overflow-hidden bg-orange-100/10 shadow-md">
            {/* =================================================
                HEADER
            ================================================= */}

            <div className="border-b border-orange-100 px-6 py-10 text-center dark:border-orange-950/40 md:px-10">
              <Badge
                variant="outline"
                className="rounded-full border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-400"
              >
                <Sparkles className="h-4 w-4" />

                Meal Provider
              </Badge>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                Meet Your Meal Provider
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                Get to know the provider behind this delicious meal.
                FoodHub connects you with trusted providers who
                prepare and deliver quality food.
              </p>
            </div>

            {/* =================================================
                CONTENT
            ================================================= */}

            <CardContent className="p-6 md:p-10 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
                {/* =============================================
                    PROFILE
                ============================================= */}

                <motion.div
                  whileHover={{
                    y: -5,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="rounded-3xl border border-orange-100 bg-linear-to-br from-orange-50 to-orange-100/30 p-7 text-center shadow-sm dark:border-orange-950/40 dark:from-orange-950/20 dark:to-orange-950/5"
                >
                  {/* Image */}

                  <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-orange-50 shadow-xl dark:border-orange-950">
                    {provider.image ? (
                      <Image
                        src={provider.image}
                        alt={provider.name}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <User className="h-12 w-12 text-orange-400" />
                      </div>
                    )}
                  </div>

                  {/* Name */}

                  <h3 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
                    {provider.name}
                  </h3>

                  {/* Role + Verification */}

                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                    <Badge
                      className="border-orange-200 bg-orange-100 text-orange-700 hover:bg-orange-100 dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-400"
                    >
                      <Utensils className="h-3.5 w-3.5" />

                      {provider.role}
                    </Badge>

                    {provider.emailVerified ? (
                      <Badge
                        variant="outline"
                        className="border-green-200 bg-green-50 text-green-700 hover:bg-green-50 dark:border-green-900/50 dark:bg-green-950/20 dark:text-green-400"
                      >
                        <BadgeCheck className="h-3.5 w-3.5" />

                        Verified
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-400"
                      >
                        <ShieldCheck className="h-3.5 w-3.5" />

                        Unverified
                      </Badge>
                    )}
                  </div>

                  {/* Status */}

                  <div className="mt-5">
                    <Badge
                      variant="outline"
                      className={
                        provider.status.toLowerCase() === "active"
                          ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-950/20 dark:text-green-400"
                          : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
                      }
                    >
                      <span
                        className={
                          provider.status.toLowerCase() === "active"
                            ? "mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500"
                            : "mr-1.5 h-1.5 w-1.5 rounded-full bg-slate-400"
                        }
                      />

                      {provider.status}
                    </Badge>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-muted-foreground">
                    Providing quality meals and creating delicious
                    food experiences for FoodHub customers.
                  </p>
                </motion.div>

                {/* =============================================
                    INFORMATION
                ============================================= */}

                <div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Email */}

                    <ProviderInfoCard
                      icon={<Mail className="h-5 w-5" />}
                      title="Email Address"
                      value={provider.email}
                    />

                    {/* Contact */}

                    <ProviderInfoCard
                      icon={<Phone className="h-5 w-5" />}
                      title="Contact Number"
                      value={provider.contact}
                    />

                    {/* Age */}

                    <ProviderInfoCard
                      icon={<User className="h-5 w-5" />}
                      title="Age"
                      value={`${provider.age} Years`}
                    />

                    {/* Member Since */}

                    <ProviderInfoCard
                      icon={<CalendarDays className="h-5 w-5" />}
                      title="Member Since"
                      value={new Date(
                        provider.createdAt
                      ).toLocaleDateString("en-BD", {
                        year: "numeric",
                        month: "long",
                      })}
                    />

                    {/* Address */}

                    <motion.div
                      whileHover={{
                        y: -4,
                      }}
                      className="sm:col-span-2 rounded-2xl border border-orange-100 bg-orange-100/10 p-5 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-md hover:shadow-orange-100/30 dark:border-orange-950/40 dark:hover:border-orange-900"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-md shadow-orange-600/20">
                          <MapPin className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                          <Label className="text-xs font-medium text-muted-foreground">
                            Provider Address
                          </Label>

                          <p className="mt-1 text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                            {provider.address}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* =========================================
                      ACTION BUTTONS
                  ========================================= */}

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Button
                      size="lg"
                      // asChild
                      className="group h-12 rounded-xl bg-orange-600 px-6 font-semibold text-white shadow-md shadow-orange-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/30"
                    >
                      <a href={`mailto:${provider.email}`} className="flex gap-2">
                        <Mail className="h-4 w-4" />

                        Contact Provider
                      </a>
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      // asChild
                      className="h-12 rounded-xl border-orange-200 bg-background px-6 font-semibold text-orange-700 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-900 dark:text-orange-400 dark:hover:bg-orange-950/30"
                    >
                      <a href={`tel:${provider.contact}`} className="flex gap-2">
                        <Phone className="h-4 w-4" />

                        Call Provider
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

interface ProviderInfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function ProviderInfoCard({
  icon,
  title,
  value,
}: ProviderInfoCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.25,
      }}
      className="rounded-2xl border border-orange-100 bg-orange-100/5 p-5 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-md hover:shadow-orange-100/30 dark:border-orange-950/40 dark:hover:border-orange-900"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-md shadow-orange-600/20">
          {icon}
        </div>

        {/* Information */}

        <div className="min-w-0">
          <Label className="text-xs font-medium text-muted-foreground">
            {title}
          </Label>

          <p className="mt-1 break-all text-sm font-semibold text-slate-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default MealProvider;