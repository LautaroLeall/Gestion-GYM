using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gimnasio.Api.Models
{
    /// <summary>
    /// Registro de la inscripción de un socio para una clase específica.
    /// 
    /// Esta entidad representa la relación muchos-a-muchos entre <see cref="Socio"/> y <see cref="Clase"/>. 
    /// Cada inscripción almacena:
    /// - El socio que se inscribe.
    /// - La clase seleccionada.
    /// - La fecha/hora en que realizó la reserva.
    /// - La fecha/hora real de la clase que va a tomar.
    /// 
    /// EF Core mapeará esta entidad como una tabla independiente, 
    /// ya que ambas entidades principales requieren datos adicionales (fechas), 
    /// lo cual impide un many-to-many automático sin clase intermedia.
    /// </summary>
    public class Inscripcion
    {
        /// <summary>
        /// Identificador único de la inscripción.
        /// Generado automáticamente por la base de datos.
        /// Aunque en modelos many-to-many suele usarse clave compuesta,
        /// aquí se utiliza Id por simplicidad y claridad en el CRUD.
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        /// <summary>
        /// Clave foránea que referencia al socio.
        /// </summary>
        [Required]
        public int SocioId { get; set; }

        /// <summary>
        /// Navegación hacia el socio asociado.
        /// Marcado como nullable porque EF Core lo carga solo si se incluye explícitamente (Include).
        /// </summary>
        public Socio? Socio { get; set; }

        /// <summary>
        /// Clave foránea que referencia a la clase seleccionada.
        /// </summary>
        [Required]
        public int ClaseId { get; set; }

        /// <summary>
        /// Navegación hacia la clase asociada.
        /// También nullable por las mismas razones que el socio.
        /// </summary>
        public Clase? Clase { get; set; }

        /// <summary>
        /// Fecha y hora en que el socio realizó la inscripción.
        /// 
        /// Importante:
        /// - No coincide necesariamente con la fecha real de la clase.
        /// - Se inicializa con DateTime.UtcNow para consistencia en entornos distribuidos.
        /// </summary>
        public DateTime FechaReserva { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Fecha y hora específica de la clase a la cual el socio queda anotado.
        /// 
        /// Esta fecha se calcula a partir de:
        /// - Los días de la semana definidos en la clase.
        /// - La hora configurada en <see cref="Clase.Hora"/>.
        /// </summary>
        public DateTime FechaClase { get; set; }
    }
}
