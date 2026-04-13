"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Home,
  ClipboardPlus,
  User
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon:LayoutDashboard },
  { name: "User Approvals", path: "/admin/approvals", icon: Users },
  { name: "All Users", path: "/admin/users", icon:Users },
  { name: "Properties", path: "/admin/properties", icon:Home },
  { name: "Profile", path: "/admin/profile", icon:User },
];

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function AdminSidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // handles nested routes
  const isActive = (href: string) => pathname.startsWith(href);

  // Auto close on route change
  useEffect(() => {
    onMobileClose();
  }, [pathname]);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-50
          bg-gradient-to-b from-[#1e1b4b] via-[#1e1b4b] to-[#312e81]
          transition-all duration-300 ease-in-out flex flex-col
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="px-6 py-6 flex items-center gap-3 border-b border-indigo-800/50">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
            <Home size={18} className="text-white" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-white tracking-tight whitespace-nowrap">
              Admin Panel
            </span>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={onMobileClose}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200 group
                ${
                  isActive(item.path)
                    ? "bg-indigo-500/20 text-white shadow-lg shadow-indigo-500/10"
                    : "text-indigo-200 hover:text-white hover:bg-white/5"
                }
              `}
            >
              <item.icon
                size={20}
                className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                  isActive(item.path) ? "text-indigo-300" : ""
                }`}
              />
              {!collapsed && <span>{item.name}</span>}
              {isActive(item.path) && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-300 pulse-dot" />
              )}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}