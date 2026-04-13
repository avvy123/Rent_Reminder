"use client";

import { useAuth } from "@/hooks/useAuth";

export default function AdminProfile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">

        {/* ================= PROFILE HEADER ================= */}
        <div className="bg-white border rounded-2xl shadow-sm p-6 flex items-center justify-between">

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-gray-900 text-white flex items-center justify-center text-xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>

              <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                System Administrator
              </span>
            </div>
          </div>

          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
            Edit Profile
          </button>
        </div>

        {/* ================= ACCOUNT INFO ================= */}
        <div className="bg-white border rounded-2xl shadow-sm p-6">

          <h3 className="text-lg font-semibold mb-5">
            Account Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

            <div className="space-y-1">
              <p className="text-gray-500">Full Name</p>
              <p className="font-medium">{user.name}</p>
            </div>

            <div className="space-y-1">
              <p className="text-gray-500">Email Address</p>
              <p className="font-medium">{user.email}</p>
            </div>

            <div className="space-y-1">
              <p className="text-gray-500">Role</p>
              <p className="font-medium">Administrator</p>
            </div>

            <div className="space-y-1">
              <p className="text-gray-500">Access Level</p>
              <p className="font-medium text-indigo-600">
                Full System Access
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700" onClick={logout}>
              Logout
            </button>
          </div>
      </div>
  );
}