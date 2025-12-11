using Microsoft.EntityFrameworkCore;
using Gimnasio.Api.Models;

namespace Gimnasio.Api.Data
{
    /// <summary>
    /// Contexto de base de datos para el gimnasio.
    /// 
    /// Este contexto hereda de <see cref="DbContext"/> 
    /// Representa la unidad de trabajo que gestiona la conexión con la base de datos, 
    /// así como el mapeo entre las entidades del dominio y las tablas correspondientes en EF Core.
    /// 
    /// Define los DbSet utilizados por la aplicación, configura relaciones entre entidades,
    /// crea índices y valida restricciones a nivel de modelo.
    /// 
    /// EF Core:
    /// - Construirá el esquema de la base según estas configuraciones.
    /// - Resolverá las relaciones de navegación.
    /// - Aplicará validaciones estructurales (índices, claves foráneas, restricciones).
    /// </summary>
    public class AppDbContext : DbContext
    {
        /// <summary>
        /// Constructor estándar para inyectar las opciones del DbContext
        /// </summary>
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        /// <summary>
        /// Tabla de socios.
        /// EF Core generará una tabla llamada "Socios" con columnas mapeadas a la entidad <see cref="Socio"/>.
        /// </summary>
        public DbSet<Socio> Socios => Set<Socio>();

        /// <summary>
        /// Tabla de clases.
        /// </summary>
        public DbSet<Clase> Clases => Set<Clase>();

        /// <summary>
        /// Tabla de inscripciones.
        /// Esta entidad actúa como tabla intermedia many-to-many con datos adicionales.
        /// </summary>
        public DbSet<Inscripcion> Inscripciones => Set<Inscripcion>();

        /// <summary>
        /// Configuraciones avanzadas del modelo ejecutadas por EF Core al crear el esquema de datos.
        /// Definimos relaciones, índices, restricciones y comportamientos específicos.
        /// </summary>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ÍNDICE ÚNICO – SOCIO.EMAIL
            // Crea una restricción UNIQUE en la columna Email.
            // La lógica del sistema asume que cada socio debe tener un email singular, evitando duplicados

            // .HasFilter(null) se utiliza para evitar que EF Core genere un filtro 
            // "WHERE Email IS NOT NULL", permitiendo que varios socios no tengan email,
            // pero si lo tienen, debe ser único.
            modelBuilder.Entity<Socio>()
                .HasIndex(s => s.Email)
                .IsUnique()
                .HasFilter(null);

            // RELACIÓN CLASE (1) → INSCRIPCIONES (N)
            // Una clase puede tener múltiples inscripciones.
            // La navegación inversa (Inscripcion.Clase) se usa para recuperar información contextual, como horario y cupo.
            // ForeignKey: Inscripcion.ClaseId
            modelBuilder.Entity<Clase>()
                .HasMany(c => c.Inscripciones)
                .WithOne(i => i.Clase)
                .HasForeignKey(i => i.ClaseId)
                .OnDelete(DeleteBehavior.Cascade); // Si se elimina una clase, se eliminan sus inscripciones.

            // RELACIÓN SOCIO (1) → INSCRIPCIONES (N)
            // Un socio puede anotarse en muchas clases.
            // ForeignKey: Inscripcion.SocioId
            modelBuilder.Entity<Socio>()
                .HasMany(s => s.Inscripciones)
                .WithOne(i => i.Socio)
                .HasForeignKey(i => i.SocioId)
                .OnDelete(DeleteBehavior.Cascade); // Si se elimina un socio, se eliminan sus inscripciones.


            // SEEDING / DATA INITIAL (NO UTILIZADO)
            // Este enfoque evita datos basura o inconsistentes en entornos de producción.
        }
    }
}
