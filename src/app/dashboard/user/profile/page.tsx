"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import {
  AlertTriangle,
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock3,
  KeyRound,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldAlert,
  ShieldCheck,
  User,
  UserCircle,
  UserRound,
  UserRoundCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/lib/api/auth";
import { useAuthStore } from "@/store/auth.store";
import { User as AuthUser } from "@/types/auth.type";

import ProfileError from "./error";
import ProfileLoading from "./loading";

export default function UserProfilePage() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  const profileQuery = useQuery({
    queryKey: ["user-profile", userId],
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

function ProfileHeader({ user }: { user: AuthUser }) {
  const isVerified = user.emailVerified;
  const isActive = user.status.toLowerCase() === "active";

  return (
    <div>
      <Card className="overflow-hidden border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
        <div className="h-28 bg-linear-to-r from-orange-500 via-orange-400 to-amber-400 dark:from-orange-700 dark:via-orange-600 dark:to-amber-600" />

        <CardContent className="-mt-10 px-6 pb-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
              <div className="relative">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={112}
                    height={112}
                    className="size-28 rounded-2xl bg-white object-cover p-1 shadow-lg ring-4 ring-white dark:bg-orange-950 dark:ring-orange-950"
                  />
                ) : (
                  <div className="flex size-28 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 shadow-lg ring-4 ring-white dark:bg-orange-950/80 dark:text-orange-400 dark:ring-orange-950">
                    <UserCircle className="size-16" />
                  </div>
                )}

                <Button
                  type="button"
                  size="icon"
                  className="absolute -bottom-2 -right-2 size-9 rounded-full border-4 border-white bg-orange-500 text-white shadow-md hover:bg-orange-600 dark:border-orange-950"
                  aria-label="Change profile image"
                >
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

                  {isVerified ? (
                    <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                      <CheckCircle2 className="size-4" />
                      Email Verified
                    </span>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      className="h-8 rounded-lg border-amber-300 bg-amber-50 px-3 text-xs font-semibold text-amber-700 hover:bg-amber-100 hover:text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400 dark:hover:bg-amber-950/50"
                    >
                      <AlertTriangle className="size-3.5" />
                      Verify Email
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-lg border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40"
              >
                <Camera className="size-4" />
                Change Image
              </Button>

              <Button
                type="button"
                variant="outline"
                className="rounded-lg border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40"
              >
                <Mail className="size-4" />
                Change Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileActions({ user }: { user: AuthUser }) {
  void user;

  return (
    <Card className="border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
      <CardHeader className="border-b border-orange-100 px-5 py-4 dark:border-orange-900/40">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-orange-950 dark:text-orange-50">
          <ShieldAlert className="size-5 text-orange-500" />
          Account Actions
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-3 p-5 sm:grid-cols-3">
        <Button
          type="button"
          variant="outline"
          className="h-auto min-h-16 justify-start gap-3 rounded-xl border-orange-200 px-4 py-3 text-left text-orange-800 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40"
        >
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

        <Button
          type="button"
          variant="outline"
          className="h-auto min-h-16 justify-start gap-3 rounded-xl border-orange-200 px-4 py-3 text-left text-orange-800 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
            <ShieldAlert className="size-4" />
          </div>

          <div className="flex min-w-0 flex-col items-start">
            <span className="text-sm font-semibold">Logout All Sessions</span>
            <span className="text-xs font-normal text-orange-700/50 dark:text-orange-300/50">
              Sign out from other devices
            </span>
          </div>
        </Button>

        <Button
          type="button"
          className="h-auto min-h-16 justify-start gap-3 rounded-xl bg-orange-500 px-4 py-3 text-left text-white shadow-sm shadow-orange-500/20 transition-all hover:-translate-y-0.5 hover:bg-orange-600"
        >
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

function ProfileInformation({ user }: { user: AuthUser }) {
  const isVerified = user.emailVerified;
  const isActive = user.status.toLowerCase() === "active";

  return (
    <Card className="border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
      <CardHeader className="border-b border-orange-100 px-5 py-4 dark:border-orange-900/40">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-orange-950 dark:text-orange-50">
          <UserRoundCheck className="size-5 text-orange-500" />
          Personal Information
        </CardTitle>
      </CardHeader>

      <CardContent className="p-5">
        <div className="grid gap-5 md:grid-cols-2">
          <InformationItem icon={User} label="Full Name" value={user.name || "Not provided"} />
          <InformationItem icon={Mail} label="Email Address" value={user.email || "Not provided"} />

          <InformationItem icon={Phone} label="Contact Number" value={user.contact || "Not provided"} />
          <InformationItem icon={CalendarDays} label="Age" value={user.age ? `${user.age} years` : "Not provided"} />

          <InformationItem icon={MapPin} label="Address" value={user.address || "Not provided"} className="md:col-span-2" />
        </div>

        <Separator className="my-6 bg-orange-100 dark:bg-orange-900/40" />

        <div className="grid gap-5 md:grid-cols-2">
          <InformationItem icon={ShieldCheck} label="Account Role">
            <Badge variant="outline" className="w-fit rounded-full border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-semibold capitalize text-orange-700 dark:border-orange-800 dark:bg-orange-950/40 dark:text-orange-300">
              <ShieldCheck className="mr-1 size-3.5" />
              {user.role}
            </Badge>
          </InformationItem>

          <InformationItem icon={UserRoundCheck} label="Account Status">
            <Badge
              variant="outline"
              className={
                isActive
                  ? "w-fit rounded-full border-green-200 bg-green-50 px-2.5 py-1 text-xs font-semibold capitalize text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400"
                  : "w-fit rounded-full border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold capitalize text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
              }
            >
              {user.status}
            </Badge>
          </InformationItem>

          <InformationItem icon={Mail} label="Email Verification">
            <Badge
              variant="outline"
              className={
                isVerified
                  ? "w-fit rounded-full border-green-200 bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400"
                  : "w-fit rounded-full border-yellow-200 bg-yellow-50 px-2.5 py-1 text-xs font-semibold text-yellow-700 dark:border-yellow-900/50 dark:bg-yellow-950/30 dark:text-yellow-400"
              }
            >
              {isVerified ? "Verified" : "Not Verified"}
            </Badge>
          </InformationItem>
        </div>

        <Separator className="my-6 bg-orange-100 dark:bg-orange-900/40" />

        <div className="grid gap-5 md:grid-cols-2">
          <InformationItem icon={CalendarDays} label="Account Created" value={format(new Date(user.createdAt), "dd MMM yyyy, hh:mm a")} />
          <InformationItem icon={Clock3} label="Last Updated" value={format(new Date(user.updatedAt), "dd MMM yyyy, hh:mm a")} />
        </div>
      </CardContent>
    </Card>
  );
}

interface InformationItemProps {
  icon: React.ElementType;
  label: string;
  value?: string;
  className?: string;
  children?: React.ReactNode;
}

function InformationItem({ icon: Icon, label, value, className = "", children }: InformationItemProps) {
  return (
    <div className={`flex gap-3 rounded-xl border border-orange-100 bg-orange-50/30 p-4 transition-colors hover:bg-orange-50/60 dark:border-orange-900/30 dark:bg-orange-950/10 dark:hover:bg-orange-950/20 ${className}`}>
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-700/50 dark:text-orange-300/50">
          {label}
        </p>

        {children ?? (
          <p className="wrap-break-word text-sm font-semibold text-orange-950 dark:text-orange-50">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}
