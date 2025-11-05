using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Gimnasio.Api.Models;
using Gimnasio.Api.DTOs;
using Gimnasio.Api.Repositories;
using Gimnasio.Api.Data;

namespace Gimnasio.Api.Controllers
{
    /// <summary>
    /// Controlador para las clases ofrecidas por el gimnasio. Gestiona
    /// operaciones CRUD y consulta la capacidad al listar.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ClasesController : ControllerBase
    {
        private readonly IGenericRepository<Clase> _repository;
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;

        public ClasesController(IGenericRepository<Clase> repository, IMapper mapper, AppDbContext context)
        {
            _repository = repository;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClaseDto>>> Get()
        {
            // Incluir el recuento de reservas para cada clase
            var clases = await _context.Clases
                .Include(c => c.Reservas)
                .ToListAsync();
            return Ok(_mapper.Map<IEnumerable<ClaseDto>>(clases));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ClaseDto>> GetById(int id)
        {
            var clase = await _context.Clases
                .Include(c => c.Reservas)
                .FirstOrDefaultAsync(c => c.Id == id);
            if (clase == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<ClaseDto>(clase));
        }

        [HttpPost]
        public async Task<ActionResult<ClaseDto>> Create([FromBody] ClaseCreateDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Validaciones adicionales para clases
            if (dto.DiasSemana == null || !dto.DiasSemana.Any())
            {
                return BadRequest("Debe seleccionar al menos un día de la semana para la clase.");
            }
            // Asegurarse de que todos los días sean válidos
            foreach (var dia in dto.DiasSemana)
            {
                if (!Enum.TryParse<DayOfWeek>(dia, true, out _))
                {
                    return BadRequest($"El día '{dia}' no es válido.");
                }
            }
            // Validar la hora: debe ser en punto o media y entre 10:00 y 22:00
            if (dto.Hora.Minutes != 0 && dto.Hora.Minutes != 30)
            {
                return BadRequest("La hora de la clase debe ser en punto o y media.");
            }
            if (dto.Hora.Seconds != 0)
            {
                return BadRequest("La hora de la clase no puede tener segundos.");
            }
            var horaMin = new TimeSpan(10, 0, 0);
            var horaMax = new TimeSpan(22, 0, 0);
            if (dto.Hora < horaMin || dto.Hora > horaMax)
            {
                return BadRequest("La hora de la clase debe estar entre las 10:00 y las 22:00.");
            }
            var entity = _mapper.Map<Clase>(dto);
            await _repository.AddAsync(entity);
            var result = _mapper.Map<ClaseDto>(entity);
            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ClaseCreateDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Validaciones adicionales para actualización
            if (dto.DiasSemana == null || !dto.DiasSemana.Any())
            {
                return BadRequest("Debe seleccionar al menos un día de la semana para la clase.");
            }
            foreach (var dia in dto.DiasSemana)
            {
                if (!Enum.TryParse<DayOfWeek>(dia, true, out _))
                {
                    return BadRequest($"El día '{dia}' no es válido.");
                }
            }
            if (dto.Hora.Minutes != 0 && dto.Hora.Minutes != 30)
            {
                return BadRequest("La hora de la clase debe ser en punto o y media.");
            }
            if (dto.Hora.Seconds != 0)
            {
                return BadRequest("La hora de la clase no puede tener segundos.");
            }
            var minHora = new TimeSpan(10, 0, 0);
            var maxHora = new TimeSpan(22, 0, 0);
            if (dto.Hora < minHora || dto.Hora > maxHora)
            {
                return BadRequest("La hora de la clase debe estar entre las 10:00 y las 22:00.");
            }
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
            {
                return NotFound();
            }
            _mapper.Map(dto, entity);
            await _repository.UpdateAsync(entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var exists = await _repository.ExistsAsync(id);
            if (!exists)
            {
                return NotFound();
            }
            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}