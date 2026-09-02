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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/toast";

interface AddMealDialogProps {
  providerId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const defaultValues = {
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

export default function AddMealDialog({ providerId, open, onOpenChange }: AddMealDialogProps) {
  const queryClient = useQueryClient();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [imageDialogOpen, setImageDialogOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const { data: cuisineTypesData, isLoading: cuisineTypesLoading } = useQuery({
    queryKey: ["cuisine-types"],
    queryFn: getCuisineTypes,
  });
  const { data: dietryTypesData, isLoading: dietryTypesLoading } = useQuery({
    queryKey: ["dietry-types"],
    queryFn: getDietryTypes,
  });

  const categories: Category[] = categoriesData?.data ?? [];
  const cuisineTypes: CuisineType[] = cuisineTypesData?.data ?? [];
  const dietryTypes: DietryType[] = dietryTypesData?.data ?? [];

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      if (!value.image.trim()) {
        toast.add({ title: "Meal Image Required", description: "Upload an image before creating the meal.", type: "error" });
        return;
      }
      if (!value.cuisine_type || !value.dietry_type || !value.category) {
        toast.add({ title: "Meal Details Required", description: "Select a cuisine type, dietary type, and category.", type: "error" });
        return;
      }

      createMutation.mutate({
        ...value,
        name: value.name.trim(),
        image: value.image.trim(),
        description: value.description.trim(),
        cuisine_type: value.cuisine_type,
        dietry_type: value.dietry_type,
        category: value.category,
        provider_id: providerId,
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateMealPayload) => createMeal(payload),
    onSuccess: async () => {
      toast.add({ title: "Meal Added Successfully!", description: "The meal has been created successfully.", type: "success" });
      form.reset(defaultValues);
      onOpenChange(false);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["provider-meals"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-meals"] }),
      ]);
    },
    onError: () => {
      toast.add({ title: "Add Meal Failed", description: "Unable to create meal. Please try again.", type: "error" });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadUserImage,
    onSuccess: (response) => {
      const imageUrl = response?.data?.imageUrl ?? response?.url ?? response?.imageUrl;
      if (!imageUrl) {
        toast.add({ title: "Image Upload Failed", description: "The server did not return an image URL.", type: "error" });
        return;
      }
      form.setFieldValue("image", imageUrl);
      setSelectedFile(null);
      setImageDialogOpen(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast.add({ title: "Image Uploaded Successfully!", description: "The image is ready to be saved.", type: "success" });
    },
    onError: () => {
      toast.add({ title: "Image Upload Failed", description: "Unable to upload the image. Please try again.", type: "error" });
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      toast.add({ title: "Invalid Image", description: file.type.startsWith("image/") ? "Image size must be less than 5MB." : "Please select a valid image file.", type: "error" });
      event.target.value = "";
      return;
    }
    setSelectedFile(file);
  };

  const closeImageDialog = (value: boolean) => {
    if (uploadImageMutation.isPending) return;
    setImageDialogOpen(value);
    if (!value) {
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const field = (name: keyof typeof defaultValues, label: string, type = "text") => (
    <form.Field name={name}>
      {(item) => (
        <div>
          <Label className="font-semibold text-orange-900 dark:text-orange-100">{label}</Label>
          <Input
            type={type}
            value={item.state.value as string | number}
            onChange={(event) => item.handleChange(type === "number" ? Number(event.target.value) : event.target.value)}
            min={type === "number" ? 0 : undefined}
            required={["name", "description", "cuisine_type", "dietry_type", "category"].includes(name)}
          />
        </div>
      )}
    </form.Field>
  );

  const relationSelect = (
    name: "category" | "cuisine_type" | "dietry_type",
    label: string,
    options: Array<{ id: string; label: string }>,
    isLoading: boolean,
  ) => (
    <form.Field name={name}>
      {(item) => (
        <div>
          <Label className="font-semibold text-orange-900 dark:text-orange-100">{label}</Label>
          <Select
            value={item.state.value}
            onValueChange={(value) => value && item.handleChange(value)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder={isLoading ? "Loading..." : `Select ${label.toLowerCase()}`}>
                {options.find((option) => option.id === item.state.value)?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </form.Field>
  );

  return (
    <Dialog open={open} onOpenChange={(value) => !createMutation.isPending && onOpenChange(value)}>
      <DialogContent className="max-h-[90vh] min-w-lg overflow-y-auto rounded-2xl border-orange-200/80 bg-white p-0 dark:border-orange-900/50 dark:bg-orange-950/95">
        <DialogHeader className="border-b border-orange-100 px-6 py-5 dark:border-orange-900/40">
          <DialogTitle className="font-bold text-orange-950 dark:text-orange-50">Add Meal</DialogTitle>
          <DialogDescription className="text-orange-700/60 dark:text-orange-300/60">Create a new meal for your provider account.</DialogDescription>
        </DialogHeader>
        <form onSubmit={(event) => { event.preventDefault(); form.handleSubmit(); }}>
          <div className="space-y-5 px-6 py-5">
            <Card className="border-orange-200/70 bg-orange-50/40 p-4 shadow-none dark:border-orange-900/40 dark:bg-orange-950/20">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {form.getFieldValue("image") ? <Image src={form.getFieldValue("image")} alt="Meal" width={56} height={56} className="size-14 rounded-xl object-cover" /> : <div className="flex size-14 items-center justify-center rounded-xl bg-orange-100 text-orange-500"><ImagePlus /></div>}
                  <div><p className="text-sm font-bold text-orange-950 dark:text-orange-50">Meal Image</p><p className="text-xs text-orange-700/60 dark:text-orange-300/60">Upload an image up to 5MB</p></div>
                </div>
                <Button type="button" variant="outline" onClick={() => setImageDialogOpen(true)} disabled={createMutation.isPending}><ImagePlus className="size-4" /> Upload Image</Button>
              </div>
            </Card>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {field("name", "Name")}
              {field("description", "Description")}
              {relationSelect("cuisine_type", "Cuisine Type", cuisineTypes.map((item) => ({ id: item.id, label: item.cuisine_type_name })), cuisineTypesLoading)}
              {relationSelect("dietry_type", "Dietry Type", dietryTypes.map((item) => ({ id: item.id, label: item.dietry_type_name })), dietryTypesLoading)}
              {relationSelect("category", "Category", categories.map((item) => ({ id: item.id, label: item.category_name })), categoriesLoading)}
              {field("pricePerPiece", "Price per Piece (৳)", "number")}
              {field("totalPieces", "Total Pieces", "number")}
              {field("availablePieces", "Available Pieces", "number")}
              <form.Field name="availabilty_status">{(item) => <div><Label className="font-semibold text-orange-900 dark:text-orange-100">Availability Status</Label><Select value={item.state.value} onValueChange={(value) => value && item.handleChange(value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="AVAILABLE">AVAILABLE</SelectItem><SelectItem value="UNAVAILABLE">UNAVAILABLE</SelectItem></SelectContent></Select></div>}</form.Field>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-orange-900 dark:text-orange-100">
              {(["isPublished", "isHeroContent", "isSliderContent"] as const).map((name) => <form.Field key={name} name={name}>{(item) => <label className="flex items-center gap-2"><input type="checkbox" checked={item.state.value} onChange={(event) => item.handleChange(event.target.checked)} />{name.replace("is", "Is ")}</label>}</form.Field>)}
            </div>
            {createMutation.isError && <p className="text-sm font-medium text-red-600">Failed to create meal. Please try again.</p>}
            <div className="flex justify-end gap-3"><Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={createMutation.isPending}>Cancel</Button><Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600" disabled={createMutation.isPending}>{createMutation.isPending ? <><Loader2 className="size-4 animate-spin" /> Creating...</> : <><Save className="size-4" /> Add Meal</>}</Button></div>
          </div>
          <DialogFooter />
        </form>
      </DialogContent>
      <Dialog open={imageDialogOpen} onOpenChange={closeImageDialog}>
        <DialogContent className="max-w-md rounded-2xl border-orange-200/80 bg-white dark:border-orange-900/50 dark:bg-orange-950/95">
          <DialogHeader><DialogTitle className="font-bold text-orange-950 dark:text-orange-50">Upload Meal Image</DialogTitle><DialogDescription>Select an image for this meal.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center">{selectedFile ? <div className="relative size-32 overflow-hidden rounded-2xl"><Image src={URL.createObjectURL(selectedFile)} alt="Selected meal" fill className="object-cover" /></div> : <div className="flex size-32 items-center justify-center rounded-2xl bg-orange-100 text-orange-500"><ImagePlus className="size-12" /></div>}</div>
            <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} disabled={uploadImageMutation.isPending} />
          </div>
          <DialogFooter><Button type="button" variant="outline" onClick={() => closeImageDialog(false)} disabled={uploadImageMutation.isPending}>Cancel</Button><Button type="button" onClick={() => selectedFile && uploadImageMutation.mutate(selectedFile)} disabled={!selectedFile || uploadImageMutation.isPending} className="bg-orange-500 text-white">{uploadImageMutation.isPending ? <><Loader2 className="size-4 animate-spin" /> Uploading...</> : <><Upload className="size-4" /> Upload Image</>}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
