using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class CreateTenantDto
    {
        [Required]
        public required string Name { get; set; }
        
        [Required, EmailAddress]
        public required string Email { get; set; }
        
        [Required]
        public required string Phone { get; set; }
        
        [Required]
        [Range(1, double.MaxValue, ErrorMessage = "Rent amount must be greater than 0")]
        public decimal RentAmount { get; set; }
        
        [Required]
        public DateTime DueDate { get; set; }

        public string TempPassword { get; set; } = string.Empty;
    }

    public class UpdateTenantDto
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public decimal? RentAmount { get; set; }
        public DateTime? DueDate { get; set; }
    }

    public class TenantResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public decimal RentAmount { get; set; }
        public DateTime DueDate { get; set; }

        public int LandlordId { get; set; }
    }

    public class TenantCreatedResponseDto
    {
        public int TenantId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string TempPassword { get; set; } = string.Empty;
    }
}
