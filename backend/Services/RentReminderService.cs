using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.Services
{
    public class RentReminderService : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        // 👉 Toggle this to true when testing SMS
        // private readonly bool _testMode = true;

        public RentReminderService(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await SendReminders();
                await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
            }
        }

        private async Task SendReminders()
        {
            using var scope = _scopeFactory.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var sms = scope.ServiceProvider.GetRequiredService<SmsService>();

            var today = DateTime.Now.Date;

            var tenants = await context.Tenants
                .Include(t => t.User)
                .ToListAsync();

            foreach (var tenant in tenants)
            {
                if (tenant.User == null) continue;
                var landlord = tenant.User;

                // -----------------------------
                // 🧪 TEST MODE (send instantly)
                // -----------------------------
                // if (_testMode)
                // {
                //     var msg = $@"Hi {tenant.Name}, your rent of ₹{tenant.RentAmount} is due on {tenant.DueDate:dd MMM yyyy}. - {landlord.Name}";

                //     await sms.SendSms(tenant.Phone, msg);
                //     continue;
                // }

                // -----------------------------
                // 📅 NORMAL MODE (real logic)
                // -----------------------------
                var due = tenant.DueDate.Date;

                // 3 days before
                if (due.AddDays(-3) == today && !tenant.Reminder3Sent)
                {
                    var msg = $@"Hi {tenant.Name}, your rent of ₹{tenant.RentAmount} is due on {tenant.DueDate:dd MMM yyyy}. - {landlord.Name}";

                    await sms.SendSms(tenant.Phone, msg);
                    tenant.Reminder3Sent = true;
                }

                // 1 day before
                if (due.AddDays(-1) == today && !tenant.Reminder1Sent)
                {
                    var msg = $@"Reminder {tenant.Name}, your rent is due tomorrow ({tenant.DueDate:dd MMM yyyy}). - {landlord.Name}";

                    await sms.SendSms(tenant.Phone, msg);
                    tenant.Reminder1Sent = true;
                }
            }

            await context.SaveChangesAsync();
        }
    }
}