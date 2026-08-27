"use client";

import * as React from "react";

import { useQuery } from "@tanstack/react-query";

import { GlobalReview } from "@/types/global-review.type";
import ReviewsLoading from "./loading";
import ReviewsError from "./error";
import ReviewsTable from "./(components)/ReviewsTable";
import ReviewsTableToolbar from "./(components)/ReviewsTableToolbar";
import { TablePagination } from "@/components/TablePagination";
import { getGlobalReviews } from "@/lib/api/global-reviews";


const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 6;

export default function AdminReviewsPage() {
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [limit] = React.useState(DEFAULT_LIMIT);
  const [search, setSearch] = React.useState("");

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["admin-global-reviews", page, limit, search],
    queryFn: () => getGlobalReviews({ page, limit, search }),
    placeholderData: (previousData) => previousData,
  });

  const reviews: GlobalReview[] = data?.data ?? [];
  const meta = data?.meta;

  const totalPages = meta?.totalPage ?? 1;
  const totalReviews = meta?.total ?? 0;

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

  if (isLoading) {
    return <ReviewsLoading />;
  }

  if (isError) {
    return <ReviewsError onRetry={() => refetch()} />;
  }

  return (
    <div className="max-w-[936px] space-y-6 p-4 md:p-6">
      <ReviewsTableToolbar search={search} onReset={handleReset} onSearchChange={handleSearch} />

      <ReviewsTable reviews={reviews} isFetching={isFetching} />

      <TablePagination page={page} totalPages={totalPages} totalItems={totalReviews} itemsName="Reviews" onPageChange={handlePageChange} />
    </div>
  );
}