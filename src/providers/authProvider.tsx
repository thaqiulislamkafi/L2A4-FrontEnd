"use client";

import { ReactNode, useEffect } from "react";

import { getMe } from "@/lib/api/auth";
import { GlobalSpinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/auth.store";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const setAuth = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.clearUser);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    
    const restoreSession = async () => {
      try {
        const response = await getMe();

        if (response?.success && response?.data?.user) {
          setAuth(response.data.user);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Session restoration failed:", error);

        logout();
      }
    };

    restoreSession();
  }, [setAuth, logout]);

  if (isLoading) return <GlobalSpinner/>

  return <>{children}</>;
};

export default AuthProvider;