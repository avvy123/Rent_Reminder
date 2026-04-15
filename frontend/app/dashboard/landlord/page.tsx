"use client";

import React from "react";
import { Users, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import StatsCard from "@/components/Dashboard/StatsCard";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getTenants } from "@/services/tenantService";
import { useAuth } from "@/hooks/useAuth";
import { getTenantRentRecord } from "@/services/rentService";

export default function LandlordDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, authLoading]);

  const {
    data: tenants = [],
    isLoading: loading,
  } = useQuery({
    queryKey: ["tenants"],
    queryFn: getTenants,
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: landlordTenantRentRecord = [],
  } = useQuery({
    queryKey: ["getTenantRentRecord"],
    queryFn: getTenantRentRecord,
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  const totalTenants = tenants.length;
  const paidRents = landlordTenantRentRecord.filter((r) => r.status === 1).length;
  const unpaidRents = landlordTenantRentRecord.filter((r) => r.status === 0).length;
  const totalRevenue = tenants.reduce((sum, t) => sum + t.rentAmount, 0);

  if (authLoading || loading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton h-32 rounded-2xl" />
          ))}
        </div>
        <div className="skeleton h-64 rounded-2xl" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Landlord Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Tenants"
          value={totalTenants}
          icon={Users}
          color="indigo"
          trend="Active"
          trendUp={true}
        />
        <StatsCard
          title="Paid Rents"
          value={paidRents}
          icon={CheckCircle}
          color="emerald"
          trend="On time"
          trendUp={true}
        />
        <StatsCard
          title="Unpaid Rents"
          value={unpaidRents}
          icon={XCircle}
          color="rose"
          trend={unpaidRents > 0 ? "Needs follow-up" : "All clear"}
          trendUp={unpaidRents === 0}
        />
        <StatsCard
          title="Expected Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          icon={TrendingUp}
          color="amber"
          trend="Monthly"
          trendUp={true}
        />
      </div>

      {/* Recent Tenants Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Recent Tenants</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            Overview of your tenant base
          </p>
        </div>

        {tenants.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users size={28} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No tenants yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Add your first tenant to get started
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Email
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Rent
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Due Date
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {tenants.slice(0, 5).map((tenant) => {

                  const rent = landlordTenantRentRecord
                    ?.filter((r) => r.tenantId === tenant.id)
                    .sort(
                      (a, b) =>
                        new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
                    )[0];

                  return (
                    <tr
                      key={tenant.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                            {tenant.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {tenant.name}
                            </p>
                            <p className="text-xs text-gray-500 sm:hidden">
                              {tenant.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">
                        {tenant.email}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        ₹{tenant.rentAmount.toLocaleString()}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                        {new Date(tenant.dueDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      <td className="px-6 py-4">
                        {rent ? (
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${rent.status === 1
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-rose-50 text-rose-700"
                              }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${rent.status === 1
                                  ? "bg-emerald-500"
                                  : "bg-rose-500"
                                }`}
                            />
                            {rent.status === 1 ? "Paid" : "Unpaid"}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">
                            No records
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}