# Gestión GYM 🏋️‍♂️

Aplicación web para la gestión de socios, clases e inscripciones de un gimnasio.  
Está construida con **ASP.NET Core MVC** en el back‑end y **React + Vite** en el front‑end.

## ✨ Características

- Gestión de socios con altas, bajas y modificaciones.
- Definición de clases con cupo y horarios semanales.
- Inscripción de socios a clases, con validaciones de cupo y fecha.
- Arquitectura en capas (Modelos, Repositorios, Servicios, Controladores).
- Uso de Entity Framework Core con SQLite (Base de datos generada automáticamente).

## 🚀 Tecnologías empleadas

- .NET 8 / ASP.NET Core MVC
- Entity Framework Core
- React 18 con Vite
- TailwindCSS para estilos
- AutoMapper para conversión de entidades a DTOs

## ⚙️ Cómo ejecutar el proyecto

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/LautaroLeall/Gestion-GYM.git
   cd Gestion-GYM
   ```

2. **Ejecutar la API**

   ```bash
   cd Gimnasio.Api
   dotnet restore     # solo la primera vez
   dotnet run         # levanta la API en http://localhost:5000
   ```

3. **Ejecutar el front-end**

   ```bash
   cd ClientApp
   npm install        # solo la primera vez
   npm run dev        # abre la app en http://localhost:5173
   ```

   _Al abrir el navegador en http://localhost:5173 podrás gestionar socios, clases e inscripciones._

## 📂 Estructura del proyecto

```bash
Gestion-GYM/
├── ClientApp/         # Front-end React/Vite
├── Gimnasio.Api/      # Back-end ASP.NET Core
├── README.md
└── .gitignore
```
