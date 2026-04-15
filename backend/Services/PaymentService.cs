using backend.DTOs;
using backend.Models;
using backend.Repositories;
using Razorpay.Api;

public class PaymentService
{
    private readonly IConfiguration _config;
    private readonly PaymentRepository _paymentRepository;

    public PaymentService(IConfiguration config, PaymentRepository paymentRepository)
    {
        _config = config;
        _paymentRepository = paymentRepository;
    }

    public object CreateOrder(int amount)
    {
        var client = new RazorpayClient(
            _config["Razorpay:Key"],
            _config["Razorpay:Secret"]
        );

        var options = new Dictionary<string, object>
        {
            { "amount", amount * 100 },
            { "currency", "INR" },
            { "receipt", Guid.NewGuid().ToString() }
        };

        Razorpay.Api.Order order = client.Order.Create(options);

        return new
        {
            orderId = order["id"].ToString(),
            amount = order["amount"]
        };
    }

    public async Task<bool> VerifyAndSavePaymentAsync(VerifyPaymentDto dto)
    {
        var secret = _config["Razorpay:Secret"];

        string payload = $"{dto.razorpay_order_id}|{dto.razorpay_payment_id}";

        var generatedSignature = ComputeHmacSha256(payload, secret);

        if (generatedSignature != dto.razorpay_signature)
        {
            return false;
        }

        var payment = new Payment
        {
            TenantId = dto.TenantId,
            Amount = dto.Amount,
            PaidDate = DateTime.UtcNow,
            Method = "Online"
        };

        await _paymentRepository.SavePaymentAsync(payment);

        var rent = await _paymentRepository.GetRentByTenantIdAsync(dto.TenantId);

        if (rent != null)
        {
            rent.Status = RentStatus.Paid;
            rent.PaidDate = DateTime.UtcNow;
            await _paymentRepository.UpdateRentAsync(rent);
        }

        return true;
    }

    private string ComputeHmacSha256(string data, string key)
    {
        using (var hmac = new System.Security.Cryptography.HMACSHA256(
            System.Text.Encoding.UTF8.GetBytes(key)))
        {
            return BitConverter
                .ToString(hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(data)))
                .Replace("-", "")
                .ToLower();
        }
    }
}