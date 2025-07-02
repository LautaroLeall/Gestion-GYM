import { useState, useEffect } from 'react';
import '../styles/Form.css';
import Swal from 'sweetalert2';

// Objeto que define las clases disponibles y sus horarios
const clasesDisponibles = {
    Funcional: ["08:00-09:00", "16:00-17:00"],
    Zumba: ["10:00-11:00", "17:00-18:00"],
    Crossfit: ["12:00-13:00", "19:00-20:00"],
    Musculación: ["14:00-15:00", "21:00-22:00"],
};

// Componente Form recibe props para manejar socios
const Form = ({
    agregarSocio,        // Función para agregar nuevo socio
    socioEditado,        // Datos del socio que está siendo editado
    actualizarSocio,     // Función para actualizar datos de un socio
    modoEdicion,         // Indica si estamos editando o creando
    cancelarEdicion,     // Función para cancelar edición
    socios,              // Lista de todos los socios actuales
    scrollToTabla        // Función para hacer scroll hacia la tabla luego de registrar
}) => {
    // Estado local para manejar los campos del formulario
    const [formData, setFormData] = useState({
        nombreApellido: '',
        telefono: '',
        email: '',
        clase: '',
        horario: ''
    });

    // useEffect que se ejecuta cuando cambia el modo edición o el socio a editar
    useEffect(() => {
        if (modoEdicion && socioEditado) {
            // Si se está editando, se cargan los datos del socio al formulario
            setFormData(socioEditado);
        }
    }, [socioEditado, modoEdicion]);

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Genera las opciones de horarios en base a la clase seleccionada
    const horariosOpciones = formData.clase ? clasesDisponibles[formData.clase] || [] : [];

    // Función que se ejecuta al enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene recarga de página

        // Verifica si ya existe un turno igual (mismo nombre, clase y horario)
        const existeTurnoDuplicado = socios.some((socio) =>
            socio.nombreApellido.toLowerCase() === formData.nombreApellido.toLowerCase() &&
            socio.clase === formData.clase &&
            socio.horario === formData.horario &&
            (!modoEdicion || socio.id !== formData.id) // Permite editar el mismo socio sin conflicto
        );

        if (existeTurnoDuplicado) {
            // Muestra una alerta si se intenta duplicar un turno
            Swal.fire({
                icon: 'warning',
                title: 'Registro duplicado',
                text: '¡No podés registrarte dos veces en la misma clase y horario!',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Ok'
            });
            return;
        }

        // Si está en modo edición, actualiza el socio
        if (modoEdicion) {
            actualizarSocio(formData);
            scrollToTabla();
        } else {
            // Si no, agrega un nuevo socio
            agregarSocio(formData);
            scrollToTabla();
        }

        // Limpia el formulario después de enviar
        setFormData({
            nombreApellido: '',
            telefono: '',
            email: '',
            clase: '',
            horario: ''
        });
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <form onSubmit={handleSubmit} className="formulario p-4 w-75 my-5">
                {/* Selector de clase */}
                <div className="mb-3">
                    <select className="form-select" name="clase" value={formData.clase} onChange={handleChange} required>
                        <option className="option-form" value="">Seleccionar clase</option>
                        {Object.keys(clasesDisponibles).map((clase) => (
                            <option className="option-form" key={clase} value={clase}>{clase}</option>
                        ))}
                    </select>
                </div>

                {/* Campo para nombre y apellido */}
                <div className="mb-3">
                    <input
                        className="form-control"
                        type="text"
                        name="nombreApellido"
                        value={formData.nombreApellido}
                        onChange={handleChange}
                        required
                        placeholder="Nombre y Apellido"
                    />
                </div>

                {/* Campo para teléfono */}
                <div className="mb-3">
                    <input
                        className="form-control"
                        type="number"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        placeholder="Teléfono"
                    />
                </div>

                {/* Campo para email */}
                <div className="mb-3">
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Email"
                    />
                </div>

                {/* Selector de horario según clase elegida */}
                <div className="mb-3">
                    <select className="form-select" name="horario" value={formData.horario} onChange={handleChange} required>
                        <option className="option-form" value="">Seleccionar horario</option>
                        {horariosOpciones.map((hora) => (
                            <option className="option-form" key={hora} value={hora}>{hora}</option>
                        ))}
                    </select>
                </div>

                {/* Botones para aceptar/cancelar si está editando, o registrar si no */}
                {modoEdicion ? (
                    <div className="d-flex gap-3 mt-2">
                        <button type="submit" className="btn btn-outline-success flex-fill">Aceptar</button>
                        <button type="button" className="btn btn-outline-danger flex-fill" onClick={cancelarEdicion}>Cancelar</button>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-outline-secondary w-50 mt-2">Registrar Turno</button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Form;
