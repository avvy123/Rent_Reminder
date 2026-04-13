using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Repositories
{
    public class RentRepository : IRentRepository
    {
        private readonly AppDbContext _context;

        public RentRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Rent>> GetRentsForTenantAsync(int tenantId)
        {
            return await _context.Rents
                .Where(r => r.TenantId == tenantId)
                .OrderByDescending(r => r.Month)
                .ToListAsync();
        }

        public async Task<Rent?> GetRentByIdAsync(int id)
        {
            return await _context.Rents.FindAsync(id);
        }

        public async Task<Rent?> GetRentByMonthAsync(int tenantId, string month)
        {
            return await _context.Rents
                .FirstOrDefaultAsync(r => r.TenantId == tenantId && r.Month == month);
        }

        public async Task<Rent> CreateRentAsync(Rent rent)
        {
            _context.Rents.Add(rent);
            await _context.SaveChangesAsync();
            return rent;
        }

        public async Task<Rent> UpdateRentAsync(Rent rent)
        {
            _context.Rents.Update(rent);
            await _context.SaveChangesAsync();
            return rent;
        }

        public async Task AddAsync(Rent rent)
        {
            await _context.Rents.AddAsync(rent);
            await _context.SaveChangesAsync();
        }
    }
}
