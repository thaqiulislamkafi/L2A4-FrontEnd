"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteMeal, getMealById } from "@/lib/api/meal";
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