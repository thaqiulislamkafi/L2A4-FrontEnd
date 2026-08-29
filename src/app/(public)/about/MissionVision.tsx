"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Goal,
  Heart,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const items = [
  {
    title: "Our Mission",
    description:
      "Our mission is to make delicious, trustworthy, and high-quality meals easily accessible to everyone. FoodHub connects people with passionate food providers while creating a simple and enjoyable food ordering experience.",
    icon: Goal,
    iconBg: "bg-orange-100 dark:bg-orange-950/40",
    iconColor: "text-orange-600",
    accent: "from-orange-500 to-amber-500",
    highlights: [
      "Quality meals",
      "Trusted providers",
      "Simple ordering",
    ],
  },
  {
    title: "Our Vision",
    description:
      "We envision a food ecosystem where discovering great meals, supporting local food providers, and enjoying memorable dining experiences become effortless for everyone.",
    icon: Eye,
    iconBg: "bg-amber-100 dark:bg-amber-950/40",
    iconColor: "text-amber-600",
    accent: "from-amber-500 to-orange-500",
    highlights: [
      "Connected communities",
      "Local food culture",
      "Better experiences",
    ],
  },
];

export default function MissionVision() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-orange-50/30 to-background dark:via-orange-950/10" />

      <motion.div
        animate={{
          x: [0, 35, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-orange-400/10 blur-[110px]"
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-amber-400/10 blur-[110px]"
      />

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
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
            What Drives Us
          </Badge>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Our Mission &{" "}
            <span className="text-orange-600">Vision</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
            Everything we build at FoodHub is driven by a simple belief:
            great food should bring people together and create meaningful
            experiences.
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid gap-7 lg:grid-cols-2">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 40,
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
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -7,
                }}
              >
                <Card className="group relative h-full overflow-hidden rounded-3xl border-orange-100 bg-white/80 shadow-lg backdrop-blur-xl transition-all duration-500 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-600/10 dark:border-orange-950 dark:bg-slate-900/70">
                  {/* Top Accent */}
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${item.accent}`}
                  />

                  {/* Decorative Circle */}
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-500/5 transition-transform duration-700 group-hover:scale-150" />

                  <CardHeader className="relative p-7 pb-4 sm:p-8">
                    <div className="flex items-start justify-between gap-5">
                      <div
                        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${item.iconBg} shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:rotate-3`}
                      >
                        <Icon
                          className={`h-8 w-8 ${item.iconColor}`}
                          strokeWidth={1.8}
                        />
                      </div>

                      <Badge
                        variant="outline"
                        className="border-orange-200 bg-orange-50/70 text-orange-600 dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-400"
                      >
                        <Heart className="mr-1.5 h-3.5 w-3.5" />
                        FoodHub
                      </Badge>
                    </div>

                    <CardTitle className="mt-7 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                      {item.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative px-7 pb-8 sm:px-8">
                    <p className="text-base leading-8 text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>

                    {/* Highlights */}
                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      {item.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-center gap-2 rounded-xl border border-orange-100 bg-orange-50/60 px-3 py-3 text-sm font-medium text-slate-700 transition-all duration-300 group-hover:border-orange-200 group-hover:bg-orange-50 dark:border-orange-950 dark:bg-orange-950/20 dark:text-slate-300"
                        >
                          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />

                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Decoration */}
                    <div className="mt-8 flex items-center gap-3">
                      <div className="h-px flex-1 bg-linear-to-r from-orange-200 to-transparent dark:from-orange-900" />

                      <UtensilsCrossed className="h-5 w-5 text-orange-500 transition-transform duration-500 group-hover:rotate-12" />

                      <div className="h-px flex-1 bg-linear-to-l from-orange-200 to-transparent dark:from-orange-900" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}