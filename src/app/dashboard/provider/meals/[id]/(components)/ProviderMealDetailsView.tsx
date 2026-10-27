"use client";

import Image from "next/image";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LoaderCircle,
  Pencil,
  Tag,
  Utensils,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MealDetailsType } from "@/types/meal.type";

interface ProviderMealDetailsViewProps {
  meal: MealDetailsType;
  onBack: () => void;
  onEdit: () => void;
  onPublishChange: () => void;
  isPublishing: boolean;
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

function formatUpdatedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function ProviderMealDetailsView({
  meal,
  onBack,
  onEdit,
  onPublishChange,
  isPublishing,
}: ProviderMealDetailsViewProps) {
  return (
    <div className="space-y-5 p-4 md:p-6">
      <div className="flex flex-wrap items-center gap-3">
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
            {meal.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button
            type="button"
            onClick={onEdit}
            className="h-9 gap-2 rounded-lg bg-orange-500 px-3 font-semibold text-white hover:bg-orange-600"
          >
            <Pencil className="size-4" />
            Edit Meal
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
                className="rounded-full border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-400"
              >
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
              <DetailTile label="Availability" value={meal.availabilty_status} />
              <DetailTile label="Last updated" value={formatUpdatedAt(meal.updatedAt)} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
