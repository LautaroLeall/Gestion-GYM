using System;
using System.ComponentModel.DataAnnotations;

namespace Gimnasio.Api.DTOs
{
    /// <summary>
    /// DTO utilizado para crear o actualizar clases.
    ///
    /// A diferencia del DTO de lectura, este incluye validaciones mediante DataAnnotations,
    /// permitiendo que el API/MVC rechace solicitudes incorrectas antes de llegar al dominio.
    ///
    /// Este enfoque ayuda a:
    /// - Aislar las reglas de entrada del usuario.
    /// - Proteger la entidad de dominio de valores inválidos.
    /// - Facilitar validación automática en controladores.
    /// </summary>
    public class ClaseCreateDto
    {
        /// <summary>
        /// Nombre de la clase. Requerido.
        /// </summary>
        [Required]
        [MaxLength(100)]
        public string Nombre { get; set; } = string.Empty;

        /// <summary>
        /// Descripción breve de la clase.
        /// </summary>
        [MaxLength(50)]
        [RegularExpression(@"^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]*$", ErrorMessage = "La descripción solo puede contener letras y espacios.")]
        public string? Descripcion { get; set; }

        /// <summary>
        /// Capacidad máxima disponible.
        /// Validada para garantizar un cupo entre 5 y 50 personas.
        /// </summary>
        [Range(5, 50, ErrorMessage = "El cupo máximo debe estar entre 5 y 50 personas.")]
        public int CupoMaximo { get; set; }

        /// <summary>
        /// Lista de días de la semana en los que se dicta la clase.
        /// Se usa una lista de enteros para evitar depender de strings o de días en inglés.
        /// </summary>
        [Required]
        public List<int> DiasSemana { get; set; } = new();

        /// <summary>
        /// Hora de inicio de la clase.
        /// Solo se permiten intervalos de 00 o 30 minutos y debe estar entre las 10:00 y 22:00.
        /// </summary>
        [Required]
        public TimeSpan Hora { get; set; }
    }
}
