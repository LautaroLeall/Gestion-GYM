import { useState, useEffect } from 'react';

const clasesDisponibles = {
    Funcional: ["08:00-09:00", "18:00-19:00"],
    Zumba: ["10:00-11:00", "20:00-21:00"],
    Crossfit: ["06:00-07:00", "19:00-20:00"],
    Musculación: ["12:00-13:00", "17:00-18:00"],
};

const Form = ({ agregarSocio, socioEditado, actualizarSocio, modoEdicion, cancelarEdicion }) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (modoEdicion) {
            actualizarSocio(formData);
        } else {
            agregarSocio(formData);
        }
        setFormData({
            nombreApellido: '',
            telefono: '',
            email: '',
            clase: '',
            horario: ''
        });
    };

    const horariosOpciones = formData.clase ? clasesDisponibles[formData.clase] || [] : [];

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
            <div className="mb-2">
                <label>Clase</label>
                <select className="form-select" name="clase" value={formData.clase} onChange={handleChange}>
                    <option value="">Seleccionar clase</option>
                    {Object.keys(clasesDisponibles).map((clase) => (
                        <option key={clase} value={clase}>{clase}</option>
                    ))}
                </select>
            </div>
            <div className="mb-2">
                <label>Nombre y Apellido</label>
                <input className="form-control" type="text" name="nombreApellido" value={formData.nombreApellido} onChange={handleChange} required />
            </div>
            <div className="mb-2">
                <label>Teléfono</label>
                <input className="form-control" type="text" name="telefono" value={formData.telefono} onChange={handleChange} required />
            </div>
            <div className="mb-2">
                <label>Email</label>
                <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-2">
                <label>Horario</label>
                <select className="form-select" name="horario" value={formData.horario} onChange={handleChange} required>
                    <option value="">Seleccionar horario</option>
                    {horariosOpciones.map((hora) => (
                        <option key={hora} value={hora}>{hora}</option>
                    ))}
                </select>
            </div>
            {modoEdicion ? (
                <div className="d-flex gap-3 mt-3">
                    <button type="submit" className="btn btn-success flex-fill animate__animated animate__pulse">
                        Aceptar
                    </button>
                    <button type="button" className="btn btn-secondary flex-fill animate__animated animate__fadeIn" onClick={cancelarEdicion}>
                        Cancelar
                    </button>
                </div>
            ) : (
                <button type="submit" className="btn btn-success w-100 mt-3 animate__animated animate__pulse">
                    Agregar
                </button>
            )}

        </form>
    );
};

export default Form;
