const BASE_URL = "http://localhost:5201/api";

export async function fetchClient(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      data?.message || data?.Message || `Request failed (${res.status})`
    );
  }

  return data;
}