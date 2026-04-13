using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Role { get; set; } = "User";
        public string? Intent { get; set; }
        public string? PropertyType { get; set; }
        public string? PropertyCount { get; set; }
        public string? City { get; set; }
        public string Status { get; set; } = "Pending";
        public string? Bhk { get; set; }
        [MaxLength(10)]
        public string? Mobile { get; set; }
        
        [JsonIgnore]
        public ICollection<Tenant> Tenants { get; set; } = new List<Tenant>();
    }
}