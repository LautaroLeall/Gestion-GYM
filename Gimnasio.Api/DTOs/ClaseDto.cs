using System;

namespace Gimnasio.Api.DTOs
{
    /// <summary>
    /// DTO de lectura para clases. 
    /// Incluye la información necesaria para mostrar una clase en el cliente.
    /// </summary>
    public class ClaseDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public int CupoMaximo { get; set; }

        /// <summary>
        /// Días de la semana en los que se dicta la clase.
        /// Se almacenan como números separados por comas (1=Lunes, …, 7=Domingo).
        /// </summary>
        public string DiasSemana { get; set; } = string.Empty;

        /// <summary>
        /// Hora de inicio de la clase.
        /// </summary>
        public TimeSpan Hora { get; set; }
    }
}