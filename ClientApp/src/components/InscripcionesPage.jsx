import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Página para gestionar las inscripciones. Permite crear nuevas
 * inscripciones seleccionando un socio y una clase. También
 * lista las inscripciones existentes y permite eliminarlas.
 */
const InscripcionesPage = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [socios, setSocios] = useState([]);
  const [clases, setClases] = useState([]);
  const [form, setForm] = useState({ socioId: '', claseId: '', fechaClase: '' });
  const [error, setError] = useState(null);
  const [scheduleOptions, setScheduleOptions] = useState([]);

  // Traductor de números de día (1..7)
  const LABEL_DIAS = { 1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado', 7: 'Domingo' };

  const diasToLabels = (cadena) => {
    if (!cadena) return '';
    return cadena.split(',')
      .map(d => LABEL_DIAS[parseInt(d.trim())] || d.trim())
      .join(', ');
  };

  // Obtener datos iniciales
  useEffect(() => {
    fetchInscripciones();
    fetchSociosClases();
  }, []);

  const fetchInscripciones = async () => {
    const res = await axios.get('/api/inscripciones');
    setInscripciones(res.data);
  };

  const fetchSociosClases = async () => {
    const [s, c] = await Promise.all([axios.get('/api/socios'), axios.get('/api/clases')]);
    setSocios(s.data);
    setClases(c.data);
  };

  // Recalcular fechas al elegir una clase
  useEffect(() => {
    if (!form.claseId) {
      setScheduleOptions([]);
      setForm(prev => ({ ...prev, fechaClase: '' }));
      return;
    }

    const clase = clases.find(c => c.id === Number(form.claseId));
    if (!clase) {
      setScheduleOptions([]);
      setForm(prev => ({ ...prev, fechaClase: '' }));
      return;
    }

    const dias = (clase.diasSemana || '')
      .split(',')
      .map(d => parseInt(d.trim()))
      .filter(n => !isNaN(n));

    const [horaStr, minutoStr] = clase.hora.split(':');
    const hora = parseInt(horaStr, 10);
    const minuto = parseInt(minutoStr, 10);

    const opciones = [];
    const today = new Date();

    // generar fechas hasta tres semanas por delante (21 días)
    const diasFuturos = 21;
    for (let i = 0; i <= diasFuturos; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Número de día 1..7 (domingo=7)
      const dayNumber = date.getDay() === 0 ? 7 : date.getDay();
      if (dias.includes(dayNumber)) {
        const optionDate = new Date(
          date.getFullYear(), date.getMonth(), date.getDate(),
          hora, minuto, 0
        );
        // Sólo fechas futuras o con la hora correcta en el mismo día
        if (optionDate >= today) {
          opciones.push(optionDate);
        }
      }
    }

    setScheduleOptions(opciones);
    setForm(prev => ({ ...prev, fechaClase: opciones.length ? opciones[0].toISOString() : '' }));
  }, [form.claseId, clases]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ya no enviamos `fechaReserva`; el servidor la asigna con DateTime.Now
      await axios.post('/api/inscripciones', {
        socioId: Number(form.socioId),
        claseId: Number(form.claseId),
        fechaClase: form.fechaClase
      });
      setForm({ socioId: '', claseId: '', fechaClase: '' });
      fetchInscripciones();
      setError(null);
    } catch (err) {
      let message = 'Error al crear la inscripción';
      if (err.response && err.response.data) {
        message = typeof err.response.data === 'string'
          ? err.response.data
          : JSON.stringify(err.response.data);
      }
      setError(message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro desea cancelar esta inscripción?')) return;
    await axios.delete(`/api/inscripciones/${id}`);
    fetchInscripciones();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Inscripciones</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Socio</label>
            <select
              value={form.socioId}
              onChange={(e) => setForm({ ...form, socioId: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Seleccionar socio</option>
              {socios.map(s => (
                <option key={s.id} value={s.id}>
                  {s.nombre} {s.apellido}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Clase</label>
            <select
              value={form.claseId}
              onChange={(e) => setForm({ ...form, claseId: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Seleccionar clase</option>
              {clases.map(c => (
                <option key={c.id} value={c.id}>
                  {c.nombre} ({diasToLabels(c.diasSemana)})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Fecha</label>
            <select
              value={form.fechaClase}
              onChange={(e) => setForm({ ...form, fechaClase: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Seleccionar fecha</option>
              {scheduleOptions.map((date, i) => (
                <option key={i} value={date.toISOString()}>
                  {date.toLocaleDateString('es-AR')} - {date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                </option>
              ))}
            </select>
          </div>
        </div>
        {error && <div className="text-red-600 font-semibold">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Inscribir
        </button>
      </form>

      <div className="bg-white shadow-md rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Socio</th>
              <th className="px-4 py-2 text-left">Clase</th>
              <th className="px-4 py-2 text-left">Fecha de Clase</th>
              <th className="px-4 py-2 text-left">Horario de Inicio</th>
              <th className="px-4 py-2 text-left">Fecha de Reserva</th>
              <th className="px-4 py-2 text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {inscripciones.map(insc => (
                <motion.tr
                  key={insc.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-t hover:bg-gray-100"
                >
                  <td className="px-4 py-2">{insc.socioNombreCompleto}</td>
                  <td className="px-4 py-2">{insc.claseNombre}</td>
                  <td className="px-4 py-2">{new Date(insc.fechaClase).toLocaleDateString('es-AR')}</td>
                  <td className="px-4 py-2">{insc.hora}</td>
                  <td className="px-4 py-2">{new Date(insc.fechaReserva).toLocaleDateString('es-AR')}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(insc.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Cancelar
                    </button>
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

export default InscripcionesPage;
