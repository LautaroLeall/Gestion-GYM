using System;
using System.ComponentModel.DataAnnotations;

namespace Gimnasio.Api.DTOs
{
    /// <summary>
    /// DTO utilizado para la creación o actualización de socios. Se separa
    /// del DTO de lectura para permitir validaciones específicas de entrada
    /// sin exponer propiedades que solo el servidor debe controlar.
    /// </summary>
    public class SocioCreateDto
    {
        [Required]
        [MaxLength(50)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Apellido { get; set; } = string.Empty;

        [DataType(DataType.Date)]
        public DateTime FechaNacimiento { get; set; }

        [EmailAddress]
        public string? Email { get; set; }

        [Phone]
        public string? Telefono { get; set; }

        public int? MembresiaId { get; set; }
    }
}