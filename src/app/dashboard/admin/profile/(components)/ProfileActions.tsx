"use client";

import * as React from "react";
import { KeyRound, LogOut, Pencil, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfileActions() {
  return (
    <Card className="border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
      <CardHeader className="border-b border-orange-100 px-5 py-4 dark:border-orange-900/40">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-orange-950 dark:text-orange-50">
          <ShieldAlert className="size-5 text-orange-500" />
          Account Actions
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-3 p-5 sm:grid-cols-3">
        <Button type="button" variant="outline" className="h-auto min-h-16 justify-start gap-3 rounded-xl border-orange-200 px-4 py-3 text-left text-orange-800 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40">
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

        <Button type="button" variant="outline" className="h-auto min-h-16 justify-start gap-3 rounded-xl border-orange-200 px-4 py-3 text-left text-orange-800 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
            <LogOut className="size-4" />
          </div>

          <div className="flex min-w-0 flex-col items-start">
            <span className="text-sm font-semibold">Logout All Sessions</span>
            <span className="text-xs font-normal text-orange-700/50 dark:text-orange-300/50">
              Sign out from every device
            </span>
          </div>
        </Button>

        <Button type="button" className="h-auto min-h-16 justify-start gap-3 rounded-xl bg-orange-500 px-4 py-3 text-left text-white shadow-sm shadow-orange-500/20 transition-all hover:-translate-y-0.5 hover:bg-orange-600">
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
  );
}