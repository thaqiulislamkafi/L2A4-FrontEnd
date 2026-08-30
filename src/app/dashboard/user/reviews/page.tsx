"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PencilLine, Star, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { TablePagination } from "@/components/TablePagination";
import { toast } from "@/components/ui/toast";
import { deleteUserReview, getUserReviews } from "@/lib/api/user-reviews";
import { useAuthStore } from "@/store/auth.store";
import { UserReview } from "@/types/user-review.type";

import UpdateUserReviewDialog from "./(components)/UpdateUserReviewDialog";
import UserReviewDeleteDialog from "./(components)/UserReviewDeleteDialog";
import ReviewsError from "./error";
import ReviewsLoading from "./loading";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 9;

function formatDate(date?: string | Date) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={`size-4 ${index < rating ? "fill-orange-500 text-orange-500" : "text-orange-200 dark:text-orange-900"}`}
    />
  ));
}

function formatMealId(mealId: string) {
  return mealId.length <= 12 ? mealId : `${mealId.slice(0, 8)}...${mealId.slice(-4)}`;
}

function UserReviewCard({
  review,
  onEdit,
  onDelete,
}: {
  review: UserReview;
  onEdit?: (review: UserReview) => void;
  onDelete?: (review: UserReview) => void;
}) {
  return (
    <Card className="group h-full overflow-hidden border-orange-200/80 bg-white shadow-sm shadow-orange-950/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-950/10 dark:border-orange-900/40 dark:bg-orange-950/20">
      <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-orange-100/80 px-5 py-4 dark:border-orange-900/30">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500 dark:text-orange-400">
            Meal Review
          </p>
          <p className="mt-1 truncate text-sm font-bold text-orange-950 dark:text-orange-50">
            {formatMealId(review.meal_id)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onEdit?.(review)}
            className="h-8 border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 hover:text-orange-800 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-300"
          >
            <PencilLine className="mr-1.5 size-3.5" />
            Edit
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onDelete?.(review)}
            className="h-8 border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 dark:border-red-900/60 dark:bg-red-950/20 dark:text-red-400"
          >
            <Trash2 className="mr-1.5 size-3.5" />
            Delete
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
            {renderStars(review.rating)}
          </div>

          <Badge
            variant="outline"
            className="rounded-full border-orange-200 bg-orange-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-700 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-300"
          >
            {review.rating}/5
          </Badge>
        </div>

        <blockquote className="text-sm font-medium leading-6 text-orange-900/80 dark:text-orange-100/80">
          “{review.comment}”
        </blockquote>
      </CardContent>

      <CardFooter className="border-t border-orange-100/80 px-5 py-3 dark:border-orange-900/30">
        <p className="text-xs font-medium text-orange-600/60 dark:text-orange-300/60">
          Reviewed on {formatDate(review.createdAt)}
        </p>
      </CardFooter>
    </Card>
  );
}

export default function UserReviewsPage() {
  const userId = useAuthStore((state) => state.user?.id);
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [selectedReview, setSelectedReview] = React.useState<UserReview | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["user-reviews", userId, page, DEFAULT_LIMIT],
    queryFn: () => {
      if (!userId) {
        throw new Error("User account not found. Please sign in again.");
      }

      return getUserReviews(userId, { page, limit: DEFAULT_LIMIT });
    },
    enabled: !!userId,
    placeholderData: (previousData) => previousData,
  });

  const deleteMutation = useMutation({
    mutationFn: (reviewId: string) => deleteUserReview(reviewId),
    onSuccess: async () => {
      toast.add({
        title: "Review Deleted Successfully!",
        description: "Your review has been permanently deleted.",
        type: "success",
      });

      setDeleteDialogOpen(false);
      setSelectedReview(null);

      await queryClient.invalidateQueries({ queryKey: ["user-reviews"] });
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

  const reviews = data?.data ?? [];
  const meta = data?.meta;

  const handleEdit = (review: UserReview) => {
    setSelectedReview(review);
    setIsUpdateDialogOpen(true);
  };

  const handleDeleteRequest = (review: UserReview) => {
    setSelectedReview(review);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = (review: UserReview) => {
    deleteMutation.mutate(review.id);
  };

  if (!userId) {
    return <ReviewsError onRetry={() => window.location.reload()} message="User account not found. Please sign in again." />;
  }

  if (isLoading) {
    return <ReviewsLoading />;
  }

  if (isError) {
    return <ReviewsError onRetry={() => refetch()} />;
  }

  return (
    <div className="relative space-y-6 p-4 md:p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-orange-950 dark:text-orange-50">My Reviews</h1>
        <p className="text-sm font-medium text-orange-700/60 dark:text-orange-300/60">
          Track and manage the reviews you have shared for your ordered meals.
        </p>
      </div>

      <div className="relative">
        {isFetching && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-orange-50/45 backdrop-blur-[1px] dark:bg-orange-950/20">
            <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-white/95 px-3 py-2 text-sm font-medium text-orange-600 shadow-sm dark:border-orange-900/50 dark:bg-orange-950/95 dark:text-orange-400">
              <span className="size-4 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
              Loading...
            </div>
          </div>
        )}

        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <UserReviewCard key={review.id} review={review} onEdit={handleEdit} onDelete={handleDeleteRequest} />
            ))
          ) : (
            <div className="col-span-full rounded-xl border border-dashed border-orange-200 bg-orange-50/60 p-10 text-center text-sm font-medium text-orange-700/70 dark:border-orange-900/50 dark:bg-orange-950/20 dark:text-orange-300/70">
              No reviews found.
            </div>
          )}
        </div>
      </div>

      <TablePagination
        page={meta?.page ?? 1}
        totalPages={meta?.totalPage ?? 1}
        totalItems={meta?.total ?? 0}
        itemsName="Reviews"
        onPageChange={(newPage) => setPage(newPage)}
      />

      <UserReviewDeleteDialog
        review={selectedReview}
        open={deleteDialogOpen}
        isDeleting={deleteMutation.isPending}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);
          if (!open) setSelectedReview(null);
        }}
        onConfirm={handleDeleteConfirm}
      />

      <UpdateUserReviewDialog
        key={selectedReview?.id ?? "user-review-dialog-empty"}
        review={selectedReview}
        open={isUpdateDialogOpen}
        onOpenChange={(open) => {
          setIsUpdateDialogOpen(open);
          if (!open) setSelectedReview(null);
        }}
      />
    </div>
  );
}
