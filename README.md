# 🏋️‍♂️ Trabajo Práctico Final - Desarrollo de Front End

**Materia:** Desarrollo de Front End  
**Profesor:** Ing. Marcos Rivero  
**Tecnologías:** HTML - CSS - JavaScript - ReactJS - Bootstrap

---

## 📌 Proyecto: Reservas de Clases de Gimnasio

Esta aplicación permite gestionar la reserva de turnos para distintas clases de un gimnasio. Fue desarrollada utilizando ReactJS con componentes funcionales, uso de Hooks y comunicación entre componentes. Los estilos están aplicados con Bootstrap.

---

## 🎯 Funcionalidades

✔️ Formulario para ingresar los datos de un socio:  
- Nombre y Apellido  
- Teléfono  
- Email  
- Clase (Funcional, Zumba, Crossfit, Musculación)  
- Horario (dependiente de la clase elegida)

✔️ Tabla que muestra los turnos cargados.  
✔️ Botón para **Agregar** un nuevo socio.  
✔️ Botones de **Editar** y **Eliminar** para cada socio.  
✔️ Al editar, el formulario se carga con los datos seleccionados y el botón cambia de “Registrar Turno” a “Aceptar”.  
✔️ Simulación de CRUD usando funciones con React y uso de `useState`.

---

## 🛠️ Tecnologías Usadas

- ⚛️ ReactJS (Vite)
- 💅 Bootstrap 5
- 🎯 HTML5 + CSS3
- ⚙️ JavaScript (ES6+)
- 🎣 React Hooks: `useState`
- 📡 Comunicación padre ↔ hijo entre componentes

---

## 📁 Estructura del Proyecto
```
GIMNASIO-PF/
├── public/
├── src/
│ ├── components/
│ │ ├── Carousel.jsx
│ │ ├── Form.jsx
│ │ ├── HorariosGym.jsx
│ │ ├── NavBar.jsx
│ │ ├── PartnersTable.jsx
│ │ └── SobreNosotros.jsx
│ ├── routes/
│ │ └── routes.jsx
│ ├── styles/
│ │ ├── App.css
│ │ ├── Carousel.css
│ │ ├── HorariosGym.css
│ │ ├── NavBar.css
│ │ └── SobreNosotros.css
│ ├── App.jsx
│ └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```
---

## 🧠 Consideraciones Técnicas

- Se utilizó comunicación entre componentes padre-hijo e hijo-padre mediante props y callbacks.
- El CRUD se maneja con estados internos (`useState`) simulando una operación asincrónica tipo AJAX.
- La interfaz fue desarrollada de forma responsiva con Bootstrap.

---

## 🚀 ¿Cómo correr la app?

1. Clonar el repositorio
2. Instalar dependencias:

```bash
npm install
# Gimnasio-PF
