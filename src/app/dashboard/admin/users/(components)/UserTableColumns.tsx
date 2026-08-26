"use client";

import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AuthUser } from "@/store/auth.store";

function getInitials(name?: string | null) {
  if (!name) return "U";

  return name.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase();
}

function getRoleLabel(role?: string) {
  switch (role) {
    case "admin":
      return "Administrator";
    case "provider":
      return "Provider";
    case "user":
      return "User";
    default:
      return "Unknown";
  }
}

function getRoleClassName(role?: string) {
  switch (role) {
    case "admin":
      return "border-orange-300 bg-orange-100 text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300";
    case "provider":
      return "border-amber-300 bg-amber-100 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300";
    default:
      return "border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-400";
  }
}

function getStatusClassName(status?: string) {
  switch (status?.toLowerCase()) {
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

function formatDate(date?: string | Date) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export const UserTableColumns = (onDelete: (user: AuthUser) => void): ColumnDef<AuthUser>[] => [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex min-w-55 items-center gap-3">
          {user.image ? (
            <Image src={user.image} alt={user.name ?? "User"} width={40} height={40} className="size-10 shrink-0 rounded-lg object-cover ring-1 ring-orange-200 dark:ring-orange-900/50" />
          ) : (
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-sm font-bold text-orange-600 ring-1 ring-orange-200 dark:bg-orange-950/50 dark:text-orange-400 dark:ring-orange-900/50">
              {getInitials(user.name)}
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-orange-950 dark:text-orange-50">{user.name ?? "Unknown User"}</p>
            <p className="truncate text-xs font-medium text-orange-600/60 dark:text-orange-300/60">{user.id}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="font-medium text-orange-800 dark:text-orange-200">{row.original.email}</span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant="outline" className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${getRoleClassName(row.original.role)}`}>
        {getRoleLabel(row.original.role)}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className={`rounded-full px-2.5 py-1 text-[10px] font-bold capitalize tracking-wide ${getStatusClassName(row.original.status)}`}>
        <span className="mr-1.5 size-1.5 rounded-full bg-current" />
        {row.original.status ?? "Unknown"}
      </Badge>
    ),
  },
  {
    accessorKey: "emailVerified",
    header: "Verification",
    cell: ({ row }) => {
      const verified = row.original.emailVerified;

      return (
        <Badge variant="outline" className={verified ? "rounded-full border-green-200 bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400" : "rounded-full border-orange-200 bg-orange-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-600 dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-400"}>
          {verified ? "Verified" : "Unverified"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => (
      <span className="font-medium text-orange-800 dark:text-orange-200">{row.original.contact || "—"}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <span className="font-medium text-orange-700/70 dark:text-orange-300/70">{formatDate(row.original.createdAt)}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={`Actions for ${user.name}`} />}>
            <MoreHorizontal className="size-4 text-orange-600 dark:text-orange-400" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44 rounded-xl border-orange-200 bg-white p-1.5 dark:border-orange-900/50 dark:bg-orange-950">
            <DropdownMenuItem render={<Link href={`/dashboard/admin/users/${user.id}`} />} className="cursor-pointer rounded-lg font-medium text-orange-800 focus:bg-orange-100 focus:text-orange-700 dark:text-orange-200 dark:focus:bg-orange-950/60 dark:focus:text-orange-300">
              <Eye className="size-4 text-orange-500 dark:text-orange-400" />
              <span>View User</span>
            </DropdownMenuItem>

            <DropdownMenuItem render={<Link href={`/dashboard/admin/users/${user.id}/edit`} />} className="cursor-pointer rounded-lg font-medium text-orange-800 focus:bg-orange-100 focus:text-orange-700 dark:text-orange-200 dark:focus:bg-orange-950/60 dark:focus:text-orange-300">
              <Pencil className="size-4 text-orange-500 dark:text-orange-400" />
              <span>Edit User</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-orange-100 dark:bg-orange-900/40" />

            <DropdownMenuItem onClick={() => onDelete(user)} className="cursor-pointer rounded-lg font-medium text-red-600 focus:bg-red-50 focus:text-red-600 dark:text-red-400 dark:focus:bg-red-950/30 dark:focus:text-red-400">
              <Trash2 className="size-4" />
              <span>Delete User</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

