using backend.DTOs;
using backend.Models;
using backend.Repositories;
using backend.Helpers;

namespace backend.Services
{
    public class TenantService : ITenantService
    {
        private readonly ITenantRepository _tenantRepository;
        private readonly IUserRepository _userRepository;
        private readonly IRentRepository _rentRepository;

        public TenantService(
            ITenantRepository tenantRepository,
            IUserRepository userRepository,
            IRentRepository rentRepository)
        {
            _tenantRepository = tenantRepository;
            _userRepository = userRepository;
            _rentRepository = rentRepository;
        }

        public async Task<IEnumerable<Tenant>> GetAllTenantsAsync(int userId)
        {
            return await _tenantRepository.GetAllTenantsAsync(userId);
        }

        public async Task<Tenant?> GetTenantByIdAsync(int id, int userId)
        {
            return await _tenantRepository.GetTenantByIdAsync(id, userId);
        }

        public async Task<Tenant> GetTenantByUserIdAsync(int userId)
        {
            return await _tenantRepository.GetTenantByUserIdAsync(userId);
        }

        // CREATE TENANT + AUTO RENT
        public async Task<TenantCreatedResponseDto> CreateTenantAsync(CreateTenantDto dto, int landlordId)
        {
            // 1. Generate password
            var tempPassword = GeneratePassword();

            // 2. Create tenant login user
            var tenantUser = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Role = "Tenant",
                Status = "Active",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(tempPassword)
            };

            var createdUser = await _userRepository.CreateUserAsync(tenantUser);

            if (createdUser == null || createdUser.Id == 0)
                throw new Exception("Failed to create tenant user");

            // 3. Create tenant record
            var tenant = new Tenant
            {
                Name = dto.Name,
                Email = dto.Email,
                Phone = PhoneHelper.FormatIndianNumber(dto.Phone),
                RentAmount = dto.RentAmount,
                DueDate = dto.DueDate, // e.g. 10th of every month
                LandlordId = landlordId,
                UserId = createdUser.Id
            };

            var createdTenant = await _tenantRepository.CreateTenantAsync(tenant);

            // =========================
            // 🔥 AUTO CREATE RENT RECORD
            // =========================

            var currentDate = DateTime.Now;

            var nextMonth = currentDate.AddMonths(1);

            var dueDay = createdTenant.DueDate.Day;

            var dueDate = new DateTime(nextMonth.Year, nextMonth.Month, dueDay);

            var rent = new Rent
            {
                TenantId = createdTenant.Id,

                // Month grouping
                Month = currentDate.ToString("yyyy-MM"),

                // ACTUAL DATE
                RentDate = currentDate,

                // due date
                DueDate = dueDate,

                Status = RentStatus.Unpaid
            };

            await _rentRepository.AddAsync(rent);

            // =========================

            return new TenantCreatedResponseDto
            {
                TenantId = createdTenant.Id,
                Name = createdTenant.Name,
                Email = createdTenant.Email,
                TempPassword = tempPassword
            };
        }

        public async Task<Tenant> UpdateTenantAsync(int id, UpdateTenantDto dto, int userId)
        {
            var tenant = await _tenantRepository.GetTenantByIdAsync(id, userId);
            if (tenant == null) throw new Exception("Tenant not found");

            if (dto.Name != null) tenant.Name = dto.Name;
            if (dto.Email != null) tenant.Email = dto.Email;
            if (dto.Phone != null) tenant.Phone = PhoneHelper.FormatIndianNumber(dto.Phone);
            if (dto.RentAmount.HasValue) tenant.RentAmount = dto.RentAmount.Value;
            if (dto.DueDate.HasValue) tenant.DueDate = dto.DueDate.Value;

            return await _tenantRepository.UpdateTenantAsync(tenant);
        }

        public async Task DeleteTenantAsync(int id, int userId)
        {
            var tenant = await _tenantRepository.GetTenantByIdAsync(id, userId);
            if (tenant == null) throw new Exception("Tenant not found");

            await _tenantRepository.DeleteTenantAsync(tenant);
        }

        public async Task<IEnumerable<TenantRentDto>> GetTenantRentsAsync(int userId)
        {
            var tenant = await _tenantRepository.GetTenantByUserIdAsync(userId);

            if (tenant == null)
                throw new Exception("Tenant not found");

            return tenant.Rents.Select(r => new TenantRentDto
            {
                Id = r.Id,
                TenantId = r.TenantId,
                Amount = tenant.RentAmount,
                DueDate = r.DueDate,
                Status = r.Status.ToString()
            });
        }

        // PASSWORD GENERATOR
        private string GeneratePassword()
        {
            return Guid.NewGuid().ToString("N")[..8];
        }
    }
}