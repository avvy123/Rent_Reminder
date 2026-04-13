import { Rent } from "./rent";

export interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  rentAmount: number;
  dueDate: string;
  createdAt: string;
  rents: Rent[];
}