namespace backend.Models
{
    public class Tenant
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Phone { get; set; }
        public decimal RentAmount { get; set; }
        public DateTime DueDate { get; set; }
        public bool Reminder3Sent { get; set; } = false;
        public bool Reminder1Sent { get; set; } = false;
        // Foreign keys
        public int LandlordId { get; set; }
        public int UserId { get; set; }

        // prevent JSON cycle
        public User? User { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // OPTIONAL FIX (safe)
        public ICollection<Rent> Rents { get; set; } = new List<Rent>();
    }
}