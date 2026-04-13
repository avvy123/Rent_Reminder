import { LayoutDashboard, Users, Receipt, User } from "lucide-react";

import type { UserRole } from "../types/user";

export const sidebarItems: Record<UserRole, any[]> = {
  Landlord: [
    { label: "Dashboard", href: "/dashboard/landlord", icon: LayoutDashboard },
    { label: "Tenants", href: "/dashboard/landlord/tenants", icon: Users },
    { label: "Rents", href: "/dashboard/landlord/rents", icon: Receipt },
    { label: "Profile", href: "/dashboard/landlord/profile", icon: User },
  ],

  Tenant: [
    { label: "Dashboard", href: "/dashboard/tenant", icon: LayoutDashboard },
    { label: "My Rent", href: "/dashboard/tenant/my-rent", icon: Receipt },
    { label: "Profile", href: "/dashboard/tenant/profile", icon: User }
  ],
};