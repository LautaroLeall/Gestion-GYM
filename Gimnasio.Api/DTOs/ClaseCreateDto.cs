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

        [MaxLength(50)]
        [RegularExpression(@"^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]*$", ErrorMessage = "La descripción solo puede contener letras y espacios.")]
        public string? Descripcion { get; set; }

        /// <summary>
        /// Capacidad máxima de la clase. Debe estar entre 5 y 50 personas.
        /// </summary>
        [Range(5, 50, ErrorMessage = "El cupo máximo debe estar entre 5 y 50 personas.")]
        public int CupoMaximo { get; set; }

        /// <summary>
        /// Lista de días de la semana en los que se dicta la clase.
        /// Cada valor representa un día de la semana (1=Lunes, 2=Martes, …, 7=Domingo).
        /// Se utiliza una lista de enteros para evitar depender de los nombres en inglés.
        /// </summary>
        [Required]
        public List<int> DiasSemana { get; set; } = new();

        /// <summary>
        /// Hora de inicio de la clase.
        /// Debe estar en intervalos de media hora (:00 o :30) y entre 10:00 y 22:00 (sin incluir 22:00).
        /// </summary>
        [Required]
        public TimeSpan Hora { get; set; }
    }
}