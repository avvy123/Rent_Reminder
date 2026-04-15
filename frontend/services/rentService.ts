import { Rent } from "@/types/rent";
import { fetchClient } from "./fetchClient";

export const getRentsByTenant = (tenantId: number): Promise<Rent[]> =>
  fetchClient(`/rents/tenant/${tenantId}`);

export const getTenantRentRecord = (): Promise<Rent[]> =>
  fetchClient(`/rents/landlord-rents`);

export const getAllRents = (): Promise<Rent[]> =>
  fetchClient("/rents");

export const createRent = (data: Partial<Rent>) =>
  fetchClient("/rents", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateRentStatus = (
  id: number,
  data: Partial<Rent>
) =>
  fetchClient(`/rents/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

// mark as paid
export const markRentPaid = (id: number) =>
  updateRentStatus(id, { status: 1, paidDate: new Date().toISOString() });

// mark as unpaid
export const markRentUnpaid = (id: number) =>
  updateRentStatus(id, { status: 0, paidDate: null });