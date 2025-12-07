// Este archivo mantiene el controlador original de reservas para
// referencia histórica.  Está completamente deshabilitado mediante
// directivas de preprocesador para evitar que el runtime intente
// resolver sus dependencias.  Utilice InscripcionesController en su lugar.
#if false
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Gimnasio.Api.DTOs;
using Gimnasio.Api.Models;
using Gimnasio.Api.Data;
using System.Linq;

namespace Gimnasio.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservasController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ReservasController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/reservas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReservaDto>>> Get()
        {
            var reservas = await _context.Reservas
                .Include(r => r.Socio)
                .Include(r => r.Clase)
                .ToListAsync();
            return Ok(_mapper.Map<IEnumerable<ReservaDto>>(reservas));
        }

        // GET: api/reservas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReservaDto>> GetById(int id)
        {
            var reserva = await _context.Reservas
                .Include(r => r.Socio)
                .Include(r => r.Clase)
                .FirstOrDefaultAsync(r => r.Id == id);
            if (reserva == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<ReservaDto>(reserva));
        }

        // POST: api/reservas
        [HttpPost]
        public async Task<ActionResult<ReservaDto>> Create([FromBody] ReservaCreateDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var fechaClaseLocal = dto.FechaClase.Kind == DateTimeKind.Utc
                ? dto.FechaClase.ToLocalTime()
                : dto.FechaClase;
            var socio = await _context.Socios.FindAsync(dto.SocioId);
            var clase = await _context.Clases
                .Include(c => c.Reservas)
                .FirstOrDefaultAsync(c => c.Id == dto.ClaseId);
            if (socio == null || clase == null)
            {
                return BadRequest("Socio o clase no encontrados");
            }
            var dias = (clase.DiasSemana ?? string.Empty)
                .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                .Select(int.Parse)
                .ToList();
            int diaSeleccionado = fechaClaseLocal.DayOfWeek == DayOfWeek.Sunday ? 7 : (int)fechaClaseLocal.DayOfWeek;
            if (!dias.Contains(diaSeleccionado))
            {
                return BadRequest("La fecha seleccionada no corresponde a los días de la clase");
            }
            if (fechaClaseLocal.TimeOfDay != clase.Hora)
            {
                return BadRequest("La hora seleccionada no corresponde a la hora de la clase");
            }
            var existe = await _context.Reservas.AnyAsync(r =>
                r.SocioId == dto.SocioId &&
                r.ClaseId == dto.ClaseId &&
                r.FechaClase == fechaClaseLocal);
            if (existe)
            {
                return Conflict("El socio ya tiene una reserva para esta clase en la fecha seleccionada");
            }
            var hoy = DateTime.Today;
            int diasHastaDomingo = ((int)DayOfWeek.Sunday - (int)hoy.DayOfWeek + 7) % 7;
            var finSemana = hoy.AddDays(diasHastaDomingo);
            if (fechaClaseLocal.Date < hoy || fechaClaseLocal.Date > finSemana)
            {
                return BadRequest("La fecha seleccionada debe estar dentro de la semana en curso.");
            }
            int reservados = await _context.Reservas.CountAsync(r =>
                r.ClaseId == dto.ClaseId &&
                r.FechaClase == fechaClaseLocal);
            if (reservados >= clase.CupoMaximo)
            {
                return Conflict("No quedan cupos disponibles para esta clase en la fecha seleccionada");
            }
            var reserva = _mapper.Map<Reserva>(dto);
            reserva.FechaClase = fechaClaseLocal;
            _context.Reservas.Add(reserva);
            await _context.SaveChangesAsync();
            await _context.Entry(reserva).Reference(r => r.Socio).LoadAsync();
            await _context.Entry(reserva).Reference(r => r.Clase).LoadAsync();
            var result = _mapper.Map<ReservaDto>(reserva);
            return CreatedAtAction(nameof(GetById), new { id = reserva.Id }, result);
        }

        // DELETE: api/reservas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var reserva = await _context.Reservas.FindAsync(id);
            if (reserva == null)
            {
                return NotFound();
            }
            _context.Reservas.Remove(reserva);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
#endif