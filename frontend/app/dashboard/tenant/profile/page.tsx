"use client";

import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { getMyRents } from "@/services/tenantService";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [error, setError] = useState("")

  useEffect(() => {
    if(error) {
      setError("Failed to fetch tenant profile !!!");
      console.error(error);
    }
  }, [error]);

  const {
    data: rents = [],
    isLoading,
  } = useQuery({
    queryKey: ["my-rents"],
    queryFn: getMyRents,
    enabled: user?.role === "Tenant",
    staleTime: 1000 * 60 * 5
  });

  const currentRent = rents.find((r) => r.status !== "Paid");

  if (!user) return null;

  return (
    <DashboardLayout title="Profile">
      <div className="p-6 space-y-6">

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>

            <span className="inline-block mt-2 text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
              {user.role}
            </span>
          </div>
        </div>

        {/* RENT INFO */}
        {user.role === "Tenant" && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-sm text-gray-500 mb-2">My Rent</h3>

            {isLoading ? (
              <p>Loading...</p>
            ) : currentRent ? (
              <>
                <p className="text-3xl font-bold text-green-600">
                  ₹{currentRent.amount}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Due on {new Date(currentRent.dueDate).toDateString()}
                </p>

                {/* STATUS FIX */}
                <p
                  className={`mt-2 font-medium ${
                    currentRent.status === "Paid"
                      ? "text-green-600"
                      : new Date(currentRent.dueDate) < new Date()
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {currentRent.status === "Paid"
                    ? "Paid"
                    : new Date(currentRent.dueDate) < new Date()
                    ? "Overdue"
                    : "Pending"}
                </p>
              </>
            ) : (
              <p className="text-gray-500">No rent data available</p>
            )}

            {error && (
              <p className="text-red-500 text-sm mt-2">
                Failed to load rent data
              </p>
            )}
          </div>
        )}

        {/* ACCOUNT INFO */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-sm text-gray-500 mb-4">Account Details</h3>

          <div className="space-y-3 text-sm">
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
              <span className="font-medium">{user.role}</span>
            </p>

            <p>
              <span className="text-gray-500">Status:</span>{" "}
              <span className="text-green-600 font-medium">Active</span>
            </p>
          </div>
        </div>
        {/* ================= SECURITY ================= */} 
        <div className="bg-white rounded-2xl shadow p-6"> 
          <h3 className="text-sm text-gray-500 mb-4">Security</h3> 
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700" onClick={logout}>Logout</button> 
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">Change Password</button> 
        </div>
      </div>
    </DashboardLayout>
  );
}