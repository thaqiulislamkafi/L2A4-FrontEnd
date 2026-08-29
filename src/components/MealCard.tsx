"use client";

import Image from "next/image";
import Link from "next/link";
import {ArrowRight,ShoppingBag,} from "lucide-react";

import { Meal } from "@/types/meal.type";
import {Card,CardContent,CardFooter,} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";

interface MealCardProps {
    meal: Meal;
}

const MealCard = ({ meal }: MealCardProps) => {
    
    return (
            <Card className="group h-full overflow-hidden border-orange-100 bg-background/90 p-0 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/40 dark:border-orange-950/40 dark:hover:border-orange-900 dark:hover:shadow-orange-950/20">

                {/* =========================
                    Image
                ========================= */}

                <div className="relative h-64 overflow-hidden">
                    
                    <Image
                        src={meal.image}
                        alt={meal.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Image Overlay */}

                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/5 to-transparent" />

                    {/* Availability */}

                    <div className="absolute right-4 top-4">
                        <Badge
                            className={
                                meal.availabilty_status === "AVAILABLE"
                                    ? "border border-white/20 bg-orange-600 text-white shadow-lg hover:bg-orange-600"
                                    : "bg-slate-700 text-white"
                            }
                        >
                            {meal.availabilty_status === "AVAILABLE"
                                ? "Available"
                                : meal.availabilty_status}
                        </Badge>
                    </div>

                    {/* Price */}

                    <div className="absolute bottom-4 left-4">
                        <div className="rounded-xl border border-white/20 bg-black/30 px-4 py-2 text-white backdrop-blur-md">
                            <Label className="text-xs font-medium text-white/80">
                                Starting from
                            </Label>

                            <p className="text-xl font-bold">
                                ৳{meal.pricePerPiece}
                            </p>
                        </div>
                    </div>
                </div>

                {/* =========================
                    Content
                ========================= */}

                <CardContent className="p-6">

                    {/* Meal Name */}

                    <h3 className="line-clamp-1 text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                        {meal.name}
                    </h3>

                    {/* Description */}

                    <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-relaxed text-muted-foreground">
                        {meal.description}
                    </p>

                    {/* Tags */}

                    <div className="mt-5 flex flex-wrap gap-2">

                        <Badge
                            variant="secondary"
                            className="border border-orange-100 bg-orange-50 text-orange-700 hover:bg-orange-100 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-400"
                        >
                            {meal.cuisine_rel.cuisine_type_name}
                        </Badge>

                        <Badge
                            variant="outline"
                            className="border-orange-200 text-orange-700 dark:border-orange-900 dark:text-orange-400"
                        >
                            {meal.category_rel.category_name}
                        </Badge>

                        <Badge
                            variant="outline"
                            className="border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400"
                        >
                            {meal.dietry_rel.dietry_type_name}
                        </Badge>

                    </div>

                    {/* Availability */}

                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">

                        <div>
                            <Label className="text-xs text-muted-foreground">
                                Available
                            </Label>

                            <p className="mt-1 font-semibold text-foreground">
                                {meal.availablePieces} pieces
                            </p>
                        </div>

                        <div className="text-right">
                            <Label className="text-xs text-muted-foreground">
                                Category
                            </Label>

                            <p className="mt-1 max-w-32 truncate text-sm font-medium text-foreground">
                                {meal.category_rel.category_name}
                            </p>
                        </div>

                    </div>
                </CardContent>

                {/* =========================
                    Footer
                ========================= */}

                <CardFooter className="p-6 pt-0">

                    <Button

                        className="group/button w-full bg-orange-600 text-white shadow-md shadow-orange-600/20 transition-all hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/30"
                    >
                        <Link href={`/explore-meals/${meal.id}`} className="flex items-center justify-center gap-2">
                            <ShoppingBag className="h-4 w-4" />

                            View Meal

                            <ArrowRight className="ml-auto h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                        </Link>
                    </Button>

                </CardFooter>

            </Card>
    );
};

export default MealCard;