using System;

namespace Gimnasio.Api.DTOs
{
    /// <summary>
    /// DTO de lectura para representar un socio en la capa de presentación o transporte.
    ///
    /// Este DTO se utiliza para devolver información al cliente sin exponer detalles internos
    /// de la entidad de dominio. Contiene los datos que pueden ser mostrados al usuario o 
    /// consumidos por otras capas.
    ///
    /// A diferencia del DTO de creación, aquí no se aplican validaciones ya que
    /// no se utiliza para recibir datos de entrada.
    /// </summary>
    public class SocioDto
    {
        /// <summary>
        /// Identificador único del socio.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nombre del socio.
        /// </summary>
        public string Nombre { get; set; } = string.Empty;

        /// <summary>
        /// Apellido del socio.
        /// </summary>
        public string Apellido { get; set; } = string.Empty;

        /// <summary>
        /// Fecha de nacimiento del socio.
        /// Se envía al cliente tal cual es almacenada en el sistema.
        /// </summary>
        public DateTime FechaNacimiento { get; set; }

        /// <summary>
        /// Dirección de correo electrónico del socio. Puede ser null.
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// Número de teléfono registrado del socio.
        /// </summary>
        public string Telefono { get; set; } = string.Empty;
    }
}
