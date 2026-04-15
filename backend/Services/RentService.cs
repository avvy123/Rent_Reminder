using backend.DTOs;
using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class RentService : IRentService
    {
        private readonly IRentRepository _rentRepository;
        private readonly ITenantRepository _tenantRepository;

        public RentService(IRentRepository rentRepository, ITenantRepository tenantRepository)
        {
            _rentRepository = rentRepository;
            _tenantRepository = tenantRepository;
        }

        public async Task<IEnumerable<Rent>> GetRentsForTenantAsync(int tenantId, int userId)
        {
            var tenant = await _tenantRepository.GetTenantByIdAsync(tenantId, userId);
            if (tenant == null) throw new Exception("Tenant not found or unauthorized");

            return await _rentRepository.GetRentsForTenantAsync(tenantId);
        }

        public async Task<IEnumerable<RentResponseDto>> GetAllRentsAsync(int landlordId)
        {
            var tenants = await _tenantRepository.GetAllTenantsAsync(landlordId);

            var rents = tenants
                .SelectMany(t => t.Rents.Select(r => new RentResponseDto
                {
                    Id = r.Id,
                    TenantId = t.Id,
                    Month = r.Month,
                    Status = (int)r.Status,
                    PaidDate = r.PaidDate,
                    DueDate = r.DueDate
                }))
                .ToList();

            return rents;
        }

        public async Task<Rent> CreateRentAsync(CreateRentDto dto, int userId)
        {
            var tenant = await _tenantRepository.GetTenantByIdAsync(dto.TenantId, userId);
            if (tenant == null) throw new Exception("Tenant not found or unauthorized");

            var existingRent = await _rentRepository.GetRentByMonthAsync(dto.TenantId, dto.Month);
            if (existingRent != null) throw new Exception($"Rent record for month {dto.Month} already exists");

            var rent = new Rent
            {
                TenantId = dto.TenantId,
                Month = dto.Month,
                DueDate = dto.DueDate,
                Status = RentStatus.Unpaid
            };

            return await _rentRepository.CreateRentAsync(rent);
        }

        public async Task<Rent> UpdateRentStatusAsync(int id, UpdateRentDto dto, int userId)
        {
            var rent = await _rentRepository.GetRentByIdAsync(id);
            if (rent == null) throw new Exception("Rent not found");

            var tenant = await _tenantRepository.GetTenantByIdAsync(rent.TenantId, userId);
            if (tenant == null) throw new Exception("Unauthorized to update this rent");

            rent.Status = dto.Status;
            rent.PaidDate = dto.Status == RentStatus.Paid ? DateTime.UtcNow : null;

            return await _rentRepository.UpdateRentAsync(rent);
        }

        public async Task<List<Rent>> GetLandlordRents(int landlordId)
        {
            return await _rentRepository.GetLandlordRents(landlordId);
        }
    }
}
