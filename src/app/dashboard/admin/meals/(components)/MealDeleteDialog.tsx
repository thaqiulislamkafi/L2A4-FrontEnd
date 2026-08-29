"use client";

import * as React from "react";
import { Loader2, Trash2 } from "lucide-react";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Meal } from "@/types/meal.type";

interface MealDeleteDialogProps {
  meal: Meal | null;
  open: boolean;
  isDeleting: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (meal: Meal) => void;
}

export default function MealDeleteDialog({ meal, open, isDeleting, onOpenChange, onConfirm }: MealDeleteDialogProps) {
  if (!meal) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md rounded-2xl border-orange-200 bg-white dark:border-orange-900/50 dark:bg-orange-950">
        <AlertDialogHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-red-200 dark:bg-red-950/30 dark:text-red-400 dark:ring-red-900/50">
            <Trash2 className="size-5" />
          </div>

          <AlertDialogTitle className="text-lg font-bold text-orange-950 dark:text-orange-50">Delete Meal?</AlertDialogTitle>

          <AlertDialogDescription className="text-sm leading-6 text-orange-700/70 dark:text-orange-300/70">
            Are you sure you want to delete <span className="font-semibold text-orange-800 dark:text-orange-200">{meal.name ?? "this meal"}</span>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting} className="rounded-lg border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40">Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={() => onConfirm(meal)} disabled={isDeleting} className="rounded-lg bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700">
            {isDeleting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="size-4" />
                Delete Meal
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
