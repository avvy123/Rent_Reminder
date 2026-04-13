using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<Rent> Rents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User -> Tenant relationship (One-to-Many)
            modelBuilder.Entity<Tenant>()
                .HasOne(t => t.User)
                .WithMany(u => u.Tenants)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Tenant -> Rent relationship (One-to-Many)
            modelBuilder.Entity<Rent>()
                .HasOne(r => r.Tenant)
                .WithMany(t => t.Rents)
                .HasForeignKey(r => r.TenantId)
                .OnDelete(DeleteBehavior.Cascade);

            // Ensure unique rent per month per tenant
            modelBuilder.Entity<Rent>()
                .HasIndex(r => new { r.TenantId, r.Month })
                .IsUnique();

            // Store decimal with precision
            modelBuilder.Entity<Tenant>()
                .Property(t => t.RentAmount)
                .HasColumnType("decimal(18,2)");
        }
    }
}
