"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { getTokenFromCookies } from "@/utils/helper";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyRents } from "@/services/tenantService";
import { Rent } from "@/types/rent";
import { createOrder, verifyPayment } from "@/services/paymentService";
import { useToast } from "@/components/UI/Toast";

export default function MyRentPage() {
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const {showToast} = useToast();

  const token = getTokenFromCookies();

  useEffect(() => {
    if (error) {
      setError("Failed to fetch tenant data");
      console.error(error);
    }
  }, [error]);

  const {
    data: rents = [],
    isLoading: loading,
  } = useQuery<Rent[]>({
    queryKey: ["my-rents"],
    queryFn: getMyRents,
    enabled: !!token,
    staleTime: 1000 * 60 * 5
  });

  const currentRent = rents.find((r) => r.status !== "Paid");

  const handleRazorpayPayment = async (rent: Rent) => {
    if (!(window as any).Razorpay) {
      alert("Razorpay not loaded");
      return;
    }

    const order = await createOrder(rent.amount);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      order_id: order.orderId,

      name: "Rent Payment",
      description: `Payment for rent due ${new Date(rent.dueDate).toDateString()}`,

      handler: async function (response: any) {
        try {
          await verifyPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            tenantId: rent.tenantId,
            amount: rent.amount,
          });

          queryClient.invalidateQueries({ queryKey: ["my-rents"] });
          showToast("Payment Successfull ✅", "success");
        } catch (err) {
          console.error(err);
          showToast("Payment verification failed ❌", "error")
        }
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

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

            <p className={`mt-2 font-semibold ${currentRent.status === "Paid" ? "text-green-600" : "text-red-600"}`}>
              {currentRent.status === "Paid" ? "Paid" : "Pending"}
            </p>

            <button
              disabled={currentRent.status === "Paid"}
              className={`mt-4 px-4 py-2 rounded-lg ${currentRent.status === "Paid"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white"
                }`}
              onClick={() => handleRazorpayPayment(currentRent)}
            >
              {currentRent.status === "Paid" ? "Already Paid" : "Pay Now"}
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
                      <span className={`font-semibold ${rent.status === "Paid" ? "text-green-600" : "text-red-600"}`}>
                        {rent.status === "Paid" ? "Paid" : "Pending"}
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