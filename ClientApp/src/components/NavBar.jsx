import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Barra de navegación simple con enlaces a las diferentes secciones del
 * sistema. Utiliza NavLink para aplicar estilos activos según la ruta
 * seleccionada.
 */
const NavBar = () => {
  const navItemClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'
    }`;
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-blue-700">Gimnasio</h1>
        <div className="flex space-x-4">
          <NavLink to="/" className={navItemClass}>Inicio</NavLink>
          <NavLink to="/socios" className={navItemClass}>Socios</NavLink>
          <NavLink to="/membresias" className={navItemClass}>Membresías</NavLink>
          <NavLink to="/clases" className={navItemClass}>Clases</NavLink>
          <NavLink to="/reservas" className={navItemClass}>Reservas</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;