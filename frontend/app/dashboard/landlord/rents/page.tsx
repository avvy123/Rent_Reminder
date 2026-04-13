"use client";

import React, { useEffect, useState } from "react";
import {
  Receipt,
  Plus,
  CheckCircle,
  XCircle,
  ChevronDown,
  Calendar,
} from "lucide-react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import Input from "@/components/UI/Input";
import { useToast } from "@/components/UI/Toast";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTenants } from "@/services/tenantService";
import { createRent, getRentsByTenant, updateRentStatus } from "@/services/rentService";
import { Tenant } from "@/types/tenant";
import { Rent } from "@/types/rent";
import { useAuth } from "@/hooks/useAuth";

export default function RentsPage() {
  const { user, loading: authLoading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addMonth, setAddMonth] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
      return;
    }
  }, [user, authLoading]);

  const {
    data: tenants = [],
    isLoading: loading,
  } = useQuery({
    queryKey: ["tenants"],
    queryFn: getTenants,
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: rents = [],
    isLoading: rentsLoading,
  } = useQuery({
    queryKey: ["rents", selectedTenant?.id],
    queryFn: () => getRentsByTenant(selectedTenant!.id),
    enabled: !!selectedTenant,
    staleTime: 5 * 60 * 1000
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (rent: Rent) => {
      const newStatus = rent.status === 1 ? 0 : 1;
      return updateRentStatus(rent.id, { status: newStatus }).then(
        () => newStatus
      );
    },
    onSuccess: (newStatus) => {
      showToast(
        newStatus === 1 ? "Marked as paid!" : "Marked as unpaid",
        newStatus === 1 ? "success" : "warning"
      );

      queryClient.invalidateQueries({
        queryKey: ["rents", selectedTenant?.id],
      });
    },
    onError: () => {
      showToast("Failed to update status", "error");
    },
  });

  const addRentMutation = useMutation({
    mutationFn: () =>
      createRent({
        tenantId: selectedTenant?.id,
        month: addMonth,
      }),
    onSuccess: () => {
      showToast("Rent record added", "success");
      setShowAddModal(false);
      setAddMonth("");

      queryClient.invalidateQueries({
        queryKey: ["rents", selectedTenant?.id],
      });
    },
    onError: () => {
      showToast("Failed to add rent record", "error");
    },
  });

  const selectTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant);
  };

  const handleToggleStatus = async (rent: Rent) => {
    toggleStatusMutation.mutate(rent);
  };

  const handleAddRent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTenant || !addMonth) return;

    addRentMutation.mutate();
  };

  if (authLoading || loading) {
    return (
      <DashboardLayout title="Rent Tracking">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="skeleton h-96 rounded-2xl" />
          <div className="lg:col-span-2 skeleton h-96 rounded-2xl" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Rent Tracking">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Tenant List */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Select Tenant</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Choose a tenant to view rent history
            </p>
          </div>

          <div className="max-h-[500px] overflow-y-auto divide-y divide-gray-50">
            {tenants.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm text-gray-400">No tenants yet</p>
              </div>
            ) : (
              tenants.map((tenant) => (
                <button
                  key={tenant.id}
                  onClick={() => selectTenant(tenant)}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-all hover:bg-gray-50 cursor-pointer ${
                    selectedTenant?.id === tenant.id
                      ? "bg-primary-50 border-l-4 border-primary-500"
                      : ""
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {tenant.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {tenant.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      ₹{tenant.rentAmount.toLocaleString()}/mo
                    </p>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform ${
                      selectedTenant?.id === tenant.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Rent Records */}
        <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden">
          {!selectedTenant ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <Receipt size={28} className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">
                Select a tenant
              </p>
              <p className="text-sm text-gray-400 mt-1">
                View and manage rent records
              </p>
            </div>
          ) : (
            <>
              {/* Rent header */}
              <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-gray-900">
                    {selectedTenant.name}&apos;s Rent History
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    ₹{selectedTenant.rentAmount.toLocaleString()} per month
                  </p>
                </div>
                <Button
                  size="sm"
                  icon={<Plus size={16} />}
                  onClick={() => setShowAddModal(true)}
                >
                  Add Record
                </Button>
              </div>

              {/* Rent records table */}
              {rentsLoading ? (
                <div className="p-6 space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="skeleton h-14 rounded-xl" />
                  ))}
                </div>
              ) : rents.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Calendar size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium text-sm">
                    No rent records yet
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Click &ldquo;Add Record&rdquo; to add one
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50/50">
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Month
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                          Paid Date
                        </th>
                        <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {rents.map((rent) => (
                        <tr
                          key={rent.id}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                                <Calendar
                                  size={14}
                                  className="text-indigo-500"
                                />
                              </div>
                              <span className="text-sm font-semibold text-gray-900">
                                {rent.month}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                rent.status === 1
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-rose-50 text-rose-700"
                              }`}
                            >
                              {rent.status === 1 ? (
                                <CheckCircle size={12} />
                              ) : (
                                <XCircle size={12} />
                              )}
                              {rent.status === 1 ? "Paid" : "Unpaid"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">
                            {rent.paidDate
                              ? new Date(rent.paidDate).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "—"}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button
                              size="sm"
                              variant={
                                rent.status === 1 ? "secondary" : "success"
                              }
                              onClick={() => handleToggleStatus(rent)}
                            >
                              {rent.status === 1
                                ? "Mark Unpaid"
                                : "Mark Paid"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Add Rent Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Rent Record"
      >
        <form onSubmit={handleAddRent} className="space-y-4">
          <Input
            label="Month (YYYY-MM)"
            placeholder="2026-04"
            value={addMonth}
            onChange={(e) => setAddMonth(e.target.value)}
            required
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Record</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
