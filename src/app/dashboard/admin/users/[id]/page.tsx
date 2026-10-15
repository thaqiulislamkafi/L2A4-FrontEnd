"use client";

import * as React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Clock3,
  Hash,
  Loader2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { deleteUser, getUser } from "@/lib/api/user";
import type { User } from "@/types/auth.type";
import UserDetailsError from "./error";
import UserDetailsLoading from "./loading";
import UserDeleteDialog from "../(components)/UserDeleteDialog";
import UpdateUserDialog from "../(components)/UpdateUserDialog";

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getRoleClassName(role: User["role"]) {
  switch (role) {
    case "admin":
      return "border-orange-300 bg-orange-100 text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300";
    case "provider":
      return "border-amber-300 bg-amber-100 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300";
    default:
      return "border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-400";
  }
}

function getStatusClassName(status: string) {
  switch (status.toLowerCase()) {
    case "active":
      return "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400";
    case "inactive":
      return "border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-800 dark:bg-gray-950/30 dark:text-gray-400";
    case "blocked":
      return "border-red-200 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400";
    default:
      return "border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-400";
  }
}

function DetailItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl border border-orange-100 bg-orange-50/30 p-4 dark:border-orange-900/40 dark:bg-orange-950/10">
      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wide text-orange-500/80">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="mt-1 block break-words text-sm font-medium text-orange-950 hover:text-orange-600 dark:text-orange-100 dark:hover:text-orange-300"
          >
            {value}
          </a>
        ) : (
          <p className="mt-1 break-words text-sm font-medium text-orange-950 dark:text-orange-100">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

export default function UserDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const userId = params.id;
  const queryClient = useQueryClient();
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const userQuery = useQuery({
    queryKey: ["admin-user", userId],
    queryFn: () => getUser(userId),
    enabled: Boolean(userId),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(userId),
    onSuccess: async () => {
      toast.add({
        title: "User Deleted Successfully",
        description: "The user account has been permanently deleted.",
        type: "success",
      });

      await queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.removeQueries({ queryKey: ["admin-user", userId] });
      router.push("/dashboard/admin/users");
    },
    onError: () => {
      toast.add({
        title: "Unable to Delete User",
        description: "The user could not be deleted. Please try again.",
        type: "error",
      });
    },
  });

  if (userQuery.isLoading) {
    return <UserDetailsLoading />;
  }

  if (userQuery.isError || !userQuery.data) {
    return <UserDetailsError onRetry={() => userQuery.refetch()} />;
  }

  const user = userQuery.data;
  const name = user.name || "Unknown User";

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Back to users"
            onClick={() => router.push("/dashboard/admin/users")}
            className="shrink-0 rounded-xl border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-orange-950 dark:text-orange-50">
              User Details
            </h1>
            <p className="mt-1 text-sm text-orange-700/60 dark:text-orange-300/60">
              View account information and profile details.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsUpdateDialogOpen(true)}
            className="rounded-xl border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40"
          >
            <Pencil className="size-4" />
            Update
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsDeleteDialogOpen(true)}
            disabled={deleteMutation.isPending}
            className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            {deleteMutation.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Trash2 className="size-4" />
            )}
            Delete
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
        <CardContent className="p-5 md:p-7">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
            <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-orange-100 ring-2 ring-orange-200 ring-offset-4 ring-offset-white dark:bg-orange-950/60 dark:ring-orange-900/60 dark:ring-offset-orange-950/20">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={`${name}'s profile`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-orange-500 dark:text-orange-400">
                  <UserRound className="size-11" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="break-words text-2xl font-bold text-orange-950 dark:text-orange-50">
                {name}
              </h2>
              <p className="mt-1 break-all text-sm text-orange-700/70 dark:text-orange-300/70">
                {user.email || "No email available"}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                <Badge
                  variant="outline"
                  className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${getRoleClassName(user.role)}`}
                >
                  <ShieldCheck className="mr-1 size-3.5" />
                  {user.role}
                </Badge>
                <Badge
                  variant="outline"
                  className={`rounded-full px-3 py-1 text-[11px] font-bold capitalize tracking-wide ${getStatusClassName(user.status)}`}
                >
                  <span className="mr-1.5 size-1.5 rounded-full bg-current" />
                  {user.status || "Unknown"}
                </Badge>
                <Badge
                  variant="outline"
                  className={
                    user.emailVerified
                      ? "rounded-full border-green-200 bg-green-50 px-3 py-1 text-[11px] font-bold text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400"
                      : "rounded-full border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-bold text-orange-600 dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-400"
                  }
                >
                  <BadgeCheck className="mr-1 size-3.5" />
                  {user.emailVerified ? "Email verified" : "Email not verified"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        <Card className="overflow-hidden border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
          <CardHeader className="border-b border-orange-100 bg-orange-50/40 px-5 py-4 dark:border-orange-900/40 dark:bg-orange-950/20">
            <CardTitle className="flex items-center gap-2 text-base font-bold text-orange-950 dark:text-orange-50">
              <UserRound className="size-4 text-orange-500" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 p-5 sm:grid-cols-2">
            <DetailItem
              icon={Mail}
              label="Email address"
              value={user.email || "Not provided"}
              href={user.email ? `mailto:${user.email}` : undefined}
            />
            <DetailItem
              icon={Phone}
              label="Contact number"
              value={user.contact || "Not provided"}
              href={user.contact ? `tel:${user.contact}` : undefined}
            />
            <DetailItem
              icon={CalendarDays}
              label="Age"
              value={user.age == null ? "Not provided" : `${user.age} years`}
            />
            <DetailItem
              icon={MapPin}
              label="Address"
              value={user.address || "Not provided"}
            />
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
          <CardHeader className="border-b border-orange-100 bg-orange-50/40 px-5 py-4 dark:border-orange-900/40 dark:bg-orange-950/20">
            <CardTitle className="flex items-center gap-2 text-base font-bold text-orange-950 dark:text-orange-50">
              <Clock3 className="size-4 text-orange-500" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-5">
            <DetailItem icon={Hash} label="User ID" value={user.id} />
            <DetailItem
              icon={CalendarDays}
              label="Joined"
              value={formatDate(user.createdAt)}
            />
            <DetailItem
              icon={Clock3}
              label="Last updated"
              value={formatDate(user.updatedAt)}
            />
          </CardContent>
        </Card>
      </div>

      <UpdateUserDialog
        user={user}
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
      />
      <UserDeleteDialog
        user={user}
        open={isDeleteDialogOpen}
        isDeleting={deleteMutation.isPending}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() => deleteMutation.mutate()}
      />
    </div>
  );
}
