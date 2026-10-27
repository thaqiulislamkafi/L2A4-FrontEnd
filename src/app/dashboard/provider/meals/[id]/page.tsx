"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/components/ui/toast";
import UpdateMealDialog from "@/app/dashboard/admin/meals/(components)/UpdateMealDialog";
import { getMealById, setMealPublished } from "@/lib/api/meal";
import { useAuthStore } from "@/store/auth.store";
import ProviderMealDetailsView from "./(components)/ProviderMealDetailsView";
import MealDetailsLoading from "./loading";
import MealDetailsError from "./error";

export default function ProviderMealDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const providerId = useAuthStore((state) => state.user?.id);
  const authLoading = useAuthStore((state) => state.isLoading);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const mealQuery = useQuery({
    queryKey: ["provider-meal", providerId, id],
    queryFn: async () => {
      if (!providerId) {
        throw new Error("Provider account not found. Please sign in again.");
      }

      const response = await getMealById(id);

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to load meal details");
      }

      if (response.data.provider_id !== providerId) {
        throw new Error("You do not have permission to view this meal.");
      }

      return response.data;
    },
    enabled: Boolean(providerId && id),
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
        ["provider-meal", providerId, id],
        (current: typeof mealQuery.data) =>
          current ? { ...current, ...response.data } : current
      );

      toast.add({
        title: response.data.isPublished ? "Meal Published" : "Meal Unpublished",
        description: response.message,
        type: "success",
      });

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["provider-meals"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-meals"] }),
        queryClient.invalidateQueries({ queryKey: ["meal", id] }),
      ]);
    },
    onError: (error) => {
      toast.add({
        title: "Unable to Update Publish Status",
        description: error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    },
  });

  if (authLoading || mealQuery.isPending) {
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
      <ProviderMealDetailsView
        meal={mealQuery.data}
        onBack={() => router.push("/dashboard/provider/meals")}
        onEdit={() => setUpdateDialogOpen(true)}
        onPublishChange={() =>
          publishMutation.mutate(!mealQuery.data.isPublished)
        }
        isPublishing={publishMutation.isPending}
      />
      <UpdateMealDialog
        meal={mealQuery.data}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
      />
    </>
  );
}