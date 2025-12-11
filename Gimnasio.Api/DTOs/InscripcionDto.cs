using System;

namespace Gimnasio.Api.DTOs
{
    /// <summary>
    /// DTO de lectura para representar una inscripción realizada por un socio.
    /// 
    /// Este DTO se utiliza para devolver información al cliente sin exponer la entidad de dominio completa.
    /// Incluye datos crudos (Ids, fechas) y datos derivados (nombre del socio y de la clase),
    /// lo que permite mostrar información útil directamente en la interfaz sin requerir múltiples llamadas.
    /// 
    /// Este patrón mejora el rendimiento y simplifica la experiencia del cliente.
    /// </summary>
    public class InscripcionDto
    {
        /// <summary>
        /// Identificador único de la inscripción.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Identificador del socio que realizó la inscripción.
        /// </summary>
        public int SocioId { get; set; }

        /// <summary>
        /// Identificador de la clase a la que se inscribió el socio.
        /// </summary>
        public int ClaseId { get; set; }

        /// <summary>
        /// Fecha y hora exacta en que se realizó la reserva.
        /// Este valor proviene del servidor, no del cliente.
        /// </summary>
        public DateTime FechaReserva { get; set; }

        /// <summary>
        /// Fecha y hora real de la clase reservada.
        /// </summary>
        public DateTime FechaClase { get; set; }

        /// <summary>
        /// Nombre completo del socio.
        /// Campo de conveniencia para evitar realizar consultas adicionales desde el cliente.
        /// </summary>
        public string? SocioNombreCompleto { get; set; }

        /// <summary>
        /// Nombre de la clase reservada.
        /// Útil para listados y vistas de administración.
        /// </summary>
        public string? ClaseNombre { get; set; }
    }
}
