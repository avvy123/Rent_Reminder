import { Tenant } from "@/types/tenant";
import { fetchClient } from "./fetchClient";
import { Rent } from "@/types/rent";

// GET tenants
export const getTenants = (): Promise<Tenant[]> =>
  fetchClient("/tenants");

// CREATE tenant
export const createTenant = (data: Partial<Tenant>) =>
  fetchClient("/tenants", {
    method: "POST",
    body: JSON.stringify(data),
  });

// UPDATE tenant
export const updateTenant = (id: number, data: Partial<Tenant>) =>
  fetchClient(`/tenants/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

// DELETE tenant
export const deleteTenant = (id: number) =>
  fetchClient(`/tenants/${id}`, {
    method: "DELETE",
  });

// GET logged-in tenant rents
export const getMyRents = (): Promise<Rent[]> =>
  fetchClient("/tenants/me/rents");

export const getTenantDashboard = (): Promise<Tenant> =>
  fetchClient("/tenants/me");