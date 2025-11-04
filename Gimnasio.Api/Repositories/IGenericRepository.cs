using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gimnasio.Api.Repositories
{
    /// <summary>
    /// Define las operaciones CRUD básicas para una entidad de dominio. La
    /// interfaz se implementa de forma genérica para permitir reutilizar
    /// el mismo código con distintas entidades. Todas las operaciones son
    /// asincrónicas para evitar bloquear hilos de trabajo.
    /// </summary>
    /// <typeparam name="T">Tipo de la entidad.</typeparam>
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T?> GetByIdAsync(int id);
        Task<T> AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}