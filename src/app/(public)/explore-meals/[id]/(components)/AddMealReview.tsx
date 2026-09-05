"use client";

import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { Loader2, Save, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import {
  createMealReview,
  CreateMealReviewPayload,
} from "@/lib/api/meal-reviews";

interface AddMealReviewProps {
  mealId: string;
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddMealReview = ({
  mealId,
  userId,
  open,
  onOpenChange,
}: AddMealReviewProps) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (payload: CreateMealReviewPayload) =>
      createMealReview(payload),
    onSuccess: async () => {
      onOpenChange(false);
      form.reset({ rating: 0, comment: "" });

      toast.add({
        title: "Review Added Successfully!",
        description: "Thank you for sharing your experience.",
        type: "success",
      });

      await queryClient.invalidateQueries({ queryKey: ["meal", mealId] });
    },
    onError: (error: unknown) => {
      const message = (
        error as { response?: { data?: { message?: string } } }
      )?.response?.data?.message;

      toast.add({
        title: "Review Submission Failed",
        description: message || "Unable to add your review right now.",
        type: "error",
      });
    },
  });

  const form = useForm({
    defaultValues: {
      rating: 0,
      comment: "",
    },
    onSubmit: async ({ value }) => {
      if (value.rating < 1 || value.rating > 5) {
        toast.add({
          title: "Rating required",
          description: "Please select a rating between 1 and 5 stars.",
          type: "warning",
        });
        return;
      }

      if (!value.comment.trim()) {
        toast.add({
          title: "Comment required",
          description: "Please enter a review comment before submitting.",
          type: "warning",
        });
        return;
      }

      createMutation.mutate({
        meal_id: mealId,
        user_id: userId,
        rating: value.rating,
        comment: value.comment.trim(),
      });
    },
  });

  const handleClose = (value: boolean) => {
    if (!createMutation.isPending) {
      onOpenChange(value);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] w-[min(92vw,560px)] overflow-y-auto rounded-2xl border-orange-200/80 bg-white p-0 shadow-2xl shadow-orange-950/10 dark:border-orange-900/50 dark:bg-orange-950/95">
        <DialogHeader className="border-b border-orange-100 px-6 py-5 dark:border-orange-900/40">
          <DialogTitle className="text-xl font-bold text-orange-950 dark:text-orange-50">
            Add Meal Review
          </DialogTitle>
          <DialogDescription className="text-sm text-orange-700/60 dark:text-orange-300/60">
            Share your experience with this meal.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="space-y-5 px-6 py-5">
            <form.Field name="rating">
              {(field) => (
                <div className="space-y-3">
                  <Label className="font-semibold text-orange-900 dark:text-orange-100">
                    Rating
                  </Label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => field.handleChange(star)}
                        className="rounded-full p-1 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40"
                        aria-label={`Set rating to ${star}`}
                      >
                        <Star
                          className={`size-6 ${
                            star <= field.state.value
                              ? "fill-orange-500 text-orange-500"
                              : "text-orange-200 dark:text-orange-800"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm font-semibold text-orange-700 dark:text-orange-300">
                      {field.state.value}/5
                    </span>
                  </div>
                </div>
              )}
            </form.Field>

            <form.Field name="comment">
              {(field) => (
                <div className="space-y-2">
                  <Label
                    htmlFor="add-meal-review-comment"
                    className="font-semibold text-orange-900 dark:text-orange-100"
                  >
                    Comment
                  </Label>
                  <Textarea
                    id="add-meal-review-comment"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    rows={5}
                    placeholder="Write your review comment"
                    className="min-h-28 resize-none border-orange-200 bg-orange-50/30 text-orange-900 placeholder:text-orange-500/40 focus-visible:ring-orange-400 dark:border-orange-900/40 dark:bg-orange-950/20 dark:text-orange-50"
                  />
                </div>
              )}
            </form.Field>
          </div>

          <DialogFooter className="border-t border-orange-100 px-6 py-4 dark:border-orange-900/40">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={createMutation.isPending}
              className="rounded-lg border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-lg bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500 dark:bg-orange-600 dark:hover:bg-orange-700"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Submit Review
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMealReview;
