"use client";

import * as React from "react";
import Image from "next/image";
import { Loader2, Save } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMeal, UpdateMealPayload } from "@/lib/api/meal";
import { Meal } from "@/types/meal.type";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/toast";

interface UpdateMealDialogProps {
  meal: Meal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UpdateMealDialog({ meal, open, onOpenChange }: UpdateMealDialogProps) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = React.useState<UpdateMealPayload>({
    name: "",
    image: "",
    description: "",
    pricePerPiece: undefined,
    totalPieces: undefined,
    availablePieces: undefined,
    availabilty_status: undefined,
  });

  React.useEffect(() => {
    if (!meal) return;

    setFormData({
      name: meal.name ?? "",
      image: meal.image ?? "",
      description: meal.description ?? "",
      pricePerPiece: meal.pricePerPiece,
      totalPieces: meal.totalPieces,
      availablePieces: meal.availablePieces,
      availabilty_status: meal.availabilty_status,
    });
  }, [meal]);

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateMealPayload) => {
      if (!meal) throw new Error("Meal not found");
      return updateMeal(meal.id, payload);
    },
    onSuccess: async () => {
      onOpenChange(false);

      toast.add({
        title: "Meal Updated Successfully!",
        description: "Meal information has been updated successfully.",
        type: "success",
      });

      await queryClient.invalidateQueries({ queryKey: ["admin-meals"] });
    },
    onError: () => {
      toast.add({
        title: "Update Failed",
        description: "Unable to update meal. Please try again.",
        type: "error",
      });
    },
  });

  const handleChange = (field: keyof UpdateMealPayload, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      name: formData.name?.trim(),
      image: formData.image?.trim(),
      description: formData.description?.trim(),
      pricePerPiece: formData.pricePerPiece,
      totalPieces: formData.totalPieces,
      availablePieces: formData.availablePieces,
      availabilty_status: formData.availabilty_status,
    });
  };

  const handleClose = (value: boolean) => {
    if (updateMutation.isPending) return;
    onOpenChange(value);
  };

  if (!meal) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] min-w-lg overflow-y-auto rounded-2xl border-orange-200/80 bg-white p-0 shadow-2xl shadow-orange-950/10 dark:border-orange-900/50 dark:bg-orange-950/95">
        <DialogHeader className="border-b border-orange-100 px-6 py-5 dark:border-orange-900/40">
          <DialogTitle className=" font-bold text-orange-950 dark:text-orange-50">Update Meal</DialogTitle>
          <DialogDescription className="text-sm text-orange-700/60 dark:text-orange-300/60">Update information for {meal?.name ?? "this meal"}.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 py-5">
            <Card className="border-orange-200/70 bg-orange-50/40 p-4 shadow-none dark:border-orange-900/40 dark:bg-orange-950/20">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  {formData.image ? (
                    <Image height={56} width={56} src={formData.image} alt={formData.name || "Meal"} className="size-14 shrink-0 rounded-xl object-cover ring-2 ring-orange-200 dark:ring-orange-900/60" />
                  ) : (
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 ring-2 ring-orange-200 dark:bg-orange-950/60 dark:text-orange-400 dark:ring-orange-900/60">
                      {formData.name?.slice(0, 1).toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-orange-950 dark:text-orange-50">{meal?.name ?? "Meal"}</p>
                    <p className="truncate text-xs font-medium text-orange-700/60 dark:text-orange-300/60">{meal?.id ?? ""}</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="meal-name" className="font-semibold text-orange-900 dark:text-orange-100">Name</Label>
                <Input id="meal-name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Meal name" />
              </div>

              <div>
                <Label htmlFor="meal-image" className="font-semibold text-orange-900 dark:text-orange-100">Image URL</Label>
                <Input id="meal-image" value={formData.image} onChange={(e) => handleChange("image", e.target.value)} placeholder="https://..." />
              </div>

              <div>
                <Label htmlFor="meal-price" className="font-semibold text-orange-900 dark:text-orange-100">Price (৳)</Label>
                <Input id="meal-price" type="number" value={formData.pricePerPiece ?? ""} onChange={(e) => handleChange("pricePerPiece", Number(e.target.value) || undefined)} placeholder="Price per piece" />
              </div>

              <div>
                <Label htmlFor="meal-available" className="font-semibold text-orange-900 dark:text-orange-100">Available Pieces</Label>
                <Input id="meal-available" type="number" value={formData.availablePieces ?? ""} onChange={(e) => handleChange("availablePieces", Number(e.target.value) || undefined)} placeholder="Available pieces" />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="meal-desc" className="font-semibold text-orange-900 dark:text-orange-100">Description</Label>
                <Input id="meal-desc" value={formData.description} onChange={(e) => handleChange("description", e.target.value)} placeholder="Short description" />
              </div>

              <div>
                <Label className="font-semibold text-orange-900 dark:text-orange-100">Availability Status</Label>
                <Select value={formData.availabilty_status} onValueChange={(val) => handleChange("availabilty_status", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AVAILABLE">AVAILABLE</SelectItem>
                    <SelectItem value="UNAVAILABLE">UNAVAILABLE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={updateMutation.isPending}>Cancel</Button>
              <Button type="submit" className="rounded-lg bg-orange-500 text-white" disabled={updateMutation.isPending}>
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
            </div>
          </div>

          <DialogFooter />
        </form>
      </DialogContent>
    </Dialog>
  );
}
