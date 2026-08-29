"use client";

import * as React from "react";
import { Loader2, Save, Star } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { updateMealReview, UpdateMealReviewPayload } from "@/lib/api/meal-reviews";
import { MealReview } from "@/types/meal-review.type";

export default function UpdateMealReviewDialog({ review, open, onOpenChange }: { review: MealReview | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: UpdateMealReviewPayload) => {
      if (!review) throw new Error("Review not found");
      return updateMealReview(review.id, payload);
    },
    onSuccess: async () => {
      onOpenChange(false);
      toast.add({ title: "Meal Review Updated Successfully!", description: "The meal review has been updated successfully.", type: "success" });
      await queryClient.invalidateQueries({ queryKey: ["admin-meal-reviews"] });
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.add({ title: "Meal Review Update Failed", description: message || "Unable to update the meal review right now.", type: "error" });
    },
  });
  const form = useForm({
    defaultValues: { rating: review?.rating ?? 0, comment: review?.comment ?? "" },
    onSubmit: async ({ value }) => {
      if (!review) return;
      if (value.rating < 1 || value.rating > 5) {
        toast.add({ title: "Rating required", description: "Please select a rating between 1 and 5 stars.", type: "warning" });
        return;
      }
      if (!value.comment.trim()) {
        toast.add({ title: "Comment required", description: "Please enter a review comment before saving.", type: "warning" });
        return;
      }
      mutation.mutate({ rating: value.rating, comment: value.comment.trim() });
    },
  });
  React.useEffect(() => {
    if (review) form.reset({ rating: review.rating, comment: review.comment });
  }, [review, form]);
  if (!review) return null;
  return (
    <Dialog open={open} 
    onOpenChange={(value) => !mutation.isPending && onOpenChange(value)}>
      <DialogContent 
      className="max-h-[90vh]  overflow-y-auto rounded-2xl border-orange-200/80 bg-white p-0 dark:border-orange-900/50 dark:bg-orange-950/95">
        <DialogHeader className="border-b border-orange-100 px-6 py-5 dark:border-orange-900/40"><DialogTitle className="text-xl font-bold text-orange-950 dark:text-orange-50">Update Meal Review</DialogTitle><DialogDescription className="text-sm text-orange-700/60 dark:text-orange-300/60">Update the review left by {review.user?.name ?? "this user"}.</DialogDescription></DialogHeader>
        <form onSubmit={(event) => { event.preventDefault(); event.stopPropagation(); form.handleSubmit(); }}>
          <div className="space-y-5 px-6 py-5">
            <form.Field name="rating">{(field) => <div className="space-y-3"><Label className="font-semibold text-orange-900 dark:text-orange-100">Rating</Label><div className="flex items-center gap-2">{[1, 2, 3, 4, 5].map((star) => <button key={star} type="button" onClick={() => field.handleChange(star)} className="rounded-full p-1" aria-label={`Set rating to ${star}`}><Star className={`size-6 ${star <= field.state.value ? "fill-orange-500 text-orange-500" : "text-orange-200 dark:text-orange-800"}`} /></button>)}<span className="ml-2 text-sm font-semibold text-orange-700">{field.state.value}/5</span></div></div>}</form.Field>
            <form.Field name="comment">{(field) => <div className="space-y-2"><Label htmlFor="meal-review-comment" className="font-semibold text-orange-900 dark:text-orange-100">Comment</Label><Textarea id="meal-review-comment" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} rows={5} className="min-h-28 resize-none border-orange-200 bg-orange-50/30 dark:border-orange-900/40 dark:bg-orange-950/20 dark:text-orange-50" /></div>}</form.Field>
          </div>
          <DialogFooter className="border-t border-orange-100 px-6 py-4 dark:border-orange-900/40"><Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={mutation.isPending} className="rounded-lg border-orange-200 text-orange-700">Cancel</Button><Button type="submit" disabled={mutation.isPending} className="rounded-lg bg-orange-600 text-white hover:bg-orange-700">{mutation.isPending ? <><Loader2 className="size-4 animate-spin" /> Saving...</> : <><Save className="size-4" /> Save Changes</>}</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
