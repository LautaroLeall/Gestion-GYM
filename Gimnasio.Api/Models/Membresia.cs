using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gimnasio.Api.Models
{
    /// <summary>
    /// Define un plan de membresía del gimnasio. Incluye información
    /// descriptiva y económica que se asigna a los socios para determinar
    /// precio y duración de sus suscripciones.
    /// </summary>
    public class Membresia
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [MaxLength(255)]
        public string? Descripcion { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Precio { get; set; }

        /// <summary>
        /// Duración del plan en días. Se utiliza para calcular la fecha de
        /// expiración de la membresía de un socio.
        /// </summary>
        public int DuracionDias { get; set; }

        public ICollection<Socio> Socios { get; set; } = new List<Socio>();
    }
}