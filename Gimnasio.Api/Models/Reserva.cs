// Este archivo contiene la definición original de la entidad Reserva.
// Se mantiene aquí para referencia histórica, pero está deshabilitado
// mediante directivas de preprocesador.  Utilice la entidad
// Inscripcion en su lugar.
#if false
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gimnasio.Api.Models
{
    /// <summary>
    /// Registro de la reserva de un socio para una clase específica. Esta
    /// entidad constituía la relación de muchos a muchos entre socios y
    /// clases.  Ha sido reemplazada por <see cref="Inscripcion"/>.
    /// </summary>
    public class Reserva
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int SocioId { get; set; }

        public Socio? Socio { get; set; }

        [Required]
        public int ClaseId { get; set; }

        public Clase? Clase { get; set; }

        public DateTime FechaReserva { get; set; } = DateTime.UtcNow;

        public DateTime FechaClase { get; set; }
    }
}
#endif