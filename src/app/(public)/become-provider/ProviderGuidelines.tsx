"use client";

import {
  BadgeCheck,
  CheckCircle2,
  Clock3,
  FileCheck2,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const guidelines = [
  {
    icon: UtensilsCrossed,
    title: "Provide Quality Meals",
    description:
      "Prepare fresh, delicious and hygienic meals that meet FoodHub's quality standards.",
  },
  {
    icon: ShieldCheck,
    title: "Maintain Food Safety",
    description:
      "Follow proper food handling, preparation and storage practices to ensure customer safety.",
  },
  {
    icon: Clock3,
    title: "Respect Delivery Time",
    description:
      "Keep your meals ready on time and make every effort to provide a reliable customer experience.",
  },
  {
    icon: HeartHandshake,
    title: "Treat Customers Well",
    description:
      "Communicate respectfully with customers and always focus on providing a positive experience.",
  },
  {
    icon: FileCheck2,
    title: "Keep Information Accurate",
    description:
      "Provide accurate meal descriptions, prices, availability and other information about your offerings.",
  },
  {
    icon: BadgeCheck,
    title: "Build Your Reputation",
    description:
      "Consistently deliver great meals and service to earn positive reviews and grow your FoodHub presence.",
  },
];

const requirements = [
  "Use fresh and safe ingredients",
  "Maintain proper hygiene",
  "Provide accurate meal information",
  "Keep availability updated",
  "Respond professionally to customers",
  "Respect FoodHub's policies",
];

export default function ProviderGuidelines() {
  return (
    <section className="relative overflow-hidden bg-orange-50/30 py-20 dark:bg-orange-950/5">
      {/* Decorative background */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section Header */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge
            variant="outline"
            className="border-orange-200 bg-orange-50 px-4 py-2 text-orange-600 shadow-sm dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-400"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Provider Guidelines
          </Badge>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Everything You Need to Become a{" "}
            <span className="text-orange-600 dark:text-orange-500">
              Great Provider
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
            Becoming a FoodHub provider means more than offering meals. It
            means creating a reliable, safe and enjoyable experience for every
            customer.
          </p>
        </motion.div>

        {/* Guidelines */}

        <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guidelines.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -6 }}
              >
                <Card className="group h-full border-orange-100 bg-white/90 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-600/10 dark:border-orange-900/50 dark:bg-slate-900/80">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white dark:bg-orange-950/40 dark:text-orange-400 dark:group-hover:bg-orange-600 dark:group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </div>

                      <span className="text-sm font-bold text-orange-200 dark:text-orange-900">
                        0{index + 1}
                      </span>
                    </div>

                    <CardTitle className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Requirements Card */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-14 max-w-5xl"
        >
          <Card className="overflow-hidden border-orange-200 bg-white shadow-lg shadow-orange-600/5 dark:border-orange-900 dark:bg-slate-900">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              {/* Left */}

              <div className="relative overflow-hidden bg-linear-to-br from-orange-600 to-amber-500 p-8 text-white sm:p-10">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                    <Lightbulb className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold">
                    A Few Things to Remember
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-orange-50">
                    Following these simple principles will help you build trust
                    with customers and establish yourself as a reliable
                    FoodHub provider.
                  </p>

                  <Button
                    type="button"
                    className="mt-7 border border-white/20 bg-white text-orange-600 shadow-lg hover:bg-orange-50"
                    onClick={() =>
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      })
                    }
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Become a Provider
                  </Button>
                </div>
              </div>

              {/* Right */}

              <CardContent className="p-8 sm:p-10">
                <div>
                  <Label className="text-base font-bold text-slate-900 dark:text-white">
                    Provider Checklist
                  </Label>

                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Make sure you are ready to meet these basic expectations.
                  </p>
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {requirements.map((requirement, index) => (
                    <motion.div
                      key={requirement}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.06,
                      }}
                      className="group flex items-start gap-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-500 transition-transform duration-300 group-hover:scale-110" />

                      <span className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                        {requirement}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}