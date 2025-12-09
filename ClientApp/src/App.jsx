import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import SociosPage from './components/SociosPage.jsx';
import ClasesPage from './components/ClasesPage.jsx';
import InscripcionesPage from './components/InscripcionesPage.jsx';
import HomePage from './components/HomePage.jsx';
import Footer from './components/Footer.jsx';

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
          <Route path="/clases" element={<ClasesPage />} />
          <Route path="/inscripciones" element={<InscripcionesPage />} />
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Routes>
      </main>
      {/* Pie de página compartido con todas las páginas */}
      <Footer />
    </div>
  );
};

export default App;