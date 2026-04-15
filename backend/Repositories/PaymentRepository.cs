using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

public class PaymentRepository
{
    private readonly AppDbContext _context;

    public PaymentRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task SavePaymentAsync(Payment payment)
    {
        _context.Payments.Add(payment);
        await _context.SaveChangesAsync();
    }

    public async Task<Rent?> GetRentByTenantIdAsync(int tenantId)
    {
        return await _context.Rents
            .FirstOrDefaultAsync(r => r.TenantId == tenantId);
    }

    public async Task UpdateRentAsync(Rent rent)
    {
        _context.Rents.Update(rent);
        await _context.SaveChangesAsync();
    }
}