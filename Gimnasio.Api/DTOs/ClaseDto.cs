using System;

namespace Gimnasio.Api.DTOs
{
    /// <summary>
    /// DTO de lectura para clases.
    /// 
    /// Se utiliza para enviar información al cliente sin exponer la entidad de dominio completa.
    /// Ideal para listados, detalles de clase y respuestas de API.
    /// 
    /// Este DTO es inmutable desde la perspectiva del cliente: no contiene validaciones
    /// porque no se usa para recibir datos, solo para mostrarlos.
    /// </summary>
    public class ClaseDto
    {
        /// <summary>
        /// Identificador único de la clase.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nombre de la clase
        /// </summary>
        public string Nombre { get; set; } = string.Empty;

        /// <summary>
        /// Breve descripción de la clase. Es opcional.
        /// </summary>
        public string? Descripcion { get; set; }

        /// <summary>
        /// Cantidad máxima de participantes permitidos.
        /// </summary>
        public int CupoMaximo { get; set; }

        /// <summary>
        /// Días de la semana en los que se dicta la clase,
        /// almacenados como una cadena de números separados por coma.
        /// Representación idéntica a la almacenada en la entidad para evitar conversiones innecesarias.
        /// </summary>
        public string DiasSemana { get; set; } = string.Empty;

        /// <summary>
        /// Hora de inicio de la actividad.
        /// </summary>
        public TimeSpan Hora { get; set; }
    }
}
