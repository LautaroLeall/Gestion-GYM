import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Página para gestionar planes de membresía. Permite crear, editar y
 * eliminar membresías. Al igual que en socios, se emplea Framer Motion
 * para animar la aparición de las filas.
 */
const MembresiasPage = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ id: null, nombre: '', descripcion: '', precio: '', duracionDias: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const res = await axios.get('/api/membresias');
    setItems(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setForm({ id: null, nombre: '', descripcion: '', precio: '', duracionDias: '' });
    setIsEditing(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar formulario
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    const payload = {
      nombre: form.nombre,
      descripcion: form.descripcion || null,
      precio: parseFloat(form.precio),
      duracionDias: parseInt(form.duracionDias)
    };
    try {
      if (isEditing) {
        await axios.put(`/api/membresias/${form.id}`, payload);
      } else {
        await axios.post('/api/membresias', payload);
      }
      resetForm();
      fetchData();
    } catch (err) {
      setError(err.response?.data || 'Error al guardar');
    }
  };

  /**
   * Valida el formulario de membresías. Devuelve un mensaje de error si
   * encuentra algún problema; de lo contrario, devuelve null.
   */
  const validateForm = () => {
    // Nombre mínimo 4 caracteres y solo letras/espacios
    if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{4,}$/.test(form.nombre.trim())) {
      return 'El nombre debe tener al menos 4 caracteres y solo letras.';
    }
    // Descripción opcional: máximo 50 caracteres y solo letras/espacios
    if (form.descripcion && form.descripcion.trim() !== '') {
      if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{0,50}$/.test(form.descripcion.trim())) {
        return 'La descripción solo puede contener letras y hasta 50 caracteres.';
      }
    }
    // Precio mínimo 10000
    const precioVal = parseFloat(form.precio);
    if (isNaN(precioVal) || precioVal < 10000) {
      return 'El precio debe ser un número mayor o igual a 10.000.';
    }
    // Duración días mínimo 1
    const durVal = parseInt(form.duracionDias);
    if (isNaN(durVal) || durVal < 1) {
      return 'La duración en días debe ser un número mayor a 0.';
    }
    return null;
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setForm({
      id: item.id,
      nombre: item.nombre,
      descripcion: item.descripcion || '',
      precio: item.precio,
      duracionDias: item.duracionDias
    });
  };
  const handleDelete = async (id) => {
    if (!confirm('¿Seguro desea eliminar esta membresía?')) return;
    await axios.delete(`/api/membresias/${id}`);
    fetchData();
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Membresías</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 space-y-4">
        <h3 className="text-lg font-medium">{isEditing ? 'Editar membresía' : 'Nueva membresía'}</h3>
        {error && <p className="text-red-600">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input className="w-full border rounded px-2 py-1" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <input
              className="w-full border rounded px-2 py-1"
              value={form.descripcion}
              maxLength={50}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value.slice(0, 50) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Precio</label>
            <input type="number" min="0" step="0.01" className="w-full border rounded px-2 py-1" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Duración (días)</label>
            <input type="number" min="1" className="w-full border rounded px-2 py-1" value={form.duracionDias} onChange={(e) => setForm({ ...form, duracionDias: e.target.value })} required />
          </div>
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{isEditing ? 'Actualizar' : 'Agregar'}</button>
          {isEditing && (
            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={resetForm}>Cancelar</button>
          )}
        </div>
      </form>
      <div className="bg-white shadow-md rounded p-4">
        <h3 className="text-lg font-medium mb-2">Listado de membresías</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Duración</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <AnimatePresence>
              {items.map((item) => (
                <motion.tr key={item.id} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.2 }}>
                  <td className="px-4 py-2 whitespace-nowrap">{item.nombre}</td>
                  <td className="px-4 py-2 whitespace-nowrap">${item.precio.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.duracionDias} días</td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline">Editar</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Eliminar</button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembresiasPage;