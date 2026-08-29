/* eslint-disable react-hooks/incompatible-library */
"use client";

import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { UserCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {Card,CardContent,CardDescription,CardHeader,CardTitle,
} from "@/components/ui/card";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,
} from "@/components/ui/table";
import Image from "next/image";

export interface RecentUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  contact: string;
  age: number | null;
  address: string | null;
  role: "admin" | "provider" | "user";
  status: string;
}

interface RecentUsersTableProps {
  users: RecentUser[];
}

function getRoleLabel(role: RecentUser["role"]) {
  switch (role) {
    case "admin":
      return "Administrator";

    case "provider":
      return "Provider";

    case "user":
      return "User";

    default:
      return role;
  }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function UserImage({
  image,
  name,
}: {
  image: string | null;
  name: string;
}) {
  const [imageError, setImageError] = React.useState(false);

  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (!image || imageError) {
    return (
      <div
        className=" flex size-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600 ring-1 ring-orange-200 dark:bg-orange-950/50 dark:text-orange-400 dark:ring-orange-900/50
        "
      >
        {image ? (
          <UserCircle className="size-5" />
        ) : (
          initials
        )}
      </div>
    );
  }

  return (
    <Image
      src={image}
      alt={name}
      width={36}
      height={36}
      className=" size-9 shrink-0 rounded-full object-cover ring-1 ring-orange-200 dark:ring-orange-900/50
      "
      onError={() => setImageError(true)}
    />
  );
}

const columns: ColumnDef<RecentUser>[] = [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex min-w-48 items-center gap-3">
          <UserImage
            image={user.image}
            name={user.name}
          />

          <div className="min-w-0">
            <p
              className=" truncate font-semibold text-orange-950 dark:text-orange-50
              "
            >
              {user.name}
            </p>

            <p
              className="truncate text-xs text-orange-600/65 dark:text-orange-300/65
              "
            >
              {user.email}
            </p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;

      return (
        <Badge variant="secondary"
          className=" rounded-full border border-orange-200 bg-orange-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-700 hover:bg-orange-200 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300 dark:hover:bg-orange-900/60
          "
        >
          {getRoleLabel(role)}
        </Badge>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      const isActive = status.toLowerCase() === "active";

      return (
        <Badge
          variant="secondary"
          className={
            isActive
              ? ` rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400
              `
              : ` rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-700 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-400
              `
          }
        >
          {status}
        </Badge>
      );
    },
  },

  {
    accessorKey: "emailVerified",
    header: "Verification",
    cell: ({ row }) => {
      const verified = row.original.emailVerified;

      return (
        <Badge
          variant="secondary"
          className={
            verified
              ? ` rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400
              `
              : ` rounded-full border border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-400
              `
          }
        >
          {verified ? "Verified" : "Unverified"}
        </Badge>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => {
      return (
        <span
          className=" text-sm font-medium text-orange-800/80 dark:text-orange-200/80
          "
        >
          {formatDate(row.original.createdAt)}
        </span>
      );
    },
  },
];

export default function RecentUsersTable({
  users,
}: RecentUsersTableProps) {
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card
      className=" overflow-hidden border-orange-200/70 bg-white/80 shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/10
      "
    >
      <CardHeader
        className=" border-b border-orange-100 px-4 py-4 sm:px-6 dark:border-orange-900/30
        "
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle
              className="text-base font-bold tracking-tight text-orange-950 dark:text-orange-50
              "
            >
              Recent Users
            </CardTitle>

            <CardDescription
              className="mt-1 text-xs text-orange-700/60 dark:text-orange-300/60
              "
            >
              Recently registered users on FoodHub.
            </CardDescription>
          </div>

          <Badge variant="secondary"
            className="shrink-0 rounded-full border border-orange-200 bg-orange-100 px-2.5 text-[10px] font-bold text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300
            "
          >
            {users.length} users
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader className=" bg-orange-50/70 dark:bg-orange-950/20"
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-orange-100 hover:bg-transparent dark:border-orange-900/30
                "
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-11 px-4 text-[10px] font-bold uppercase tracking-wider text-orange-600/80 sm:px-6 dark:text-orange-400/80
                    "
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-orange-100 transition-colors hover:bg-orange-50/60 dark:border-orange-900/30 dark:hover:bg-orange-950/20
                  "
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="
                        px-4
                        py-3
                        sm:px-6
                      "
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-sm text-orange-600/60 dark:text-orange-300/60
                  "
                >
                  No recent users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}