import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Página para gestionar clases del gimnasio. Permite crear y modificar
 * clases, así como eliminarlas. Se muestra la fecha y el cupo máximo.
 */
const ClasesPage = () => {
  // Días de la semana disponibles como números (1=Lunes, …, 7=Domingo)
  const diasSemanaDisponibles = [
    { value: 1, label: 'Lunes' },
    { value: 2, label: 'Martes' },
    { value: 3, label: 'Miércoles' },
    { value: 4, label: 'Jueves' },
    { value: 5, label: 'Viernes' },
    { value: 6, label: 'Sábado' },
    { value: 7, label: 'Domingo' }
  ];
  const horariosDisponibles = [];
  // Horarios disponibles de 10:00 a 21:30 en intervalos de 30 minutos
  for (let h = 10; h <= 21; h++) {
    const hourStr = String(h).padStart(2, '0');
    horariosDisponibles.push(`${hourStr}:00`);
    horariosDisponibles.push(`${hourStr}:30`);
  }

  // Convierte una cadena de días separados por coma (números) a una
  const formatoDias = (dias) => {
    if (!dias) return '';
    return dias
      .split(',')
      .map((d) => {
        const n = parseInt(d.trim());
        const item = diasSemanaDisponibles.find((x) => x.value === n);
        return item ? item.label : d.trim();
      })
      .join(', ');
  };
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombre: '',
    descripcion: '',
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
      cupoMaximo: '',
      diasSemana: [],
      hora: ''
    });
    setIsEditing(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar el formulario
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    const payload = {
      nombre: form.nombre,
      descripcion: form.descripcion || null,
      cupoMaximo: parseInt(form.cupoMaximo),
      diasSemana: form.diasSemana,
      // Convertir hora a formato HH:mm:ss esperado por la API
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

  /**
   * Valida el formulario de clases. Devuelve un mensaje de error si
   * encuentra algún problema; en caso contrario devuelve null.
   */
  const validateForm = () => {
    // Nombre no vacío
    if (!form.nombre.trim()) {
      return 'El nombre de la clase es obligatorio.';
    }
    // Cupo debe estar entre 5 y 50
    const cupo = parseInt(form.cupoMaximo);
    if (isNaN(cupo) || cupo < 5 || cupo > 50) {
      return 'El cupo máximo debe ser un número entre 5 y 50.';
    }
    // Al menos un día seleccionado
    if (!form.diasSemana || form.diasSemana.length === 0) {
      return 'Debe seleccionar al menos un día de la semana.';
    }
    // Hora seleccionada
    if (!form.hora) {
      return 'Debe seleccionar un horario.';
    }
    // Descripción opcional: máximo 50 caracteres y solo letras/espacios
    if (form.descripcion && form.descripcion.trim() !== '') {
      if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{0,50}$/.test(form.descripcion.trim())) {
        return 'La descripción solo puede contener letras y espacios y máximo 50 caracteres.';
      }
    }
    return null;
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setForm({
      id: item.id,
      nombre: item.nombre,
      descripcion: item.descripcion || '',
      cupoMaximo: item.cupoMaximo,
      // Convertir la cadena de días (números separados por coma) a array de enteros
      diasSemana: item.diasSemana ? item.diasSemana.split(',').map((d) => parseInt(d)) : [],
      hora: item.hora ? item.hora.substring(0, 5) : ''
    });
  };
  const handleDelete = async (id) => {
    if (!confirm('¿Seguro desea eliminar esta clase?')) return;
    await axios.delete(`/api/clases/${id}`);
    fetchData();
  };

  // Alternar selección de un día de la semana
  const toggleDia = (dia) => {
    if (form.diasSemana.includes(dia)) {
      setForm({ ...form, diasSemana: form.diasSemana.filter((d) => d !== dia) });
    } else {
      setForm({ ...form, diasSemana: [...form.diasSemana, dia] });
    }
  };
  return (
    <div className="space-y-6 mb-16">
      <h2 className="text-2xl font-semibold">Clases</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 space-y-4">
        <h3 className="text-lg font-medium">{isEditing ? 'Editar clase' : 'Nueva clase'}</h3>
        {error && <p className="text-red-600">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input className="w-full border rounded px-2 py-1" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cupo máximo</label>
            <input
              type="number"
              min="5"
              max="50"
              className="w-full border rounded px-2 py-1"
              value={form.cupoMaximo}
              onChange={(e) => setForm({ ...form, cupoMaximo: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Días de la semana</label>
            <div className="flex flex-wrap gap-4">
              {diasSemanaDisponibles.map(({ value, label }) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => toggleDia(value)}
                  className={`px-6 py-2 rounded border transition-colors ${form.diasSemana.includes(value) ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-200 text-gray-700 border-gray-300'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Horario de inicio</label>
            <div
              role="radiogroup"
              aria-label="Horario de inicio"
              className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-56 overflow-auto pr-1"
            >
              {horariosDisponibles.map((h) => {
                const seleccionado = form.hora === h;
                return (
                  <button
                    key={h}
                    type="button"
                    role="radio"
                    aria-checked={seleccionado}
                    onClick={() => setForm({ ...form, hora: h })}
                    className={[
                      "px-1 py-2 text-sm rounded border transition-colors",
                      seleccionado
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                    ].join(" ")}
                  >
                    {h}
                  </button>
                );
              })}
            </div>
            {/* Para que HTML5 respete required aunque no sea <select> */}
            <input type="hidden" required value={form.hora} />
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
                  <td className="px-4 py-2 whitespace-nowrap">{formatoDias(item.diasSemana)}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.hora?.substring(0, 5)}</td>
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