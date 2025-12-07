// DTO utilizado antiguamente para crear o modificar planes de membresía.
// El sistema actual ya no gestiona estas entidades, por lo que la
// clase queda deshabilitada mediante directivas de preprocesador.
#if false
using System.ComponentModel.DataAnnotations;

namespace Gimnasio.Api.DTOs
{
    public class MembresiaCreateDto
    {
        [Required]
        [MaxLength(100)]
        [MinLength(4, ErrorMessage = "El nombre debe tener al menos 4 caracteres.")]
        [RegularExpression(@"^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$", ErrorMessage = "El nombre solo puede contener letras y espacios.")]
        public string Nombre { get; set; } = string.Empty;

        [MaxLength(50)]
        [RegularExpression(@"^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]*$", ErrorMessage = "La descripción solo puede contener letras y espacios.")]
        public string? Descripcion { get; set; }

        [Range(10000, double.MaxValue, ErrorMessage = "El precio mínimo es $10.000.")]
        public decimal Precio { get; set; }

        [Range(1, 3650)]
        public int DuracionDias { get; set; }
    }
}
#endif