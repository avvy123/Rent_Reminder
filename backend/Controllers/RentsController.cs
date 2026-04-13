using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Services;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Landlord")]
    public class RentsController : ControllerBase
    {
        private readonly IRentService _rentService;

        public RentsController(IRentService rentService)
        {
            _rentService = rentService;
        }

        // ✅ Extract User ID from token
        private int GetUserId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                throw new UnauthorizedAccessException("Invalid or missing token");

            return int.Parse(userId);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var rents = await _rentService.GetAllRentsAsync(GetUserId());
                return Ok(rents);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error fetching rents: {ex.Message}");
            }
        }

        // 📥 GET: api/rents/tenant/{tenantId}
        [HttpGet("tenant/{tenantId}")]
        public async Task<IActionResult> GetForTenant(int tenantId)
        {
            try
            {
                var rents = await _rentService.GetRentsForTenantAsync(tenantId, GetUserId());

                // ✅ Map to DTO
                var response = rents.Select(r => new RentResponseDto
                {
                    Id = r.Id,
                    TenantId = r.TenantId,
                    Month = r.Month,
                    Status = (int)r.Status,
                    PaidDate = r.PaidDate
                });

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error fetching rents: {ex.Message}");
            }
        }

        // ➕ POST: api/rents
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRentDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var rent = await _rentService.CreateRentAsync(dto, GetUserId());

                // ✅ Map to DTO
                var response = new RentResponseDto
                {
                    Id = rent.Id,
                    TenantId = rent.TenantId,
                    Month = rent.Month,
                    Status = (int)rent.Status,
                    PaidDate = rent.PaidDate
                };

                return CreatedAtAction(
                    nameof(GetForTenant),
                    new { tenantId = rent.TenantId },
                    response
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error creating rent: {ex.Message}");
            }
        }

        // ✏️ PUT: api/rents/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateRentDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var rent = await _rentService.UpdateRentStatusAsync(id, dto, GetUserId());

                if (rent == null)
                    return NotFound(new { message = "Rent not found or unauthorized" });

                // ✅ Map to DTO
                var response = new RentResponseDto
                {
                    Id = rent.Id,
                    TenantId = rent.TenantId,
                    Month = rent.Month,
                    Status = (int)rent.Status,
                    PaidDate = rent.PaidDate
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating rent: {ex.Message}");
            }
        }
    }
}