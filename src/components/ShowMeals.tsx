"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChefHat, Utensils, ShoppingBag, } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge, HeaderBadge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

import { Meal } from "@/types/meal.type";
import MealCard from "./MealCard";

const ShowMeals = ({ meals }: { meals: Meal[] | null }) => {

    if (!meals) {
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
                        <HeaderBadge>
                            <ChefHat className="h-4 w-4" />
                            Featured Meals
                        </HeaderBadge>
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
                            <MealCard meal={meal} />
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