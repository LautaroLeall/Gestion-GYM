# 🏋️‍♂️ Trabajo Práctico Final - Desarrollo de Front End

**Materia:** Desarrollo de Front End  
**Profesor:** Ing. Marcos Rivero  
**Tecnologías:** HTML - CSS - JavaScript - ReactJS - Bootstrap

---

## 📌 Proyecto: Reservas de Clases de Gimnasio

Esta aplicación permite gestionar la reserva de turnos para distintas clases de un gimnasio. Fue desarrollada utilizando ReactJS con componentes funcionales, uso de Hooks y comunicación entre componentes. Los estilos están aplicados con Bootstrap.

---

## 🎯 Funcionalidades principales

- ⏰ Visualización y reserva de horarios para clases.  
- 📝 Formulario para ingresar los datos de un socio: <br>
         ✔️ Nombre y Apellido  
         ✔️ Teléfono  
         ✔️ Email  
         ✔️ Clase (Funcional, Zumba, Crossfit, Musculación)  
         ✔️ Horario (dependiente de la clase elegida)
- 📊 Tablas interactivas para gestionar los datos cargados en el formulario.
- 🎉 Notificacion con SweetAlert2 si desea eliminar su turno.
- 💾 Se guarda la informacion del usuario al registrarse en el **LocalStorage** y se actualiza en tiempo real si desea acatualizar/eliminar el turno.   
- 🏆 Página "Sobre Nosotros" con información de los participantes del grupo.  

---

## 🛠️ Tecnologías Usadas

```
- ⚛️ ReactJS (Vite)
- 💅 Bootstrap 5
- 🎯 HTML5 + CSS3
- ⚙️ JavaScript (ES6+)
- 🎣 React Hooks: `useState`
- 📡 Comunicación padre ↔ hijo entre componentes
```

---

## 📁 Estructura del Proyecto
```
GIMNASIO-PF/
├── public/              # Archivos estáticos (img)
├── src/
│   ├── assets/          # Imagenes del Proyecto
│   ├── components/      # Componentes React
│   ├── routes/          # Definición de rutas
│   ├── styles/          # Archivos CSS por componente
│   ├── App.jsx          # Componente principal
│   └── main.jsx         # Punto de entrada
├── index.html
├── package.json
└── vite.config.js
```

---

## 🧠 Consideraciones Técnicas

- Se utilizó comunicación entre componentes padre-hijo e hijo-padre mediante props y callbacks.
- El CRUD se maneja con estados internos (`useState`) simulando una operación asincrónica tipo AJAX.

---

## ⚙️ Instalación y ejecución

```bash
# Clona el repositorio
git clone https://github.com/LautaroLeall/Gimnasio-PF.git

# Entra al proyecto
cd Gimnasio-PF

# Instala dependencias
npm install

# Levanta el servidor de desarrollo
npm run dev
