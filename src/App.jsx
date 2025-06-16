import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import AppRoutes from './routes/routes';

function App() {
  const [socios, setSocios] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [socioEditado, setSocioEditado] = useState(null);

  const agregarSocio = (nuevoSocio) => {
    setSocios([...socios, nuevoSocio]);
  };

  const eliminarSocio = (indice) => {
    const nuevosSocios = socios.filter((_, i) => i !== indice);
    setSocios(nuevosSocios);
  };

  const editarSocio = (indice) => {
    setSocioEditado({ ...socios[indice], indice });
    setModoEdicion(true);
  };

  const actualizarSocio = (socioActualizado) => {
    const nuevosSocios = socios.map((s, i) =>
      i === socioActualizado.indice ? socioActualizado : s
    );
    setSocios(nuevosSocios);
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
