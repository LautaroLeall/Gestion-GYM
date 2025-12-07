// Esta clase de entidad original de Membresia se conserva para
// referencia histórica.  El sistema actual ya no gestiona planes de
// membresía, por lo que la clase está totalmente deshabilitada mediante
// directivas de preprocesador.  Si en el futuro se reintroduce la
// funcionalidad de membresías, esta clase se puede habilitar
// eliminando la directiva #if.
#if false
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gimnasio.Api.Models
{
    public class Membresia
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [MaxLength(50)]
        public string? Descripcion { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Precio { get; set; }

        public int DuracionDias { get; set; }

        public ICollection<Socio> Socios { get; set; } = new List<Socio>();
    }
}
#endif