using backend.Models;

namespace backend.Repositories
{
    public interface IRentRepository
    {
        Task<IEnumerable<Rent>> GetRentsForTenantAsync(int tenantId);
        Task<Rent?> GetRentByIdAsync(int id);
        Task<Rent?> GetRentByMonthAsync(int tenantId, string month);
        Task<Rent> CreateRentAsync(Rent rent);
        Task<Rent> UpdateRentAsync(Rent rent);
        Task AddAsync(Rent rent);
    }
}
