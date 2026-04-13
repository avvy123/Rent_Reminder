using backend.Models;
using backend.Repositories;
using backend.Services.Interfaces;

public class UserService : IUserService
{
    private readonly IUserRepository _repo;

    public UserService(IUserRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<User>> GetUsersByRoleAsync(string role)
    {
        return await _repo.GetUsersByRoleAsync(role);
    }

    public async Task<List<User>> GetUsersByStatusAsync(string status)
    {
        return await _repo.GetUsersByStatusAsync(status);
    }

    public async Task<User?> GetUserByIdAsync(int id)
    {
        return await _repo.GetUserByIdAsync(id);
    }

    public async Task<User> UpdateAsync(User user)
    {
        return await _repo.UpdateAsync(user);
    }

    public async Task<List<User>> GetAllUsersAsync()
    {
        return await _repo.GetAllAsync();
    }
}