namespace Gimnasio.Api.DTOs
{
    /// <summary>
    /// DTO de lectura para los planes de membresía. Expone los campos
    /// básicos al cliente.
    /// </summary>
    public class MembresiaDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public decimal Precio { get; set; }
        public int DuracionDias { get; set; }
    }
}