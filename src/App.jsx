import { useState } from 'react';
import Navbar from './components/NavBar';
import Carousel from './components/Carousel';
import Form from './components/Form';
import PartnersTable from './components/PartnersTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './App.css'

function App() {
  const [vista, setVista] = useState('inicio');
  const [socios, setSocios] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [socioEditado, setSocioEditado] = useState(null);

  const agregarSocio = (nuevoSocio) => {
    setSocios([...socios, nuevoSocio]);
    setVista('tabla');
  };

  const eliminarSocio = (indice) => {
    const nuevosSocios = socios.filter((_, i) => i !== indice);
    setSocios(nuevosSocios);
  };

  const editarSocio = (indice) => {
    setSocioEditado({ ...socios[indice], indice });
    setModoEdicion(true);
    setVista('formulario');
  };

  const actualizarSocio = (socioActualizado) => {
    const nuevosSocios = socios.map((s, i) =>
      i === socioActualizado.indice ? socioActualizado : s
    );
    setSocios(nuevosSocios);
    setModoEdicion(false);
    setSocioEditado(null);
    setVista('tabla');
  };

  const cancelarEdicion = () => {
    setModoEdicion(false);
    setSocioEditado(null);
    setVista('tabla');
  };

  return (
    <div>
      <Navbar cambiarVista={setVista} />
      <div className="contenedor-carousel">
        {vista === 'inicio' && <Carousel />}
        {vista === 'formulario' && (
          <Form
            agregarSocio={agregarSocio}
            socioEditado={socioEditado}
            actualizarSocio={actualizarSocio}
            modoEdicion={modoEdicion}
            cancelarEdicion={cancelarEdicion}
          />
        )}
        {vista === 'tabla' && (
          <PartnersTable
            socios={socios}
            eliminarSocio={eliminarSocio}
            editarSocio={editarSocio}
          />
        )}
      </div>
    </div>
  );
}

export default App;

