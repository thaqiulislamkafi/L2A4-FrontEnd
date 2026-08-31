"use client";

import * as React from "react";
import Image from "next/image";
import { AlertTriangle, Camera, CheckCircle2, Mail, ShieldCheck, UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/types/auth.type";
import ImageUpdateDialog from "./ImageUpdateDialog";
import { toast } from "@/components/ui/toast";
import { useMutation} from "@tanstack/react-query";
import { sendEmailOtp } from "@/lib/api/auth";
import VerifyEmailDialog from "./VerifyEmailDialog";
import NewEmailModal from "./NewEmailModal";
import VerifyChangedEmailDialog from "./VerifyChangedEmailDialog";

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {

  const isVerified = user.emailVerified;
  const isActive = user.status.toLowerCase() === "active";

  const [ImageUpdateDialogOpen, setIsImageUpdateDialogOpen] = React.useState(false);

  const handleImageDialogChange = (open: boolean) => {
    setIsImageUpdateDialogOpen(open);
  };

  const [verifyEmailDialogOpen, setVerifyEmailDialogOpen] = React.useState(false);
  const [newEmailModalOpen, setNewEmailModalOpen] = React.useState(false);
  const [verifyChangedEmailDialogOpen, setVerifyChangedEmailDialogOpen] = React.useState(false);
  const [pendingEmail, setPendingEmail] = React.useState("");

  const sendOtpMutation = useMutation({
    mutationFn: () => sendEmailOtp({ email: user.email }),

    onSuccess: (response) => {
      if (!response.success) {
        toast.add({
          title: "OTP Sending Failed",
          description: response.message || "Unable to send verification OTP.",
          type: "error",
        });

        return;
      }

      setVerifyEmailDialogOpen(true);

      toast.add({
        title: "OTP Sent Successfully!",
        description: `A verification code has been sent to ${user.email}.`,
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

  const handleVerifyEmail = () => {
    if (sendOtpMutation.isPending) {
      return;
    }

    sendOtpMutation.mutate();
  };

  const handleEmailVerified = () => {
    setVerifyEmailDialogOpen(false);
  };


  return (
    <div>
      <Card className="overflow-hidden border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
        <div className="h-28 bg-linear-to-r from-orange-500 via-orange-400 to-amber-400 dark:from-orange-700 dark:via-orange-600 dark:to-amber-600" />

        <CardContent className="-mt-10 px-6 pb-6">
          <div className=" flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
              <div className="">
                {user.image ? (
                  <Image src={user.image} alt={user.name} width={112} height={112} className="size-28 rounded-2xl object-cover bg-white p-1 shadow-lg ring-4 ring-white dark:bg-orange-950 dark:ring-orange-950" />
                ) : (
                  <div className="flex size-28 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 shadow-lg ring-4 ring-white dark:bg-orange-950/80 dark:text-orange-400 dark:ring-orange-950">
                    <UserCircle className="size-16" />
                  </div>
                )}

                <Button type="button" size="icon" className="absolute -bottom-2 -right-2 size-9 rounded-full border-4 border-white bg-orange-500 text-white shadow-md hover:bg-orange-600 dark:border-orange-950" aria-label="Change profile image">
                  <Camera className="size-4" />
                </Button>
              </div>

              <div className="space-y-2 pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight text-orange-950 dark:text-orange-50">
                    {user.name}
                  </h1>

                  <Badge variant="outline" className="rounded-full border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-semibold capitalize text-orange-700 dark:border-orange-800 dark:bg-orange-950/40 dark:text-orange-300">
                    <ShieldCheck className="mr-1 size-3.5" />
                    {user.role}
                  </Badge>

                  {isActive && (
                    <Badge variant="outline" className="rounded-full border-green-200 bg-green-50 px-2.5 py-1 text-xs font-semibold capitalize text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400">
                      <CheckCircle2 className="mr-1 size-3.5" />
                      Active
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-orange-700/60 dark:text-orange-300/60">
                  <span className="flex items-center gap-1.5">
                    <Mail className="size-4" />
                    {user.email}
                  </span>

                  {isVerified ?
                    (<span className="flex items-center gap-1.5 text-green-600 dark:text-green-400"> <CheckCircle2 className="size-4" />
                      Email Verified
                    </span>) :
                    (
                      <Button type="button" variant="outline" onClick={handleVerifyEmail} disabled={sendOtpMutation.isPending}
                        className="h-8  rounded-lg border-amber-300 bg-amber-50 px-3 text-xs font-semibold text-amber-700 hover:bg-amber-100 hover:text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400 dark:hover:bg-amber-950/50">
                        <AlertTriangle className="size-3.5" />
                        Verify Email
                      </Button>)
                  }
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={() => handleImageDialogChange(true)} type="button" variant="outline" className="rounded-lg border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40">
                <Camera className="size-4" />
                Change Image
              </Button>

              <Button type="button" variant="outline" onClick={() => setNewEmailModalOpen(true)} className="rounded-lg border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40">
                <Mail className="size-4" />
                Change Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ImageUpdateDialog imageDialogOpen={ImageUpdateDialogOpen} user={user} onOpenChange={handleImageDialogChange} />

      <VerifyEmailDialog email={user.email} open={verifyEmailDialogOpen} onOpenChange={setVerifyEmailDialogOpen} onVerified={handleEmailVerified} />
      <NewEmailModal
        currentEmail={user.email}
        open={newEmailModalOpen}
        onOpenChange={setNewEmailModalOpen}
        onOtpSent={(newEmail) => {
          setPendingEmail(newEmail);
          setVerifyChangedEmailDialogOpen(true);
        }}
      />
      <VerifyChangedEmailDialog
        newEmail={pendingEmail}
        open={verifyChangedEmailDialogOpen}
        onOpenChange={setVerifyChangedEmailDialogOpen}
      />

    </div>

  );
}