"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "@/services/adminService";
import { User } from "@/types/user";

export default function AdminAllUsersPage() {
  const queryClient = useQueryClient();

  const excludedRoles = ["Admin", "Tenant"];

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
    staleTime: 1000 * 60 * 5,
  });

  const getStatusStyles = (status: User["status"]) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const filteredUsers = users.filter(
    (user) => !excludedRoles.includes(user.role)
  );

  if (isLoading) {
    return <p className="p-6">Loading users...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">Failed to fetch users</p>;
  }

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          User Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage and monitor all registered users
        </p>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-2xl shadow divide-y">

        {filteredUsers.length === 0 ? (
          <p className="p-4 text-gray-500">No users found</p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 transition"
            >

              {/* LEFT SIDE */}
              <div className="space-y-1">

                <p className="text-lg font-semibold text-gray-900">
                  {user.name}
                </p>

                <p className="text-sm text-gray-500">
                  {user.email}
                </p>

                <div className="text-sm text-gray-600 space-y-1 mt-2">

                  <p>📱 Mobile: {user.mobile || "N/A"}</p>
                  <p>📍 City: {user.city || "N/A"}</p>
                  <p>👤 Role: {user.role}</p>

                </div>

              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col items-start md:items-end gap-2">

                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyles(
                    user.status
                  )}`}
                >
                  {user.status}
                </span>

              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}