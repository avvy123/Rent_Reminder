public class VerifyPaymentDto
{
    public string razorpay_payment_id { get; set; }
    public string razorpay_order_id { get; set; }
    public string razorpay_signature { get; set; }
    public int TenantId { get; set; }
    public int Amount { get; set; }
}