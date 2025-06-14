import { useState } from 'react';
import NavBar from './components/NavBar';
import Carousel from './components/Carousel';
import SobreNosotros from './components/SobreNosotros';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

function App() {
  const [vista, setVista] = useState('inicio');
  const [socios, setSocios] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [socioEditado, setSocioEditado] = useState(null);

  const agregarSocio = (nuevoSocio) => {
    setSocios([...socios, nuevoSocio]);
    setVista('tabla'); // Esto hará scroll automático a la tabla
  };

  const eliminarSocio = (indice) => {
    const nuevosSocios = socios.filter((_, i) => i !== indice);
    setSocios(nuevosSocios);
  };

  const editarSocio = (indice) => {
    setSocioEditado({ ...socios[indice], indice });
    setModoEdicion(true);
    setVista('formulario'); // Para hacer scroll al formulario
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
    <div className="bg-secondary">
      <NavBar cambiarVista={setVista} />
      {vista === 'inicio' || vista === 'formulario' || vista === 'tabla' || vista === 'SobreNosotros' ? (
        <Carousel
          vista={vista}
          agregarSocio={agregarSocio}
          socioEditado={socioEditado}
          actualizarSocio={actualizarSocio}
          modoEdicion={modoEdicion}
          cancelarEdicion={cancelarEdicion}
          socios={socios}
          eliminarSocio={eliminarSocio}
          editarSocio={editarSocio}
        />
      ) : vista === 'SobreNosotros' ? (
        <SobreNosotros />
      ) : null}
    </div>
  );
}

export default App;
