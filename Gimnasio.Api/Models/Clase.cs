using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gimnasio.Api.Models
{
    /// <summary>
    /// Representa una clase o actividad ofrecida por el gimnasio. Las
    /// clases se planifican para una fecha y hora específicas con un
    /// instructor y un cupo máximo de asistentes. Los socios pueden
    /// reservar su asistencia a una clase a través de la entidad Reserva.
    /// </summary>
    public class Clase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [MaxLength(255)]
        public string? Descripcion { get; set; }

        [Required]
        [MaxLength(100)]
        public string Instructor { get; set; } = string.Empty;

        /// <summary>
        /// Capacidad máxima de la clase. Indica cuántos socios pueden
        /// inscribirse.
        /// </summary>
        public int CupoMaximo { get; set; }

        /// <summary>
        /// Días de la semana en los que se dicta la clase, separados por comas (por ejemplo "Monday,Wednesday,Friday").
        /// Estos valores deben coincidir con los nombres de los días devueltos por DayOfWeek.ToString().
        /// </summary>
        [MaxLength(100)]
        public string DiasSemana { get; set; } = string.Empty;

        /// <summary>
        /// Hora de inicio de la clase. Se utiliza en conjunto con DiasSemana para calcular las fechas específicas.
        /// </summary>
        public TimeSpan Hora { get; set; }

        public ICollection<Reserva> Reservas { get; set; } = new List<Reserva>();
    }
}