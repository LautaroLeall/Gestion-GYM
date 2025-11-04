using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Gimnasio.Api.DTOs;
using Gimnasio.Api.Models;
using Gimnasio.Api.Data;
using System.Linq;

namespace Gimnasio.Api.Controllers
{
    /// <summary>
    /// Controlador para gestionar las reservas de clases por parte de los
    /// socios. Incluye validaciones para evitar sobrepasar el cupo y
    /// duplicar reservas.
    /// </summary>
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
            // Verificar existencia de socio y clase
            var socio = await _context.Socios.FindAsync(dto.SocioId);
            var clase = await _context.Clases
                .Include(c => c.Reservas)
                .FirstOrDefaultAsync(c => c.Id == dto.ClaseId);
            if (socio == null || clase == null)
            {
                return BadRequest("Socio o clase no encontrados");
            }
            // Verificar si la fecha seleccionada coincide con los días de la semana de la clase
            var dias = (clase.DiasSemana ?? string.Empty).Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
            // Comparar DayOfWeek.ToString() en inglés, ya que DiasSemana se almacena en ese formato
            var diaSeleccionado = dto.FechaClase.DayOfWeek.ToString();
            if (!dias.Any(d => string.Equals(d, diaSeleccionado, StringComparison.InvariantCultureIgnoreCase)))
            {
                return BadRequest("La fecha seleccionada no corresponde a los días de la clase");
            }
            // Verificar hora
            if (dto.FechaClase.TimeOfDay != clase.Hora)
            {
                return BadRequest("La hora seleccionada no corresponde a la hora de la clase");
            }
            // Verificar si ya existe una reserva del socio para la misma clase en la misma fecha/hora
            var existe = await _context.Reservas.AnyAsync(r =>
                r.SocioId == dto.SocioId &&
                r.ClaseId == dto.ClaseId &&
                r.FechaClase == dto.FechaClase);
            if (existe)
            {
                return Conflict("El socio ya tiene una reserva para esta clase en la fecha seleccionada");
            }
            // Verificar capacidad para la fecha específica
            int reservados = await _context.Reservas.CountAsync(r => r.ClaseId == dto.ClaseId && r.FechaClase == dto.FechaClase);
            if (reservados >= clase.CupoMaximo)
            {
                return Conflict("No quedan cupos disponibles para esta clase en la fecha seleccionada");
            }
            var reserva = _mapper.Map<Reserva>(dto);
            _context.Reservas.Add(reserva);
            await _context.SaveChangesAsync();
            // Cargar socio y clase para la respuesta
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