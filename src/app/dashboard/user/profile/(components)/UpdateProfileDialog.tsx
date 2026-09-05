"use client";

import * as React from "react";
import { Loader2, Save } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { updateUser, UpdateUserPayload } from "@/lib/api/user";
import { User } from "@/types/auth.type";

interface UpdateProfileDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UpdateProfileFormValues {
  name: string;
  contact: string;
  age: number | null;
  address: string;
}

export default function UpdateProfileDialog({ user, open, onOpenChange }: UpdateProfileDialogProps) {
  const queryClient = useQueryClient();
  const defaultValues: UpdateProfileFormValues = {
    name: user.name ?? "",
    contact: user.contact ?? "",
    age: user.age ?? null,
    address: user.address ?? "",
  };

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      updateMutation.mutate({
        name: value.name.trim(),
        contact: value.contact.trim(),
        age: value.age,
        address: value.address.trim(),
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: Partial<UpdateUserPayload>) => updateUser(user.id, payload),
    onSuccess: async (response) => {
      onOpenChange(false);
      toast.add({
        title: "Profile Updated Successfully!",
        description: response.message || "Your profile information has been updated successfully.",
        type: "success",
      });
      await queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;

      toast.add({
        title: "Profile Update Failed",
        description: message || "Unable to update your profile. Please try again.",
        type: "error",
      });
    },
  });

  React.useEffect(() => {
    form.reset({
      name: user.name ?? "",
      contact: user.contact ?? "",
      age: user.age ?? null,
      address: user.address ?? "",
    });
  }, [user, form]);

  const handleClose = (value: boolean) => {
    if (updateMutation.isPending) {
      return;
    }

    onOpenChange(value);
  };

  const isSubmitting = updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] min-w-lg overflow-y-auto rounded-2xl border-orange-200/80 bg-white p-0 shadow-2xl shadow-orange-950/10 dark:border-orange-900/50 dark:bg-orange-950/95">
        <DialogHeader className="border-b border-orange-100 px-6 py-5 dark:border-orange-900/40">
          <DialogTitle className="font-bold text-orange-950 dark:text-orange-50">
            Update Profile Information
          </DialogTitle>
          <DialogDescription className="text-sm text-orange-700/60 dark:text-orange-300/60">
            Update your personal profile information.
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
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) => (!value.trim() ? "Name is required" : undefined),
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="profile-name" className="font-semibold text-orange-900 dark:text-orange-100">
                    Name
                  </Label>
                  <Input
                    id="profile-name"
                    name={field.name}
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Enter your name"
                    disabled={isSubmitting}
                    className="border-orange-200 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-800 dark:bg-orange-950/30"
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <p className="text-xs font-medium text-red-600 dark:text-red-400">{field.state.meta.errors[0]}</p>
                  )}
                </div>
              )}
            </form.Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <form.Field name="contact">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="profile-contact" className="font-semibold text-orange-900 dark:text-orange-100">
                      Contact
                    </Label>
                    <Input
                      id="profile-contact"
                      name={field.name}
                      value={field.state.value}
                      onChange={(event) => field.handleChange(event.target.value)}
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
                    <Label htmlFor="profile-age" className="font-semibold text-orange-900 dark:text-orange-100">
                      Age
                    </Label>
                    <Input
                      id="profile-age"
                      name={field.name}
                      type="number"
                      min="1"
                      value={field.state.value ?? ""}
                      onChange={(event) => {
                        const value = event.target.value;
                        field.handleChange(value === "" ? null : Number(value));
                      }}
                      onBlur={field.handleBlur}
                      placeholder="Enter your age"
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
                  <Label htmlFor="profile-address" className="font-semibold text-orange-900 dark:text-orange-100">
                    Address
                  </Label>
                  <Input
                    id="profile-address"
                    name={field.name}
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Enter your address"
                    disabled={isSubmitting}
                    className="border-orange-200 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-800 dark:bg-orange-950/30"
                  />
                </div>
              )}
            </form.Field>

            {updateMutation.isError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                Failed to update your profile. Please try again.
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
                  Update Profile
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
