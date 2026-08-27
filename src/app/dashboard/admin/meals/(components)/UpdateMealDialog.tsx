"use client";

import * as React from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Save, Upload } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

import { updateMeal, UpdateMealPayload } from "@/lib/api/meal";
import { Meal } from "@/types/meal.type";
import { uploadUserImage } from "@/lib/api/auth";

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

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [imageDialogOpen, setImageDialogOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

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

      await queryClient.invalidateQueries({
        queryKey: ["admin-meals"],
      });
    },
    onError: () => {
      toast.add({
        title: "Update Failed",
        description: "Unable to update meal. Please try again.",
        type: "error",
      });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: (file: File) => uploadUserImage(file),
    onSuccess: (response) => {
      const uploadedImage = response?.data?.imageUrl ?? response?.url ?? response?.imageUrl;

      if (!uploadedImage) {
        toast.add({
          title: "Image Upload Failed",
          description: "The server did not return an image URL.",
          type: "error",
        });

        return;
      }

      form.setFieldValue("image", uploadedImage);

      setSelectedFile(null);
      setImageDialogOpen(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.add({
        title: "Image Uploaded Successfully!",
        description: "The new image is ready to be saved.",
        type: "success",
      });
    },
    onError: () => {
      toast.add({
        title: "Image Upload Failed",
        description: "Unable to upload the image. Please try again.",
        type: "error",
      });
    },
  });

  const form = useForm({
    defaultValues: {
      name: meal?.name ?? "",
      image: meal?.image ?? "",
      description: meal?.description ?? "",
      pricePerPiece: meal?.pricePerPiece,
      totalPieces: meal?.totalPieces,
      availablePieces: meal?.availablePieces,
      availabilty_status: meal?.availabilty_status,
    },

    onSubmit: async ({ value }) => {
      updateMutation.mutate({
        name: value.name?.trim(),
        image: value.image?.trim(),
        description: value.description?.trim(),
        pricePerPiece: value.pricePerPiece,
        totalPieces: value.totalPieces,
        availablePieces: value.availablePieces,
        availabilty_status: value.availabilty_status,
      });
    },
  });

  React.useEffect(() => {
    if (!meal) return;

    form.reset({
      name: meal.name ?? "",
      image: meal.image ?? "",
      description: meal.description ?? "",
      pricePerPiece: meal.pricePerPiece,
      totalPieces: meal.totalPieces,
      availablePieces: meal.availablePieces,
      availabilty_status: meal.availabilty_status,
    });
  }, [meal, form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.add({
        title: "Invalid File",
        description: "Please select a valid image file.",
        type: "error",
      });

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.add({
        title: "File Too Large",
        description: "Image size must be less than 5MB.",
        type: "error",
      });

      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleImageUpload = () => {
    if (!selectedFile) {
      toast.add({
        title: "Select an Image",
        description: "Please select an image before uploading.",
        type: "error",
      });

      return;
    }

    uploadImageMutation.mutate(selectedFile);
  };

  const handleImageDialogClose = (value: boolean) => {
    if (uploadImageMutation.isPending) return;

    setImageDialogOpen(value);

    if (!value) {
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
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
          <DialogTitle className="font-bold text-orange-950 dark:text-orange-50">
            Update Meal
          </DialogTitle>

          <DialogDescription className="text-sm text-orange-700/60 dark:text-orange-300/60">
            Update information for {meal?.name ?? "this meal"}.
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
            <Card className="border-orange-200/70 bg-orange-50/40 p-4 shadow-none dark:border-orange-900/40 dark:bg-orange-950/20">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <form.Subscribe selector={(state) => state.values.image}>
                    {(image) =>
                      image ? (
                        <Image
                          height={56}
                          width={56}
                          src={image}
                          alt={form.getFieldValue("name") || "Meal"}
                          className="size-14 shrink-0 rounded-xl object-cover ring-2 ring-orange-200 dark:ring-orange-900/60"
                        />
                      ) : (
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 ring-2 ring-orange-200 dark:bg-orange-950/60 dark:text-orange-400 dark:ring-orange-900/60">
                          {form.getFieldValue("name")?.slice(0, 1).toUpperCase()}
                        </div>
                      )
                    }
                  </form.Subscribe>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-orange-950 dark:text-orange-50">
                      {meal?.name ?? "Meal"}
                    </p>

                    <p className="truncate text-xs font-medium text-orange-700/60 dark:text-orange-300/60">
                      {meal?.id ?? ""}
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setImageDialogOpen(true)}
                  disabled={updateMutation.isPending}
                  className="shrink-0 rounded-lg border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40"
                >
                  <ImagePlus className="size-4" />
                  <span className="hidden sm:inline">Update Image</span>
                </Button>
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <form.Field name="name">
                {(field) => (
                  <div>
                    <Label htmlFor="meal-name" className="font-semibold text-orange-900 dark:text-orange-100">
                      Name
                    </Label>

                    <Input
                      id="meal-name"
                      value={field.state.value}
                      onChange={(event) => field.handleChange(event.target.value)}
                      placeholder="Meal name"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="image">
                {(field) => (
                  <div>
                    <Label htmlFor="meal-image" className="font-semibold text-orange-900 dark:text-orange-100">
                      Image URL
                    </Label>

                    <Input
                      id="meal-image"
                      value={field.state.value}
                      onChange={(event) => field.handleChange(event.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="pricePerPiece">
                {(field) => (
                  <div>
                    <Label htmlFor="meal-price" className="font-semibold text-orange-900 dark:text-orange-100">
                      Price (৳)
                    </Label>

                    <Input
                      id="meal-price"
                      type="number"
                      value={field.state.value ?? ""}
                      onChange={(event) => field.handleChange(Number(event.target.value) || undefined)}
                      placeholder="Price per piece"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="availablePieces">
                {(field) => (
                  <div>
                    <Label htmlFor="meal-available" className="font-semibold text-orange-900 dark:text-orange-100">
                      Available Pieces
                    </Label>

                    <Input
                      id="meal-available"
                      type="number"
                      value={field.state.value ?? ""}
                      onChange={(event) => field.handleChange(Number(event.target.value) || undefined)}
                      placeholder="Available pieces"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="description">
                {(field) => (
                  <div className="sm:col-span-2">
                    <Label htmlFor="meal-desc" className="font-semibold text-orange-900 dark:text-orange-100">
                      Description
                    </Label>

                    <Input
                      id="meal-desc"
                      value={field.state.value}
                      onChange={(event) => field.handleChange(event.target.value)}
                      placeholder="Short description"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="availabilty_status">
                {(field) => (
                  <div>
                    <Label className="font-semibold text-orange-900 dark:text-orange-100">
                      Availability Status
                    </Label>

                    <Select
                      value={field.state.value ?? ""}
                      onValueChange={(value) => field.handleChange(value || undefined)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="AVAILABLE">AVAILABLE</SelectItem>
                        <SelectItem value="UNAVAILABLE">UNAVAILABLE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </form.Field>
            </div>

            {updateMutation.isError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                Failed to update meal. Please try again.
              </div>
            )}

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={updateMutation.isPending}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="rounded-lg bg-orange-500 text-white"
                disabled={updateMutation.isPending}
              >
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

      <Dialog open={imageDialogOpen} onOpenChange={handleImageDialogClose}>
        <DialogContent className="max-w-md rounded-2xl border-orange-200/80 bg-white shadow-2xl shadow-orange-950/10 dark:border-orange-900/50 dark:bg-orange-950/95">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-bold text-orange-950 dark:text-orange-50">
              <ImagePlus className="size-5 text-orange-500" />
              Update Meal Image
            </DialogTitle>

            <DialogDescription className="text-orange-700/60 dark:text-orange-300/60">
              Select a new image for {meal?.name ?? "this meal"}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="flex justify-center">
              {selectedFile ? (
                <div className="relative size-32 overflow-hidden rounded-2xl ring-2 ring-orange-200 dark:ring-orange-900/60">
                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected meal image"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : form.getFieldValue("image") ? (
                <div className="relative size-32 overflow-hidden rounded-2xl ring-2 ring-orange-200 dark:ring-orange-900/60">
                  <Image
                    src={form.getFieldValue("image")}
                    alt={meal?.name ?? "Current meal image"}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex size-32 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 ring-2 ring-orange-200 dark:bg-orange-950/50 dark:text-orange-400 dark:ring-orange-900/60">
                  <ImagePlus className="size-16" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="meal-image-upload"
                className="font-semibold text-orange-900 dark:text-orange-100"
              >
                Choose Image
              </Label>

              <Input
                ref={fileInputRef}
                id="meal-image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploadImageMutation.isPending}
                className="cursor-pointer border-orange-200 file:mr-3 file:rounded-md file:border-0 file:bg-orange-100 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-orange-700 hover:file:bg-orange-200 dark:border-orange-800 dark:bg-orange-950/30 dark:file:bg-orange-950/60 dark:file:text-orange-300"
              />

              <p className="text-xs text-orange-700/60 dark:text-orange-300/60">
                Supported image files up to 5MB.
              </p>
            </div>

            {selectedFile && (
              <div className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-medium text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-300">
                Selected: {selectedFile.name}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleImageDialogClose(false)}
              disabled={uploadImageMutation.isPending}
              className="rounded-lg border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleImageUpload}
              disabled={!selectedFile || uploadImageMutation.isPending}
              className="rounded-lg bg-orange-500 font-semibold text-white shadow-sm shadow-orange-500/20 hover:bg-orange-600"
            >
              {uploadImageMutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="size-4" />
                  Upload Image
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}