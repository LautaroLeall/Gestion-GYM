using Microsoft.EntityFrameworkCore;
using Gimnasio.Api.Models;

namespace Gimnasio.Api.Data
{
    /// <summary>
    /// Contexto de base de datos para el gimnasio. 
    /// Hereda de DbContext y define las colecciones de entidades que EF Core convertirá en tablas.
    /// También se configuran relaciones y restricciones.
    /// </summary>
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Socio> Socios => Set<Socio>();
        // Las inscripciones vinculan únicamente socios y clases.
        public DbSet<Clase> Clases => Set<Clase>();
        // Esta tabla representa la relación de muchos a muchos entre socios y clases
        public DbSet<Inscripcion> Inscripciones => Set<Inscripcion>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Restricción de clave única en el correo electrónico del socio.
            modelBuilder.Entity<Socio>()
                .HasIndex(s => s.Email)
                .IsUnique()
                .HasFilter(null);

            // Relación uno a muchos entre Clase e Inscripcion.  
            // Una clase puede tener muchas inscripciones y cada inscripción pertenece a una sola clase.
            modelBuilder.Entity<Clase>()
                .HasMany(c => c.Inscripciones)
                .WithOne(i => i.Clase)
                .HasForeignKey(i => i.ClaseId);

            // Relación uno a muchos entre Socio e Inscripcion.  
            // Un socio puede inscribirse en muchas clases y cada inscripción pertenece a un solo socio.
            modelBuilder.Entity<Socio>()
                .HasMany(s => s.Inscripciones)
                .WithOne(i => i.Socio)
                .HasForeignKey(i => i.SocioId);

            // No se cargan datos semilla en este contexto. 
            // Todas las tablas se crearán vacías para que el sistema arranque sin información precargada. 
            // Los usuarios deberán ingresar socios, clases y inscripciones manualmente.
        }
    }
}