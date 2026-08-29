"use client";

import * as React from "react";
import Image from "next/image";
import { Camera, CheckCircle2, Mail, ShieldCheck, UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/types/auth.type";

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const isVerified = user.emailVerified;
  const isActive = user.status.toLowerCase() === "active";

  return (
    <Card className="overflow-hidden border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
      <div className="h-28 bg-linear-to-r from-orange-500 via-orange-400 to-amber-400 dark:from-orange-700 dark:via-orange-600 dark:to-amber-600" />

      <CardContent className="relative px-6 pb-6">
        <div className="-mt-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
            <div className="relative">
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

                {isVerified && (
                  <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="size-4" />
                    Email Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" variant="outline" className="rounded-lg border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40">
              <Camera className="size-4" />
              Change Image
            </Button>

            <Button type="button" variant="outline" className="rounded-lg border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40">
              <Mail className="size-4" />
              Change Email
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}