import { fetchClient } from "./fetchClient";

export const loginUser = (data: any) =>
  fetchClient("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const registerUser = (data: any) =>
  fetchClient("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });