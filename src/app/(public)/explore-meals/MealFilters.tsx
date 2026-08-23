"use client";

import { motion } from "framer-motion";
import {
  Search, RotateCcw, FolderKanban, Loader2,
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

interface Category {
  id: string;
  category_name: string;
}

interface MealFiltersProps {
  search: string;
  category: string;
  totalMeals: number;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string | null) => void;
  onReset: () => void;
}

export default function MealFilters({
  search,
  category,
  totalMeals,
  onSearchChange,
  onCategoryChange,
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

  const isDefaultFilter = search === "" && category === "All Categories";

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
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between max-w-6xl mx-auto">

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

        <div className="relative w-full md:min-w-65 lg:w-65">
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
              className="h-14 w-full rounded-2xl border-orange-100 pl-14 pr-10 text-[15px] shadow-sm transition-all duration-300 hover:border-orange-200 focus:border-orange-500 focus:ring-orange-500/10 dark:border-orange-950/50 dark:bg-orange-950/5 dark:hover:border-orange-900
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

          {category !== "ALL" && (
            <Badge
              variant="outline"
              className=" border-orange-200 text-orange-700 dark:border-orange-900 dark:text-orange-400
              "
            >
              Category selected
            </Badge>
          )}
        </motion.div>
      )}
    </motion.section>
  );
}