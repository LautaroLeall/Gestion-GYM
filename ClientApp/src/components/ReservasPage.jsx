import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Página para gestionar las reservas. Permite crear nuevas reservas
 * seleccionando un socio y una clase de las listas. También se listan
 * las reservas existentes con opción para eliminarlas.
 */
const ReservasPage = () => {
  const [reservas, setReservas] = useState([]);
  const [socios, setSocios] = useState([]);
  const [clases, setClases] = useState([]);
  const [form, setForm] = useState({ socioId: '', claseId: '', fechaClase: '' });
  const [error, setError] = useState(null);

  const [scheduleOptions, setScheduleOptions] = useState([]);

  const fetchReservas = async () => {
    const res = await axios.get('/api/reservas');
    setReservas(res.data);
  };
  const fetchSociosClases = async () => {
    const [s, c] = await Promise.all([axios.get('/api/socios'), axios.get('/api/clases')]);
    setSocios(s.data);
    setClases(c.data);
  };
  useEffect(() => {
    fetchReservas();
    fetchSociosClases();
  }, []);

  // Recalcular opciones de fechas cuando se selecciona una clase
  useEffect(() => {
    if (!form.claseId) {
      setScheduleOptions([]);
      setForm((prev) => ({ ...prev, fechaClase: '' }));
      return;
    }
    const clase = clases.find((c) => c.id === Number(form.claseId));
    if (!clase) {
      setScheduleOptions([]);
      setForm((prev) => ({ ...prev, fechaClase: '' }));
      return;
    }
    // Convertir diasSemana y hora a valores utilizable
    const dias = (clase.diasSemana || '').split(',').map((d) => d.trim());
    const [horaStr, minutoStr] = clase.hora.split(':');
    const hora = parseInt(horaStr, 10);
    const minuto = parseInt(minutoStr, 10);
    const opciones = [];
    const today = new Date();
    // Calcular días hasta el domingo (0 = Sunday)
    const diasHastaDomingo = (7 - today.getDay()) % 7;
    for (let i = 0; i <= diasHastaDomingo; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Obtener día en inglés para comparar con diasSemana de la clase
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      if (dias.includes(dayName)) {
        const optionDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hora, minuto, 0);
        // Solo fechas en el futuro o hoy a una hora futura
        if (optionDate >= today) {
          opciones.push(optionDate);
        }
      }
    }
    setScheduleOptions(opciones);
    // Seleccionar la primera opción por defecto
    setForm((prev) => ({ ...prev, fechaClase: opciones.length ? opciones[0].toISOString() : '' }));
  }, [form.claseId, clases]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reservas', {
        socioId: Number(form.socioId),
        claseId: Number(form.claseId),
        fechaClase: form.fechaClase,
        fechaReserva: new Date().toISOString()
      });
      setForm({ socioId: '', claseId: '', fechaClase: '' });
      fetchReservas();
    } catch (err) {
      setError(err.response?.data || 'Error al reservar');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro desea cancelar esta reserva?')) return;
    await axios.delete(`/api/reservas/${id}`);
    fetchReservas();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Reservas</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 space-y-4">
        <h3 className="text-lg font-medium">Nueva reserva</h3>
        {error && <p className="text-red-600">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Socio</label>
            <select className="w-full border rounded px-2 py-1" value={form.socioId} onChange={(e) => setForm({ ...form, socioId: e.target.value })} required>
              <option value="">Seleccione un socio</option>
              {socios.map((s) => (
                <option key={s.id} value={s.id}>{s.nombre} {s.apellido}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Clase</label>
            <select className="w-full border rounded px-2 py-1" value={form.claseId} onChange={(e) => setForm({ ...form, claseId: e.target.value })} required>
              <option value="">Seleccione una clase</option>
              {clases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre} ({c.diasSemana} {c.hora?.substring(0,5)})
                </option>
              ))}
            </select>
          </div>
          {form.claseId && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Fecha y hora</label>
              <select
                className="w-full border rounded px-2 py-1"
                value={form.fechaClase}
                onChange={(e) => setForm({ ...form, fechaClase: e.target.value })}
                required
              >
                {scheduleOptions.map((date) => (
                  <option key={date.toISOString()} value={date.toISOString()}>
                    {date.toLocaleString('es-AR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Reservar</button>
      </form>
      <div className="bg-white shadow-md rounded p-4">
        <h3 className="text-lg font-medium mb-2">Listado de reservas</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Socio</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Clase</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha reserva</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha de clase</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <AnimatePresence>
              {reservas.map((r) => (
                <motion.tr key={r.id} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.2 }}>
                  <td className="px-4 py-2 whitespace-nowrap">{r.socioNombreCompleto}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{r.claseNombre}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{new Date(r.fechaReserva).toLocaleString()}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{new Date(r.fechaClase).toLocaleString()}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => handleDelete(r.id)} className="text-red-600 hover:underline">Eliminar</button>
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

export default ReservasPage;