using System.ComponentModel.DataAnnotations;

namespace Gimnasio.Api.DTOs
{
    /// <summary>
    /// DTO para la creación o modificación de planes de membresía. Permite
    /// validar la entrada del usuario y desacoplar el modelo de dominio de
    /// la forma de entrada de datos.
    /// </summary>
    public class MembresiaCreateDto
    {
        [Required]
        [MaxLength(100)]
        [MinLength(4, ErrorMessage = "El nombre debe tener al menos 4 caracteres.")]
        [RegularExpression(@"^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$", ErrorMessage = "El nombre solo puede contener letras y espacios.")]
        public string Nombre { get; set; } = string.Empty;

        [MaxLength(20)]
        [RegularExpression(@"^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]*$", ErrorMessage = "La descripción solo puede contener letras y espacios.")]
        public string? Descripcion { get; set; }

        [Range(10000, double.MaxValue, ErrorMessage = "El precio mínimo es $10.000.")]
        public decimal Precio { get; set; }

        [Range(1, 3650)]
        public int DuracionDias { get; set; }
    }
}