"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import { loginUser, registerUser } from "@/services/authService";
import { getTokenFromCookies } from "@/utils/helper";
import { LoginCredentials, RegisterCredentials } from "@/types/auth";
import { useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Load user from storage
  useEffect(() => {
    const token = getTokenFromCookies();
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    if (token && name && email && role) {
      setUser({ name, email, role });
    }

    setLoading(false);
  }, []);

  // login
  const login = async (credentials: LoginCredentials) => {
    try {
      const data = await loginUser(credentials);

      const { token, name, email, role } = data;

      document.cookie = `token=${token}; path=/`;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);

      setUser({ name, email, role });

      if (role === "Landlord") {
        router.push("/dashboard/landlord");
        queryClient.invalidateQueries({ queryKey: ["tenants"] });
      } else if (role === "Tenant") {
        router.push("/dashboard/tenant");
      } else if (role === "Admin") {
        router.push("/admin/dashboard");
        queryClient.invalidateQueries({ queryKey: ["pendingUsers"] });
      } else {
        router.replace("/auth/login");
      }
    } catch (error) {
      throw error;
    }
  };

  // register
  const register = async (credentials: RegisterCredentials) => {
    try {
      const data = await registerUser(credentials);

      const { token, name, email, role } = data;

      document.cookie = `token=${token}; path=/`;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);

      setUser({ name, email, role });

      router.replace("/onboarding");
    } catch (error) {
      throw error;
    }
  };

  // logout
  const logout = () => {
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    setUser(null);

    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        mobileOpen,
        setMobileOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};