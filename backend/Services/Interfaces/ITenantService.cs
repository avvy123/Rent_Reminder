using backend.DTOs;
using backend.Models;

namespace backend.Services
{
    public interface ITenantService
    {
        Task<IEnumerable<Tenant>> GetAllTenantsAsync(int userId);
        Task<Tenant?> GetTenantByIdAsync(int id, int userId);
        Task<TenantCreatedResponseDto> CreateTenantAsync(CreateTenantDto dto, int userId);
        Task<Tenant> UpdateTenantAsync(int id, UpdateTenantDto dto, int userId);
        Task DeleteTenantAsync(int id, int userId);
        Task<Tenant> GetTenantByUserIdAsync(int userId);
        Task<IEnumerable<TenantRentDto>> GetTenantRentsAsync(int userId);
    }
}
