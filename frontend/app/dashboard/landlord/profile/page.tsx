"use client";

import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { getTenants } from "@/services/tenantService";
import { fetchClient } from "@/services/fetchClient";
import { Rent } from "@/types/rent";
import { useAuth } from "@/hooks/useAuth";

export default function LandlordProfile() {
  const { user, logout } = useAuth();

  const {
    data: tenants = [],
    isLoading: tenantsLoading,
  } = useQuery({
    queryKey: ["tenants"],
    queryFn: getTenants,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: rents = [],
    isLoading: rentsLoading,
  } = useQuery<Rent[]>({
    queryKey: ["rents"],
    queryFn: () => fetchClient("/rents"),
    staleTime: 1000 * 60 * 5,
  });

  const loading = tenantsLoading || rentsLoading;

  if (!user) return null;

  const totalTenants = tenants.length;

  const totalIncome = tenants.reduce(
    (sum, t) => sum + t.rentAmount,
    0
  );

  const pendingRents = rents.filter((r) => r.status === 0).length;

  return (
    <DashboardLayout title="Profile">
      <div className="p-6 space-y-6">

        {/* ================= PROFILE CARD ================= */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>

            <span className="inline-block mt-2 text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
              Landlord
            </span>
          </div>
        </div>

        {/* ================= STATS ================= */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white rounded-2xl shadow p-6">
              <p className="text-sm text-gray-500">Total Tenants</p>
              <p className="text-2xl font-bold mt-1">
                {totalTenants}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <p className="text-sm text-gray-500">Monthly Income</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                ₹{totalIncome.toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <p className="text-sm text-gray-500">Pending Payments</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {pendingRents}
              </p>
            </div>

          </div>
        )}

        {/* ================= ACCOUNT INFO ================= */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-sm text-gray-500 mb-4">
            Account Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <p>
              <span className="text-gray-500">Name:</span>{" "}
              <span className="font-medium">{user.name}</span>
            </p>

            <p>
              <span className="text-gray-500">Email:</span>{" "}
              <span className="font-medium">{user.email}</span>
            </p>

            <p>
              <span className="text-gray-500">Role:</span>{" "}
              <span className="font-medium">Landlord</span>
            </p>

            <p>
              <span className="text-gray-500">Status:</span>{" "}
              <span className="text-green-600 font-medium">
                Active
              </span>
            </p>
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-sm text-gray-500 mb-4">
            Quick Actions
          </h3>

          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700" onClick={logout}>
              Logout
            </button>

            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
              Change Password
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}