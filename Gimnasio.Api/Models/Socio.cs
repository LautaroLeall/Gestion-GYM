using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gimnasio.Api.Models
{
    /// <summary>
    /// Representa a un socio del gimnasio.
    /// 
    /// Contiene los datos personales básicos del usuario del sistema
    ///
    /// Esta entidad es central dentro del dominio un socio puede inscribirse a múltiples clases a través de la relación uno-a-muchos con <see cref="Inscripcion"/>.
    ///
    /// La tabla generada por EF Core incluirá:
    /// - Id (PK)
    /// - Nombre, Apellido
    /// - FechaNacimiento
    /// - Email, Telefono
    /// </summary>
    public class Socio
    {
        /// <summary>
        /// Identificador único del socio.
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        /// <summary>
        /// Nombre del socio (obligatorio)
        ///
        /// La validación mediante DataAnnotations se utilizará tanto en API como en MVC.
        /// </summary>
        [Required]
        [MaxLength(50)]
        public string Nombre { get; set; } = string.Empty;

        /// <summary>
        /// Apellido del socio
        /// </summary>
        [Required]
        [MaxLength(50)]
        public string Apellido { get; set; } = string.Empty;

        /// <summary>
        /// Fecha de nacimiento del socio.
        /// El atributo <see cref="DataType.Date"/> indica al framework de MVC que renderice un selector de fecha apropiado.
        ///
        /// EF Core lo almacenará como tipo 'date' en la base de datos.
        /// </summary>
        [DataType(DataType.Date)]
        public DateTime FechaNacimiento { get; set; }

        /// <summary>
        /// Dirección de correo electrónico del socio (opcional).
        /// Validada con el atributo <see cref="EmailAddressAttribute"/>, el cual exige un formato válido.
        /// </summary>
        [EmailAddress]
        public string? Email { get; set; }

        /// <summary>
        /// Número de teléfono del socio (opcional).
        /// Valida que el formato sea reconocible como teléfono mediante <see cref="PhoneAttribute"/>.
        /// </summary>
        [Phone]
        public string? Telefono { get; set; }

        /// <summary>
        /// Colección de inscripciones realizadas por el socio.
        ///
        /// EF Core detecta automáticamente la relación uno-a-muchos:
        /// Socio (1) → Inscripciones (N).
        /// 
        /// Se inicializa para evitar referencias nulas y facilitar las operaciones sobre la colección.
        /// </summary>
        public ICollection<Inscripcion> Inscripciones { get; set; } = new List<Inscripcion>();
    }
}
