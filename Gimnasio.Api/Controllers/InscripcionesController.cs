using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Gimnasio.Api.DTOs;
using Gimnasio.Api.Models;
using Gimnasio.Api.Data;

namespace Gimnasio.Api.Controllers
{
    /// <summary>
    /// Controlador encargado de gestionar las inscripciones de socios a clases.
    ///
    /// Este controlador implementa:
    /// - Validaciones de negocio: cupo, duplicación, días de clase, rango de fechas.
    /// - Conversión DTO ↔ entidad mediante AutoMapper.
    /// - Consultas enriquecidas usando EF Core (Include).
    ///
    /// Su responsabilidad es coordinación + validación, 
    /// dejando persistencia al DbContext y mapeo a AutoMapper.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class InscripcionesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public InscripcionesController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/inscripciones

        /// <summary>
        /// Devuelve todas las inscripciones del sistema,
        /// incluyendo información del socio y de la clase asociada.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InscripcionDto>>> Get()
        {
            var inscripciones = await _context.Inscripciones
                .Include(i => i.Socio)
                .Include(i => i.Clase)
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<InscripcionDto>>(inscripciones));
        }

        // GET: api/inscripciones/{id}

        /// <summary>
        /// Obtiene una inscripción por Id, incluyendo sus relaciones.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<InscripcionDto>> GetById(int id)
        {
            var inscripcion = await _context.Inscripciones
                .Include(i => i.Socio)
                .Include(i => i.Clase)
                .FirstOrDefaultAsync(i => i.Id == id);

            return inscripcion == null
                ? NotFound()
                : Ok(_mapper.Map<InscripcionDto>(inscripcion));
        }

        // POST: api/inscripciones

        /// <summary>
        /// Crea una inscripción validando:
        /// - Existencia de socio y clase
        /// - Día correcto según programación de la clase
        /// - Hora válida
        /// - Cupo disponible
        /// - No duplicación para misma fecha y clase
        /// - Fecha dentro de las próximas 3 semanas
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<InscripcionDto>> Create([FromBody] InscripcionCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Normalizar fecha a local si viene en UTC
            var fechaClaseLocal = dto.FechaClase.Kind == DateTimeKind.Utc
                ? dto.FechaClase.ToLocalTime()
                : dto.FechaClase;

            // VALIDACIÓN ENTIDADES
            var socio = await _context.Socios.FindAsync(dto.SocioId);
            var clase = await _context.Clases
                .Include(c => c.Inscripciones)
                .FirstOrDefaultAsync(c => c.Id == dto.ClaseId);

            if (socio == null || clase == null)
                return BadRequest("Socio o clase no encontrados.");

            // VALIDACIÓN DÍA
            var dias = (clase.DiasSemana ?? string.Empty)
                .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                .Select(int.Parse)
                .ToList();

            int diaSeleccionado =
                fechaClaseLocal.DayOfWeek == DayOfWeek.Sunday
                    ? 7
                    : (int)fechaClaseLocal.DayOfWeek;

            if (!dias.Contains(diaSeleccionado))
                return BadRequest("La fecha seleccionada no corresponde a los días de la clase.");

            // VALIDACIÓN HORA 
            if (fechaClaseLocal.TimeOfDay != clase.Hora)
                return BadRequest("La hora seleccionada no corresponde a la hora programada de la clase.");

            // VALIDACIÓN INSCRIPCIÓN DUPLICADA 
            bool existe = await _context.Inscripciones.AnyAsync(i =>
                i.SocioId == dto.SocioId &&
                i.ClaseId == dto.ClaseId &&
                i.FechaClase == fechaClaseLocal
            );

            if (existe)
                return Conflict("El socio ya tiene una inscripción para esta clase en esa fecha.");

            // VALIDACIÓN RANGO DE FECHAS 
            // Permitir inscribirse hasta 21 días desde hoy
            var hoy = DateTime.Today;
            var maxFecha = hoy.AddDays(21);

            if (fechaClaseLocal.Date < hoy || fechaClaseLocal.Date > maxFecha)
                return BadRequest("La fecha seleccionada debe estar dentro de las próximas 3 semanas.");

            //  VALIDACIÓN CUPO 
            int inscriptos = await _context.Inscripciones.CountAsync(i =>
                i.ClaseId == dto.ClaseId &&
                i.FechaClase == fechaClaseLocal
            );

            if (inscriptos >= clase.CupoMaximo)
                return Conflict("No quedan cupos disponibles para esta clase en esa fecha.");

            // CREAR INSCRIPCIÓN 
            var inscripcion = _mapper.Map<Inscripcion>(dto);

            // FechaReserva siempre la define el servidor
            inscripcion.FechaClase = fechaClaseLocal;
            inscripcion.FechaReserva = DateTime.Now;

            _context.Inscripciones.Add(inscripcion);
            await _context.SaveChangesAsync();

            // Cargar socio y clase para completar DTO de salida
            await _context.Entry(inscripcion).Reference(i => i.Socio).LoadAsync();
            await _context.Entry(inscripcion).Reference(i => i.Clase).LoadAsync();

            var result = _mapper.Map<InscripcionDto>(inscripcion);

            return CreatedAtAction(nameof(GetById), new { id = inscripcion.Id }, result);
        }

        // DELETE: api/inscripciones/{id}

        /// <summary>
        /// Elimina una inscripción.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var inscripcion = await _context.Inscripciones.FindAsync(id);
            if (inscripcion == null)
                return NotFound();

            _context.Inscripciones.Remove(inscripcion);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
