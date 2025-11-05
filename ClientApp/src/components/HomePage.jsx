import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

/**
 * Página de inicio del sistema de gestión de gimnasio. Muestra
 * información introductoria, una imagen decorativa y enlaces para
 * comenzar a explorar las diferentes funcionalidades. Se utilizan
 * animaciones de Framer Motion para un efecto de entrada suave.
 */
const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">Bienvenido a Gestion GYM</h2>
        <p className="max-w-2xl mx-auto text-gray-700 text-lg md:text-xl">
          Administra socios, clases y reservas de manera sencilla. <br />
          Nuestro sistemate permite crear y gestionar membresías,
          programar clases y llevar un registro ordenado de las reservas para que nada se te escape.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full max-w-md"
      >
        {/* La imagen se sirve desde la carpeta public. */}
        <img
          src="/gym-illustration.png"
          alt="Ilustración de gimnasio"
          className="rounded-lg shadow-lg w-full h-auto"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="space-x-4"
      >
        <NavLink
          to="/socios"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium"
        >
          Gestionar socios
        </NavLink>
        <NavLink
          to="/clases"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-lg font-medium"
        >
          Ver clases
        </NavLink>
        <NavLink
          to="/reservas"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-lg font-medium"
        >
          Agendar turno
        </NavLink>
      </motion.div>
    </div>
  );
};

export default HomePage;