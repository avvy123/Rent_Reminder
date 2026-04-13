using backend.Repositories;

namespace backend.Services
{
    public class AiService : IAiService
    {
        private readonly ITenantRepository _tenantRepository;

        public AiService(ITenantRepository tenantRepository)
        {
            _tenantRepository = tenantRepository;
        }

        public async Task<string> GenerateReminderMessageAsync(int tenantId, int userId)
        {
            var tenant = await _tenantRepository.GetTenantByIdAsync(tenantId, userId);
            if (tenant == null) throw new Exception("Tenant not found or unauthorized");

            // Simple dynamic logic to generate the reminder message
            string formattedDate = tenant.DueDate.ToString("MMM dd, yyyy");
            return $"Hi {tenant.Name}, your rent of ₹{tenant.RentAmount} is due on {formattedDate}.";
        }
    }
}
