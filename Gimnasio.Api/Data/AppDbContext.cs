using Microsoft.EntityFrameworkCore;
using Gimnasio.Api.Models;

namespace Gimnasio.Api.Data
{
    /// <summary>
    /// Contexto de base de datos para el gimnasio. Hereda de DbContext y
    /// define las colecciones de entidades que EF Core convertirá en
    /// tablas. También se configuran relaciones y restricciones.
    /// </summary>
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Socio> Socios => Set<Socio>();
        public DbSet<Membresia> Membresias => Set<Membresia>();
        public DbSet<Clase> Clases => Set<Clase>();
        public DbSet<Reserva> Reservas => Set<Reserva>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Restricción de clave única en el correo electrónico del socio.
            modelBuilder.Entity<Socio>()
                .HasIndex(s => s.Email)
                .IsUnique()
                .HasFilter(null);

            // Relación uno a muchos entre Membresia y Socio.
            modelBuilder.Entity<Membresia>()
                .HasMany(m => m.Socios)
                .WithOne(s => s.Membresia)
                .HasForeignKey(s => s.MembresiaId)
                .OnDelete(DeleteBehavior.SetNull);

            // Relación uno a muchos entre Clase y Reserva.
            modelBuilder.Entity<Clase>()
                .HasMany(c => c.Reservas)
                .WithOne(r => r.Clase)
                .HasForeignKey(r => r.ClaseId);

            // Relación uno a muchos entre Socio y Reserva.
            modelBuilder.Entity<Socio>()
                .HasMany(s => s.Reservas)
                .WithOne(r => r.Socio)
                .HasForeignKey(r => r.SocioId);

            // No se cargan datos semilla en este contexto. Todas las tablas se crearán vacías
            // para que el sistema arranque sin información precargada. Los usuarios deberán
            // ingresar socios, membresías, clases y reservas desde cero.
        }
    }
}