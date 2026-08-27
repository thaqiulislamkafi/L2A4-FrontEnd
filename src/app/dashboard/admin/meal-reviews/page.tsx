"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import { TablePagination } from "@/components/TablePagination";
import { getMealReviews } from "@/lib/api/meal-reviews";
import MealReviewsLoading from "./loading";
import MealReviewsError from "./error";
import MealReviewsTable from "./(components)/MealReviewsTable";
import MealReviewsToolbar from "./(components)/MealReviewsToolbar";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 3;

export default function AdminMealReviewsPage() {
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [search, setSearch] = React.useState("");
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["admin-meal-reviews", page, DEFAULT_LIMIT, search],
    queryFn: () => getMealReviews({ page, limit: DEFAULT_LIMIT, search }),
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) return <MealReviewsLoading />;
  if (isError) return <MealReviewsError onRetry={() => refetch()} />;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <MealReviewsToolbar search={search} onSearchChange={(value) => { setSearch(value); setPage(DEFAULT_PAGE); }} onReset={() => { setSearch(""); setPage(DEFAULT_PAGE); }} />
      <MealReviewsTable reviews={data?.data ?? []} isFetching={isFetching} />
      <TablePagination page={page} totalPages={data?.meta.totalPage ?? 1} totalItems={data?.meta.total ?? 0} itemsName="Meal Reviews" onPageChange={setPage} />
    </div>
  );
}