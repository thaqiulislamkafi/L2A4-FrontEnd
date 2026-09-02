"use client";

import * as React from "react";
import { KeyRound, Loader2, Mail, Save, Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

import {
  forgotPassword,
  ForgotPasswordPayload,
  resetPasswordByOtp,
  ResetPasswordByOtpPayload,
} from "@/lib/api/auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";

interface ForgotPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const getErrorMessage = (error: unknown) =>
  (error as ApiError)?.response?.data?.message;

export default function ForgotPasswordDialog({
  open,
  onOpenChange,
}: ForgotPasswordDialogProps) {
  const [resetOpen, setResetOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const sendOtpMutation = useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPassword(payload),
    onSuccess: (response, payload) => {
      setEmail(payload.email);
      onOpenChange(false);
      setResetOpen(true);
    },
    onError: (error: unknown) => {
      toast.add({
        title: "Unable to send OTP",
        description:
          getErrorMessage(error) ||
          "We could not send an OTP to that email. Please try again.",
        type: "error",
      });
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (payload: ResetPasswordByOtpPayload) =>
      resetPasswordByOtp(payload),
    onSuccess: (response) => {
      toast.add({
        title: "Password reset successfully",
        description:
          response.message || "Your password has been reset successfully.",
        type: "success",
      });
      resetForm.reset();
      setResetOpen(false);
      setEmail("");
    },
    onError: (error: unknown) => {
      toast.add({
        title: "Password reset failed",
        description:
          getErrorMessage(error) ||
          "Unable to reset your password. Please check the OTP and try again.",
        type: "error",
      });
    },
  });

  const emailForm = useForm({
    defaultValues: { email: "" },
    onSubmit: async ({ value }) => {
      sendOtpMutation.mutate({ email: value.email });
    },
  });

  const resetForm = useForm({
    defaultValues: { otp: "", newPassword: "" },
    onSubmit: async ({ value }) => {
      resetPasswordMutation.mutate({
        email,
        otp: value.otp,
        newPassword: value.newPassword,
      });
    },
  });

  const handleEmailDialogChange = (value: boolean) => {
    if (sendOtpMutation.isPending) return;
    onOpenChange(value);
    if (!value) emailForm.reset();
  };

  const handleResetDialogChange = (value: boolean) => {
    if (resetPasswordMutation.isPending) return;
    setResetOpen(value);
    if (!value) {
      resetForm.reset();
      setEmail("");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleEmailDialogChange}>
        <DialogContent className="w-[min(92vw,500px)] rounded-2xl border-orange-200/80 bg-white p-0 shadow-2xl dark:border-orange-900/50 dark:bg-orange-950/95 overflow-auto">
          <DialogHeader className="border-b border-orange-100 px-6 py-5 dark:border-orange-900/40">
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-orange-950 dark:text-orange-50">
              <span className="flex size-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                <Mail className="size-5" />
              </span>
              Forgot Password
            </DialogTitle>
            <DialogDescription className="text-sm text-orange-700/60 dark:text-orange-300/60">
              Enter your email address and we&apos;ll send you a one-time password.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              emailForm.handleSubmit();
            }}
          >
            <div className="space-y-2 px-6 py-5">
              <emailForm.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Email address is required"
                      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                        ? "Please enter a valid email address"
                        : undefined,
                }}
              >
                {(field) => (
                  <>
                    <Label htmlFor={field.name} className="font-semibold text-orange-900 dark:text-orange-100">
                      Email Address
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="you@example.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                      disabled={sendOtpMutation.isPending}
                      className="mt-2 border-orange-200 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-800 dark:bg-orange-950/30"
                    />
                    {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </>
                )}
              </emailForm.Field>
            </div>
            <DialogFooter className="border-t border-orange-100 px-6 py-4 dark:border-orange-900/40">
              <Button type="button" variant="outline" onClick={() => handleEmailDialogChange(false)} disabled={sendOtpMutation.isPending}>
                Cancel
              </Button>
              <emailForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit || isSubmitting || sendOtpMutation.isPending} className="bg-orange-500 font-semibold text-white hover:bg-orange-600">
                    {sendOtpMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                    {sendOtpMutation.isPending ? "Sending..." : "Send OTP"}
                  </Button>
                )}
              </emailForm.Subscribe>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={resetOpen} onOpenChange={handleResetDialogChange}>
        <DialogContent className="w-[min(92vw,500px)] rounded-2xl border-orange-200/80 bg-white p-0 shadow-2xl dark:border-orange-900/50 dark:bg-orange-950/95 overflow-auto">
          <DialogHeader className="border-b border-orange-100 px-6 py-5 dark:border-orange-900/40">
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-orange-950 dark:text-orange-50">
              <span className="flex size-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                <KeyRound className="size-5" />
              </span>
              Reset Password
            </DialogTitle>
            <DialogDescription className="text-sm text-orange-700/60 dark:text-orange-300/60">
              Enter the OTP sent to your email and choose a new password.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              resetForm.handleSubmit();
            }}
          >
            <div className="space-y-5 px-6 py-5">
              <resetForm.Field name="otp" validators={{ onChange: ({ value }) => !value ? "OTP is required" : value.length !== 6 ? "OTP must be 6 digits" : undefined }}>
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name} className="font-semibold text-orange-900 dark:text-orange-100">OTP</Label>
                    <Input id={field.name} name={field.name} inputMode="numeric" maxLength={6} placeholder="Enter 6-digit OTP" value={field.state.value} onBlur={field.handleBlur} onChange={(event) => field.handleChange(event.target.value.replace(/\D/g, ""))} disabled={resetPasswordMutation.isPending} />
                    {field.state.meta.isTouched && field.state.meta.errors.length > 0 && <p className="text-xs font-medium text-red-500">{field.state.meta.errors[0]}</p>}
                  </div>
                )}
              </resetForm.Field>
              <resetForm.Field name="newPassword" validators={{ onChange: ({ value }) => !value ? "New password is required" : value.length < 6 ? "New password must be at least 6 characters" : undefined }}>
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name} className="font-semibold text-orange-900 dark:text-orange-100">New Password</Label>
                    <Input id={field.name} name={field.name} type="password" placeholder="Enter new password" value={field.state.value} onBlur={field.handleBlur} onChange={(event) => field.handleChange(event.target.value)} disabled={resetPasswordMutation.isPending} />
                    {field.state.meta.isTouched && field.state.meta.errors.length > 0 && <p className="text-xs font-medium text-red-500">{field.state.meta.errors[0]}</p>}
                  </div>
                )}
              </resetForm.Field>
            </div>
            <DialogFooter className="border-t border-orange-100 px-6 py-4 dark:border-orange-900/40">
              <Button type="button" variant="outline" onClick={() => handleResetDialogChange(false)} disabled={resetPasswordMutation.isPending}>Cancel</Button>
              <resetForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit || isSubmitting || resetPasswordMutation.isPending} className="bg-orange-500 font-semibold text-white hover:bg-orange-600">
                    {resetPasswordMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                    {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
                  </Button>
                )}
              </resetForm.Subscribe>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
