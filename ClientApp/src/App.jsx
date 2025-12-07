import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import SociosPage from './components/SociosPage.jsx';
// Eliminado import de MembresiasPage: el sistema ya no gestiona
// planes de membresía.
import ClasesPage from './components/ClasesPage.jsx';
// Importar la página de inscripciones (antes ReservasPage).  La ruta
// cambiará a "/inscripciones".
import InscripcionesPage from './components/InscripcionesPage.jsx';
import HomePage from './components/HomePage.jsx';

/**
 * Componente de nivel superior que define la navegación y las rutas de la
 * aplicación. Incluye una barra de navegación persistente y diferentes
 * páginas para gestionar socios, clases e inscripciones.
 */
const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto p-4">
        <Routes>
          {/* Ruta de inicio que carga la página de bienvenida */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/socios" element={<SociosPage />} />
          {/* Se elimina la ruta de membresías */}
          <Route path="/clases" element={<ClasesPage />} />
          {/* Las reservas se renombran a inscripciones */}
          <Route path="/inscripciones" element={<InscripcionesPage />} />
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;