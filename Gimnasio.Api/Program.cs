using Microsoft.EntityFrameworkCore;
using Gimnasio.Api.Data;
using Gimnasio.Api.Repositories;
using Gimnasio.Api.Models;
using AutoMapper;
using Gimnasio.Api.Profiles;
using Gimnasio.Api.Converters;

var builder = WebApplication.CreateBuilder(args);

// 1) CONFIGURACIÓN DE BASE DE DATOS
// Usa una cadena de conexión tomada desde appsettings.json.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Data Source=gimnasio.db";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString));
// EF Core inyecta AppDbContext por request (scoped).

// 2) AUTOMAPPER
// Registra AutoMapper y carga automáticamente todas las configuraciones definidas en MappingProfile.
builder.Services.AddAutoMapper(typeof(MappingProfile));

// 3) REPOSITORIOS
// Repositorios genéricos para cada entidad del dominio.
// Esto permite reutilizar la lógica CRUD y evitar duplicación de código.
builder.Services.AddScoped<IGenericRepository<Socio>, GenericRepository<Socio>>();
builder.Services.AddScoped<IGenericRepository<Clase>, GenericRepository<Clase>>();
builder.Services.AddScoped<IGenericRepository<Inscripcion>, GenericRepository<Inscripcion>>();

// 4) CONFIGURACIÓN DE JSON (SERIALIZACIÓN GLOBAL)
// Se agrega el conversor personalizado para manejar fechas correctamente, garantizando un formato estable y evitando problemas entre frontend y backend.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringDateConverter());
    });

// 5) SWAGGER (DOCUMENTACIÓN DE API)
// Se habilita Swagger en desarrollo para facilitar pruebas y debugging.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 6) CORS (Cross-Origin Resource Sharing)
// Permite que el frontend local (Vite - React) interactúe con la API.
// Importante para evitar errores CORS en el navegador.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// 7) CREACIÓN AUTOMÁTICA DE BASE DE DATOS
// EnsureCreated() crea la BD y las tablas según el modelo EF Core.
// En producción se recomienda usar migraciones (Update-Database).
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// 8) PIPELINE HTTP (MIDDLEWARES)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection(); 
// Se deja deshabilitado en desarrollo para evitar problemas de certificados.

app.UseStaticFiles();    // Permite servir archivos estáticos si existieran.
app.UseRouting();        // Habilita enrutamiento de controladores.
app.UseCors();           // Aplica la política de CORS configurada arriba.
app.UseAuthorization();  // Middleware de autorización (actualmente no usado).
app.MapControllers();    // Registra los controladores en el pipeline.

app.Run();
