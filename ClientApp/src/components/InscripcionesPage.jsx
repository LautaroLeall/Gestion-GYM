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

  // Traductor de números de día (1..7) a español
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

    // PASO 2: generar fechas hasta tres semanas por delante (21 días)
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
      // PASO 1: ya no enviamos `fechaReserva`; el servidor la asigna con DateTime.Now
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
        {/* formulario para crear inscripciones */}
      </form>
      {/* tabla con inscripciones existentes */}
    </div>
  );
};

export default InscripcionesPage;
