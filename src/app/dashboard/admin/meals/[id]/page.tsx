"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getMealById } from "@/lib/api/meal";
import MealDetailsView from "./(components)/MealDetailsView";
import MealDetailsError from "./error";
import MealDetailsLoading from "./loading";

export default function AdminMealDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

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
    <MealDetailsView
      meal={mealQuery.data}
      onBack={() => router.push("/dashboard/admin/meals")}
    />
  );
}