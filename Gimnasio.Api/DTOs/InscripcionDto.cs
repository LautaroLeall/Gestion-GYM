using System;

namespace Gimnasio.Api.DTOs
{
    /// <summary>
    /// DTO de lectura para las inscripciones.  
    /// Expone los datos esenciales de una inscripción e 
    /// incluye información derivada como el nombre completo del socio y el nombre de la clase.
    /// </summary>
    public class InscripcionDto
    {
        public int Id { get; set; }
        public int SocioId { get; set; }
        public int ClaseId { get; set; }
        public DateTime FechaReserva { get; set; }
        public DateTime FechaClase { get; set; }
        public string? SocioNombreCompleto { get; set; }
        public string? ClaseNombre { get; set; }
    }
}