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
            var existingTenant = await _context.Tenants
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.Id == tenant.Id);

            if (existingTenant == null) return;

            _context.Tenants.Remove(existingTenant);

            if (existingTenant.User != null)
            {
                _context.Users.Remove(existingTenant.User);
            }

            await _context.SaveChangesAsync();
        }
    }
}