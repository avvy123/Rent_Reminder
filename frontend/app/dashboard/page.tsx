"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (user.role === "Landlord") {
      router.push("/dashboard/landlord");
    } else if (user.role === "Tenant") {
      router.push("/dashboard/tenant");
    } else {
      router.push("/auth/login");
    }
  }, [user, loading]);

  return <div className="p-6">Redirecting...</div>;
}