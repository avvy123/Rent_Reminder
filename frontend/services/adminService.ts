import { User } from "../types/user";
import { fetchClient } from "./fetchClient";

// get pending user
export const getPendingUsers = (): Promise<User[]> => {
  return fetchClient("/admin/pending-users");
};

// get all user
export const getAllUsers = (): Promise<User[]> => {
  return fetchClient("/admin/all-users");
};

// approve user
export const approveUser = (id: number) => {
  return fetchClient(`/admin/approve/${id}`, {
    method: "PUT",
  });
};

// reject user
export const rejectUser = (id: number) => {
  return fetchClient(`/admin/reject/${id}`, {
    method: "PUT",
  });
};