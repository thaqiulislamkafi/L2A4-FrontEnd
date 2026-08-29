import { Card, CardContent, CardFooter } from '@/components/ui/card';
import React from 'react';

const ExploreMealsLoader = () => {

    return (
        <section className="relative overflow-hidden bg-orange-50/40 py-24 dark:bg-orange-950/10">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-orange-100/60 via-background to-orange-50/40 dark:from-orange-950/20 dark:via-background dark:to-orange-950/10" />

            <div className="max-w-6xl relative mx-auto px-4">
                {/* Header Skeleton */}
                <div className="mx-auto mb-14 max-w-3xl text-center">
                    {/* Badge */}
                    <div className="mx-auto mb-6 h-9 w-48 animate-pulse rounded-full bg-orange-200/70 dark:bg-orange-900/40" />

                    {/* Heading */}
                    <div className="mx-auto h-12 w-80 animate-pulse rounded-xl bg-orange-100 dark:bg-orange-950/40" />

                    {/* Description */}
                    <div className="mx-auto mt-5 h-5 max-w-2xl animate-pulse rounded-lg bg-orange-100/70 dark:bg-orange-950/30" />
                </div>

                {/* Meal Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <Card
                            key={index}
                            className="h-full overflow-hidden border-orange-100 bg-background/90 p-0 shadow-sm dark:border-orange-950/40"
                        >
                            {/* =========================
                  Image Skeleton
              ========================= */}
                            <div className="relative h-64 animate-pulse bg-orange-100 dark:bg-orange-950/30">
                                {/* Availability Badge */}
                                <div className="absolute right-4 top-4 h-6 w-20 animate-pulse rounded-full bg-orange-200/80 dark:bg-orange-900/50" />

                                {/* Price */}
                                <div className="absolute bottom-4 left-4 h-16 w-28 animate-pulse rounded-xl bg-black/20" />
                            </div>

                            {/* =========================
                  Content Skeleton
              ========================= */}
                            <CardContent className="p-6">
                                {/* Meal Name */}
                                <div className="h-6 w-3/4 animate-pulse rounded-md bg-orange-100 dark:bg-orange-950/40" />

                                {/* Description */}
                                <div className="mt-3 space-y-2">
                                    <div className="h-4 w-full animate-pulse rounded bg-orange-100/70 dark:bg-orange-950/30" />
                                    <div className="h-4 w-2/3 animate-pulse rounded bg-orange-100/70 dark:bg-orange-950/30" />
                                </div>

                                {/* Tags */}
                                <div className="mt-5 flex flex-wrap gap-2">
                                    <div className="h-6 w-28 animate-pulse rounded-full bg-orange-100 dark:bg-orange-950/40" />

                                    <div className="h-6 w-24 animate-pulse rounded-full bg-orange-100 dark:bg-orange-950/40" />

                                    <div className="h-6 w-20 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
                                </div>

                                {/* Availability */}
                                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                                    {/* Available */}
                                    <div className="space-y-2">
                                        <div className="h-3 w-16 animate-pulse rounded bg-orange-100 dark:bg-orange-950/40" />

                                        <div className="h-5 w-24 animate-pulse rounded bg-orange-100/70 dark:bg-orange-950/30" />
                                    </div>

                                    {/* Category */}
                                    <div className="space-y-2 text-right">
                                        <div className="ml-auto h-3 w-16 animate-pulse rounded bg-orange-100 dark:bg-orange-950/40" />

                                        <div className="ml-auto h-5 w-28 animate-pulse rounded bg-orange-100/70 dark:bg-orange-950/30" />
                                    </div>
                                </div>
                            </CardContent>

                            {/* =========================
                  Footer Skeleton
              ========================= */}
                            <CardFooter className="p-6 pt-0">
                                <div className="h-10 w-full animate-pulse rounded-lg bg-orange-100 dark:bg-orange-950/40" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExploreMealsLoader;