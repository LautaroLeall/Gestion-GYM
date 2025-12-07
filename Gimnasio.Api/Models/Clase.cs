using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gimnasio.Api.Models
{
    /// <summary>
    /// Representa una clase o actividad ofrecida por el gimnasio. Las
    /// clases se planifican para ciertos días de la semana con una
    /// hora de inicio y un cupo máximo de asistentes. Los socios pueden
    /// inscribirse a una clase mediante la entidad <see
    /// cref="Inscripcion"/>, que reemplaza a la antigua entidad
    /// <c>Reserva</c>.
    /// </summary>
    public class Clase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nombre { get; set; } = string.Empty;

        // Descripción opcional con un máximo de 50 caracteres. Permite dar un detalle breve de la clase.
        [MaxLength(50)]
        public string? Descripcion { get; set; }

        /// <summary>
        /// Capacidad máxima de la clase. Debe estar entre 5 y 50 personas.
        /// </summary>
        [Range(5, 50)]
        public int CupoMaximo { get; set; }

        /// <summary>
        /// Días de la semana en los que se dicta la clase, codificados como números separados por comas (1=Lunes, 2=Martes, ... ,7=Domingo).
        /// Por ejemplo "1,3,5" indica lunes, miércoles y viernes. Se utiliza para validar las reservas.
        /// </summary>
        [MaxLength(50)]
        public string DiasSemana { get; set; } = string.Empty;

        /// <summary>
        /// Hora de inicio de la clase. Debe estar en intervalos de media hora (:00 o :30) y entre las 10:00 y las 22:00 (no incluido).
        /// </summary>
        public TimeSpan Hora { get; set; }

        /// <summary>
        /// Inscripciones realizadas a esta clase.  Cada inscripción
        /// representa la reserva/inscripción de un socio para una
        /// fecha y hora determinada de la clase.  La colección se
        /// denomina <c>Inscripciones</c> para reflejar con claridad
        /// su función.
        /// </summary>
        public ICollection<Inscripcion> Inscripciones { get; set; } = new List<Inscripcion>();
    }
}