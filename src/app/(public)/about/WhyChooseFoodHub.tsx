"use client";

import { motion } from "framer-motion";
import {BadgeCheck,Clock3,HeartHandshake,ShieldCheck,Sparkles,Truck,UtensilsCrossed,Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {Card,CardContent,CardHeader,CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: UtensilsCrossed,
    title: "Quality Meals",
    description:
      "Discover carefully prepared meals from food providers who care about taste, quality, and customer satisfaction.",
    label: "Great Taste",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Providers",
    description:
      "Connect with dedicated food providers and discover meals from people who take pride in what they serve.",
    label: "Trusted",
  },
  {
    icon: Clock3,
    title: "Easy Ordering",
    description:
      "Browse meals, explore details, and place your order through a simple and convenient experience.",
    label: "Simple",
  },
  {
    icon: Truck,
    title: "Convenient Experience",
    description:
      "FoodHub is designed to make the journey from discovering your meal to enjoying it smooth and convenient.",
    label: "Convenient",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Platform",
    description:
      "We focus on creating a dependable platform where users can explore meals and interact with providers confidently.",
    label: "Reliable",
  },
  {
    icon: HeartHandshake,
    title: "Community First",
    description:
      "FoodHub brings food lovers and providers together while helping local food communities grow and connect.",
    label: "Together",
  },
];

export default function WhyChooseFoodHub() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-orange-50/40 to-background dark:via-orange-950/10" />

      {/* Decorative Background */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-orange-500/10 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -35, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-amber-500/10 blur-[120px]"
      />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <Badge
            variant="outline"
            className="border-orange-200 bg-orange-50 px-4 py-2 text-orange-600 shadow-sm dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-400"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Why FoodHub?
          </Badge>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            More Than Just a{" "}
            <span className="text-orange-600">Food Platform</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
            FoodHub is designed around people, food, and meaningful
            experiences. Here are the things that make our platform special.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -7,
                }}
              >
                <Card className="group relative h-full overflow-hidden rounded-2xl border-orange-100 bg-white/80 shadow-sm backdrop-blur-xl transition-all duration-500 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-600/10 dark:border-orange-950 dark:bg-slate-900/70">
                  {/* Top Gradient */}
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-orange-500 via-amber-500 to-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Decorative Circle */}
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-500/5 transition-transform duration-700 group-hover:scale-150" />

                  <CardHeader className="relative p-6 pb-3">
                    <div className="flex items-start justify-between gap-4">
                      {/* Icon */}
                      <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-orange-100 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 dark:bg-orange-950/40">
                        <Icon
                          className="h-6 w-6 text-orange-600"
                          strokeWidth={1.8}
                        />
                      </div>

                      {/* Badge */}
                      <Badge
                        variant="outline"
                        className="border-orange-200 bg-orange-50/70 text-xs font-medium text-orange-600 dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-400"
                      >
                        {feature.label}
                      </Badge>
                    </div>

                    <CardTitle className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative px-6 pb-6">
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                      {feature.description}
                    </p>

                    {/* Bottom Indicator */}
                    <div className="mt-6 flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-orange-500 transition-all duration-300 group-hover:w-5" />

                      <div className="h-px flex-1 bg-orange-100 dark:bg-orange-950" />

                      <Sparkles className="h-3.5 w-3.5 text-orange-400 opacity-0 transition-all duration-300 group-hover:rotate-12 group-hover:opacity-100" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Community Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10"
        >
          <Card className="overflow-hidden rounded-3xl border-orange-200 bg-linear-to-r from-orange-600 to-amber-500 text-white shadow-xl shadow-orange-600/15 dark:border-orange-800">
            <CardContent className="relative p-7 sm:p-8">
              {/* Decorative Circles */}
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
              <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-white/5" />

              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                    <Users className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold sm:text-2xl">
                      Built for Food Lovers & Providers
                    </h3>

                    <p className="mt-2 max-w-2xl text-sm leading-7 text-orange-50 sm:text-base">
                      Whether you are looking for your next favorite meal or
                      sharing something you love to cook, FoodHub is built to
                      bring you closer together.
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                  <HeartHandshake className="h-4 w-4" />
                  <span>Made with care</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}