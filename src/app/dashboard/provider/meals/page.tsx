"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import MealsLoading from "../../admin/meals/loading";
import MealsError from "../../admin/meals/error";
import MealsTable from "../../admin/meals/(components)/MealsTable";
import { TablePagination } from "@/components/TablePagination";
import MealsTableToolbar from "../../admin/meals/(components)/MealsTableToolbar";
import { getProviderMeals, deleteMeal } from "@/lib/api/meal";
import { Meal } from "@/types/meal.type";
import MealDeleteDialog from "../../admin/meals/(components)/MealDeleteDialog";
import UpdateMealDialog from "../../admin/meals/(components)/UpdateMealDialog";
import { toast } from "@/components/ui/toast";
import { useAuthStore } from "@/store/auth.store";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export default function ProviderMealsPage() {
  const providerId = useAuthStore((state) => state.user?.id);
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [limit] = React.useState(DEFAULT_LIMIT);
  const [search, setSearch] = React.useState("");

  const [selectedMeal, setSelectedMeal] = React.useState<Meal | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["provider-meals", providerId, page, limit, search],
    queryFn: () => {
      if (!providerId) {
        throw new Error("Provider account not found. Please sign in again.");
      }

      return getProviderMeals(providerId, { page, limit, search });
    },
    enabled: !!providerId,
    placeholderData: (previous) => previous,
  });

  const meals: Meal[] = data?.data ?? [];
  const meta = data?.meta;

  const totalPages = meta?.totalPage ?? 1;
  const totalMeals = meta?.total ?? 0;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(DEFAULT_PAGE);
  };

  const handleReset = () => {
    setSearch("");
    setPage(DEFAULT_PAGE);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleEdit = (meal: Meal) => {
    setSelectedMeal(meal);
    setUpdateDialogOpen(true);
  };

  const handleUpdateDialogChange = (open: boolean) => {
    setUpdateDialogOpen(open);

    if (!open) setSelectedMeal(null);
  };

  const handleDeleteRequest = (meal: Meal) => {
    setSelectedMeal(meal);
    setDeleteDialogOpen(true);
  };

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteMeal(id),
    onSuccess: async () => {
      toast.add({
        title: "Meal Deleted Successfully!",
        description: "Meal is permanently deleted.",
        type: "success",
      });

      setDeleteDialogOpen(false);
      setSelectedMeal(null);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["provider-meals"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-meals"] }),
      ]);
    },
    onError: () => {
      toast.add({
        title: "Delete Failed",
        description: "Unable to delete meal. Please try again.",
        type: "error",
      });
    },
  });

  const handleDeleteConfirm = (meal: Meal) => {
    deleteMutation.mutate(meal.id);
  };

  if (!providerId) {
    return <MealsError onRetry={() => refetch()} />;
  }

  if (isLoading) return <MealsLoading />;
  if (isError) return <MealsError onRetry={() => refetch()} />;

  return (
    <div className="min-w-0 max-w-234 space-y-6 overflow-x-hidden p-4 md:p-6">
      <MealsTableToolbar
        search={search}
        onReset={handleReset}
        onSearchChange={handleSearch}
      />

      <MealsTable
        meals={meals}
        isFetching={isFetching}
        onEdit={handleEdit}
        onDelete={handleDeleteRequest}
        viewPath="/dashboard/provider/meals"
      />

      <TablePagination
        page={page}
        totalPages={totalPages}
        totalItems={totalMeals}
        itemsName="Meals"
        onPageChange={handlePageChange}
      />

      <MealDeleteDialog
        meal={selectedMeal}
        open={deleteDialogOpen}
        isDeleting={deleteMutation.isPending}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />

      <UpdateMealDialog
        meal={selectedMeal}
        open={updateDialogOpen}
        onOpenChange={handleUpdateDialogChange}
      />
    </div>
  );
}
