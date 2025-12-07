using System;
using System.ComponentModel.DataAnnotations;

namespace Gimnasio.Api.DTOs
{
    /// <summary>
    /// DTO para crear una inscripción.  Permite validar la entrada y
    /// separa propiedades generadas automáticamente, como el
    /// identificador.
    /// </summary>
    public class InscripcionCreateDto
    {
        [Required]
        public int SocioId { get; set; }

        [Required]
        public int ClaseId { get; set; }

        public DateTime FechaReserva { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Fecha y hora específica de la clase que se está reservando.
        /// </summary>
        [Required]
        public DateTime FechaClase { get; set; }
    }
}