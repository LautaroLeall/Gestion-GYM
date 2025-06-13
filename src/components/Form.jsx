import { useState, useEffect } from 'react';

const clasesDisponibles = {
    Funcional: ["08:00-09:00", "18:00-19:00"],
    Zumba: ["10:00-11:00", "20:00-21:00"],
    Crossfit: ["06:00-07:00", "19:00-20:00"],
    Musculación: ["12:00-13:00", "17:00-18:00"],
};

const Form = ({
    agregarSocio,
    socioEditado,
    actualizarSocio,
    modoEdicion,
    cancelarEdicion,
    socios,
    scrollToTabla  // Recibimos la función que hace scroll a la tabla
}) => {
    const [formData, setFormData] = useState({
        nombreApellido: '',
        telefono: '',
        email: '',
        clase: '',
        horario: ''
    });

    useEffect(() => {
        if (modoEdicion && socioEditado) {
            setFormData(socioEditado);
        }
    }, [socioEditado, modoEdicion]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Opciones de horarios dependiendo la clase seleccionada
    const horariosOpciones = formData.clase ? clasesDisponibles[formData.clase] || [] : [];

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que no exista un turno duplicado para ese socio
        const existeTurnoDuplicado = socios.some((socio) =>
            socio.nombreApellido.toLowerCase() === formData.nombreApellido.toLowerCase() &&
            socio.clase === formData.clase &&
            socio.horario === formData.horario &&
            (!modoEdicion || (modoEdicion && socio.indice !== formData.indice)) // Si está editando, ignorar el mismo índice
        );

        if (existeTurnoDuplicado) {
            alert('¡No podés registrarte dos veces en la misma clase y horario!');
            return;
        }

        if (modoEdicion) {
            actualizarSocio(formData);
            scrollToTabla();  // Scroll al actualizar
        } else {
            agregarSocio(formData);
            scrollToTabla();  // Scroll al agregar
        }

        setFormData({
            nombreApellido: '',
            telefono: '',
            email: '',
            clase: '',
            horario: ''
        });
    };

    return (
        <div className="d-flex flex-column align-items-center bg-secondary">
            <form onSubmit={handleSubmit} className="form bg-dark p-4 rounded bg-light w-75 my-5">
                <div className="mb-3">
                    <select className="form-select" name="clase" value={formData.clase} onChange={handleChange} required>
                        <option value="">Seleccionar clase</option>
                        {Object.keys(clasesDisponibles).map((clase) => (
                            <option key={clase} value={clase}>{clase}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <input className="form-control" type="text" name="nombreApellido" value={formData.nombreApellido} onChange={handleChange} required placeholder="Nombre y Apellido" />
                </div>
                <div className="mb-3">
                    <input className="form-control" type="text" name="telefono" value={formData.telefono} onChange={handleChange} required placeholder="Teléfono" />
                </div>
                <div className="mb-3">
                    <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" />
                </div>
                <div className="mb-3">
                    <select className="form-select" name="horario" value={formData.horario} onChange={handleChange} required>
                        <option value="">Seleccionar horario</option>
                        {horariosOpciones.map((hora) => (
                            <option key={hora} value={hora}>{hora}</option>
                        ))}
                    </select>
                </div>
                {modoEdicion ? (
                    <div className="d-flex gap-3 mt-2">
                        <button type="submit" className="btn btn-outline-success flex-fill">
                            Aceptar
                        </button>
                        <button type="button" className="btn btn-outline-secondary flex-fill" onClick={cancelarEdicion}>
                            Cancelar
                        </button>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-outline-secondary w-50 mt-2">
                            Regitrar Turno
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Form;
