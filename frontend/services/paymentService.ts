import { fetchClient } from "./fetchClient";

type OrderResponse = {
  orderId: string;
  amount: number;
};

type VerifyPaymentRequest = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  tenantId: number;
  amount: number;
};

type VerifyPaymentResponse = {
  success: boolean;
  message: string;
};

export const createOrder = async (amount: number): Promise<OrderResponse> => {
  return fetchClient("/payment/create-order", {
    method: "POST",
    body: JSON.stringify({ amount }),
  });
};

export const verifyPayment = async (data: VerifyPaymentRequest) : Promise<VerifyPaymentResponse> => {
  return fetchClient("/payment/verify", {
    method: "POST",
    body: JSON.stringify(data),
  });
};