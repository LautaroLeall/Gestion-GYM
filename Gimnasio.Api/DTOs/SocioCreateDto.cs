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
        [MinLength(3, ErrorMessage = "El nombre debe tener al menos 3 caracteres.")]
        [RegularExpression(@"^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$", ErrorMessage = "El nombre solo puede contener letras y espacios.")]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        [MinLength(3, ErrorMessage = "El apellido debe tener al menos 3 caracteres.")]
        [RegularExpression(@"^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$", ErrorMessage = "El apellido solo puede contener letras y espacios.")]
        public string Apellido { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Date)]
        public DateTime FechaNacimiento { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^\d{10,13}$", ErrorMessage = "El teléfono debe contener entre 10 y 13 dígitos.")]
        public string Telefono { get; set; } = string.Empty;

        [Required]
        public int MembresiaId { get; set; }
    }
}