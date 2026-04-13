using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Rent
    {
        public int Id { get; set; }

        public int TenantId { get; set; }

        [JsonIgnore]
        public Tenant? Tenant { get; set; }

        // For grouping (April 2026, May 2026)
        public required string Month { get; set; }

        // actual date when rent record is created
        public DateTime RentDate { get; set; }

        // Payment due date
        public DateTime DueDate { get; set; }

        public RentStatus Status { get; set; } = RentStatus.Unpaid;

        public DateTime? PaidDate { get; set; }
    }

    public enum RentStatus
    {
        Unpaid,
        Paid
    }
}