using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gimnasio.Api.Models
{
    /// <summary>
    /// Registro de la reserva de un socio para una clase específica. Esta
    /// entidad constituye la relación de muchos a muchos entre socios y
    /// clases, además de permitir almacenar la fecha en que se realiza la
    /// reserva.
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

        /// <summary>
        /// Fecha y hora en que se realizó la reserva. No necesariamente
        /// coincide con la fecha de la clase.
        /// </summary>
        public DateTime FechaReserva { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Fecha y hora específica de la clase que el socio reservó. Se calcula a partir de los días de la semana y la hora definidos en la clase.
        /// </summary>
        public DateTime FechaClase { get; set; }
    }
}