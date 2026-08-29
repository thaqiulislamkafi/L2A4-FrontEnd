"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";

import { TablePagination } from "@/components/TablePagination";
import { deleteMealReview, getMealReviews } from "@/lib/api/meal-reviews";
import { MealReview } from "@/types/meal-review.type";
import MealReviewsLoading from "./loading";
import MealReviewsError from "./error";
import MealReviewsTable from "./(components)/MealReviewsTable";
import MealReviewsToolbar from "./(components)/MealReviewsToolbar";
import MealReviewDeleteDialog from "./(components)/MealReviewDeleteDialog";
import UpdateMealReviewDialog from "./(components)/UpdateMealReviewDialog";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 3;

export default function AdminMealReviewsPage() {
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [search, setSearch] = React.useState("");
  const [selectedReview, setSelectedReview] = React.useState<MealReview | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["admin-meal-reviews", page, DEFAULT_LIMIT, search],
    queryFn: () => getMealReviews({ page, limit: DEFAULT_LIMIT, search }),
    placeholderData: (previousData) => previousData,
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteMealReview(id),
    onSuccess: async () => {
      toast.add({ title: "Meal Review Deleted Successfully!", description: "The meal review has been permanently deleted.", type: "success" });
      setDeleteDialogOpen(false);
      setSelectedReview(null);
      await queryClient.invalidateQueries({ queryKey: ["admin-meal-reviews"] });
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.add({ title: "Meal Review Delete Failed", description: message || "Unable to delete the meal review right now.", type: "error" });
    },
  });

  if (isLoading) return <MealReviewsLoading />;
  if (isError) return <MealReviewsError onRetry={() => refetch()} />;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <MealReviewsToolbar search={search} onSearchChange={(value) => { setSearch(value); setPage(DEFAULT_PAGE); }} onReset={() => { setSearch(""); setPage(DEFAULT_PAGE); }} />
      <MealReviewsTable
        reviews={data?.data ?? []}
        isFetching={isFetching || deleteMutation.isPending}
        onEdit={(review) => { setSelectedReview(review); setUpdateDialogOpen(true); }}
        onDelete={(review) => { setSelectedReview(review); setDeleteDialogOpen(true); }}
      />
      <TablePagination page={page} totalPages={data?.meta.totalPage ?? 1} totalItems={data?.meta.total ?? 0} itemsName="Meal Reviews" onPageChange={setPage} />
      <MealReviewDeleteDialog
        review={selectedReview}
        open={deleteDialogOpen}
        isDeleting={deleteMutation.isPending}
        onOpenChange={(open) => { setDeleteDialogOpen(open); if (!open) setSelectedReview(null); }}
        onConfirm={(review) => deleteMutation.mutate(review.id)}
      />
      <UpdateMealReviewDialog
        key={selectedReview?.id ?? "meal-review-dialog-empty"}
        review={selectedReview}
        open={updateDialogOpen}
        onOpenChange={(open) => { setUpdateDialogOpen(open); if (!open) setSelectedReview(null); }}
      />
    </div>
  );
}