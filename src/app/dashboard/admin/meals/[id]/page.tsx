"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  deleteMeal,
  getMealById,
  markMealAsHeroContent,
  setMealPublished,
} from "@/lib/api/meal";
import { toast } from "@/components/ui/toast";
import MealDeleteDialog from "../(components)/MealDeleteDialog";
import UpdateMealDialog from "../(components)/UpdateMealDialog";
import MealDetailsView from "./(components)/MealDetailsView";
import MealDetailsError from "./error";
import MealDetailsLoading from "./loading";

export default function AdminMealDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const mealQuery = useQuery({
    queryKey: ["admin-meal", id],
    queryFn: async () => {
      const response = await getMealById(id);

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to load meal details");
      }

      return response.data;
    },
    enabled: Boolean(id),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMeal,
    onSuccess: async () => {
      toast.add({
        title: "Meal Deleted Successfully!",
        description: "Meal is permanently deleted.",
        type: "success",
      });

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-meals"] }),
        queryClient.removeQueries({ queryKey: ["admin-meal", id] }),
      ]);
      router.push("/dashboard/admin/meals");
    },
    onError: () => {
      toast.add({
        title: "Delete Failed",
        description: "Unable to delete meal. Please try again.",
        type: "error",
      });
    },
  });

  const markHeroMutation = useMutation({
    mutationFn: async () => {
      const response = await markMealAsHeroContent(id);

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to mark meal as hero content");
      }

      return response;
    },
    onSuccess: async (response) => {
      queryClient.setQueryData(
        ["admin-meal", id],
        (current: typeof mealQuery.data) =>
          current ? { ...current, ...response.data } : current
      );

      toast.add({
        title: "Meal Marked as Hero",
        description: response.message,
        type: "success",
      });

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-meals"] }),
        queryClient.invalidateQueries({ queryKey: ["provider-meals"] }),
        queryClient.invalidateQueries({ queryKey: ["meal", id] }),
      ]);
    },
    onError: (error) => {
      toast.add({
        title: "Unable to Mark Meal as Hero",
        description:
          error instanceof Error
            ? error.message
            : "Please try again.",
        type: "error",
      });
    },
  });

  const publishMutation = useMutation({
    mutationFn: async (isPublished: boolean) => {
      const response = await setMealPublished(id, isPublished);

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to update meal publish status");
      }

      return response;
    },
    onSuccess: async (response) => {
      queryClient.setQueryData(
        ["admin-meal", id],
        (current: typeof mealQuery.data) =>
          current ? { ...current, ...response.data } : current
      );

      toast.add({
        title: response.data.isPublished ? "Meal Published" : "Meal Unpublished",
        description: response.message,
        type: "success",
      });

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-meals"] }),
        queryClient.invalidateQueries({ queryKey: ["provider-meals"] }),
        queryClient.invalidateQueries({ queryKey: ["meal", id] }),
      ]);
    },
    onError: (error) => {
      toast.add({
        title: "Unable to Update Publish Status",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    },
  });

  if (mealQuery.isPending) {
    return <MealDetailsLoading />;
  }

  if (mealQuery.isError || !mealQuery.data) {
    return (
      <MealDetailsError
        error={mealQuery.error}
        reset={() => mealQuery.refetch()}
      />
    );
  }

  return (
    <>
      <MealDetailsView
        meal={mealQuery.data}
        onBack={() => router.push("/dashboard/admin/meals")}
        onUpdate={() => setUpdateDialogOpen(true)}
        onDelete={() => setDeleteDialogOpen(true)}
        onMarkHero={() => markHeroMutation.mutate()}
        onPublishChange={() =>
          publishMutation.mutate(!mealQuery.data.isPublished)
        }
        isMarkingHero={markHeroMutation.isPending}
        isPublishing={publishMutation.isPending}
        isDeleting={deleteMutation.isPending}
      />
      <UpdateMealDialog
        meal={mealQuery.data}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
      />
      <MealDeleteDialog
        meal={mealQuery.data}
        open={deleteDialogOpen}
        isDeleting={deleteMutation.isPending}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={(meal) => deleteMutation.mutate(meal.id)}
      />
    </>
  );
}