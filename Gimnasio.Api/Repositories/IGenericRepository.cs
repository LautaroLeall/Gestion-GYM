using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gimnasio.Api.Repositories
{
    /// <summary>
    /// Interfaz genérica que define las operaciones CRUD básicas para una entidad de dominio.
    /// 
    /// Esta interfaz abstrae el acceso a datos y permite implementar el patrón Repository, 
    /// logrando desacoplar la lógica de negocio de la infraestructura (EF Core en este caso).
    ///
    /// Al trabajar sobre interfaces:
    /// - Se facilita el testeo mediante mocks o repositorios en memoria.
    /// - Se cumple el principio SOLID: Inversión de Dependencias.
    /// - El código de servicios y controladores no depende de la base de datos concreta.
    ///
    /// Todas las operaciones son asincrónicas para mejorar la escalabilidad del backend, 
    /// permitiendo manejar más solicitudes concurrentes sin bloquear hilos.
    /// </summary>
    /// <typeparam name="T">
    /// Tipo de la entidad que será gestionada por el repositorio.
    /// Debe ser una clase para permitir que EF Core la trate como entidad del modelo.
    /// </typeparam>
    public interface IGenericRepository<T> where T : class
    {
        /// <summary>
        /// Obtiene todas las entidades del tipo T.
        /// Puede usarse para listados, reportes o vistas generales.
        /// </summary>
        Task<IEnumerable<T>> GetAllAsync();

        /// <summary>
        /// Busca una entidad por su identificador.
        /// Devuelve null si no existe.
        /// </summary>
        Task<T?> GetByIdAsync(int id);

        /// <summary>
        /// Inserta una nueva entidad en el repositorio.
        /// Devuelve la entidad creada (útil cuando la BD genera el Id).
        /// </summary>
        Task<T> AddAsync(T entity);

        /// <summary>
        /// Actualiza una entidad existente en el repositorio.
        /// Requiere que la entidad esté correctamente rastreada o se configure como Modified.
        /// </summary>
        Task UpdateAsync(T entity);

        /// <summary>
        /// Elimina una entidad por su Id.
        /// Si no existe, la implementación no debería lanzar excepciones.
        /// </summary>
        Task DeleteAsync(int id);

        /// <summary>
        /// Verifica si una entidad existe por su Id.
        /// Útil para validaciones previas antes de actualizar o eliminar.
        /// </summary>
        Task<bool> ExistsAsync(int id);
    }
}
