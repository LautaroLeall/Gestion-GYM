using System;
using System.ComponentModel.DataAnnotations;

namespace Gimnasio.Api.DTOs
{
    /// <summary>
    /// DTO utilizado para la creación o actualización de socios.
    /// 
    /// Se separa del DTO de lectura para:
    /// - Aplicar validaciones específicas de entrada.
    /// - Evitar que el usuario envíe datos que solo el servidor debe controlar
    /// - Proteger la entidad de dominio de valores inválidos antes de crear o modificar un registro.
    /// </summary>
    public class SocioCreateDto
    {
        /// <summary>
        /// Nombre del socio.
        /// Validado con longitud mínima, máxima y caracteres permitidos.
        /// </summary>
        [Required]
        [MaxLength(50)]
        [MinLength(3, ErrorMessage = "El nombre debe tener al menos 3 caracteres.")]
        [RegularExpression(@"^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$", ErrorMessage = "El nombre solo puede contener letras y espacios.")]
        public string Nombre { get; set; } = string.Empty;

        /// <summary>
        /// Apellido del socio.
        /// Misma validación que el nombre para mantener consistencia.
        /// </summary>
        [Required]
        [MaxLength(50)]
        [MinLength(3, ErrorMessage = "El apellido debe tener al menos 3 caracteres.")]
        [RegularExpression(@"^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$", ErrorMessage = "El apellido solo puede contener letras y espacios.")]
        public string Apellido { get; set; } = string.Empty;

        /// <summary>
        /// Fecha de nacimiento.
        /// </summary>
        [Required]
        [DataType(DataType.Date)]
        public DateTime FechaNacimiento { get; set; }

        /// <summary>
        /// Email del socio.
        /// Validado con formato estándar de correo electrónico.
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Número de teléfono del socio.
        /// Se valida:
        /// - Que tenga entre 10 y 13 dígitos (útil para números nacionales e internacionales).
        /// - Que solo contenga números.
        /// </summary>
        [Required]
        [Phone]
        [RegularExpression(@"^\d{10,13}$", ErrorMessage = "El teléfono debe contener entre 10 y 13 dígitos.")]
        public string Telefono { get; set; } = string.Empty;
    }
}
