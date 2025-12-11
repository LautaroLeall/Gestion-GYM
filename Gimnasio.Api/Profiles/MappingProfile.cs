using AutoMapper;
using Gimnasio.Api.DTOs;
using Gimnasio.Api.Models;

namespace Gimnasio.Api.Profiles
{
    /// <summary>
    /// Perfil de AutoMapper que define todas las conversiones entre:
    /// - Entidades de dominio
    /// - DTOs de lectura
    /// - DTOs de creación/actualización
    ///
    /// Esta configuración centraliza los mapeos y evita repetición de código en controladores y servicios. 
    /// Además garantiza consistencia en la transformación de datos a lo largo de toda la aplicación.
    /// 
    /// AutoMapper aplicará estas reglas automáticamente en tiempo de ejecución
    /// cuando se invoquen métodos como:
    ///   _mapper.Map<Destino>(origen)
    /// </summary>
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // SOCIO

            /// <summary>
            /// Mapeo entidad -> DTO de lectura.
            /// Convierte automáticamente todas las propiedades con nombres coincidientes.
            /// </summary>
            CreateMap<Socio, SocioDto>();

            /// <summary>
            /// Mapeo DTO de creación -> entidad.
            /// No se asigna Id ni propiedades calculadas (EF Core las genera).
            /// </summary>
            CreateMap<SocioCreateDto, Socio>();


            // CLASE

            /// <summary>
            /// Entidad Clase -> DTO de lectura.
            /// Las propiedades se mapean directamente.
            /// </summary>
            CreateMap<Clase, ClaseDto>();

            /// <summary>
            /// DTO de creación -> entidad Clase.
            /// Conversión especial:
            /// DiasSemana se recibe como List<int> y se guarda como string "1,3,5".
            /// </summary>
            CreateMap<ClaseCreateDto, Clase>()
                .ForMember(dest => dest.DiasSemana,
                    opt => opt.MapFrom(src =>
                        string.Join(",", src.DiasSemana)
                    )
                );


            // INSCRIPCIÓN

            /// <summary>
            /// Entidad Inscripcion -> DTO de lectura.
            /// Incluye datos derivados como:
            /// - Nombre completo del socio
            /// - Nombre de la clase
            /// Esto evita consultas adicionales desde el cliente.
            /// </summary>
            CreateMap<Inscripcion, InscripcionDto>()
                .ForMember(dest => dest.SocioNombreCompleto,
                    opt => opt.MapFrom(src =>
                        src.Socio != null
                        ? $"{src.Socio.Nombre} {src.Socio.Apellido}"
                        : null
                    )
                )
                .ForMember(dest => dest.ClaseNombre,
                    opt => opt.MapFrom(src =>
                        src.Clase != null
                            ? src.Clase.Nombre
                            : null
                    )
                );

            /// <summary>
            /// DTO de creación -> entidad Inscripcion.
            /// No se asigna FechaReserva porque se calcula en el modelo o en el servicio.
            /// Tampoco se asignan propiedades de navegación.
            /// </summary>
            CreateMap<InscripcionCreateDto, Inscripcion>();
        }
    }
}
