"use client";

import * as React from "react";
import { Loader2, Mail, Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

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
import { sendChangeEmailOtp } from "@/lib/api/auth";

interface NewEmailModalProps {
  currentEmail: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOtpSent: (newEmail: string) => void;
}

export default function NewEmailModal({
  currentEmail,
  open,
  onOpenChange,
  onOtpSent,
}: NewEmailModalProps) {
  const mutation = useMutation({
    mutationFn: (newEmail: string) => sendChangeEmailOtp({ newEmail }),
    onSuccess: (response, newEmail) => {
      if (!response.success) {
        toast.add({
          title: "OTP Sending Failed",
          description: response.message || "Unable to send an OTP.",
          type: "error",
        });
        return;
      }

      form.reset();
      onOpenChange(false);
      onOtpSent(newEmail);
      toast.add({
        title: "OTP Sent Successfully!",
        description: `A verification code has been sent to ${newEmail}.`,
        type: "success",
      });
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      toast.add({
        title: "OTP Sending Failed",
        description: message || "Unable to send an OTP. Please try again.",
        type: "error",
      });
    },
  });

  const form = useForm({
    defaultValues: { newEmail: "" },
    onSubmit: async ({ value }) => {
      mutation.mutate(value.newEmail.trim());
    },
  });

  const handleClose = (value: boolean) => {
    if (mutation.isPending) return;
    onOpenChange(value);
    if (!value) form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[min(92vw,460px)] rounded-2xl border-orange-200/80 bg-white shadow-2xl shadow-orange-950/10 dark:border-orange-900/50 dark:bg-orange-950/95">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-orange-950 dark:text-orange-50">
            <Mail className="size-5 text-orange-500" />
           Enter Your New Email
          </DialogTitle>
          <DialogDescription className="text-orange-700/60 dark:text-orange-300/60">
            Enter the new email address where we will send your verification code.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}>
          <div className="space-y-2 py-3">
            <form.Field
              name="newEmail"
              validators={{
                onChange: ({ value }) => {
                  if (!value.trim()) return "New email is required";
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
                    return "Enter a valid email address";
                  }
                  if (value.trim().toLowerCase() === currentEmail.toLowerCase()) {
                    return "New email must be different from your current email";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <>
                  <Label htmlFor="new-email" className="font-semibold text-orange-900 dark:text-orange-100">
                    New Email
                  </Label>
                  <Input
                    id="new-email"
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="you@example.com"
                    disabled={mutation.isPending}
                    className="border-orange-200 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-800 dark:bg-orange-950/30"
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <p className="text-xs font-medium text-red-600">{field.state.meta.errors[0]}</p>
                  )}
                </>
              )}
            </form.Field>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleClose(false)} disabled={mutation.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending} className="bg-orange-500 text-white hover:bg-orange-600">
              {mutation.isPending ? <><Loader2 className="size-4 animate-spin" /> Sending...</> : <><Send className="size-4" /> Send OTP</>}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
