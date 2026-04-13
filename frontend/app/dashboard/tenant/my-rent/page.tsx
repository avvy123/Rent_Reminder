"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { getTokenFromCookies } from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";
import { getMyRents } from "@/services/tenantService";
import { Rent } from "@/types/rent";

export default function MyRentPage() {
  const [error, setError] = useState("");

  const token = getTokenFromCookies();

  const {
    data: rents = [],
    isLoading: loading,
  } = useQuery<Rent[]>({
    queryKey: ["my-rents"],
    queryFn: getMyRents,
    enabled: !!token,
    staleTime: 1000 * 60 * 5
  });

  useEffect(() => {
    if (error) {
      setError("Failed to fetch tenant data");
      console.error(error);
    }
  }, [error]);

  const currentRent = rents.find((r) => r.status !== 1);

  return (
    <DashboardLayout title="My Rent">
      <div className="p-6 space-y-6">

        {/* CURRENT RENT */}
        {currentRent && (
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg text-gray-500">Current Rent</h2>

            <p className="text-3xl font-bold text-green-600">
              ₹{currentRent.amount}
            </p>

            <p className="text-gray-500 mt-1">
              Due on {new Date(currentRent.dueDate).toDateString()}
            </p>

            <p className={`mt-2 font-semibold ${currentRent.status === 1 ? "text-green-600" : "text-red-600"}`}>
              {currentRent.status === 1 ? "Paid" : "Pending"}
            </p>

            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">
              Pay Now
            </button>
          </div>
        )}

        {/* RENT HISTORY */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Rent History</h2>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-2">Due Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {rents.map((rent) => (
                  <tr key={rent.id} className="border-b">
                    <td className="py-2">
                      {new Date(rent.dueDate).toDateString()}
                    </td>

                    <td>₹{rent.amount}</td>

                    <td>
                      <span className={`font-semibold ${rent.status === 1 ? "text-green-600" : "text-red-600"}`}>
                        {rent.status === 1 ? "Paid" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}