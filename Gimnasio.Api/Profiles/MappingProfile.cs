using AutoMapper;
using Gimnasio.Api.DTOs;
using Gimnasio.Api.Models;

namespace Gimnasio.Api.Profiles
{
    /// <summary>
    /// Define las configuraciones de AutoMapper para convertir entre las entidades de dominio y los distintos DTOs. 
    /// Centralizar estos mapeos evita repetir código en los controladores y servicios.
    /// </summary>
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Socio -> SocioDto
            CreateMap<Socio, SocioDto>();

            // SocioCreateDto -> Socio
            CreateMap<SocioCreateDto, Socio>();

            // Clase -> ClaseDto
            CreateMap<Clase, ClaseDto>();

            // ClaseCreateDto -> Clase
            CreateMap<ClaseCreateDto, Clase>()
                .ForMember(dest => dest.DiasSemana, opt => opt.MapFrom(src => string.Join(",", src.DiasSemana)));

            // Inscripcion -> InscripcionDto
            CreateMap<Inscripcion, InscripcionDto>()
                .ForMember(dest => dest.SocioNombreCompleto, opt => opt.MapFrom(src => src.Socio != null ? $"{src.Socio.Nombre} {src.Socio.Apellido}" : null))
                .ForMember(dest => dest.ClaseNombre, opt => opt.MapFrom(src => src.Clase != null ? src.Clase.Nombre : null));

            // InscripcionCreateDto -> Inscripcion
            CreateMap<InscripcionCreateDto, Inscripcion>();
        }
    }
}