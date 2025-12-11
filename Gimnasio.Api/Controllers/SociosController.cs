using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Gimnasio.Api.Models;
using Gimnasio.Api.DTOs;
using Gimnasio.Api.Repositories;
using Microsoft.EntityFrameworkCore;
using Gimnasio.Api.Data;

namespace Gimnasio.Api.Controllers
{
    /// <summary>
    /// Controlador que gestiona las operaciones CRUD relacionadas con los socios del gimnasio.
    ///
    /// Este controlador:
    /// - Expone endpoints RESTful bien definidos.
    /// - Utiliza AutoMapper para convertir entidades ↔ DTOs.
    /// - Usa el repositorio genérico para operaciones CRUD básicas.
    /// - Usa AppDbContext cuando es necesario realizar consultas enriquecidas (AsNoTracking).
    ///
    /// Su responsabilidad es recibir solicitudes HTTP,
    /// validar datos básicos y delegar la lógica en las capas inferiores.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class SociosController : ControllerBase
    {
        private readonly IGenericRepository<Socio> _repository;
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;

        public SociosController(
            IGenericRepository<Socio> repository,
            IMapper mapper,
            AppDbContext context
        )
        {
            _repository = repository;
            _mapper = mapper;
            _context = context;
        }

        // GET: api/socios

        /// <summary>
        /// Devuelve todos los socios registrados.
        /// 
        /// Se utiliza AsNoTracking para optimizar la lectura,
        /// ya que no se requiere hacer seguimiento del estado de las entidades.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SocioDto>>> GetSocios()
        {
            var socios = await _context.Socios
                .AsNoTracking()
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<SocioDto>>(socios));
        }

        // GET: api/socios/{id}

        /// <summary>
        /// Obtiene un socio por su Id.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<SocioDto>> GetSocio(int id)
        {
            var socio = await _context.Socios
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == id);

            if (socio == null)
                return NotFound();

            return Ok(_mapper.Map<SocioDto>(socio));
        }

        // POST: api/socios

        /// <summary>
        /// Crea un nuevo socio en el sistema.
        /// Aplica validaciones adicionales además de DataAnnotations.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<SocioDto>> PostSocio([FromBody] SocioCreateDto socioDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Validación personalizada

            // Edad mínima: 8 años
            if (socioDto.FechaNacimiento > DateTime.Today.AddYears(-8))
                return BadRequest("La fecha de nacimiento indica que el socio debe tener al menos 8 años.");

            // Estructura mínima del correo (3 caracteres antes del @)
            if (!string.IsNullOrEmpty(socioDto.Email))
            {
                var partes = socioDto.Email.Split('@');
                if (partes.Length < 2 || partes[0].Length < 3)
                    return BadRequest("El correo electrónico debe tener al menos 3 caracteres antes del @.");
            }

            // Validación manual de rango del teléfono
            if (!string.IsNullOrEmpty(socioDto.Telefono))
            {
                if (socioDto.Telefono.Length < 10 || socioDto.Telefono.Length > 13)
                    return BadRequest("El teléfono debe contener entre 10 y 13 dígitos.");
            }

            // Creación de entidad

            var socio = _mapper.Map<Socio>(socioDto);
            await _repository.AddAsync(socio);

            var resultDto = _mapper.Map<SocioDto>(socio);

            return CreatedAtAction(nameof(GetSocio), new { id = socio.Id }, resultDto);
        }

        // PUT: api/socios/{id}

        /// <summary>
        /// Actualiza los datos de un socio existente.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSocio(int id, [FromBody] SocioCreateDto socioDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // VALIDACIONES PERSONALIZADAS (mismas reglas que POST)
            if (socioDto.FechaNacimiento > DateTime.Today.AddYears(-8))
                return BadRequest("El socio debe tener al menos 8 años.");

            if (!string.IsNullOrEmpty(socioDto.Email))
            {
                var partes = socioDto.Email.Split('@');
                if (partes.Length < 2 || partes[0].Length < 3)
                    return BadRequest("El correo electrónico debe tener al menos 3 caracteres antes del @.");
            }

            if (!string.IsNullOrEmpty(socioDto.Telefono))
            {
                if (socioDto.Telefono.Length < 10 || socioDto.Telefono.Length > 13)
                    return BadRequest("El teléfono debe contener entre 10 y 13 dígitos.");
            }

            var existing = await _repository.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            // Mapea las propiedades del DTO sobre la entidad existente
            _mapper.Map(socioDto, existing);
            await _repository.UpdateAsync(existing);

            return NoContent();
        }

        // DELETE: api/socios/{id}

        /// <summary>
        /// Elimina un socio del sistema.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSocio(int id)
        {
            var exists = await _repository.ExistsAsync(id);
            if (!exists)
                return NotFound();

            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}
