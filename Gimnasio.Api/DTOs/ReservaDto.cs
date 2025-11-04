using System;

namespace Gimnasio.Api.DTOs
{
    /// <summary>
    /// DTO de lectura para reservas. Muestra la relación entre socio y clase
    /// junto con las fechas relevantes.
    /// </summary>
    public class ReservaDto
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