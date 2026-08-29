"use client";

import { useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  CheckCircle2,
  ImagePlus,
  RotateCcw,
  Upload,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface ProviderImageUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

export default function ProviderImageUpload({
  value,
  onChange,
  error,
}: ProviderImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previewUrl = value ? URL.createObjectURL(value) : null;

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      onChange(null);
      return;
    }

    if (file.size > maxSize) {
      onChange(null);
      return;
    }

    onChange(file);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] ?? null;

    handleFileChange(file);
  };

  const removeImage = () => {
    onChange(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const chooseImage = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="overflow-hidden rounded-2xl border-orange-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-orange-900/40 dark:bg-slate-900">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <Label className="text-base font-semibold text-slate-900 dark:text-white">
              Provider Image
            </Label>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Add a professional profile image so FoodHub customers can
              recognize you.
            </p>
          </div>

          <Badge
            variant="outline"
            className="shrink-0 gap-1.5 border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/30 dark:text-orange-400"
          >
            <Camera className="h-3.5 w-3.5" />
            Optional
          </Badge>
        </div>

        {/* Upload Area */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {previewUrl ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center"
              >
                {/* Image */}
                <div className="group relative">
                  <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-4 border-white shadow-xl ring-2 ring-orange-200 dark:border-slate-800 dark:ring-orange-900">
                    <Image
                      src={previewUrl}
                      alt="Provider profile preview"
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                      <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        onClick={chooseImage}
                        className="scale-75 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span className="sr-only">
                          Change image
                        </span>
                      </Button>
                    </div>
                  </div>

                  {/* Success indicator */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-emerald-500 text-white shadow-md dark:border-slate-900"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </motion.div>
                </div>

                {/* File Information */}
                <div className="mt-4 text-center">
                  <p className="max-w-xs truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {value?.name}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {(value)&&(value.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={chooseImage}
                    className="border-orange-200 text-orange-700 transition-all hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950/30"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Change Image
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeImage}
                    className="text-slate-500 transition-all hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="upload"
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={chooseImage}
                className="group flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50/50 px-6 py-10 text-center transition-all duration-300 hover:border-orange-400 hover:bg-orange-50 dark:border-orange-900 dark:bg-orange-950/10 dark:hover:border-orange-700 dark:hover:bg-orange-950/20"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:group-hover:bg-orange-900/50">
                  <ImagePlus className="h-8 w-8" />
                </div>

                <h3 className="mt-5 text-base font-semibold text-slate-900 dark:text-white">
                  Upload your profile image
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                  Click here to choose an image from your device.
                  A clear profile photo helps customers recognize you.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-600/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-orange-700 group-hover:shadow-lg">
                  <Upload className="h-4 w-4" />
                  Choose Image
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  JPG, PNG or WEBP · Maximum 5 MB
                </p>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Hidden Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>

        {/* Validation Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-sm font-medium text-red-600 dark:text-red-400"
          >
            {error}
          </motion.p>
        )}

        {/* Information */}
        <div className="mt-5 rounded-xl border border-orange-100 bg-orange-50/60 p-4 dark:border-orange-900/40 dark:bg-orange-950/10">
          <div className="flex gap-3">
            <div className="mt-0.5 shrink-0 text-orange-600">
              <Camera className="h-4 w-4" />
            </div>

            <p className="text-xs leading-5 text-slate-600 dark:text-slate-400">
              Your profile image will be associated with your FoodHub
              provider account and may be visible to customers.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}