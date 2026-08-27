"use client";

import Image from "next/image";
import { MoreHorizontal, Pencil, Star, Trash2, UserCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MealReview } from "@/types/meal-review.type";

interface MealReviewCardProps {
  review: MealReview;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function MealReviewCard({ review }: MealReviewCardProps) {
  const user = review.user;
  const meal = review.meal;

  return (
    <Card className="group h-full overflow-hidden border-orange-200/80 bg-white shadow-sm shadow-orange-950/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-950/10 dark:border-orange-900/40 dark:bg-orange-950/20">
      <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-orange-100/80 px-5 py-4 dark:border-orange-900/30">
        <div className="flex min-w-0 items-center gap-3">
          {user?.image ? (
            <Image src={user.image} alt={user.name || "User"} width={44} height={44} className="size-11 shrink-0 rounded-full object-cover ring-2 ring-orange-100 dark:ring-orange-900/50" />
          ) : (
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 ring-2 ring-orange-200 dark:bg-orange-950/60 dark:text-orange-400 dark:ring-orange-900/50">
              <UserCircle className="size-6" />
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-orange-950 dark:text-orange-50">{user?.name ?? "Unknown User"}</p>
            <p className="truncate text-xs font-medium text-orange-600/60 dark:text-orange-300/60">{user?.email ?? "No email available"}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={`Actions for ${meal?.name ?? "review"}`} />} className="shrink-0 text-orange-600 hover:bg-orange-50 hover:text-orange-700 dark:text-orange-400 dark:hover:bg-orange-950/40">
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 rounded-xl border-orange-200 bg-white p-1.5 dark:border-orange-900/50 dark:bg-orange-950">
            <DropdownMenuItem className="cursor-pointer rounded-lg font-medium text-orange-800 focus:bg-orange-100 focus:text-orange-700 dark:text-orange-200 dark:focus:bg-orange-950/60">View Review</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer rounded-lg font-medium text-orange-800 focus:bg-orange-100 focus:text-orange-700 dark:text-orange-200 dark:focus:bg-orange-950/60">
              <Pencil className="size-4 text-orange-500" /> Edit Review
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-orange-100 dark:bg-orange-900/40" />
            <DropdownMenuItem className="cursor-pointer rounded-lg font-medium text-red-600 focus:bg-red-50 focus:text-red-600 dark:text-red-400">
              <Trash2 className="size-4" /> Delete Review
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="space-y-4 px-5 py-5">
        <div className="flex items-start gap-3">
          {meal?.image ? <Image src={meal.image} alt={meal.name} width={64} height={64} className="size-16 shrink-0 rounded-lg object-cover" /> : null}
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-orange-950 dark:text-orange-50">{meal?.name ?? "Unknown Meal"}</p>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-orange-700/70 dark:text-orange-300/70">{meal?.description ?? "No meal description available."}</p>
            {meal ? <p className="mt-1 text-xs font-semibold text-orange-600 dark:text-orange-400">৳{meal.pricePerPiece} per piece</p> : null}
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, index) => <Star key={index} className={`size-4 ${index < review.rating ? "fill-orange-500 text-orange-500" : "text-orange-200 dark:text-orange-900"}`} />)}
          </div>
          <Badge variant="outline" className="rounded-full border-orange-200 bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-orange-700 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-300">{review.rating}/5</Badge>
        </div>
        <blockquote className="text-sm font-medium leading-6 text-orange-900/80 dark:text-orange-100/80">“{review.comment}”</blockquote>
      </CardContent>
      <CardFooter className="border-t border-orange-100/80 px-5 py-3 dark:border-orange-900/30">
        <p className="text-xs font-medium text-orange-600/60 dark:text-orange-300/60">Reviewed on {formatDate(review.createdAt)}</p>
      </CardFooter>
    </Card>
  );
}
