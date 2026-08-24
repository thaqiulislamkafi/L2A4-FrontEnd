"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {ArrowRight,ChefHat,CircleCheck,Heart,Leaf,Sparkles,Utensils,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-orange-50/60 py-20 md:py-28">
      {/* =====================================================
          BACKGROUND DECORATIONS
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Left Glow */}
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
          className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl"
        />

        {/* Right Glow */}
        <motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-orange-500/15 blur-3xl"
        />

        {/* Small Decorative Circle */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[8%] top-[20%] h-5 w-5 rounded-full bg-orange-400/30"
        />

        <motion.div
          animate={{
            y: [0, 18, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[10%] top-[25%] h-4 w-4 rounded-full bg-orange-500/30"
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            {/* Badge */}

            <Badge
              variant="outline"
              className="h-auto rounded-full border-orange-200 bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 shadow-sm hover:bg-orange-100"
            >
              <Sparkles className="h-4 w-4" />

              About FoodHub
            </Badge>

            {/* Heading */}

            <h1 className="mt-6 max-w-2xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              More Than Just
              <span className="block text-orange-600">
                Great Food.
              </span>
            </h1>

            {/* Description */}

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
              FoodHub brings delicious meals, trusted food providers, and
              hungry customers together in one simple and enjoyable
              experience.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 md:text-base">
              We believe great food should be easy to discover, simple to
              order, and enjoyable from the very first bite.
            </p>

            {/* Highlights */}

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Trusted food providers",
                "Quality meals",
                "Simple ordering",
                "Customer-focused service",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-slate-700"
                >
                  <CircleCheck className="h-4 w-4 shrink-0 text-orange-500" />

                  {item}
                </div>
              ))}
            </div>

            {/* Buttons */}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                // asChild
                size="lg"
                className="group h-12 rounded-xl bg-orange-600 px-6 font-semibold text-white shadow-lg shadow-orange-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/30"
              >
                <Link href="/explore-meals">
                  Explore Meals

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                // asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-orange-200 bg-white px-6 font-semibold text-orange-700 transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
              >
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* =================================================
              RIGHT VISUAL
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
            className="relative mx-auto w-full max-w-lg"
          >
            {/* Main Card */}

            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative rounded-[2rem] border border-orange-100 bg-white/80 p-6 shadow-2xl shadow-orange-100/70 backdrop-blur-xl md:p-8"
            >
              {/* Top Icon */}

              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
                  <ChefHat className="h-7 w-7 text-orange-600" />
                </div>

                <Badge
                  variant="outline"
                  className="rounded-full border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700"
                >
                  <CircleCheck className="h-3.5 w-3.5" />

                  Trusted Experience
                </Badge>
              </div>

              {/* Main Message */}

              <div className="mt-8">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  Bringing People Together
                  <span className="block text-orange-600">
                    Through Food.
                  </span>
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
                  From traditional Bangladeshi favorites to exciting new
                  flavors, FoodHub makes discovering your next favorite meal
                  effortless.
                </p>
              </div>

              {/* Feature Cards */}

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-4">
                  <Utensils className="h-5 w-5 text-orange-600" />

                  <p className="mt-3 text-sm font-semibold text-slate-800">
                    Delicious Meals
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Discover meals made with care.
                  </p>
                </div>

                <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-4">
                  <Heart className="h-5 w-5 text-orange-600" />

                  <p className="mt-3 text-sm font-semibold text-slate-800">
                    Customer First
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Your experience matters to us.
                  </p>
                </div>
              </div>

              {/* Bottom Highlight */}

              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-white">
                  <Leaf className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Made for Food Lovers
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Quality, convenience &amp; great taste.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* =================================================
                FLOATING ICONS
            ================================================= */}

            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-6 top-20 hidden h-14 w-14 items-center justify-center rounded-2xl border border-orange-100 bg-white shadow-xl md:flex"
            >
              <Utensils className="h-6 w-6 text-orange-500" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 14, 0],
                rotate: [0, -8, 0],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-5 bottom-20 hidden h-14 w-14 items-center justify-center rounded-2xl border border-orange-100 bg-white shadow-xl md:flex"
            >
              <Heart className="h-6 w-6 fill-orange-500 text-orange-500" />
            </motion.div>

            {/* Decorative Blur */}

            <div className="absolute -bottom-10 -left-10 -z-10 h-40 w-40 rounded-full bg-orange-400/15 blur-3xl" />

            <div className="absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full bg-orange-300/20 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;