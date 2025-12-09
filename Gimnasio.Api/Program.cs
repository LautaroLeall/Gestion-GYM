using Microsoft.EntityFrameworkCore;
using Gimnasio.Api.Data;
using Gimnasio.Api.Repositories;
using Gimnasio.Api.Models;
using AutoMapper;
using Gimnasio.Api.Profiles;
using Gimnasio.Api.Converters;

var builder = WebApplication.CreateBuilder(args);

// Configurar conexión a la base de datos SQLite. 
// En un entorno real este valor podría provenir de un archivo de configuración (appsettings.json).
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Data Source=gimnasio.db";
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString));

// Registrar AutoMapper y nuestro perfil de mapeo.
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Registrar repositorios genéricos para cada entidad.
builder.Services.AddScoped<IGenericRepository<Socio>, GenericRepository<Socio>>();

builder.Services.AddScoped<IGenericRepository<Clase>, GenericRepository<Clase>>();

builder.Services.AddScoped<IGenericRepository<Inscripcion>, GenericRepository<Inscripcion>>();

// Añadir controladores con soporte de JSON.
builder.Services.AddControllers()
.AddJsonOptions(options =>
{
    // SOLO este, para formatear DateTime como "yyyy-MM-dd"
    options.JsonSerializerOptions.Converters.Add(new JsonStringDateConverter());
});

// Habilitar Swagger para documentar las API.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar CORS para permitir peticiones del front-end en desarrollo.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Asegurarse de que la base de datos y sus tablas existan al iniciar.
// En lugar de requerir migraciones generadas manualmente, se invoca EnsureCreated(), 
// que crea la base de datos y todas las tablas necesarias según el modelo definido. 
// Si ya existe, este método simplemente no realiza cambios. 
// Para entornos de producción con control de versiones de base de datos, 
// se recomienda usar migraciones explícitas en su lugar.
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// Configurar el pipeline HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// En desarrollo no forzamos HTTPS para evitar problemas de certificados.
// Si se despliega a producción con HTTPS configurado, descomentar el siguiente middleware.
// app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseRouting();
app.UseCors();
app.UseAuthorization();
app.MapControllers();

app.Run();