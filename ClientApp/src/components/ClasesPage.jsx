import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Página para gestionar clases del gimnasio. Permite crear y modificar
 * clases, así como eliminarlas. Se muestra la fecha y el cupo máximo.
 */
const ClasesPage = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombre: '',
    descripcion: '',
    instructor: '',
    cupoMaximo: '',
    diasSemana: [],
    hora: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const res = await axios.get('/api/clases');
    setItems(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setForm({
      id: null,
      nombre: '',
      descripcion: '',
      instructor: '',
      cupoMaximo: '',
      diasSemana: [],
      hora: ''
    });
    setIsEditing(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nombre: form.nombre,
      descripcion: form.descripcion || null,
      instructor: form.instructor,
      cupoMaximo: parseInt(form.cupoMaximo),
      diasSemana: form.diasSemana,
      // convertir hora a formato HH:mm:ss esperado por la API
      hora: form.hora ? `${form.hora}:00` : null
    };
    try {
      if (isEditing) {
        await axios.put(`/api/clases/${form.id}`, payload);
      } else {
        await axios.post('/api/clases', payload);
      }
      resetForm();
      fetchData();
    } catch (err) {
      setError(err.response?.data || 'Error al guardar');
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setForm({
      id: item.id,
      nombre: item.nombre,
      descripcion: item.descripcion || '',
      instructor: item.instructor,
      cupoMaximo: item.cupoMaximo,
      diasSemana: item.diasSemana ? item.diasSemana.split(',') : [],
      hora: item.hora ? item.hora.substring(0, 5) : ''
    });
  };
  const handleDelete = async (id) => {
    if (!confirm('¿Seguro desea eliminar esta clase?')) return;
    await axios.delete(`/api/clases/${id}`);
    fetchData();
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Clases</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 space-y-4">
        <h3 className="text-lg font-medium">{isEditing ? 'Editar clase' : 'Nueva clase'}</h3>
        {error && <p className="text-red-600">{JSON.stringify(error)}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input className="w-full border rounded px-2 py-1" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Instructor</label>
            <input className="w-full border rounded px-2 py-1" value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cupo máximo</label>
            <input type="number" min="1" className="w-full border rounded px-2 py-1" value={form.cupoMaximo} onChange={(e) => setForm({ ...form, cupoMaximo: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Días de la semana</label>
            <div className="flex flex-wrap gap-2">
              {['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].map((dia) => (
                <label key={dia} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={form.diasSemana.includes(dia)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm({ ...form, diasSemana: [...form.diasSemana, dia] });
                      } else {
                        setForm({ ...form, diasSemana: form.diasSemana.filter((d) => d !== dia) });
                      }
                    }}
                  />
                  <span>{dia}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hora de inicio</label>
            <input
              type="time"
              className="w-full border rounded px-2 py-1"
              value={form.hora}
              onChange={(e) => setForm({ ...form, hora: e.target.value })}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea className="w-full border rounded px-2 py-1" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
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
        <h3 className="text-lg font-medium mb-2">Listado de clases</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Instructor</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Días</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hora</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cupo</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <AnimatePresence>
              {items.map((item) => (
                <motion.tr key={item.id} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.2 }}>
                  <td className="px-4 py-2 whitespace-nowrap">{item.nombre}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.instructor}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.diasSemana}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.hora?.substring(0,5)}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.cupoMaximo}</td>
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

export default ClasesPage;