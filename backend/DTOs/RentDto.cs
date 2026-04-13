using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.DTOs
{
    public class CreateRentDto
    {
        [Required]
        public int TenantId { get; set; }
        
        [Required]
        public required string Month { get; set; } // YYYY-MM

        public DateTime DueDate { get; set; }
    }

    public class UpdateRentDto
    {
        [Required]
        public RentStatus Status { get; set; }
    }

    public class RentResponseDto
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public string Month { get; set; }
        public int Status { get; set; }
        public DateTime? PaidDate { get; set; }
        public DateTime DueDate { get; set;}
    }
}
