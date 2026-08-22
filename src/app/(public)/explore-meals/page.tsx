"use client";

import * as React from "react";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ChefHat,
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { getPublishedMeals } from "@/lib/api/meal";
import { Meal } from "@/types/meal.type";
import MealCard from "@/components/MealCard";
import ExploreMealsLoader from "./loading";
import ExploreMealsError from "./error";
import MealFilters from "./MealFilters";
import { PrimaryMealSpinner, Spinner } from "@/components/ui/spinner";

const ExploreMeals = () => {

  const [currentPage, setCurrentPage] = React.useState(1);
   const [page, setPage] = React.useState(1);

  const [search, setSearch] = React.useState("");

  const [category, setCategory] = React.useState("ALL");

  const limit = 9;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["explore-meals", currentPage,search],
    queryFn: () =>
      getPublishedMeals({
        page: currentPage,
        limit,
        search
      }),
  });

  const meals: Meal[] = data?.data ?? [];
  const totalPages = data?.meta?.totalPage ?? 1;

  const meta = data?.meta;

  // if (isLoading) return <ExploreMealsLoader />

  if (isError) return <ExploreMealsError />

  /*
   * --------------------------------
   * Empty State
   * --------------------------------
   */

  if (meals.length === 0 && (!isLoading)) {
    return (
      <section className="relative overflow-hidden bg-orange-50/40 py-24 dark:bg-orange-950/10">
        <div className=" relative mx-auto px-4">
          <Card className="mx-auto max-w-xl rounded-3xl border-primary/10 bg-background/80 p-10 text-center shadow-sm backdrop-blur-sm">
            <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-primary/10">
              <ChefHat className="size-9 text-primary" />
            </div>

            <h2 className="mt-6 text-3xl font-bold">
              No Meals Found
            </h2>

            <p className="mt-3 text-muted-foreground">
              There are no published meals available right now. Please check
              back soon.
            </p>
          </Card>
        </div>
      </section>
    );
  }

  const getPaginationItems = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      for (let page = 1; page <= totalPages; page++) {
        pages.push(page);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);

    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden  bg-orange-50/40 py-24 dark:bg-orange-950/10">
      {/* --------------------------------
          Background Effects
      -------------------------------- */}

      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-orange-100/70 via-background to-orange-50/50 dark:from-orange-950/20 dark:via-background dark:to-orange-950/10" />

      <div className="pointer-events-none absolute -left-32 top-40 size-80 rounded-full bg-orange-200/30 blur-3xl dark:bg-orange-900/10" />

      <div className="pointer-events-none absolute -right-32 bottom-20 size-80 rounded-full bg-orange-200/30 blur-3xl dark:bg-orange-900/10" />

      <div className=" relative mx-auto px-4">
        {/* --------------------------------
            Header
        -------------------------------- */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          {/* Badge */}

          <div className="mb-6 flex justify-center">
            <Badge
              variant="outline"
              className="gap-2 rounded-full border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur-sm"
            >
              <UtensilsCrossed className="size-4" />

              Explore Meals
            </Badge>
          </div>

          {/* Heading */}

          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Discover Delicious Meals
          </h1>

          {/* Description */}

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Explore delicious meals from trusted FoodHub providers. Discover
            traditional Bangladeshi dishes, seafood, burgers, curries, and
            many more flavors made for you.
          </p>
        </motion.div>

        <MealFilters
          search={search}
          category={category}
          totalMeals={meta?.total ?? 0}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onReset={() => {
            setSearch("");
            setCategory("ALL");
          }}
        />

        {/* --------------------------------
            Meal Grid
        -------------------------------- */}
        {isLoading && <PrimaryMealSpinner/>}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        >
          {meals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
            >
              <MealCard meal={meal} />
            </motion.div>
          ))}
        </motion.div>

        {/* --------------------------------
            Pagination
        -------------------------------- */}

        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="mt-16 flex flex-col items-center gap-4"
          >
            {/* Pagination */}

            <Pagination>
              <PaginationContent>
                {/* Previous */}

                <PaginationItem>
                  <PaginationLink
                    href="#"
                    size="default"
                    onClick={(event) => {
                      event.preventDefault();

                      if (currentPage > 1) {
                        handlePageChange(currentPage - 1);
                      }
                    }}
                    className={`gap-1 rounded-xl border ${currentPage === 1
                        ? "pointer-events-none opacity-40"
                        : "border-primary/20 text-primary hover:bg-primary/10 hover:text-primary"
                      }`}
                  >
                    <ChevronLeft className="size-4" />

                    <span className="hidden sm:block">
                      Previous
                    </span>
                  </PaginationLink>
                </PaginationItem>

                {/* Page Numbers */}

                {getPaginationItems().map((page, index) => (
                  <PaginationItem key={`${page}-${index}`}>
                    {page === "ellipsis" ? (
                      <PaginationEllipsis className="text-primary" />
                    ) : (
                      <PaginationLink
                        href="#"
                        isActive={currentPage === page}
                        onClick={(event) => {
                          event.preventDefault();

                          handlePageChange(page);
                        }}
                        className={
                          currentPage === page
                            ? "rounded-xl border-primary bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground"
                            : "rounded-xl text-primary hover:bg-primary/10 hover:text-primary"
                        }
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                {/* Next */}

                <PaginationItem>
                  <PaginationLink
                    href="#"
                    size="default"
                    onClick={(event) => {
                      event.preventDefault();

                      if (currentPage < totalPages) {
                        handlePageChange(currentPage + 1);
                      }
                    }}
                    className={`gap-1 rounded-xl border ${currentPage === totalPages
                        ? "pointer-events-none opacity-40"
                        : "border-primary/20 text-primary hover:bg-primary/10 hover:text-primary"
                      }`}
                  >
                    <span className="hidden sm:block">
                      Next
                    </span>

                    <ChevronRight className="size-4" />
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            {/* Page Information */}

            <Badge
              variant="outline"
              className="border-primary/20 bg-primary/5 px-4 py-1.5 text-primary"
            >
              Page {currentPage} of {totalPages}
            </Badge>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ExploreMeals;