"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { UserRound } from "lucide-react";

import { useAuthStore } from "@/store/auth.store";

import ProfileLoading from "./loading";
import ProfileError from "./error";


import { Card, CardContent } from "@/components/ui/card";
import { getUser } from "@/lib/api/auth";
import ProfileHeader from "@/components/shared/profile/ProfileHeader";
import ProfileActions from "@/components/shared/profile/ProfileActions";
import ProfileInformation from "@/components/shared/profile/ProfileInformation";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  const userId = user?.id;

  const profileQuery = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => {
      if (!userId) {
        throw new Error("User ID not found");
      }

      return getUser(userId);
    },
    enabled: Boolean(userId),
  });

  if (profileQuery.isLoading || !userId) {
    return <ProfileLoading />;
  }

  if (profileQuery.isError || !profileQuery.data) {
    return <ProfileError onRetry={() => profileQuery.refetch()} />;
  }

  const profile = profileQuery.data;

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
            <UserRound className="size-5" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-orange-950 dark:text-orange-50">
            My Profile
          </h1>
        </div>

        <p className="mt-1 text-sm font-medium text-orange-700/60 dark:text-orange-300/60">
          Manage your account information and preferences.
        </p>
      </div>

      <ProfileHeader user={profile} />

      <ProfileActions user={profile} />

      <ProfileInformation user={profile} />

      {profileQuery.isFetching && (
        <Card className="border-orange-200/70 bg-orange-50/50 shadow-none dark:border-orange-900/40 dark:bg-orange-950/20">
          <CardContent className="flex items-center justify-center gap-2 py-3 text-xs font-medium text-orange-600 dark:text-orange-400">
            <span className="size-2 animate-pulse rounded-full bg-orange-500" />
            Refreshing profile information...
          </CardContent>
        </Card>
      )}
    </div>
  );
}