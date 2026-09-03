"use client";

import * as React from "react";
import { Eye, EyeOff, KeyRound, Loader2, LockKeyhole, Save } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

import { changePassword, ChangePasswordPayload } from "@/lib/api/user";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChangePasswordDialog({ open, onOpenChange }: ChangePasswordDialogProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const router = useRouter();

  const { clearUser } = useAuthStore();
  
    
  const changePasswordMutation = useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePassword(payload),
    onSuccess: (response) => {
      toast.add({
        title: "Password Changed Successfully!",
        description: response.message || "Your password has been changed successfully.",
        type: "success",
      });

      form.reset();

      setShowPassword(false) ;
      setShowNewPassword(false) ;

      onOpenChange(false) ;
      clearUser() ;
      router.push('/signin') ;
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;

      toast.add({
        title: "Password Change Failed",
        description: message || "Unable to change your password. Please try again.",
        type: "error",
      });
    },
  });

  const form = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
    },
    onSubmit: async ({ value }) => {
      changePasswordMutation.mutate({
        password: value.password,
        newPassword: value.newPassword,
      });
    },
  });

  const handleClose = (value: boolean) => {
    if (changePasswordMutation.isPending) {
      return;
    }

    onOpenChange(value);

    if (!value) {
      form.reset();
      setShowPassword(false);
      setShowNewPassword(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[min(92vw,500px)] overflow-auto rounded-2xl border-orange-200/80 bg-white p-0 shadow-2xl shadow-orange-950/10 dark:border-orange-900/50 dark:bg-orange-950/95">
        <DialogHeader className="border-b border-orange-100 px-6 py-5 dark:border-orange-900/40">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-orange-950 dark:text-orange-50">
            <div className="flex size-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
              <KeyRound className="size-5" />
            </div>
            Change Password
          </DialogTitle>

          <DialogDescription className="text-sm text-orange-700/60 dark:text-orange-300/60">
            Enter your current password and choose a new password for your account.
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
              name="password"
              validators={{
                onChange: ({ value }) => {
                  if (!value) {
                    return "Current password is required";
                  }

                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="font-semibold text-orange-900 dark:text-orange-100">
                    Current Password
                  </Label>

                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-orange-400" />

                    <Input id={field.name} name={field.name} type={showPassword ? "text" : "password"} value={field.state.value} onBlur={field.handleBlur} onChange={(event) => field.handleChange(event.target.value)} placeholder="Enter current password" disabled={changePasswordMutation.isPending} className="border-orange-200 pl-10 pr-10 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-800 dark:bg-orange-950/30" />

                    <button type="button" onClick={() => setShowPassword((previous) => !previous)} disabled={changePasswordMutation.isPending} className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-400 transition-colors hover:text-orange-600 dark:hover:text-orange-300" aria-label={showPassword ? "Hide current password" : "Show current password"}>
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>

                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <p className="text-xs font-medium text-red-500">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="newPassword"
              validators={{
                onChange: ({ value }) => {
                  if (!value) {
                    return "New password is required";
                  }

                  if (value.length < 6) {
                    return "New password must be at least 6 characters";
                  }

                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="font-semibold text-orange-900 dark:text-orange-100">
                    New Password
                  </Label>

                  <div className="relative">
                    <KeyRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-orange-400" />

                    <Input id={field.name} name={field.name} type={showNewPassword ? "text" : "password"} value={field.state.value} onBlur={field.handleBlur} onChange={(event) => field.handleChange(event.target.value)} placeholder="Enter new password" disabled={changePasswordMutation.isPending} className="border-orange-200 pl-10 pr-10 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-800 dark:bg-orange-950/30" />

                    <button type="button" onClick={() => setShowNewPassword((previous) => !previous)} disabled={changePasswordMutation.isPending} className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-400 transition-colors hover:text-orange-600 dark:hover:text-orange-300" aria-label={showNewPassword ? "Hide new password" : "Show new password"}>
                      {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>

                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <p className="text-xs font-medium text-red-500">
                      {field.state.meta.errors[0]}
                    </p>
                  )}

                  <p className="text-xs font-medium text-orange-700/50 dark:text-orange-300/50">
                    Your new password should contain at least 6 characters.
                  </p>
                </div>
              )}
            </form.Field>

            {changePasswordMutation.isError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                {(changePasswordMutation.error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Unable to change password. Please check your current password and try again."}
              </div>
            )}
          </div>

          <DialogFooter className="border-t border-orange-100 px-6 py-4 dark:border-orange-900/40">
            <Button type="button" variant="outline" onClick={() => handleClose(false)} disabled={changePasswordMutation.isPending} className="rounded-lg border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40">
              Cancel
            </Button>

            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit || isSubmitting || changePasswordMutation.isPending} className="rounded-lg bg-orange-500 font-semibold text-white shadow-sm shadow-orange-500/20 hover:bg-orange-600">
                  {changePasswordMutation.isPending || isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Changing...
                    </>
                  ) : (
                    <>
                      <Save className="size-4" />
                      Change Password
                    </>
                  )}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}