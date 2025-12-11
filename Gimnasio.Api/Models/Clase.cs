using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gimnasio.Api.Models
{
    /// <summary>
    /// Representa una clase ofrecida por el gimnasio.
    /// 
    /// Esta entidad forma parte del dominio principal y modela las actividades disponibles 
    /// Cada clase tiene un horario fijo, días de dictado y un cupo máximo permitido
    /// 
    /// Las clases pueden poseer múltiples inscripciones, representadas mediante la relación uno-a-muchos con <see cref="Inscripcion"/>
    /// 
    /// Mapeada por Entity Framework Core como una tabla de base de datos:
    /// - Id (PK, Identity)
    /// - Nombre, Descripcion, CupoMaximo, DiasSemana, Hora
    /// 
    /// Relación:
    /// - ICollection<Inscripcion>: una clase puede tener varias inscripciones.
    /// </summary>
    public class Clase
    {
        /// <summary>
        /// Identificador único de la clase
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        /// <summary>
        /// Nombre de la clase (obligatorio).
        /// </summary>
        [Required]
        [MaxLength(100)]
        public string Nombre { get; set; } = string.Empty;

        /// <summary>
        /// Descripción opcional de la clase
        /// </summary>
        [MaxLength(50)]
        public string? Descripcion { get; set; }

        /// <summary>
        /// Capacidad máxima permitida para asistir a esta clase
        /// </summary>
        [Range(5, 50)]
        public int CupoMaximo { get; set; }

        /// <summary>
        /// Lista de días de la semana en los que se dicta la clase
        /// Se codifica como números separados por coma:
        /// 1=Lunes, 2=Martes, ..., 7=Domingo
        /// </summary>
        [MaxLength(50)]
        public string DiasSemana { get; set; } = string.Empty;

        /// <summary>
        /// Hora de inicio de la clase. 
        /// - Debe estar entre las 10:00 y las 22:00 (22:00 no incluido).
        /// - Intervalos válidos: solo :00 o :30.
        ///
        /// EF Core mapeará este valor como un tipo compatible con Time en SQL.
        /// </summary>
        public TimeSpan Hora { get; set; }

        /// <summary>
        /// Colección de inscripciones asociadas a la clase.
        /// Cada <see cref="Inscripcion"/> representa un socio inscripto a esta actividad en una fecha determinada.
        /// 
        /// EF Core detecta automáticamente la relación uno-a-muchos:
        /// - Clase (1) → Inscripciones (N)
        /// 
        /// Se inicializa en el constructor para evitar referencias nulas.
        /// </summary>
        public ICollection<Inscripcion> Inscripciones { get; set; } = new List<Inscripcion>();
    }
}
