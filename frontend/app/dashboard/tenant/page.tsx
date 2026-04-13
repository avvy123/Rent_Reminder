"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { getTokenFromCookies } from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";
import { getTenantDashboard } from "@/services/tenantService";
import { useAuth } from "@/hooks/useAuth";

export default function TenantDashboard() {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const token = getTokenFromCookies();

  useEffect(() => {
    if (error) {
      setError("Failed to fetch tenant data");
    }
  }, [error]);

  const {
    data: tenant,
    isLoading: loading,
  } = useQuery({
    queryKey: ["tenant-profile"],
    queryFn: getTenantDashboard,
    enabled: !!token,
    staleTime: 1000 * 60 * 5
  });

  return (
    <DashboardLayout title="Tenant Dashboard">
      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div>
          <h2 className="text-2xl font-bold">
            Welcome, {tenant?.name || user?.name}
          </h2>
          <p className="text-gray-500">
            Manage your rent and tenancy details
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-gray-500">Loading your dashboard...</div>
        )}

        {/* ERROR */}
        {error && (
          <div className="text-red-500">{error}</div>
        )}

        {/* DASHBOARD CONTENT */}
        {tenant && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* RENT CARD */}
            <div className="p-4 rounded-xl shadow bg-white">
              <h3 className="text-gray-500">Monthly Rent</h3>
              <p className="text-2xl font-bold text-green-600">
                ₹{tenant.rentAmount}
              </p>
            </div>

            {/* DUE DATE */}
            <div className="p-4 rounded-xl shadow bg-white">
              <h3 className="text-gray-500">Due Date</h3>
              <p className="text-lg font-semibold">
                {new Date(tenant.dueDate).toDateString()}
              </p>
            </div>

            {/* CONTACT */}
            <div className="p-4 rounded-xl shadow bg-white">
              <h3 className="text-gray-500">Contact</h3>
              <p>{tenant.email}</p>
              <p>{tenant.phone}</p>
            </div>

            {/* STATUS (placeholder for future) */}
            <div className="p-4 rounded-xl shadow bg-white">
              <h3 className="text-gray-500">Status</h3>
              <p className="text-blue-600 font-semibold">
                Active Tenant
              </p>
            </div>

          </div>
        )}
      </div>
    </DashboardLayout>
  );
}