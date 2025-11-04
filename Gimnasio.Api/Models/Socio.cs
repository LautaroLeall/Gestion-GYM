using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gimnasio.Api.Models
{
    /// <summary>
    /// Representa a un socio del gimnasio. Contiene sus datos básicos y una
    /// referencia opcional a un plan de membresía. La relación con
    /// Membresia es uno a muchos: un socio puede tener a lo sumo una
    /// membresía activa, pero una membresía puede estar asociada a varios
    /// socios.
    /// </summary>
    public class Socio
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Apellido { get; set; } = string.Empty;

        [DataType(DataType.Date)]
        public DateTime FechaNacimiento { get; set; }
        
        [EmailAddress]
        public string? Email { get; set; }

        [Phone]
        public string? Telefono { get; set; }

        // Clave foránea opcional hacia Membresia.
        public int? MembresiaId { get; set; }
        public Membresia? Membresia { get; set; }

        // Navegación a las reservas realizadas por el socio.
        public ICollection<Reserva> Reservas { get; set; } = new List<Reserva>();
    }
}