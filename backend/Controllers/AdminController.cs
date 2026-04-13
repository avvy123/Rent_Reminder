using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Services.Interfaces;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly IUserService _userService;

    public AdminController(IUserService userService)
    {
        _userService = userService;
    }

    // Pending users
    [HttpGet("pending-users")]
    public async Task<IActionResult> GetPendingUsers()
    {
        var users = await _userService.GetUsersByStatusAsync("Pending");
        return Ok(users);
    }

    // All users
    [HttpGet("all-users")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(users);
    }

    // Approve user
    [HttpPut("approve/{id}")]
    public async Task<IActionResult> Approve(int id)
    {
        var user = await _userService.GetUserByIdAsync(id);

        if (user == null)
            return NotFound("User not found");

        // Decide role based on intent
        if (user.Intent == "landlord")
            user.Role = "Landlord";
        else if (user.Intent == "tenant")
            user.Role = "Tenant";
        else
            return BadRequest("Intent not set");

        user.Status = "Approved";

        await _userService.UpdateAsync(user);

        return Ok("User approved");
    }

    // Reject user
    [HttpPut("reject/{id}")]
    public async Task<IActionResult> Reject(int id)
    {
        var user = await _userService.GetUserByIdAsync(id);

        if (user == null)
            return NotFound("User not found");

        user.Status = "Rejected";
        user.Role = "User";

        await _userService.UpdateAsync(user);

        return Ok("User rejected");
    }
}