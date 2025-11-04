using System;
using System.ComponentModel.DataAnnotations;

namespace Gimnasio.Api.DTOs
{
    /// <summary>
    /// DTO para la creación y actualización de clases. Permite validar la
    /// entrada del usuario y separar el modelo de dominio de la interfaz.
    /// </summary>
    public class ClaseCreateDto
    {
        [Required]
        [MaxLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [MaxLength(255)]
        public string? Descripcion { get; set; }

        [Required]
        [MaxLength(100)]
        public string Instructor { get; set; } = string.Empty;

        [Range(1, int.MaxValue)]
        public int CupoMaximo { get; set; }

        /// <summary>
        /// Lista de días de la semana en los que se dicta la clase. Deben coincidir con los nombres de DayOfWeek.
        /// </summary>
        [Required]
        public List<string> DiasSemana { get; set; } = new();

        /// <summary>
        /// Hora de inicio de la clase.
        /// </summary>
        [Required]
        public TimeSpan Hora { get; set; }
    }
}