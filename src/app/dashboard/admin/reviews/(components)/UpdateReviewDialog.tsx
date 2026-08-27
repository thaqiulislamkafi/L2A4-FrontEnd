"use client";

import * as React from "react";
import { Loader2, Save, Star } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { updateGlobalReview, UpdateGlobalReviewPayload } from "@/lib/api/global-reviews";
import { GlobalReview } from "@/types/global-review.type";

interface UpdateReviewDialogProps {
  review: GlobalReview | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UpdateReviewDialog({ review, open, onOpenChange }: UpdateReviewDialogProps) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = React.useState<UpdateGlobalReviewPayload>(() => ({
    rating: review?.rating ?? 0,
    comment: review?.comment ?? "",
  }));

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateGlobalReviewPayload) => {
      if (!review) {
        throw new Error("Review not found");
      }

      return updateGlobalReview(review.id, payload);
    },
    onSuccess: async () => {
      onOpenChange(false);

      toast.add({
        title: "Review Updated Successfully!",
        description: "The review information has been updated successfully.",
        type: "success",
      });

      await queryClient.invalidateQueries({
        queryKey: ["admin-global-reviews"],
      });
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;

      toast.add({
        title: "Review Update Failed",
        description: message || "Unable to update the review right now.",
        type: "error",
      });
    },
  });

  const handleClose = (value: boolean) => {
    if (updateMutation.isPending) { 
      return;
    }

    onOpenChange(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!review) {
      return;
    }

    if (formData.rating < 1 || formData.rating > 5) {
      toast.add({
        title: "Rating required",
        description: "Please select a rating between 1 and 5 stars.",
        type: "warning",
      });

      return;
    }

    if (!formData.comment.trim()) {
      toast.add({
        title: "Comment required",
        description: "Please enter a review comment before saving.",
        type: "warning",
      });

      return;
    }

    updateMutation.mutate({
      rating: formData.rating,
      comment: formData.comment.trim(),
    });
  };

  if (!review) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] w-[min(92vw,560px)] overflow-y-auto rounded-2xl border-orange-200/80 bg-white p-0 shadow-2xl shadow-orange-950/10 dark:border-orange-900/50 dark:bg-orange-950/95">
        <DialogHeader className="border-b border-orange-100 px-6 py-5 dark:border-orange-900/40">
          <DialogTitle className="text-xl font-bold text-orange-950 dark:text-orange-50">Update Review</DialogTitle>
          <DialogDescription className="text-sm text-orange-700/60 dark:text-orange-300/60">
            Update the review left by {review.user?.name ?? "this user"}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 py-5">
            <div className="space-y-3">
              <Label className="font-semibold text-orange-900 dark:text-orange-100">Rating</Label>

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = star <= formData.rating;

                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData((previous) => ({ ...previous, rating: star }))}
                      className="rounded-full p-1 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40"
                      aria-label={`Set rating to ${star}`}
                    >
                      <Star className={`size-6 ${active ? "fill-orange-500 text-orange-500" : "text-orange-200 dark:text-orange-800"}`} />
                    </button>
                  );
                })}

                <span className="ml-2 text-sm font-semibold text-orange-700 dark:text-orange-300">{formData.rating}/5</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-comment" className="font-semibold text-orange-900 dark:text-orange-100">Comment</Label>
              <Textarea
                id="review-comment"
                value={formData.comment}
                onChange={(event) => setFormData((previous) => ({ ...previous, comment: event.target.value }))}
                rows={5}
                placeholder="Write the updated review comment"
                className="min-h-28 resize-none border-orange-200 bg-orange-50/30 text-orange-900 placeholder:text-orange-500/40 focus-visible:ring-orange-400 dark:border-orange-900/40 dark:bg-orange-950/20 dark:text-orange-50"
              />
            </div>
          </div>

          <DialogFooter className="border-t border-orange-100 px-6 py-4 dark:border-orange-900/40">
            <Button type="button" variant="outline" onClick={() => handleClose(false)} disabled={updateMutation.isPending} className="rounded-lg border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40">
              Cancel
            </Button>

            <Button type="submit" disabled={updateMutation.isPending} className="rounded-lg bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500 dark:bg-orange-600 dark:hover:bg-orange-700">
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
