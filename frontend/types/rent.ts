export interface Rent {
  id: number;
  tenantId: number;
  month: string;
  status: 0 | 1; // 0 = Unpaid, 1 = Paid
  paidDate: string | null;
  amount: number;
  dueDate: string;
}