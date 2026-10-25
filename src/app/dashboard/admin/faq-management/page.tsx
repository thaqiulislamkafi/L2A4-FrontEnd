"use client";

import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TablePagination } from "@/components/TablePagination";
import { Separator } from "@/components/ui/separator";
import { useGetAllFaqs } from "@/hooks/faqs/useGetAllFaqs";

import AddFaqDialog from "./(component)/AddFaqDialog";
import FaqManagementError from "./error";
import FaqManagementLoading from "./loading";
import FAQsTable from "./(component)/FAQsTable";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 5;

export default function FaqManagementPage() {
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const { data, isLoading, isError, isFetching, refetch } = useGetAllFaqs(
    page,
    DEFAULT_LIMIT
  );

  if (isLoading) return <FaqManagementLoading />;
  if (isError) return <FaqManagementError onRetry={() => void refetch()} />;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">FAQ Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View frequently asked questions, their categories, and publication
            status.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => setAddDialogOpen(true)}
          className="shrink-0 bg-orange-500 font-semibold text-white hover:bg-orange-600"
        >
          <Plus className="size-4" />
          Add FAQ
        </Button>
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

      <AddFaqDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onCreated={() => setPage(DEFAULT_PAGE)}
      />
    </div>
  );
}