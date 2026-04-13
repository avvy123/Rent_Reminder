using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Services;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TenantsController : ControllerBase
    {
        private readonly ITenantService _tenantService;

        public TenantsController(ITenantService tenantService)
        {
            _tenantService = tenantService;
        }

        private int GetUserId() =>
            int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        // =========================
        // GET ALL TENANTS
        // =========================
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tenants = await _tenantService.GetAllTenantsAsync(GetUserId());

            var result = tenants.Select(t => new TenantResponseDto
            {
                Id = t.Id,
                Name = t.Name,
                Email = t.Email,
                Phone = t.Phone,
                RentAmount = t.RentAmount,
                DueDate = t.DueDate,
                LandlordId = t.LandlordId
            });

            return Ok(result);
        }

        // =========================
        // GET BY ID
        // =========================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var tenant = await _tenantService.GetTenantByIdAsync(id, GetUserId());

            if (tenant == null)
                return NotFound("Tenant not found");

            return Ok(new TenantResponseDto
            {
                Id = tenant.Id,
                Name = tenant.Name,
                Email = tenant.Email,
                Phone = tenant.Phone,
                RentAmount = tenant.RentAmount,
                DueDate = tenant.DueDate,
                LandlordId = tenant.LandlordId
            });
        }

        // =========================
        // CREATE TENANT (FIXED)
        // =========================
        [HttpPost]
        public async Task<IActionResult> Create(CreateTenantDto dto)
        {
            var result = await _tenantService.CreateTenantAsync(dto, GetUserId());

            // 🔥 IMPORTANT: returns password ONCE
            return Ok(result);
        }

        // =========================
        // UPDATE TENANT
        // =========================
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateTenantDto dto)
        {
            var tenant = await _tenantService.UpdateTenantAsync(id, dto, GetUserId());

            return Ok(new TenantResponseDto
            {
                Id = tenant.Id,
                Name = tenant.Name,
                Email = tenant.Email,
                Phone = tenant.Phone,
                RentAmount = tenant.RentAmount,
                DueDate = tenant.DueDate,
                LandlordId = tenant.LandlordId
            });
        }

        // =========================
        // DELETE TENANT
        // =========================
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _tenantService.DeleteTenantAsync(id, GetUserId());
            return NoContent();
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetMyProfile()
        {
            var userId = GetUserId();

            var tenant = await _tenantService.GetTenantByUserIdAsync(userId);

            if (tenant == null)
                return NotFound("Tenant not found");

            return Ok(new TenantResponseDto
            {
                Id = tenant.Id,
                Name = tenant.Name,
                Email = tenant.Email,
                Phone = tenant.Phone,
                RentAmount = tenant.RentAmount,
                DueDate = tenant.DueDate,
                LandlordId = tenant.LandlordId
            });
        }

        [HttpGet("me/rents")]
        public async Task<IActionResult> GetMyRents()
        {
            var userId = GetUserId();

            var rents = await _tenantService.GetTenantRentsAsync(userId);

            return Ok(rents);
        }
    }
}