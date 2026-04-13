"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Phone,
  Mail,
  Sparkles,
  Copy,
  Calendar,
} from "lucide-react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Modal from "@/components/UI/Modal";
import { useToast } from "@/components/UI/Toast";
import { useRouter } from "next/navigation";
import { Tenant } from "@/types/tenant";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getTenants,
  createTenant,
  updateTenant,
  deleteTenant,
} from "@/services/tenantService";
import { useAuth } from "@/hooks/useAuth";

export default function TenantsPage() {
  const { user, loading: authLoading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Tenant | null>(null);
  const [reminderMsg, setReminderMsg] = useState("");
  const [reminderTenant, setReminderTenant] = useState<Tenant | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    rentAmount: "",
    dueDate: "",
  });

  const {
    data: tenants = [],
    isLoading: loading,
  } = useQuery({
    queryKey: ["tenants"],
    queryFn: getTenants,
    enabled: !!user,
    staleTime: 1000 * 60 * 5
  });

  const createMutation = useMutation({
    mutationFn: createTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      showToast("Tenant added successfully", "success");
      setShowModal(false);
    },
    onError: () => showToast("Failed to add tenant", "error"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Tenant> }) =>
      updateTenant(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      showToast("Tenant updated successfully", "success");
      setShowModal(false);
    },
    onError: () => showToast("Failed to update tenant", "error"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      showToast("Tenant deleted", "success");
    },
    onError: () => showToast("Failed to delete tenant", "error"),
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, authLoading]);

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", email: "", phone: "", rentAmount: "", dueDate: "" });
    setShowModal(true);
  };

  const openEdit = (tenant: Tenant) => {
    setEditing(tenant);
    setForm({
      name: tenant.name,
      email: tenant.email,
      phone: tenant.phone,
      rentAmount: tenant.rentAmount.toString(),
      dueDate: tenant.dueDate.split("T")[0],
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      rentAmount: parseFloat(form.rentAmount),
      dueDate: new Date(form.dueDate).toISOString(),
    };

    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, data: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this tenant?")) return;
    deleteMutation.mutate(id);
  };

  const handleReminder = async (tenant: Tenant) => {
    setReminderTenant(tenant);
    setReminderMsg("");
    try {
      const res = await fetch(`/api/ai/reminder/${tenant.id}`);
      const data = await res.json();
      setReminderMsg(data.message);
    } catch {
      setReminderMsg("Failed to generate message.");
    }
  };

  const filtered = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase())
  );

  if (authLoading || loading) {
    return (
      <DashboardLayout title="Tenants">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton h-20 rounded-2xl" />
          ))}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Tenants">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search tenants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all"
          />
        </div>
        <Button icon={<Plus size={18} />} onClick={openAdd}>
          Add Tenant
        </Button>
      </div>

      {/* Tenant cards grid */}
      {filtered.length === 0 ? (
        <div className="glass-card rounded-2xl py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search size={28} className="text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">No tenants found</p>
          <p className="text-sm text-gray-400 mt-1">
            {search ? "Try a different search" : "Add your first tenant to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((tenant) => (
            <div
              key={tenant.id}
              className="glass-card rounded-2xl p-5 flex flex-col"
            >
              {/* Top: Avatar + Name */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-500/20">
                    {tenant.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">
                      {tenant.name}
                    </h4>
                    <p className="text-xs text-gray-500">Tenant</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEdit(tenant)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-primary-500"
                    title="Edit"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(tenant.id)}
                    className="p-2 rounded-lg hover:bg-rose-50 transition-colors text-gray-400 hover:text-rose-500"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-2 mb-4 flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={14} className="text-gray-400 shrink-0" />
                  <span className="truncate">{tenant.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={14} className="text-gray-400 shrink-0" />
                  <span>{tenant.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={14} className="text-gray-400 shrink-0" />
                  <span>
                    Due:{" "}
                    {new Date(tenant.dueDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Bottom: Rent + AI button */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Monthly Rent</p>
                  <p className="text-lg font-bold text-gray-900">
                    ₹{tenant.rentAmount.toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Sparkles size={14} />}
                  onClick={() => handleReminder(tenant)}
                >
                  Remind
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editing ? "Edit Tenant" : "Add New Tenant"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="John Doe"
            required
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="john@example.com"
            required
          />
          <Input
            label="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+91 9876543210"
            required
          />
          <Input
            label="Rent Amount (₹)"
            type="number"
            value={form.rentAmount}
            onChange={(e) =>
              setForm({ ...form, rentAmount: e.target.value })
            }
            placeholder="15000"
            required
          />
          <Input
            label="Due Date"
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            required
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" loading={formLoading}>
              {editing ? "Update Tenant" : "Add Tenant"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* AI Reminder Modal */}
      <Modal
        isOpen={!!reminderTenant}
        onClose={() => setReminderTenant(null)}
        title="AI Rent Reminder"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                Generated Message
              </p>
              <p className="text-xs text-gray-500">
                For {reminderTenant?.name}
              </p>
            </div>
          </div>

          {reminderMsg ? (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-gray-700 leading-relaxed">
                {reminderMsg}
              </p>
            </div>
          ) : (
            <div className="skeleton h-16 rounded-xl" />
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={() => setReminderTenant(null)}
            >
              Close
            </Button>
            <Button
              icon={<Copy size={16} />}
              onClick={() => {
                navigator.clipboard.writeText(reminderMsg);
                showToast("Message copied to clipboard!", "success");
              }}
              disabled={!reminderMsg}
            >
              Copy
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
