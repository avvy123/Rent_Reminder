using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AiController : ControllerBase
    {
        private readonly IAiService _aiService;

        public AiController(IAiService aiService)
        {
            _aiService = aiService;
        }

        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpGet("reminder/{tenantId}")]
        public async Task<IActionResult> GenerateReminder(int tenantId)
        {
            var message = await _aiService.GenerateReminderMessageAsync(tenantId, GetUserId());
            return Ok(new { Message = message });
        }
    }
}
