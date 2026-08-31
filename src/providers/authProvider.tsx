"use client";

import { ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { getMe } from "@/lib/api/auth";
import { GlobalSpinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/auth.store";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const setAuth = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.clearUser);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: getMe
  });

  useEffect(() => {
    if (data?.success && data?.data?.user) {
      setAuth(data.data.user);
    } else if (isError || data?.success === false) {
      logout();
    }
  }, [data, isError, setAuth, logout]);

  if (isLoading) {
    return <GlobalSpinner />;
  }

  return <>{children}</>;
};

export default AuthProvider;