using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<User>> GetUsersByRoleAsync(string role);
        Task<List<User>> GetAllUsersAsync();
        Task<List<User>> GetUsersByStatusAsync(string status);
        Task<User?> GetUserByIdAsync(int id);
        Task<User> UpdateAsync(User user);
    }
}