"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleDot,
  Sparkles,
  Utensils,
} from "lucide-react";

import { HeaderBadge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const workCards = [
  {
    id: 1,
    icon: "https://img.icons8.com/fluency/96/search.png",
    title: "Discover Meals",
    subtitle:
      "Explore a variety of delicious meals from local kitchens and discover dishes that match your taste.",
    label: "Explore",
  },
  {
    id: 2,
    icon: "https://img.icons8.com/color/96/shopping-cart--v1.png",
    title: "Add to Your Cart",
    subtitle:
      "Choose your favorite meals, select the quantity you want, and add them to your cart effortlessly.",
    label: "Choose",
  },
  {
    id: 3,
    icon: "https://img.icons8.com/color/96/credit-card.png",
    title: "Place Your Order",
    subtitle:
      "Review your order details and complete your purchase through a simple and secure checkout process.",
    label: "Order",
  },
  {
    id: 4,
    icon: "https://img.icons8.com/color/96/restaurant.png",
    title: "Enjoy Your Meal",
    subtitle:
      "Sit back, receive your delicious meal, and enjoy a great food experience with FoodHub.",
    label: "Enjoy",
  },
];

const gradients = [
  "from-orange-500 via-orange-500 to-amber-400",
  "from-amber-500 via-orange-500 to-orange-600",
  "from-orange-600 via-red-500 to-orange-500",
  "from-orange-500 via-amber-500 to-yellow-400",
];

const HowFoodHubWorks = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white via-orange-50/50 to-white py-28 dark:from-orange-950/10 dark:via-orange-950/20 dark:to-orange-950/10">
      {/* Background Decorations */}

      <div className="pointer-events-none absolute -left-40 top-20 size-96 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-1/2 size-96 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 size-80 rounded-full bg-orange-300/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        {/* Header */}

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex justify-center">
            <HeaderBadge>
              <Utensils className="size-4" />
              Simple Process
            </HeaderBadge>
          </div>

          <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            How FoodHub
            <span className="block bg-linear-to-r from-orange-500 via-orange-600 to-amber-500 bg-clip-text text-transparent">
              Makes It Simple
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
            From discovering your favorite dishes to enjoying them at your
            table, every step is designed to make your food experience simple,
            fast, and enjoyable.
          </p>
        </motion.div>

        {/* Timeline */}

        <div className="relative mx-auto mt-24 max-w-6xl">
          {/* Timeline Background Track */}

          <div className="absolute bottom-8 left-1/2 top-8 hidden -translate-x-1/2 lg:block">
            <div className="relative h-full w-1.5 overflow-hidden rounded-full bg-orange-100/50 dark:bg-orange-950/30">
              {/* Animated Gradient Timeline */}

              <motion.div initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 2.2, ease: "easeInOut" }} className="h-full w-full origin-top rounded-full bg-linear-to-b from-transparent via-orange-200/20 via-orange-300/40 via-orange-400/60 via-orange-500/75 via-orange-400/60 via-orange-300/40 via-orange-200/20 to-transparent dark:via-orange-500/40 dark:via-orange-400/50 dark:via-orange-500/65" />

              {/* Soft Timeline Glow */}

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }} className="absolute inset-y-[12%] left-1/2 w-8 -translate-x-1/2 rounded-full bg-orange-400/10 blur-xl dark:bg-orange-500/10" />
            </div>
          </div>

          {/* Timeline Items */}

          <div className="space-y-12 lg:space-y-24">
            {workCards.map((card, index) => {
              const isLeft = index % 2 === 0;
              const gradient = gradients[index];

              return (
                <motion.div key={card.id} initial={{ opacity: 0, x: isLeft ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.65, delay: index * 0.12, ease: "easeOut" }} className={`relative flex items-center ${isLeft ? "lg:justify-start" : "lg:justify-end"}`}>
                  {/* Connector */}

                  <motion.div initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.12 + 0.3 }} className={`absolute top-1/2 hidden h-px w-[8%] origin-center bg-linear-to-r lg:block ${isLeft ? "left-[43%] from-transparent via-orange-300/70 to-orange-500/70" : "right-[43%] from-orange-500/70 via-orange-300/70 to-transparent"}`} />

                  {/* Timeline Node */}

                  <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
                    <motion.div initial={{ scale: 0, rotate: -45 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 + 0.2, type: "spring", stiffness: 220, damping: 14 }} className="relative flex size-20 items-center justify-center">
                      {/* Node Glow */}

                      <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }} className={`absolute inset-0 rounded-full bg-linear-to-br ${gradient} blur-xl`} />

                      {/* Node Outer Ring */}

                      <div className="absolute inset-1 rounded-full border border-orange-200/80 bg-white/90 shadow-xl shadow-orange-500/10 backdrop-blur-md dark:border-orange-800/60 dark:bg-orange-950/90" />

                      {/* Node */}

                      <div className={`relative flex size-14 items-center justify-center rounded-full bg-linear-to-br ${gradient} text-white shadow-lg shadow-orange-500/25`}>
                        <span className="text-sm font-black tracking-wide">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Pulse Ring */}

                      <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }} className="absolute inset-1 z- rounded-full border border-orange-400/60" />
                    </motion.div>
                  </div>

                  {/* Card */}

                  <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 280, damping: 18 }} className="group w-full lg:w-[43%]">
                    <Card className="relative overflow-hidden rounded-[30px] border-orange-100 bg-white shadow-lg shadow-orange-950/5 transition-all duration-500 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/10 dark:border-orange-900/40 dark:bg-orange-950/30 dark:hover:border-orange-800">
                      {/* Hover Background */}

                      <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.035]`} />

                      {/* Decorative Corner */}

                      <div className={`absolute -right-16 -top-16 size-40 rounded-full bg-linear-to-br ${gradient} opacity-[0.07] blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-10`} />

                      {/* Card Header */}

                      <CardHeader className="relative p-7 pb-4 sm:p-8 sm:pb-4">
                        {/* Mobile Step */}

                        <div className="mb-6 flex items-center justify-between lg:hidden">
                          <div className="flex items-center gap-3">
                            <div className={`flex size-12 items-center justify-center rounded-2xl bg-linear-to-br ${gradient} shadow-lg shadow-orange-500/20`}>
                              <div className="relative size-7">
                                <Image src={card.icon} alt={card.title} fill className="object-contain" />
                              </div>
                            </div>

                            <div>
                              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                                Step
                              </p>

                              <p className="text-lg font-black text-orange-950 dark:text-orange-100">
                                0{index + 1}
                              </p>
                            </div>
                          </div>

                          <CircleDot className="size-5 text-orange-300 dark:text-orange-700" />
                        </div>

                        {/* Desktop Label */}

                        <div className="hidden items-center justify-between lg:flex">
                          <span className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-orange-600 dark:border-orange-900/50 dark:bg-orange-950/50 dark:text-orange-400">
                            <span className="size-1.5 rounded-full bg-orange-500" />
                            Step 0{index + 1}
                          </span>

                          <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange-400/70 dark:text-orange-500/70">
                            {card.label}
                          </span>
                        </div>

                        <CardTitle className="mt-5 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                          {card.title}
                        </CardTitle>
                      </CardHeader>

                      {/* Card Content */}

                      <CardContent className="relative px-7 pb-7 sm:px-8 sm:pb-8">
                        <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 dark:text-slate-400">
                          {card.subtitle}
                        </p>

                        {/* Card Footer */}

                        <div className="mt-7 flex items-center justify-between border-t border-orange-100 pt-5 dark:border-orange-900/40">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-1.5">
                              {[0, 1, 2].map((item) => (
                                <div key={item} className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-orange-100 text-orange-500 dark:border-orange-950 dark:bg-orange-900/50">
                                  <Check className="size-3" />
                                </div>
                              ))}
                            </div>

                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-500">
                              Easy & Fast
                            </span>
                          </div>

                          <motion.div whileHover={{ x: 4 }} className="flex items-center gap-1 text-xs font-bold text-orange-500">
                            Learn more
                            <ChevronRight className="size-3.5" />
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}

        <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative mt-24 overflow-hidden rounded-[36px] border border-orange-200/70 bg-white p-10 shadow-xl shadow-orange-950/5 sm:p-14 dark:border-orange-900/40 dark:bg-orange-950/30">
          <div className="absolute inset-0 bg-linear-to-br from-orange-50/80 via-transparent to-amber-50/70 dark:from-orange-950/40 dark:to-amber-950/20" />

          <div className="absolute -left-24 -top-24 size-72 rounded-full bg-orange-400/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-72 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            <motion.div whileHover={{ scale: 1.08, rotate: 5 }} className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-500/20">
              <Sparkles className="size-8" />
            </motion.div>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.25em] text-orange-500">
              Your Food Journey Starts Here
            </p>

            <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Great Food Is Just a Few
              <span className="text-orange-500"> Clicks Away</span>
            </h3>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
              Discover delicious meals, choose your favorites, place your
              order, and enjoy an amazing food experience with FoodHub.
            </p>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange-50 px-5 py-2.5 text-sm font-bold text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
              <Utensils className="size-4" />
              Start exploring FoodHub today
              <ArrowRight className="size-4" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowFoodHubWorks;