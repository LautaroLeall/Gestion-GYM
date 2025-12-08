import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Página para gestionar socios. Permite listar, crear, actualizar y
 * eliminar socios mediante llamadas a la API. Usa Framer Motion para
 * animar la entrada y salida de elementos de la lista.
 */
const SociosPage = () => {
  const [socios, setSocios] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    email: '',
    telefono: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  const fetchSocios = async () => {
    const res = await axios.get('/api/socios');
    setSocios(res.data);
  };

  useEffect(() => {
    fetchSocios();
  }, []);

  const resetForm = () => {
    setForm({ id: null, nombre: '', apellido: '', fechaNacimiento: '', email: '', telefono: '' });
    setIsEditing(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar campos en cliente antes de enviar al servidor
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const payload = {
        nombre: form.nombre,
        apellido: form.apellido,
        fechaNacimiento: form.fechaNacimiento,
        email: form.email,
        telefono: form.telefono,
      };
      if (isEditing) {
        await axios.put(`/api/socios/${form.id}`, payload);
      } else {
        await axios.post('/api/socios', payload);
      }
      resetForm();
      fetchSocios();
    } catch (err) {
      setError(err.response?.data || 'Error al guardar');
    }
  };

  /**
   * Valida el formulario de socios. Devuelve una cadena con el mensaje
   * de error si hay algún problema; de lo contrario devuelve null.
   */
  const validateForm = () => {
    // Validar nombre: mínimo 3 letras, solo letras y espacios
    if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{3,}$/.test(form.nombre.trim())) {
      return 'El nombre debe tener al menos 3 caracteres y solo letras.';
    }
    // Validar apellido
    if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{3,}$/.test(form.apellido.trim())) {
      return 'El apellido debe tener al menos 3 caracteres y solo letras.';
    }
    // Validar fecha de nacimiento y edad mínima de 8 años
    if (!form.fechaNacimiento) {
      return 'Debe ingresar la fecha de nacimiento.';
    }
    const fn = new Date(form.fechaNacimiento);
    const today = new Date();
    const minBirth = new Date();
    minBirth.setFullYear(today.getFullYear() - 8);
    if (fn > minBirth) {
      return 'La fecha de nacimiento indica que el socio debe tener al menos 8 años.';
    }
    // Validar email: debe existir y tener al menos 3 letras antes del @
    if (!form.email) {
      return 'Debe ingresar un correo electrónico.';
    }
    const parts = form.email.split('@');
    if (parts.length < 2 || !/^[A-Za-z]{3,}/.test(parts[0])) {
      return 'El correo electrónico debe tener al menos 3 letras antes del @.';
    }
    // Validar teléfono: solo números, 10 a 13 caracteres
    if (!/^[0-9]{10,13}$/.test(form.telefono)) {
      return 'El teléfono debe contener solo números y tener entre 10 y 13 dígitos.';
    }
    return null;
  };

  const handleEdit = (socio) => {
    setIsEditing(true);
    setForm({
      id: socio.id,
      nombre: socio.nombre,
      apellido: socio.apellido,
      fechaNacimiento: socio.fechaNacimiento.split('T')[0],
      email: socio.email || '',
      telefono: socio.telefono || ''
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro desea eliminar este socio?')) return;
    await axios.delete(`/api/socios/${id}`);
    fetchSocios();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Socios</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 space-y-4">
        <h3 className="text-lg font-medium">{isEditing ? 'Editar socio' : 'Nuevo socio'}</h3>
        {error && <p className="text-red-600">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input className="w-full border rounded px-2 py-1" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Apellido</label>
            <input className="w-full border rounded px-2 py-1" value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fecha de nacimiento</label>
            <input type="date" className="w-full border rounded px-2 py-1" value={form.fechaNacimiento} onChange={(e) => setForm({ ...form, fechaNacimiento: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Correo electrónico</label>
            <input
              type="email"
              className="w-full border rounded px-2 py-1"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              required
            />
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
        <h3 className="text-lg font-medium mb-2">Listado de socios</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Apellido</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {socios.map((socio) => (
                  <motion.tr
                    key={socio.id}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="px-4 py-2 whitespace-nowrap">{socio.nombre}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{socio.apellido}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button onClick={() => handleEdit(socio)} className="text-blue-600 hover:underline">Editar</button>
                      <button onClick={() => handleDelete(socio.id)} className="text-red-600 hover:underline">Eliminar</button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SociosPage;