"use client";

import * as React from "react";
import { Loader2, MailCheck, RefreshCw, ShieldCheck } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {InputOTP,InputOTPGroup,InputOTPSlot,} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/toast";

import {sendEmailOtp,verifyEmailOtp,} from "@/lib/api/auth";

interface VerifyEmailDialogProps {
    email: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onVerified: () => void;
}

export default function VerifyEmailDialog({
    email,
    open,
    onOpenChange,
    onVerified,
}: VerifyEmailDialogProps) {

    const [otp, setOtp] = React.useState("");
    const queryClient = useQueryClient();

    const sendOtpMutation = useMutation({
        mutationFn: () => sendEmailOtp({ email }),

        onSuccess: (response) => {
            if (!response.success) {
                toast.add({
                    title: "OTP Sending Failed",
                    description: response.message || "Unable to send verification OTP.",
                    type: "error",
                });

                return;
            }

            toast.add({
                title: "OTP Sent Successfully!",
                description: `A verification code has been sent to ${email}.`,
                type: "success",
            });
        },

        onError: (error: unknown) => {
            const message = (
                error as {
                    response?: {
                        data?: {
                            message?: string;
                        };
                    };
                }
            )?.response?.data?.message;

            toast.add({
                title: "OTP Sending Failed",
                description: message || "Unable to send verification OTP. Please try again.",
                type: "error",
            });
        },
    });

    const verifyOtpMutation = useMutation({
        mutationFn: async() =>
         await verifyEmailOtp({email,otp}),

        onSuccess: async (response) => {

            if (!response.success || !response.data.status) {
                toast.add({
                    title: "Verification Failed",
                    description: response.message || "The OTP could not be verified.",
                    type: "error",
                });

                return;
            }
            await queryClient.invalidateQueries({
                queryKey: ["admin-profile"],
            });

            toast.add({
                title: "Email Verified Successfully!",
                description: "Your email address has been verified successfully.",
                type: "success",
            });

            setOtp("");
            onOpenChange(false);
            onVerified();
        },

        onError: (error: unknown) => {
            const message = (
                error as {
                    response?: {
                        data?: {
                            message?: string;
                        };
                    };
                }
            )?.response?.data?.message;

            toast.add({
                title: "Verification Failed",
                description: message || "Invalid or expired OTP. Please try again.",
                type: "error",
            });
        },
    });

    const handleVerify = () => {
        if (otp.length !== 6) {
            toast.add({
                title: "OTP Required",
                description: "Please enter the complete 6-digit verification code.",
                type: "warning",
            });

            return;
        }

        verifyOtpMutation.mutate();
    };

    const handleResend = () => {
        if (sendOtpMutation.isPending || verifyOtpMutation.isPending) {
            return;
        }
        setOtp("");
        sendOtpMutation.mutate();
    };

    const handleClose = (value: boolean) => {
        if (sendOtpMutation.isPending || verifyOtpMutation.isPending) {
            return;
        }

        if (!value) {
            setOtp("");
        }

        onOpenChange(value);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-[min(92vw,460px)] rounded-2xl border-orange-200/80 bg-white shadow-2xl shadow-orange-950/10 dark:border-orange-900/50 dark:bg-orange-950/95">
                <DialogHeader>
                    <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-orange-100 text-orange-500 dark:bg-orange-950/60 dark:text-orange-400">
                        <MailCheck className="size-7" />
                    </div>

                    <DialogTitle className="text-center text-xl font-bold text-orange-950 dark:text-orange-50">
                        Verify Your Email
                    </DialogTitle>

                    <DialogDescription className="text-center text-sm text-orange-700/60 dark:text-orange-300/60">
                        We have sent a 6-digit verification code to{" "}
                        <span className="font-semibold text-orange-700 dark:text-orange-300">
                            {email}
                        </span>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 py-3">
                    <div className="space-y-3">
                        <Label className="font-semibold text-orange-900 dark:text-orange-100">
                            Verification Code
                        </Label>

                        <div className="flex justify-center">
                            <InputOTP
                                maxLength={6}
                                value={otp}
                                onChange={setOtp}
                                disabled={verifyOtpMutation.isPending}
                                aria-label="Email verification code"
                            >
                                <InputOTPGroup className="rounded-lg">
                                    <InputOTPSlot index={0} className="size-10 border-orange-200 text-orange-900 dark:border-orange-800 dark:text-orange-50" />
                                    <InputOTPSlot index={1} className="size-10 border-orange-200 text-orange-900 dark:border-orange-800 dark:text-orange-50" />
                                    <InputOTPSlot index={2} className="size-10 border-orange-200 text-orange-900 dark:border-orange-800 dark:text-orange-50" />
                                    <InputOTPSlot index={3} className="size-10 border-orange-200 text-orange-900 dark:border-orange-800 dark:text-orange-50" />
                                    <InputOTPSlot index={4} className="size-10 border-orange-200 text-orange-900 dark:border-orange-800 dark:text-orange-50" />
                                    <InputOTPSlot index={5} className="size-10 border-orange-200 text-orange-900 dark:border-orange-800 dark:text-orange-50" />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                    </div>

                    <div className="rounded-xl border border-orange-200 bg-orange-50/60 px-4 py-3 dark:border-orange-900/50 dark:bg-orange-950/30">
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-orange-500" />

                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-orange-900 dark:text-orange-100">
                                    Check your inbox
                                </p>

                                <p className="text-xs leading-relaxed text-orange-700/60 dark:text-orange-300/60">
                                    Enter the verification code sent to your email. The code may
                                    expire after a short period.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center text-sm">
                        <span className="text-orange-700/60 dark:text-orange-300/60">
                            Didnt receive the code?{" "}
                        </span>

                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={sendOtpMutation.isPending || verifyOtpMutation.isPending}
                            className="inline-flex items-center gap-1 font-semibold text-orange-600 underline-offset-4 transition-colors hover:text-orange-700 hover:underline disabled:pointer-events-none disabled:opacity-50 dark:text-orange-400 dark:hover:text-orange-300"
                        >
                            {sendOtpMutation.isPending ? (
                                <>
                                    <Loader2 className="size-3.5 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="size-3.5" />
                                    Resend OTP
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleClose(false)}
                        disabled={sendOtpMutation.isPending || verifyOtpMutation.isPending}
                        className="rounded-lg border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        onClick={handleVerify}
                        disabled={otp.length !== 6 || verifyOtpMutation.isPending}
                        className="rounded-lg bg-orange-500 font-semibold text-white shadow-sm shadow-orange-500/20 hover:bg-orange-600"
                    >
                        {verifyOtpMutation.isPending ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            <>
                                <MailCheck className="size-4" />
                                Verify Email
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}