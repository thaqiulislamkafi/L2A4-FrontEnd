"use client";

import * as React from "react";
import { Loader2, MailCheck, ShieldCheck } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/components/ui/toast";
import { verifyChangedEmail } from "@/lib/api/auth";

interface VerifyChangedEmailDialogProps {
  newEmail: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function VerifyChangedEmailDialog({
  newEmail,
  open,
  onOpenChange,
}: VerifyChangedEmailDialogProps) {
  const [otp, setOtp] = React.useState("");
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: () => verifyChangedEmail({ newEmail, otp }),
    onSuccess: async (response) => {
      if (!response.success || !response.data?.success) {
        toast.add({ title: "Email Change Failed", description: response.message || "The OTP could not be verified.", type: "error" });
        return;
      }
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.add({ title: "Email Changed Successfully!", description: response.message, type: "success" });
      setOtp("");
      onOpenChange(false);
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.add({ title: "Email Change Failed", description: message || "Invalid or expired OTP. Please try again.", type: "error" });
    },
  });

  const handleClose = (value: boolean) => {
    if (mutation.isPending) return;
    if (!value) setOtp("");
    onOpenChange(value);
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast.add({ title: "OTP Required", description: "Please enter the complete 6-digit verification code.", type: "warning" });
      return;
    }
    mutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[min(92vw,460px)] rounded-2xl border-orange-200/80 bg-white shadow-2xl shadow-orange-950/10 dark:border-orange-900/50 dark:bg-orange-950/95">
        <DialogHeader>
          <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-orange-100 text-orange-500 dark:bg-orange-950/60 dark:text-orange-400">
            <MailCheck className="size-7" />
          </div>
          <DialogTitle className="text-center text-xl font-bold text-orange-950 dark:text-orange-50">Input OTP</DialogTitle>
          <DialogDescription className="text-center text-orange-700/60 dark:text-orange-300/60">
            Enter the 6-digit code sent to <span className="font-semibold text-orange-700 dark:text-orange-300">{newEmail}</span>.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-3">
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp} disabled={mutation.isPending} aria-label="Email change verification code">
              <InputOTPGroup className="rounded-lg">
                {Array.from({ length: 6 }, (_, index) => (
                  <InputOTPSlot key={index} index={index} className="size-10 border-orange-200 text-orange-900 dark:border-orange-800 dark:text-orange-50" />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50/60 px-4 py-3 dark:border-orange-900/50 dark:bg-orange-950/30">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-orange-500" />
            <p className="text-xs leading-relaxed text-orange-700/70 dark:text-orange-300/70">This code may expire after a short period.</p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => handleClose(false)} disabled={mutation.isPending}>Cancel</Button>
          <Button type="button" onClick={handleVerify} disabled={otp.length !== 6 || mutation.isPending} className="bg-orange-500 text-white hover:bg-orange-600">
            {mutation.isPending ? <><Loader2 className="size-4 animate-spin" /> Verifying...</> : <><MailCheck className="size-4" /> Change Email</>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
