using System;

namespace Gimnasio.Api.DTOs
{
    /// <summary>
    /// Representación de un socio para la capa de presentación o transporte.
    /// Incluye los datos básicos y, de forma opcional, el nombre de la
    /// membresía asociada. Se utiliza para exponer información a los
    /// clientes sin revelar la estructura interna de las entidades.
    /// </summary>
    public class SocioDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public DateTime FechaNacimiento { get; set; }
        public string? Email { get; set; }
        public string? Telefono { get; set; }
        public int? MembresiaId { get; set; }
        public string? MembresiaNombre { get; set; }
    }
}