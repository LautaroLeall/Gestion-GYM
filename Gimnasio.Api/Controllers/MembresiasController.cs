using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Gimnasio.Api.Models;
using Gimnasio.Api.DTOs;
using Gimnasio.Api.Repositories;

namespace Gimnasio.Api.Controllers
{
    /// <summary>
    /// Controlador para gestionar los planes de membresía. Implementa las
    /// operaciones CRUD básicas y utiliza AutoMapper para convertir
    /// entre entidades y DTOs.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class MembresiasController : ControllerBase
    {
        private readonly IGenericRepository<Membresia> _repository;
        private readonly IMapper _mapper;

        public MembresiasController(IGenericRepository<Membresia> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MembresiaDto>>> Get()
        {
            var list = await _repository.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<MembresiaDto>>(list));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MembresiaDto>> GetById(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<MembresiaDto>(entity));
        }

        [HttpPost]
        public async Task<ActionResult<MembresiaDto>> Create([FromBody] MembresiaCreateDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = _mapper.Map<Membresia>(dto);
            await _repository.AddAsync(entity);
            var result = _mapper.Map<MembresiaDto>(entity);
            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] MembresiaCreateDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
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