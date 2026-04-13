using backend.Models;

namespace backend.Repositories
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllAsync();
        Task<User?> GetUserByEmailAsync(string email);
        Task<List<User>> GetUsersByRoleAsync(string role);
        Task<User?> GetUserByIdAsync(int id);
        Task<User> CreateUserAsync(User user);
        Task<User> UpdateAsync(User user);
        Task<User> GetByIdAsync(int id);
        Task<List<User>> GetUsersByStatusAsync(string status);
        Task SaveChangesAsync();
    }
}
