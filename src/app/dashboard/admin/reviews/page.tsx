"use client";

import * as React from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { TablePagination } from "@/components/TablePagination";
import { toast } from "@/components/ui/toast";
import { deleteGlobalReview, getGlobalReviews } from "@/lib/api/global-reviews";
import { GlobalReview } from "@/types/global-review.type";
import ReviewsLoading from "./loading";
import ReviewsError from "./error";
import ReviewDeleteDialog from "./(components)/ReviewDeleteDialog";
import ReviewsTable from "./(components)/ReviewsTable";
import ReviewsTableToolbar from "./(components)/ReviewsTableToolbar";
import UpdateReviewDialog from "./(components)/UpdateReviewDialog";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 6;

export default function AdminReviewsPage() {
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [limit] = React.useState(DEFAULT_LIMIT);
  const [search, setSearch] = React.useState("");
  const [selectedReview, setSelectedReview] = React.useState<GlobalReview | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const queryClient = useQueryClient();

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

  const handleEdit = (review: GlobalReview) => {
    setSelectedReview(review);
    setIsUpdateDialogOpen(true);
  };

  const handleUpdateDialogChange = (open: boolean) => {
    setIsUpdateDialogOpen(open);

    if (!open) {
      setSelectedReview(null);
    }
  };

  const handleDeleteDialogChange = (open: boolean) => {
    setDeleteDialogOpen(open);

    if (!open) {
      setSelectedReview(null);
    }
  };

  const handleDeleteRequest = (review: GlobalReview) => {
    setSelectedReview(review);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = (review: GlobalReview) => {
    deleteMutation.mutate(review.id);
  };

  const deleteMutation = useMutation({
    mutationFn: (reviewId: string) => deleteGlobalReview(reviewId),
    onSuccess: async () => {
      toast.add({
        title: "Review Deleted Successfully!",
        description: "The review has been permanently deleted.",
        type: "success",
      });

      setDeleteDialogOpen(false);
      setSelectedReview(null);

      await queryClient.invalidateQueries({
        queryKey: ["admin-global-reviews"],
      });
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;

      toast.add({
        title: "Review Delete Failed",
        description: message || "Unable to delete the review right now.",
        type: "error",
      });
    },
  });

  if (isLoading) {
    return <ReviewsLoading />;
  }

  if (isError) {
    return <ReviewsError onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <ReviewsTableToolbar search={search} onReset={handleReset} onSearchChange={handleSearch} />

      <ReviewsTable reviews={reviews} isFetching={isFetching || deleteMutation.isPending} onEdit={handleEdit} onDelete={handleDeleteRequest} />

      <TablePagination page={page} totalPages={totalPages} totalItems={totalReviews} itemsName="Reviews" onPageChange={handlePageChange} />

      <ReviewDeleteDialog
        review={selectedReview}
        open={deleteDialogOpen}
        isDeleting={deleteMutation.isPending}
        onOpenChange={handleDeleteDialogChange}
        onConfirm={handleDeleteConfirm}
      />

      <UpdateReviewDialog
        key={selectedReview?.id ?? "review-dialog-empty"}
        review={selectedReview}
        open={isUpdateDialogOpen}
        onOpenChange={handleUpdateDialogChange}
      />
    </div>
  );
}