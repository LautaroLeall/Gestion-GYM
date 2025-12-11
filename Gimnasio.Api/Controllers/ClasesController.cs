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
    /// Controlador encargado de gestionar las clases ofrecidas por el gimnasio.
    /// 
    /// Expone endpoints CRUD (Create, Read, Update, Delete) y utiliza:
    /// - AutoMapper para mapear entidades ↔ DTOs
    /// - AppDbContext cuando se requieren operaciones con Include (consultas enriquecidas)
    /// - IGenericRepository para operaciones CRUD base
    ///
    /// Esta separación permite:
    /// - Reducir duplicación de código
    /// - Mantener controladores livianos
    /// - Cumplir con buenas prácticas de arquitectura (Single Responsibility)
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ClasesController : ControllerBase
    {
        private readonly IGenericRepository<Clase> _repository;
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;

        /// <summary>
        /// Constructor que recibe dependencias mediante inyección.
        /// _repository para operaciones CRUD básicas.
        /// _mapper para conversión entre entidades y DTOs.
        /// _context se utiliza para consultas complejas (Include).
        /// </summary>
        public ClasesController(
            IGenericRepository<Clase> repository,
            IMapper mapper,
            AppDbContext context)
        {
            _repository = repository;
            _mapper = mapper;
            _context = context;
        }

        // GET: api/clases
        
        /// <summary>
        /// Devuelve todas las clases disponibles.
        /// Incluye sus inscripciones para permitir cálculos como cantidad de anotados.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClaseDto>>> Get()
        {
            // Se usa DbContext para consulta enriquecida con Include
            var clases = await _context.Clases
                .Include(c => c.Inscripciones)
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<ClaseDto>>(clases));
        }

        // GET: api/clases/{id}
        
        /// <summary>
        /// Devuelve una clase por Id, incluyendo sus inscripciones.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<ClaseDto>> GetById(int id)
        {
            var clase = await _context.Clases
                .Include(c => c.Inscripciones)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (clase == null)
                return NotFound();

            return Ok(_mapper.Map<ClaseDto>(clase));
        }

        // POST: api/clases
        
        /// <summary>
        /// Crea una nueva clase.
        /// Realiza validaciones adicionales antes de guardar.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<ClaseDto>> Create([FromBody] ClaseCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // ----- VALIDACIONES DE DÍAS -----
            if (dto.DiasSemana == null || !dto.DiasSemana.Any())
                return BadRequest("Debe seleccionar al menos un día de la semana para la clase.");

            foreach (var dia in dto.DiasSemana)
            {
                if (dia < 1 || dia > 7)
                    return BadRequest($"El día '{dia}' no es válido. Debe estar entre 1 y 7.");
            }

            // Validación de hora
            // Solo :00 o :30
            if (dto.Hora.Minutes != 0 && dto.Hora.Minutes != 30)
                return BadRequest("La hora de la clase debe ser en punto o y media.");

            if (dto.Hora.Seconds != 0)
                return BadRequest("La hora de la clase no puede tener segundos.");

            // Rango válido: 10:00 a 21:30
            var horaMin = new TimeSpan(10, 0, 0);
            var horaMax = new TimeSpan(21, 30, 0);
            if (dto.Hora < horaMin || dto.Hora > horaMax)
                return BadRequest("La hora de la clase debe estar entre las 10:00 y las 21:30.");

            // Crear entidad
            var entity = _mapper.Map<Clase>(dto);
            await _repository.AddAsync(entity);

            var result = _mapper.Map<ClaseDto>(entity);

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, result);
        }

        // PUT: api/clases/{id}

        /// <summary>
        /// Actualiza una clase existente.
        /// Se revalida toda la información recibida.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ClaseCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // VALIDACIONES → mismas que el POST
            if (dto.DiasSemana == null || !dto.DiasSemana.Any())
                return BadRequest("Debe seleccionar al menos un día de la semana para la clase.");

            foreach (var dia in dto.DiasSemana)
            {
                if (dia < 1 || dia > 7)
                    return BadRequest($"El día '{dia}' no es válido. Debe estar entre 1 y 7.");
            }

            if (dto.Hora.Minutes != 0 && dto.Hora.Minutes != 30)
                return BadRequest("La hora debe ser en punto o y media.");

            if (dto.Hora.Seconds != 0)
                return BadRequest("La hora no puede tener segundos.");

            var minHora = new TimeSpan(10, 0, 0);
            var maxHora = new TimeSpan(21, 30, 0);
            if (dto.Hora < minHora || dto.Hora > maxHora)
                return BadRequest("La hora debe estar entre 10:00 y 21:30.");

            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
                return NotFound();

            _mapper.Map(dto, entity);
            await _repository.UpdateAsync(entity);

            return NoContent();
        }

        // DELETE: api/clases/{id}

        /// <summary>
        /// Elimina una clase por su Id.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var exists = await _repository.ExistsAsync(id);
            if (!exists)
                return NotFound();

            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}
