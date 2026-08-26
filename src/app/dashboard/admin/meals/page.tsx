"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import MealsLoading from "./loading";
import MealsError from "./error";
import MealsTable from "./(components)/MealsTable";
import { TablePagination } from "@/components/TablePagination";
import MealsTableToolbar from "./(components)/MealsTableToolbar";
import { getPublishedMeals } from "@/lib/api/meal";
import { Meal } from "@/types/meal.type";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export default function AdminMealsPage() {
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [limit] = React.useState(DEFAULT_LIMIT);
  const [search, setSearch] = React.useState("");

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["admin-meals", page, limit, search],
    queryFn: () => getPublishedMeals({ page, limit, search }),
    placeholderData: (previous) => previous,
  });

  const meals: Meal[] = data?.data ?? [];
  const meta = data?.meta;

  const totalPages = meta?.totalPage ?? 1;
  const totalMeals = meta?.total ?? 0;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(DEFAULT_PAGE);
  };

  const handleReset = () => {
    setSearch("");
    setPage(DEFAULT_PAGE);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <MealsLoading />;
  if (isError) return <MealsError onRetry={() => refetch()} />;

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-234">
      <MealsTableToolbar
        search={search}
        onReset={handleReset}
        onSearchChange={handleSearch}
      />

      <MealsTable meals={meals} isFetching={isFetching} />

      <TablePagination
        page={page}
        totalPages={totalPages}
        totalItems={totalMeals}
        itemsName="Meals"
        onPageChange={handlePageChange}
      />
    </div>
  );
}
