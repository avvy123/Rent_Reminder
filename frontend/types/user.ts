export type UserRole = "Landlord" | "Tenant";

export type User = {
  id: number;
  name: string;
  email: string;
  status: "Pending" | "Approved" | "Rejected";
  role: string;
  propertyType?: string
  propertyCount?: string;
  bhk?: string;
  city?: string
  mobile?: string
};