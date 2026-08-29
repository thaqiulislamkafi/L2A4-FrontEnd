"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ChefHat,
  Heart,
  History,
  Lightbulb,
  Sparkles,
  Utensils,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const OurStory = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-orange-300/10 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

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
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge
            variant="outline"
            className="h-auto rounded-full border-orange-200 bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-100"
          >
            <History className="h-4 w-4" />
            Our Story
          </Badge>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
            The Story Behind
            <span className="text-orange-600"> FoodHub</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            FoodHub was built around a simple idea — make great food easier
            to discover while creating a trusted connection between customers
            and food providers.
          </p>
        </motion.div>

        {/* =====================================================
            MAIN STORY
        ===================================================== */}

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* =================================================
              LEFT VISUAL
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative mx-auto w-full max-w-xl"
          >
            {/* Main Visual Card */}

            <motion.div
              whileHover={{
                y: -6,
              }}
              transition={{
                duration: 0.3,
              }}
              className="relative overflow-hidden rounded-[2rem] border border-orange-100 bg-orange-50/70 p-6 shadow-xl shadow-orange-100/60 md:p-8"
            >
              {/* Decorative circle */}

              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-200/40 blur-2xl" />

              <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-orange-300/20 blur-2xl" />

              {/* Icon */}

              <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-600 text-white shadow-xl shadow-orange-600/20">
                <ChefHat className="h-10 w-10" />
              </div>

              <div className="relative mt-8">
                <Label className="text-sm font-semibold uppercase tracking-wider text-orange-600">
                  Where It Started
                </Label>

                <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  A Simple Idea,
                  <span className="block text-orange-600">
                    A Bigger Purpose.
                  </span>
                </h3>

                <p className="mt-5 text-sm leading-7 text-slate-600 md:text-base">
                  We wanted to create a place where people could discover
                  delicious meals without complicated processes, while giving
                  food providers an opportunity to share their passion with a
                  wider community.
                </p>
              </div>

              {/* Mini Stats */}

              <div className="relative mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                  <Users className="h-6 w-6 text-orange-600" />

                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    Community
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Built around food lovers and providers.
                  </p>
                </div>

                <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                  <Heart className="h-6 w-6 text-orange-600" />

                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    Passion
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Driven by our love for great food.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating Icon */}

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
              className="absolute -right-4 top-12 hidden h-14 w-14 items-center justify-center rounded-2xl border border-orange-100 bg-white shadow-xl md:flex"
            >
              <Utensils className="h-6 w-6 text-orange-500" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 12, 0],
                rotate: [0, -8, 0],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-5 left-8 hidden h-12 w-12 items-center justify-center rounded-xl border border-orange-100 bg-white shadow-lg md:flex"
            >
              <Sparkles className="h-5 w-5 text-orange-500" />
            </motion.div>
          </motion.div>

          {/* =================================================
              RIGHT STORY CONTENT
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
          >
            <Label className="text-sm font-semibold uppercase tracking-wider text-orange-600">
              Our Journey
            </Label>

            <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Connecting people with
              <span className="text-orange-600"> food they love.</span>
            </h3>

            <p className="mt-6 text-base leading-8 text-slate-600">
              FoodHub started with a vision to bring convenience and quality
              together. Instead of making customers search through countless
              options, we wanted to create a focused platform where discovering
              a meal feels exciting and effortless.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600">
              At the same time, FoodHub gives providers a platform to showcase
              their meals, connect with customers, and build meaningful
              relationships around the food they create.
            </p>

            {/* Story Points */}

            <div className="mt-8 space-y-4">
              <Card className="border-orange-100 bg-orange-50/40 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:bg-orange-50 hover:shadow-md">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100">
                    <Lightbulb className="h-5 w-5 text-orange-600" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Started with an idea
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Make discovering and ordering delicious meals simple.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-100 bg-orange-50/40 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:bg-orange-50 hover:shadow-md">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100">
                    <Users className="h-5 w-5 text-orange-600" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Built around people
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Bringing customers and passionate food providers
                      together.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-100 bg-orange-50/40 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:bg-orange-50 hover:shadow-md">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100">
                    <Heart className="h-5 w-5 text-orange-600" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Driven by passion
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Creating experiences that make every meal more
                      enjoyable.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA */}

            <Button
            //   asChild
              variant="outline"
              className="group mt-8 rounded-xl border-orange-200 bg-white px-5 text-orange-700 transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
            >
              <Link href="/explore-meals" className="flex gap-2">
                Discover Our Meals

                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;