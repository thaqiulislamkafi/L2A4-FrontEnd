"use client";

import * as React from "react";
import { KeyRound, Loader2, LogOut, Pencil, ShieldAlert } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

import { logoutAllSessions } from "@/lib/api/auth";
import ChangePasswordDialog from "./ChangePasswordDialog";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { User } from "@/types/auth.type";

interface ProfileActionsProps {
  user: User;
}

export default function ProfileActions({ user }: ProfileActionsProps) {
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] = React.useState(false);
  const [updateProfileDialogOpen, setUpdateProfileDialogOpen] = React.useState(false);



  const logoutAllMutation = useMutation({
    mutationFn: logoutAllSessions,
    onSuccess: (response) => {
      toast.add({
        title: "Logged Out Successfully",
        description: response?.message || "You have been logged out from all sessions.",
        type: "success",
      });

    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;

      toast.add({
        title: "Logout Failed",
        description: message || "Unable to logout from all sessions. Please try again.",
        type: "error",
      });
    },
  });

  const handleLogoutAllSessions = () => {
    if (logoutAllMutation.isPending) {
      return;
    }

    logoutAllMutation.mutate();
  };



  return (
    <>
      <Card className="border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
        <CardHeader className="border-b border-orange-100 px-5 py-4 dark:border-orange-900/40">
          <CardTitle className="flex items-center gap-2 text-base font-bold text-orange-950 dark:text-orange-50">
            <ShieldAlert className="size-5 text-orange-500" />
            Account Actions
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-3 p-5 sm:grid-cols-3">
          <Button type="button" variant="outline" onClick={() => setChangePasswordDialogOpen(true)} disabled={logoutAllMutation.isPending} className="h-auto min-h-16 justify-start gap-3 rounded-xl border-orange-200 px-4 py-3 text-left text-orange-800 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
              <KeyRound className="size-4" />
            </div>

            <div className="flex min-w-0 flex-col items-start">
              <span className="text-sm font-semibold">Change Password</span>
              <span className="text-xs font-normal text-orange-700/50 dark:text-orange-300/50">
                Update your account password
              </span>
            </div>
          </Button>

          <Button type="button" variant="outline" onClick={handleLogoutAllSessions} disabled={logoutAllMutation.isPending} className="h-auto min-h-16 justify-start gap-3 rounded-xl border-orange-200 px-4 py-3 text-left text-orange-800 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
              {logoutAllMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <LogOut className="size-4" />}
            </div>

            <div className="flex min-w-0 flex-col items-start">
              <span className="text-sm font-semibold">
                {logoutAllMutation.isPending ? "Logging Out..." : "Logout All Sessions"}
              </span>
              <span className="text-xs font-normal text-orange-700/50 dark:text-orange-300/50">
                {logoutAllMutation.isPending ? "Signing out from other devices" : "Sign out from other device"}
              </span>
            </div>
          </Button>

          <Button type="button" onClick={() => setUpdateProfileDialogOpen(true)} disabled={logoutAllMutation.isPending} className="h-auto min-h-16 justify-start gap-3 rounded-xl bg-orange-500 px-4 py-3 text-left text-white shadow-sm shadow-orange-500/20 transition-all hover:-translate-y-0.5 hover:bg-orange-600">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-white">
              <Pencil className="size-4" />
            </div>

            <div className="flex min-w-0 flex-col items-start">
              <span className="text-sm font-semibold">Edit Profile</span>
              <span className="text-xs font-normal text-orange-100">
                Update your profile information
              </span>
            </div>
          </Button>
        </CardContent>
      </Card>

      <ChangePasswordDialog open={changePasswordDialogOpen} onOpenChange={setChangePasswordDialogOpen} />
      <UpdateProfileDialog user={user} open={updateProfileDialogOpen} onOpenChange={setUpdateProfileDialogOpen} />

    </>
  );
}