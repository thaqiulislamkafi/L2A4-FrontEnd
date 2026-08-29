"use client";

import * as React from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AuthUser } from "@/store/auth.store";
import UsersLoading from "./loading";
import UsersError from "./error";
import UsersTable from "./(components)/UsersTable";
import { TablePagination } from "@/components/TablePagination";
import UsersTableToolbar from "./(components)/UsersTableToolbar";
import { deleteUser, getUsers } from "@/lib/api/user";
import UserDeleteDialog from "./(components)/UserDeleteDialog";
import { toast } from "@/components/ui/toast";
import UpdateUserDialog from "./(components)/UpdateUserDialog";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export default function AdminUsersPage() {
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [limit, setLimit] = React.useState(DEFAULT_LIMIT);
  const [search, setSearch] = React.useState("");
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = React.useState(false);

  const [selectedUser, setSelectedUser] = React.useState<AuthUser | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["admin-users", page, limit, search],
    queryFn: () => getUsers({ page, limit, search }),
    placeholderData: (previousData) => previousData,
  });

  const users: AuthUser[] = data?.data ?? [];
  const meta = data?.meta;

  const totalPages = meta?.totalPage ?? 1;
  const totalUsers = meta?.total ?? 0;
  const queryClient = useQueryClient();

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(DEFAULT_PAGE);
  };

  const handleReset = () => {
    setSearch("");
    setPage(DEFAULT_PAGE);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleEdit = (user: AuthUser) => {
    setSelectedUser(user);
    setIsUpdateDialogOpen(true);
  };

  const handleUpdateDialogChange = (open: boolean) => {
    setIsUpdateDialogOpen(open);

    if (!open) {
      setSelectedUser(null);
    }
  };

  const handleDeleteRequest = (user: AuthUser) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = (user: AuthUser) => {
    deleteMutation.mutate(user.id);
  };

  const deleteMutation = useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: async () => {

      toast.add({
        title: "User Deleted Successfully!",
        description: `User is permanently Deleted`,
        type: "success",
      });
      setDeleteDialogOpen(false);
      setSelectedUser(null);

      await queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
  });

  if (isLoading) {
    return <UsersLoading />;
  }

  if (isError) {
    return <UsersError onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-234">

      <UsersTableToolbar
        search={search}
        onReset={handleReset}
        onSearchChange={handleSearch} />

      <UsersTable
        users={users}
        isFetching={isFetching || deleteMutation.isPending} 
        onEdit={handleEdit}
        onDelete={handleDeleteRequest} />

      <TablePagination
        page={page}
        totalPages={totalPages}
        totalItems={totalUsers}
        itemsName="Users"
        onPageChange={handlePageChange}
      />

      <UserDeleteDialog
        user={selectedUser}
        open={deleteDialogOpen}
        isDeleting={deleteMutation.isPending}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm} />

      <UpdateUserDialog
        user={selectedUser}
        open={isUpdateDialogOpen}
        onOpenChange={handleUpdateDialogChange} />
    </div>
  );
}