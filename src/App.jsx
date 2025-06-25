import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './routes/routes';
import './styles/App.css';

function App() {
  const [socios, setSocios] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [socioEditado, setSocioEditado] = useState(null);

  // Al cargar la app, recuperamos los datos del localStorage
  useEffect(() => {
    const sociosGuardados = JSON.parse(localStorage.getItem("Socios"));
    if (sociosGuardados) {
      setSocios(sociosGuardados);
    }
  }, []);

  const guardarEnLocalStorage = (nuevosSocios) => {
    localStorage.setItem("Socios", JSON.stringify(nuevosSocios));
  };

  const agregarSocio = (nuevoSocio) => {
    const nuevoId = socios.length > 0
      ? Math.max(...socios.map(s => s.id)) + 1
      : 1;

    const socioConId = { ...nuevoSocio, id: nuevoId };
    const nuevosSocios = [...socios, socioConId];
    setSocios(nuevosSocios);
    guardarEnLocalStorage(nuevosSocios);
  };

  const eliminarSocio = (id) => {
    const nuevosSocios = socios.filter((s) => s.id !== id);
    setSocios(nuevosSocios);
    guardarEnLocalStorage(nuevosSocios);
  };

  const editarSocio = (id) => {
    const socioAEditar = socios.find((s) => s.id === id);
    setSocioEditado(socioAEditar);
    setModoEdicion(true);
  };

  const actualizarSocio = (socioActualizado) => {
    const nuevosSocios = socios.map((s) =>
      s.id === socioActualizado.id ? socioActualizado : s
    );
    setSocios(nuevosSocios);
    guardarEnLocalStorage(nuevosSocios);
    setModoEdicion(false);
    setSocioEditado(null);
  };

  const cancelarEdicion = () => {
    setModoEdicion(false);
    setSocioEditado(null);
  };

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
