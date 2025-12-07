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
    /// Controlador que gestiona las operaciones CRUD para los socios. Se
    /// comunica con el repositorio genérico y utiliza AutoMapper para
    /// convertir entre entidades y DTOs.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class SociosController : ControllerBase
    {
        private readonly IGenericRepository<Socio> _repository;
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;

        public SociosController(IGenericRepository<Socio> repository, IMapper mapper, AppDbContext context)
        {
            _repository = repository;
            _mapper = mapper;
            _context = context;
        }

        // GET: api/socios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SocioDto>>> GetSocios()
        {
            // No se incluye Membresia ya que el sistema actual no
            // gestiona planes de membresía.  Simplemente se obtiene la
            // lista de socios y se mapea al DTO.
            var socios = await _context.Socios
                .AsNoTracking()
                .ToListAsync();
            return Ok(_mapper.Map<IEnumerable<SocioDto>>(socios));
        }

        // GET: api/socios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SocioDto>> GetSocio(int id)
        {
            var socio = await _context.Socios
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == id);
            if (socio == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<SocioDto>(socio));
        }

        // POST: api/socios
        [HttpPost]
        public async Task<ActionResult<SocioDto>> PostSocio([FromBody] SocioCreateDto socioDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Validación adicional: el socio debe tener al menos 8 años
            if (socioDto.FechaNacimiento > DateTime.Today.AddYears(-8))
            {
                return BadRequest("La fecha de nacimiento indica que el socio debe tener al menos 8 años.");
            }
            // Validación adicional: el correo debe tener al menos 3 caracteres antes del '@'
            if (!string.IsNullOrEmpty(socioDto.Email))
            {
                var partes = socioDto.Email.Split('@');
                if (partes.Length < 2 || partes[0].Length < 3)
                {
                    return BadRequest("El correo electrónico debe tener al menos 3 caracteres antes del @.");
                }
            }
            var socio = _mapper.Map<Socio>(socioDto);
            await _repository.AddAsync(socio);
            var resultDto = _mapper.Map<SocioDto>(socio);
            return CreatedAtAction(nameof(GetSocio), new { id = socio.Id }, resultDto);
        }

        // PUT: api/socios/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSocio(int id, [FromBody] SocioCreateDto socioDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Validaciones adicionales para actualizar
            if (socioDto.FechaNacimiento > DateTime.Today.AddYears(-8))
            {
                return BadRequest("La fecha de nacimiento indica que el socio debe tener al menos 8 años.");
            }
            if (!string.IsNullOrEmpty(socioDto.Email))
            {
                var partes = socioDto.Email.Split('@');
                if (partes.Length < 2 || partes[0].Length < 3)
                {
                    return BadRequest("El correo electrónico debe tener al menos 3 caracteres antes del @.");
                }
            }
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null)
            {
                return NotFound();
            }
            // Map DTO onto existing entity
            _mapper.Map(socioDto, existing);
            await _repository.UpdateAsync(existing);
            return NoContent();
        }

        // DELETE: api/socios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSocio(int id)
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