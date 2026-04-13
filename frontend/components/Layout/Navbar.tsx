"use client";

import { Menu, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPendingUsers } from "@/services/adminService";
import { useAuth } from "@/hooks/useAuth";

interface NavbarProps {
  onMenuClick: () => void;
  title?: string;
}

export default function Navbar({ onMenuClick, title }: NavbarProps) {
  const { user } = useAuth();
  const router = useRouter();

  const { data: pendingUsers = [] } = useQuery({
    queryKey: ["pending-users"],
    queryFn: getPendingUsers,
    enabled: user?.role === "Admin",
    staleTime: 1000 * 60 * 5
  });

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
          >
            <Menu size={22} />
          </button>

          {title && (
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              {title}
            </h1>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          <div className="relative">
            <button
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500 cursor-pointer"
              onClick={() => router.push("/admin/users")}
            >
              <Bell size={20} />
            </button>

            {/* badge */}
            {user?.role === "Admin" && pendingUsers.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                {pendingUsers.length}
              </span>
            )}
          </div>

          {/* USER */}
          <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-gray-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-semibold text-gray-900">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500">
                {user?.email}
              </p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}