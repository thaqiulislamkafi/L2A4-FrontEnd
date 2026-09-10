"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ChefHat, ChevronLeft, ChevronRight, UtensilsCrossed } from "lucide-react";

import MealCard from "@/components/MealCard";
import { Badge, HeaderBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { PrimaryMealSpinner } from "@/components/ui/spinner";
import { getProviderMeals } from "@/lib/api/meal";
import { getUser } from "@/lib/api/user";
import { Meal } from "@/types/meal.type";
import MealFilters from "../../MealFilters";

const ProviderMealsPage = () => {
  const params = useParams();
  const providerId = params.id as string;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("All Categories");
  const [cuisineType, setCuisineType] = React.useState("All Cuisine Types");
  const [dietryType, setDietryType] = React.useState("All Dietary Types");
  const limit = 9;

  const mealsQuery = useQuery({
    queryKey: [
      "provider-meals",
      providerId,
      currentPage,
      search,
      category,
      cuisineType,
      dietryType,
    ],
    queryFn: () =>
      getProviderMeals(providerId, {
        page: currentPage,
        limit,
        search,
        category,
        cuisineType,
        dietryType,
      }),
    enabled: Boolean(providerId),
  });

  const providerQuery = useQuery({
    queryKey: ["provider", providerId],
    queryFn: () => getUser(providerId),
    enabled: Boolean(providerId),
  });

  if (mealsQuery.isError) {
    return <section className="py-24 text-center text-muted-foreground">Unable to load this provider&apos;s meals.</section>;
  }

  const meals: Meal[] = mealsQuery.data?.data ?? [];
  const totalPages = mealsQuery.data?.meta?.totalPage ?? 1;
  const providerName = providerQuery.data?.name ?? "FoodHub Provider";

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  return (
    <section className="relative overflow-hidden bg-orange-50/40 py-24 dark:bg-orange-950/10">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-orange-100/70 via-background to-orange-50/50 dark:from-orange-950/20 dark:via-background dark:to-orange-950/10" />
      <div className="relative mx-auto max-w-6xl px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-6 flex justify-center">
            <HeaderBadge><UtensilsCrossed className="size-4" /> Provider Meals</HeaderBadge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{providerName}&apos;s Meals</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Explore all the delicious meals prepared by {providerName}. Find your next favorite dish from this trusted FoodHub provider.
          </p>
        </motion.div>

        <MealFilters
          search={search}
          category={category}
          cuisineType={cuisineType}
          dietryType={dietryType}
          totalMeals={mealsQuery.data?.meta.total ?? 0}
          onSearchChange={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
          onCategoryChange={(value) => {
            setCategory(value ?? "All Categories");
            setCurrentPage(1);
          }}
          onCuisineTypeChange={(value) => {
            setCuisineType(value ?? "All Cuisine Types");
            setCurrentPage(1);
          }}
          onDietryTypeChange={(value) => {
            setDietryType(value ?? "All Dietary Types");
            setCurrentPage(1);
          }}
          onReset={() => {
            setSearch("");
            setCategory("All Categories");
            setCuisineType("All Cuisine Types");
            setDietryType("All Dietary Types");
            setCurrentPage(1);
          }}
        />

        {mealsQuery.isLoading && <PrimaryMealSpinner />}
        {!mealsQuery.isLoading && meals.length === 0 && (
          <Card className="mx-auto max-w-xl rounded-3xl p-10 text-center">
            <ChefHat className="mx-auto size-12 text-primary" />
            <h2 className="mt-5 text-2xl font-bold">No Meals Found</h2>
            <p className="mt-3 text-muted-foreground">This provider has no meals matching your search.</p>
          </Card>
        )}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {meals.map((meal, index) => (
            <motion.div key={meal.id} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <MealCard meal={meal} />
            </motion.div>
          ))}
        </div>

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

export default ProviderMealsPage;