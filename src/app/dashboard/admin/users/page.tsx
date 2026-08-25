"use client";

import * as React from "react";

import { useQuery } from "@tanstack/react-query";

import { AuthUser } from "@/store/auth.store";
import UsersLoading from "./loading";
import UsersError from "./error";
import UsersTable from "./(components)/UsersTable";
import { TablePagination } from "@/components/TablePagination";
import UsersTableToolbar from "./(components)/UsersTableToolbar";
import { getUsers } from "@/lib/api/user";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export default function AdminUsersPage() {
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [limit, setLimit] = React.useState(DEFAULT_LIMIT);
  const [search, setSearch] = React.useState("");

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["admin-users", page, limit, search],
    queryFn: () => getUsers({ page, limit, search }),
    placeholderData: (previousData) => previousData,
  });

  const users: AuthUser[] = data?.data ?? [];
  const meta = data?.meta;

  const totalPages = meta?.totalPage ?? 1;
  const totalUsers = meta?.total ?? 0;

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

  if (isLoading) {
    return <UsersLoading />;
  }

  if (isError) {
    return <UsersError onRetry={() => refetch()}/>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-[950px]">  

      <UsersTableToolbar 
      search={search} 
      onReset={handleReset}
      onSearchChange={handleSearch} />

      <UsersTable 
      users={users} 
      isFetching={isFetching} />

      <TablePagination 
      page={page} 
      totalPages={totalPages} 
      totalItems={totalUsers} 
      itemsName="Users"
      onPageChange={handlePageChange}
       />
    </div>
  );
}