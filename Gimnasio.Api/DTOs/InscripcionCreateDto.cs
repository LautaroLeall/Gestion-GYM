using System;
using System.ComponentModel.DataAnnotations;

namespace Gimnasio.Api.DTOs
{
    /// <summary>
    /// DTO utilizado para crear una inscripción.
    ///
    /// Este DTO representa exclusivamente los datos que el cliente debe enviar
    /// para generar una nueva inscripción. 
    ///
    /// No incluye propiedades como:
    /// - Id (lo genera la base)
    /// - FechaReserva (la establece el servidor)
    /// - Nombre del socio o de la clase (datos derivados)
    /// </summary>
    public class InscripcionCreateDto
    {
        /// <summary>
        /// Identificador del socio que realiza la reserva.
        /// </summary>
        [Required]
        public int SocioId { get; set; }

        /// <summary>
        /// Identificador de la clase elegida.
        /// </summary>
        [Required]
        public int ClaseId { get; set; }

        /// <summary>
        /// Fecha y hora específica de la clase a la que se inscribe el socio.
        /// Este valor se valida junto con reglas de negocio en el servicio:
        /// - Verificación de disponibilidad.
        /// - Correspondencia con los días configurados en la clase.
        /// </summary>
        [Required]
        public DateTime FechaClase { get; set; }
    }
}
