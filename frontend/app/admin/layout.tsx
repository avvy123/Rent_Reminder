"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Layout/Navbar";
import AdminSidebar from "./components/AdminSidebar";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, mobileOpen, setMobileOpen } = useAuth();
  const router = useRouter();

  // Route Protect
  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (user.role !== "Admin") {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="h-screen bg-gray-100">
      <AdminSidebar
         mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="lg:pl-64 transition-all duration-300">
        <Navbar 
            onMenuClick={() => setMobileOpen(true)}
            title="Admin Dashboard"
        />

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}