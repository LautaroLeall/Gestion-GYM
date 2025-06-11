import { useState } from "react";
import Formulario from "./components/Form";
import TablaSocios from "./components/PartnersTable";
import "./App.css";

const App = () => {
  const [socios, setSocios] = useState([]);
  const [socioEditado, setSocioEditado] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [indexEditado, setIndexEditado] = useState(null);

  const agregarSocio = (nuevoSocio) => {
    // Simulación de llamada AJAX
    setTimeout(() => {
      setSocios([...socios, nuevoSocio]);
    }, 300);
  };

  const eliminarSocio = (index) => {
    if (confirm("¿Estás seguro de eliminar este registro?")) {
      setSocios(socios.filter((_, i) => i !== index));
    }
  };

  const editarSocio = (index) => {
    setModoEdicion(true);
    setIndexEditado(index);
    setSocioEditado(socios[index]);
  };

  const actualizarSocio = (socioActualizado) => {
    const copia = [...socios];
    copia[indexEditado] = socioActualizado;
    setSocios(copia);
    setModoEdicion(false);
    setSocioEditado(null);
    setIndexEditado(null);
  };

  const cancelarEdicion = () => {
    setModoEdicion(false);
    setSocioEditado(null);
    setIndexEditado(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">🏋️‍♂️ Reservas de Clases - Gimnasio</h1>

      <Formulario
        agregarSocio={agregarSocio}
        socioEditado={socioEditado}
        actualizarSocio={actualizarSocio}
        modoEdicion={modoEdicion}
        cancelarEdicion={cancelarEdicion}
      />

      <TablaSocios
        socios={socios}
        eliminarSocio={eliminarSocio}
        editarSocio={editarSocio}
      />
    </div>
  );
};

export default App;
