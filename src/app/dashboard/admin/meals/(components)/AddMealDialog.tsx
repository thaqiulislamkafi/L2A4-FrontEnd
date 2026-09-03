"use client";

import * as React from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Save, Upload } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

import { createMeal, CreateMealPayload } from "@/lib/api/meal";
import { uploadUserImage } from "@/lib/api/auth";
import { getCategories, Category } from "@/lib/api/category";
import { getCuisineTypes, CuisineType } from "@/lib/api/cuisine";
import { getDietryTypes, DietryType } from "@/lib/api/dietry";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";

interface AddMealDialogProps {
  providerId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type MealFormValues = {
  name: string;
  image: string;
  description: string;
  cuisine_type: string;
  dietry_type: string;
  category: string;
  availabilty_status: string;
  pricePerPiece: number;
  totalPieces: number;
  availablePieces: number;
  isPublished: boolean;
  isHeroContent: boolean;
  isSliderContent: boolean;
};

type RelationOption = {
  id: string;
  label: string;
};

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

const DEFAULT_VALUES: MealFormValues = {
  name: "",
  image: "",
  description: "",
  cuisine_type: "",
  dietry_type: "",
  category: "",
  availabilty_status: "AVAILABLE",
  pricePerPiece: 0,
  totalPieces: 0,
  availablePieces: 0,
  isPublished: false,
  isHeroContent: false,
  isSliderContent: false,
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export default function AddMealDialog({
  providerId,
  open,
  onOpenChange,
}: AddMealDialogProps) {
  const queryClient = useQueryClient();

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [imageDialogOpen, setImageDialogOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);


  const { data: categoriesData, isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: cuisineTypesData, isLoading: cuisineTypesLoading,
  } = useQuery({
    queryKey: ["cuisine-types"],
    queryFn: getCuisineTypes,
  });


  const { data: dietryTypesData, isLoading: dietryTypesLoading, } = useQuery({
    queryKey: ["dietry-types"],
    queryFn: getDietryTypes,
  });


  const categories: Category[] = categoriesData?.data ?? [];
  const cuisineTypes: CuisineType[] = cuisineTypesData?.data ?? [];
  const dietryTypes: DietryType[] = dietryTypesData?.data ?? [];

  const form = useForm({
    defaultValues: DEFAULT_VALUES,

    onSubmit: async ({ value }) => {
      /* Validate image */

      if (!value.image.trim()) {
        toast.add({
          title: "Meal Image Required",
          description: "Upload an image before creating the meal.",
          type: "error",
        });

        return;
      }

      /* Validate relation fields */

      if (
        !value.cuisine_type ||
        !value.dietry_type ||
        !value.category
      ) {
        toast.add({
          title: "Meal Details Required",
          description:
            "Select a cuisine type, dietary type, and category.",
          type: "error",
        });

        return;
      }

      /* Create meal */

      const payload: CreateMealPayload = {
        ...value,
        name: value.name.trim(),
        image: value.image.trim(),
        description: value.description.trim(),
        provider_id: providerId,
      };

      createMutation.mutate(payload);
    },
  });

  /* ------------------------------------------------------------------------ */
  /* Create Meal Mutation                                                     */
  /* ------------------------------------------------------------------------ */

  const createMutation = useMutation({
    mutationFn: (payload: CreateMealPayload) => createMeal(payload),

    onSuccess: async () => {
      toast.add({
        title: "Meal Added Successfully!",
        description: "The meal has been created successfully.",
        type: "success",
      });

      form.reset(DEFAULT_VALUES);

      onOpenChange(false);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["provider-meals"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["admin-meals"],
        }),
      ]);
    },

    onError: () => {
      toast.add({
        title: "Add Meal Failed",
        description: "Unable to create meal. Please try again.",
        type: "error",
      });
    },
  });

  /* ------------------------------------------------------------------------ */
  /* Image Upload Mutation                                                    */
  /* ------------------------------------------------------------------------ */

  const uploadImageMutation = useMutation({
    mutationFn: uploadUserImage,

    onSuccess: (response) => {
      const imageUrl =
        response?.data?.imageUrl ??
        response?.url ??
        response?.imageUrl;

      if (!imageUrl) {
        toast.add({
          title: "Image Upload Failed",
          description:
            "The server did not return an image URL.",
          type: "error",
        });

        return;
      }

      form.setFieldValue("image", imageUrl);

      setSelectedFile(null);

      setImageDialogOpen(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.add({
        title: "Image Uploaded Successfully!",
        description: "The image is ready to be saved.",
        type: "success",
      });
    },

    onError: () => {
      toast.add({
        title: "Image Upload Failed",
        description:
          "Unable to upload the image. Please try again.",
        type: "error",
      });
    },
  });

  /* ------------------------------------------------------------------------ */
  /* File Selection                                                           */
  /* ------------------------------------------------------------------------ */

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const isImage = file.type.startsWith("image/");

    const isValidSize = file.size <= MAX_IMAGE_SIZE;

    if (!isImage || !isValidSize) {
      toast.add({
        title: "Invalid Image",
        description: !isImage
          ? "Please select a valid image file."
          : "Image size must be less than 5MB.",
        type: "error",
      });

      event.target.value = "";

      return;
    }

    setSelectedFile(file);
  };

  /* ------------------------------------------------------------------------ */
  /* Image Dialog                                                             */
  /* ------------------------------------------------------------------------ */

  const handleImageDialogChange = (value: boolean) => {
    if (uploadImageMutation.isPending) {
      return;
    }

    setImageDialogOpen(value);

    if (!value) {
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  /* ------------------------------------------------------------------------ */
  /* Image Upload                                                             */
  /* ------------------------------------------------------------------------ */

  const handleImageUpload = () => {
    if (!selectedFile) {
      return;
    }

    if (uploadImageMutation.isPending) {
      return;
    }

    uploadImageMutation.mutate(selectedFile);
  };

  /* ------------------------------------------------------------------------ */
  /* Main Dialog                                                              */
  /* ------------------------------------------------------------------------ */

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (createMutation.isPending) {
            return;
          }

          onOpenChange(value);
        }}
      >
        <DialogContent className="max-h-[90vh] min-w-lg overflow-y-auto rounded-2xl border-orange-200/80 bg-white p-0 dark:border-orange-900/50 dark:bg-orange-950/95">
          <DialogHeader className="border-b border-orange-100 px-6 py-5 dark:border-orange-900/40">
            <DialogTitle className="font-bold text-orange-950 dark:text-orange-50">
              Add Meal
            </DialogTitle>

            <DialogDescription className="text-orange-700/60 dark:text-orange-300/60">
              Create a new meal for your provider account.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="space-y-5 px-6 py-5">

              {/* ---------------------------------------------------------------- */}
              {/* Meal Image                                                        */}
              {/* ---------------------------------------------------------------- */}

              <Card className="border-orange-200/70 bg-orange-50/40 p-4 shadow-none dark:border-orange-900/40 dark:bg-orange-950/20">
                <div className="flex items-center justify-between gap-4">

                  <div className="flex items-center gap-3">

                    {form.getFieldValue("image") ? (
                      <Image
                        src={form.getFieldValue("image")}
                        alt="Meal"
                        width={56}
                        height={56}
                        className="size-14 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex size-14 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                        <ImagePlus />
                      </div>
                    )}

                    <div>
                      <p className="text-sm font-bold text-orange-950 dark:text-orange-50">
                        Meal Image
                      </p>

                      <p className="text-xs text-orange-700/60 dark:text-orange-300/60">
                        Upload an image up to 5MB
                      </p>
                    </div>

                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setImageDialogOpen(true)}
                    disabled={createMutation.isPending}
                  >
                    <ImagePlus className="size-4" />
                    Upload Image
                  </Button>

                </div>
              </Card>

              {/* ---------------------------------------------------------------- */}
              {/* Meal Information                                                   */}
              {/* ---------------------------------------------------------------- */}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {/* Name */}

                <form.Field name="name">
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label className="font-semibold text-orange-900 dark:text-orange-100">
                        Name
                      </Label>

                      <Input
                        type="text"
                        value={field.state.value}
                        required
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                      />
                    </div>
                  )}
                </form.Field>

                {/* Description */}

                <form.Field name="description">
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label className="font-semibold text-orange-900 dark:text-orange-100">
                        Description
                      </Label>

                      <Input
                        type="text"
                        value={field.state.value}
                        required
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                      />
                    </div>
                  )}
                </form.Field>

                {/* Cuisine Type */}

                <form.Field name="cuisine_type">
                  {(field) => {
                    const options: RelationOption[] =
                      cuisineTypes.map((item) => ({
                        id: item.id,
                        label: item.cuisine_type_name,
                      }));

                    return (
                      <div className="space-y-1.5">
                        <Label className="font-semibold text-orange-900 dark:text-orange-100">
                          Cuisine Type
                        </Label>

                        <Select
                          value={field.state.value}
                          onValueChange={(value) => {
                            if (value !== null) {
                              field.handleChange(value);
                            }
                          }}
                          disabled={cuisineTypesLoading}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={cuisineTypesLoading ? "Loading..." : "Select cuisine type"}>
                              {options.find((option) => option.id === field.state.value)?.label}
                            </SelectValue>
                          </SelectTrigger>

                          <SelectContent>
                            {options.map((option) => (
                              <SelectItem
                                key={option.id}
                                value={option.id}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  }}
                </form.Field>

                {/* Dietary Type */}

                <form.Field name="dietry_type">
                  {(field) => {
                    const options: RelationOption[] =
                      dietryTypes.map((item) => ({
                        id: item.id,
                        label: item.dietry_type_name,
                      }));

                    return (
                      <div className="space-y-1.5">
                        <Label className="font-semibold text-orange-900 dark:text-orange-100">
                          Dietry Type
                        </Label>

                        <Select
                          value={field.state.value}
                          onValueChange={(value) => {
                            if (value !== null) {
                              field.handleChange(value);
                            }
                          }}
                          disabled={dietryTypesLoading}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={dietryTypesLoading ? "Loading..." : "Select dietary type"}>
                              {options.find((option) => option.id === field.state.value)?.label}
                            </SelectValue >
                          </SelectTrigger>

                          <SelectContent>
                            {options.map((option) => (
                              <SelectItem
                                key={option.id}
                                value={option.id}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  }}
                </form.Field>

                {/* Category */}

                <form.Field name="category">
                  {(field) => {
                    const options: RelationOption[] =
                      categories.map((item) => ({
                        id: item.id,
                        label: item.category_name,
                      }));

                    return (
                      <div className="space-y-1.5">
                        <Label className="font-semibold text-orange-900 dark:text-orange-100">
                          Category
                        </Label>

                        <Select
                          value={field.state.value}
                          onValueChange={(value) => {
                            if (value !== null) {
                              field.handleChange(value);
                            }
                          }}
                          disabled={categoriesLoading}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                categoriesLoading
                                  ? "Loading..."
                                  : "Select category"
                              }
                            >
                              {options.find((option) => option.id === field.state.value)?.label}
                            </SelectValue>
                          </SelectTrigger>

                          <SelectContent>
                            {options.map((option) => (
                              <SelectItem
                                key={option.id}
                                value={option.id}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  }}
                </form.Field>

                {/* Price */}

                <form.Field name="pricePerPiece">
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label className="font-semibold text-orange-900 dark:text-orange-100">
                        Price per Piece (৳)
                      </Label>

                      <Input
                        type="number"
                        min={0}
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(
                            Number(event.target.value),
                          )
                        }
                      />
                    </div>
                  )}
                </form.Field>

                {/* Total Pieces */}

                <form.Field name="totalPieces">
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label className="font-semibold text-orange-900 dark:text-orange-100">
                        Total Pieces
                      </Label>

                      <Input
                        type="number"
                        min={0}
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(
                            Number(event.target.value),
                          )
                        }
                      />
                    </div>
                  )}
                </form.Field>

                {/* Available Pieces */}

                <form.Field name="availablePieces">
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label className="font-semibold text-orange-900 dark:text-orange-100">
                        Available Pieces
                      </Label>

                      <Input
                        type="number"
                        min={0}
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(
                            Number(event.target.value),
                          )
                        }
                      />
                    </div>
                  )}
                </form.Field>

                {/* Availability Status */}

                <form.Field name="availabilty_status">
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label className="font-semibold text-orange-900 dark:text-orange-100">
                        Availability Status
                      </Label>

                      <Select
                        value={field.state.value}
                        onValueChange={(value) => {
                          if (value !== null) {
                            field.handleChange(value);
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="AVAILABLE">
                            AVAILABLE
                          </SelectItem>

                          <SelectItem value="UNAVAILABLE">
                            UNAVAILABLE
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </form.Field>

              </div>

              {/* ---------------------------------------------------------------- */}
              {/* Meal Flags                                                        */}
              {/* ---------------------------------------------------------------- */}

              <div className="flex flex-wrap gap-4 text-sm text-orange-900 dark:text-orange-100">

                <form.Field name="isPublished">
                  {(field) => (
                    <Label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.checked)
                        }
                      />

                      Is Published
                    </Label>
                  )}
                </form.Field>

                <form.Field name="isHeroContent">
                  {(field) => (
                    <Label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.checked)
                        }
                      />

                      Is Hero Content
                    </Label>
                  )}
                </form.Field>

                <form.Field name="isSliderContent">
                  {(field) => (
                    <Label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.checked)
                        }
                      />

                      Is Slider Content
                    </Label>
                  )}
                </form.Field>

              </div>

              {createMutation.isError && (
                <p className="text-sm font-medium text-red-600">
                  Failed to create meal. Please try again.
                </p>
              )}

              <DialogFooter className="gap-3">

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={createMutation.isPending}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="bg-orange-500 text-white hover:bg-orange-600"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="size-4" />
                      Add Meal
                    </>
                  )}
                </Button>

              </DialogFooter>

            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={imageDialogOpen}
        onOpenChange={handleImageDialogChange}
      >
        <DialogContent className="max-w-md rounded-2xl border-orange-200/80 bg-white dark:border-orange-900/50 dark:bg-orange-950/95">

          <DialogHeader>

            <DialogTitle className="font-bold text-orange-950 dark:text-orange-50">
              Upload Meal Image
            </DialogTitle>

            <DialogDescription>
              Select an image for this meal.
            </DialogDescription>

          </DialogHeader>

          {/* Image Preview */}

          <div className="space-y-4">

            <div className="flex justify-center">

              {selectedFile ? (
                <div className="relative size-32 overflow-hidden rounded-2xl">

                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected meal"
                    fill
                    className="object-cover"
                  />

                </div>
              ) : (
                <div className="flex size-32 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                  <ImagePlus className="size-12" />
                </div>
              )}

            </div>

            {/* File Input */}

            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploadImageMutation.isPending}
            />

          </div>

          {/* Image Dialog Actions */}

          <DialogFooter>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleImageDialogChange(false)}
              disabled={uploadImageMutation.isPending}
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleImageUpload}
              disabled={
                !selectedFile ||
                uploadImageMutation.isPending
              }
              className="bg-orange-500 text-white hover:bg-orange-600"
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
    </>
  );
}