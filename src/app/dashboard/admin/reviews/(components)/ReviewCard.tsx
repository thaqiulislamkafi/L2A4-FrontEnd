"use client";

import * as React from "react";
import Image from "next/image";
import { MoreHorizontal, Star, UserCircle } from "lucide-react";

import { GlobalReview } from "@/types/global-review.type";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ReviewCardProps {
  review: GlobalReview;
  onDelete?: (review: GlobalReview) => void;
  onView?: (review: GlobalReview) => void;
}

function getInitials(name?: string | null) {
  if (!name) return "U";

  return name.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase();
}

function formatDate(date?: string | Date) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, index) => (
    <Star key={index} className={`size-4 ${index < rating ? "fill-orange-500 text-orange-500" : "text-orange-200 dark:text-orange-900"}`} />
  ));
}

export default function ReviewCard({ review, onDelete, onView }: ReviewCardProps) {
  const user = review.user;

  return (
    <Card className="group h-full overflow-hidden border-orange-200/80 bg-white shadow-sm shadow-orange-950/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-950/10 dark:border-orange-900/40 dark:bg-orange-950/20">
      <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-orange-100/80 px-5 py-4 dark:border-orange-900/30">
        <div className="flex min-w-0 items-center gap-3">
          {user?.image ? (
            <Image src={user.image} alt={user.name ?? "User"} width={44} height={44} className="size-11 shrink-0 rounded-full object-cover ring-2 ring-orange-100 dark:ring-orange-900/50" />
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
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={`Actions for ${user?.name ?? "review"}`} />} className="shrink-0 text-orange-600 hover:bg-orange-50 hover:text-orange-700 dark:text-orange-400 dark:hover:bg-orange-950/40">
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40 rounded-xl border-orange-200 bg-white p-1.5 dark:border-orange-900/50 dark:bg-orange-950">
            <DropdownMenuItem onClick={() => onView?.(review)} className="cursor-pointer rounded-lg font-medium text-orange-800 focus:bg-orange-100 focus:text-orange-700 dark:text-orange-200 dark:focus:bg-orange-950/60 dark:focus:text-orange-300">
              <span>View Review</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-orange-100 dark:bg-orange-900/40" />

            <DropdownMenuItem onClick={() => onDelete?.(review)} className="cursor-pointer rounded-lg font-medium text-red-600 focus:bg-red-50 focus:text-red-600 dark:text-red-400 dark:focus:bg-red-950/30 dark:focus:text-red-400">
              <span>Delete Review</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="space-y-4 px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
            {renderStars(review.rating)}
          </div>

          <Badge variant="outline" className="rounded-full border-orange-200 bg-orange-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-700 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-300">
            {review.rating}/5
          </Badge>
        </div>

        <blockquote className="text-sm font-medium leading-6 text-orange-900/80 dark:text-orange-100/80">
          “{review.comment}”
        </blockquote>
      </CardContent>

      <CardFooter className="border-t border-orange-100/80 px-5 py-3 dark:border-orange-900/30">
        <p className="text-xs font-medium text-orange-600/60 dark:text-orange-300/60">
          Reviewed on {formatDate(review.createdAt)}
        </p>
      </CardFooter>
    </Card>
  );
}