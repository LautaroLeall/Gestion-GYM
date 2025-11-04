import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import SociosPage from './components/SociosPage.jsx';
import MembresiasPage from './components/MembresiasPage.jsx';
import ClasesPage from './components/ClasesPage.jsx';
import ReservasPage from './components/ReservasPage.jsx';
import HomePage from './components/HomePage.jsx';

/**
 * Componente de nivel superior que define la navegación y las rutas de la
 * aplicación. Incluye una barra de navegación persistente y diferentes
 * páginas para gestionar socios, membresías, clases y reservas.
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
          <Route path="/membresias" element={<MembresiasPage />} />
          <Route path="/clases" element={<ClasesPage />} />
          <Route path="/reservas" element={<ReservasPage />} />
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;