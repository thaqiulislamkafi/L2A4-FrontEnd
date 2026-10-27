"use client";

import Image from "next/image";
import {
  ArrowLeft,
  Crown,
  Pencil,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  EyeOff,
  Mail,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  Trash2,
  LoaderCircle,
  Star,
  Tag,
  UserRound,
  Utensils,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MealDetailsType } from "@/types/meal.type";

interface MealDetailsViewProps {
  meal: MealDetailsType;
  onBack: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  onMarkHero: () => void;
  onPublishChange: () => void;
  isMarkingHero: boolean;
  isPublishing: boolean;
  isDeleting: boolean;
}

function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getAvailabilityStyle(status: string) {
  switch (status.toUpperCase()) {
    case "AVAILABLE":
      return "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400";
    case "UNAVAILABLE":
      return "border-red-200 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400";
    default:
      return "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-400";
  }
}

function DetailTile({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-orange-100 bg-orange-50/30 p-3 dark:border-orange-900/40 dark:bg-orange-950/10">
      <p className="text-[11px] font-bold uppercase tracking-wide text-orange-500/80">
        {label}
      </p>
      <p className="mt-1.5 truncate text-sm font-semibold text-orange-950 dark:text-orange-100">
        {value}
      </p>
    </div>
  );
}

export default function MealDetailsView({
  meal,
  onBack,
  onUpdate,
  onDelete,
  onMarkHero,
  onPublishChange,
  isMarkingHero,
  isPublishing,
  isDeleting,
}: MealDetailsViewProps) {
  const analytics = meal.mealAnalytics?.[0];
  const reviews = meal.reviews ?? [];

  return (
    <div className="space-y-5 p-4 md:p-6">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onBack}
          aria-label="Back to meals"
          className="size-9 shrink-0 rounded-lg border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950/40"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold tracking-tight text-orange-950 dark:text-orange-50 sm:text-2xl">
            Meal Details
          </h1>
          <p className="truncate text-xs font-medium text-orange-700/60 dark:text-orange-300/60">
            {meal.name} <span className="font-mono">· {meal.id}</span>
          </p>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Button
            type="button"
            onClick={onPublishChange}
            disabled={isPublishing}
            className={`h-9 gap-2 rounded-lg px-3 font-semibold text-white ${
              meal.isPublished
                ? "bg-slate-600 hover:bg-slate-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isPublishing ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : meal.isPublished ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
            <span className="hidden sm:inline">
              {meal.isPublished ? "Unpublish" : "Publish"}
            </span>
          </Button>
          <Button
            type="button"
            onClick={onMarkHero}
            disabled={meal.isHeroContent || isMarkingHero}
            className="h-9 gap-2 rounded-lg bg-amber-500 px-3 font-semibold text-white hover:bg-amber-600"
          >
            {isMarkingHero ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Crown className="size-4" />
            )}
            <span className="hidden sm:inline">
              {meal.isHeroContent ? "Hero Content" : "Mark Hero"}
            </span>
          </Button>
          <Button
            type="button"
            onClick={onUpdate}
            className="h-9 gap-2 rounded-lg bg-orange-500 px-3 font-semibold text-white hover:bg-orange-600"
          >
            <Pencil className="size-4" />
            <span className="hidden sm:inline">Update</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onDelete}
            disabled={isDeleting}
            className="h-9 gap-2 rounded-lg border-red-200 px-3 font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            <Trash2 className="size-4" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
        <Card className="overflow-hidden border-orange-200/70 bg-white p-0 shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
          <div className="relative min-h-72 bg-orange-100 dark:bg-orange-950/50 sm:min-h-96">
            {meal.image ? (
              <Image
                src={meal.image}
                alt={meal.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            ) : (
              <div className="flex min-h-72 items-center justify-center text-orange-400 sm:min-h-96">
                <Utensils className="size-14" />
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent" />
            <div className="absolute right-4 top-4 flex flex-wrap justify-end gap-2">
              <Badge
                variant="outline"
                className={`rounded-full px-3 py-1 text-xs font-semibold ${getAvailabilityStyle(meal.availabilty_status)}`}
              >
                <span className="mr-1.5 size-1.5 rounded-full bg-current" />
                {meal.availabilty_status}
              </Badge>
              <Badge className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-orange-800 hover:bg-white/90">
                {meal.isPublished ? "Published" : "Draft"}
              </Badge>
            </div>
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <p className="text-sm font-medium text-white/80">Price per piece</p>
              <p className="text-3xl font-bold">৳{meal.pricePerPiece}</p>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
          <CardHeader className="border-b border-orange-100 bg-orange-50/40 px-5 py-4 dark:border-orange-900/40 dark:bg-orange-950/20">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                <Utensils className="size-4" />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-base font-bold text-orange-950 dark:text-orange-50">
                  {meal.name}
                </CardTitle>
                <p className="mt-0.5 text-xs font-medium text-orange-700/60 dark:text-orange-300/60">
                  Meal overview
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 p-5">
            <p className="text-sm leading-6 text-orange-900/80 dark:text-orange-100/80">
              {meal.description || "No description provided."}
            </p>

            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="rounded-full border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/30 dark:text-orange-300"
              >
                <Utensils className="mr-1 size-3.5" />
                {meal.cuisine_rel?.cuisine_type_name || "Cuisine not set"}
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/30 dark:text-orange-300"
              >
                <Tag className="mr-1 size-3.5" />
                {meal.category_rel?.category_name || "Category not set"}
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/30 dark:text-orange-300"
              >
                {meal.dietry_rel?.dietry_type_name || "Dietary type not set"}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <DetailTile label="Total pieces" value={meal.totalPieces} />
              <DetailTile label="Available" value={meal.availablePieces} />
              <DetailTile label="Orders" value={analytics?.totalOrders ?? 0} />
              <DetailTile
                label="Average rating"
                value={`${(analytics?.averageRating ?? 0).toFixed(1)} / 5`}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="overflow-hidden border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
          <CardHeader className="border-b border-orange-100 bg-orange-50/40 px-5 py-4 dark:border-orange-900/40 dark:bg-orange-950/20">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                <UserRound className="size-4" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-orange-950 dark:text-orange-50">
                  Provider
                </CardTitle>
                <p className="mt-0.5 text-xs font-medium text-orange-700/60 dark:text-orange-300/60">
                  Meal owner information
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 p-5">
            <div className="flex items-center gap-3">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-orange-100 dark:bg-orange-950/50">
                {meal.provider?.image ? (
                  <Image
                    src={meal.provider.image}
                    alt={meal.provider.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-orange-500">
                    <UserRound className="size-6" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-orange-950 dark:text-orange-50">
                  {meal.provider?.name || "Unknown provider"}
                </p>
                <p className="truncate text-sm text-orange-700/70 dark:text-orange-300/70">
                  {meal.provider?.email || "No email available"}
                </p>
              </div>
              {meal.provider?.status && (
                <Badge
                  variant="outline"
                  className="ml-auto shrink-0 rounded-full border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400"
                >
                  {meal.provider.status}
                </Badge>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex min-w-0 items-start gap-2 rounded-xl border border-orange-100 bg-orange-50/30 p-3 dark:border-orange-900/40 dark:bg-orange-950/10">
                <Phone className="mt-0.5 size-4 shrink-0 text-orange-500" />
                <span className="break-all text-sm text-orange-900 dark:text-orange-100">
                  {meal.provider?.contact || "No phone available"}
                </span>
              </div>
              <div className="flex min-w-0 items-start gap-2 rounded-xl border border-orange-100 bg-orange-50/30 p-3 dark:border-orange-900/40 dark:bg-orange-950/10">
                <MapPin className="mt-0.5 size-4 shrink-0 text-orange-500" />
                <span className="text-sm text-orange-900 dark:text-orange-100">
                  {meal.provider?.address || "No address available"}
                </span>
              </div>
              <div className="flex min-w-0 items-start gap-2 rounded-xl border border-orange-100 bg-orange-50/30 p-3 dark:border-orange-900/40 dark:bg-orange-950/10 sm:col-span-2">
                <Mail className="mt-0.5 size-4 shrink-0 text-orange-500" />
                <span className="break-all text-sm text-orange-900 dark:text-orange-100">
                  {meal.provider?.email || "No email available"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
          <CardHeader className="border-b border-orange-100 bg-orange-50/40 px-5 py-4 dark:border-orange-900/40 dark:bg-orange-950/20">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                <MessageSquare className="size-4" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-orange-950 dark:text-orange-50">
                  Reviews
                </CardTitle>
                <p className="mt-0.5 text-xs font-medium text-orange-700/60 dark:text-orange-300/60">
                  {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            {reviews.length ? (
              <div className="divide-y divide-orange-100 dark:divide-orange-900/40">
                {reviews.map((review) => (
                  <article
                    key={review.id}
                    className="py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div
                        className="flex items-center gap-1"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={`size-4 ${
                              index < review.rating
                                ? "fill-orange-400 text-orange-400"
                                : "text-orange-200 dark:text-orange-800"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-xs font-semibold text-orange-800 dark:text-orange-200">
                          {review.rating}/5
                        </span>
                      </div>
                      <span className="text-xs text-orange-700/60 dark:text-orange-300/60">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-orange-900/80 dark:text-orange-100/80">
                      {review.comment || "No comment provided."}
                    </p>
                    <p className="mt-2 truncate font-mono text-[11px] text-orange-700/50 dark:text-orange-300/50">
                      User ID: {review.user_id}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex min-h-32 flex-col items-center justify-center text-center">
                <MessageSquare className="size-7 text-orange-300 dark:text-orange-700" />
                <p className="mt-2 text-sm font-medium text-orange-800 dark:text-orange-200">
                  No reviews yet
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
        <CardContent className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-2">
            <CalendarDays className="mt-0.5 size-4 shrink-0 text-orange-500" />
            <div>
              <p className="text-xs font-semibold text-orange-700/60 dark:text-orange-300/60">
                Created
              </p>
              <p className="mt-1 text-sm font-medium text-orange-950 dark:text-orange-100">
                {formatDate(meal.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock3 className="mt-0.5 size-4 shrink-0 text-orange-500" />
            <div>
              <p className="text-xs font-semibold text-orange-700/60 dark:text-orange-300/60">
                Last updated
              </p>
              <p className="mt-1 text-sm font-medium text-orange-950 dark:text-orange-100">
                {formatDate(meal.updatedAt)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Package className="mt-0.5 size-4 shrink-0 text-orange-500" />
            <div>
              <p className="text-xs font-semibold text-orange-700/60 dark:text-orange-300/60">
                Homepage placement
              </p>
              <p className="mt-1 flex flex-wrap gap-1.5">
                {meal.isHeroContent && (
                  <Badge variant="outline" className="border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-300">
                    Hero
                  </Badge>
                )}
                {meal.isSliderContent && (
                  <Badge variant="outline" className="border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-300">
                    Slider
                  </Badge>
                )}
                {!meal.isHeroContent && !meal.isSliderContent && (
                  <span className="text-sm font-medium text-orange-950 dark:text-orange-100">
                    None
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-orange-500" />
            <div>
              <p className="text-xs font-semibold text-orange-700/60 dark:text-orange-300/60">
                Provider account
              </p>
              <p className="mt-1 text-sm font-medium capitalize text-orange-950 dark:text-orange-100">
                {meal.provider?.role || "—"} · {meal.provider?.status || "—"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
