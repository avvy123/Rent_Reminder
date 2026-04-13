namespace backend.Services
{
    public interface IAiService
    {
        Task<string> GenerateReminderMessageAsync(int tenantId, int userId);
    }
}
