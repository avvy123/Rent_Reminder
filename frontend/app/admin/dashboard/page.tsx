"use client";

import Link from "next/link";
import { getAllUsers, getPendingUsers } from "@/services/adminService";

import { useQuery } from "@tanstack/react-query";

export default function AdminDashboard() {

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pendingUsers"],
    queryFn: getPendingUsers,
    staleTime: 1000 * 60 * 5
  });

  const {
      data: allUsers = [],
    } = useQuery({
      queryKey: ["allUsers"],
      queryFn: getAllUsers,
      staleTime: 1000 * 60 * 5,
    });

    const approvedUsers = allUsers.filter(user => user.status === "Approved");
    const rejectedUsers = allUsers.filter(user => user.status === "Rejected");
    const propertyCount = allUsers.reduce((sum, user) => {
      const value = Number(user.propertyCount);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
    

  const pendingCount = users.length;

  if (isLoading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">Failed to load dashboard data</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Pending Requests</h2>
          <p className="text-3xl font-bold text-purple-600">
            {pendingCount}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Approved Users</h2>
          <p className="text-3xl font-bold">{approvedUsers.length}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Rejected Users</h2>
          <p className="text-3xl font-bold">{rejectedUsers.length}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Properties</h2>
          <p className="text-3xl font-bold">{propertyCount}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/admin/approvals"
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-5 rounded-xl shadow hover:opacity-90"
        >
          <p className="text-lg font-semibold">
            Approve Users →
          </p>
        </Link>

        <Link
          href="/admin/users"
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-5 rounded-xl shadow hover:opacity-90"
        >
          <p className="text-lg font-semibold">
            Manage Users →
          </p>
        </Link>
      </div>
    </div>
  );
}