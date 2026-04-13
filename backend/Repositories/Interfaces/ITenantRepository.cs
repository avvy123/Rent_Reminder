using backend.Models;

namespace backend.Repositories
{
    public interface ITenantRepository
    {
        Task<IEnumerable<Tenant>> GetAllTenantsAsync(int userId);
        Task<Tenant?> GetTenantByIdAsync(int id, int userId);
        Task<Tenant> CreateTenantAsync(Tenant tenant);
        Task<Tenant> UpdateTenantAsync(Tenant tenant);
        Task DeleteTenantAsync(Tenant tenant);
        Task<Tenant?> GetTenantByUserIdAsync(int userId);
    }
}
