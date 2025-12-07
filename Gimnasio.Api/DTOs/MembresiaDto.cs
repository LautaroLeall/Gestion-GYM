// DTO de lectura original para planes de membresía.  El sistema
// actual no expone planes de membresía, por lo que esta clase está
// deshabilitada.  Se conserva únicamente por motivos de referencia.
#if false
namespace Gimnasio.Api.DTOs
{
    public class MembresiaDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public decimal Precio { get; set; }
        public int DuracionDias { get; set; }
    }
}
#endif