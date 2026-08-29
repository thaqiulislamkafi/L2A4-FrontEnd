"use client";

import { Loader2, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { MealReview } from "@/types/meal-review.type";

export default function MealReviewDeleteDialog({ review, open, isDeleting, onOpenChange, onConfirm }: { review: MealReview | null; open: boolean; isDeleting: boolean; onOpenChange: (open: boolean) => void; onConfirm: (review: MealReview) => void }) {
  if (!review) return null;
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md rounded-2xl border-orange-200 bg-white dark:border-orange-900/50 dark:bg-orange-950">
        <AlertDialogHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-red-200 dark:bg-red-950/30 dark:text-red-400 dark:ring-red-900/50"><Trash2 className="size-5" /></div>
          <AlertDialogTitle className="text-lg font-bold text-orange-950 dark:text-orange-50">Delete Meal Review?</AlertDialogTitle>
          <AlertDialogDescription className="text-sm leading-6 text-orange-700/70 dark:text-orange-300/70">Are you sure you want to delete the meal review by <span className="font-semibold text-orange-800 dark:text-orange-200">{review.user?.name ?? "this user"}</span>? This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting} className="rounded-lg border-orange-200 text-orange-700">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onConfirm(review)} disabled={isDeleting} className="rounded-lg bg-red-600 text-white hover:bg-red-700">{isDeleting ? <><Loader2 className="size-4 animate-spin" /> Deleting...</> : <><Trash2 className="size-4" /> Delete Review</>}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
