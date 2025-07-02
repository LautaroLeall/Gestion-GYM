import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './routes/routes';
import './styles/App.css';

// Componente principal de la aplicación
function App() {
  // Estado para almacenar la lista de socios
  const [socios, setSocios] = useState([]);

  // Estado para saber si estamos en modo edición (true) o no (false)
  const [modoEdicion, setModoEdicion] = useState(false);

  // Estado que almacena los datos del socio que se está editando
  const [socioEditado, setSocioEditado] = useState(null);

  // useEffect que se ejecuta una sola vez al cargar la aplicación
  useEffect(() => {
    // Recupera los socios guardados en localStorage
    const sociosGuardados = JSON.parse(localStorage.getItem("Socios"));

    // Si hay datos guardados, los establece en el estado
    if (sociosGuardados) {
      setSocios(sociosGuardados);
    }
  }, []); // El array vacío [] indica que se ejecuta solo una vez al montar el componente

  // Función para guardar la lista de socios en localStorage
  const guardarEnLocalStorage = (nuevosSocios) => {
    localStorage.setItem("Socios", JSON.stringify(nuevosSocios));
  };

  // Función para agregar un nuevo socio
  const agregarSocio = (nuevoSocio) => {
    // Genera un nuevo ID único basado en el ID más alto existente
    const nuevoId = socios.length > 0
      ? Math.max(...socios.map(s => s.id)) + 1
      : 1;

    // Crea el objeto del nuevo socio con ID incluido
    const socioConId = { ...nuevoSocio, id: nuevoId };

    // Crea una nueva lista con el nuevo socio
    const nuevosSocios = [...socios, socioConId];

    // Actualiza el estado con la nueva lista
    setSocios(nuevosSocios);

    // Guarda la nueva lista en localStorage
    guardarEnLocalStorage(nuevosSocios);
  };

  // Función para eliminar un socio por su ID
  const eliminarSocio = (id) => {
    // Filtra la lista para quitar el socio con el ID indicado
    const nuevosSocios = socios.filter((s) => s.id !== id);

    // Actualiza el estado con la nueva lista
    setSocios(nuevosSocios);

    // Guarda la lista actualizada en localStorage
    guardarEnLocalStorage(nuevosSocios);
  };

  // Función para preparar la edición de un socio
  const editarSocio = (id) => {
    // Busca el socio que se quiere editar por su ID
    const socioAEditar = socios.find((s) => s.id === id);

    // Guarda el socio en el estado para editar
    setSocioEditado(socioAEditar);

    // Activa el modo edición
    setModoEdicion(true);
  };

  // Función para guardar los cambios realizados al editar un socio
  const actualizarSocio = (socioActualizado) => {
    // Crea una nueva lista actualizando solo el socio editado
    const nuevosSocios = socios.map((s) =>
      s.id === socioActualizado.id ? socioActualizado : s
    );

    // Actualiza el estado con la nueva lista
    setSocios(nuevosSocios);

    // Guarda los cambios en localStorage
    guardarEnLocalStorage(nuevosSocios);

    // Sale del modo edición
    setModoEdicion(false);

    // Limpia el estado del socio editado
    setSocioEditado(null);
  };

  // Función para cancelar la edición sin guardar cambios
  const cancelarEdicion = () => {
    setModoEdicion(false);       // Sale del modo edición
    setSocioEditado(null);       // Limpia el socio editado
  };

  // Retorna el componente de rutas y pasa todas las props necesarias
  return (
    <AppRoutes
      socios={socios}
      agregarSocio={agregarSocio}
      eliminarSocio={eliminarSocio}
      editarSocio={editarSocio}
      actualizarSocio={actualizarSocio}
      cancelarEdicion={cancelarEdicion}
      modoEdicion={modoEdicion}
      socioEditado={socioEditado}
    />
  );
}

export default App;
