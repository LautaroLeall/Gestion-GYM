using System;

namespace Gimnasio.Api.DTOs
{
    /// <summary>
    /// Representación de un socio para la capa de presentación o transporte.
    /// Incluye los datos básicos (nombre, apellido, fecha de nacimiento, correo electrónico y teléfono).  
    /// </summary>
    public class SocioDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public DateTime FechaNacimiento { get; set; }
        public string? Email { get; set; }

        public string Telefono { get; set; } = string.Empty;

    }
}