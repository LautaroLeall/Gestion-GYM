using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gimnasio.Api.Models
{
    /// <summary>
    /// Representa a un socio del gimnasio.  Contiene sus datos básicos,
    /// como nombre, apellido, fecha de nacimiento, correo electrónico y
    /// teléfono.  A partir de esta versión se eliminó la referencia a
    /// un plan de membresía, ya que el sistema de ejemplo se simplificó
    /// para gestionar únicamente socios, clases e inscripciones.
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

        // Lista de inscripciones realizadas por el socio.  Cada inscripción
        // representa la participación del socio en una clase en una fecha
        // determinada.  Se renombra la colección "Reservas" a
        // "Inscripciones" para reflejar que se trata de inscripciones a
        // clases y se elimina la relación con membresías.
        public ICollection<Inscripcion> Inscripciones { get; set; } = new List<Inscripcion>();
    }
}