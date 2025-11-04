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
        public string Nombre { get; set; } = string.Empty;

        [MaxLength(255)]
        public string? Descripcion { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Precio { get; set; }

        [Range(1, 3650)]
        public int DuracionDias { get; set; }
    }
}