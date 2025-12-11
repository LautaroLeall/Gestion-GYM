using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Gimnasio.Api.Data;

namespace Gimnasio.Api.Repositories
{
    /// <summary>
    /// Implementación genérica del patrón Repository.
    /// 
    /// Este repositorio encapsula las operaciones CRUD básicas para cualquier entidad manejada por el <see cref="AppDbContext"/> 
    /// y utiliza EF Core  para realizar el acceso a datos.
    ///
    /// - Evita duplicación de código en cada entidad.
    /// - Centraliza la lógica de acceso a datos.
    /// - Mejora la testabilidad y el mantenimiento.
    /// - Cumple con el principio SOLID Inversión de Dependencias (DIP).
    /// 
    /// Las entidades deben ser clases y encontrarse registradas en el DbContext.
    /// </summary>
    /// <typeparam name="T">Entidad de dominio que será gestionada por el repositorio.</typeparam>
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly AppDbContext _context;
        private readonly DbSet<T> _dbSet;

        /// <summary>
        /// El repositorio recibe el contexto mediante inyección de dependencias.
        /// Esto permite desacoplar la lógica de datos del resto del sistema.
        /// </summary>
        public GenericRepository(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>(); // Recupera automáticamente el DbSet correspondiente a la entidad T.
        }

        /// <summary>
        /// Inserta una nueva entidad en la base de datos.
        /// 
        /// EF Core rastrea la entidad y ejecuta un INSERT al llamar a SaveChangesAsync().
        /// </summary>
        public async Task<T> AddAsync(T entity)
        {
            _dbSet.Add(entity);                 // Marca la entidad como Added.
            await _context.SaveChangesAsync();  // Persiste en BD.
            return entity;                      // Devuelve la entidad ya guardada (con Id asignado si aplica).
        }

        /// <summary>
        /// Elimina una entidad por su Id.
        /// 
        /// Si no existe, la operación no hace nada.
        /// FindAsync utiliza la clave primaria definida en el modelo.
        /// </summary>
        public async Task DeleteAsync(int id)
        {
            var entity = await _dbSet.FindAsync(id);

            if (entity != null)
            {
                _dbSet.Remove(entity);          // Marca como Deleted.
                await _context.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Verifica si una entidad existe por su Id.
        /// 
        /// FindAsync realiza la búsqueda usando la primary key sin necesidad de consultas adicionales.
        /// </summary>
        public async Task<bool> ExistsAsync(int id)
        {
            var entity = await _dbSet.FindAsync(id);
            return entity != null;
        }

        /// <summary>
        /// Obtiene todas las entidades del conjunto.
        /// 
        /// ToListAsync ejecuta la consulta en la base de datos.
        /// No incluye propiedades de navegación (requiere Include en repositorios especializados).
        /// </summary>
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        /// <summary>
        /// Obtiene una entidad por su Id.
        /// 
        /// Devuelve null si no existe.
        /// </summary>
        public async Task<T?> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        /// <summary>
        /// Actualiza una entidad existente.
        ///
        /// EF Core no requiere obtener la entidad desde la base antes de actualizarla,
        /// siempre que se establezca su estado como Modified.
        /// 
        /// - Este método sobrescribe todos los campos de la entidad.
        /// - Para actualizaciones parciales se debe usar un repositorio o servicio especializado.
        /// </summary>
        public async Task UpdateAsync(T entity)
        {
            _context.Entry(entity).State = EntityState.Modified; // Marca la entidad para UPDATE.
            await _context.SaveChangesAsync();
        }
    }
}
