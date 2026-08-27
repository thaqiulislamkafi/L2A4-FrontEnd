"use client";

import * as React from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Save, Upload, UserCircle } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

import { AuthUser } from "@/store/auth.store";
import { updateUser, UpdateUserPayload } from "@/lib/api/user";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { uploadUserImage } from "@/lib/api/auth";

interface UpdateUserDialogProps {
  user: AuthUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


export default function UpdateUserDialog({ user, open, onOpenChange }: UpdateUserDialogProps) {
  const queryClient = useQueryClient();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [imageDialogOpen, setImageDialogOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const DEFAULT_FORM_VALUES: UpdateUserPayload = {
    name: user?.name ?? "",
    image: user?.image ?? "",
    contact: user?.contact ?? "",
    age: user?.age ?? null,
    address: user?.address ?? "",
  };

  const form = useForm({
    defaultValues: DEFAULT_FORM_VALUES,

    onSubmit: async ({ value }) => {
      updateMutation.mutate({
        name: value.name.trim(),
        image: value.image.trim(),
        contact: value.contact.trim(),
        age: value.age,
        address: value.address.trim(),
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateUserPayload) => {
      if (!user) {
        throw new Error("User not found");
      }

      return updateUser(user.id, payload);
    },

    onSuccess: async () => {
      onOpenChange(false);

      toast.add({
        title: "User Updated Successfully!",
        description: "User information has been updated successfully.",
        type: "success",
      });

      await queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: (file: File) => uploadUserImage(file),

    onSuccess: (response) => {
      const uploadedImage = response?.data?.imageUrl ?? response?.url;

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
        description: "The new profile image is ready to be saved.",
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

  React.useEffect(() => {
    if (!user) return;

    form.reset({
      name: user.name ?? "",
      image: user.image ?? "",
      contact: user.contact ?? "",
      age: user.age ?? null,
      address: user.address ?? "",
    });
  }, [user, form]);

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

  const handleClose = (value: boolean) => {
    if (updateMutation.isPending || uploadImageMutation.isPending) return;

    onOpenChange(value);
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

  const isSubmitting = updateMutation.isPending;

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-h-[90vh] min-w-lg overflow-y-auto rounded-2xl border-orange-200/80 bg-white p-0 shadow-2xl shadow-orange-950/10 dark:border-orange-900/50 dark:bg-orange-950/95">
          <DialogHeader className="border-b border-orange-100 px-6 py-5 dark:border-orange-900/40">
            <DialogTitle className="font-bold text-orange-950 dark:text-orange-50">
              Update User Information
            </DialogTitle>

            <DialogDescription className="text-sm text-orange-700/60 dark:text-orange-300/60">
              Update the profile information of {user?.name ?? "this user"}.
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
                            alt={user?.name || "User"}
                            className="size-14 shrink-0 rounded-xl object-cover ring-2 ring-orange-200 dark:ring-orange-900/60"
                          />
                        ) : (
                          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 ring-2 ring-orange-200 dark:bg-orange-950/60 dark:text-orange-400 dark:ring-orange-900/60">
                            <UserCircle className="size-7" />
                          </div>
                        )
                      }
                    </form.Subscribe>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-orange-950 dark:text-orange-50">
                        {user?.name ?? "User"}
                      </p>

                      <p className="truncate text-xs font-medium text-orange-700/60 dark:text-orange-300/60">
                        {user?.email ?? ""}
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setImageDialogOpen(true)}
                    disabled={isSubmitting}
                    className="shrink-0 rounded-lg border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40"
                  >
                    <ImagePlus className="size-4" />
                    <span className="hidden sm:inline">Update Image</span>
                  </Button>
                </div>
              </Card>

              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) =>
                    !value.trim() ? "Name is required" : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor="user-name"
                      className="font-semibold text-orange-900 dark:text-orange-100"
                    >
                      Name
                    </Label>

                    <Input
                      id="user-name"
                      name={field.name}
                      value={field.state.value}
                      onChange={(event) => field.handleChange(event.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="Enter user name"
                      disabled={isSubmitting}
                      className="border-orange-200 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-800 dark:bg-orange-950/30"
                    />

                    {field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0 && (
                        <p className="text-xs font-medium text-red-600 dark:text-red-400">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                  </div>
                )}
              </form.Field>

              <form.Subscribe selector={(state) => state.values.image}>
                {(image) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor="user-image"
                      className="font-semibold text-orange-900 dark:text-orange-100"
                    >
                      Profile Image URL
                    </Label>

                    <Input
                      id="user-image"
                      value={image}
                      onChange={(event) =>
                        form.setFieldValue("image", event.target.value)
                      }
                      placeholder="https://example.com/image.jpg"
                      disabled={isSubmitting}
                      className="border-orange-200 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-800 dark:bg-orange-950/30"
                    />
                  </div>
                )}
              </form.Subscribe>

              <div className="grid gap-5 sm:grid-cols-2">
                <form.Field name="contact">
                  {(field) => (
                    <div className="space-y-2">
                      <Label
                        htmlFor="user-contact"
                        className="font-semibold text-orange-900 dark:text-orange-100"
                      >
                        Contact
                      </Label>

                      <Input
                        id="user-contact"
                        name={field.name}
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        onBlur={field.handleBlur}
                        placeholder="+8801XXXXXXXXX"
                        disabled={isSubmitting}
                        className="border-orange-200 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-800 dark:bg-orange-950/30"
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="age">
                  {(field) => (
                    <div className="space-y-2">
                      <Label
                        htmlFor="user-age"
                        className="font-semibold text-orange-900 dark:text-orange-100"
                      >
                        Age
                      </Label>

                      <Input
                        id="user-age"
                        name={field.name}
                        type="number"
                        min="1"
                        value={field.state.value ?? ""}
                        onChange={(event) => {
                          const value = event.target.value;

                          field.handleChange(
                            value === "" ? null : Number(value)
                          );
                        }}
                        onBlur={field.handleBlur}
                        placeholder="Enter age"
                        disabled={isSubmitting}
                        className="border-orange-200 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-800 dark:bg-orange-950/30"
                      />
                    </div>
                  )}
                </form.Field>
              </div>

              <form.Field name="address">
                {(field) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor="user-address"
                      className="font-semibold text-orange-900 dark:text-orange-100"
                    >
                      Address
                    </Label>

                    <Input
                      id="user-address"
                      name={field.name}
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      placeholder="Enter user address"
                      disabled={isSubmitting}
                      className="border-orange-200 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-800 dark:bg-orange-950/30"
                    />
                  </div>
                )}
              </form.Field>

              {updateMutation.isError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                  Failed to update user. Please try again.
                </div>
              )}
            </div>

            <DialogFooter className="border-t border-orange-100 px-6 py-4 dark:border-orange-900/40">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleClose(false)}
                disabled={isSubmitting}
                className="rounded-lg border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-orange-500 font-semibold text-white shadow-sm shadow-orange-500/20 hover:bg-orange-600"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Update User
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={imageDialogOpen} onOpenChange={handleImageDialogClose}>
        <DialogContent className="max-w-md rounded-2xl border-orange-200/80 bg-white shadow-2xl shadow-orange-950/10 dark:border-orange-900/50 dark:bg-orange-950/95">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-bold text-orange-950 dark:text-orange-50">
              <ImagePlus className="size-5 text-orange-500" />
              Update Profile Image
            </DialogTitle>

            <DialogDescription className="text-orange-700/60 dark:text-orange-300/60">
              Select a new profile image for {user?.name ?? "this user"}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="flex justify-center">
              {selectedFile ? (
                <div className="relative size-32 overflow-hidden rounded-2xl ring-2 ring-orange-200 dark:ring-orange-900/60">
                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected profile image"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : form.getFieldValue("image") ? (
                <div className="relative size-32 overflow-hidden rounded-2xl ring-2 ring-orange-200 dark:ring-orange-900/60">
                  <Image
                    src={form.getFieldValue("image")}
                    alt={user?.name ?? "Current profile image"}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex size-32 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 ring-2 ring-orange-200 dark:bg-orange-950/50 dark:text-orange-400 dark:ring-orange-900/60">
                  <UserCircle className="size-16" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="profile-image-upload"
                className="font-semibold text-orange-900 dark:text-orange-100"
              >
                Choose Image
              </Label>

              <Input
                ref={fileInputRef}
                id="profile-image-upload"
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
    </>
  );
}