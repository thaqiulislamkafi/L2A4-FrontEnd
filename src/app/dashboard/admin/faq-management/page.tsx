"use client";

import * as React from "react";

import { TablePagination } from "@/components/TablePagination";
import { Separator } from "@/components/ui/separator";
import { useGetAllFaqs } from "@/hooks/faqs/useGetAllFaqs";

import FaqManagementError from "./error";
import FaqManagementLoading from "./loading";
import FAQsTable from "./(component)/FAQsTable";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 5;

export default function FaqManagementPage() {
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const { data, isLoading, isError, isFetching, refetch } = useGetAllFaqs(
    page,
    DEFAULT_LIMIT
  );

  if (isLoading) return <FaqManagementLoading />;
  if (isError) return <FaqManagementError onRetry={() => void refetch()} />;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">FAQ Management</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View frequently asked questions, their categories, and publication
          status.
        </p>
      </div>

      <Separator />

      <FAQsTable faqs={data?.data ?? []} isFetching={isFetching} />

      <TablePagination
        page={page}
        totalPages={data?.meta.totalPage ?? 1}
        totalItems={data?.meta.total ?? 0}
        itemsName="FAQs"
        onPageChange={setPage}
      />
    </div>
  );
}