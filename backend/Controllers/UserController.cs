using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using backend.DTOs;
using backend.Repositories;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // requires token
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // ONBOARDING
        [HttpPost("onboarding")]
        public async Task<IActionResult> SaveOnboarding([FromBody] OnboardingDto dto)
        {
            try
            {
                // Get userId from JWT
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userIdClaim))
                    return Unauthorized("Invalid token");

                var userId = int.Parse(userIdClaim);

                var user = await _userRepository.GetByIdAsync(userId);

                if (user == null)
                    return NotFound("User not found");

                // Save onboarding data
                user.Intent = dto.Intent;
                user.PropertyType = dto.PropertyType;
                user.PropertyCount = dto.PropertyCount;
                user.Bhk = dto.Bhk;
                user.City = dto.City;
                user.Mobile = dto.Mobile;

                // Approval flow (keep pending)
                user.Status = "Pending";

                await _userRepository.UpdateAsync(user);

                return Ok(new
                {
                    message = "Onboarding completed. Waiting for admin approval.",
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Something went wrong",
                    error = ex.Message
                });
            }
        }
    }
}