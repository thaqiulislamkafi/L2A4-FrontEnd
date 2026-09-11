"use client";

import { motion } from "framer-motion";
import {
  Search, RotateCcw, FolderKanban, Loader2, Utensils, Leaf,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

import { getCategories } from "@/lib/api/category";
import { getCuisineTypes } from "@/lib/api/cuisine";
import { Category } from "@/lib/api/category";
import { CuisineType } from "@/lib/api/cuisine";
import { getDietryTypes, DietryType } from "@/lib/api/dietry";

interface MealFiltersProps {
  search: string;
  category: string;
  cuisineType: string;
  dietryType: string;
  totalMeals: number;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string | null) => void;
  onCuisineTypeChange: (value: string | null) => void;
  onDietryTypeChange: (value: string | null) => void;
  onReset: () => void;
}

export default function MealFilters({
  search,
  category,
  cuisineType,
  dietryType,
  totalMeals,
  onSearchChange,
  onCategoryChange,
  onCuisineTypeChange,
  onDietryTypeChange,
  onReset,
}: MealFiltersProps) {
  const {
    data,
    isLoading: isCategoryLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const categories: Category[] = data?.data ?? [];
  const {
    data: cuisineData,
    isLoading: isCuisineTypeLoading,
  } = useQuery({
    queryKey: ["cuisine-types"],
    queryFn: getCuisineTypes,
  });
  const cuisineTypes: CuisineType[] = cuisineData?.data ?? [];
  const {
    data: dietryData,
    isLoading: isDietryTypeLoading,
  } = useQuery({
    queryKey: ["dietry-types"],
    queryFn: getDietryTypes,
  });
  const dietryTypes: DietryType[] = dietryData?.data ?? [];

  const isDefaultFilter =
    search === "" &&
    category === "All Categories" &&
    cuisineType === "All Cuisine Types" &&
    dietryType === "All Dietary Types";

  return (
    <motion.section
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
      }}
      transition={{
        duration: 0.6,
      }}
      className="mb-14"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between max-w-6xl mx-auto">

        {/* =========================
            Search
        ========================= */}

        <div className="relative flex-1">
          <Label
            htmlFor="meal-search"
            className="sr-only"
          >
            Search meals
          </Label>

          <Search className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-orange-500" />

          <Input
            id="meal-search"
            type="text"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search meals by name..."
            className=" h-14 w-full rounded-2xl border-orange-100 pl-14 pr-5 text-[15px] shadow-sm transition-all duration-300 placeholder:text-muted-foreground hover:border-orange-200 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/10 dark:border-orange-950/50 dark:bg-orange-950/5 dark:hover:border-orange-900
            "
          />
        </div>

        {/* =========================
            Category
        ========================= */}

        <div className="relative w-full md:w-fit">
          <Label
            htmlFor="meal-category"
            className="sr-only"
          >
            Meal category
          </Label>

          <FolderKanban className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-500" />

          <Select
            value={category}
            onValueChange={onCategoryChange}
            disabled={isCategoryLoading}
          >
            <SelectTrigger
              size=""
              id="meal-category"
              className="h-14 w-full rounded-2xl border-orange-100 pl-12 pr-5 text-[15px] shadow-sm transition-all duration-300 hover:border-orange-200 focus:border-orange-500 focus:ring-orange-500/10 dark:border-orange-950/50 dark:bg-orange-950/5 dark:hover:border-orange-900
              "
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>

            <SelectContent className="border-orange-100 dark:border-orange-950/50">
              <SelectItem value="All Categories" className={`bg-orange-50`}>
                All Categories
              </SelectItem>

              {isCategoryLoading ? (
                <div className="flex  items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
                  Loading categories...
                </div>
              ) : (
                categories.map((item) => (
                  <SelectItem className={`bg-orange-50  rounded-none`}
                    key={item.id}
                    value={item.category_name}
                  >
                    {item.category_name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* =========================
            Dietary Type
        ========================= */}

        <div className="relative w-full md:w-fit">
          <Label
            htmlFor="meal-dietry-type"
            className="sr-only"
          >
            Meal dietary type
          </Label>

          <Leaf className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-500" />

          <Select
            value={dietryType}
            onValueChange={onDietryTypeChange}
            disabled={isDietryTypeLoading}
          >
            <SelectTrigger
              size=""
              id="meal-dietry-type"
              className="h-14 w-full rounded-2xl border-orange-100 pl-12 pr-4 text-[15px] shadow-sm transition-all duration-300 hover:border-orange-200 focus:border-orange-500 focus:ring-orange-500/10 dark:border-orange-950/50 dark:bg-orange-950/5 dark:hover:border-orange-900
              "
            >
              <SelectValue placeholder="Select dietary type" />
            </SelectTrigger>

            <SelectContent className="border-orange-100 dark:border-orange-950/50">
              <SelectItem value="All Dietary Types" className="bg-orange-50">
                All Dietary Types
              </SelectItem>

              {isDietryTypeLoading ? (
                <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
                  Loading dietary types...
                </div>
              ) : (
                dietryTypes.map((item) => (
                  <SelectItem
                    className="rounded-none bg-orange-50"
                    key={item.id}
                    value={item.dietry_type_name}
                  >
                    {item.dietry_type_name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* =========================
            Cuisine Type
        ========================= */}

        <div className="relative w-full md:w-fit ">
          <Label
            htmlFor="meal-cuisine-type"
            className="sr-only"
          >
            Meal cuisine type
          </Label>

          <Utensils className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-500" />

          <Select
            value={cuisineType}
            onValueChange={onCuisineTypeChange}
            disabled={isCuisineTypeLoading}
          >
            <SelectTrigger
              size=""
              id="meal-cuisine-type"
              className="h-14 w-full rounded-2xl border-orange-100 pl-12 pr-5 text-[15px] shadow-sm transition-all duration-300 hover:border-orange-200 focus:border-orange-500 focus:ring-orange-500/10 dark:border-orange-950/50 dark:bg-orange-950/5 dark:hover:border-orange-900
              "
            >
              <SelectValue placeholder="Select cuisine type" />
            </SelectTrigger>

            <SelectContent className="border-orange-100 dark:border-orange-950/50">
              <SelectItem value="All Cuisine Types" className="bg-orange-50">
                All Cuisine Types
              </SelectItem>

              {isCuisineTypeLoading ? (
                <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
                  Loading cuisine types...
                </div>
              ) : (
                cuisineTypes.map((item) => (
                  <SelectItem
                    className="rounded-none bg-orange-50"
                    key={item.id}
                    value={item.cuisine_type_name}
                  >
                    {item.cuisine_type_name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* =========================
            Result + Reset
        ========================= */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between lg:gap-6">

          {/* Result Count */}

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
              <Search className="h-5 w-5" />
            </div>

            <div className="whitespace-nowrap">
              <Label className="text-xs text-muted-foreground">
                Search Results
              </Label>

              <p className="text-lg font-bold text-foreground">
                {totalMeals}{" "}
                <span className="font-medium text-muted-foreground">
                  Meal{totalMeals !== 1 && "s"}
                </span>
              </p>
            </div>
          </div>

          {/* Reset */}

          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            disabled={isDefaultFilter}
            className=" h-12 rounded-2xl border-orange-200 px-5 font-semibold text-orange-700 shadow-sm transition-all duration-300 bg-orange-50 hover:border-orange-500 hover:bg-orange-600 hover:text-white hover:shadow-lg hover:shadow-orange-600/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-orange-900 dark:bg-orange-950/5 dark:text-orange-400 dark:hover:bg-orange-600 dark:hover:text-white
            "
          >
            <RotateCcw className="h-4 w-4" />

            Reset Filters
          </Button>
        </div>
      </div>

      {/* =========================
          Active Filters
      ========================= */}

      {!isDefaultFilter && (
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-5 flex flex-wrap items-center gap-2 max-w-6xl mx-auto"
        >
          <Label className="mr-1 text-xs text-muted-foreground ">
            Active filters:
          </Label>

          {search && (
            <Badge
              variant="secondary"
              className=" border border-orange-100 bg-orange-50 text-orange-700 hover:bg-orange-100 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-400
              "
            >
              Search: {search}
            </Badge>
          )}

          {category !== "All Categories" && (
            <Badge
              variant="outline"
              className=" border-orange-200 text-orange-700 dark:border-orange-900 dark:text-orange-400
              "
            >
              Category selected
            </Badge>
          )}

          {cuisineType !== "All Cuisine Types" && (
            <Badge
              variant="outline"
              className="border-orange-200 text-orange-700 dark:border-orange-900 dark:text-orange-400"
            >
              Cuisine type selected
            </Badge>
          )}

          {dietryType !== "All Dietary Types" && (
            <Badge
              variant="outline"
              className="border-orange-200 text-orange-700 dark:border-orange-900 dark:text-orange-400"
            >
              Dietary type selected
            </Badge>
          )}
        </motion.div>
      )}
    </motion.section>
  );
}