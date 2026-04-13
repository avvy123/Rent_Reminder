using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class RegisterDto
    {
        [Required]
        public required string Name { get; set; }
        
        [Required, EmailAddress]
        public required string Email { get; set; }
        
        [Required, MinLength(6)]
        public required string Password { get; set; }
    }

    public class LoginDto
    {
        [Required, EmailAddress]
        public required string Email { get; set; }
        
        [Required]
        public required string Password { get; set; }
    }

    public class AuthResponseDto
    {   
        public required string Token { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Role { get; set; }
    }
}
