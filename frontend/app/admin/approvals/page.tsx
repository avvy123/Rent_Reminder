"use client";

import {
  getPendingUsers,
  approveUser as approveUserApi,
  rejectUser as rejectUserApi,
} from "@/services/adminService";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function ApprovalsPage() {
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["pendingUsers"],
    queryFn: getPendingUsers,
    staleTime: 1000 * 60 * 5,
  });

  const approveMutation = useMutation({
    mutationFn: approveUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingUsers"] });
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });

  // ---------------- REJECT ----------------
  const rejectMutation = useMutation({
    mutationFn: rejectUserApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingUsers"] });
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Landlord Approvals
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Review landlord details before approving access
        </p>
      </div>

      {/* LIST */}
      <div className="space-y-5">

        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500">No pending requests 🎉</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="bg-white border rounded-2xl shadow-sm p-5 hover:shadow-md transition"
            >

              {/* TOP SECTION */}
              <div className="flex flex-col md:flex-row md:justify-between gap-4">

                {/* USER INFO */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {user.name}
                  </h2>
                  <p className="text-sm text-gray-500">{user.email}</p>

                  <p className="text-sm text-gray-600 mt-1">
                    📍 {user.city}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2">
                  <button
                    onClick={() => approveMutation.mutate(user.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Approve
                  </button>

                  <button
                   onClick={() => rejectMutation.mutate(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Reject
                  </button>
                </div>
              </div>

              {/* PROPERTY DETAILS */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">Property Type</p>
                  <p className="font-medium">{user.propertyType}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">Properties</p>
                  <p className="font-medium">{user.propertyCount}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">BHK Type</p>
                  <p className="font-medium">{user.bhk}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium">{user.city}</p>
                </div>

              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}