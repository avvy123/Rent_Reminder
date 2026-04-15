export interface Rent {
  id: number;
  tenantId: number;
  month: string;
  status: string | number;
  paidDate: string | null;
  amount: number;
  dueDate: string;
}