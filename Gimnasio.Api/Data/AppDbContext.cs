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

            // Seed de datos opcional para facilitar pruebas.
            modelBuilder.Entity<Membresia>().HasData(
                new Membresia { Id = 1, Nombre = "Básico", Descripcion = "Acceso a sala de musculación", Precio = 3000m, DuracionDias = 30 },
                new Membresia { Id = 2, Nombre = "Premium", Descripcion = "Acceso a todas las áreas y clases", Precio = 5000m, DuracionDias = 30 }
            );

            modelBuilder.Entity<Socio>().HasData(
                new Socio { Id = 1, Nombre = "Juan", Apellido = "Pérez", FechaNacimiento = new DateTime(1990, 5, 20), Email = "juan@example.com", Telefono = "123456", MembresiaId = 1 },
                new Socio { Id = 2, Nombre = "María", Apellido = "Gómez", FechaNacimiento = new DateTime(1985, 3, 15), Email = "maria@example.com", Telefono = "789101", MembresiaId = 2 }
            );

            modelBuilder.Entity<Clase>().HasData(
                new Clase
                {
                    Id = 1,
                    Nombre = "Yoga",
                    Descripcion = "Clase de yoga para principiantes",
                    Instructor = "Laura",
                    CupoMaximo = 15,
                    DiasSemana = "Monday,Wednesday",
                    Hora = new TimeSpan(18, 0, 0)
                },
                new Clase
                {
                    Id = 2,
                    Nombre = "Spinning",
                    Descripcion = "Entrenamiento cardiovascular",
                    Instructor = "Carlos",
                    CupoMaximo = 20,
                    DiasSemana = "Tuesday,Thursday",
                    Hora = new TimeSpan(20, 0, 0)
                }
            );

            // Reserva seeds intentionally omit Socio/Clase navigation to avoid cycles.
            modelBuilder.Entity<Reserva>().HasData(
                new Reserva { Id = 1, SocioId = 1, ClaseId = 1, FechaReserva = DateTime.UtcNow },
                new Reserva { Id = 2, SocioId = 2, ClaseId = 2, FechaReserva = DateTime.UtcNow }
            );
        }
    }
}