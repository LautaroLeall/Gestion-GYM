import { useState, useEffect } from 'react';
import '../styles/Form.css';
import Swal from 'sweetalert2';

const clasesDisponibles = {
    Funcional: ["08:00-09:00", "16:00-17:00",],
    Zumba: ["10:00-11:00", "17:00-18:00"],
    Crossfit: ["12:00-13:00", "19:00-20:00"],
    Musculación: ["14:00-15:00", "21:00-22:00"],
};

const Form = ({
    agregarSocio,
    socioEditado,
    actualizarSocio,
    modoEdicion,
    cancelarEdicion,
    socios,
    scrollToTabla
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

    const horariosOpciones = formData.clase ? clasesDisponibles[formData.clase] || [] : [];

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación para evitar turnos duplicados
        const existeTurnoDuplicado = socios.some((socio) =>
            socio.nombreApellido.toLowerCase() === formData.nombreApellido.toLowerCase() &&
            socio.clase === formData.clase &&
            socio.horario === formData.horario &&
            (!modoEdicion || socio.id !== formData.id)
        );

        if (existeTurnoDuplicado) {
            Swal.fire({
                icon: 'warning',
                title: 'Registro duplicado',
                text: '¡No podés registrarte dos veces en la misma clase y horario!',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Ok'
            });
            return;
        }

        if (modoEdicion) {
            actualizarSocio(formData);
            scrollToTabla();
        } else {
            agregarSocio(formData);
            scrollToTabla();
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
        <div className="d-flex flex-column align-items-center">
            <form onSubmit={handleSubmit} className="formulario p-4 w-75 my-5">
                <div className="mb-3">
                    <select className="form-select" name="clase" value={formData.clase} onChange={handleChange} required>
                        <option className="option-form" value="">Seleccionar clase</option>
                        {Object.keys(clasesDisponibles).map((clase) => (
                            <option className="option-form" key={clase} value={clase}>{clase}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <input className="form-control" type="text" name="nombreApellido" value={formData.nombreApellido} onChange={handleChange} required placeholder="Nombre y Apellido" />
                </div>

                <div className="mb-3">
                    <input className="form-control" type="number" name="telefono" value={formData.telefono} onChange={handleChange} required placeholder="Teléfono" />
                </div>

                <div className="mb-3">
                    <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" />
                </div>

                <div className="mb-3">
                    <select className="form-select" name="horario" value={formData.horario} onChange={handleChange} required>
                        <option className="option-form" value="">Seleccionar horario</option>
                        {horariosOpciones.map((hora) => (
                            <option className="option-form" key={hora} value={hora}>{hora}</option>
                        ))}
                    </select>
                </div>

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
