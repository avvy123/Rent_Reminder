using backend.DTOs;
using backend.Models;

namespace backend.Services
{
    public interface IRentService
    {
        Task<IEnumerable<Rent>> GetRentsForTenantAsync(int tenantId, int userId);
        Task<Rent> CreateRentAsync(CreateRentDto dto, int userId);
        Task<Rent> UpdateRentStatusAsync(int id, UpdateRentDto dto, int userId);
        Task<IEnumerable<RentResponseDto>> GetAllRentsAsync(int landlordId);
        Task<List<Rent>> GetLandlordRents(int landlordId);
    }
}
