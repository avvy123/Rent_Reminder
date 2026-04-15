using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Services;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PaymentController : ControllerBase
{
    private readonly PaymentService _paymentService;

    public PaymentController(PaymentService paymentService)
    {
        _paymentService = paymentService;
    }

    [HttpPost("create-order")]
    public IActionResult CreateOrder([FromBody] PaymentRequestDto dto)
    {
        var result = _paymentService.CreateOrder(dto.Amount);
        return Ok(result);
    }

    [HttpPost("verify")]
    public async Task<IActionResult> VerifyPayment([FromBody] VerifyPaymentDto dto)
    {
        var isValid = await _paymentService.VerifyAndSavePaymentAsync(dto);

        if (!isValid)
        {
            return BadRequest(new { message = "Invalid payment" });
        }

        return Ok(new { success = true, message = "Payment successful" });
    }
}