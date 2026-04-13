using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Repositories
{
    public class TenantRepository : ITenantRepository
    {
        private readonly AppDbContext _context;

        public TenantRepository(AppDbContext context)
        {
            _context = context;
        }

        // =========================
        // GET ALL TENANTS (BY LANDLORD)
        // =========================
        public async Task<IEnumerable<Tenant>> GetAllTenantsAsync(int landlordId)
        {
            return await _context.Tenants
                .Include(t => t.Rents)
                .Where(t => t.LandlordId == landlordId)
                .ToListAsync();
        }

        // =========================
        // GET TENANT BY ID (BY LANDLORD)
        // =========================
        public async Task<Tenant?> GetTenantByIdAsync(int id, int landlordId)
        {
            return await _context.Tenants
                .Include(t => t.Rents)
                .FirstOrDefaultAsync(t => t.Id == id && t.LandlordId == landlordId);
        }

        public async Task<Tenant?> GetTenantByUserIdAsync(int userId)
        {
            return await _context.Tenants
                .Include(t => t.Rents)
                .FirstOrDefaultAsync(t => t.UserId == userId);
        }

        // =========================
        // CREATE TENANT
        // =========================
        public async Task<Tenant> CreateTenantAsync(Tenant tenant)
        {
            _context.Tenants.Add(tenant);
            await _context.SaveChangesAsync();
            return tenant;
        }

        // =========================
        // UPDATE TENANT
        // =========================
        public async Task<Tenant> UpdateTenantAsync(Tenant tenant)
        {
            _context.Tenants.Update(tenant);
            await _context.SaveChangesAsync();
            return tenant;
        }

        // =========================
        // DELETE TENANT
        // =========================
        public async Task DeleteTenantAsync(Tenant tenant)
        {
            _context.Tenants.Remove(tenant);
            await _context.SaveChangesAsync();
        }
    }
}